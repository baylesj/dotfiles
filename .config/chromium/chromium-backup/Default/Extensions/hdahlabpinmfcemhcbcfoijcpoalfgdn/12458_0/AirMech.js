var airmechIcon = "<img src='AirMech-chrome128.png' alt='AirMech Icon' /><br />";
var socialDiv = "<div id='social'><a href='http://carbongames.com'><img src='carbon_small.png' title='Carbon Games' /></a><br /><a href='https://twitter.com/CarbonGames' target='_blank' title='Twitter'><img src='icon_twitter.png' class='social' /></a><a href='https://www.facebook.com/pages/Carbon-Games/140437096029000' target='_blank' title='Facebook'><img src='icon_facebook.png' class='social' /></a><a href='https://plus.google.com/u/1/104246068515082200053/posts' target='_blank' title='Google+'><img src='icon_google.png' class='social' /></a></div>";

AirMechModule = null;
var messageHandler = {};
var inGame = false;
var goog;
			
function setupEvents()
{
	document.body.addEventListener("contextmenu", noHandler, true);
	window.addEventListener("contextmenu", noHandler, true);
	window.addEventListener("mousedown", mouseHandler, true);
	window.addEventListener("mouseup", mouseHandler, true);
	window.addEventListener("mousemove", mouseHandler, true);
	window.addEventListener("mouseenter", mouseHandler, true);
	window.addEventListener("mouseleave", mouseHandler, true);
	window.addEventListener("mouseover", mouseHandler, true);
	window.addEventListener("mouseout", mouseHandler, true);
	var ch = document.getElementById('cursor-hide');
	if(!ch) return;
	ch.addEventListener("click", noHandler, true);
	ch.addEventListener("select", noHandler, true);
	ch.addEventListener("contextmenu", noHandler, true);

	document.body.addEventListener("keydown", keyHandler, true);
	document.body.addEventListener("keyup", keyHandler, true);
}

function mouseHandler(evt)
{
	if(!evt) return false;
	var ch = document.getElementById('cursor-hide');
	if(ch && !paused) ch.style.cursor = 'none';
	evt.preventDefault();
	evt.stopPropagation();
	if(evt.stopImmediatePropagation)
		evt.stopImmediatePropagation();

	var rect = get_game_rect();
	var x = evt.clientX - rect.x;
	var y = evt.clientY - rect.y;
	
	var msg = evt.type.toUpperCase() + ":";
	msg += x + ":";
	msg += y + ":";
	msg += evt.which;
	
	send_nacl_msg(msg, true);
}

var macCommandKeyDownLeft = false;
var macCommandKeyDownRight = false;

function keyHandler(evt)
{
	if(!evt) return false;

	if (evt.keyCode == 91) macCommandKeyDownLeft = (evt.type === "keydown");
	if (evt.keyCode == 93) macCommandKeyDownRight = (evt.type === "keydown");

	if (evt.ctrlKey || evt.altKey) return; // not false since we want propagation
	if (evt.keyCode >= 112 && evt.keyCode <= 123) return; // propagate function keys
	if (macCommandKeyDownLeft || macCommandKeyDownRight) return; // propagate chrome macos command keys

	evt.preventDefault();
	evt.stopPropagation();
	if(evt.stopImmediatePropagation)
		evt.stopImmediatePropagation();
	
	var msg = evt.type.toUpperCase() + ":";
	msg += evt.keyCode;
	
	send_nacl_msg(msg, true);
}

function moduleDidStartLoad() {
	var o = $('#outer');
	setBGColor('#383838', true);
	$('body').css('overflow', 'hidden');
	$('body').css('webkit-user-select', 'none');
	
	$('#overlay').css({
		opacity : 1,
		width : o.outerWidth(),
		height : o.outerHeight()
	})
	
	$('#loading').css({
		top : (o.outerHeight() / 3),
	});
}

