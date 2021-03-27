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
private var damage : int;


private var playerDis: Vector3;
public var playerDisVal : float;
public var bulletSpawn : Transform;
public var bulletDir : Transform;
public var fireRate : float;
public var bulletSpeed : float;
private var goToStandingOnce : boolean;

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
private var goToWaddlingOnce : boolean;


public var standingMin : float;
public var standingMax : float;
private var standingTimer : float;

public var alertMin : float;
public var alertMax : float;
private var alertTimer : float;
private var calculating2 : boolean;
private var setAlertTimerOnce : boolean;


public var runningSpeed : float;

public var rotatingReference : GameObject;
private var rotRefTransform : Transform;
public var rotateRight : int;
private var goToAttackOnce : boolean;
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
private var checkForAlert : boolean;
private var castFireOnce : boolean;
private var setFireTimerOnce : boolean;
private var fireTimer : float;
public var magicFireBallHolder : GameObject;
private var shortTimerOnce : boolean;

public var playerPos: Transform[];
public var playerPosObj : GameObject[];
public var closestPlayer : Transform;


function Start () {
	
	enemyType = "FireCasterKnight";
	damagePosXVal = 100;
	setEnemyLevel();
	setPlayerWeaponsLvl();
	healthBar.maxValue = 80 + (80 * enemyLvl); 
	healthBar.value = healthBar.maxValue;
	receivedFB = false;
	becomeAlert = false;
	goToWaddlingOnce = false;
	calculating2 = false;
	goToStandingOnce = false;
	goToAttackOnce = false;
	setAlertTimerOnce = false;
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
	playerPos = new Transform[10];
	playerPosObj = GameObject.FindGameObjectsWithTag("Player");
	for(var i : int = 0; i < playerPosObj.Length ; i++)
	{
		playerPos[i] = playerPosObj[i].GetComponent.<Transform>();
	}
	
	anim = GetComponent.<Animator>();
	checkForAlert = true;
	castFireOnce = false;
	setFireTimerOnce = false;
	shortTimerOnce = false;
}

function FixedUpdate () {
	
	actualTime = Time.time;
	
	/*
	if (checkForAlert)
	{
		var distance : Vector3 = playerPos.position - transform.position;
		if (distance.magnitude < 5.0f)
		{
			becomeAlert = true;
			checkForAlert = false;
		}
	}*/
	
	if (healthBar.value <= 0 && !died)
	{
			died = true;
			//Destroy(enemyCanvas);
			anim.SetTrigger("AnyStateToDead1");
			StartCoroutine(GotDefeated());			
	}
	
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("Standing"))
	{
		goToStandingOnce = false;
		setAlertTimerOnce = false;
		goToStandingOnce = false;
		shortTimerOnce = false;
		
		
		if (becomeAlert)
		{
			FindClosestPlayer ();
			playerDis = new Vector3(playerDis.x,0.0f, playerDis.z);
			transform.rotation = Quaternion.LookRotation(playerDis);
			
			anim.SetTrigger("StandingToAlert");
			anim.ResetTrigger("AlertToStanding");
			anim.ResetTrigger("WaddlingToStanding");
			anim.ResetTrigger("RunningToStanding");
			becomeAlert = false;
		}
		
		else if (Time.time > standingTimer)
		{
			if (!goToWaddlingOnce)
			{
				var compX : float = Random.Range(-2.0f,2.0f);
				var compZ : float = Random.Range(-2.0f,2.0f);
				waddlingDir = new Vector3(compX,0.0f,compZ);
				waddlingRot = Quaternion.LookRotation(waddlingDir);
				goToWaddlingOnce = true;
			}
			
			//transform.rotation = waddlingRot;
			//transform.position += (waddlingDir * waddleSpeed * Time.deltaTime);
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
		goToWaddlingOnce = false;
		
		if (becomeAlert)
		{
			FindClosestPlayer ();
			playerDis = new Vector3(playerDis.x,0.0f, playerDis.z);
			transform.rotation = Quaternion.LookRotation(playerDis);
			
			anim.SetTrigger("WaddlingToAlert");
			anim.ResetTrigger("StandingToWaddling");
			becomeAlert = false;
		}
		
		else if (Time.time > waddlingTimer)
		{
			if (!goToStandingOnce)
			{
				goToStandingOnce = true;
				anim.SetTrigger("WaddlingToStanding");
				anim.ResetTrigger("StandingToWaddling");
				standingTimer = Time.time + Random.Range(standingMin, standingMax);
			}
		}
		else
		{
			transform.rotation = Quaternion.Lerp(transform.rotation, waddlingRot, 0.04f);
			rb.velocity = transform.forward * waddleSpeed;
			
			//transform.rotation = waddlingRot;
			//transform.position += (waddlingDir * waddleSpeed * Time.deltaTime);
		}
		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Alert"))
	{
		
		if (!shortTimerOnce)
		{
			alertTimer = Time.time + Random.Range(0.3f, 0.5f);
			shortTimerOnce = true;
		}
		
		else if (!setAlertTimerOnce)
		{
		
			alertTimer = Time.time + Random.Range(alertMin, alertMax);
			setAlertTimerOnce = true;
		}
		
		setFireTimerOnce = false;
		castFireOnce = false;
		
		FindClosestPlayer ();
		playerDis = new Vector3(playerDis.x,0.0f, playerDis.z);
		playerDisVal = playerDis.magnitude;
		playerDis.Normalize();
		transform.rotation = Quaternion.LookRotation(playerDis);
		
		
		if (playerDisVal > 22.0f)
		{
			if (!goToStandingOnce)
			{
				goToStandingOnce = true;
				checkForAlert = true;
				
				anim.SetTrigger("AlertToStanding");
				anim.ResetTrigger("StandingToAlert");
				anim.ResetTrigger("WaddlingToAlert");
				anim.ResetTrigger("RunningToAlert");
			}
		}
		
		else if ( playerDisVal > 0.0f && playerDisVal < 22.0f) 
		{
			if (Time.time > alertTimer)
			{
				if (!goToAttackOnce) 
				{
					goToAttackOnce = true; 
					
					anim.SetTrigger("AlertToAttack");
					anim.ResetTrigger("StandingToAlert");
					anim.ResetTrigger("WaddlingToAlert");
					anim.ResetTrigger("RunningToAlert");
				}
				
			}
		
			
		}
		
		
	}
	
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("Attack 0"))
	{
		goToAttackOnce = false;
		setAlertTimerOnce = false;
		
		/*
		if (!castFireOnce)
		{
			Instantiate(magicFireBallHolder,magicFireBallHolder.transform.position,magicFireBallHolder.transform.rotation);
			castFireOnce = true;
		}*/
		
		if (!setFireTimerOnce)
		{
			fireTimer = Time.time + 0.15f;
			setFireTimerOnce = true;
		}
		
		if (Time.time > fireTimer)
		{
			if (!castFireOnce)
			{
				var projectileObj : GameObject = Instantiate(magicFireBallHolder,magicFireBallHolder.transform.position,magicFireBallHolder.transform.rotation);
				var projectileScript : MagicFireBallHolder = projectileObj.GetComponent.<MagicFireBallHolder>();
				projectileScript.enemyPos = closestPlayer;
				castFireOnce = true;
			}
		}
		


	}
	
	/*
	else if (anim.GetCurrentAnimatorStateInfo(0).IsName("RunningFast"))
	{
			playerDis = playerPos.position - transform.position;
			playerDis = new Vector3(playerDis.x,0.0f, playerDis.z);
			playerDisVal = playerDis.magnitude;
			playerDis.Normalize();
			
	}*/
	
	
	
	

	
}

