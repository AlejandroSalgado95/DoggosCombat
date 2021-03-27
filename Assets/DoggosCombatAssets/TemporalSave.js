#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

class TemporalSave extends MonoBehaviour implements IPointerDownHandler
{
	
    public function OnPointerDown (data : PointerEventData) {
    	
    	var SC : DoggoSceneCommunication = GameObject.FindWithTag("SceneCommunication").GetComponent.<DoggoSceneCommunication>();
    	SC.Save();
    }




}