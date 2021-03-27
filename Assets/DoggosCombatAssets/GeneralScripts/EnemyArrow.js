#pragma strict

var enemies : GameObject[];
var cam : Camera ;
public var checkVisibilityAgain : float;
public var checkVisibilityLag : float;
public var enemyPos : Transform;
public var arrowQuad : GameObject;
public var anEnemyIsVisible : boolean;
public var enemiesQuantity : int;
public var doJustOnce : boolean;
public var cameraAssigned : boolean;


public var distanceVectTemp : Vector3;
public var distanceValTemp : float;


function Start () {
	checkVisibilityAgain = 0.0f;
	arrowQuad.SetActive(false);
	cameraAssigned = false;
	anEnemyIsVisible = true;
	var cameraObj : GameObject = GameObject.FindWithTag("MainCamera");
	if (cameraObj != null)
	{
		cam = cameraObj.GetComponent.<Camera>();
		cameraAssigned = true;
	}
	else
	{
		StartCoroutine(LookForCamera());
	}
	
	doJustOnce = true;

}

function LookForCamera()
{
	while (cam == null)
	{
		if (transform.parent.name == "P1")
			cam = GameObject.FindGameObjectWithTag("CameraP1").GetComponent.<Camera>();
		
		else if (transform.parent.name == "P2")
			cam = GameObject.FindGameObjectWithTag("CameraP2").GetComponent.<Camera>();
		
		yield;
	}
	
	cameraAssigned = true;
	
}

//CASOS ANOMALOS QUE GENERABAN UN BUG
//caso 1: destruir al enemigo al cual la flecha esta apuntando y que queden enemigos existentes
//caso 2: destruir al enemigo al cual la flecha esta apuntando y que no queden enemigos existentes
//Resultado en ambos casos: crasheaba el juego
//Motivo: La funcion que actualiza el arreglo de enemigos existentes se realiza cada 0.1 segundos, mientras
//        que la pregunta "existen en el juego mas de 0 enemigos?" (if enemiesQuantity > 0 ) se realiza
//        mucho mas rapido que eso. Lo anterior significa que al destruir a un enemigo, el arreglo de 
//        enemigos existentes no se actualiza de inmediato (osea, esta desfasado o es incosistente con
//        la realidad), haciendo creer al programa que aun existen N enemigos cuando en realidad ahora 
//        existen N - 1 (o N - cantidad de enemigos destruidos en los ultimos 0.099 segundos). Lo que es
//        peor, el arreglo de enemigos existentes se queda por 0.99 segundos con una referencia a un 
//        enemigo que ya no existe, tiempo suficiente para que el programa intente acceder a dicha referencia
//        y que cuando eso suceda, el programa se crashee. Esto ocurria de la siguiente manera:
// 
//        Para N enemigos existentes, la flecha de busqueda apuntando a CIERTO enemigo
//        1) DICHO enemigo es destruido
//        2) En el siguiente update, enemyPos != null es falso, por lo tanto entra en el siguiente else, 
//           haciendo que doJustOnce se vuelva verdadero (esto significa: el enemigo al que apuntabas fue
//           destruido, lastima busca otro)
//        3) En el siguiente update, quedan N - 1 enemigos existentes, pero el programa aun no lo sabe porque
//           aun no se ha vuelto a realizar la funcion checkEnemiesVisibility, la cual se realiza cada 0.1
//           segundos y se encarga de actualizar el arreglo de enemigos existentes; por lo tanto, para el
//           programa aun existen N enemigos. Entonces, se realiza la funcion FindClosestEnemy, la cual
//           ORIGINALMENTE no actualizaba el arreglo de enemigos existentes de nuevo, y al no hacerlo, 
//           el arreglo de enemigos existentes seguia conteniendo la referencia al enemigo destruido, y al
//           recorrer el arreglo mediante un ciclo, accediendo a sus elementos, se terminaba accediendo a 
//           dicha referencia corrompida, haciendo que el programa crasheara.
//
//		SOLUCION: 
//                Primero .- Hacer que la funcion FindClosestEnemy tambien actualice el arreglo de enemigos 
//                existentes mediante la linea 'enemies = GameObject.FindGameObjectsWithTag("Enemy");'
//                Segundo .- Indicar que cuando la flecha este apuntando a un enemigo y este sea destruido,
//                que la flecha busque el siguiente enemigo mas cercano al cual apuntar mediante la linea
//                'else {doJustOnce = true;}' despues de la linea 'if (enemyPos != null){...}'

function FixedUpdate () {
	
	if (cameraAssigned)
	{
	
		//Revisa si hay algun enemigo visible en la camara cada cierto tiempo, y guarda 
		//cuantos enemigos existen (sean estos visibles o no para la camara)
		if (Time.time > checkVisibilityAgain)
		{
			checkVisibilityAgain = Time.time + checkVisibilityLag;
			CheckEnemiesVisibility();
		}
		
		//Si NO hay ningun enemigo visible en la camara
		if (!anEnemyIsVisible)
		{
		    //Si existe al menos un enemigo en el juego
			if (enemiesQuantity > 0)
			{
			    //Busca al enemigo mas cercano existente SOLO UNA VEZ
			    //Podras volver a buscar al enemigo mas cercano cuando se vuelva a encontrar y perder de vista
			    //a los enemigos, o cuando el enemigo al cual la flecha del jugador estaba apuntando es destruido

				if (doJustOnce)
				{
					FindClosestEnemy();
					doJustOnce = false;
					
					if (enemies.Length > 0)
					{
						arrowQuad.SetActive(true);
					}
					
				}
			}
			else
			{
				arrowQuad.SetActive(false);
				doJustOnce = true;
			}
			
			//Indica en donde se encuentra el enemigo, a menos que alguien o algo mas lo destruya
			if (enemyPos != null)
			{
				var direction : Vector3 = enemyPos.position - transform.position;
				direction = new Vector3(direction.x,0.0f,direction.z);
				transform.rotation = Quaternion.LookRotation(direction);
			}
			
			//si el enemigo al cual la flecha estaba apuntando es destruido, entonces la flecha tiene permitido
			//apuntar al siguiente enemigo mas cercano
			else
			{
				doJustOnce = true;
			}
		}
		else
			arrowQuad.SetActive(false);
	
	}


}




///////ESTA FUNCION FUE TOMADA Y POSIBLEMENTE MODIFICADA DEL SCRIPT MISSILE.JS////////

function FindClosestEnemy()
{
	var minimumDistanceVal : float = 9999f;
	enemies = GameObject.FindGameObjectsWithTag("Enemy");
	
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

function CheckEnemiesVisibility()
{

    enemies = GameObject.FindGameObjectsWithTag("Enemy");
    enemiesQuantity = enemies.Length;
	
	
	var quantity : int = 0;
	
	for(var i : int = 0; i < enemies.Length ; i++)
    {
    	var enemyTrans : Transform = enemies[i].GetComponent.<Transform>();
    	var viewPortPos : Vector3 = cam.WorldToViewportPoint(enemyTrans.position);
    	var onScreen : boolean = viewPortPos.x > 0.0f && viewPortPos.x < 1.0f && viewPortPos.y > -0.9f && viewPortPos.y < 1.1f;
    	if (onScreen)
    	{
    		anEnemyIsVisible = true;
    		doJustOnce = true;
    		i += enemies.Length;
    	}
    	else
    		quantity += 1;
    	
    }
    
    if (quantity == enemies.Length)
    	anEnemyIsVisible = false;

}



