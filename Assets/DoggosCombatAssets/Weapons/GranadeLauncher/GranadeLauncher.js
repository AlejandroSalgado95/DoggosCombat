//////////////////////////////////////////ESTE SCRIPT ES UN CLON DEL SCRIPT:
/////////////////////////////////////////RocketLauncher, pero con algunas ligeras
/////////////////////////////////////////modificaciones


//PROBLEMA 3 (SIN RESOLVER)
/*
En dispositivos de varios procesadores (osea, todos), existe la posibilidad de que el Rocket Launcher
izquierdo y derecho ejecuten la funcion Start exactamente al mismo tiempo. Si eso ocurre, entonces
ni el rocket launcher izquierdo ni el derecho podran lanzar misiles en toda la partida (habra que salirse
y volver a entrar a intentar que esto no suceda)
*/

///////////////////ESTE CODIGO PUEDE SER UTIL PARA UN TRACKING MISSILE (MISIL SEGUIDOR)///////////////
/*
  // Find the name of the closest enemy
    function FindClosestEnemy () : GameObject {
        // Find all game objects with tag Enemy
        var gos : GameObject[];
        gos = GameObject.FindGameObjectsWithTag("Enemy");
        var closest : GameObject;
        var distance = Mathf.Infinity;
        var position = transform.position;
        // Iterate through them and find the closest one
        for (var go : GameObject in gos)  {
            var diff = (go.transform.position - position);
            var curDistance = diff.sqrMagnitude;
            if (curDistance < distance) {
                closest = go;
                distance = curDistance;
            }
        }
        return closest;
    }
*/
//////////////////////////////////////////////////////////////////
#pragma strict

public var rocketSpawn : Transform[];
public var rocketDirection : Transform;
private var rocketPos : int;

public var shootingJoystick: DoggoShootingJoystick;
public var isShooting : boolean;

public var rocket : GameObject;
public var fireRate : float;

private var Lag : float;
private var rocketTemp : GameObject;
private var direction : Vector3;

public var myTurn: boolean;
public var otherRL: GranadeLauncher;
private var rocketObj : GameObject[];
private var rocketScript1: GranadeLauncher;
private var rocketScript2: GranadeLauncher;

        
public var rocketacceleration : float;

private var anim : Animator;
public var cartridgeRotator : Transform;
private var rotateCartridge : boolean;
public var rotationSpeed : float;
public var rotationLimit : float;
private var rotationAcum : float;

public var GC : DoggoGC;

function Start (){
	
	anim = GetComponent.<Animator>();
	rotateCartridge = false;
	rotationAcum = 0;
	

	myTurn = false;
	Lag = 0;
	rocketPos = 0;
	shootingJoystick = GameObject.FindWithTag("ShootingJoystick").GetComponent.<DoggoShootingJoystick>();
	rocketObj = GameObject.FindGameObjectsWithTag("GranadeLauncher");
	//Obten las dos armas RocketLauncher
	rocketScript1 = rocketObj[0].GetComponent.<GranadeLauncher>();
	rocketScript2 = rocketObj[1].GetComponent.<GranadeLauncher>();
	//Si ningun rocketLauncher ha decidido aun el turno de ambos rocketLauncher, decidelo.
	//Si un rocketLauncher ya decidio el turno de ambos por los dos, entonces ya no decidas
	if (rocketScript1 != null && rocketScript2 != null)
	{
		rocketScript1.myTurn = true;
		
		if (rocketObj[0] != gameObject)
		{
			otherRL = rocketScript1;
			rocketScript1.otherRL = gameObject.GetComponent.<GranadeLauncher>();
		}
		
		else if (rocketObj[1] != gameObject)
		{
			otherRL = rocketScript2;
			rocketScript2.otherRL = gameObject.GetComponent.<GranadeLauncher>();
		}
	}
	
	GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();

	//direction = bulletDirection.position - bulletSpawn.position;
	

}

function FixedUpdate () {

rocketObj = GameObject.FindGameObjectsWithTag("GranadeLauncher");
	
	if (myTurn)
	{
		if (shootingJoystick.GetIsShooting() && Time.time > Lag)
		{
			if (GC.checkBullet > 0)
			{
				anim.SetTrigger("StayStillToShooting");
				myTurn = false;
				rotateCartridge = true;
				rotationAcum = 0;
				otherRL.myTurn = true;
				direction = rocketDirection.position - rocketSpawn[0].position; //En este caso uso la posicion 0 de rocketSpawn porque es la coordenada que esta alineada con la coordenada rocketDirection. Si usara la coordenada que esta en rocketSpawn[1], la direccion obtenida seria incorrecta
				rocketTemp = Instantiate(rocket, rocketSpawn[0].position, Quaternion.identity);
				rocketTemp.transform.rotation = Quaternion.LookRotation(direction); 
				var rocketrb : Rigidbody = rocketTemp.GetComponent.<Rigidbody>();
				rocketrb.velocity = direction * rocketacceleration;
				rocketrb = null;
				GC.ReduceBulletQuantity();
			}
			
		}
	}
	else
		Lag = Time.time + fireRate;
	
	
	//ESTO ES ALGO INNECESARIO (ES PARA ROTAR EL CARTUCHO, PERO NI SE NOTA MUCHO
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("StayStill") && rotateCartridge)
	{
		rotationAcum +=  (Time.deltaTime * rotationSpeed);
		if (rotationAcum < rotationLimit)
			cartridgeRotator.Rotate(Vector3.right * Time.deltaTime * rotationSpeed);
	}
	

}