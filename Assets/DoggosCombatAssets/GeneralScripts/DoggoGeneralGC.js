#pragma strict

public var stages : GameObject[];
public var enemies : GameObject[];
public var SC2 : DoggoSceneCommunicationMultiplayer;
public var players : GameObject[];
public var doOnce : boolean;

function Start () {
	
	SC2 = GameObject.FindWithTag("SceneCommunicationMultiplayer").GetComponent.<DoggoSceneCommunicationMultiplayer>();
    players = GameObject.FindGameObjectsWithTag("Player");
    doOnce = true;
	StartCoroutine(FindPlayers());
}

function Update () {



}

function FindPlayers()
{
	while (players.Length != 2)
	{
	   players = GameObject.FindGameObjectsWithTag("Player");
	   yield;
	}
	
}

