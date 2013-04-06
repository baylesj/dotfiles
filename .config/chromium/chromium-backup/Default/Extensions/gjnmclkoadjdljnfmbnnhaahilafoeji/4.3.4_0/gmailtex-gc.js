/************************************************************
 *  GmailTeX   gmailtex.js / emailtex.js 
 *  http://alexeev.org/gmailtex.html
 *
 *  Gmail + LaTeX = GmailTeX
 *
 *  Written by (C) Valery Alexeev <va.email.tex@gmail.com>
 *  Version 4.3 September 22, 2012
 *  License: http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 **************************************************************
 */
var path_to_mathjax = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
if( !document.getElementById('GmailTeX') ){
var va_version = '4.3';
var va_pdr = /[\r]{0,1}\n[ \t]*[\r]{0,1}\n/;
function va_sc(){ 
    var tc, 
	fib = document.getElementsByClassName("aXjCH")[0], 
	fe = document.getElementsByClassName("ii gt")[0]; 
    if( fib ) tc = window.getComputedStyle( fib, null ).color;
    else{
	if( fe ) tc = window.getComputedStyle( fe, null ).color;
	else tc = "black";
    }
    var cst = 
	".MathJax .ms, .MathJax .mi,.MathJax .mn,.MathJax .mo { color:" + tc + " }";
    var cs = document.getElementById("cs"); 
    if( cs ) cs.innerHTML = cst;
    else{
	cs = document.createElement("style");
	cs.id = "cs";
	cs.innerHTML = cst;
	document.getElementsByTagName("head")[0].appendChild( cs );	
    }
}
function va_pe(){ 
    var es = document.getElementsByClassName('ii gt'); 
    for( var i = 0; i < es.length; i++ ){
	es[i] = va_fe( es[i] );
	es[i].className = 'va_ar ' + es[i].className;
    }
}
function va_lmj(){ 
    var co = 'va_pe(); MathJax.Hub.Startup.onload();' ; 
    var cq  = 
	'var va_qu = MathJax.CallBack.Queue(MathJax.Hub.Register.StartupHook("End",{}));' + 
	'va_sc();' ;
    var ch   = 
	' MathJax.Hub.Register.StartupHook("End Config",function(){'+
	'MathJax.Hub.Config({'+
	' showProcessingMessages: true,'+
	'delayStartupUntil: "onload",'+
	'tex2jax: {'+
	'  inlineMath: [ [\'$\',\'$\'], ["\\\\(","\\\\)"] ],' +
	'  processEscapes: true,'+
	'},'+
	'TeX: {'+
'Macros: {'+
'A:  "{\\\\mathbb A}",'+
'B:  "{\\\\mathbb B}",'+
'C:  "{\\\\mathbb C}",'+
'D:  "{\\\\mathbb D}",'+
'E:  "{\\\\mathbb E}",'+
'F:  "{\\\\mathbb F}",'+
'G:  "{\\\\mathbb G}",'+
'H:  "{\\\\mathbb H}",'+
'I:  "{\\\\mathbb I}",'+
'J:  "{\\\\mathbb J}",'+
'K:  "{\\\\mathbb K}",'+
'L:  "{\\\\mathbb L}",'+
'M:  "{\\\\mathbb M}",'+
'N:  "{\\\\mathbb N}",'+
'O:  "{\\\\mathcal O}",'+
'P:  "{\\\\mathbb P}",'+
'Q:  "{\\\\mathbb Q}",'+
'R:  "{\\\\mathbb R}",'+
'S:  "{\\\\mathbb S}",'+
'T:  "{\\\\mathbb T}",'+
'U:  "{\\\\mathbb U}",'+
'V:  "{\\\\mathbb V}",'+
'W:  "{\\\\mathbb W}",'+
'X:  "{\\\\mathbb X}",'+
'Y:  "{\\\\mathbb Y}",'+
'Z:  "{\\\\mathbb Z}",'+
'AA:  "{\\\\mathbb A}",'+
'BB:  "{\\\\mathbb B}",'+
'CC:  "{\\\\mathbb C}",'+
'DD:  "{\\\\mathbb D}",'+
'EE:  "{\\\\mathbb E}",'+
'FF:  "{\\\\mathbb F}",'+
'GG:  "{\\\\mathbb G}",'+
'HH:  "{\\\\mathbb H}",'+
'II:  "{\\\\mathbb I}",'+
'JJ:  "{\\\\mathbb J}",'+
'KK:  "{\\\\mathbb K}",'+
'LL:  "{\\\\mathbb L}",'+
'MM:  "{\\\\mathbb M}",'+
'NN:  "{\\\\mathbb N}",'+
'OO:  "{\\\\mathcal O}",'+
'PP:  "{\\\\mathbb P}",'+
'QQ:  "{\\\\mathbb Q}",'+
'RR:  "{\\\\mathbb R}",'+
'SS:  "{\\\\mathbb S}",'+
'TT:  "{\\\\mathbb T}",'+
'UU:  "{\\\\mathbb U}",'+
'VV:  "{\\\\mathbb V}",'+
'WW:  "{\\\\mathbb W}",'+
'XX:  "{\\\\mathbb X}",'+
'YY:  "{\\\\mathbb Y}",'+
'ZZ:  "{\\\\mathbb Z}",'+
'bA: "{\\\\mathbb A}",'+
'bB: "{\\\\mathbb B}",'+
'bC: "{\\\\mathbb C}",'+
'bD: "{\\\\mathbb D}",'+
'bE: "{\\\\mathbb E}",'+
'bF: "{\\\\mathbb F}",'+
'bG: "{\\\\mathbb G}",'+
'bH: "{\\\\mathbb H}",'+
'bI: "{\\\\mathbb I}",'+
'bJ: "{\\\\mathbb J}",'+
'bK: "{\\\\mathbb K}",'+
'bL: "{\\\\mathbb L}",'+
'bM: "{\\\\mathbb M}",'+
'bN: "{\\\\mathbb N}",'+
'bO: "{\\\\mathbb O}",'+
'bP: "{\\\\mathbb P}",'+
'bQ: "{\\\\mathbb Q}",'+
'bR: "{\\\\mathbb R}",'+
'bS: "{\\\\mathbb S}",'+
'bT: "{\\\\mathbb T}",'+
'bU: "{\\\\mathbb U}",'+
'bV: "{\\\\mathbb V}",'+
'bW: "{\\\\mathbb W}",'+
'bX: "{\\\\mathbb X}",'+
'bY: "{\\\\mathbb Y}",'+
'bZ: "{\\\\mathbb Z}",'+
'cA: "{\\\\mathcal A}",'+
'cB: "{\\\\mathcal B}",'+
'cC: "{\\\\mathcal C}",'+
'cD: "{\\\\mathcal D}",'+
'cE: "{\\\\mathcal E}",'+
'cF: "{\\\\mathcal F}",'+
'cG: "{\\\\mathcal G}",'+
'cH: "{\\\\mathcal H}",'+
'cI: "{\\\\mathcal I}",'+
'cJ: "{\\\\mathcal J}",'+
'cK: "{\\\\mathcal K}",'+
'cL: "{\\\\mathcal L}",'+
'cM: "{\\\\mathcal M}",'+
'cN: "{\\\\mathcal N}",'+
'cO: "{\\\\mathcal O}",'+
'OO: "{\\\\mathcal O}",'+
'cP: "{\\\\mathcal P}",'+
'cQ: "{\\\\mathcal Q}",'+
'cR: "{\\\\mathcal R}",'+
'cS: "{\\\\mathcal S}",'+
'cT: "{\\\\mathcal T}",'+
'cU: "{\\\\mathcal U}",'+
'cV: "{\\\\mathcal V}",'+
'cW: "{\\\\mathcal W}",'+
'cX: "{\\\\mathcal X}",'+
'cY: "{\\\\mathcal Y}",'+
'cZ: "{\\\\mathcal Z}",'+
'bfA: "{\\\\mathbf A}",'+
'bfB: "{\\\\mathbf B}",'+
'bfC: "{\\\\mathbf C}",'+
'bfD: "{\\\\mathbf D}",'+
'bfE: "{\\\\mathbf E}",'+
'bfF: "{\\\\mathbf F}",'+
'bfG: "{\\\\mathbf G}",'+
'bfH: "{\\\\mathbf H}",'+
'bfI: "{\\\\mathbf I}",'+
'bfJ: "{\\\\mathbf J}",'+
'bfK: "{\\\\mathbf K}",'+
'bfL: "{\\\\mathbf L}",'+
'bfM: "{\\\\mathbf M}",'+
'bfN: "{\\\\mathbf N}",'+
'bfO: "{\\\\mathbf O}",'+
'bfP: "{\\\\mathbf P}",'+
'bfQ: "{\\\\mathbf Q}",'+
'bfR: "{\\\\mathbf R}",'+
'bfS: "{\\\\mathbf S}",'+
'bfT: "{\\\\mathbf T}",'+
'bfU: "{\\\\mathbf U}",'+
'bfV: "{\\\\mathbf V}",'+
'bfW: "{\\\\mathbf W}",'+
'bfX: "{\\\\mathbf X}",'+
'bfY: "{\\\\mathbf Y}",'+
'bfZ: "{\\\\mathbf Z}",'+
'fA: "{\\\\mathfrak A}",'+
'fB: "{\\\\mathfrak B}",'+
'fC: "{\\\\mathfrak C}",'+
'fD: "{\\\\mathfrak D}",'+
'fE: "{\\\\mathfrak E}",'+
'fF: "{\\\\mathfrak F}",'+
'fG: "{\\\\mathfrak G}",'+
'fH: "{\\\\mathfrak H}",'+
'fI: "{\\\\mathfrak I}",'+
'fJ: "{\\\\mathfrak J}",'+
'fK: "{\\\\mathfrak K}",'+
'fL: "{\\\\mathfrak L}",'+
'fM: "{\\\\mathfrak M}",'+
'fN: "{\\\\mathfrak N}",'+
'fO: "{\\\\mathfrak O}",'+
'fP: "{\\\\mathfrak P}",'+
'fQ: "{\\\\mathfrak Q}",'+
'fR: "{\\\\mathfrak R}",'+
'fS: "{\\\\mathfrak S}",'+
'fT: "{\\\\mathfrak T}",'+
'fU: "{\\\\mathfrak U}",'+
'fV: "{\\\\mathfrak V}",'+
'fW: "{\\\\mathfrak W}",'+
'fX: "{\\\\mathfrak X}",'+
'fY: "{\\\\mathfrak Y}",'+
'fZ: "{\\\\mathfrak Z}",'+
'Pic: "{\\\\operatorname{Pic}}",'+
'Spec: "{\\\\operatorname{Spec}}",'+
'Proj: "{\\\\operatorname{Proj}}",'+
'eps: "{\\\\varepsilon}",'+
'dag: "{\\\\dagger}" '+
'},'+
	'  noErrors: {'+
	'    inlineDelimiters: ["",""],'+
	'    multiLine: true,'+
	'    style: {'+
	'      "font-size":   "90%",'+
	'      "color":       "red",'+
	'      "border":      ""'+ 
	'    }'+
	'  },'+
	'noUndefined: {'+  
	'  attributes: {'+
	'    mathcolor: "blue",'+
	'  }'+
	'}'+
	'},'+	
 	'"HTML-CSS": { imageFont: null }'+
	'});'+
	'});';
    var s = document.createElement("script"); 
    s.type = "text/x-mathjax-config";
    var config = co + ch + cq;
    if (window.opera) {s.innerHTML = config} else {s.text = config}
    document.getElementsByTagName('head')[0].appendChild(s);
    var s2 = document.createElement("script"); 
    s2.type = "text/javascript";
    s2.src = path_to_mathjax;
    document.getElementsByTagName('head')[0].appendChild(s2);
}
va_lmj();
function va_fs(){ 
    var fs = document.createElement("style"); 
    fs.type = "text/css";
    fs.id = "va_fs";
    fstext = 
	'.MathJax { font-size: 125% !important; white-space: normal; }'+
	'.MathJax .mn { padding-top: 0 !important }'+
	'#va_pp { white-space: pre-wrap; word-spacing: 0; word-wrap: break-word; text-align: auto; } '+
	'#va_pp p { margin-top: 0 } '+
	'#va_cp td { font-size: 100%; padding: 3px; }'+
	'#va_cp .pU { font-size: 70%; padding-left: 8px; cursor: default; }'+
	'#va_cp a { cursor: pointer; }';
    fs.innerHTML = fstext;
    document.getElementsByTagName("head")[0].appendChild(fs);
}
va_fs();
var va_it = 
    '<table style="padding:0px 0px 0px 0px"><tbody>'+
    '<tr><td><a title="TeX using simple HTML"'+
    'onClick="va_ga()">simple math (F9)</a>'+
    '<tr><td><a title="TeX using MathJax or insert images hosted at CodeCogs"'+
    'onClick="va_ta()">rich math (F8)</a>'+ 
    '<tr><td><a title="Format for outgoing images" style="cursor:default">images: </a>'+
    '<a title="GIF" name="va_if"'+
    'onClick="va_sif(0)">gif</a>'+
    '&nbsp;&nbsp;<a title="SVG" name="va_if"'+
    'onClick="va_sif(1)">svg</a>'+
    '<tr><td><a title="Show LaTeX commands and supported abbreviations"'+
    'onClick="va_ab()">commands \& abbrevs.</a>'+
    '</tbody></table>';
function va_ta(){
    va_tr();
    va_tc();
    va_iwl();
    va_alr();
}
function va_alr(){
    var ifr = document.getElementsByClassName("Am Al editable")[0];
    if( ifr ){
	if( ifr.parentNode.style.display == "block" ) va_rtp();
	if( ! ifr.className.match(/va_ar/) ){
	ifr.className = ifr.className + ' va_ar';
	    var ind = ifr.contentDocument || ifr.contentWindow.document;
	    var e = ind.getElementsByClassName("LW-avf")[0];
	    e.addEventListener( "keyup", va_trif, false );
	}
    }
}
setInterval( "va_alr()", 3000 );  
function va_ga(){
    va_gre();
    va_gra();
    var ifr = document.getElementsByClassName("Am Al editable")[0];
    if( ifr ){
	var ind = ifr.contentDocument || ifr.contentWindow.document;
	var e = ind.getElementsByClassName("LW-avf")[0];
	e.addEventListener( "keyup", va_trif, false );
    }
}
function va_trif(event){ 
    var k = event.keyCode;
    if( k == 119 ){ 
	va_iwl();
    }
    if( k == 120 ){ 
	va_gra();
    }
}
var va_ap = document.createElement('div');
va_ap.id = 'GmailtexAbbrevPanel';
va_ap.className = 'wa';
va_ap.style.display = 'none';
var va_af = 0; 
document.getElementsByTagName("body")[0].appendChild( va_ap);
va_ap.addEventListener( "click", va_cap, false );
var va_cp = document.createElement('div'); 
va_cp.className = "T0 pp"; 
va_cp.id = "va_cp";
va_cp.innerHTML = 
    '<div class="nH"><div class="nH pY"><div class="nH">'+
    '<div id="va_cpencl" class="nH r pr" onClick="va_tt()">'+
    '<div class="py" idlink="" tabindex="0" role="link">'+
    '<img onmouseover="va_tb(1)" onmouseout="va_tb(0)" '+
    'id="va_bu" role="button" class="pq" src="images/cleardot.gif" alt="Expand">'+
    '<h2 class="pw">GmailTeX</h2>'+
    '<div class="qn"></div></div></div><div id="va_cptble" style="display: none;" class="nH pt"><div class="nH"><div class="p2"><div class="p4">'+
    va_it +
    '</div></div>'+
    '<div id=":rb" class="pU" tabindex="0" role="link">'+
    '<a style="float:left;" title="Created by VA (&copy;2010-12)" ' +
    'onClick="window.open(\'http://alexeev.org/gmailtex.html\')">v.' + va_version + '</a>' + "Powered by<br>" +
    '<a title="MathJax" style=" text-decoration:underline;" onClick="window.open(\'http://www.mathjax.org\')">MathJax</a>' +
        ' and <a style="text-decoration:underline;" title="CodeCogs Online LaTeX Equation Editor" onClick="window.open(\'http://www.codecogs.com/latex/eqneditor.php\')">CodeCogs</a>' +
    '</div>'+
    '</div><div class="nH"><div style="display: none;" class="b8 UC p1"><div class="J-J5-Ji"><div class="UD"></div><div class="vh"></div><div class="UB"></div></div></div></div></div></div></div></div>';
if( document.getElementsByClassName('T0 pp')[0] ){ 
    var va_cm = document.getElementsByClassName('T0 pp')[0]; 
} else {
    var va_cm = document.getElementsByClassName('nH pp ps')[0]; 
}
var va_lms = va_cm.parentNode; 
va_lms.appendChild( va_cp );
function va_tb(num){ 
    if(num == 1){ document.getElementById("va_bu").className = "pq TY";}
    else {document.getElementById("va_bu").className = "pq"; }
}
function va_tt(){ 
    if( va_st ){
	va_st = false;
	document.getElementById("va_cpencl").className = "nH r pr";
	document.getElementById("va_cptble").style.display = "none";
    } else {
	va_st = true;
	document.getElementById("va_cpencl").className = "nH r pv";
	document.getElementById("va_cptble").style.display = "block";
    }
}
var va_st = true; 
va_tt();
var va_at = 1;
var va_en = 1;
var va_ok = true, 
    va_ad = 0, 
    va_qir = false; 
var va_rq = []; 
function va_pq(){ 
    if( va_rq.length == 0 ){
	va_qir = false; 
	return;
    }
    if( va_ok ){
	var num, 
	    s, 
	    sq = va_rq.filter( function( x ){ return (x[0] == -1); } ); 
	if( sq.length ){
	    va_rq = []; 
	    va_ad = 0; 
	    num = -1;
	    s = sq[ sq.length - 1 ][1]; 
	    app = -1;
	}
	else{
	    var el = va_rq.shift();
	    num = el[0];
	    s = el[1];
	    app = el[2];
	    if( app != 0 ) va_ad--; 
	    if( app >=0 ){
		if( va_ad == 0 ){ 
		    var mq = va_rq.filter( function( x ){ return (x[0] == num); } ); 
		    if( mq.length ) s = mq[ mq.length -1 ][1]; 
		    va_rq = va_rq.filter( function( x ){ return (x[0] != num); } ); 
		}
	    }
	}
	va_pc( num, s, app );
    }
    setTimeout( function(){ va_pq() }, 100 );
}
function va_ippr(){ 
    if( !va_qir ){
	va_qir = true;
	va_pq();
    }
}
function va_sa(num){ 
    var is = document.getElementsByName("va_at");
    for( var i=0; i<is.length; i++ ){
	if( i == 1-num ) is[i].style.fontWeight = "bold";
	else is[i].style.fontWeight = "normal";
    }
    va_at = num;
}
va_sa( va_at );
var va_ls;
function va_sif(num){ 
    var is = document.getElementsByName("va_if");
    for( var i=0; i<is.length; i++ ){
	if( i == num ) is[i].style.fontWeight = "bold";
	else is[i].style.fontWeight = "normal";
    }
    va_if = num;
    if(typeof(Storage)!=="undefined") localStorage.va_fif = num;
    if( va_if == 0 ){
	va_ls = "http://latex.codecogs.com/gif.latex?";
    } else va_ls = "http://latex.codecogs.com/svg.latex?"; 
}
var va_if;
var va_fif;
if(typeof(Storage)!=="undefined") 
    va_fif = localStorage.va_fif;
if ( va_fif ) {
    va_if = va_fif;
} else va_if = 0;
va_sif( va_if );
function va_fy(obj) { 
    var curtop = 0;
    if (obj.offsetParent) {
	do {
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return curtop;
    }
}
var va_d, 
    va_dd, 
    va_ib, 
    va_pp, 
    va_mc, 
    va_wd, 
    va_vd; 
function va_rtp(){
	var mpp = document.getElementById('va_pp');
	if( mpp ) mpp.parentNode.removeChild( mpp );	
	if( va_ib ){
	  if( va_rh ){
	    va_ib.style.maxHeight = va_rh + 'px';
	    va_ib.style.height = va_rh + 'px';
	  }
	  else {
	    va_ib.style.maxHeight = '250px';
	    va_ib.style.height = '250px';
	  }
	}
}
function va_gra(){
    var ifr = document.getElementsByClassName("Am Al editable")[0];
    if( ifr ){
	var ind = ifr.contentDocument || ifr.contentWindow.document;
	var e = ind.getElementsByClassName("LW-avf")[0];
	var x = e.scrollLeft;
	var y = e.scrollTop;
	e.blur();
	va_go(e);
	e.scrollLeft = x;
	e.scrollTop = y;
    }
}
function va_iwl(){
    var ifr = document.getElementsByClassName("Am Al editable")[0];
    if( ifr ){
	var ind = ifr.contentDocument || ifr.contentWindow.document;
	var e = ind.getElementsByClassName("LW-avf")[0];
	var x = e.scrollLeft;
	var y = e.scrollTop;
	e.blur();
	var t = e.innerHTML;
	t = t.replace( /(\$\$[^$]*\$\$)/g, va_rdd );
	t = t.replace( /(\$[^$]*\$)/g, va_rsd );
	t = t.replace( /\\\[([^\]]*?)\\\]/g, va_rdd );
	t = t.replace( /\\\(([^\)]*?)\\\)/g, va_rsd );
	e.innerHTML = t;
	e.scrollLeft = x;
	e.scrollTop = y;
    }
}
function va_toeWeb( e ){
    e = va_fe( e );
    var t = e.innerHTML;
    t = t.replace( /(\$\$[^$]*\$\$)/g, va_rdd );
    t = t.replace( /(\$[^$]*\$)/g, va_rsd );
    t = t.replace( /\\\[([^\]]*?)\\\]/g, va_rdd );
    t = t.replace( /\\\(([^\)]*?)\\\)/g, va_rsd );
    e.innerHTML = t;
}
var va_ps = "";
function va_rsd( m, p, o, s ){
    p = p.replace(/<br>/g,"");
    p = p.replace(/<\/?wbr>/g,"");
    p = p.replace( /<span.*?>/g, "");
    p = p.replace( /<\/span>/g, "");
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\b(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbb $1" );
    p = p.replace( /\\bf(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbf $1" );
    p = p.replace( /\\c(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathcal $1" );
    p = p.replace( /\\f(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathfrak $1" );
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z){2}([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\(O)([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\\(O){2}([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\$/g, "" ); 
    var t = p.replace( /\+/g, "%2B" ); 
    t = t.replace( /\\/g, "%5C" ); 
    t = t.replace( /\^/g, "%5E" ); 
    t = t.replace( /_/g, "%5F" ); 
    t = t.replace( /\s+/g, "%20" ); 
    return '<img style="vertical-align:middle;" src="' + va_ls +
	t + va_ps + '" title="' + p + '" alt="' + p + '">';
}
function va_rdd( m, p, o, s ){
    p = p.replace(/<br>/g,"");
    p = p.replace(/<\/?wbr>/g,"");
    p = p.replace( /<span.*?>/g, "");
    p = p.replace( /<\/span>/g, "");
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\b(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbb $1" );
    p = p.replace( /\\bf(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbf $1" );
    p = p.replace( /\\c(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathcal $1" );
    p = p.replace( /\\f(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathfrak $1" );
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z){2}([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\(O)([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\\(O){2}([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\$/g, "" ); 
    var t = p.replace( /\+/g, "%2B" );
    t = t.replace( /\\/g, "%5C" );
    t = t.replace( /\^/g, "%5E" );
    t = t.replace( /_/g, "%5F" );
    t = t.replace( /\s+/g, "%20" );
    return "<img style=\"display:block;margin:10px auto 10px auto\" src=\"" 
	+ va_ls + t + va_ps + 
	"\" title=\"" + p + "\" alt=\"" + p + "\">";
}
var va_fanf = 1;
function va_tc(){ 
    if( !document.getElementById('va_pp') ){
	va_ib = document.getElementsByClassName("aXjCH")[0];
	if( document.getElementsByClassName("Ar Au")[0] &&
	    document.getElementsByClassName("Ar Au")[0].style.display == "block"  ) {
	    va_iwl();
	    var ifr = document.getElementsByClassName("Am Al editable")[0];
	    if( ifr ){
		var ind = ifr.contentDocument || ifr.contentWindow.document;
		var e = ind.getElementsByClassName("LW-avf")[0];
		e.addEventListener( "keyup", va_trif, false );
	    }
	} else {
	    if( va_ib ){
		if( va_fanf ){
		    va_fanf = 0;
		    alert( 'If you compose your message in "Rich formatting" mode, then your addressee will be able to see math even without installing GmailTeX' );
		}
		va_pp = document.createElement('div');	    
		va_pp.id = "va_pp";
		va_pp.className = "As";
		va_pp.style.padding = "4px 1px 4px 4px"; 
		va_pp.style.border = "1px solid #979797"; 
		va_pp.style.display = 'block';
		va_pp.tabindex = "-1";
		if( va_ib.offsetParent )
		    va_ib.offsetParent.appendChild(va_pp);
		va_mc = document.createElement('div');
		va_mc.id = 'va_mc';
		va_mc.className = 'At';
		va_mc.style.position = 'relative';
		va_mc.tabindex = "-1";
		va_pp.appendChild( va_mc );
		va_wd = document.createElement('div');
		va_wd.className = "Ak";
		va_wd.style.position = "absolute";
		va_wd.style.top = "0";
		va_wd.style.left = "0";
		va_wd.style.height = "100%";
		va_wd.style.overflowX = "hidden";
		va_wd.style.visibility = "hidden";
		va_wd.tabindex = "-1";
		va_mc.appendChild( va_wd );
		va_vd = document.createElement('div');
		va_vd.className = "Ak";
		va_vd.style.position = "absolute";
		va_vd.style.top = "0";
		va_vd.style.left = "0";
		va_vd.style.height = "100%";
		va_vd.style.overflowX = "hidden";
		va_vd.style.visibility = "visible";
		va_vd.tabindex = "-1";
		va_mc.appendChild( va_vd );
		va_ok = true;
		va_ad = 0; 
		va_mmm( false );
	    }
	}
    }
    if( va_ib ){
	va_sc();
	va_bd = document.getElementById(":rp");
	va_sd = document.getElementsByClassName("aeH");
	var va_of;
	if( va_sd ){
	    va_of = va_sd[0].offsetHeight;
	} else {
	    va_of = 37;
	}
	var hw1 = (window.innerHeight / 2 - 2*va_of - 4) + 'px';
	var hw2 = hw1;
	va_rh = va_ib.offsetHeight;
	va_ib.style.maxHeight = hw1;
	va_ib.style.height = hw1;
	if( va_mc) va_mc.style.height = hw2;
	if( va_wd) va_wd.style.height = hw2;
	if( va_vd) va_vd.style.height = hw2;
	va_bd.scrollTop = va_fy( va_ib ) - 126 + 2*37 - 2*va_of;
	va_ib.addEventListener( "keyup", va_tin, false );
	va_ib.addEventListener( "cut", function(){
		setTimeout( function(){ if(va_at==1) va_rfs(); }, 10 );
	    }, false );
	va_ib.addEventListener( "paste", function(){
		setTimeout( function(){ if(va_at==1) va_rfs(); }, 10 );
	    }, false );
	va_rfs();
    }
}
function va_rfs(){
    if( va_ib.value != "" ){
	va_rq.push( [ -1, va_ib.value, 0 ] );
	va_ippr();
    }
}
function va_oek(event){
    var k = event.keyCode;
      if( k == 119 ){ 
			if( event.shiftKey ) va_rtp();
		      else{
			  va_ta();
		      }
		    }
    if( k == 120 ){ 
	va_ga();
    }
}
addEventListener( "keyup", va_oek, false );
function va_wtt( n ){ 
    var s = va_ib.value.substring( 0, n );
    var r = s.split( va_pdr ).length - 1;
    return r;
}
function va_tin(e){ 
    var k = (window.event) ? event.keyCode : e.keyCode; 
    if( va_at == 1 ){
	if( ( k <= 40 ) 
	    && ( k != 8 ) 
	    && ( k != 13 ) 
	    && ( k != 32 ) 
	    ) return;
	var tps = va_ib.value.split( va_pdr ),
	    tpn = tps.length,
	    s = va_wtt( va_ib.selectionStart ),
	    e = va_wtt( va_ib.selectionEnd );
	var mi,
	    ma;
	if( va_fr ){
	    va_ss = s;
	    va_se = e;
	}
	if( tpn == va_tpn ){
	    mi = Math.min( s, va_ss );
	    ma = Math.min( va_tpn, Math.max( e, va_se ) ); 
	    for( var j = mi; j <= ma; j++){
		va_rq.push( [ j, tps[j], 0 ] );
	    }
	}
	if( tpn < va_tpn ){
	    var d = va_tpn - tpn; 
	    mi = Math.min( s, va_ss );
	    ma = Math.min( va_tpn-d, Math.max( e, va_se ) ); 
	    for( var j = mi; j <= s; j++){
		va_rq.push( [ j, tps[j], 0 ] );
	    }
	    for( var j = s+d; j >= s+1; j-- ){
		va_rq.push( [ j, "", -1 ] );
		va_ad++;
	    }
	    for( var j = s+d+1; j <= ma; j++){
		va_rq.push( [ j, tps[j], 0 ] );
	    }
	}
	if( tpn > va_tpn ){
	    var d = tpn - va_tpn; 
	    mi = Math.min( s, va_ss );
	    ma = Math.min( va_tpn+d, Math.max( e, va_se ) ); 
	    for( var j = mi; j <= va_ss; j++){
		va_rq.push( [ j, tps[j], 0 ] );
	    }
	    for( var j = va_ss+1; j <= va_ss+d; j++ ) {
		va_rq.push( [ j, tps[j], 1 ] );
		va_ad++;
	    }
	    for( var j = va_ss+d+1; j <= ma; j++){
		va_rq.push( [ j, tps[j], 0 ] );
	    }
	}
	va_tpn = tpn; 
	va_ss = s;
	va_se = e;
	va_fr = false;
	va_ippr();
    }
}
var va_ss, 
    va_se, 
    va_tps = [], 
    va_tpn, 
    va_fr; 
function va_ltgt( m ){ 
    if( m ){
	m = m.replace(/&/g,"&amp;");    	
	m = m.replace(/>/g,"&gt;");    	
	m = m.replace(/</g,"&lt;");    	
	return m;
    }
    else return "";
}
function va_pc( num, s, app ){ 
    if( !document.getElementsByClassName("aXjCH")[0] ) return; 
    va_ok = false;  
    if( num == -1 ){ 
	va_qu.Push( function(){
		va_mmm( true );		
		va_fr = true;
		va_wd.innerHTML = va_ltgt( s );
	    } );
	va_qu.Push( [ "Typeset", MathJax.Hub, va_wd ] );
	va_qu.Push( function(){ 
		var ms = va_wd.innerHTML.split( va_pdr ); 
		va_tps = [];
		var tpnnow = s.split( va_pdr ).length;
		va_vd.innerHTML = "";
		for( var i = 0; i < tpnnow; i++ ){
		    var p = document.createElement("p"); 
		    va_tps.push( p );
		    va_vd.appendChild( p );
		    if( ms[i].length ) p.innerHTML = ms[i];
		    else p.innerHTML = "&nbsp;";		    
		}
		va_mmm( false );
		va_tpn = va_ib.value.split( va_pdr ).length; 
	    });
    }
    else {
	if( app == -1 ){ 
	    va_qu.Push( function(){
		    if( typeof va_tps[num] != "undefined" ){
			va_vd.removeChild( va_tps[ num ] );
			va_tps.splice( num, 1 );	  
		    }
		    else alert( 'can not remove ' + num );
		} );
	}
	else { 
	    if( app == 0 )
		va_qu.Push( function(){ var p = va_tps[ num ]; } ); 
	    if (app == 1) { 
		va_qu.Push( function(){ 
			var p = document.createElement("p"); 
			if( va_tps[ num-1 ] ){
			    va_vd.insertBefore( p, va_tps[ num-1 ].nextSibling ); 
			    va_tps.splice( num, 0, p );
			} else alert( (num-1) + ' is undefined' );
		    } );
	    }
	    va_qu.Push( function(){ 
		    va_wd.innerHTML = va_ltgt( s );
		} );
	    va_qu.Push( [ "Typeset", MathJax.Hub, va_wd ] );
	    va_qu.Push( function(){ 
		    var p = va_tps[ num ];
		    if( ((typeof p) != "undefined") && p ){
			var m = va_wd.innerHTML;
			if( m.length ) p.innerHTML = m;
			else p.innerHTML = "&nbsp;";
			if( va_ib.selectionStart > va_ib.value.length-5){
			    va_vd.scrollTop = va_vd.scrollHeight;
			}
		    }else{
			va_tc();
		    }
		});
	}
    } 
    va_qu.Push( function(){ va_ok = true } );    
} 
function va_mmm( a ) { 
    var m = document.getElementById( "MathJax_Message" );
    if( m ){
	if( a ) m.style.visibility = "visible";
	else m.style.visibility = "hidden";
    }
}
function va_tr(){ 
    va_mmm( true );
    var es = document.getElementsByClassName('ii gt'); 
    if( es.length > 0 ) va_sc();
    for( var i=0; i<es.length; i++ )
	if( ! es[i].className.match("va_ar") )
	    if( va_en == 1 ){
		va_toeLocal( es[i] );
	    } else va_toeWeb( es[i] );
}
function va_gre(){ 
    var es = document.getElementsByClassName('ii gt'); 
    for( var i=0; i<es.length; i++ )
	va_go( es[i] );
}
function va_fe( e ){ 
    var t = e.innerHTML;
    t = t.replace( /(<div class="im">)([\s\S]*?)(<\/div>)/g, "$2");
    t = t.replace(/<br>/g,"\n");
    t = t.replace(/<\/?wbr>/g,"");
    t = t.replace(/\n\n/g,"<br>");
    e.innerHTML = t;
    return e;
}
function va_toeLocal( e ){ 
    e = va_fe( e );
    va_qu.Push( ["Typeset",MathJax.Hub, e] );
    va_qu.Push( function(){ 
	    e.className = 'va_ar ' + e.className;
	} );
}
function va_eta( m, p1, p, o, s ){
    p = p.replace( /\+/g, "%2B" ); 
    p = p.replace( /\\/g, "%5C" ); 
    p = p.replace( /\^/g, "%5E" ); 
    p = p.replace( /_/g, "%5F" ); 
    p = p.replace( /\s+/g, "%20" ); 
    return p1 + "=" + p;
}
function va_dta( m, p1, p, o, s ){
    p = p.replace( /\%2B/g, "+" ); 
    p = p.replace( /\%5C/g, "\\" ); 
    p = p.replace( /\%5E/g, "\^" ); 
    p = p.replace( /\%5F/g, "\_" ); 
    p = p.replace( /%20/g, " " ); 
    return p1 + "=" + p;
}
function va_go( e ){
    var t = e.innerHTML;
    t = t.replace( /id="q_([a-z0-9]+)_([0-9]+)"/g, 'id=\"q-' + "$1-$2" + '\"' );
    t = t.replace( /<\/?wbr>/, "" );
    t = t.replace( /(title|alt)=(\"[^\"]*\")/g, va_eta );
t = t.replace( /\\\"\{?(A|E|I|O|U|a|e|i|o|u)\}?/g, "\&$1uml;" );
t = t.replace( /\\\'\'\{?(A|E|I|O|U|a|e|i|o|u)\}?/g, "\&$1uml;" );
t = t.replace( /\\\'\{?(A|E|I|O|U|Y|a|e|i|o|u|y)\}?/g, "\&$1acute;" );
t = t.replace( /\\\`\{?(A|E|I|O|U|a|e|i|o|u)\}?/g, "\&$1grave;" );
t = t.replace( /\\\^\{?(A|E|I|O|U|a|e|i|o|u)\}?/g, "\&$1circ;" );
t = t.replace( /\_([a-zA-Z0-9\*]+)\\/g, "_$1 \\" );
t = t.replace( /\^([a-zA-Z0-9\*]+)\\/g, "^$1 \\" );
t = t.replace( /\_([a-zA-Z0-9\*]+)\&(l|g)t;/g, "_$1 \&$2t;" );
t = t.replace( /\^([a-zA-Z0-9\*]+)\&(l|g)t;/g, "^$1 \&$2t;" );
t = t.replace( /(R\^)(i|j|k|l|m|n|p|q|r)(f|g|\\)/g, "$1$2 $3" );
t = t.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<b>$1</b>$2" );
t = t.replace( /\\b(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<b>$1</b>$2" );
t = t.replace( /\\bf(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<b>$1</b>$2" );
t = t.replace( /\\c(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<i>$1</i>$2" );
t = t.replace( /\\f(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<i>$1</i>$2" );
t = t.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z){2}([^a-zA-Z])/g, "<b>$1</b>$2" );
t = t.replace( /\\(O)([^a-zA-Z])/, "<i>$1</i>$2" );
t = t.replace( /\\(O){2}([^a-zA-Z])/, "<i>$1</i>$2" );
t = t.replace( /\\(math)?cal\{(.+?)\}/g, "<i>$2</i>" );
t = t.replace( /\\(math)?cal(<br>|\s)+(\S)/g, "<i>$3</i>" );
t = t.replace( /\\math(bb|bf|frak)\{(.+?)\}/g, "<b>$2</b>" );
t = t.replace( /\\math(bb|bf|frak)(<br>|\s)+(\S)/g, "<b>$3</b>" );
t = t.replace( /\\Bbb\{(.+?)\}/g, "<b>$1</b>" );
t = t.replace( /\\Bbb(<br>|\s)+(\S)/g, "<b>$2</b>" );
t = t.replace( /\\textbf\{(.+?)\}/g, "<b>$1</b>" );
t = t.replace( /\\textbf(<br>|\s)+(\S)/g, "<b>$2</b>" );
t = t.replace( /\\emph\{(.+?)\}/g, "<i>$1</i>" );
t = t.replace( /\{\s*\\it\s+(.+?)\}/g, "<i>$1</i>" );
t = t.replace( /\{\s*\\em\s+(.+?)\}/g, "<i>$1</i>" );
t = t.replace( /\{\s*\\bf\s+(.+?)\}/g, "<b>$1</b>" );
t = t.replace( /-+&gt;/g, " \&rarr; " );
t = t.replace( /&lt;-+/g, " \&larr; " );
t = t.replace( /\\to([^a-z])/g, "\&rarr;$1" );
t = t.replace( /\\gets/g, "\&larr;" );
t = t.replace( /\\Rightarrow/g, "\&rArr;" );
t = t.replace( /\\iff/g, "\&hArr;" );
t = t.replace( /\\Rightleftarrow/g, "\&hArr;" );
t = t.replace( /\&lt;=\&gt;/g, "\&hArr;" );
t = t.replace( /\&gt;=/g, "\&ge;" );
t = t.replace( /\&lt;=/g, "\&le;" );
t = t.replace( /=\&lt;/g, "\&le;" );
t = t.replace( /\\dashrightarrow/g, "- - \&rarr;" );
t = t.replace( /\\dashleftarrow/g, "\&larr; - -" );
t = t.replace( /var(epsilon|theta|phi)/g, "$1" );
t = t.replace( /\\(Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega|alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|rho|sigma|tau|upsilon|phi|chi|psi|omega|forall|nabla|prod|sum|cap|cup|sim|cong|equiv|oplus|times|otimes|perp|lceil|rceil|lfloor|rfloor|ell|vee)/g,
	       "\&$1;" );
t = t.replace( /([^a-zA-Z\&\\])(Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Pi|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega|alpha|beta|gamma|delta|epsilon|zeta|eta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|forall|nabla|prod|cap|cup|sim|cong|equiv|oplus|otimes|perp|lceil|rceil|lfloor|rfloor|ell|vee)([^a-z])/g,
	       "$1\&$2;$3" );
t = t.replace( /\\ell([^a-z])/g, "\&ell;$1" );
t = t.replace( /\\neq/g, "\&ne;" );
t = t.replace( /\\leq/g, "\&le;" );
t = t.replace( /\\geq/g, "\&ge;" );
t = t.replace( /\\(ne|le|ge|pi|Pi)([^a-z])/g, "\&$1;$2" );
t = t.replace( /\\infty/g, '&infin;' );
t = t.replace( /[^C]infty/g, "\&infin;" );
t = t.replace( /\\exists/g, "\&exist;" );
t = t.replace( /\\emptyset/g, "\&empty;" );
t = t.replace( /[^C]emptyset/g, "\&empty;" );
t = t.replace( /\\subset/g, "\&sub;" );
t = t.replace( /\\supset/g, "\&sup;" );
t = t.replace( /\\setminus/g, "\&ndash;" );
t = t.replace( /\\(l)?dots[c]?/g, "..." );
t = t.replace( /\\rm\s+/g, "" );
t = t.replace( /\\mathrm\s+/g, "" );
t = t.replace( /\\left/g, "" );
t = t.replace( /\\right/g, "" );
t = t.replace( /\\colon/g, ":" );
t = t.replace( /\\in([^a-z])/g, "\&isin;$1" );
t = t.replace( /\\partial/g, "\&part;" );
t = t.replace( /\\cdot/g, "&bull;" );
t = t.replace( /\\pm([^a-z])/g, "&plusmn;$1" );
t = t.replace( /\\bigoplus/g, "&oplus;" );
t = t.replace( /\\union/g, "&cup;" );
t = t.replace( /\\bigcup/g, "&cup;" );
t = t.replace( /\\bigcap/g, "&cap;" );
t = t.replace( /\\ll/g, "&lt;&lt;" );
t = t.replace( /\\gg/g, "&gt;&gt;" );
t = t.replace( /\\bar(<br>|\s)*(&\S+;)/g, 
	       "<span style='text-decoration:overline;'>"
	       + "$2" + "</span>" );
t = t.replace( /\\bar(<br>|\s)+(\S)/g, 
	       "<span style='text-decoration:overline;'>"
	       + "$2" + "</span>" );
t = t.replace( /\\bar(<br>|\s)*\{(.*?)\}/g, 
    "<span style='text-decoration:overline;'>"
    + "$2" + "</span>" );
t = t.replace( /\\sqrt\[(.+)\]\{(.+?)\}/g, 
    "<sup>$1</sup>\&radic;<span style='text-decoration:overline;'>$2</span>" );
t = t.replace( /\\sqrt\{(.+?)\}/g, 
    "\&radic;<span style='text-decoration:overline;'>$1</span>" );
t = t.replace( /\\sqrt/g, "\&radic;" );
t = t.replace( /\\[d]?frac\s*\{(.*?)\}\s*\{(.*?)\}/g, "$1/$2 " );
t = t.replace( /\\[d]?frac\s*\{(.*?)\}\s*(\S)/g, "$1/$2 " );
t = t.replace( /\\[d]?frac\s*(\S)\s*\{(.*?)\}/g, "$1/$2 " );
t = t.replace( /\\[d]?frac\s*(\S)\s*(\S)/g, "$1/$2 " );
t = t.replace( /\\overline(<br>|\s)*\{(.*?)\}/g, 
    "<span style='text-decoration:overline;'>"
    + "$2" + "</span>" );
t = t.replace( /\\underline(<br>|\s)*\{(.*?)\}/g, 
    "<span style='text-decoration:underline;'>"
    + "$2" + "</span>" );
t = t.replace( /([^a-zA-Z&])eps([^a-z]{1})/g, "$1\&epsilon;$2" );
t = t.replace( /\\eps([^a-z])/g, "\&epsilon;$1" );
t = t.replace( /\\(;|\,|\.|\s)/g, " " );
t = t.replace( /\\quad/g, "&nbsp;&nbsp;&nbsp;&nbsp;" );
t = t.replace( /\\qquad/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" );
t = t.replace( /\\int(_|\^)/g, '<span style="font-size:150%;">&int;<\/span>$1' );
t = t.replace( /\\int([^a-z])/g, '<span style="font-size:150%;">&int;$1<\/span>' );
t = t.replace( /\^\s*\{(.+?)\}/g, "<sup>$1</sup>" );
t = t.replace( /\_\s*\{(.+?)\}/g, "<sub>$1</sub>" );
t = t.replace( /\^\s*\((.+?)\)/g, "<sup>$1</sup>" );
t = t.replace( /\_\s*\((.+?)\)/g, "<sub>$1</sub>" );
t = t.replace( /\^\s*(\-?[a-zA-Z0-9\\\&;\,]+)/g, "<sup>$1</sup>" );
t = t.replace( /\_\s*(\-?[a-zA-Z0-9\\\&;\,]+)/g, "<sub>$1</sub>" );
t = t.replace( /\^\s*(\*|\!|\+|\-)/g, "<sup>$1</sup>" );
t = t.replace( /\_\s*(\*|\!|\+|\-)/g, "<sub>$1</sub>" );
t = t.replace( /\$|\\\(|\\\)|\\\[|\\\]/g, "" );
t = t.replace( /\\cite\{(.+?)\}/g, "<font color='blue'>[$1]</font>" );
t = t.replace( /\\cite\[(.+?)\]\{(.+?)\}/g, 
    "<font color=\"blue\">[$2, $1]</font>" );
t = t.replace( /(\\[a-zA-Z]+)/g, "<font color=\"blue\">$1</font>" );
t = t.replace( /\\\{/g, "{" );
t = t.replace( /\\\}/g, "}" );
    t = t.replace( /id="q-([a-z0-9]+)-([0-9]+)"/g, 'id=\"q_' + "$1_$2" + '\"' );
    t = t.replace( /(title|alt)=(\"[^\"]*\")/g, va_dta );
    e.innerHTML = t;
}
function va_ab(){
va_ap.innerHTML = 
    '<div class="wc" role="alert" tabindex="-1">'+
    '<table cellpadding="0" class="cf wd" style="border-top: 0px; font-weight:normal;">'+
    '<tbody>'+
    '<tr>'+
    '<td class="Dn" align="center">'+
    '<h2>Common LaTeX commands</h2>'+
    'Inline equations should be enclosed in '+
    '<font color="#DDDD00">$...$ </font>'+
    'or <font color="#DDDD00">\\(...\\)</font><br>'+
    'Displayed equations should be enclosed in '+
    '<font color="#DDDD00">$$...$$ </font>'+
    'or <font color="#DDDD00">\\[...\\]</font><br><br>'+
    '<table cellpadding="0" class="cf">'+
    '<tbody>'+
    '<tr><td align="right"><font color="#DDDD00">subscripts</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left">x_2</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">superscripts</font></td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> x^2</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">fractions</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\frac{1}{2}, \\frac12 </td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">roots</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\sqrt{x}, \\sqrt[3]{x} </td></tr>'+
    '<tr><td>&nbsp;</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">integrals </font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\int_a^b </td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">sums</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\sum_{i=1}^{\\infty} </td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">products</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\prod_{i=1}^5</td></tr>'+
    '<tr><td>&nbsp;</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">functions</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\sin, \\cos, \\tan, \\log, \\exp... </td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">arrows</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\to, \\gets, \\implies, \\iff...</td></tr>'+
    '<tr><td>&nbsp;</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">Greek letters</font></td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\alpha, \\beta, \\Alpha, \\Beta...</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">blackboard</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbb{R} </td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">math bold</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbf{R}</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">script</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathcal{E} </td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">Fraktur</font></td> '+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathfrak{F}</td></tr>'+
    '</tbody></table>'+
    '</td>'+
    '<td width="1" bgcolor="white"><br></td>'+
    '<td class="Dn" align="center">'+
    '<h2>Abbreviations supported by GmailTeX</h2>'+
    '<table cellpadding="0" class="cf">'+
    '<tbody>'+
    '<tr><td align="right"><font color="#DDDD00">\\A</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbb A, etc. (exception: \\O = \\mathcal O)</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\AA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbb A, etc. (exception: \\OO = \\mathcal O)</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\bA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbb A, etc.</td></tr>'+
    '<tr><td>&nbsp;</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\bfA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbf A, etc.</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\cA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathcal A, etc.</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\fA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathfrak A, etc.</td></tr>'+
    '<tr><td>&nbsp;</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\eps</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\varepsilon</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\dag</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\dagger</td></tr>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td align="center" colspan="3"><font color="#DDDD00">You can also compose your formula in <br><a style="color:#DDDD00;" href="http://www.codecogs.com/latex/eqneditor.php">CodeCogs Online LaTeX Equation Editor</a><br>and then paste it in your email message. </font></td></tr>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td>&nbsp;</tr></td>'+
    '<tr><td align="center" colspan="3"><font color="#DDDD00">(Click anywhere here to close)</font></td></tr>'+
    '</tbody></table>'+
    '</td></tr></tbody></table>'+
    '</div>';
    if( va_af == 0 ){
	va_ap.style.display = 'block';
	va_af = 1;
    } else {
	va_ap.style.display = 'none';
	va_af = 0;
    }
}
function va_cap(){
    va_ap.style.display = 'none';
    va_af = 0;
}
GmailTeX = document.createElement('div');
GmailTeX.id = 'GmailTeX';
GmailTeX.style.display = 'none';
document.getElementsByTagName('head')[0].appendChild( GmailTeX );
} else { alert("GmailTeX is already running. If it is really not running, reload Gmail and try again.") }
