#pragma strict
import UnityEngine.UI;

private var died : boolean;
public var enemyExplosion : GameObject;
private var enemyType : String;
private var enemyLvl : int;
public var enemyLvlText: UI.Text;
public var healthBar: UI.Slider;
public var enemyCanvas : GameObject;
public var damageText : GameObject;
public var damagePosXVal : float;
public var damage : int;

public var playerPos: Transform;
private var playerDis: Vector3;
public var playerDisVal : float;
public var bullet : GameObject;
public var bulletSpawn : Transform;
public var bulletDir : Transform;
public var fireRate : float;
private var fireTimer : float;
public var bulletSpeed : float;
private var calculating5 : boolean;

public var activateShield: boolean;
private var anim : Animator;
public var shieldTimer : float;
public var shieldDuration : float;
public var actualTime : float;
private var rb : Rigidbody;

public var check1 : boolean;
public var check2 : boolean;
public var check3 : boolean;

public var waddleMin : float;
public var waddleMax : float;
public var waddleSpeed : float;
private var waddlingTimer : float;
private var waddlingDir : Vector3;
private var waddlingRot : Quaternion;
private var calculating : boolean;


public var standingMin : float;
public var standingMax : float;
private var standingTimer : float;

public var alertMin : float;
public var alertMax : float;
private var alertTimer : float;
private var calculating2 : boolean;
private var calculating4 : boolean;


public var runningSpeed : float;

public var rotatingReference : GameObject;
private var rotRefTransform : Transform;
public var rotateRight : int;
private var calculating3 : boolean;
public var rotSpeed : float; 

public var attackingMin : float;
public var attackingMax : float;
public var attackingTimer : float;

public var armRight : Transform;
public var middleArmRight : Transform;
//public var lastBulletPos : Vector3;
private var becomeAlert : boolean;

private var receivedFB : boolean;
//private var fireRB : Rigidbody;

public var fastTurretLvl : int;
public var granadeLauncherLvl : int;
public var rocketLauncherLvl : int;
public var flameThrowerLvl : int;
public var gravityBomberLvl : int;

public var absorbed : boolean;
public var GBBulletPos : Transform;
public var inNucleum : boolean;
public var absorbSpeed : float;
public var absorbDir : Vector3;
public var rotationDir : Vector3;
public var increment : float;
public var rotationSpeed : float;
public var startRot : Quaternion;
public var startY : float;
public var col : BoxCollider;
public var coin : GameObject;

function Start () {
	
	enemyType = "shieldknight";
	damagePosXVal = 100;
	setEnemyLevel();
	setPlayerWeaponsLvl();
	healthBar.maxValue = 50 + (50 * enemyLvl); 
	healthBar.value = healthBar.maxValue;
	receivedFB = false;
	becomeAlert = false;
	calculating = false;
	calculating2 = false;
	calculating3 = false;
	calculating4 = false;
	calculating5 = false;
	check1 = false;
	check2 = false;
	check3 = false;
	rotateRight = 0;
	rb = GetComponent.<Rigidbody>();
	alertTimer = 0.0f;
	waddlingTimer = 0.0f;
	standingTimer = 0.0f;
	actualTime = 0.0f;
	shieldTimer = 0.0f;
	attackingTimer = 0.0f;
	activateShield = false;
	died = false;
	playerPos = GameObject.FindWithTag("Player").GetComponent.<Transform>();
	anim = GetComponent.<Animator>();
	
	increment = absorbSpeed;
	rotationDir = new Vector3(Random.Range(50,200),Random.Range(50,200), Random.Range(50,200));
	startRot = transform.rotation;
	
	StartCoroutine(getStartY());
	startY = transform.position.y;
	col = GetComponent.<BoxCollider>();

}

