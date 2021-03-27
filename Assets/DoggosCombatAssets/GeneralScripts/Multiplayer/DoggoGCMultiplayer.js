#pragma strict
import UnityEngine.UI;

public var weaponsArray : GameObject[];//Arreglo con todas las armas
public var wearablesArray : GameObject[];//Arreglo con toda la miscelanea (sombreros, collares, botas, anteojos, etc.)
public var charactersArray : GameObject[];//Arreglo con todos los personajes
public var actualPlayer : GameObject; //Personaje elegido en el menu y que sera instanciado en escena y que permanecera en escena mientras el jugador este en modo de juego
public var startPlayerPosition : Vector3;
public var leftWeaponPos : Transform;
public var rightWeaponPos : Transform;
private var leftWeaponObj : GameObject;
private var rightWeaponObj : GameObject;
public var weaponRotator : Transform;
private var doggoMovable : DoggoMoveMultiplayer;
private var doggoAnimator : Animator;
private var doggoHealth : DoggoHealthManagerMultiplayer;

public var playerHealth : UI.Slider;
public var healthText : UI.Text;

private var testNumber : int;
private var SC2 : DoggoSceneCommunicationMultiplayer;
private var callOnce : boolean;
public var weaponExplosion : GameObject;
public var beltExplosion : GameObject; 
public var died : boolean;

public var weaponsBullets : int[];
public var assignedWeapon : int;
public var bulletsText : UI.Text;
public var checkBullet : int;

public var enemyAura : GameObject;

public var doggoButton3 : DoggoWeaponAssignerMultiplayer;

var MJoystick : DoggoMovingJoystickMultiplayer ;
var SJoystick : DoggoShootingJoystickMultiplayer ;

public var cameraP1 : DoggoCameraMultiplayer;
public var cameraP2 : DoggoCameraMultiplayer;

