var storedWhitelist = [];

window.addEventListener("load", function()
{
	restore_options();

  document.getElementById("save")
          .addEventListener("click", save_options, false);
}, false);

// Saves options to localStorage.
function save_options() {
	var domain = document.getElementById("whitelist").value;

	if (domain) {
		storedWhitelist.push(domain);

		chrome.storage.sync.set("{'whitelist': storedWhitelist}", function() {
			// Notify that we saved.
			message('Settings saved');
		});

		// localStorage.setItem("whitelist", JSON.stringify(storedWhitelist));
		// console.log(localStorage["whitelist"]);
	}
}

// Restores form state to saved values from localStorage.
function restore_options() {

	chrome.storage.sync.get('whitelist', function(items) {
		console.log(items);
	})
	// storedWhitelist = localStorage.getItem("whitelist");

	// if (!storedWhitelist) {
	// 	storedWhitelist = [];
	// }
	// else {
	// 	storedWhitelist = JSON.parse(storedWhitelist);
	// }
}
