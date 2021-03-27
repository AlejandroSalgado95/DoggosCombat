#pragma strict
import UnityEngine.UI;
import UnityEngine.EventSystems;

private var anim : Animator;
public var arrow : Transform;
public var distance : Vector3;
public var distanceMag : float;
public var rectTrans : Transform;
public var time : float;
public var ready : boolean;

function Start () {

	anim = GetComponent.<Animator>();
	arrow = GameObject.FindWithTag("BigArrow").GetComponent.<RectTransform>();
	rectTrans = gameObject.GetComponent.<RectTransform>();
	distanceMag = 0.0f;
	time = 0.0f;
	ready = false;
}

function Update () {
	
	time = Time.time;
	distance = arrow.position -  rectTrans.position;
	distanceMag = distance.magnitude;
	
	if (distance.y > 50 || distance.y < -50)
	{
		anim.SetTrigger("SelectedToNotSelected");
		anim.ResetTrigger("NotSelectedToSelected");
		ready = false;
	}
	else
	{
		anim.SetTrigger("NotSelectedToSelected");
		anim.ResetTrigger("SelectedToNotSelected");
		ready = true;
	}

}

/*
public function OnTriggerEnter( col : Collider)
{
	
	untouched = true;

	if (col.gameObject.tag == "BigArrow")
	{
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("notSelected"))
		{
			anim.SetTrigger("NotSelectedToSelected");
			anim.ResetTrigger("SelectedToNotSelected");
		}
	}
	
}

public function OnTriggerExit( col : Collider)
{
	untouched = false;

	if (col.gameObject.tag == "BigArrow")
	{
		if (anim.GetCurrentAnimatorStateInfo(0).IsName("selected"))
		{
			anim.SetTrigger("SelectedToNotSelected");
			anim.ResetTrigger("NotSelectedToSelected");
		}
	}
	
}*/