function Start () {
	
	if (gameObject.tag == "GameControllerP1")
	{
		SC2 = GameObject.FindWithTag("SceneCommunicationMultiplayer").GetComponent.<DoggoSceneCommunicationMultiplayer>();
		doggoButton3 = GameObject.FindWithTag("WeaponButton3P1").GetComponent.<DoggoWeaponAssignerMultiplayer>();
		doggoButton3.weaponAssigned = SC2.weaponSlot3P1;
		
		/*
				var hingeJoints: Component[];
			hingeJoints = GetComponentsInChildren(HingeJoint);
			if (hingeJoints != null) {
				for (var joint: HingeJoint in hingeJoints)
					joint.useSpring = false;
			}
		*/
		actualPlayer = Instantiate(charactersArray[SC2.selectedPlayerP1], startPlayerPosition, charactersArray[SC2.selectedPlayerP1].transform.rotation);
	    actualPlayer.name = "P1";
	    //actualPlayer.SetActive(false);
	    MJoystick  = GameObject.FindWithTag("MovementJoystickP1").GetComponent.<DoggoMovingJoystickMultiplayer>();
	    SJoystick  = GameObject.FindWithTag("ShootingJoystickP1").GetComponent.<DoggoShootingJoystickMultiplayer>();
		
	    var deactivateScript3 : DoggoMove = 	actualPlayer.GetComponent.<DoggoMove>();
	    deactivateScript3.enabled = false;
	    
	    var activateScript3 : DoggoMoveMultiplayer = actualPlayer.GetComponent.<DoggoMoveMultiplayer>();
	    activateScript3.enabled = true;
	    activateScript3.mobileJoystick = MJoystick;
	    activateScript3.shootingJoystick = SJoystick;
	    
	 	var deactivateScript4 : DoggoHealthManager = 	actualPlayer.GetComponent.<DoggoHealthManager>();
	    deactivateScript4.enabled = false;
	    Destroy(deactivateScript4);
	    
	    var activateScript4 : DoggoHealthManagerMultiplayer = actualPlayer.GetComponent.<DoggoHealthManagerMultiplayer>();
	    activateScript4.enabled = true;
	    activateScript4.GC = gameObject.GetComponent.<DoggoGCMultiplayer>();
	    activateScript4.SC = SC2; 
	    
		var objectsInPlayer2 : Component[] = actualPlayer.GetComponentsInChildren(Transform);
		
		if (objectsInPlayer2 != null){
		
			for (var anObject2: Transform in objectsInPlayer2){
				if (anObject2.name == "LeftWeapon"){
					leftWeaponPos = anObject2;
				}
				else if (anObject2.name == "RightWeapon"){
					rightWeaponPos = anObject2;
				}
				else if(anObject2.name == "Rotator"){
					weaponRotator = anObject2;
				}
			}
		
		}
		
		
		assignedWeapon = SC2.weaponSlot1P1;
		AssignPlayerWeapon(assignedWeapon);
		testNumber = 0;
		doggoMovable = actualPlayer.GetComponent.<DoggoMoveMultiplayer>();
		doggoAnimator = actualPlayer.GetComponent.<Animator>();
		doggoHealth = actualPlayer.GetComponent.<DoggoHealthManagerMultiplayer>();
		doggoHealth.SC = SC2;
		doggoHealth.GC = gameObject.GetComponent.<DoggoGCMultiplayer>();
		//leftWeaponObj = Instantiate(weaponsArray[0], leftWeaponPos.position, leftWeaponPos.rotation);;
		//rightWeaponObj = Instantiate(weaponsArray[0], rightWeaponPos.position, rightWeaponPos.rotation);
		callOnce = false;
		playerHealth.maxValue = SC2.maxPlayerHealthP1;
		playerHealth.value = playerHealth.maxValue;
		healthText.text = playerHealth.value.ToString() + " / " + playerHealth.maxValue.ToString();
		died = false;
		weaponsBullets = SC2.weaponsBulletsP1;
		bulletsText.text = weaponsBullets[assignedWeapon].ToString();
		checkBullet = weaponsBullets[assignedWeapon];
		
		cameraP1 = GameObject.FindGameObjectWithTag("CameraP1").GetComponent.<DoggoCameraMultiplayer>();
		cameraP1.playerPos = actualPlayer.GetComponent.<Transform>();
		//actualPlayer.SetActive(true);
		
		//StartCoroutine(TemporalCreateEnemy());
	}
	else if (gameObject.tag == "GameControllerP2")
	{
		SC2 = GameObject.FindWithTag("SceneCommunicationMultiplayer").GetComponent.<DoggoSceneCommunicationMultiplayer>();
		doggoButton3 = GameObject.FindWithTag("WeaponButton3P2").GetComponent.<DoggoWeaponAssignerMultiplayer>();
		doggoButton3.weaponAssigned = SC2.weaponSlot3P2;
		
		/*
				var hingeJoints: Component[];
			hingeJoints = GetComponentsInChildren(HingeJoint);
			if (hingeJoints != null) {
				for (var joint: HingeJoint in hingeJoints)
					joint.useSpring = false;
			}
		*/
		actualPlayer = Instantiate(charactersArray[SC2.selectedPlayerP2], startPlayerPosition, charactersArray[SC2.selectedPlayerP2].transform.rotation);
	    actualPlayer.name = "P2";
	    //actualPlayer.SetActive(false);
	    MJoystick  = GameObject.FindWithTag("MovementJoystickP2").GetComponent.<DoggoMovingJoystickMultiplayer>();
	    SJoystick  = GameObject.FindWithTag("ShootingJoystickP2").GetComponent.<DoggoShootingJoystickMultiplayer>();
		
	    var deactivateScript : DoggoMove = 	actualPlayer.GetComponent.<DoggoMove>();
	    deactivateScript.enabled = false;
	    
	    var activateScript : DoggoMoveMultiplayer = actualPlayer.GetComponent.<DoggoMoveMultiplayer>();
	    activateScript.enabled = true;
	    activateScript.mobileJoystick = MJoystick;
	    activateScript.shootingJoystick = SJoystick;
	    
	 	var deactivateScript2 : DoggoHealthManager = 	actualPlayer.GetComponent.<DoggoHealthManager>();
	    deactivateScript2.enabled = false;
	    Destroy(deactivateScript2);
	    
	    var activateScript2 : DoggoHealthManagerMultiplayer = actualPlayer.GetComponent.<DoggoHealthManagerMultiplayer>();
	    activateScript2.enabled = true;
	    activateScript2.GC = gameObject.GetComponent.<DoggoGCMultiplayer>();
	    activateScript2.SC = SC2; 
	    
		var objectsInPlayer : Component[] = actualPlayer.GetComponentsInChildren(Transform);
		
		if (objectsInPlayer != null){
		
			for (var anObject: Transform in objectsInPlayer){
				if (anObject.name == "LeftWeapon"){
					leftWeaponPos = anObject;
				}
				else if (anObject.name == "RightWeapon"){
					rightWeaponPos = anObject;
				}
				else if(anObject.name == "Rotator"){
					weaponRotator = anObject;
				}
			}
		
		}
		
		
		assignedWeapon = SC2.weaponSlot1P2;
		AssignPlayerWeapon(assignedWeapon);
		testNumber = 0;
		doggoMovable = actualPlayer.GetComponent.<DoggoMoveMultiplayer>();
		doggoAnimator = actualPlayer.GetComponent.<Animator>();
		doggoHealth = actualPlayer.GetComponent.<DoggoHealthManagerMultiplayer>();
		doggoHealth.SC = SC2;
		doggoHealth.GC = gameObject.GetComponent.<DoggoGCMultiplayer>();
		//leftWeaponObj = Instantiate(weaponsArray[0], leftWeaponPos.position, leftWeaponPos.rotation);;
		//rightWeaponObj = Instantiate(weaponsArray[0], rightWeaponPos.position, rightWeaponPos.rotation);
		callOnce = false;
		playerHealth.maxValue = SC2.maxPlayerHealthP2;
		playerHealth.value = playerHealth.maxValue;
		healthText.text = playerHealth.value.ToString() + " / " + playerHealth.maxValue.ToString();
		died = false;
		weaponsBullets = SC2.weaponsBulletsP2;
		bulletsText.text = weaponsBullets[assignedWeapon].ToString();
		checkBullet = weaponsBullets[assignedWeapon];
		
		cameraP2 = GameObject.FindGameObjectWithTag("CameraP2").GetComponent.<DoggoCameraMultiplayer>();
		cameraP2.playerPos = actualPlayer.GetComponent.<Transform>();
		//actualPlayer.SetActive(true);
		
		//StartCoroutine(TemporalCreateEnemy());
	}
}

