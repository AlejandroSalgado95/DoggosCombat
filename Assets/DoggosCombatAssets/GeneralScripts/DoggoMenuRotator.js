#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class DoggoMenuRotator extends MonoBehaviour implements IPointerDownHandler, IPointerUpHandler, IDragHandler
{
	
    public var smoothing : float; 
	private var origin : Vector2;
	private var direction : Vector2;
	private var smoothDirection : Vector2;
	private var touched : boolean;
	private var pointerID: int;
	
	public var rotationVel : Vector3;
	public var actualRot : Quaternion;
	public var degreesPerUnit : float;
	public var units : float;
	public var totalDegrees : float;
    
    function Awake () {
        touched = false;
        rotationVel = new Vector3(0.0f,0.0f,0.0f);
    }
    
    function Update()
    {
    	transform.eulerAngles += rotationVel * Time.deltaTime;	
    }
    
    public function OnPointerDown (data : PointerEventData) {
        if (!touched) {
            touched = true;
            pointerID = data.pointerId;
            origin = data.position;
            actualRot = transform.rotation;
        }
    }

    public function OnDrag (data : PointerEventData) {
        if (data.pointerId == pointerID) {
            var currentPosition : Vector2 = data.position;
            direction = currentPosition - origin;
            units = direction.y;
            totalDegrees = units * degreesPerUnit;
            transform.rotation = actualRot * Quaternion.Euler(0,0,totalDegrees);
        }
    }

    public function OnPointerUp (data: PointerEventData) {
        if (data.pointerId == pointerID) 
        {
            direction = Vector3.zero;
            touched = false; 
            //StartCoroutine(GoBackToStartPosition());
        }
        
    }
    
    /*
    function GoBackToStartPosition()
    {
	    while ((transform.position - startPosition).magnitude > 1)
	    {
	    	transform.position = Vector3.Lerp(transform.position,startPosition,0.1f);
	    	yield;
	    }
    }*/
    


}