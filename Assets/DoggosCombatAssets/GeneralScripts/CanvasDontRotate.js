#pragma strict

private var rotation : Quaternion;

function Start () {

	rotation = transform.rotation;
}

function Update () {
		
		transform.rotation = rotation;

}