function Update () {
	
	if (playerHealth.value <= 0)
		if (!callOnce)
		{
			callOnce = true;
			LostGame();
		}
		

}

function AssignPlayerWeapon(number : int){

	/*
	NumberWeapon += 1;
	if (NumberWeapon >= 5)
		NumberWeapon = 0;*/
		
	//actualPlayer = GameObject.FindWithTag("Player");
	//Wimage1.sprite = WeaponsImage[NumberWeapon];
	if (leftWeaponObj == null && rightWeaponObj == null)
	{
		leftWeaponObj = Instantiate(weaponsArray[number], leftWeaponPos.position, leftWeaponPos.rotation);;
		rightWeaponObj = Instantiate(weaponsArray[number], rightWeaponPos.position, rightWeaponPos.rotation);
		leftWeaponObj.SetActive(false);
		rightWeaponObj.SetActive(false);
	}
	else
	{
		Destroy(leftWeaponObj);
		Destroy(rightWeaponObj);
		leftWeaponObj = Instantiate(weaponsArray[number], leftWeaponPos.position, leftWeaponPos.rotation);;
		rightWeaponObj = Instantiate(weaponsArray[number], rightWeaponPos.position, rightWeaponPos.rotation);
	}
	
	
	//ActualWeapon = GameObject.FindWithTag("ActualWeapon");
	//Destroy(ActualWeapon);
	//var ActualWeapon = Instantiate(WeaponObject[NumberWeapon],WeaponPos[0].position,Quaternion.identity);
	
	//ActualWeapon.transform.rotation = player.transform.rotation;
	//ActualWeapon.transform.parent = player.transform; 
	leftWeaponObj.transform.parent = weaponRotator;
	rightWeaponObj.transform.parent = weaponRotator;
	
	SetUpWeaponScript(leftWeaponObj);
	SetUpWeaponScript(rightWeaponObj);
	
	if (gameObject.tag == "GameControllerP1")
	{
		leftWeaponObj.name = "LWP1";
		rightWeaponObj.name = "RWP1";
	}
	
	else if (gameObject.tag == "GameControllerP2")
	{
		leftWeaponObj.name = "LWP2";
		rightWeaponObj.name = "RWP2";
	}
	
	leftWeaponObj.SetActive(true);
	rightWeaponObj.SetActive(true);

}


