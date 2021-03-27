#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoAdquirableButton extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler
{
	public var adquirableNumber: int;
	public var adquirableType: int;
	public var adquirablePrice : int;
	public var shopMC : DoggoShopMenuController;
	public var touched : boolean;
	private var pointerID : int;
	public var available : boolean;
	public var SC : DoggoSceneCommunication;
	public var notAvailableObj : GameObject;




    function Start()
    {
    	shopMC = GameObject.FindWithTag("ShopMenuController").GetComponent.<DoggoShopMenuController>();
    	SC = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
        touched = false;
        available = true;
        notAvailableObj.SetActive(false);
        
        CheckAvailability ();
        if (!available)
        	notAvailableObj.SetActive(true);
        	
       
    }
    
    public function OnPointerDown (data : PointerEventData) {
        
        if (!touched) {
            touched = true;
            pointerID = data.pointerId;
           	
    
        }
        
    }
    
    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
            touched = false; 
            
            if (available){
           		shopMC.OpenAdquirableChart(adquirableNumber,  adquirableType, adquirablePrice, this);
           	}
        }
     }
     
     function CheckAvailability (){
     
     	for(var i : int = 1; i < SC.acStuffQuantity ; i++)
	    {
	    	if (SC.acStuff[i] == adquirableNumber)
	    		available = false;

	    }
	    
     }

    
}