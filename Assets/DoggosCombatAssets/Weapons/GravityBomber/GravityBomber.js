#pragma strict

public var GBObject : GameObject[];
public var spawnBullet : Transform;
public var bulletDir : Transform;
public var shootingJoystick: DoggoShootingJoystick;
public var fireRate : float;
private var Lag : float;
public var BulletTemp : GameObject;
public var bullet : GameObject;
public var speed : float;
private var activeBullet : boolean;
private var readyToThrow: boolean;
//public var onlyIShoot : boolean;
private var weaponRotator : Transform;
static var stayAlive: GravityBomber;
private var bulletrb: Rigidbody;
public var GC : DoggoGC;
public var actualBullet : GBBullet;

function Start () {

	if (stayAlive == null)
	{
		stayAlive = this;
	}
	else
	{
		GetComponent.<GravityBomber>().enabled = false;
	}
	
	//onlyIShoot = false;
	activeBullet = false;
	readyToThrow = false;
	Lag = 0;
	//GBObject = GameObject.FindGameObjectsWithTag("GravityBomber");
	shootingJoystick = GameObject.FindWithTag("ShootingJoystick").GetComponent.<DoggoShootingJoystick>();
	weaponRotator = GameObject.FindWithTag("WeaponRotator").GetComponent.<Transform>();
	
	//if (GBObject[0] != null && GBObject[1] == null)
	//{
		//onlyIShoot = true;
		spawnBullet = GameObject.FindWithTag("GBSpawnPos").GetComponent.<Transform>();
		bulletDir = GameObject.FindWithTag("GBDir").GetComponent.<Transform>();
	//}
	GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();
	

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
					actualBullet = BulletTemp.GetComponent.<GBBullet>();
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
			else if (activeBullet)
			{
				if (actualBullet != null)
				{
					if (actualBullet.activated)
					{
						activeBullet = false;
						readyToThrow = false;
						BulletTemp.transform.parent = null;
						actualBullet = null;
						Lag = Time.time + fireRate;
						BulletTemp = null;
					}
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
				actualBullet = null;
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

	var check : boolean = true;
	
	while (check)
	{
		if (BulletTemp != null)
			if (shootingJoystick.GetIsShooting() && BulletTemp.transform.localScale.magnitude < 3.0f)
				BulletTemp.transform.localScale += new Vector3(0.05f,0.05f,0.05f);
			else 
				check = false;
		else
			check = false;
		
		
		yield;
	}

}

