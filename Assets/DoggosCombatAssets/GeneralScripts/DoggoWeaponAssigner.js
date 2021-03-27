#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoWeaponAssigner extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler
{
	
	public var touched : boolean;
	public var SC : DoggoSceneCommunication;
	public var GC : DoggoGC;
	public var weaponAssigned : int;
	private var pointerID : int;
	public var check1 : boolean;
	public var check2 : boolean;
	public var check3 : boolean;

	function Awake () {
        touched = false;
        GC = GameObject.FindWithTag("GameController").GetComponent.<DoggoGC>();
        SC = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
        check1 = false;
        check2 = false;
        check3 = false;
		
    }
    
    function Start()
    {
    	if (gameObject.CompareTag("WeaponButton1"))
    	{
			weaponAssigned = SC.weaponSlot1;
			check1 = true;
		}
		else if (gameObject.CompareTag("WeaponButton2"))
		{
			weaponAssigned = SC.weaponSlot2;
			check2 = true;
		}
		else if (gameObject.CompareTag("WeaponButton3"))
		{
       		weaponAssigned = SC.weaponSlot3;	
       		check3 = true;
       	}
    }
    
    public function OnPointerDown (data : PointerEventData) {
        if (!touched) {
            touched = true;
          	GC.ChangeWeapon(weaponAssigned);
            pointerID = data.pointerId;
        }
    }

  

    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
           touched = false;
        }
        
    }
    
}