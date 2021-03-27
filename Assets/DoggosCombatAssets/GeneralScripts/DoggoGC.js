#pragma strict
import UnityEngine.UI;

//public var weaponsArray : GameObject[];//Arreglo con todas las armas
//public var wearablesArray : GameObject[];//Arreglo con toda la miscelanea (sombreros, collares, botas, anteojos, etc.)
//public var charactersArray : GameObject[];//Arreglo con todos los personajes
//public var enemiesArray : GameObject[];
//public var playableAreasArray: GameObject[];
public var actualPlayer : GameObject; //Personaje elegido en el menu y que sera instanciado en escena y que permanecera en escena mientras el jugador este en modo de juego
public var startPlayerPosition : Vector3;
private var leftWeaponPos : Transform;
private var rightWeaponPos : Transform;
private var leftWeaponObj : GameObject;
private var rightWeaponObj : GameObject;
private var weaponRotator : Transform;
private var doggoMovable : DoggoMove;
private var doggoAnimator : Animator;
private var doggoHealth : DoggoHealthManager;

public var playerHealth : UI.Slider;
public var healthText : UI.Text;

private var testNumber : int;
private var SC2 : DoggoSceneCommunication;
private var callOnce : boolean;
public var weaponExplosion : GameObject;
public var beltExplosion : GameObject; 
public var died : boolean;

public var weaponsBullets : int[];
public var assignedWeapon : int;
public var bulletsText : UI.Text;
public var checkBullet : int;

public var enemyAura : GameObject;

public var doggoButton3 : DoggoWeaponAssigner;

public var warehouse : DoggoGameWarehouse;

public var usableWeapons : int[];
public var usableWeaponsCount : int;
public var actualWeaponBtn : Button;
public var obtainedCoinsText : UI.Text;
public var obtainedCoins : int;

public var pausePanel : GameObject;
public var pauseBtn : GameObject;
public var gameOverPanel : GameObject;
public var gameOverText : GameObject;
public var adPanel : GameObject;
public var advertiserObj : GameObject;
public var watchedAd : boolean;
public var resultsPanel : GameObject;
public var coinsText : UI.Text;
public var duplicateText : GameObject;



function Start () {
	
	SC2 = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
	warehouse = GameObject.FindWithTag("GameWarehouse").GetComponent.<DoggoGameWarehouse>();
	//doggoButton3 = GameObject.FindWithTag("WeaponButton3").GetComponent.<DoggoWeaponAssigner>();
	//doggoButton3.weaponAssigned = SC2.weaponSlot3;
	
	actualPlayer = Instantiate(warehouse.charactersArray[SC2.selectedPlayer], startPlayerPosition, warehouse.charactersArray[SC2.selectedPlayer].transform.rotation);
	leftWeaponPos = GameObject.FindWithTag("LeftWeaponPos").GetComponent.<Transform>();
	rightWeaponPos = GameObject.FindWithTag("RightWeaponPos").GetComponent.<Transform>();
	weaponRotator = GameObject.FindWithTag("WeaponRotator").GetComponent.<Transform>();
	assignedWeapon = SC2.weaponSlot1;
	AssignPlayerWeapon(assignedWeapon);
	SetUpCustomization();
	testNumber = 0;
	doggoMovable = actualPlayer.GetComponent.<DoggoMove>();
	doggoAnimator = actualPlayer.GetComponent.<Animator>();
	doggoHealth = actualPlayer.GetComponent.<DoggoHealthManager>();
	//leftWeaponObj = Instantiate(weaponsArray[0], leftWeaponPos.position, leftWeaponPos.rotation);;
	//rightWeaponObj = Instantiate(weaponsArray[0], rightWeaponPos.position, rightWeaponPos.rotation);
	callOnce = false;
	playerHealth.maxValue = SC2.maxPlayerHealth;
	playerHealth.value = playerHealth.maxValue;
	healthText.text = playerHealth.value.ToString() + " / " + playerHealth.maxValue.ToString();
	died = false;
	weaponsBullets = SC2.weaponsBullets;
	if (assignedWeapon != 0)
		bulletsText.text = weaponsBullets[assignedWeapon].ToString();
	else
		bulletsText.text = "Infinite";
	checkBullet = weaponsBullets[assignedWeapon];
	
	var deactivateScript : DoggoHealthManagerMultiplayer = 	actualPlayer.GetComponent.<DoggoHealthManagerMultiplayer>();
	deactivateScript.enabled = false;
	
	
	usableWeapons = new int[11];
	usableWeaponsCount = 0;
	var weaponSprite : Image = actualWeaponBtn.GetComponent.<Image>();
	weaponSprite.sprite = warehouse.acSprites[assignedWeapon];
	obtainedCoinsText.text = "$ 0";
	obtainedCoins = 0;
	
	pausePanel.SetActive(false);
	pauseBtn.SetActive(true);
	gameOverPanel.SetActive(false);
	adPanel.SetActive(false);
	watchedAd = false;
	resultsPanel.SetActive(false);
	coinsText.text = "$   0";
	duplicateText.SetActive(false);
	
	ObtainUsableWeapons();
	
	Destroy(deactivateScript);
	
	StartCoroutine(TemporalCreateEnemy());
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
		leftWeaponObj = Instantiate(warehouse.acquirablesArray[number], leftWeaponPos.position, leftWeaponPos.rotation);
		rightWeaponObj = Instantiate(warehouse.acquirablesArray[number], rightWeaponPos.position, rightWeaponPos.rotation);
	}
	else
	{
		Destroy(leftWeaponObj);
		Destroy(rightWeaponObj);
		leftWeaponObj = Instantiate(warehouse.acquirablesArray[number], leftWeaponPos.position, leftWeaponPos.rotation);
		rightWeaponObj = Instantiate(warehouse.acquirablesArray[number], rightWeaponPos.position, rightWeaponPos.rotation);
	}
	
	
	//ActualWeapon = GameObject.FindWithTag("ActualWeapon");
	//Destroy(ActualWeapon);
	//var ActualWeapon = Instantiate(WeaponObject[NumberWeapon],WeaponPos[0].position,Quaternion.identity);
	
	//ActualWeapon.transform.rotation = player.transform.rotation;
	//ActualWeapon.transform.parent = player.transform; 
	leftWeaponObj.transform.parent = weaponRotator;
	rightWeaponObj.transform.parent = weaponRotator;

}


