#pragma strict

public var explosion : GameObject;
public var enemies : GameObject[];
public var followTimer : float;
public var followStartLag : float;
private var check1 : boolean;
public var enemyPos : Transform;
public var minimumDistanceVal : float;
public var validRange : boolean;
public var detectionRange : float;
private var rb : Rigidbody;
public var dir : Vector3;

public var distanceVectTemp : Vector3;
public var distanceValTemp : float;
public var rocketSpeed : float;


function Start () {
	validRange = false;
	rb = GetComponent.<Rigidbody>();
	detectionRange = 30;
	minimumDistanceVal = 9999f;
	check1 = false;
	followTimer = Time.time + followStartLag;
	FindClosestEnemy();

}

function FixedUpdate () {
	
	//Esto es para hacer que en cuanto el misil es creado, este no se ponga a seguir al enemigo de inmediato
	//Esto lo hago no con la idea de la mecanica del misil en mente, sino con la idea de "apariencia visual":
	//Si el misil se pone a seguir de inmediato al enemigo, como el punto de instanciacion del misil esta
	//en la mitad del cañon, esto hara que el misil pueda rotar desde que es creado, lo que ocasionara 
	//que el misil salga de la mitad del cañon, y lo atraviese para salir, lo cual es un COMPLETO ERROR
	// visual. Para evitar esto, y obligar al misil a ir en linea recta por unos instantes en cuanto es creado,
	//para que asi salga del cañon por donde visualmente debe salir enves de atravesarlo desde su mitad, hice
	//que pasaran unos instantes ANTES de que el misil PUEDA EMPEZAR a seguir a algun enemigo
	if (Time.time > followTimer)
	{
		//Si el enemigo mas cercano se encuentra a una distancia valida o razonable
		if (validRange)
		{
		//Si el enemigo encontrado no ha sido destruido
			if (enemyPos != null)
			{
			    
				dir = enemyPos.position - transform.position;
				var newRot : Quaternion = Quaternion.LookRotation(dir);
				
				//No rotes instantaneamente, pues es visualmente un COMPLETO ERROR. Al contrario, 
				//transiciona desde tu rotacion actual, hasta llegar a la rotacion deseada.
				transform.rotation = Quaternion.Lerp(transform.rotation, newRot, 0.075f);
				//rb.velocity = dir.normalized * 15;
				
				//Que el misil se mueva siempre en la direccion de su eje local azul (la flecha azul),
				//lo cual es visualmente correcto pues la punta del misil esta alineada con dicho eje,
				//lo cual hara ver que el misil se mueve siempre en la direccion a la que esta mirando,
				//sea que se mueva en linea recta  o este rotando
				
				rb.velocity = transform.forward * 10;
			}
			
		}
	}

}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag != "Player")
	{
		Instantiate(explosion,transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}

function FindClosestEnemy()
{
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
    
    if (minimumDistanceVal < detectionRange)
    	validRange = true;
    
	
}





