#pragma strict
/*
public var circle1 : Rigidbody;
public var circle2 : Rigidbody;
public var circle3 : Rigidbody;*/

public var nucleum : Transform;
public var circle1 : Transform;
public var circle2 : Transform;
public var circle3 : Transform;

public var circle1Speed : float;
public var circle2Speed : float;
public var circle3Speed : float;

private var direction1 : Vector3;
private var direction2 : Vector3;
private var direction3 : Vector3;

private var rb : Rigidbody;
public var maximumSize : float;
//private var initializationTime : float;
private var maximumSizeSetter : boolean;
public var activated : boolean;
public var thisCollider : SphereCollider;

function Start () {
	
	/*
	circle1.angularVelocity = new Vector3(Random.Range(0,2), Random.Range(0,2), Random.Range(0,2)) * circle1Speed;
	circle2.angularVelocity = new Vector3(Random.Range(0,2), Random.Range(0,2), Random.Range(0,2)) * circle2Speed;
	circle3.angularVelocity = new Vector3(Random.Range(0,2), Random.Range(0,2), Random.Range(0,2)) * circle3Speed;*/
	
	direction1 = new Vector3(Random.Range(2,4), Random.Range(2,4), Random.Range(2,4)) * circle1Speed; 
	direction2 = new Vector3(Random.Range(2,4), Random.Range(2,4), Random.Range(2,4)) * circle2Speed; 
	direction3 = new Vector3(Random.Range(2,4), Random.Range(2,4), Random.Range(2,4)) * circle3Speed; 
	
	rb = GetComponent.<Rigidbody>();
	thisCollider = GetComponent.<SphereCollider>();
	maximumSizeSetter = true;
	maximumSize = 5;
	activated = false;
	//initializationTime = Time.timeSinceLevelLoad;

}

function Update () {

	circle1.Rotate(direction1 * Time.deltaTime);
	circle2.Rotate(direction2 * Time.deltaTime);
	circle3.Rotate(direction3 * Time.deltaTime);
	
	/*
	if (rb.velocity != Vector3.zero && maximumSizeSetter)
	{
		maximumSize = transform.localScale.x * 5;
		maximumSizeSetter = false;
	}*/
	
	
	
	//var timeSinceInitialization : float = Time.timeSinceLevelLoad - initializationTime;
	
	//if (timeSinceInitialization > 1)
		//rb.useGravity = false;

}


function OnTriggerEnter (other : Collider) {

    //if (other.gameObject.tag == "TemporalPlane")
    //{
    
    if( !activated )
    {
    	if (other.gameObject.tag != "GBBullet" && other.name != "Nucleum")
    	{
	    	activated = true;
	        rb.useGravity = false;
	        rb.velocity = Vector3.zero;
	        rb.isKinematic = true;
	        thisCollider.radius = 2;
	    	StartCoroutine(expandBullet());
	    }
    }
    /*
    else if (other.gameObject.CompareTag("Enemy"))
    {
    	
    }*/
    	
    //}
    
    
    
}

function expandBullet(){
	
	var number : float = 0.2f;
	
	while (transform.localScale.z < maximumSize)
	{
		transform.localScale += new Vector3(number, number, number);
		nucleum.localScale += new Vector3(0.01,0.01,0.01);
		
		if (number > 0.05)
			number -= 0.01;
			
		yield;
	}
	
	
	while (nucleum.localScale.z < (maximumSize * 0.3f))
	{
		nucleum.localScale += new Vector3(0.05f,0.05f,0.05f);
		yield;
	}
	
	while(nucleum.localScale.z < (maximumSize * 0.42f)) //multiplicar por 0.40f como segunda opcion; se ve cool tambien con 0.40f
	{
		nucleum.localScale += new Vector3(0.002f,0.002f,0.002f);
		yield;
	}
	
	while(transform.localScale.z > 0.0f)
	{
		transform.localScale -= new Vector3(0.3f, 0.3f, 0.3f);
		yield;
	}
	
	Destroy(gameObject);

}






