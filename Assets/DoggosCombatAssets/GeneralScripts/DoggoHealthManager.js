#pragma strict

public var shieldKnightLvl : int;
public var fireCasterKnightLvl : int;
public var SC : DoggoSceneCommunication;
public var GC : DoggoGC;
public var playerLvlText: UI.Text;
public var damageText : GameObject;
public var damagePosXVal : float;
public var damagePosYVal : float;
private var damage : int;
public var playerCanvas : GameObject;
private var check1 : boolean;

function Start () {
	
	check1 = false;
	SC = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
	GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();
	shieldKnightLvl = SC.shieldKnightLvl;
	fireCasterKnightLvl = SC.fireCasterKnightLvl;
	
}

function Update () {
	
	
}

function OnTriggerEnter (other : Collider){
	
	if (other.gameObject.CompareTag("E1Bullet"))
	{
		damage = 5 * shieldKnightLvl;
		GC.makeDamage(damage);
		makeDamageText(damage);
	}
	else if (other.gameObject.CompareTag("FireBall"))
	{
	    damage = 10 * fireCasterKnightLvl;
		GC.makeDamage(damage);
		makeDamageText(damage);
	}
}

function makeDamageText(damageVal : int)
{
	
	//Instancia el UI que sera utilizado como texto de daño 
	var damageTextObj : GameObject = Instantiate(damageText,Vector3.zero,Quaternion.identity);
	var textComp : Text = damageTextObj.GetComponent.<Text>();
	textComp.text = damageVal.ToString() + "!";
	
	//Los UI solo pueden existir dentro de un Canvas, por lo tanto, asigna al UI de texto de daño
	//como hijo del canvas que esta pegado al personaje
	var rt : RectTransform = damageTextObj.GetComponent.<RectTransform>();
	var rtParent : RectTransform = playerCanvas.GetComponent.<RectTransform>();
	rt.SetParent(rtParent, false);
	
	//Alterna la posicion en la que saldra el texto de daño (sale a la izquierda, luego a la derecha, etc.)
	if (!check1)
	{
	    //posicion del pivote del texto de daño con respecto al ancla de su padre
	    
	    //Suena complicado, pero es la posicion mas facil de usar y es de hecho
	    //la que siempre uso en el inspector a la hora de mover UIs, pues todas las posiciones
	    //de los UIs son anchoredPosition, es decir, la posicion en la que se encuentran con respecto
	    //a su objeto padre (generalmente es el canvas)
		rt.anchoredPosition = new Vector3(damagePosXVal,damagePosYVal,0);
		check1 = true;
	}
	else
	{
		rt.anchoredPosition = new Vector3(damagePosXVal + 60 ,damagePosYVal,0);
		check1 = false;
	}
	
	//Como precaucion asigna un tamaño al texto de daño
	//Asigna cierta rotacion al texto de daño para que se vea mejor en la camara, pues como el canvas
	//esta completamente parado (osea, nada inclinado), si el texto de daño no se rotara un poco, 
	// este se veria muy poco, o se veria mal, pues al igual que el canvas, estaria completamente parado
	// (osea, nada inclinado)
	
	//Hecho esto, ahora si activa o enciendo el UI texto de daño
	rt.localScale = new Vector3(1f,1f,1f);
	rt.eulerAngles += new Vector3(40,0,0);
	damageTextObj.SetActive(true);
	
}


