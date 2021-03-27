#pragma strict

public var spark : GameObject;

function Start () {

}

function Update () {

}

/*
function OnCollisionEnter (collision : Collision)
{
	Destroy(gameObject);
	
}*/


function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag != "Player")
	{
		Instantiate(spark,transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
	
}
	