function OnTriggerEnter (other : Collider){
	
	var mayBecomeAlert : boolean = false;
	damage = 0;
	
	if (other.gameObject.CompareTag("FTBullet"))
	{	
		mayBecomeAlert = true;
		damage = 5 * fastTurretLvl;
		
	}
	
	else if (other.gameObject.CompareTag("GLBullet"))
	{
		mayBecomeAlert = true;
		damage = 25 * granadeLauncherLvl;
	}
	
	else if(other.gameObject.CompareTag("GBBullet"))
	{
		mayBecomeAlert = true;
	}
	
	else if (other.gameObject.CompareTag("FireBullet"))
	{
		damage = 2 * flameThrowerLvl;
		mayBecomeAlert = true;
		//receivedFB = true;
		var fireRB2 : Rigidbody = other.gameObject.GetComponent.<Rigidbody>();
		fireRB2.velocity = Vector3.zero;
	}
	
	else if (other.gameObject.CompareTag("ShortMissile"))
	{
		mayBecomeAlert = true;
		damage = 50 * rocketLauncherLvl;
	}
		
	/*
	if (activateShield)
	{
		lastBulletPos = other.gameObject.transform.position;
	}*/
	
	
	if (mayBecomeAlert)
	{
		makeDamageText(damage);
		getDamage(damage);
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Standing") || anim.GetCurrentAnimatorStateInfo(0).IsName("Waddling") )
		{
			becomeAlert = true;
		}
	}

}

function FindClosestPlayer ()
{

		playerDis = playerPos[0].position - transform.position;
		var sdMagnitude : float = playerDis.magnitude;
		closestPlayer = playerPos[0];
		
		for ( var i : int = 0; i < playerPos.Length ; i++)
	    {
	    	if (playerPos[i] != null)
	    	{
		         var sdAux : Vector3 = playerPos[i].position - transform.position;
		         
		         if (sdAux.magnitude < sdMagnitude)
		         {
		         	playerDis = sdAux;
		         	sdMagnitude = playerDis.magnitude;
		         	closestPlayer = playerPos[i];
		         }
		    }
	    }
}


function OnCollisionEnter (collision : Collision)
{
	if (collision.collider.gameObject.CompareTag("Player"))
	{
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("Standing") || anim.GetCurrentAnimatorStateInfo(0).IsName("Waddling") )
		{
			becomeAlert = true;
		}
	}
}

function setEnemyLevel()
{
	var SC : DoggoSceneCommunicationMultiplayer = GameObject.FindWithTag("SceneCommunicationMultiplayer").GetComponent.<DoggoSceneCommunicationMultiplayer>();
	enemyLvl = SC.fireCasterKnightLvl;
	enemyLvlText.text = "Lvl " + enemyLvl.ToString();
	
}

function getDamage(damage : int)
{
	healthBar.value -= damage;
}

function setPlayerWeaponsLvl()
{
	var SC2 : DoggoSceneCommunicationMultiplayer = GameObject.FindWithTag("SceneCommunicationMultiplayer").GetComponent.<DoggoSceneCommunicationMultiplayer>();
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
	Destroy(gameObject);
}










