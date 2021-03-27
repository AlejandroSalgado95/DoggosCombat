
//PROBLEMA 1 (RESUELTO) : Las transiciones del automata no se llevaban acabo correctamente
/*SOLUCION: Ultroman's answer is not 100% exact. The problem does not (always) occur when you trigger an animation that is currently being played. It does occur when you trigger an amination while a transition is still running.

Let's say you have 2 animations: A and B and 2 triggers: tA and tB, animation A plays when tA gets triggered and animation B plays when tB gets triggered. If you trigger tA animation A will start playing, but if you trigger tB before animation A has finished, tA won't be reset, it will remain true until animation A is played from begining to end. The same also happens if you trigger tA for a second time while animation A is still playing.

So, if for some reason you need to trigger tB and you are not sure if animation A has finished, you should use ResetTrigger, I didn't understand why the guys at Unity decided to include this funtion until I stumbled upon this problem.

To prevent this unwanted behaviour you should do something like this:

 animator.ResetTrigger("tA");
 animator.SetTigger("tB);
 
 From: http://answers.unity3d.com/questions/801875/mecanim-trigger-getting-stuck-in-true-state.html
 */
 
 //PROBLEMA 2 (SIN RESOLVER): La transicion a la animacion DashBite y salida de la animacion DashBite no
 //ocurren correctamente. Osea, a veces se triggerea una segunda vez el dashBite sin pedirlo, y la mecanica
 //del dashbite no esta bien programada (osea, los glitches combinados al considerar la direccion, rotacion
 //velocidad y duracion del dashbite).

#pragma strict

public var Speed : float;
public var AwayTime : float;
private var Away : float;
private var anim : Animator;
public var weaponBelt: Transform;
private var dashBiteDirection : Vector3;
private var dashBiteDirectionSetter : int;
private var dashTime: float;
/*
private var aud : AudioSource;
public var attackButton : AttackButton;
public var defendButton : DefendButton;

public var Attacking : boolean;
public var Defending : boolean;*/

public var mobileJoystick : DoggoMovingJoystick;
public var shootingJoystick : DoggoShootingJoystick;
public var fallSpeed : float;
public var lowestFloorPos : float;
public var onSlide : boolean; 
public var onFloor : boolean;
public var slopeValue : float;

private var slideDir : Vector3;
public var onGround : boolean;

function Start () {
	
	onGround = true;
	onFloor = true;
	onSlide = false;
	anim = GetComponent.<Animator>();
	mobileJoystick = GameObject.FindWithTag("MovementJoystick").GetComponent.<DoggoMovingJoystick>();
	shootingJoystick = GameObject.FindWithTag("ShootingJoystick").GetComponent.<DoggoShootingJoystick>();
	lowestFloorPos = GameObject.FindWithTag("LowestFloor").GetComponent.<Transform>().position.y;
	dashTime = 0;
	/*
	aud = GetComponent.<AudioSource>();
	Attacking = false;
	Defending = false;
	*/
}

