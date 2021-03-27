#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoMenuButton extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler, IDragHandler
{
	public var touched : boolean;
	public var pointerID: int;
	public var buttonState : DoggoTextSelected;
	public var sceneAssigned : int;

    
    function Awake () {
        
        touched = false;
        buttonState = GetComponent.<DoggoTextSelected>();
        
        if (gameObject.name == "SinglePlayer")
        {
        	sceneAssigned = 1;
        }
        else if (gameObject.name == "MultiPlayer")
        {
        	sceneAssigned = 2;
        }
        else if (gameObject.name == "Customize")
        {
        	sceneAssigned = 3;
        }
        else if (gameObject.name == "Shop")
        {
        	sceneAssigned = 4;
        }
       
    }
    
    public function OnPointerDown (data : PointerEventData) {
        if (!touched) {
            touched = true;
            pointerID = data.pointerId;
        }
    }

    public function OnDrag (data : PointerEventData) {
        if (data.pointerId == pointerID) {
            
        }
    }

    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
            touched = false; 
            
            if (buttonState.ready == true)
            {
            	Application.LoadLevel(sceneAssigned);
            }
           
        }
        
    }
    
    
}
