#pragma strict
import UnityEngine.UI;

public var ySpeed : float;
public var explosion : GameObject;
public var GC : DoggoGC;
public var weaponNumber : int;
public var amount: int;

function Start(){
	
	GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();
	
	if (gameObject.tag == "RLItem"){
		weaponNumber = 1;
		amount = 5;
	}else if (gameObject.tag == "GLItem"){
		weaponNumber = 2;
		amount = 10;
	}else if (gameObject.tag == "FLTItem"){
		weaponNumber = 3;
		amount = 500;
	}else if (gameObject.tag == "GBItem"){
		weaponNumber = 4;
		amount = 3;
	} else if (gameObject.tag == "HealthKit"){
	
		amount = 25;
	
	} else if (gameObject.tag == "Coin"){
		
		amount = 10;
	
	}


}


function Update(){

	 	transform.eulerAngles += new Vector3(0, ySpeed, 0);
	

}


function OnCollisionEnter (collision: Collision){
	
	if (collision.collider.gameObject.CompareTag("Player"))
	{	
		if (gameObject.tag != "HealthKit" && gameObject.tag != "Coin"){
			if (explosion != null)
				Instantiate(explosion, transform.position, Quaternion.identity);
			GC.IncreaseBulletQuantity(weaponNumber, amount);
			Destroy(gameObject);
			
		} else if (gameObject.tag != "Coin"){
			
			if (explosion != null)
				Instantiate(explosion, transform.position, Quaternion.identity);
				
			GC.IncreaseLife(amount);
			Destroy(gameObject);
		
		} else{
			
			if (explosion != null)
				Instantiate(explosion, transform.position, Quaternion.identity);
				
			GC.IncreaseCoins(Random.Range(5,16));
			Destroy(gameObject);
		
		}
	}
	
}

