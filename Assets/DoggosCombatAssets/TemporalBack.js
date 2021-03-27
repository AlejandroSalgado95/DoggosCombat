#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class TemporalBack extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler
{
	
	public var touched : boolean;
	private var pointerID : int;



    function Start()
    {
        touched = false;
       
    }
    
    public function OnPointerDown (data : PointerEventData) {
        
        if (!touched) {
            touched = true;
            pointerID = data.pointerId;
           
            Application.LoadLevel(0);
    
        }
        
    }
    
    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
            touched = false; 
           
        }
     }

    
}