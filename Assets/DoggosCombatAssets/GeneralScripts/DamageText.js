#pragma strict
import UnityEngine.UI;

private var textComp : Text;
private var lerpedColor : Color32;
private var targetColor : Color32;
private var rectT : RectTransform;

function Start () {
	
	textComp = GetComponent.<Text>();
	lerpedColor = textComp.color;
	targetColor = new Color32(197,30,30,0);
	rectT = gameObject.GetComponent.<RectTransform>();
	Destroy(gameObject,3);
}

function Update () {
	
	lerpedColor = Color32.Lerp(lerpedColor, targetColor, 0.05f);
	textComp.color = lerpedColor;
	rectT.anchoredPosition.y += (80*Time.deltaTime);
	
	
}	

function setDamageValue(damageVal : int)
{
	textComp.text = damageVal.ToString + "!";
}


