#pragma strict

public var spark : GameObject;


function Start () {

}

function Update () {

}

/*
function OnCollisionEnter (other : Collision)
{
	if (other.collider.gameObject.tag != "Enemy")
	{
		Destroy(gameObject);
	}
}*/


function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag != "Enemy")
	{
		Instantiate(spark,transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}