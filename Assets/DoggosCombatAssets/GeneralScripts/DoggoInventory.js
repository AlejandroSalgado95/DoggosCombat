#pragma strict
import UnityEngine.UI;

public var templateItem : Button;
public var content : GameObject;

public var characterPos : Transform;
public var SC : DoggoSceneCommunication;
public var doggo : GameObject;
public var wareHouse : DoggoGameWarehouse;

public var maskPos : Transform;
public var mustachePos : Transform ;
public var hatPos : Transform;
public var bootPos : Transform[];
public var leftWeaponPos : Transform ;
public var rightWeaponPos : Transform ;
public var weaponRotator : Transform ;

public var leftWeaponObj : GameObject ;
public var rightWeaponObj : GameObject ;

var bootCount : int;
public var scrollbar : Scrollbar;
		
function Start () {

	bootCount = 0;
	bootPos = new Transform[4];
	StartCoroutine(DoNothingUntilReady());
	
}

function Update () {
	
	if (scrollbar != null)
    {
    	if (scrollbar.size < 0.95f)
    	{
    		scrollbar.gameObject.SetActive(true);
    	}
    	else
    		scrollbar.gameObject.SetActive(false);
    } 	
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
				maskPos = anObject;
				if (itemPos != -1)
				{
					var mask : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos],anObject.position,anObject.rotation);
					mask.transform.parent = anObject;
				}
			}
			else if (anObject.name == "MustachePos"){
				var itemPos2 : int = SC.stuffInUse[2];
				mustachePos = anObject;
				if (itemPos2 != -1)
				{
					var mustache : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos2],anObject.position,anObject.rotation);
					mustache.transform.parent = anObject;
				}
			}
			else if(anObject.name == "HatPos"){
				var itemPos3 : int = SC.stuffInUse[0];
				hatPos = anObject;
				if (itemPos3 != -1)
				{
					var hat : GameObject = Instantiate(wareHouse.acquirablesArray[itemPos3],anObject.position,anObject.rotation);
					hat.transform.parent = anObject;
				}
			}
			else if(anObject.name == "BootPos"){
				var itemPos4 : int = SC.stuffInUse[3];
				bootPos[bootCount] = anObject;
				bootCount++;
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
	
	leftWeaponPos = GameObject.FindWithTag("LeftWeaponPos").GetComponent.<Transform>();
	rightWeaponPos = GameObject.FindWithTag("RightWeaponPos").GetComponent.<Transform>();
	weaponRotator = GameObject.FindWithTag("WeaponRotator").GetComponent.<Transform>();
	
	leftWeaponObj = Instantiate(wareHouse.acquirablesArray[SC.weaponSlot1], leftWeaponPos.position, leftWeaponPos.rotation);
	rightWeaponObj = Instantiate(wareHouse.acquirablesArray[SC.weaponSlot1], rightWeaponPos.position, rightWeaponPos.rotation);
	leftWeaponObj.SetActive(false);
	rightWeaponObj.SetActive(false);
	
	leftWeaponObj.transform.parent = weaponRotator;
	rightWeaponObj.transform.parent = weaponRotator;
	
	
	SetUpWeapon();
	
}


function SetUpWeapon()
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



function SetUpMenuContent(){

	for(var i : int = 0; i < SC.acStuff.length ; i++)
    {
    	if (SC.acStuff[i] != -1)
    	{
	    	var invItemNum : int = SC.acStuff[i];
	        var invItem : Button = Instantiate(templateItem,Vector3.zero,Quaternion.identity);
	        var invItemSpr : Image = invItem.GetComponent.<Image>();
	        invItemSpr.sprite = wareHouse.acSprites[invItemNum];
	        
	        var parentTrans : RectTransform = content.GetComponent.<RectTransform>();
			var childTrans : RectTransform = invItem.GetComponent.<RectTransform>();
			childTrans.SetParent(parentTrans, false);
			
			var script : DoggoInvItem = invItem.GetComponent.<DoggoInvItem>();
			script.invItemAssigned = SC.acStuff[i];
			script.invItemType = SC.acStuffType[i];
			script.inventory = this;
	    }
	    else
	    	i += SC.acStuff.length ;
    }
    

}


function Customize(invItem: int, type : int)
{
	// 0: arma, 1: sombrero, 2: bigote, 3: gafas, 4: botas
	if (type == 0)
	{
		Destroy(leftWeaponObj);
		Destroy(rightWeaponObj);
		leftWeaponObj = Instantiate(wareHouse.acquirablesArray[invItem], leftWeaponPos.position, leftWeaponPos.rotation);
		rightWeaponObj = Instantiate(wareHouse.acquirablesArray[invItem], rightWeaponPos.position, rightWeaponPos.rotation);
		leftWeaponObj.SetActive(false);
		rightWeaponObj.SetActive(false);
		leftWeaponObj.transform.parent = weaponRotator;
		rightWeaponObj.transform.parent = weaponRotator;
		SetUpWeapon();
		SC.weaponSlot1 = invItem;
	}
	else if (type == 1)
	{

		for(var child : Transform in hatPos)
    	{
     	   Destroy(child.gameObject);
   		}
		
		if (SC.stuffInUse[0] != invItem)
		{
			var hat : GameObject = Instantiate(wareHouse.acquirablesArray[invItem], hatPos.position, hatPos.rotation);
			hat.transform.parent = hatPos;
			SC.stuffInUse[0] = invItem;
		}
		else
			SC.stuffInUse[0] = -1;
	}
	else if (type == 2)
	{
		for(var child2 : Transform in mustachePos)
    	{
     	   Destroy(child2.gameObject);
   		}
		if (SC.stuffInUse[2] != invItem)
		{
		
			var mustache : GameObject = Instantiate(wareHouse.acquirablesArray[invItem], mustachePos.position, wareHouse.acquirablesArray[invItem].transform.rotation);
			mustache.transform.parent = mustachePos;
			SC.stuffInUse[2] = invItem;
		}
		else
			SC.stuffInUse[2] = -1;
	}
	else if (type == 3)
	{
		for(var child3 : Transform in maskPos)
    	{
     	   Destroy(child3.gameObject);
   		}
		if (SC.stuffInUse[1] != invItem)
		{
			var mask : GameObject = Instantiate(wareHouse.acquirablesArray[invItem], maskPos.position, maskPos.rotation);
			mask.transform.parent = maskPos;
			SC.stuffInUse[1] = invItem;
		}
		else
			SC.stuffInUse[1] = -1;
	}
	else if (type == 4)
	{
		for(var i : int = 0; i < bootPos.length ; i++)
    	{
    		for(var child4 : Transform in bootPos[i])
    		{
     	   		Destroy(child4.gameObject);
   			}
    	}
    	
    	if(SC.stuffInUse[3] != invItem)
    	{
	    	for(var j : int = 0; j < bootPos.length ; j++)
	    	{
	    		var boot : GameObject = Instantiate(wareHouse.acquirablesArray[invItem], bootPos[j].position, bootPos[j].rotation);
				boot.transform.parent = bootPos[j];
	    	}
    	
    		SC.stuffInUse[3] = invItem;
    	}
    	else
    		SC.stuffInUse[3] = -1;
    	
	}


}



function DoNothingUntilReady() {

	while(characterPos == null)
	{
		var temp1 : GameObject = GameObject.FindWithTag("CustomizedChar");
		
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
	SetUpMenuContent();

}