function SetUpWeaponScript(weapon : GameObject){
	
	
	
	if (weapon.tag == "FastTurretM"){
		var temp1 : FastTurretMultiplayer = weapon.GetComponent.<FastTurretMultiplayer>();
		temp1.shootingJoystick = SJoystick;
	}
	else if (weapon.tag == "FlameThrowerM"){
		var temp2 : FlameThrowerMultiplayer = weapon.GetComponent.<FlameThrowerMultiplayer>();
		temp2.shootingJoystick = SJoystick;
		temp2.GC = this;
	}
	else if (weapon.tag == "GranadeLauncherM"){
		var temp3 : GranadeLauncherMultiplayer = weapon.GetComponent.<GranadeLauncherMultiplayer>();
		temp3.shootingJoystick = SJoystick;
		temp3.GC = this;
	}
	else if (weapon.tag == "GravityBomberM"){
		var temp4 : GravityBomberMultiplayer = weapon.GetComponent.<GravityBomberMultiplayer>();
		temp4.shootingJoystick = SJoystick;
		temp4.GC = this;
	}
	else if (weapon.tag == "RocketLauncherM"){
		var temp5 : RocketLauncherM = weapon.GetComponent.<RocketLauncherM>();
		temp5.shootingJoystick = SJoystick;
		temp5.GC = this;
	}

}

function ChangeWeapon(weaponNumber : int){	
	
	if (!died)
	{
		AssignPlayerWeapon(weaponNumber);
		assignedWeapon = weaponNumber;
		checkBullet = weaponsBullets[assignedWeapon];

		if (weaponNumber != 0)
			bulletsText.text = weaponsBullets[weaponNumber].ToString();
		else 
			bulletsText.text = "Infinite";
	}
}

function makeDamage(damage : int)
{
	var newHealth: int = playerHealth.value - damage; 
	StartCoroutine(LerpDamage(newHealth));
}

function LerpDamage(newHealth : int)
{
	while (playerHealth.value > newHealth)
	{
		playerHealth.value -= 1f;
		healthText.text = playerHealth.value.ToString() + " / " + playerHealth.maxValue.ToString();
		yield;
	}
	
}


function LostGame ()
{
	died = true;
	doggoHealth.enabled = false;
	doggoMovable.enabled = false;
	Instantiate(weaponExplosion, leftWeaponObj.transform.position, Quaternion.identity);
	Instantiate(weaponExplosion, rightWeaponObj.transform.position, Quaternion.identity);
	Destroy(leftWeaponObj);
	Destroy(rightWeaponObj);
	doggoAnimator.SetTrigger("AnyStateToFainted");
	StartCoroutine(DestroyRotator());
}

function DestroyRotator()
{
	yield WaitForSeconds(1.0f);
	Instantiate(beltExplosion, weaponRotator.parent.transform.position, Quaternion.identity);
	Destroy(weaponRotator.parent.gameObject);
}

/*
function TemporalCreateEnemy()
{
	yield WaitForSeconds(1.0f);
	Instantiate(enemiesArray[0], enemiesArray[0].transform.position, enemiesArray[0].transform.rotation);
	Instantiate(enemiesArray[1], enemiesArray[1].transform.position, enemiesArray[1].transform.rotation);

}*/

function ReduceBulletQuantity()
{
	
		if (assignedWeapon != 0)
		{
			if (assignedWeapon == 1 || assignedWeapon == 2 || assignedWeapon == 3 || assignedWeapon == 4)
				weaponsBullets[assignedWeapon] -= 1;
			
			else
			{
				weaponsBullets[assignedWeapon] -= 2;
				
				if (weaponsBullets[assignedWeapon] < 0)
					weaponsBullets[assignedWeapon] = 0;
			}
			
			checkBullet = weaponsBullets[assignedWeapon];
			bulletsText.text = checkBullet.ToString();
			
		}
	
}


