#pragma strict

public var increaseRadius : float;
public var col : SphereCollider;
private var startedTime : float;
public var livingTime : float;

function Start () {
	
	startedTime = Time.time;
	livingTime = 0.0f;
	col = GetComponent.<SphereCollider>();
	Destroy(gameObject,0.75f);
	
}

function Update () {
	
	livingTime = Time.time - startedTime;
	
	if (livingTime < 0.4f)
		col.radius += (increaseRadius * Time.deltaTime);
	else if (livingTime > 0.54)
		col.enabled = false;
}