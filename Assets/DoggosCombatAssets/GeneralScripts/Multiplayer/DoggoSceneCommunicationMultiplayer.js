#pragma strict


//El objetivo del objeto que tiene pegado este script es el de comunicar a las escenas exteriores
//con la escena principal (el juego en si) mediante el almacenado de valores obtenidos del exterior
//(escenas exteriores) para ser usados en el interior (escena principal o juego en si), y viceversa.
//Por ejemplo: en el exterior el jugador decidio que utilizaria 3 armas especificas de las tantas 
//disponibles; pues cuales armas fueron se guardan en este objeto para que dichos valores los 
//utilice la escena principal cuando se acceda a ella, para que asi en el juego (escena principal) 
//se utilicen las armas que el jugador eligio.
//De forma viceversa, valores como enemigos derrotados, dinero obtenido, etc, se guardan en este objeto
//para ser utilizados en escenas exteriores al terminar la escena principal (osea, el juego)


static var keepOneForever : DoggoSceneCommunicationMultiplayer;

public var maxPlayerHealthP1 : int;
public var maxPlayerHealthP2 : int;

public var selectedPlayerP1 : int;
public var selectedPlayerP2 : int;


//weapon slots
public var weaponSlot1P1 : int;
public var weaponSlot2P1 : int;
public var weaponSlot3P1 : int;

public var weaponSlot1P2 : int;
public var weaponSlot2P2 : int;
public var weaponSlot3P2 : int;


//enemies levels
public var shieldKnightLvl : int;
public var fireCasterKnightLvl : int;


//player weapons levels
public var fastTurretLvl : int;
public var granadeLauncherLvl : int;
public var rocketLauncherLvl : int;
public var flameThrowerLvl : int;
public var gravityBomberLvl : int;

public var weaponsBulletsP1 : int[];
public var weaponsBulletsP2 : int[];



function Awake () {

	//ARMAS CON BUG CUANDO SE USAN POR P1 Y P2 AL MISMO TIEMPO
	//MISSILE LAUNCHER
	//GRAVITY BOMBER
	//GRANADE LAUNCHER
	
	
	maxPlayerHealthP1 = 100;
	maxPlayerHealthP2 = 100;
	
	selectedPlayerP1 = 0;
	selectedPlayerP2 = 0;
	
	weaponSlot1P1 = 0;
	weaponSlot2P1 = 4;
	weaponSlot3P1 = 1;
	
	weaponSlot1P2 = 1;
	weaponSlot2P2 = 3;
	weaponSlot3P2 = 4;
	
	shieldKnightLvl = 1;
	fireCasterKnightLvl = 1;
	
	fastTurretLvl = 1;
	granadeLauncherLvl = 1;
	rocketLauncherLvl = 1;
	flameThrowerLvl = 1;
	gravityBomberLvl = 1;
	
	if (keepOneForever == null)
	{
		keepOneForever = this;
	}
	else
	{
		Destroy(gameObject);
	}
}

function Update () {

}