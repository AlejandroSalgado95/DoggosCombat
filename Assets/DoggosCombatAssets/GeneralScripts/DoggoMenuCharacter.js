#pragma strict

public var characterPos : Transform;
public var SC : DoggoSceneCommunication;
public var doggo : GameObject;
public var wareHouse : DoggoGameWarehouse;


function Start () {

	StartCoroutine(DoNothingUntilReady());
	
}

function Update () {

}

function SetUpMenuCharacter(){
  
  doggo = Instantiate(wareHouse.charactersArray[SC.selectedPlayer],characterPos.position, characterPos.rotation);
  
  var deactivateScript1 : DoggoMove = 	doggo.GetComponent.<DoggoMove>();
  deactivateScript1.enabled = false;
	    
  var deactivateScript2 : DoggoMoveMultiplayer = doggo.GetComponent.<DoggoMoveMultiplayer>();
  deactivateScript2.enabled = false;
  
  var deactivateScript3 : DoggoHealthManager = 	doggo.GetComponent.<DoggoHealthManager>();
  Destroy(deactivateScript3);
	    
  var deactivateScript4 : DoggoHealthManagerMultiplayer = doggo.GetComponent.<DoggoHealthManagerMultiplayer>();
  Destroy(deactivateScript4);
  
  var objectsInPlayer : Component[] = doggo.GetComponentsInChildren(Transform);
  
  var collider : BoxCollider = doggo.GetComponent.<BoxCollider>();
  Destroy(collider);
		
  if (objectsInPlayer != null){
		
		//-1: no hay nada, 0: sombrero, 1: gafas, 2: bigote, 3: botas
		for (var anObject: Transform in objectsInPlayer){
			if (anObject.name == "MaskPos"){
				var itemPos : int = SC.stuffInUse[1];
				if (itemPos != -1)
				{
					var mask : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos],anObject.position,anObject.rotation);
					mask.transform.parent = anObject;
				}
			}
			else if (anObject.name == "MustachePos"){
				var itemPos2 : int = SC.stuffInUse[2];
				if (itemPos2 != -1)
				{
					var mustache : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos2],anObject.position,anObject.rotation);
					mustache.transform.parent = anObject;
				}
			}
			else if(anObject.name == "HatPos"){
				var itemPos3 : int = SC.stuffInUse[0];
				if (itemPos3 != -1)
				{
					var hat : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos3],anObject.position,anObject.rotation);
					hat.transform.parent = anObject;
				}
			}
			else if(anObject.name == "BootPos"){
				var itemPos4 : int = SC.stuffInUse[3];
				if (itemPos4 != -1)
				{
					var boot : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos4],anObject.position,anObject.rotation);
					boot.transform.parent = anObject;
				}
			}
			else if(anObject.name == "PlayerCircle"){
				Destroy(anObject.gameObject);
			}
			else if(anObject.name == "EnemyArrow"){
				Destroy(anObject.gameObject);
			}


		}
		
	}
	
	var leftWeaponPos : Transform = GameObject.FindWithTag("LeftWeaponPos").GetComponent.<Transform>();
	var rightWeaponPos : Transform = GameObject.FindWithTag("RightWeaponPos").GetComponent.<Transform>();
	var weaponRotator : Transform = GameObject.FindWithTag("WeaponRotator").GetComponent.<Transform>();
	
	var leftWeaponObj : GameObject = Instantiate(wareHouse.acquirablesArray[SC.weaponSlot1], leftWeaponPos.position, leftWeaponPos.rotation);
	var rightWeaponObj : GameObject = Instantiate(wareHouse.acquirablesArray[SC.weaponSlot1], rightWeaponPos.position, rightWeaponPos.rotation);
	
	leftWeaponObj.transform.parent = weaponRotator;
	rightWeaponObj.transform.parent = weaponRotator;
	
	leftWeaponObj.SetActive(false);
	rightWeaponObj.SetActive(false);
	
	SetUpWeapon(leftWeaponObj,rightWeaponObj);
}


function SetUpWeapon(leftWeaponObj : GameObject, rightWeaponObj : GameObject)
{
	if (leftWeaponObj.CompareTag("FastTurret"))
	{
		var temp1 : FastTurret = leftWeaponObj.GetComponent.<FastTurret>();
		var temp2 : FastTurret = rightWeaponObj.GetComponent.<FastTurret>();
		
		Destroy(temp1);
		Destroy(temp2);
	}
	else if (leftWeaponObj.CompareTag("RocketLauncher")){
	
		var temp3 : RocketLauncher = leftWeaponObj.GetComponent.<RocketLauncher>();
		var temp4 : RocketLauncher = rightWeaponObj.GetComponent.<RocketLauncher>();
		
		Destroy(temp3);
		Destroy(temp4);
	}
	else if (leftWeaponObj.CompareTag("GranadeLauncher"))
	{
		var temp5 : GranadeLauncher = leftWeaponObj.GetComponent.<GranadeLauncher>();
		var temp6 : GranadeLauncher = rightWeaponObj.GetComponent.<GranadeLauncher>();
		
		Destroy(temp5);
		Destroy(temp6);
	}
	else if (leftWeaponObj.CompareTag("FlameThrower"))
	{
		var temp7 : FlameThrower = leftWeaponObj.GetComponent.<FlameThrower>();
		var temp8 : FlameThrower = rightWeaponObj.GetComponent.<FlameThrower>();
		
		Destroy(temp7);
		Destroy(temp8);
	}
	else if (leftWeaponObj.CompareTag("GravityBomber"))
	{
		var temp9 : GravityBomber = leftWeaponObj.GetComponent.<GravityBomber>();
		var temp10 : GravityBomber = rightWeaponObj.GetComponent.<GravityBomber>();
		
		Destroy(temp9);
		Destroy(temp10);
	}
	
	leftWeaponObj.SetActive(true);
	rightWeaponObj.SetActive(true);


}


function DoNothingUntilReady() {

	while(characterPos == null)
	{
		var temp1 : GameObject = GameObject.FindWithTag("MenuCharacter");
		
		if (temp1 != null)
		{
			characterPos = temp1.GetComponent.<Transform>();
		}
		yield;
	}
	
	while(SC == null)
	{
		var temp2 : GameObject = GameObject.FindWithTag("SceneCommunication");
		
		if (temp2 != null)
		{
			SC = temp2.GetComponent.<DoggoSceneCommunication>();
		}
		
		yield;
	}
	
	while(wareHouse == null)
	{
		var temp3 : GameObject = GameObject.FindWithTag("GameWarehouse");
		
		if (temp3 != null)
		{
			wareHouse = temp3.GetComponent.<DoggoGameWarehouse>();
		}
		
		yield;
	}
	
	
	
	SetUpMenuCharacter();


}







