// https://github.com/krasin/naclwtf

function checkBrowserIsChrome() {
	return window.navigator.appVersion.match(/Chrome\/(.*?) /) != null;
}

function checkChromeVersion() {
	var ver = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
	return ver >= 16;
}

function solveChromeVersion() {
	return "Native Client SDK 0.5 works with Chrome 14 and later. Your browser is " + window.navigator.appVersion;
}

function checkAboutPlugins() {
	for (var i = 0; i < navigator.plugins.length; i++) {
		if (navigator.plugins[i].name == "Native Client") {
			return true;
		}
	}
	return false;
}

function solveAboutPlugins() {
	return "Please, go to <b>about:plugins</b> and enable Native Client plugin.";
}

function checkAboutFlags(nacl_module) {
	return typeof nacl_module !== "undefined" &&
		typeof nacl_module.postMessage !== "undefined";
}

function solveAboutFlags() {
	return "Please, visit <b>about:flags</b>, enable Native Client and restart the browser.";
}

function checkLoaded(nacl_module) {
	return nacl_module.readyState == 4;
}

function solveLoaded(nacl_module) {
	if (typeof nacl_module.readyState === "undefined") {
		return "Native Client does not look to be enabled.";
	}
	if (nacl_module.readyState > 0 &&
			nacl_module.readyState < 4) {
		return "loading... readyState: " + String(nacl_module.readyState);
	}
	return "readyState: " + String(nacl_module.readyState);
}

function runCheck(output, name, check, solve) {
	var status = "UNKNOWN";
	var ok = false;
	try {
		ok = check();
		status = ok ? "OK" : "FAIL";
	} catch (e) {
		status = "Exception: " + e.message;
	}

	output.append("<p>");
	output.append(name + ": " + status);
	if (!ok && typeof solve !== "undefined") {
		output.append("<br>");
		output.append(solve());
	}
	output.append("</p>");
}

function runAllChecks(output, nacl_module) {
	output.html('');
	runCheck(output, "browser is Chrome", checkBrowserIsChrome);
	runCheck(output, "Chrome version >= 14", checkChromeVersion, solveChromeVersion);
	runCheck(output, "about:plugins", checkAboutPlugins, solveAboutPlugins);
	runCheck(output, "about:flags", function() { return checkAboutFlags(nacl_module); }, solveAboutFlags);
	runCheck(output, "hello_world loaded:", function() { return checkLoaded(nacl_module); },
			function() { return solveLoaded(nacl_module); }
			);
}