function moduleDidLoad() {
	AirMechModule = document.getElementById('AirMech');
	AirMechModule.addEventListener('message', handleMessage, false);
	resized();
}

function moduleLoadProgress(event) {
	var loadPercent = 0.0;
	var loadPercentString;
	if(event.lengthComputable && event.total > 0){
		loadPercent = Math.round(event.loaded / event.total * 100.0);
		loadPercentString = loadPercent + '%';
	} 
	else{
		// The total length is not yet known.
		loadPercent = -1.0;
		loadPercentString = '0%';
	}
	$('.progress-bar').children('span').css('width', loadPercentString);
	$('#overlay').css('display', 'block');
}

function moduleDidEndLoad() {
	var lastError = event.target.lastError;
	if (lastError == undefined || lastError.length == 0) {
		_gaq.push(['_trackEvent', 'AirMech', 'LoadEndSuccess']);
		$('.progress-bar').children('span').css('width', '100%');
		$('#AirMech').css({ 
			'background-image' : 'none', 
			'background-color' : '#000000' 
		});
		$('#body').css('-webkit-user-select', 'none');
		setBGColor('#000000', false);
		$('#overlay').css('display', 'none');
	}
	else {
		_gaq.push(['_trackEvent', 'AirMech', 'LoadEndFailure']);
		
		var canvas = document.createElement('canvas');
		var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if(gl) {
			var infoDiv = "<div id='info'><h1><center>Your Computer Specs:</center></h1><h2>Platform: " + navigator.platform + "<br />Agent: " + navigator.userAgent + "<br />Error: " + lastError + "<br />WebGL Version: " + gl.getParameter(gl.VERSION) + "<br />GPU Max Texture: " + gl.getParameter(gl.MAX_TEXTURE_SIZE) + "</h2>";
		}
		else {
			var infoDiv = "<div id='info'><h1><center>Your Computer Specs:</center></h1><h2>Platform: " + navigator.platform + "<br />Agent: " + navigator.userAgent + "<br />Error: " + lastError + "<br />WebGL Version: Unknown<br />GPU Max Texture: Unknown</h2>";
		}
		$('body').css('webkit-user-select', 'auto');
		$('#overlay').css('display', 'none');
		$('#listener').html(airmechIcon + "<h1>Oh-no! It looks like the Native Client module failed to load for Airmech " + AirMechVersion + ".</h1><h2>If relaunching Chrome or refreshing the page doesn't solve this issue please e-mail your computer specifications to <a href='support@carbongames.com'>support@carbongames.com</a> and we will get back to you as soon as we can.</h2><h2>Thank you and sorry for the inconvenience.</h2>" + socialDiv + infoDiv);
	}
}

$(window).resize(function() {
	resized();
});

function resized() {
	var rect = getAirmechRect();
	naclAirmechResize(rect.width, rect.height, rect.x, rect.y);
}

function naclAirmechResize(width, height, x, y) {
	$('#AirMech').attr('width', width).attr('height', height);
	// Hide cursor div resize.
	//$('.play-area').css({top: y + "px", left: x + "px", width: width + "px", height: height + "px"});
}

function getAirmechRect() {
	return getAirmechRectCentered(1280, 720);
}

function getAirmechRectCentered(imgWidth,imgHeight) {
	var winwidth  = window.innerWidth;
	var winheight = window.innerHeight;
	var gameWidth = parseInt(Math.min(winwidth, winheight * imgWidth / imgHeight ));
	var gameHeight = parseInt(gameWidth * imgHeight / imgWidth);
	return {width: gameWidth,
			height: gameHeight,
			x: parseInt((winwidth - gameWidth)/2),
			y: parseInt((winheight - gameHeight)/2)}
}

messageHandler.l = function(data) {
	console.log(data);
}

messageHandler.u = function(url) {
	window.open(url, '_blank');
}

messageHandler.x = function(data) {
	window.close();
}

