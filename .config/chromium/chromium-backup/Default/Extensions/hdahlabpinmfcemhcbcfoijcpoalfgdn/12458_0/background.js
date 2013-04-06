var g_lastfunc;

function setSessionHandler(func) {
	g_lastfunc = func;
}

function onLoginSuccess(auth) {
	if (g_lastfunc != undefined) {
		g_lastfunc({token: auth});
	}
}

function onLoginError(err) {
	if (g_lastfunc != undefined) {
		g_lastfunc({error: err});
	}
}
