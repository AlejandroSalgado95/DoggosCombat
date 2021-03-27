#pragma strict
import UnityEngine.UI;

public var explosion : GameObject;
public var damageObtained : int;
public var damageLimit : int;

public var GC : DoggoGC;
public var weaponsCount : int;

public var itemToProduce : int;
public var itemsQuantity : int;
public var itemsArray : GameObject;

private var warehouse : DoggoGameWarehouse;


function Start(){

	damageObtained = 0;
	damageLimit = 30;
	GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();
	warehouse = GameObject.FindWithTag("GameWarehouse").GetComponent.<DoggoGameWarehouse>();

	weaponsCount = 0;
	itemsQuantity = 0;
	itemToProduce = -1;
	StartCoroutine(CountWeapons());	
	StartCoroutine(Explode());


}

function CountWeapons(){
	
	while(GC.usableWeapons.length == 0){
	
		yield;
	}
	
	for(var i : int = 0; i < GC.usableWeapons.length ; i++)
    {
    	
    	if (GC.usableWeapons[i] != -1){
    		
    		weaponsCount++;
    	}
    	else {
  			
  			i += GC.usableWeapons.length;
  		}
    
    }



}

function Explode(){

	while(damageObtained < damageLimit){
		yield;
	}
	
	Instantiate(explosion, transform.position, Quaternion.identity);
	ProduceItems();
	Destroy(gameObject);
}



function OnTriggerEnter (other : Collider){
		
	if (other.gameObject.CompareTag("FTBullet"))
	{	
		damageObtained += 5;
	}
	
	else if (other.gameObject.CompareTag("GLBullet"))
	{
		damageObtained += 25;
	}
	
	/*
	else if(other.gameObject.CompareTag("GBBullet"))
	{
		absorbed = true;
		GBBulletPos = other.gameObject.GetComponent.<Transform>();
		damage = 1 * gravityBomberLvl;
		
	}
	
	else if (other.name == "Nucleum")
	{
		inNucleum = true;
	}*/
	
	else if (other.gameObject.CompareTag("FireBullet"))
	{
		damageObtained += 2;
		var fireRB2 : Rigidbody = other.gameObject.GetComponent.<Rigidbody>();
		fireRB2.velocity = Vector3.zero;
	}
	
	else if (other.gameObject.CompareTag("ShortMissile"))
	{
		damageObtained += 50;
	}
		
	

}

function ProduceItems(){

	itemsQuantity = Random.Range(1,3);
	var weaponOrHealth : int = Random.Range(0,2);
	
	for(var i : int = 0; i < itemsQuantity; i++)
    {
    	if (weaponOrHealth == 0){
			var availableRandomItem : int = Random.Range(1,weaponsCount);
			itemToProduce = GC.usableWeapons[availableRandomItem];
			var produced : GameObject = Instantiate(warehouse.itemsArray[itemToProduce], transform.position, Quaternion.identity);
			var randomDir : Vector3 = new Vector3(Random.Range(-1.0f,1.0f),Random.Range(0.0f,1.0f),Random.Range(-1.0f,1.0f));
			var rb : Rigidbody = produced.GetComponent.<Rigidbody>();
			rb.AddForce(randomDir * 10, ForceMode.Impulse);
		} else {
			
			var produced2 : GameObject = Instantiate(warehouse.itemsArray[5], transform.position, Quaternion.identity);
			var randomDir2 : Vector3 = new Vector3(Random.Range(-1.0f,1.0f),Random.Range(0.0f,1.0f),Random.Range(-1.0f,1.0f));
			var rb2 : Rigidbody = produced2.GetComponent.<Rigidbody>();
			rb2.AddForce(randomDir2 * 10, ForceMode.Impulse);
		}
		

	}
	

}
 
 
 
 
 
 
 
 
 
 
 
 