function FixedUpdate () {
	
	actualTime = Time.time;
	
	if (activateShield)
	{
	
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Standing"))
		{
			anim.SetTrigger("StandingToShielding");
			anim.ResetTrigger("AlertToStanding");
			anim.ResetTrigger("WaddlingToStanding");
			anim.ResetTrigger("RunningToStanding");
		}
		
		else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Alert"))
		{
			anim.SetTrigger("AlertToShielding");
			anim.ResetTrigger("RunningToAlert");
			anim.ResetTrigger("WaddlingToAlert");
			anim.ResetTrigger("StandingToAlert");
			anim.ResetTrigger("ShieldingToAlert");
			anim.ResetTrigger("AttackingRightToAlert");
			anim.ResetTrigger("AttackingLeftToAlert");
		}
		
		else if (anim.GetCurrentAnimatorStateInfo(0).IsName("RunningFast"))
		{
			anim.SetTrigger("RunningToShielding");
			anim.ResetTrigger("ShieldingToRunning");
			anim.ResetTrigger("AlertToRunning");
		}
		
		else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Waddling"))
		{
			anim.SetTrigger("WaddlingToShielding");
			anim.ResetTrigger("StandingToWaddling");
		}
		
		else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shielding"))
		{
			anim.Play("Shielding", 0, 0f);
			
			/*
			if (receivedFB)
			{
				fireRB.velocity = Vector3.zero;
				fireRB = null;
				receivedFB = false;
			}*/
			
		}
		
		/*
		var hitDir : Vector3 = lastBulletPos - transform.position;
		hitDir = new Vector3(hitDir.x,0.0f, hitDir.z);
		var hitRot : Quaternion = Quaternion.LookRotation(hitDir);
		transform.rotation = hitRot;*/
		
		shieldTimer = Time.time + shieldDuration;
		activateShield = false;
		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Shielding"))
	{	
		/*
		if (receivedFB)
		{
			fireRB.velocity = Vector3.zero;
			fireRB = null;
			receivedFB = false;
		}*/
			
						
		if (Time.time > shieldTimer)
		{
			anim.SetTrigger("ShieldingToAlert");
			anim.ResetTrigger("StandingToShielding");
			anim.ResetTrigger("WaddlingToShielding");
			anim.ResetTrigger("RunningToShielding");
			anim.ResetTrigger("AlertToShielding");
		}
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Standing"))
	{
		if (becomeAlert)
		{
			var dir2 : Vector3 = playerPos.position - transform.position;
			dir2 = new Vector3(dir2.x,0.0f, dir2.z);
			var rot2 : Quaternion = Quaternion.LookRotation(dir2);
			transform.rotation = rot2;
			
			anim.SetTrigger("StandingToAlert");
			anim.ResetTrigger("AlertToStanding");
			anim.ResetTrigger("WaddlingToStanding");
			anim.ResetTrigger("RunningToStanding");
			becomeAlert = false;
		}
		
		else if (Time.time > standingTimer)
		{
			if (!calculating)
			{
				var compX : float = Random.Range(-2.0f,2.0f);
				var compZ : float = Random.Range(-2.0f,2.0f);
				waddlingDir = new Vector3(compX,0.0f,compZ);
				waddlingRot = Quaternion.LookRotation(waddlingDir);
				calculating = true;
			}
			
			transform.rotation = Quaternion.Lerp(transform.rotation, waddlingRot, 0.075f);
			rb.velocity = transform.forward * waddleSpeed;
				
			anim.SetTrigger("StandingToWaddling");
			anim.ResetTrigger("AlertToStanding");
			anim.ResetTrigger("WaddlingToStanding");
			anim.ResetTrigger("RunningToStanding");
			
			waddlingTimer = Time.time + Random.Range(waddleMin,waddleMax);
			
		}
		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Waddling"))
	{
		calculating = false;
		
		if (becomeAlert)
		{
			var dir : Vector3 = playerPos.position - transform.position;
			dir = new Vector3(dir.x,0.0f, dir.z);
			var rot : Quaternion = Quaternion.LookRotation(dir);
			transform.rotation = rot;
			
			anim.SetTrigger("WaddlingToAlert");
			anim.ResetTrigger("StandingToWaddling");
			becomeAlert = false;
		}
		
		else if (Time.time > waddlingTimer)
		{
			anim.SetTrigger("WaddlingToStanding");
			anim.ResetTrigger("StandingToWaddling");
			standingTimer = Time.time + Random.Range(standingMin, standingMax);
		}
		else
		{
			transform.rotation = Quaternion.Lerp(transform.rotation, waddlingRot, 0.04f);
			rb.velocity = transform.forward * waddleSpeed;
		}
		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Alert"))
	{
		calculating5 = false;
		
		if (!calculating4)
			alertTimer = Time.time + Random.Range(alertMin, alertMax);
		
		calculating4 = true;
		
		playerDis = playerPos.position - transform.position;
		playerDis = new Vector3(playerDis.x,0.0f, playerDis.z);
		playerDisVal = playerDis.magnitude;
		playerDis.Normalize();
		transform.rotation = Quaternion.LookRotation(playerDis);
		
		if (playerDisVal > 14.0f && playerDisVal < 22.0f)
		{
			calculating4 = false;
			var runningRot : Quaternion = Quaternion.LookRotation(playerDis);
			transform.rotation = runningRot;
			transform.position += (playerDis * runningSpeed * Time.deltaTime);
			
			anim.SetTrigger("AlertToRunning");
			anim.ResetTrigger("StandingToAlert");
			anim.ResetTrigger("WaddlingToAlert");
			anim.ResetTrigger("RunningToAlert");
			anim.ResetTrigger("ShieldingToAlert");
			anim.ResetTrigger("AttackingRightToAlert");
			
			
			
		}
		
		else if (playerDisVal > 22.0f)
		{
			calculating4 = false;
			anim.SetTrigger("AlertToStanding");
			anim.ResetTrigger("StandingToAlert");
			anim.ResetTrigger("WaddlingToAlert");
			anim.ResetTrigger("RunningToAlert");
			anim.ResetTrigger("ShieldingToAlert");
			anim.ResetTrigger("AttackingRightToAlert");
		}
		
		else if ( playerDisVal > 5.0f && playerDisVal < 14.0f) 
		{
			if (Time.time > alertTimer)
			{
				if (!calculating3) 
				{
					rotatingReference = new GameObject();
					rotRefTransform = rotatingReference.GetComponent.<Transform>();
					rotRefTransform.position = playerPos.position;
					transform.parent = rotRefTransform;
					rotateRight = Random.Range(0,2);
					
					attackingTimer = Time.time + Random.Range(attackingMin, attackingMax);
					
					calculating3 = true; 
					
					if (rotateRight == 0)
					{
						anim.SetTrigger("AlertToAttackingRight");
					}
					else
					{
						anim.SetTrigger("AlertToAttackingLeft");
					}
					
					anim.ResetTrigger("StandingToAlert");
					anim.ResetTrigger("WaddlingToAlert");
					anim.ResetTrigger("RunningToAlert");
					anim.ResetTrigger("ShieldingToAlert");
					anim.ResetTrigger("AttackingRightToAlert");
					anim.ResetTrigger("AttackingLeftToAlert");
				}
				
				var LookDirection : Vector3;
				var RotationDirection: Quaternion;
					
				
				LookDirection = rotRefTransform.position - transform.position;
				LookDirection = new Vector3(LookDirection.x, 0.0f, LookDirection.z);
						
				RotationDirection = Quaternion.LookRotation (LookDirection);
				transform.rotation = RotationDirection;
				
				if (rotateRight == 0)
				{
					check3 = true;
					rotRefTransform.eulerAngles += new Vector3(0.0f,1,0.0f) * rotSpeed * Time.deltaTime;
					transform.eulerAngles +=  new Vector3(0,-90,0);
					//armRight.rotation = RotationDirection;
					//armRight.eulerAngles += new Vector3(-90,0,0);

				}
				else
				{
					rotRefTransform.eulerAngles += new Vector3(0.0f,1,0.0f) * -rotSpeed * Time.deltaTime;
					transform.eulerAngles +=  new Vector3(0,90,0);
					//armRight.eulerAngles += new Vector3(-90,0,-90);
					//middleArmRight.rotation =RotationDirection;
					//middleArmRight.eulerAngles += new Vector3(90,180,0);
				}

				
			}
		
			
		}
		
		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("RunningFast"))
	{
			playerDis = playerPos.position - transform.position;
			playerDis = new Vector3(playerDis.x,0.0f, playerDis.z);
			playerDisVal = playerDis.magnitude;
			playerDis.Normalize();
			
			if (playerDisVal > 14.0f && playerDisVal < 22.0f)
			{
				var runningRot2 : Quaternion = Quaternion.LookRotation(playerDis);
				transform.rotation = runningRot2;
				transform.position += (playerDis * runningSpeed * Time.deltaTime);
			}
			
			else if (playerDisVal > 22.0f)
			{
				anim.SetTrigger("RunningToStanding");
				anim.ResetTrigger("ShieldingToRunning");
				anim.ResetTrigger("AlertToRunning");
			}
			
			else if (playerDisVal < 14.2f)
			{
				anim.SetTrigger("RunningToAlert");
				anim.ResetTrigger("ShieldingToRunning");
				anim.ResetTrigger("AlertToRunning");
			}
		
	}
	
	
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("AttackingRight"))
	{	
		if (healthBar.value <= 0 && !died)
		{
			died = true;
			//Destroy(enemyCanvas);
			anim.SetTrigger("AnyStateToDead1");
			StartCoroutine(GotDefeated());			
		}
		
		else if (!died)
		{
			calculating3 = false;
			calculating4 = false;
			
			var LookDirection2 : Vector3;
			var RotationDirection2: Quaternion;
						
					
			LookDirection2 = rotRefTransform.position - transform.position;
			LookDirection2 = new Vector3(LookDirection2.x, 0.0f, LookDirection2.z);
							
			RotationDirection2 = Quaternion.LookRotation (LookDirection2);
			transform.rotation = RotationDirection2;
					
			//if (rotateRight == 0)
			//{
				check3 = true;
				rotRefTransform.eulerAngles += new Vector3(0.0f,1,0.0f) * rotSpeed * Time.deltaTime;
				transform.eulerAngles +=  new Vector3(0,-90,0);
				//armRight.rotation = RotationDirection2;
				//armRight.eulerAngles += new Vector3(-90,0,0);
			//}
			/*
			else
			{
				rotRefTransform.eulerAngles += new Vector3(0.0f,1,0.0f) * -rotSpeed * Time.deltaTime;
				transform.eulerAngles +=  new Vector3(0,90,0);
				armRight.eulerAngles += new Vector3(-90,0,-90);
				middleArmRight.rotation = RotationDirection2;
				middleArmRight.eulerAngles += new Vector3(90,180,0);
			}*/
			
			if (Time.time > attackingTimer)
			{
				//if (rotateRight == 0)
				//{
					anim.SetTrigger("AttackingRightToAlert");
					anim.ResetTrigger("AlertToAttackingRight");
					transform.eulerAngles +=  new Vector3(0,90,0);
				//}
				/*
				else 
				{
					anim.SetTrigger("AttackingLeftToAlert");
					anim.ResetTrigger("AlertToAttackingLeft");
					transform.eulerAngles +=  new Vector3(0,-90,0);
				}*/	
			}
			
			else
			{	
				if (!calculating5)
				{
					fireTimer = Time.time + fireRate;
					calculating5 = true;
				}
				if (Time.time > fireTimer)
				{
					var bDir = bulletDir.position - bulletSpawn.position;
					var BulletTemp = Instantiate(bullet, bulletSpawn.transform.position, Quaternion.identity);
					BulletTemp.transform.rotation = Quaternion.LookRotation(bDir);
					var bRB : Rigidbody = BulletTemp.GetComponent.<Rigidbody>();
					bRB.velocity = bDir * bulletSpeed;
					fireTimer = Time.time + fireRate;
				}
			}
		}

		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("AttackingLeft"))
	{
		
		if (healthBar.value <= 0 && !died)
		{
			died = true;
			//Destroy(enemyCanvas);
			anim.SetTrigger("AnyStateToDead1");
			StartCoroutine(GotDefeated());			
		}
		else if (!died)
		{
			calculating3 = false;
			calculating4 = false;
			
			var LookDirection3 : Vector3;
			var RotationDirection3: Quaternion;
						
					
			LookDirection3 = rotRefTransform.position - transform.position;
			LookDirection3 = new Vector3(LookDirection3.x, 0.0f, LookDirection3.z);
							
			RotationDirection3 = Quaternion.LookRotation (LookDirection3);
			transform.rotation = RotationDirection3;
			rotRefTransform.eulerAngles += new Vector3(0.0f,1,0.0f) * -rotSpeed * Time.deltaTime;
			transform.eulerAngles +=  new Vector3(0,90,0);
			//armRight.eulerAngles += new Vector3(-90,0,-90);
			//middleArmRight.rotation = RotationDirection2;
			//middleArmRight.eulerAngles += new Vector3(90,180,0);
				
			if (Time.time > attackingTimer)
			{
					anim.SetTrigger("AttackingLeftToAlert");
					anim.ResetTrigger("AlertToAttackingLeft");
					transform.eulerAngles +=  new Vector3(0,-90,0);
			}
			
			else
			{	
				if (!calculating5)
				{
					fireTimer = Time.time + fireRate;
					calculating5 = true;
				}
				if (Time.time > fireTimer)
				{
					var bDir2 = bulletDir.position - bulletSpawn.position;
					var BulletTemp2 = Instantiate(bullet, bulletSpawn.transform.position, Quaternion.identity);
					BulletTemp2.transform.rotation = Quaternion.LookRotation(bDir2);
					var bRB2 : Rigidbody = BulletTemp2.GetComponent.<Rigidbody>();
					bRB2.velocity = bDir2 * bulletSpeed;
					fireTimer = Time.time + fireRate;
				}
			}
		}

		
	}
	
	if (absorbed)
	{
		anim.SetTrigger("AnyStateToAbsorbed");
	}
	
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("Absorbed"))
	{
	
		if (GBBulletPos != null)
		{
			absorbDir = GBBulletPos.position - transform.position;
			rb.useGravity = false;
			rb.velocity = absorbDir.normalized * increment;
			col.isTrigger = true;
			increment += 0.15;
			transform.eulerAngles +=  rotationDir * rotationSpeed * Time.deltaTime;
			
			if (inNucleum)
			{
				//makeDamageText(damage);
				getDamage(damage);
			}
		}
		else
		{
			if (healthBar.value <= 0 && !died)
			{
				died = true;
				//Destroy(enemyCanvas);
				anim.SetTrigger("AnyStateToDead1");
				StartCoroutine(GotDefeated());			
			}
			else
			{
				anim.SetTrigger("AbsorbedToAlert");
				anim.ResetTrigger("AnyStateToAbsorbed");
				increment = absorbSpeed;
				absorbed = false;
				inNucleum = false;
			}
			transform.rotation = Quaternion.Lerp(transform.rotation, startRot, 0.075f);
			rb.useGravity = true;
			col.isTrigger = false;
			//transform.position.y = startY;
		}
		
	}
	
	else if (transform.position.y < startY)
	{
		var temp : Vector3 = new Vector3(transform.position.x,startY, transform.position.z);
		transform.position = Vector3.Lerp(transform.position,temp,0.15);
	}
	
	
	
}

function OnTriggerEnter (other : Collider){
	
	//damage = 0;
	
	if (other.gameObject.CompareTag("FTBullet"))
	{	
		activateShield = true;
		damage = 5 * fastTurretLvl;
	}
	
	else if (other.gameObject.CompareTag("GLBullet"))
	{
		activateShield = true;
		damage = 25 * granadeLauncherLvl;
	}
	
	else if(other.gameObject.CompareTag("GBBullet"))
	{
		absorbed = true;
		GBBulletPos = other.gameObject.GetComponent.<Transform>();
		damage = 1 * gravityBomberLvl;
		
	}
	
	else if (other.name == "Nucleum")
	{
		inNucleum = true;
	}
	
	else if (other.gameObject.CompareTag("FireBullet"))
	{
		damage = 2 * flameThrowerLvl;
		activateShield = true;
		//receivedFB = true;
		var fireRB2 : Rigidbody = other.gameObject.GetComponent.<Rigidbody>();
		fireRB2.velocity = Vector3.zero;
	}
	
	else if (other.gameObject.CompareTag("ShortMissile"))
	{
		activateShield = true;
		damage = 50 * rocketLauncherLvl;
	}
		
	/*
	if (activateShield)
	{
		lastBulletPos = other.gameObject.transform.position;
	}*/
	
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("AttackingRight") || anim.GetCurrentAnimatorStateInfo(0).IsName("AttackingLeft"))
	{	
		if (activateShield)
		{
			makeDamageText(damage);
			getDamage(damage);
		}
	}

}


function OnCollisionEnter (collision : Collision)
{
	if (collision.collider.gameObject.CompareTag("Player"))
		becomeAlert = true;
}

function setEnemyLevel()
{
	var SC : DoggoSceneCommunication = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
	enemyLvl = SC.shieldKnightLvl;
	enemyLvlText.text = "Lvl " + enemyLvl.ToString();
	
}

function getDamage(damage : int)
{
	healthBar.value -= damage;
}

function setPlayerWeaponsLvl()
{
	var SC2 : DoggoSceneCommunication = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
	fastTurretLvl = SC2.fastTurretLvl;
	granadeLauncherLvl = SC2.granadeLauncherLvl;
	rocketLauncherLvl = SC2.rocketLauncherLvl;
	flameThrowerLvl = SC2.flameThrowerLvl;
	gravityBomberLvl = SC2.gravityBomberLvl;

}

function makeDamageText(damageVal : int)
{
	var damageTextObj : GameObject = Instantiate(damageText,Vector3.zero,Quaternion.identity);
	var textComp : Text = damageTextObj.GetComponent.<Text>();
	textComp.text = damageVal.ToString() + "!";
	var rt : RectTransform = damageTextObj.GetComponent.<RectTransform>();
	var rtParent : RectTransform = enemyCanvas.GetComponent.<RectTransform>();
	rt.SetParent(rtParent, false);
	rt.anchoredPosition = new Vector3(damagePosXVal,0,0);
	rt.localScale = new Vector3(1f,1f,1f);
	rt.eulerAngles += new Vector3(40,0,0);
	damageTextObj.SetActive(true);
	if (damagePosXVal == 150)
		damagePosXVal = 100;
	else
		damagePosXVal = 150;
}


function GotDefeated()
{
	yield WaitForSeconds(1.2f);
	Instantiate(enemyExplosion, transform.position, Quaternion.identity);
	ProduceCoins();
	Destroy(gameObject);
}

function getStartY()
{
	yield WaitForSeconds(0.3f);
	startY = transform.position.y;
}


function ProduceCoins(){

	var itemsQuantity : int = Random.Range(0,3);
	
	for(var i : int = 0; i < itemsQuantity; i++)
    {
			var produced : GameObject = Instantiate(coin, transform.position, Quaternion.identity);
			var randomDir : Vector3 = new Vector3(Random.Range(-1.0f,1.0f),Random.Range(0.0f,1.0f),Random.Range(-1.0f,1.0f));
			var rb : Rigidbody = produced.GetComponent.<Rigidbody>();
			rb.AddForce(randomDir * 10, ForceMode.Impulse);
	}


}









