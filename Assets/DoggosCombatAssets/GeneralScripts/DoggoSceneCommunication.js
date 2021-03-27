#pragma strict
import System;
import System.Runtime.Serialization.Formatters.Binary;
import System.IO;


//El objetivo del objeto que tiene pegado este script es el de comunicar a las escenas exteriores
//con la escena principal (el juego en si) mediante el almacenado de valores obtenidos del exterior
//(escenas exteriores) para ser usados en el interior (escena principal o juego en si), y viceversa.
//Por ejemplo: en el exterior el jugador decidio que utilizaria 3 armas especificas de las tantas 
//disponibles; pues cuales armas fueron se guardan en este objeto para que dichos valores los 
//utilice la escena principal cuando se acceda a ella, para que asi en el juego (escena principal) 
//se utilicen las armas que el jugador eligio.
//De forma viceversa, valores como enemigos derrotados, dinero obtenido, etc, se guardan en este objeto
//para ser utilizados en escenas exteriores al terminar la escena principal (osea, el juego)


static var keepOneForever : DoggoSceneCommunication;

//max health of the character
public var maxPlayerHealth : int;

//character selected by the player
public var selectedPlayer : int;

//weapon slots
public var weaponSlot1 : int;
public var weaponSlot2 : int;
public var weaponSlot3 : int;



//enemies levels
public var shieldKnightLvl : int;
public var fireCasterKnightLvl : int;


//player weapons levels
public var fastTurretLvl : int;
public var granadeLauncherLvl : int;
public var rocketLauncherLvl : int;
public var flameThrowerLvl : int;
public var gravityBomberLvl : int;

//player weapons ammo
public var weaponsBullets : int[];


public var acStuff : int[];
public var acStuffType : int[];
public var acCharacters : int[];
public var stuffInUse : int[];  //-1: no hay nada, 0: sombrero, 1: gafas, 2: bigote, 3: botas

public var acStuffQuantity : int;
public var coinAmount : int;


function Awake () {

	if (keepOneForever == null)
	{
	    DontDestroyOnLoad (gameObject);
		keepOneForever = this;
		Load();
	}
	else
	{
		Destroy(gameObject);
	}
	
	//File.Delete(Application.persistentDataPath + "/playerInfo.dat");
}

function Start () {
	
	
}

function Save(){

	    var bf : BinaryFormatter = new BinaryFormatter();
	    var file : FileStream = File.Create(Application.persistentDataPath + "/playerInfo.dat");
	     
	    var data : PlayerData = new PlayerData();
		data.maxPlayerHealth = maxPlayerHealth;
		data.selectedPlayer = selectedPlayer ;
		data.weaponSlot1 = weaponSlot1;
		data.weaponSlot2 = weaponSlot2;
		data.weaponSlot3 = weaponSlot3;
		data.shieldKnightLvl = shieldKnightLvl;
		data.fireCasterKnightLvl = fireCasterKnightLvl;
		data.fastTurretLvl = fastTurretLvl;
		data.granadeLauncherLvl = granadeLauncherLvl;
		data.rocketLauncherLvl = rocketLauncherLvl;
		data.flameThrowerLvl = flameThrowerLvl;
		data.gravityBomberLvl = gravityBomberLvl;
		data.weaponsBullets = weaponsBullets;
		
		data.acStuff = acStuff;
		data.acStuffType = acStuffType;
		data.acCharacters = acCharacters;
		data.stuffInUse = stuffInUse;
		data.acStuffQuantity = acStuffQuantity;
		data.coinAmount = coinAmount;
     
	    bf.Serialize(file, data);
	    file.Close();
 }
 
