#pragma strict
import UnityEngine.UI;

public var warehouse : DoggoGameWarehouse;
private var SC : DoggoSceneCommunication;
public var adquirableChart : GameObject;
public var priceText : UI.Text;
public var adquirableImg : Image;
public var number : int;
public var type : int;
public var price : int;
public var obtainedCoins : int;
public var obtainedCoinsText : UI.Text;
public var notEnoughChart : GameObject;
public var btn : DoggoAdquirableButton;

function Awake()
{	
	SC = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
	warehouse = GameObject.FindWithTag("GameWarehouse").GetComponent.<DoggoGameWarehouse>();
	adquirableChart.SetActive(false);
	notEnoughChart.SetActive(false);
	obtainedCoins = SC.coinAmount;
	obtainedCoinsText.text = "$ " + obtainedCoins.ToString();
}


function Start () {

}

function Update () {

}

public function OpenAdquirableChart(adquirableNumber : int,  adquirableType: int, adquirablePrice : int, adquirableBtn : DoggoAdquirableButton){
	
	number = adquirableNumber;
	type = adquirableType;
	price = adquirablePrice;
	btn = adquirableBtn;
	adquirableImg.sprite = warehouse.acSprites[adquirableNumber];
	adquirableChart.SetActive(true);
	priceText.text = "Would you like to buy this adquirable for $" + price.ToString() + " ?";

}

public function CloseAdquirableChart(){

	adquirableChart.SetActive(false);

}

public function BuyAdquirable(){
	
	if (obtainedCoins >= price){
		
		obtainedCoins -= price;
		SC.coinAmount = obtainedCoins;
		SC.acStuff[SC.acStuffQuantity] = number;
		SC.acStuffType[SC.acStuffQuantity] = type;
		SC.acStuffQuantity++;
		LerpReduceCoins();
		SC.Save();
		adquirableChart.SetActive(false);
		btn.notAvailableObj.SetActive(true);
		btn.available = false;
	}
	else {
		
		notEnoughChart.SetActive(true);
		adquirableChart.SetActive(false);

	}
	


}


function LerpReduceCoins(){

	var oldCoinAmount : int = obtainedCoins + price;
	
	while (obtainedCoinsText.text != ("$ " + obtainedCoins.ToString() ) )
	{
		oldCoinAmount -= 1;
		obtainedCoinsText.text = "$ " + oldCoinAmount.ToString();
		yield;
	}



}

function CloseNotEnoughChart(){


	notEnoughChart.SetActive(false);


}













