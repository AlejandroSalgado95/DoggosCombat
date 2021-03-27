#pragma strict

private var rb : Rigidbody;
private var speed : float;

function Start () {
	
	speed = 1;
	//POR ALGUNA EXTRAÑA RAZON, ESTO NO ESTA FUNCIONANDO
	/*
	rb = GetComponent.<Rigidbody>();
	rb.velocity = new Vector3(0,0,-5) * 5;
	*/

}

function Update () {
	
	transform.position += new Vector3(0,0,-5) * Time.deltaTime * speed;

}

function OnCollisionEnter(col : Collision)
{
	if (col.collider.gameObject.CompareTag("Player"))
	{
		speed = 5;
	}
}