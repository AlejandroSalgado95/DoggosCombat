#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoWeaponAssignerMultiplayer extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler
{
	public var player : int ;
	public var touched : boolean;
	public var SC : DoggoSceneCommunicationMultiplayer;
	public var GC : DoggoGCMultiplayer;
	public var weaponAssigned : int;
	private var pointerID : int;
	public var check1 : boolean;
	public var check2 : boolean;
	public var check3 : boolean;

	function Awake () {
        touched = false;
        SC = GameObject.FindWithTag("SceneCommunicationMultiplayer").GetComponent.<DoggoSceneCommunicationMultiplayer>();

        if (player == 1)
	        GC = GameObject.FindWithTag("GameControllerP1").GetComponent.<DoggoGCMultiplayer>();
        else if (player == 2)
        	GC = GameObject.FindWithTag("GameControllerP2").GetComponent.<DoggoGCMultiplayer>();
        
        check1 = false;
        check2 = false;
        check3 = false;
		
    }
    
    function Start()
    {
    	if (player == 1)
    	{
	    	if (gameObject.CompareTag("WeaponButton1"))
	    	{
				weaponAssigned = SC.weaponSlot1P1;
				check1 = true;
			}
			else if (gameObject.CompareTag("WeaponButton2"))
			{
				weaponAssigned = SC.weaponSlot2P1;
				check2 = true;
			}
			else if (gameObject.CompareTag("WeaponButton3"))
			{
	       		weaponAssigned = SC.weaponSlot3P1;	
	       		check3 = true;
	       	}
	     }
	     else if (player == 2)
	     {
			if (gameObject.CompareTag("WeaponButton1"))
	    	{
				weaponAssigned = SC.weaponSlot1P2;
				check1 = true;
			}
			else if (gameObject.CompareTag("WeaponButton2"))
			{
				weaponAssigned = SC.weaponSlot2P2;
				check2 = true;
			}
			else if (gameObject.CompareTag("WeaponButton3"))
			{
	       		weaponAssigned = SC.weaponSlot3P2;	
	       		check3 = true;
	       	}
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