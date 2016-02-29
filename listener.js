function begin() {

	chrome.tabs.query({}, function (tabs) {
			localStorage.url = tabs[0].url;
	});

	// Set default values
	if (!localStorage.wordList) {
		localStorage.wordList = "bitch,cock,cunt,damn,fuck,piss,slut,shit,tits,whore,dick,pussy,fag,bastard,douche,doosh,asshole,bloody,bollocks,arsehole";
	}

	// Handle Message Passing for localStorage
	chrome.extension.onConnect.addListener(function(port) {

		port.onMessage.addListener(function(msg) {
		if (msg.localStorage == "wordList") {
		  port.postMessage({wordList: localStorage.wordList, url: localStorage.url});
		}
	  });
	});
}

window.addEventListener("DOMContentLoaded", begin);