function SetUpCustomization()
{
  var objectsInPlayer : Component[] = actualPlayer.GetComponentsInChildren(Transform);
		
  if (objectsInPlayer != null){
		
		//-1: no hay nada, 0: sombrero, 1: gafas, 2: bigote, 3: botas
		for (var anObject: Transform in objectsInPlayer){
			if (anObject.name == "MaskPos"){
				var itemPos : int = SC2.stuffInUse[1];
				if (itemPos != -1)
				{
					var mask : GameObject = Instantiate(warehouse.acquirablesArray[itemPos],anObject.position,anObject.rotation);
					mask.transform.parent = anObject;
				}
			}
			else if (anObject.name == "MustachePos"){
				var itemPos2 : int = SC2.stuffInUse[2];
				if (itemPos2 != -1)
				{
					var mustache : GameObject = Instantiate(warehouse.acquirablesArray[itemPos2],anObject.position,anObject.rotation);
					mustache.transform.parent = anObject;
				}
			}
			else if(anObject.name == "HatPos"){
				var itemPos3 : int = SC2.stuffInUse[0];
				if (itemPos3 != -1)
				{
					var hat : GameObject = Instantiate(warehouse.acquirablesArray[itemPos3],anObject.position,anObject.rotation);
					hat.transform.parent = anObject;
				}
			}
			else if(anObject.name == "BootPos"){
				var itemPos4 : int = SC2.stuffInUse[3];
				if (itemPos4 != -1)
				{
					var boot : GameObject = Instantiate(warehouse.acquirablesArray[itemPos4],anObject.position,anObject.rotation);
					boot.transform.parent = anObject;
				}
			}
			
		}
		
	}

}

function ChangeWeapon(weaponNumber : int){	
	
	if (!died)
	{
		AssignPlayerWeapon(weaponNumber);
		assignedWeapon = weaponNumber;
		checkBullet = weaponsBullets[weaponNumber];

		if (weaponNumber != 0)
			bulletsText.text = weaponsBullets[weaponNumber].ToString();
		else 
			bulletsText.text = "Infinite";
	}
}

public function ChangeWeaponWrapper(){
	
	if (usableWeapons[usableWeaponsCount + 1] != -1)
    {
    	usableWeaponsCount++;
	}
	else 
		usableWeaponsCount = 0;
	
	
	var weaponSprite : Image = actualWeaponBtn.GetComponent.<Image>();
	weaponSprite.sprite = warehouse.acSprites[usableWeapons[usableWeaponsCount]];
	ChangeWeapon(usableWeapons[usableWeaponsCount]);

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
	pauseBtn.SetActive(false);
	died = true;
	doggoHealth.enabled = false;
	doggoMovable.enabled = false;
	Instantiate(weaponExplosion, leftWeaponObj.transform.position, Quaternion.identity);
	Instantiate(weaponExplosion, rightWeaponObj.transform.position, Quaternion.identity);
	Destroy(leftWeaponObj);
	Destroy(rightWeaponObj);
	doggoAnimator.SetTrigger("AnyStateToFainted");
	StartCoroutine(DestroyRotator());
	StartCoroutine(ActivateGameOverPanel());
}