function purchase(sandbox, jwt) {
	config = 'production_config';
	if (sandbox == true) {
		config = 'sandbox_config';
	}

	if (goog == undefined) {
		
		google.load('payments', '1.0',
				{
					'packages': [config],
					'callback': function()
					{
						goog.payments.inapp.buy(
							{
								'jwt': jwt,
								'success': function() { AirMechModule.postMessage('p'); }
							}
						);
					}
				}
		);
	} else {
		goog.payments.inapp.buy(
			{
				'jwt': jwt,
				'success': function() { AirMechModule.postMessage('p'); }
			}
		);
	}
}

messageHandler.p = function(jwt) {
	purchase(false, jwt);
}
messageHandler.P = function(jwt) {
	purchase(true, jwt);
}

messageHandler.a = function() {
	login();
}

messageHandler.w = function(inGameFlag) {
	inGame = (inGameFlag == 'true');
}

function handleMessage(ev) {
	var msg = ev.data;
	if (msg != null) {
		messageHandler[msg.charAt(0)](msg.substr(1));
	}
}

var AirMechVersion = -1;
$.getJSON('manifest.json', function(data){
	window.AirMechVersion = data.version;
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-27715939-1']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackEvent', 'AirMech', 'Hits', AirMechVersion]);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var g_loginwindow;

function login() {
	_gaq.push(['_trackEvent', 'AirMech', 'Login']);
	var mysize = [window.outerWidth, window.outerHeight]
	var mypos = [window.screenX, window.screenY]

	var size = [450, 500];
	var coords = [mypos[0] + Math.floor((mysize[0] - size[0]) / 2), mypos[1] + Math.floor((mysize[1] - (size[1] * 1.25)) / 2)];
	window.open("oauth.html", "airmech_openid", "width=" + size[0] + ", height=" + size[1] + ", left=" + coords[0] + ", top=" + coords[1]);
}

/****** Requirement Check ********/

function loginComplete(result) {
	if (result.token != undefined) {
		_gaq.push(['_trackEvent', 'AirMech', 'LoginSuccess']);
		AirMechModule.postMessage("as"+result.token);
	} else {
		_gaq.push(['_trackEvent', 'AirMech', 'LoginError']);
		AirMechModule.postMessage("ae"+result.error);
	}
}
// Change body background color.
function setBGColor(color, bool){
	$('body').css('background-color', color);
	if(bool) {
		$('body').css('background-image', 'url(noise_bg.png)');
		$('body').css('overflow', 'visible');
	}
	else{
		$('body').css('background-image', 'none');
		$('body').css('overflow', 'hidden');
	}
}

function loadAirMech(force){
	if (force) {
		_gaq.push(['_trackEvent', 'AirMech', 'ForceLoadStart']);
		$('#listener').html("<div id='cursor-hide' class='play-area'></div>");
	} else {
		_gaq.push(['_trackEvent', 'AirMech', 'LoadStart']);
	}
	// NaCl embed for AirMech.
	var listener = document.getElementById('listener');
	listener.addEventListener('loadstart', moduleDidStartLoad, true);
	listener.addEventListener('progress', moduleLoadProgress, true);
	listener.addEventListener('loadend', moduleDidEndLoad, true);
	listener.addEventListener('load', moduleDidLoad, true);
	var airmechNaCl = $(document.createElement('embed'));
	$(airmechNaCl).attr({
		'name': 'nacl_module',
		'id': 'AirMech',
		'width': '1280',
		'height': '720',
		'src': 'AirMech.nmf',
		'type': 'application/x-nacl',
	});
	$('#listener').append(airmechNaCl);
}

var infoDiv;

