#pragma strict

public var parent : ParticleSystem;
public var self : ParticleSystem;

function Start () {
	self = GetComponent.<ParticleSystem>();
}

function Update () {
	if (parent.emissionRate == 0)
		self.emissionRate = 0;
}