function Load(){
     
     if(File.Exists(Application.persistentDataPath + "/playerInfo.dat"))
     {
         var bf : BinaryFormatter = new BinaryFormatter();
         var file : FileStream = File.Open(Application.persistentDataPath + "/playerInfo.dat", FileMode.Open);
        ////////////////THIS IS THE LINE THE ERROR APPEARS ON/////////////
         var data : PlayerData =  bf.Deserialize(file) as PlayerData;
       //////////////////////////////////////////////////////////////////
         file.Close();
         
        maxPlayerHealth = data.maxPlayerHealth;
		selectedPlayer = data.selectedPlayer;
		weaponSlot1 = data.weaponSlot1;
		weaponSlot2 = data.weaponSlot2;
		weaponSlot3 = data.weaponSlot3;
		shieldKnightLvl = data.shieldKnightLvl;
		fireCasterKnightLvl = data.fireCasterKnightLvl;
		fastTurretLvl = data.fastTurretLvl;
		granadeLauncherLvl = data.granadeLauncherLvl;
		rocketLauncherLvl = data.rocketLauncherLvl;
		flameThrowerLvl = data.flameThrowerLvl;
		gravityBomberLvl = data.gravityBomberLvl;
        weaponsBullets = data.weaponsBullets;
        acStuff = data.acStuff;
		acStuffType = data.acStuffType;
		acCharacters = data.acCharacters;
		stuffInUse = data.stuffInUse;
		acStuffQuantity = data.acStuffQuantity;
		coinAmount = data.coinAmount;
         //saveVariable = data.saveVariable;
     }
     else
     {
     	maxPlayerHealth = 100;
		selectedPlayer = 0;
		weaponSlot1 = 0;
		weaponSlot2 = 1;
		weaponSlot3 = 3;
		shieldKnightLvl = 1;
		fireCasterKnightLvl = 1;
		fastTurretLvl = 1;
		granadeLauncherLvl = 1;
		rocketLauncherLvl = 1;
		flameThrowerLvl = 1;
		gravityBomberLvl = 1;
     	weaponsBullets = new int[5];
     	weaponsBullets[0] = 0;
     	weaponsBullets[1] = 15;
     	weaponsBullets[2] = 30;
     	weaponsBullets[3] = 1500;
     	weaponsBullets[4] = 10;
     	
     	acStuff  = new int[50];
     	acStuff[0] = 0;
     	
     	/*
     	acStuff[1] = 1;
     	acStuff[2] = 12;
     	acStuff[3] = 20;
     	acStuff[4] = 18;
     	acStuff[5] = 3;
     	acStuff[6] = 13;
     	acStuff[7] = 19;
  
     	acStuff[8] = 2;
     	
     	acStuff[9] = 14;
     	acStuff[10] = 15;
     	acStuff[11] = 16;
     	acStuff[12] = 21;
     	acStuff[13] = 22;
     	acStuff[14] = 4;
     	acStuff[15] = 17;
     	*/
     	
		
		// 0: arma, 1: sombrero, 2: bigote, 3: gafas, 4: botas
		acStuffType  = new int[50]; //necesario para buscar en el inventario solo objetos de tipo sombrero, o solo de tipo arma, o solo de tipo gafa, etc.
		acStuffType[0] = 0;
		
		/*
		acStuffType[1] = 0;
		acStuffType[2] = 4;
		acStuffType[3] = 1;
		acStuffType[4] = 3;
		acStuffType[5] = 0;
		acStuffType[6] = 4;
     	acStuffType[7] = 1;
     	
     	
     	acStuffType[8] = 0;
     	acStuffType[9] = 4;
     	acStuffType[10] = 3;
     	acStuffType[11] = 3;
     	acStuffType[12] = 1;
     	acStuffType[13] = 1;
     	acStuffType[14] = 0;
     	acStuffType[15] = 3;
		acStuffQuantity = 16;
		*/
		
		acStuffQuantity = 1;
		
		acCharacters = new int[10];
		acCharacters[0] = 0;
		
		stuffInUse = new int[5];
		// 0: sombrero, 1: gafas, 2: bigote, 3: botas
		stuffInUse[0] = -1;
		stuffInUse[1] = -1;
		stuffInUse[2] = -1;
		stuffInUse[3] = -1;
		stuffInUse[4] = -1;
		
		coinAmount = 5000;
		
		CleanArrays();
     }
 }
 
 function CleanArrays(){
 
 	for(var i : int = 1; i < acStuff.length ; i++)
    {
    	if (acStuff[i] == 0){
    	
    		acStuff[i] = -1;
    		acStuffType[i] = -1;
    	
    	}

    }
    
    for(var j : int = 1; j < acCharacters.length ; j++)
    {
    	if (acCharacters[j] == 0){
    		acCharacters[j] = -1;
    	
    	}
    }
 
 
 }
 

class PlayerData extends System.Object{
     
    public var maxPlayerHealth : int ;
	
	public var selectedPlayer : int;
	
	public var weaponSlot1 : int;
	public var weaponSlot2 : int;
	public var weaponSlot3 : int;
	
	public var shieldKnightLvl : int;
	public var fireCasterKnightLvl : int;
	
	public var fastTurretLvl : int;
	public var granadeLauncherLvl : int;
	public var rocketLauncherLvl : int;
	public var flameThrowerLvl : int;
	public var gravityBomberLvl : int;
	
	public var weaponsBullets : int[];
	public var acStuff : int[];
	public var acStuffType : int[];
	public var acCharacters : int[];
	public var stuffInUse : int[];
	
	public var acStuffQuantity : int;
	
	public var coinAmount : int;
}
