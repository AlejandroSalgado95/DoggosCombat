#pragma strict

function Start () {

}

function Update () {
	
	var MovePerSecond : Vector3;
	var HMove : float;
	var VMove : float;
	
	//if (!attackButton.active && !defendButton.active)
	//{

		HMove = Input.GetAxisRaw("Horizontal");
		VMove = Input.GetAxisRaw("Vertical");
		
		MovePerSecond = new Vector3(HMove, 0.0f, VMove) * 5 * Time.deltaTime; 
		transform.position = transform.position + MovePerSecond;
		
		var LookDirection : Vector3;
		var RotationDirection: Quaternion;
			
		LookDirection = new Vector3(HMove, 0.0f, VMove);
			
		RotationDirection = Quaternion.LookRotation (LookDirection);
		transform.rotation = RotationDirection;
		//transform.eulerAngles +=  new Vector3(0,90,0);
	

}