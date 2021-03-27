/*
using UnityEngine;
using UnityEngine.Advertisements;

using System.Collections;
using UnityEngine.SceneManagement;

public class advertiser : MonoBehaviour
{
	public bool watchedAd;

	void Start () {

		watchedAd = false;
	}

	public void ShowRewardedAd()
	{	
		//1)video 2)rewardedVideo
		const string placementID = "rewardedVideo";

		if (Advertisement.IsReady(placementID))
		{
			var options = new ShowOptions { resultCallback = HandleShowResult };
			Advertisement.Show(placementID, options);
			//Advertisement.Show();
			Time.timeScale = 0;
		}
	}

	private void HandleShowResult(ShowResult result)
	{
		switch (result)
		{
		case ShowResult.Finished:
			Debug.Log("The ad was successfully shown.");
			watchedAd = true;
			// YOUR CODE TO REWARD THE GAMER
			// Give coins etc.
			Time.timeScale = 1;
			break;
		case ShowResult.Skipped:
			Debug.Log("The ad was skipped before reaching the end.");
			Time.timeScale = 1;
			break;
		case ShowResult.Failed:
			Debug.LogError("The ad failed to be shown.");
			Time.timeScale = 1;
			break;
		}
	}

}
*/