function setInfoDiv(errorDesc){
	var canvas = document.createElement('canvas');
	var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	if(gl) {
		infoDiv = "<div id='info'><h1><center>Your Computer Specs:</center></h1><h2>Platform: " + navigator.platform + "<br />Agent: " + navigator.userAgent + "<br />Error: " + errorDesc + "<br />WebGL Version: " + gl.getParameter(gl.VERSION) + "<br />GPU Max Texture: " + gl.getParameter(gl.MAX_TEXTURE_SIZE) + "</h2>";
	}
	else {
		infoDiv = "<div id='info'><h1><center>Your Computer Specs:</center></h1><h2>Platform: " + navigator.platform + "<br />Agent: " + navigator.userAgent + "<br />Error: " + errorDesc + "<br />WebGL Version: Unknown<br />GPU Max Texture: Unknown</h2>";
	}
}

function reqCheck(){
	var airmechIcon = "<img src='AirMech-chrome128.png' alt='AirMech Icon' /><br />";
	var socialDiv = "<div id='social'><a href='http://carbongames.com'><img src='carbon_small.png' title='Carbon Games' /></a><br /><a href='https://twitter.com/PlayAirMech' target='_blank' title='Twitter'><img src='icon_twitter.png' class='social' /></a><a href='https://www.facebook.com/AirMechGame' target='_blank' title='Facebook'><img src='icon_facebook.png' class='social' /></a><a href='https://plus.google.com/u/1/104246068515082200053/posts' target='_blank' title='Google+'><img src='icon_google.png' class='social' /></a></div>";
	var continueDiv = "<div class='button'><a href='#' onclick='loadAirMech(true); return false;'>Load AirMech Anyway?</a><div class='top'>Continue...</div></div>"
	
	var canvas = document.createElement('canvas');
	var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	var maxTexSize = 4096;
	
	var validBrowser = false;
	var browserSupportStatus = 0;
	var agent = navigator.userAgent;
	var checker = new browser_version.BrowserChecker(
		// Minimum Chrome version
		18,
		navigator["appVersion"],
		navigator["plugins"]);
	checker.checkBrowser();

	validBrowser = checker.getIsValidBrowser();
	browserSupportStatus = checker.getBrowserSupportStatus();

	if(gl) {
		_gaq.push(['_trackEvent', 'AirMech', 'WebGLEnabled']);
	}
	else {
		_gaq.push(['_trackEvent', 'AirMech', 'WebGLDisabled']);
	}
	
	if(window.chrome){
		if(agent.indexOf("Chromium") > -1){
			_gaq.push(['_trackEvent', 'AirMech', 'CHROMIUM']);
			setBGColor('#383838', true);
			$('#listener').html(airmechIcon + "<h1>Thank you for trying AirMech but Native Client currently doesn't work in Chromium.</h1><h2>You may load the game anyway but you might experiece black screens or objects not being loaded properly during gameplay.</h2>" + continueDiv + socialDiv + infoDiv);
		}
		else {
			switch(browserSupportStatus){
				case browser_version.BrowserChecker.StatusValues.NACL_ENABLED:

					var webGlMaxTexSize = 0;
					if (gl) {
						webGlMaxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
					}

					_gaq.push(['_trackEvent', 'AirMech', 'WebGLMaxTextureSize' + webGlMaxTexSize]);
					if(webGlMaxTexSize >= maxTexSize) {
						//Check for latest version
						$.getJSON("https://rs.carbongames.com/version", function(data) {
							newVersion = data.AirMechNaCl;
							if(AirMechVersion < newVersion && AirMechVersion != -1){
								setBGColor('#383838', true);
								$('#listener').html(airmechIcon + "<h1>Whoops!  It looks like your AirMech version (" + AirMechVersion + ") is out of date.</h1><h1>Newest version is " + newVersion + ".</h1><h2>Please reinstall AirMech by following these instructions (read all steps before starting.)</h2><h2>For other methods please go to <a href='https://carbongames.com/chromeupdate.html' target='_blank'>https://carbongames.com/chromeupdate.html</a></h2><h2>1. Make a new tab in Chrome.</h2><h2>2. Look for AirMech and right click the icon and click 'Remove from Chrome'.</h2><img src='Uninstall-1.png' alt='Uninstall 1' /><h2>3. Go to <a href='http://airmech.com'>http://airmech.com</a> and follow the instructions to install AirMech.</h2><h2>4. Enjoy! :)</h2><h2>Thank you for playing AirMech!</h2>" + socialDiv);
							}
							else{
								loadAirMech(false);
							}
						});
					}
					else {
						setBGColor('#383838', true);
						setInfoDiv("Graphics driver/blacklist");
						$('#listener').html(airmechIcon + "<h1>Thank you for trying AirMech. <br />However, it looks like we have detected a problem with your graphics driver.</h1><h2><br />You may need to update your graphics driver to the newest version as it might be out of date. <br />You can follow the directions posted by Google here: <a href='http://support.google.com/chrome/bin/answer.py?hl=en&answer=1202946' target='_blank'>http://support.google.com/chrome/bin/answer.py?hl=en&answer=1202946</a><br />Relaunching Chrome or reloading the page may help as well.</br></h2><h2>If updating your graphics driver doesn't resolve the issue then Google Chrome might have blacklisted your driver due to a security risk or stability issue. <br />You may load the game anyway but you might experience black screens or objects not being loaded properly during gameplay.<br />You should also lower your resolution and quality settings if you encounter any problems by clicking 'Settings >  Video' in the main menu.</h2><h2><br />We're very sorry for the inconvenience and if you have any other questions please don't hesitate to e-mail us at <a href='mailto:support@carbongames.com'>support@carbongames.com</a>.</h2>" + continueDiv + socialDiv + infoDiv);
					}
					break;
				case browser_version.BrowserChecker.StatusValues.UNKNOWN_BROWSER:
					_gaq.push(['_trackEvent', 'AirMech', 'UNKNOWN_BROWSER']);
					setBGColor('#383838', true);
					setInfoDiv("Unknown browser");
					$('#listener').html(airmechIcon + "<h1>Oh-no!  It looks like we detected an Unknown browser.  Get Chrome!</h1>" + socialDiv + infoDiv);
					break;
				case browser_version.BrowserChecker.StatusValues.CHROME_VERSION_TOO_OLD:
					_gaq.push(['_trackEvent', 'AirMech', 'CHROME_VERSION_TOO_OLD']);
					setBGColor('#383838', true);
					setInfoDiv("Chrome out of date");
					$('#listener').html(airmechIcon + "<h1>Oh-no! Your Chrome version is too old to play AirMech.  Please get the newest version from Google.</h1>" + socialDiv + infoDiv);
					break;
				case browser_version.BrowserChecker.StatusValues.NACL_NOT_ENABLED:
					_gaq.push(['_trackEvent', 'AirMech', 'NACL_NOT_ENABLED']);
					setBGColor('#383838', true);
					setInfoDiv("Native Client not enabled");
					$('#listener').html(airmechIcon + "<h1>Thank you for trying AirMech but it looks like Native Client is not enabled.  Please enable to play AirMech.</h1>" + socialDiv + infoDiv);
					break;
				case browser_version.BrowserChecker.StatusValues.NOT_USING_SERVER:
					_gaq.push(['_trackEvent', 'AirMech', 'NOT_USING_SERVER']);
					setBGColor('#383838', true);
					setInfoDiv("file:// URL");
					$('#listener').html(airmechIcon + "<h1>file:// URL detected.  Please go install AirMech from the Chrome Web Store.</h1>" + socialDiv + infoDiv);
					break;
				default:
					setBGColor('#383838', true);
					setInfoDiv("Could not detect browser");
					$('#listener').html(airmechIcon + "<h1>It looks like we couldn't detect your browser.</h1><h2>AirMech currently works with Native Client in Google Chrome.  Sorry for the inconvenience.</h2>" + socialDiv + infoDiv);
					break;
			}
		}
	}
	else {
		window.location.href = "http://chrome.carbongames.com";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	reqCheck();
	chrome.extension.getBackgroundPage().setSessionHandler(loginComplete);
	});
(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.src = 'https://www.google.com/jsapi';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();