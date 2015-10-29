var wordList;
var emojiList;
var readyWordList = false;
var profanityList = [];

// Retrieve the localStorage from background page
var port = chrome.extension.connect({name: "getLocalStorage"});
port.postMessage({localStorage: "wordList"});
port.postMessage({localStorage: "filterSubstring"});
port.onMessage.addListener(function(msg) {
  if (msg.wordList) {
	wordList = msg.wordList.split(",");
    emojiList = ["🐩","🐓","©️","🌊","💏","⛲","💃","💩","🌀🌀","💃","🌭","🚺","👬","🙇","😈","😈","🐴🕳","💉","🎱","🐴🕳", "  jdkfjd "];
	generateProfanityList();
	removeProfanity();
	readyWordList = true;
  }
});

// When DOM is modified, remove profanity from inserted node
document.addEventListener('DOMNodeInserted', removeProfanityFromNode, false);

// Parse the profanity list
function generateProfanityList() {
	for (var x = 0; x < wordList.length; x++) {
		profanityList.push(new RegExp("(" + wordList[x][0] + ")" + wordList[x].substring(1), "gi" ));
	}
}

// Remove the profanity from the document
function removeProfanity() {
	var evalResult = document.evaluate(
		'.//text()[normalize-space(.) != ""]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < evalResult.snapshotLength; i++) {
		var textNode = evalResult.snapshotItem(i);
		for (var z = 0; z < profanityList.length; z++) {
			textNode.data = textNode.data.replace(profanityList[z], emojiReplace);
		}
	}
}

// Remove the profanity from the node
function removeProfanityFromNode(event) {
	var node = event.target;

	var evalResult = document.evaluate(
		'.//text()[normalize-space(.) != ""]',
		node,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < evalResult.snapshotLength; i++) {
		var textNode = evalResult.snapshotItem(i);
		for (var z = 0; z < profanityList.length; z++) {
			textNode.data = textNode.data.replace(profanityList[z], emojiReplace);
		}
	}
}

// Replace the profanity with an emoji
function emojiReplace(strMatchingString, strFirstLetter) {
	var starString = "";
  var index = wordList.indexOf(strMatchingString.toLowerCase());

  starString = emojiList[index];

	return starString;
}
