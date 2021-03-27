#pragma strict

public var GBObject : GameObject[];
public var spawnBullet : Transform;
public var bulletDir : Transform;
public var shootingJoystick: DoggoShootingJoystickMultiplayer;
public var fireRate : float;
private var Lag : float;
public var BulletTemp : GameObject;
public var bullet : GameObject;
public var speed : float;
private var activeBullet : boolean;
private var readyToThrow: boolean;
//public var onlyIShoot : boolean;
private var weaponRotator : Transform;
static var stayAlive: GravityBomberMultiplayer;
private var bulletrb: Rigidbody;
public var GC : DoggoGCMultiplayer;

function Start () {

	if (stayAlive == null)
	{
		stayAlive = this;
	}
	else
	{
		GetComponent.<GravityBomberMultiplayer>().enabled = false;
	}
	
	//onlyIShoot = false;
	activeBullet = false;
	readyToThrow = false;
	Lag = 0;
	//GBObject = GameObject.FindGameObjectsWithTag("GravityBomber");
	weaponRotator = GameObject.FindWithTag("WeaponRotator").GetComponent.<Transform>();
	
	//if (GBObject[0] != null && GBObject[1] == null)
	//{
		//onlyIShoot = true;
		spawnBullet = GameObject.FindWithTag("GBSpawnPos").GetComponent.<Transform>();
		bulletDir = GameObject.FindWithTag("GBDir").GetComponent.<Transform>();
	//}
	

}

function FixedUpdate () {
	
	//if (onlyIShoot) 
	//{
		if (shootingJoystick.GetIsShooting())
		{	
			if (Time.time > Lag && !activeBullet )
			{	
				if (GC.checkBullet)
				{
					activeBullet = true;
					BulletTemp = Instantiate(bullet, bulletDir.position, Quaternion.identity);
					//BulletTemp.transform.rotation = Quaternion.LookRotation(direction);
					BulletTemp.transform.parent = weaponRotator;
					BulletTemp.transform.localScale = Vector3.zero;
					readyToThrow = true;
					bulletrb = BulletTemp.GetComponent.<Rigidbody>();
					//bulletrb.useGravity = false; 
					bulletrb.isKinematic = true;
					GC.ReduceBulletQuantity();
					StartCoroutine(scaleBullet());
				}
			}
		}
		
		else if (readyToThrow)
		{
			if (BulletTemp != null)
			{
				activeBullet = false;
				readyToThrow = false;
				BulletTemp.transform.parent = null;
				var direction : Vector3 = bulletDir.position - spawnBullet.position;
				var bulletrb : Rigidbody = BulletTemp.GetComponent.<Rigidbody>();
				bulletrb.velocity = direction * speed;
				bulletrb.useGravity = true; //ESTA LINEA NO ESTA FUNCIONANDO (YA FUNCIONA!)
				bulletrb.isKinematic = false;
				Lag = Time.time + fireRate;
				BulletTemp = null;
				bulletrb = null;
			}
		}
	//}

}


function scaleBullet(){
	
	while (shootingJoystick.GetIsShooting() && BulletTemp.transform.localScale.magnitude < 3.0f)
	{
		BulletTemp.transform.localScale += new Vector3(0.05f,0.05f,0.05f);
		yield;
	}

}