function DestroyRotator()
{
	yield WaitForSeconds(1.0f);
	Instantiate(beltExplosion, weaponRotator.parent.transform.position, Quaternion.identity);
	Destroy(weaponRotator.parent.gameObject);
}

function ActivateGameOverPanel(){

	yield WaitForSeconds(1.0f);
	gameOverPanel.SetActive(true);
	yield WaitForSeconds(2.0f);
	var panelAnim : Animator;
	var textAnim : Animator;
	panelAnim = gameOverPanel.GetComponent.<Animator>();
	textAnim = gameOverText.GetComponent.<Animator>();
	panelAnim.Play("panelDisappear");
	textAnim.Play("textDisappear");
	yield WaitForSeconds(0.5f);
	adPanel.SetActive(true);
	gameOverPanel.SetActive(false);
	gameOverText.SetActive(false);

}

public function CloseAddPanelWrapper(){

	StartCoroutine(CloseAddPanel());
	
}

function CloseAddPanel(){
	
	var adAnim : Animator;
	adAnim = adPanel.GetComponent.<Animator>();
	adAnim.Play("Close");
	yield WaitForSeconds(0.7f);
	adPanel.SetActive(false);
	//var advertiserScript = advertiserObj.GetComponent("advertiser") as advertiser;
	//watchedAd = advertiserScript.watchedAd;
	watchedAd = false;
	resultsPanel.SetActive(true);
	yield WaitForSeconds(0.7f);
	LerpIncreaseAdCoins();
	
	if (watchedAd){
		duplicateText.SetActive(true);
		obtainedCoins *= 2;
		LerpIncreaseAdCoins();
			
	}
	
	
	
}


function TemporalCreateEnemy()
{
	yield WaitForSeconds(1.0f);
	Instantiate(warehouse.enemiesArray[0], warehouse.enemiesArray[0].transform.position, warehouse.enemiesArray[0].transform.rotation);
	Instantiate(warehouse.enemiesArray[1], warehouse.enemiesArray[1].transform.position, warehouse.enemiesArray[1].transform.rotation);

}

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

public function IncreaseLife(amount : int){

	var newHealth: int = playerHealth.value + amount; 
	StartCoroutine(LerpIncreaseLife(newHealth));

}


function LerpIncreaseLife(newHealth : int)
{
	while (playerHealth.value < newHealth)
	{
		playerHealth.value += 1f;
		healthText.text = playerHealth.value.ToString() + " / " + playerHealth.maxValue.ToString();
		yield;
	}
	
}


public function IncreaseCoins(amount : int){
	
	StartCoroutine(LerpIncreaseCoins(amount));

}

function LerpIncreaseCoins(amount : int){

	var oldCoinAmount : int = obtainedCoins;
	obtainedCoins += amount;
	
	while (obtainedCoinsText.text != ("$ " + obtainedCoins.ToString() ) )
	{
		oldCoinAmount += 1;
		obtainedCoinsText.text = "$ " + oldCoinAmount.ToString();
		yield;
	}

}

function LerpIncreaseAdCoins(){

	var oldCoinAmount : int = 0;
	
	while (coinsText.text != ("$   " + obtainedCoins.ToString() ) )
	{
		oldCoinAmount += 1;
		coinsText.text = "$   " + oldCoinAmount.ToString();
		yield;
	}
	
	yield WaitForSeconds(0.5f);

}

public function IncreaseBulletQuantity(weaponNumber : int, amount : int){

	weaponsBullets[weaponNumber] += amount;
	
	if (weaponNumber == assignedWeapon){
		
		checkBullet = weaponsBullets[weaponNumber];

		if (weaponNumber != 0)
			bulletsText.text = weaponsBullets[weaponNumber].ToString();
		else 
			bulletsText.text = "Infinite";
			
	}
	

}

function ObtainUsableWeapons(){

	for(var j : int = 0; j < usableWeapons.length ; j++)
    {
    	usableWeapons[j] = -1;

    }
	
	for(var i : int = 0; i < SC2.acStuff.length ; i++)
    {
    	if (SC2.acStuff[i] != -1 && SC2.acStuff[i] >= 0 && SC2.acStuff[i] <= 10)
    	{
    		usableWeapons[usableWeaponsCount] = SC2.acStuff[i];
    		usableWeaponsCount++;
	    }

    }

}

function PauseGame(){
		
	pauseBtn.SetActive(false);
	pausePanel.SetActive(true);
	Time.timeScale = 0;

}


function UnpauseGame(){

	pauseBtn.SetActive(true);
	pausePanel.SetActive(false);
	Time.timeScale = 1;

}


function BackToMenu(){

	Time.timeScale = 1;
	Application.LoadLevel(0);

}

function PlayAgain(){

	Application.LoadLevel(1);

}

 