function FixedUpdate ()
{
	var HMove : float;
	var VMove : float;
	var MovePerSecond : Vector3;
	var checkShooting : boolean;
	
	//if (!attackButton.active && !defendButton.active)
	//{
		if(!anim.GetCurrentAnimatorStateInfo(0).IsName("DashBite"))
		{
			HMove = mobileJoystick.GetDirection().x;
			VMove = mobileJoystick.GetDirection().y;
		}
		
		checkShooting = shootingJoystick.GetIsShooting();
		//checkShooting = Input.GetKey("down");
		
	//}
	/*
	else
	{
		HMove = 0;
		VMove = 0;
	}*/
		
		var normalizedDirection : Vector3 = new Vector3(HMove,0.0f,VMove);	
		MovePerSecond = normalizedDirection * Speed * Time.deltaTime; // Esto hace que se mueva Speed unidades por segundo
		transform.position = transform.position + MovePerSecond;
		
	
	if (HMove != 0 || VMove != 0)
	{
		Away = 0;
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Alert"))
		{
			anim.SetTrigger("AlertToWalking");
			anim.ResetTrigger("Shooting(Static)ToAlert");
			anim.ResetTrigger("DashBiteToAlert");
			anim.ResetTrigger("WalkingToAlert");
			anim.ResetTrigger("Shooting(Moving)ToAlert");
			Speed = 15;
		}
		
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Away"))
		{
			anim.SetTrigger("AwayToWalking");
			anim.ResetTrigger("AlertToAway");
			Speed = 15;
		}
		
		/*
		if (checkShooting)
		{
			if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shooting(Static)"))
			{
				anim.SetTrigger("Shooting(Static)ToShooting(Moving)");
				anim.ResetTrigger("AwayToShooting(Static)");
				anim.ResetTrigger("AlertToShooting(Static)");
				anim.ResetTrigger("Shooting(Moving)ToShooting(Static)");
				Speed = 3;
			}
			
			if (anim.GetCurrentAnimatorStateInfo(0).IsName("Walking"))
			{
				anim.SetTrigger("WalkingToShooting(Moving)");
				anim.ResetTrigger("AlertToWalking");
				anim.ResetTrigger("AwayToWalking");
				anim.ResetTrigger("Shooting(Moving)ToWalking");
				Speed = 3;
			}
	
		}
		else
			if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shooting(Moving)"))
			{
				anim.SetTrigger("Shooting(Moving)ToWalking");
				anim.ResetTrigger("Shooting(Static)ToShooting(Moving)");
				anim.ResetTrigger("WalkingToShooting(Moving)");
				Speed = 10;
			}*/
	}
	else if (checkShooting)
	{
		Away = 0;
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Away"))
		{
			anim.SetTrigger("AwayToShooting(Static)");
			anim.ResetTrigger("AlertToAway");
			Speed = 15;
		}
		
		if(anim.GetCurrentAnimatorStateInfo(0).IsName("Alert"))
		{
			anim.SetTrigger("AlertToShooting(Static)");
			anim.ResetTrigger("Shooting(Static)ToAlert");
			anim.ResetTrigger("DashBiteToAlert");
			anim.ResetTrigger("WalkingToAlert");
			anim.ResetTrigger("Shooting(Moving)ToAlert");
			Speed = 15;
		}
		
		if(anim.GetCurrentAnimatorStateInfo(0).IsName("Shooting(Moving)"))
		{
			anim.SetTrigger("Shooting(Moving)ToShooting(Static)");
			anim.ResetTrigger("Shooting(Static)ToShooting(Moving)");
			anim.ResetTrigger("WalkingToShooting(Moving)");
			Speed = 15;
		}
	}
	else
	{
		Away += Time.deltaTime;
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Walking"))
		{
			anim.SetTrigger("WalkingToAlert");
			anim.ResetTrigger("AlertToWalking");
			anim.ResetTrigger("AwayToWalking");
			anim.ResetTrigger("Shooting(Moving)ToWalking");
			Speed = 15;
		}
		
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shooting(Static)"))
		{
			anim.SetTrigger("Shooting(Static)ToAlert");
			anim.ResetTrigger("AwayToShooting(Static)");
			anim.ResetTrigger("AlertToShooting(Static)");
			anim.ResetTrigger("Shooting(Moving)ToShooting(Static)");
			Speed =15;
		}
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shooting(Moving)"))
		{
			anim.SetTrigger("Shooting(Moving)ToAlert");
			anim.ResetTrigger("Shooting(Static)ToShooting(Moving)");
			anim.ResetTrigger("WalkingToShooting(Moving)");
			Speed = 15;
		}
		
		if (Away > AwayTime)
		{
			if (anim.GetCurrentAnimatorStateInfo(0).IsName("Alert"))
			{
				anim.SetTrigger("AlertToAway");
				anim.ResetTrigger("Shooting(Static)ToAlert");
				anim.ResetTrigger("DashBiteToAlert");
				anim.ResetTrigger("WalkingToAlert");
				anim.ResetTrigger("Shooting(Moving)ToAlert");
				Speed = 15;
			}
		}
	}
	
	/////////////////////////////////////////SECCION DE DASHBITE INCOMPLETA////////////////////////////////////////

	/*
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("Walking"))
	{
		if (Input.GetKey("down"))
		{
			dashBiteDirection = normalizedDirection;
			anim.SetTrigger("WalkingToDashBite");
			anim.ResetTrigger("AlertToWalking");
			anim.ResetTrigger("AwayToWalking");
			anim.ResetTrigger("Shooting(Moving)ToWalking");			
		}
			
	}*/
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("DashBite"))
	{
		Speed = 20;/*
		dashTime += Time.deltaTime;
		if (dashTime < 65)
			Speed = 15;
		else
		{
			Speed = 0;
			dashTime = 0;
		}*/
		/*
		if (dashBiteDirectionSetter == 0)
			dashBiteDirection = normalizedDirection;
			
		dashBiteDirectionSetter = 1;*/
		var moveOnDash : Vector3 = dashBiteDirection * Speed * Time.deltaTime; // Esto hace que se mueva Speed unidades por segundo
		transform.position = transform.position + moveOnDash;
	}/*
	else
	{
		dashBiteDirectionSetter = 0;
	}*/
	
	/////////////////////////////////////SECCION DE DASHBITE INCOMPLETA////////////////////////////////////////
	
	
	if (mobileJoystick.GetDirection().magnitude != 0 && !anim.GetCurrentAnimatorStateInfo(0).IsName("DashBite"))
	{
		var LookDirection : Vector3;
		var RotationDirection: Quaternion;
		
	
		LookDirection = new Vector3(mobileJoystick.GetDirection().x, 0.0f, mobileJoystick.GetDirection().y);
			
		RotationDirection = Quaternion.LookRotation (LookDirection);
		transform.rotation = RotationDirection;
		transform.eulerAngles +=  new Vector3(0,90,0);
		
		/*
		if (onSlide || !onGround)
		{
			var dotProduct = Vector3.Dot(transform.right,slideDir);
			if (dotProduct < -0.3 )
				transform.eulerAngles +=  new Vector3(0,0, -30);
			else if (dotProduct > 0.3)
				transform.eulerAngles +=  new Vector3(0,0, 30);
		}*/

	}
	
	if (checkShooting)
	{
		var weaponBeltDirection : Vector3;
		var weaponBeltRotation: Quaternion;
			
		weaponBeltDirection = new Vector3(shootingJoystick.GetDirection().x, 0.0f, shootingJoystick.GetDirection().y);
			
		weaponBeltRotation = Quaternion.LookRotation(weaponBeltDirection);
		weaponBelt.rotation = weaponBeltRotation;
		weaponBelt.eulerAngles +=  new Vector3(0,90,0);
	}
	
	
	if (transform.position.y > lowestFloorPos + 1.5f)
	{
		//if (!onSlide && !onGround)//AQUI FALTA AÑADIRLE QUE TAMPOCO SE MUEVA HACIA ABAJO CUANDO ESTE TOCANDO CUALQUIER SUELO
			transform.position.y -= fallSpeed;
	}

	
}


function OnCollisionEnter(col : Collision)
{
	if (col.collider.gameObject.CompareTag("Slide"))
	{
		onSlide = true;
		//slopeValue = col.collider.gameObject.transform.eulerAngles.z;
		slideDir = col.collider.gameObject.transform.up;
		
		
	}
	
	
	if (col.collider.gameObject.CompareTag("LowestFloor") || col.collider.gameObject.CompareTag("Floor") )
	{
		onGround = true;
	}
	
		
	  
}

function OnCollisionExit(col:Collision)
{
	
	if (col.collider.gameObject.CompareTag("Slide"))
	{
		onSlide = false;
			
	}
	
	if (col.collider.gameObject.CompareTag("LowestFloor") || col.collider.gameObject.CompareTag("Floor") )
	{
		onGround = false;
	}
}

/*
function OnTriggerEnter (other : Collider) {

    //if (other.gameObject.tag == "TemporalPlane")
    //{
    
 
    	
    //}
    
    
    
}*/
