// Load code ideas borrowed from the following userscripts:
// Pimp.my.Gmail
//   http://userscripts.org/scripts/review/75047
// Gmail 'Mark all as read' button
//   http://userscripts.org/scripts/review/75047
//

console.log("gmailtexloader: starting", "color:blue;");

var attempt = 0;
var waitGmailLoad = setInterval(function() {
    if (attempt++ > 100) {
        clearInterval(waitGmailLoad);
	console.log("gmailtexloader: giving up", "color:blue;");
        return;
    }

    var canvas = document.getElementById("canvas_frame");
    var topdivs = document.getElementsByClassName("vI8oZc");
    var topdivs2 = document.getElementsByClassName("ata-asE");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL("gmailtex-gc.js");

    if(canvas && canvas.contentDocument) { 
	var gmail = canvas.contentDocument;

	//var sidebar = gmail.getElementsByClassName('nH pp');
	//var sidebar = gmail.getElementsByClassName('nH nn');
	//var sidebar = gmail.getElementsByClassName('T0 pp'); // 9/22/12
	var sidebar = gmail.getElementsByClassName('aim'); // 9/24/12
	
	if (sidebar.length > 0) {
	    clearInterval(waitGmailLoad);
	    gmail.getElementsByTagName("head")[0].appendChild(s);
	    console.log("gmailtexloader: loaded on attempt " + attempt
	    + " in canvas frame", "color:blue;");
	}
    }

    else if( topdivs.length > 0){
	var topdiv = topdivs[0];
	clearInterval(waitGmailLoad);
	topdiv.appendChild(s);
	console.log( "gmailtexloader: loaded on attempt " + attempt +
	" in topdiv " + topdiv.className, "color:blue;");
    }

    else if( topdivs2.length > 0){
	var topdiv2 = topdivs2[0];
	clearInterval(waitGmailLoad);
	topdiv2.appendChild(s);
	console.log( "gmailtexloader: loaded on attempt " + attempt +
	" in topdiv " + topdiv2.className, "color:blue;");
    }

    }, 400);

