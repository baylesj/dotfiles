function getUrlVars() {

	var vars = {};
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++) {
		var hash = hashes[i].split('=');
		vars[hash[0]] = hash[1];
	}
	return vars;
}

var vars = getUrlVars();

var err = vars["error"];
var auth = vars["auth"];

if (err != undefined) {
	chrome.extension.getBackgroundPage().onLoginError(err);
	window.open('', '_self').close();
} else if (auth != undefined) {
	chrome.extension.getBackgroundPage().onLoginSuccess(auth);
	window.open('', '_self').close();
} else {
	window.location = "https://carbongames.com/auth/googleoauth.html?chrome=" + window.location.host;
}