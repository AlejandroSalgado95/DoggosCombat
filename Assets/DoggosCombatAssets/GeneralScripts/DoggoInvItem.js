#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoInvItem extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler
{
	
	public var touched : boolean;
	//public var SC : DoggoSceneCommunication;
	//public var warehouse : DoggoGameWarehouse;
	public var inventory : DoggoInventory;
	public var invItemAssigned : int;
	public var invItemType : int;
	private var pointerID : int;



    function Start()
    {
    	//invItemAssigned = -1;
        touched = false;
        //warehouse = GameObject.FindWithTag("GameWarehouse").GetComponent.<DoggoGameWarehouse>();
        //SC = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
    }
    
    public function OnPointerDown (data : PointerEventData) {
        if (!touched) {
            touched = true;
            pointerID = data.pointerId;
            if (invItemAssigned != -1 && inventory != null)
            {
            	inventory.Customize( invItemAssigned , invItemType );
            }
        }
    }

  

    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
           touched = false;
        }
        
    }
    
}