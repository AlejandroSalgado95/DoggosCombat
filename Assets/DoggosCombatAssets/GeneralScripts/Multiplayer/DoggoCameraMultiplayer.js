#pragma strict

public var playerPos : Transform;
private var offset : Vector3;
private var newCameraPos : Vector3;
public var smoothing : float;
public var playerFound : boolean;

function Start () 
{	
	playerFound = false;
	StartCoroutine(LookForPlayer());
	
	
}

function LateUpdate () 
{
	if (playerFound)
	{
		newCameraPos = playerPos.position + offset;
		transform.position = Vector3.Lerp(transform.position, newCameraPos, smoothing * Time.deltaTime); //La camara avanza smoothing unidades por segundo hacia la coordenada newCameraPos

	}

}
	
function LookForPlayer()
{
	while (playerPos == null)
	{
		yield;
	}
	
	if (playerPos != null)
	{
			offset = transform.position - playerPos.position;
			playerFound = true;
	}
	


	
}