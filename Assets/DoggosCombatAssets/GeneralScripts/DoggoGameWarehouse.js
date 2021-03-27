#pragma strict

public var acquirablesArray : GameObject[];
public var charactersArray : GameObject[];
public var enemiesArray : GameObject[];
public var itemsArray : GameObject[];
public var playableAreasArray: GameObject[];

public var acSprites : Sprite[];
public var charSprites : Sprite[];

static var keepOneForever : DoggoGameWarehouse;

function Awake()
{
	if (keepOneForever == null)
	{
	    DontDestroyOnLoad (gameObject);
		keepOneForever = this;
	}
	else
	{
		Destroy(gameObject);
	}
}


function Start () {

}

function Update () {

}