/*
Copyright (C) 2012 Cristian Perez (http://cpr.name)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Settings keys
var YTRP_VERSION_KEY = "YTRP_VERSION";
var YTRP_COUNT_KEY = "YTRP_COUNT";
var YTRP_BAR_THICKNESS_KEY = "YTRP_BAR_THICKNESS";
var YTRP_HIGHLIGHTED_VIDEOS_KEY = "YTRP_HIGHLIGHTED_VIDEOS";
var YTRP_CACHING_KEY = "YTRP_CACHING";

//DEBUG: Clear settings
//localStorage.removeItem(YTRP_VERSION_KEY);
//localStorage.removeItem(YTRP_COUNT_KEY);
//localStorage.removeItem(YTRP_BAR_THICKNESS_KEY);
//localStorage.removeItem(YTRP_HIGHLIGHTED_VIDEOS_KEY);
//localStorage.removeItem(YTRP_CACHING_KEY);

// Default settings
var YTRP_DEFAULT_BAR_THICKNESS = 5;
var YTRP_DEFAULT_HIGHLIGHTED_VIDEOS = 0;
var YTRP_DEFAULT_CACHING = 3; // 3 is 1h. [disabled, 5m, 30m, 1h, 2h, 6h, 12h, 24h]

// YouTube API configuration
var YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST = 50;
var YOUTUBE_API_DEVELOPER_KEY = "key=AI39si6vTuds9ztLIfA_jXPWwFXfozZ0NYKd0HqD40ec9SwSj8xfNW53qfz3sJGNnSSsreg1ZrVA_T2QjzQfIQwuE8gLggmSLg";

// Configure cache
var YTRP_CACHE_ENABLE; // True or false
var YTRP_CACHE_EXPIRATION; // In milliseconds
if (localStorage[YTRP_CACHING_KEY] == undefined)
{
	localStorage[YTRP_CACHING_KEY] = YTRP_DEFAULT_CACHING;
}
configureCache();

// Check count and new version
if (localStorage[YTRP_COUNT_KEY] == undefined)
{
	localStorage[YTRP_COUNT_KEY] = 0;
}
if (localStorage[YTRP_VERSION_KEY] == undefined)
{
	// First install, don't bother the user
	localStorage[YTRP_VERSION_KEY] = chrome.app.getDetails().version;
}
else if (localStorage[YTRP_VERSION_KEY] != chrome.app.getDetails().version)
{
	// Update, show update successful box
	localStorage[YTRP_VERSION_KEY] = chrome.app.getDetails().version;
	chrome.tabs.create({url:chrome.extension.getURL("donate.html") + "?mode=update"});
}

// Hashtable holding for every video id, an array of: views [0], likes [1], dislikes [2], and retrieval time [3]
var cacheVideoHashtable = new Object();

// Listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(updatePageAction);

// Wire up the listener of the messages so that we can receive them from the content script
chrome.extension.onMessage.addListener(onMessage);

// If the new URL of the tab is of the domain "youtube.com", show page action, otherwise hide it
function updatePageAction(tabId, changeInfo, tab)
{
	var domain = "youtube.com";
	var host = tab.url.split("/")[2];
	if (host == domain || host.substr(host.length - domain.length - 1) == "." + domain)
	{
		chrome.pageAction.show(tabId);
	}
	else
	{
		chrome.pageAction.hide(tabId);
	}
}

// Handles data sent via chrome.extension.sendMessage()
function onMessage(message, sender, callback)
{
	if (message.getVideosData != undefined)
	{
		chrome.pageAction.setIcon({tabId:sender.tab.id, path:"icon16gray.png"});
		fetchVideosData(message.getVideosData, callback);
	}
	else if (message.wasSuccessful != undefined)
	{
		chrome.pageAction.setIcon({tabId:sender.tab.id, path:"icon16.png"});
	}
	else if (message.storage_set_thickness != undefined)
	{
		localStorage[YTRP_BAR_THICKNESS_KEY] = message.storage_set_thickness;
	}
	else if (message.storage_set_highlighted != undefined)
	{
		localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] = message.storage_set_highlighted;
	}
	else if (message.storage_set_caching != undefined)
	{
		localStorage[YTRP_CACHING_KEY] = message.storage_set_caching;
		configureCache();
	}
	else if (message.storage_get_thickness != undefined)
	{
		if (localStorage[YTRP_BAR_THICKNESS_KEY] == undefined)
		{
			localStorage[YTRP_BAR_THICKNESS_KEY] = YTRP_DEFAULT_BAR_THICKNESS;
		}
		callback(localStorage[YTRP_BAR_THICKNESS_KEY]);
	}
	else if (message.storage_get_highlighted != undefined)
	{
		if (localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] == undefined)
		{
			localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] = YTRP_DEFAULT_HIGHLIGHTED_VIDEOS;
		}
		callback(localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY]);
	}
	else if (message.storage_get_caching != undefined)
	{
		if (localStorage[YTRP_CACHING_KEY] == undefined)
		{
			localStorage[YTRP_CACHING_KEY] = YTRP_DEFAULT_CACHING;
			configureCache();
		}
		callback(localStorage[YTRP_CACHING_KEY]);
	}
}

// Sets YTRP_CACHE_ENABLE and YTRP_CACHE_EXPIRATION value according to localStorage[YTRP_CACHING_KEY]
function configureCache()
{
	YTRP_CACHE_ENABLE = localStorage[YTRP_CACHING_KEY] > 0;
	YTRP_CACHE_EXPIRATION = 0;
	if (localStorage[YTRP_CACHING_KEY] == 1)
	{
		YTRP_CACHE_EXPIRATION = 5 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 2)
	{
		YTRP_CACHE_EXPIRATION = 30 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 3)
	{
		YTRP_CACHE_EXPIRATION = 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 4)
	{
		YTRP_CACHE_EXPIRATION = 2 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 5)
	{
		YTRP_CACHE_EXPIRATION = 6 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 6)
	{
		YTRP_CACHE_EXPIRATION = 12 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 7)
	{
		YTRP_CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
	}
}

// Fetches the data of the videos in the videoIds array
function fetchVideosData(videoIds, callback)
{
	// Return hashtable holding for every video id, an array of: views [0], likes [1], and dislikes [2]
	var videoHashtable = new Object();

	// If the cache is enabled
	if (YTRP_CACHE_ENABLE)
	{
		// Clear the expired cache
		var time = (new Date()).getTime();
		for (var id in cacheVideoHashtable)
		{
			if (time - cacheVideoHashtable[id][3] > YTRP_CACHE_EXPIRATION)
			{
				delete cacheVideoHashtable[id];
			}
		}

		// Check if the videos are already cached and in that case move them to the result hashtable directly
		for (var i = videoIds.length; i >= 0; i--)
		{
			if (videoIds[i] in cacheVideoHashtable)
			{
				videoHashtable[videoIds[i]] = [cacheVideoHashtable[videoIds[i]][0], cacheVideoHashtable[videoIds[i]][1], cacheVideoHashtable[videoIds[i]][2]];
				videoIds.splice(i, 1);
			}
		}
	}

	// Check how many requests we have to do depending of YouTube API maximum
	var requestCount = Math.ceil(videoIds.length / YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST);
	var responseCount = 0;
	var req;
	
	// If there are no videos to be requested (can happen if all of them are cached), count and callback
	if (videoIds.length == 0)
	{
		localStorage[YTRP_COUNT_KEY] = parseInt(localStorage[YTRP_COUNT_KEY]) + Object.keys(videoHashtable).length;
		callback(videoHashtable);
	}
	
	// While there are remaining videos to request
	while (videoIds.length > 0)
	{
		// Divide requests in blocks of YouTube API maximum
		var videoIdsBlock = videoIds.splice(0, YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST);

		// Compose POST request contents
		var data = composeFetchVideoData(videoIdsBlock);

		// Prepare POST request headers
		var url = "https://gdata.youtube.com/feeds/api/videos/batch";
		req = new XMLHttpRequest();
		req.open("POST", url, false); // Synchronous mode, safer and just need one req object
		req.setRequestHeader("Host", "gdata.youtube.com");
		req.setRequestHeader("Content-Type", "application/atom+xml; charset=UTF-8");
		req.setRequestHeader("Content-Length", data.length);
		req.setRequestHeader("GData-Version", "2");
		req.setRequestHeader("X-GData-Key", YOUTUBE_API_DEVELOPER_KEY);
		
		// Register POST request callback
		req.onreadystatechange = function()
		{
			if (req.readyState == 4 && req.status == 200)
			{
				// Response succesfully received, count and add videos info to the hashtable
				responseCount++;
				composeResultVideoHashtable(req.responseText, videoHashtable);
				
				// If it is the last expected response, count and callback
				if (responseCount == requestCount)
				{
					localStorage[YTRP_COUNT_KEY] = parseInt(localStorage[YTRP_COUNT_KEY]) + Object.keys(videoHashtable).length;
					callback(videoHashtable);
				}
			}
		};

		// Send POST request
		req.send(data);	
	}
}

// Composes the request content, according to YouTube API
function composeFetchVideoData(videoIds)
{
	var data =
"<feed xmlns=\'http://www.w3.org/2005/Atom\'\n\
xmlns:media=\'http://search.yahoo.com/mrss/\'\n\
xmlns:batch=\'http://schemas.google.com/gdata/batch\'\n\
xmlns:yt=\'http://gdata.youtube.com/schemas/2007\'>\n\
<batch:operation type=\"query\"/>\n";

	for (var i = 0; i < videoIds.length; i++)
	{
		data +=
"<entry>\n\
<id>https://gdata.youtube.com/feeds/api/videos/" + videoIds[i] + "</id>\n\
</entry>\n";
	}
	
	data += "</feed>";
	
	return data;
}

// Adds the videos info in data_response to the given video hashtable
function composeResultVideoHashtable(data_response, hashtable)
{
	// Current time used for caching
	var time = (new Date()).getTime();
	
	// Parse XML
	var dp = new DOMParser();
	var doc = dp.parseFromString(data_response, "text/xml");
	
	// Get all entry tags (1 per video)
	var entries = doc.getElementsByTagName("entry");
	
	// For each entry tag, get the views, likes and dislikes
	var group;
	var videoid;
	var id;
	var statistics;
	var views;
	var rating;
	var ratingEnabled;
	var likes;
	var dislikes;
	for (var i = 0; i < entries.length; i++)
	{
		try
		{
			group = getElementByNodeName(entries[i], "media:group");
			videoid = getElementByNodeName(group, "yt:videoid");
			id = videoid.firstChild.nodeValue;
			statistics = getElementByNodeName(entries[i], "yt:statistics");
			views = parseInt(statistics.getAttribute("viewCount"));
			rating = getElementByNodeName(entries[i], "yt:rating");
			ratingEnabled = getElementByNodeNameAndAttribute(entries[i], "yt:accessControl", "action", "rate");
			if (rating != undefined && (ratingEnabled == undefined || ratingEnabled.getAttribute("permission") != "denied"))
			{
				likes = parseInt(rating.getAttribute("numLikes"));
				dislikes = parseInt(rating.getAttribute("numDislikes"));
			}
			else
			{
				likes = 0;
				dislikes = 0;
			}
			hashtable[id] = [views, likes, dislikes];
			
			// If the cache is enabled
			if (YTRP_CACHE_ENABLE)
			{
				cacheVideoHashtable[id] = [views, likes, dislikes, time]; 
			}
		}
		catch (err)
		{
			// Incorrect entries will not be on the return hashtable, client must check ids
		}
	}

	//DEBUG: Show response and alert if queota is exceeded
	// log(Object.keys(hashtable).length + " items: " + data_response);
	// if (data_response.indexOf("reason='Quota exceeded.'") != -1 && data_response.indexOf("too_many_recent_calls") != -1)
	// {
		// alert("quota exceeded");
	// }
	
	//DEBUG: Show cache
	//alert(Object.keys(cacheVideoHashtable).length + "---" + JSON.stringify(cacheVideoHashtable));
}

// Helper function for nodes names that include a prefix and a colon, such as "<yt:rating>"
function getElementByNodeName(parentNode, nodeName)
{	
	var colonIndex = nodeName.indexOf(":");
	var tag = nodeName.substr(colonIndex + 1);
	var nodes = parentNode.getElementsByTagNameNS("*", tag);
	for (var i = 0; i < nodes.length; i++)
	{
		if (nodes[i].nodeName == nodeName) return nodes[i];
	}
	return undefined;
}

// Helper function for nodes names that include a prefix and a colon, such as "<yt:rating>", and matching a specific attribute, such as "action='rate'"
function getElementByNodeNameAndAttribute(parentNode, nodeName, attributeName, attributeValue)
{	
	var colonIndex = nodeName.indexOf(":");
	var tag = nodeName.substr(colonIndex + 1);
	var nodes = parentNode.getElementsByTagNameNS("*", tag);
	for (var i = 0; i < nodes.length; i++)
	{
		if (nodes[i].nodeName == nodeName && nodes[i].getAttribute(attributeName) == attributeValue) return nodes[i];
	}
	return undefined;
}

// Helper function that keeps the stats
function count()
{

}

//DEBUG: Open window with any text for log purpouses
// function log(content)
// {
	// top.consoleRef = window.open('','myconsole','width=350,height=250,menubar=0,toolbar=1,status=0,scrollbars=1,resizable=1');
	// top.consoleRef.document.writeln('<html><head><title>Console</title></head><body bgcolor=white onLoad="self.focus()">'
	// +htmlEncode(content, false, 0)
	// +'</body></html>');
	// top.consoleRef.document.close()
	
	// /*
	// HTMLEncode - Encode HTML special characters.
	// Copyright (c) 2006-2010 Thomas Peri, http://www.tumuski.com/
	// MIT License
	// */

	// /*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true,
		// plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */

	// /**
	 // * HTML-Encode the supplied input
	 // * 
	 // * Parameters:
	 // *
	 // * (String)  source    The text to be encoded.
	 // * 
	 // * (boolean) display   The output is intended for display.
	 // *
	 // *                     If true:
	 // *                     * Tabs will be expanded to the number of spaces 
	 // *                       indicated by the 'tabs' argument.
	 // *                     * Line breaks will be converted to <br />.
	 // *
	 // *                     If false:
	 // *                     * Tabs and linebreaks get turned into &#____;
	 // *                       entities just like all other control characters.
	 // *
	 // * (integer) tabs      The number of spaces to expand tabs to.  (Ignored 
	 // *                     when the 'display' parameter evaluates to false.)
	 // *
	 // * version 2010-11-08
	 // */
	// function htmlEncode(source, display, tabs)
	// {
		// var i, s, ch, peek, line, result,
			// next, endline, push,
			// spaces;
		
		// // Stash the next character and advance the pointer
		// next = function () {
			// peek = source.charAt(i);
			// i += 1;
		// };
		
		// // Start a new "line" of output, to be joined later by <br />
		// endline = function () {
			// line = line.join('');
			// if (display) {
				// // If a line starts or ends with a space, it evaporates in html
				// // unless it's an nbsp.
				// line = line.replace(/(^ )|( $)/g, '&nbsp;');
			// }
			// result.push(line);
			// line = [];
		// };
		
		// // Push a character or its entity onto the current line
		// push = function () {
			// if (ch < ' ' || ch > '~') {
				// line.push('&#' + ch.charCodeAt(0) + ';');
			// } else {
				// line.push(ch);
			// }
		// };
		
		// // Use only integer part of tabs, and default to 4
		// tabs = (tabs >= 0) ? Math.floor(tabs) : 4;
		
		// result = [];
		// line = [];

		// i = 0;
		// next();
		// while (i <= source.length) { // less than or equal, because i is always one ahead
			// ch = peek;
			// next();
			
			// // HTML special chars.
			// switch (ch) {
			// case '<':
				// line.push('&lt;');
				// break;
			// case '>':
				// line.push('&gt;');
				// break;
			// case '&':
				// line.push('&amp;');
				// break;
			// case '"':
				// line.push('&quot;');
				// break;
			// case "'":
				// line.push('&#39;');
				// break;
			// default:
				// // If the output is intended for display,
				// // then end lines on newlines, and replace tabs with spaces.
				// if (display) {
					// switch (ch) {
					// case '\r':
						// // If this \r is the beginning of a \r\n, skip over the \n part.
						// if (peek === '\n') {
							// next();
						// }
						// endline();
						// break;
					// case '\n':
						// endline();
						// break;
					// case '\t':
						// // expand tabs
						// spaces = tabs - (line.length % tabs);
						// for (s = 0; s < spaces; s += 1) {
							// line.push(' ');
						// }
						// break;
					// default:
						// // All other characters can be dealt with generically.
						// push();
					// }
				// } else {
					// // If the output is not for display,
					// // then none of the characters need special treatment.
					// push();
				// }
			// }
		// }
		// endline();
		
		// // If you can't beat 'em, join 'em.
		// result = result.join('<br />');

		// if (display) {
			// // Break up contiguous blocks of spaces with non-breaking spaces
			// result = result.replace(/ {2}/g, ' &nbsp;');
		// }
		
		// // tada!
		// return result;
	// }
// }
