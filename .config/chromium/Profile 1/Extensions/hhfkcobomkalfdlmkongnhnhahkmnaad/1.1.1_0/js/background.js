/*! Voice Search Chromium Extension
 *
 *  Copyright 2012 Eli Grey
 *  	See LICENSE.md
 */

/*jslint laxbreak: true, strict: true*/
/*global localStorage, chrome*/

"use strict";

self.log_query = function(raw_query, name, url, query, input_method) {
	var
		  req = new XMLHttpRequest
		, data = new FormData
	;

	data.append("aid"      , "voicesearch");
	data.append("data"     , raw_query);
	data.append("action"   , name);
	data.append("engine"   , url);
	data.append("terms"    , query);
	data.append("input"    , input_method);
	data.append("locale"   , i18n("@@IETF_lang_tag"));
	data.append("version"  , chrome.app.getDetails().version);

	req.open("POST", "https://vschrome.ispeech.org/voicesearch/feedback.php", true);
	req.send(data);
};

chrome.extension.onConnect.addListener(function(port) {
	if (port.name === chrome.extension.getURL("")) {
		port.postMessage(localStorage.website_integration);
		port.onMessage.addListener(function(data) {
			log_query(data.raw_query, data.name, data.url, data.query, data.input_method);
		});
	}
});

chrome.browserAction.onClicked.addListener(function() {
	chrome.windows.getCurrent(function(window) {
		chrome.windows.create({
			  url: chrome.extension.getURL("views/popup.xhtml")
			, width: 100
			, height: 100
			, left: window.left + window.width - 145
			, top: window.top
			, focused: true
			, type: "popup"
		});
	});
});