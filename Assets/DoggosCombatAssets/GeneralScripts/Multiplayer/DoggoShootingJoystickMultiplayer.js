#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoShootingJoystickMultiplayer extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler, IDragHandler
{
	
    public var smoothing : float; 
	public var origin : Vector2;
	public var startPosition : Vector3;
	public var directionMag : float;
	public var directionRaw : Vector2;
	public var direction : Vector2;
	public var smoothDirection : Vector2;
	public var touched : boolean;
	public var pointerID: int;
	public var isShooting: boolean;
	public var rectTrans : RectTransform;
	public var rectTransPos : Vector3;
    
    function Awake () {
        direction = Vector2.zero;
        touched = false;
        rectTrans = gameObject.GetComponent.<RectTransform>();
        startPosition.x = rectTrans.anchoredPosition3D.x;
        startPosition.y = rectTrans.anchoredPosition3D.y;
        startPosition.z = rectTrans.anchoredPosition3D.z;
        isShooting = false; 
    }
    
    public function OnPointerDown (data : PointerEventData) {
        if (!touched) {
            touched = true;
            pointerID = data.pointerId;
            origin = data.position;
        }
    }

    public function OnDrag (data : PointerEventData) {
        if (data.pointerId == pointerID) {
            var currentPosition : Vector2 = data.position;
            directionRaw  = currentPosition - origin;
            direction = directionRaw.normalized;
            directionMag = direction.magnitude;
            
            if (gameObject.tag == "ShootingJoystickP1")
            {
           	 	 rectTrans.anchoredPosition3D.x = startPosition.x + (direction.y * -25);
           		 rectTrans.anchoredPosition3D.y = startPosition.y + (direction.x * 25);
            }
            
            else if (gameObject.tag == "ShootingJoystickP2")
            {
            	 rectTrans.anchoredPosition3D.x = startPosition.x + (direction.y * 25);
           		 rectTrans.anchoredPosition3D.y = startPosition.y + (direction.x * -25);
            }
         
            rectTrans.anchoredPosition3D.z = 0.0f;
            rectTransPos = rectTrans.anchoredPosition3D;
            //transform.position.z = 0.0f;
            isShooting = true;
        }
    }

    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
            direction = Vector3.zero;
            touched = false; 
            isShooting = false;
            StartCoroutine(GoBackToStartPosition());
        }
        
    }
    
    function GoBackToStartPosition()
    {
	    while ((rectTrans.anchoredPosition3D - startPosition).magnitude > 0.5f)
	    {
	    	rectTrans.anchoredPosition3D = Vector3.Lerp(rectTrans.anchoredPosition3D,startPosition,0.1f);
            rectTrans.anchoredPosition3D.z = 0.0f;
	    	yield;
	    }
    }
    


    public function GetDirection () {
        //smoothDirection = Vector2.MoveTowards (smoothDirection, direction, smoothing);
        if (gameObject.tag == "ShootingJoystickP1")
        {
	        var p1RightDir : Vector2 = new Vector2(direction.y, -1 * direction.x);
	        return p1RightDir;
	    }
	    else if (gameObject.tag == "ShootingJoystickP2")
	    {
			var p2RightDir : Vector2 = new Vector2(-1 * direction.x, -1 * direction.y);
	        return p2RightDir;
	    }
    }
    
    public function GetIsShooting()
    {
    	return isShooting;
    }
}