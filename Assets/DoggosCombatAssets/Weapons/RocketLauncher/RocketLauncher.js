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
public var otherRL: RocketLauncher;
private var rocketObj : GameObject[];
private var rocketScript1: RocketLauncher;
private var rocketScript2: RocketLauncher;

        
public var rocketacceleration : float;

private var anim : Animator;
public var GC : DoggoGC;

function Start (){

	anim = GetComponent.<Animator>();
	myTurn = false;
	Lag = 0;
	rocketPos = 0;
	shootingJoystick = GameObject.FindWithTag("ShootingJoystick").GetComponent.<DoggoShootingJoystick>();
	rocketObj = GameObject.FindGameObjectsWithTag("RocketLauncher");
	//Obten las dos armas RocketLauncher
	rocketScript1 = rocketObj[0].GetComponent.<RocketLauncher>();
	rocketScript2 = rocketObj[1].GetComponent.<RocketLauncher>();
	//Si ningun rocketLauncher ha decidido aun el turno de ambos rocketLauncher, decidelo.
	//Si un rocketLauncher ya decidio el turno de ambos por los dos, entonces ya no decidas
	if (rocketScript1 != null && rocketScript2 != null)
	{
		rocketScript1.myTurn = true;
		
		if (rocketObj[0] != gameObject)
		{
			otherRL = rocketScript1;
			rocketScript1.otherRL = gameObject.GetComponent.<RocketLauncher>();
		}
		
		else if (rocketObj[1] != gameObject)
		{
			otherRL = rocketScript2;
			rocketScript2.otherRL = gameObject.GetComponent.<RocketLauncher>();
		}
	}
	
	GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();
	

	//direction = bulletDirection.position - bulletSpawn.position;
}

function FixedUpdate () {

rocketObj = GameObject.FindGameObjectsWithTag("RocketLauncher");
	
	if (myTurn)
	{	
		
		if (shootingJoystick.GetIsShooting())
		{
			if (anim.GetCurrentAnimatorStateInfo(0).IsName("StayStill"))
			{
				anim.SetTrigger("StayStillToShooting");
				anim.ResetTrigger("ShootingToStayStill");
			}
			
			if ( Time.time > Lag)
			{
				if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shooting"))
				{
					anim.SetTrigger("ShootingToStayStill");
					anim.ResetTrigger("StayStillToShooting");
				}
				myTurn = false;
				otherRL.myTurn = true;
				
				if (GC.checkBullet > 0)
				{
					direction = rocketDirection.position - rocketSpawn[0].position; //En este caso uso la posicion 0 de rocketSpawn porque es la coordenada que esta alineada con la coordenada rocketDirection. Si usara la coordenada que esta en rocketSpawn[1], la direccion obtenida seria incorrecta
					rocketTemp = Instantiate(rocket, rocketSpawn[Random.Range(0,2)].position, Quaternion.identity);
					rocketTemp.transform.rotation = Quaternion.LookRotation(direction); 
					var rocketrb : Rigidbody = rocketTemp.GetComponent.<Rigidbody>();
					rocketrb.velocity = direction * rocketacceleration;
					GC.ReduceBulletQuantity();
				}

			}
		}
		
	}
	else
		Lag = Time.time + fireRate;
	

}