////////////////////////////////////////////////ESTE ES UN CLON DEL SCRIPT////////////////////////////////////////////////
////////////////////////////////////////////////UTILIZADO PARA EL ARMA FAST TURRET ////////////////////////////////////////////


#pragma strict
public var bulletSpawn : Transform;
public var bulletDirection : Transform;
public var turretRotator : Transform;
public var shootingJoystick: DoggoShootingJoystickMultiplayer;
public var isShooting : boolean;
public var bullet : GameObject;
public var rotationSpeed : float;
public var fireRate : float;
private var Lag : float;
private var BulletTemp : GameObject;
private var direction : Vector3;
public var bulletSpeed : float;
public var GC : DoggoGCMultiplayer;

function Start () {
	Lag = 0;
	
	//direction = bulletDirection.position - bulletSpawn.position;
}

function FixedUpdate () {

	if (shootingJoystick.GetIsShooting())
	{	
		transform.Rotate(Vector3.right * Time.deltaTime * rotationSpeed);
		if (Time.time > Lag && GC.checkBullet > 0)
		{
			direction = bulletDirection.position - bulletSpawn.position;
			BulletTemp = Instantiate(bullet, bulletSpawn.transform.position, Quaternion.identity);
			BulletTemp.transform.rotation = Quaternion.LookRotation(direction);
			var bulletrb : Rigidbody = BulletTemp.GetComponent.<Rigidbody>();
			bulletrb.velocity = direction * bulletSpeed;
			Lag = Time.time + fireRate;
			GC.ReduceBulletQuantity();
		}
	}
	
}