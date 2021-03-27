#pragma strict

public var fireBall : GameObject;
public var particleSystems : ParticleSystem[];
public var enemies : GameObject[];
public var enemyPos : Transform;
public var distanceVectTemp : Vector3;
public var distanceValTemp : float;
public var minimumDistanceVal : float;
public var degreesPerSecond : float;
public var createdFireballs : GameObject[];
public var iCont : int;
public var waitingTime : float;
public var stalkingTime : float;
public var fireBallSpeed : float;
public var movingTime : float;
public var deleteTime : float;
public var fireRadius : float;


//Este objeto es creado por el enemigo 2 (FireCasterKnight), y este objeto tiene como objetivo atacar
//a UN solo player INCAMBIABLE durante toda su existencia. La referencia a dicho player se encuentra en
//enemyPos, el cual es inicializado por el enemigo 2 al momento en que crea este objeto, entregandole 
//como referencia el player que actualmente se encuentra mas cerca de el (sea singleplayer o multiplayer
//el modo de juego que esta tomando lugar)

function Start () {
	
	iCont = 0;
	minimumDistanceVal = 9999f;
	//FindClosestPlayer();
	waitingTime = 90/degreesPerSecond;
	
	if (enemyPos != null)
	{
		transform.position = enemyPos.position;	
		StartCoroutine(CreateFireballs());
	}
	
}

function Update () {
	
	if (enemyPos != null)
	{
		transform.position = enemyPos.position;	
		transform.eulerAngles += new Vector3(0,degreesPerSecond,0) * Time.deltaTime;
	}
	
}


//////Esta funcion es una copia de la funcion que hice originalmente para el script MISSILE ////////
//ACTUALIZACION: esta funcion ya no es necesaria en este script, pues se utilizaba para inicializar
//a enemyPos, variable la cual mantiene la referencia al player al cual este objeto debe atacar. Sin 
//embargo, enemyPos ahora es inicializado por el creador de este objeto (el enemy 2) en el momento en que
//crea su ataque (osea, en el momento en que crea este objeto). 

function FindClosestPlayer()
{
	enemies = GameObject.FindGameObjectsWithTag("Player");
	
	for(var i : int = 0; i < enemies.Length ; i++)
    {
         var enemyPosTemp : Transform = enemies[i].GetComponent.<Transform>();
         distanceVectTemp = enemyPosTemp.position - transform.position;
         distanceValTemp = distanceVectTemp.magnitude;
         
         if (distanceValTemp < minimumDistanceVal)
         {
         	enemyPos = enemyPosTemp;
         	minimumDistanceVal = distanceValTemp;
         }
    }

	
}


function CreateFireballs()
{
	var temp : Vector3 = new Vector3(fireRadius,0,fireRadius);
	var fireballTemp : GameObject;
	var dir : Vector3;
	var rb : Rigidbody;
	
	while (iCont < 4)
	{
		var pos : Vector3 = transform.position + temp;
		fireballTemp = Instantiate(fireBall,pos,transform.rotation);
		createdFireballs[iCont] = fireballTemp;
		createdFireballs[iCont].transform.parent = transform;
		iCont += 1;
		yield WaitForSeconds(waitingTime);
	}
	
	yield WaitForSeconds(stalkingTime);
	
	for(var i : int = 0; i < createdFireballs.Length ; i++)
    {
         createdFireballs[i].transform.parent = null;
         particleSystems[i] = createdFireballs[i].GetComponent.<ParticleSystem>();
         dir = enemyPos.position - createdFireballs[i].transform.position;
         rb = createdFireballs[i].GetComponent.<Rigidbody>();
         rb.velocity = dir.normalized * fireBallSpeed;
    }
	
	yield WaitForSeconds(movingTime);
	
	for(var j : int = 0; j < createdFireballs.Length ; j++)
    {
      	particleSystems[j].emissionRate = 0;
    }
	
	yield WaitForSeconds(deleteTime);
	
	for(var h : int = 0; h < 4 ; h++)
    {
      	Destroy(createdFireballs[h]);
    }
	
}
