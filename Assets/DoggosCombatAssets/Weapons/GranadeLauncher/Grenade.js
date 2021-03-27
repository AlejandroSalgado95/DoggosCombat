#pragma strict

public var explosion : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter( col : Collider)
{
	if (col.gameObject.tag != "Player" && col.gameObject.tag != "Enemy")
	{
		if (col.gameObject.tag == "Floor" || col.gameObject.tag == "LowestFloor")
		{
			var newPos : Vector3 = transform.position + new Vector3 (0,1,0);
			Instantiate(explosion, newPos, transform.rotation);
			Destroy(gameObject);
		}
		else
		{
			Instantiate(explosion, transform.position, transform.rotation);
			Destroy(gameObject);
		}
		
	}
}