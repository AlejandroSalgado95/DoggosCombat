#pragma strict

private var initializationTime : float;
private var rb : Rigidbody;
 
function Start () {
	
	  initializationTime = Time.timeSinceLevelLoad;
	  rb = GetComponent.<Rigidbody>();
	  Destroy(gameObject,1.2);

}

function Update () {
	 
	 var timeSinceInitialization : float = Time.timeSinceLevelLoad - initializationTime;
	
	 if (timeSinceInitialization > 0.6)
	 	rb.velocity = Vector3.zero;
	 
}