/************************************************************
 *  GmailTeX   gmailtex.js / emailtex.js 
 *  http://alexeev.org/gmailtex.html
 *
 *  Gmail + LaTeX = GmailTeX
 *
 *  Written by (C) Valery Alexeev <va.email.tex@gmail.com>
 *  Version 5.7.8 March 24, 2013
 *  License: http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 **************************************************************
 */
var va_if, va_fif; 
var va_am, va_fam; 
var va_bp = new Array(14);
function va_sbp( i ){
    if( i==0 ){ 
	va_bp[0] = 0.8 ; 
	va_bp[1] = 0.2 ; 
	va_bp[2] = 1.8 ; 
	va_bp[3] = 2.2 ; 
	va_bp[13] = 3;   
	va_bp[4] = 3.8 ; 
	va_bp[12] = 4;    
	va_bp[5] = 5 ;   
	va_bp[6] = 5 ;   
	va_bp[7] =  4; 
	va_bp[8] = 12 ;  
	va_bp[9] = 5.8 ; 
	va_bp[10] = 5.5 ; 
	va_bp[11] = 2.9 ; 
    } else { 
	va_bp[0] = 0 ; 
	va_bp[1] = 1.3 ; 
	va_bp[2] = 1.3 ; 
	va_bp[3] = 2 ; 
	va_bp[13] = 2.1;  
	va_bp[4] = 3.2 ; 
	va_bp[12] = 3.2;    
	va_bp[5] = 4 ;   
	va_bp[6] = 4 ;   
	va_bp[7] = 4 ; 
	va_bp[8] = 11 ;  
	va_bp[9] = 5.5 ; 
	va_bp[10] = 5.5 ; 
	va_bp[11] = 2.3 ; 
    }
}
if(typeof(Storage)!=="undefined"){
    va_fif = localStorage.va_fif;
    va_fam = localStorage.va_fam;
}
if ( va_fif ) {
    va_if = va_fif;
} else va_if = 0;
va_sbp( va_if );
if ( va_fam ) {
    va_am = va_fam;
} else va_am = 0;
var va_is = new Array(2);
va_is[0] = "gif.latex?";
va_is[1] = "svg.latex?";
var va_ls = "http://latex.codecogs.com/";
var va_ps = "";
function va_fim( node ){
    if (node.tagName=="IMG") 
	return NodeFilter.FILTER_ACCEPT
	else
	    return NodeFilter.FILTER_SKIP
		}
function va_alrt( e ){ 
    var w=document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, va_fim, false);
    while( w.nextNode() ){
	w.currentNode.addEventListener('dblclick', va_rt, false);
    }
}
function va_rm( m, p, o, s ){
    p = p.replace(/<br>/g,"");
    p = p.replace(/<\/?wbr>/g,"");
    p = p.replace( /<span.*?>/g, "");
    p = p.replace( /<\/span>/g, "");
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|J|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\bb(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbb $1" );
    p = p.replace( /\\bf(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbf $1" );
    p = p.replace( /\\b(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbb $1" );
    p = p.replace( /\\c(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathcal $1" );
    p = p.replace( /\\f(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathfrak $1" );
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|J|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z){2}([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\(O)([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\\(O){2}([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\$/g, "" ); 
    var t = p.replace( /\+/g, "%2B" );
    t = t.replace( /\\/g, "%5C" );
    t = t.replace( /\^/g, "%5E" );
    t = t.replace( /_/g, "%5F" );
    t = t.replace( /\s+/g, "%20" );
    return va_ls + va_is[va_if] + '\inline'+  t + va_ps +  
	"\" title=\"" + p + "\" alt=\"" + p + "\">";
}
function va_rsd( m, p, o, s ){
    return '<img style="vertical-align:middle;" src="' 
	+ va_rm( m, p, o, s );
}
function va_rdd( m, p, o, s ){
    return "<img style=\"display:block;margin:10px auto 10px auto\" src=\"" 
	+ va_rm( m, p, o, s );
}
function va_rm2( p ){
    p = p.replace(/<br>/g,"");
    p = p.replace(/<\/?wbr>/g,"");
    p = p.replace( /<span.*?>/g, "");
    p = p.replace( /<\/span>/g, "");
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|J|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\bb(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbb $1" );
    p = p.replace( /\\bf(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbf $1" );
    p = p.replace( /\\b(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathbb $1" );
    p = p.replace( /\\c(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathcal $1" );
    p = p.replace( /\\f(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)/g, "\\mathfrak $1" );
    p = p.replace( /\\(A|B|C|D|E|F|G|H|I|J|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z){2}([^a-zA-Z])/g, "\\mathbb $1$2" );
    p = p.replace( /\\(O)([^a-zA-Z])/, "\\mathcal $1$2" );
    p = p.replace( /\\(O){2}([^a-zA-Z])/, "\\mathcal $1$2" );
    var t = p.replace( /\+/g, "%2B" );
    t = t.replace( /\\/g, "%5C" );
    t = t.replace( /\^/g, "%5E" );
    t = t.replace( /_/g, "%5F" );
    t = t.replace( /\s+/g, "%20" );
    var a = new Array(2); 
    a[0] = va_ls + va_is[va_if] + '%5Cinline%20{'
    + t + '}' + va_ps;
    a[1] = p;
    return a;
}
function va_rt(){ 
    var i = this; 
    var r, o; 
    if( i.style.display == "block" ){
	r = '$$'; o = '$';
    } else { r = '$', o = ''; }
    var t = document.createTextNode( r + i.alt + o );
    i.parentNode.replaceChild( t, i );
    while( t.previousSibling && (t.previousSibling.nodeType == 3) ){
	t.nodeValue = t.previousSibling.nodeValue + t.nodeValue;
	t.parentNode.removeChild( t.previousSibling );
    }
    while( t.nextSibling && (t.nextSibling.nodeType == 3) ){
	t.nodeValue = t.nodeValue + t.nextSibling.nodeValue;
	t.parentNode.removeChild( t.nextSibling );
    }
}
var va_gb, 
    va_sb; 
var va_sm = .7; 
function va_cse( p ){ 
    var b = 0;
    p=p.replace(/\\beta|\\gamma|\\zeta|\\eta|\\mu|\\xi|\\rho|\\phi|\\varphi|\\chi|\\psi/g,
    "f "); 
    p=p.replace(/\\sum|\\prod|\\int|\\oint|\\setminus|\\notin|\\not\\in|\\lvert|\\rvert|\\lVert|\\rVert|\\rfloor|\\lfloor|\\rceil|\\lceil/, "%%%1"); 
    p=p.replace(/\\ge|\\le/, "%%%3"); 
    p=p.replace(/\\sqrt/, "%%%2"); 
    p=p.replace(/\\[{}]/, "%%%1"); 
    p=p.replace("/", "%%%1"); 
    p=p.replace(/\\in|\\ni|\\subset|\\supset/, "%%%4"); 
    p=p.replace(/\\[a-z]*/g,"a"); 
    if( p.match(/[CGJORSUVW]/) ){ b = va_bp[0]; }
    if( p.match(/%%%4/) )       { b = va_bp[0]; }
    if( p.match(/[/-]/) )       { b = va_bp[1]; }
    if( p.match(/[/+]/) )       { b = va_bp[2]; }
    if( p.match("%%%2") )       { b = va_bp[3]; }
    if( p.match("%%%3") )       { b = va_bp[13];} 
    if( p.match(/[fgjpqyQ]/) )  { b = va_bp[4]; }
    if( p.match(",") )          { b = va_bp[12];}
    if( p.match(/[\[\]()\|]/) ) { b = va_bp[5]; } 
    if( p.match("%%%1") )       { b = va_bp[6]; }
    return b;    
} 
function va_dr21( m, p1, p2, o, s ){ 
    va_sb += va_cse(p1) * va_sm;
    if( va_sb > va_gb ){
	va_gb = va_sb;
    }
    return "";
}
function va_dr22( m, p1, p2, o, s ){ 
    va_sb += va_cse(p2) * va_sm;
    if( va_sb > va_gb ){
	va_gb = va_sb;
    }
    return "";
}
function va_dr22keep1( m, p1, p2, o, s ){ 
    va_sb += va_cse(p2) * va_sm;
    if( va_sb > va_gb ){
	va_gb = va_sb;
    }
    return p1;
}
function va_dr22keep2( m, p1, p2, o, s ){ 
    va_sb += va_cse(p2) * va_sm;
    if( va_sb > va_gb ){
	va_gb = va_sb;
    }
    return p2;
}
function va_dr1( m, p1, o, s ){ 
    va_sb += va_cse(p1) * va_sm;
    if( va_sb > va_gb ){
	va_gb = va_sb;
    }
    return "";
}
function va_co( p ){ 
    va_gb = 0;
    var B = "(\\{.+?\\}|\\\\[a-zA-Z]+|[a-zA-Z0-9*!.])"; 
    va_sb =  va_bp[7]; 
    re = new RegExp( "_" + B + "\\^" + B, "g" );
    p = p.replace( re, va_dr21 ); 
    re = new RegExp( "_" + B + "(\\')", "g" );
    p = p.replace( re, va_dr21 ); 
    re = new RegExp( "\\^" + B + "_" + B, "g" );
    p = p.replace( re, va_dr22 ); 
    re = new RegExp( "(\\')" + "_" + B, "g" );
    p = p.replace( re, va_dr22 ); 
    va_sb =  va_bp[8];
    re = new RegExp( "\\\\dfrac" + B + B, "g" );
    p = p.replace( re, va_dr22 ); 
    va_sb =  va_bp[9];
    re = new RegExp( "\\\\frac" + B + B, "g" );
    p = p.replace( re, va_dr22 ); 
    va_sb =  va_bp[10];  
    re = new RegExp( "(\\\\sum|\\\\prod|\\\\int)_" + B, "g" );
    p = p.replace( re, va_dr22keep1 ); 
    re = new RegExp( "\\^" + B, "g" );
    p = p.replace( re, "" ); 
    va_sb =  va_bp[11];
    re = new RegExp( "_" + B, "g" );
    p = p.replace( re, va_dr1 ); 
    var rest = va_cse( p );
    if( rest > va_gb ){
	va_gb = rest;
    }
    return va_gb;
}
function va_won( n ){ 
    if( n.nodeValue && n.nodeValue.match(/\$|\\\)|\\\]/) ){ 
	var rs = new Array(4); 
	rs[0] = /(^[\s\S]*?)\$\$([\s\S]+?)\$\$([\s\S]*)/m; 
	rs[1] = /(^[\s\S]*?)\\\[([\s\S]+?)\\\]([\s\S]*)/m; 
	rs[2] = /(^[^\$]*?)\$([^\$]+?)\$([\s\S]*)/m;  
	rs[3] = /(^[\s\S]*?)\\\(([\s\S]+?)\\\)([\s\S]*)/m;
	var i;
	for( i=0; i<4; i++ ){
	    var r = rs[i];
	    if( n.nodeValue.match( r ) ){
		s = r.exec( n.nodeValue ); 
		n.nodeValue = '';
		var t3 = document.createTextNode( s[3] ); 
		n.parentNode.insertBefore( t3, n );
		var a = new Array(2);
		a = va_rm2( s[2] ); 
		var i2 = document.createElement('img'); 
		i2.src = a[0];
		i2.alt = a[1];
		i2.title = a[1];
		var p = a[1];
		var bb = va_co(p);
		i2.style.verticalAlign = "-" + bb + "px";
		if( i<2 ){
		    i2.style.display = "block";
		    i2.style.marginTop = "10px";
		    i2.style.marginBottom = "10px";
		    i2.style.marginLeft = "auto";
		    i2.style.marginRight = "auto";
		}
		i2.addEventListener('dblclick', va_rt, false);
		n.parentNode.insertBefore( i2, t3 );
		var t1 = document.createTextNode( s[1] ); 
		n.parentNode.insertBefore( t1, i2 );
		n = t3;
		va_won( n ); 
	    }
	}
    }
}
function va_iwl( e ){
    if( e.innerHTML.match(/\$|\\\)|\\\]/) ){ 
	va_ftn( e ); 	
	var w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null, false);
	while( w.nextNode() ){
	    va_won( w.currentNode );
	}
    }
}
function va_ftn( e ){
    var w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null, false);
    while( w.nextNode() ){
	var c = w.currentNode;
	var p = c.previousSibling;
	if( p && (p.nodeType == 3) ){
	    p.nodeValue = p.nodeValue + c.nodeValue;
	    p.parentNode.removeChild( c );
	}
    }
}
function va_te(){ 
    var c = document.getElementsByClassName("kf"); 
    if ( c.length > 0 ){
	var cl = document.getElementsByClassName("kl"); 
	for( var i = 0; i < cl.length; i++ ){
	    if( cl[i].innerHTML.match(/\$|\\\)|\\\]/) ){
		    va_iwl( cl[i] );
		}
	}
	var cl2 = document.getElementsByClassName("kk"); 
	for( var i = 0; i < cl2.length; i++ ){
	    if( cl2[i].innerHTML.match(/\$|\\\)|\\\]/) ){
		    va_iwl( cl2[i] );
		}
	}
    }
}
setInterval( "va_te()", 3000 );  
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
t = t.replace( /MathJax\_/g, "MathJax+" );
t = t.replace( /\\\"\{?([AEIOUYaeiouy]{1})\}?/g, "\&$1uml;" );
t = t.replace( /\\\'\'\{?([AEIOUYaeiouy]{1})\}?/g, "\&$1uml;" );
t = t.replace( /\\\'\{?([ACEILNORSUYZacegilnorsuyz]{1})\}?/g, "\&$1acute;" );
t = t.replace( /\\\`\{?([AEIOUaeiou]{1})\}?/g, "\&$1grave;" );
t = t.replace( /\\\^\{?([ACEGHIJOSUWYaceghijosuwy]{1})\}?/g, "\&$1circ;" );
t = t.replace( /\\\~\{?([AINOUainou]{1})\}?/g, "\&$1tilde;" );
t = t.replace( /\\\.\{?([CEGIZcegostz]{1})\}?/g, "\&$1dot;" );
t = t.replace( /\\c\{([CGKLNRSTcklnrst]{1})\}/g, "\&$1cedil;" );
t = t.replace( /\\v\{([CDELNRSTZcdelnrstz]{1})\}/g, "\&$1caron;" );
t = t.replace( /\\H\{([OUou]{1})\}/g, "\&$1dblac;" );
t = t.replace( /\\k\{([AEIUaeiu]{1})\}/g, "\&$1ogon;" );
t = t.replace( /\\r\{([AUau]{1})\}/g, "\&$1ring;" );
t = t.replace( /\\u\{([AGUagu]{1})\}/g, "\&$1breve;" );
t = t.replace( /\\\=\{?([AEIOUaeiou]{1}?)\}/g, "\&$1macr;" );
t = t.replace( /\{\\L\}/g, "&#321;" );  
t = t.replace( /\{\\l\}/g, "&#322;" );  
t = t.replace( /\{\\ae\}/g, "\&aelig;" );
t = t.replace( /\{\\AE\}/g, "\&AElig;" );
t = t.replace( /\{\\oe\}/g, "\&oelig;" );
t = t.replace( /\{\\OE\}/g, "\&OElig;" );
t = t.replace( /\{\\o\}/g, "\&oslash;" );
t = t.replace( /\{\\O\}/g, "\&Oslash;" );
t = t.replace( /\{\\aa\}/g, "\&aring;" );
t = t.replace( /\{\\AA\}/g, "\&Aring;" );
t = t.replace( /\{\\ss\}/g, "\&szlig;" );
t = t.replace( /\_([a-zA-Z0-9\*]+)\\/g, "_$1 \\" );
t = t.replace( /\^([a-zA-Z0-9\*]+)\\/g, "^$1 \\" );
t = t.replace( /\_([a-zA-Z0-9\*]+)\&(l|g)t;/g, "_$1 \&$2t;" );
t = t.replace( /\^([a-zA-Z0-9\*]+)\&(l|g)t;/g, "^$1 \&$2t;" );
t = t.replace( /(R\^)(i|j|k|l|m|n|p|q|r)(f|g|\\)/g, "$1$2 $3" );
t = t.replace( /\\(A|B|C|D|E|F|G|H|I|K|L|M|N|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<b>$1</b>$2" );
t = t.replace( /\\b(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<b>$1</b>$2" );
t = t.replace( /\\bb(A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z)([^a-zA-Z])/g, "<b>$1</b>$2" );
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
t = t.replace( /&lt;-+ /g, " \&larr; " );
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
t = t.replace( /\\(Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega|alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|rho|sigma|tau|upsilon|phi|chi|psi|omega|forall|nabla|prod|sum|cap|cup|sim|cong|equiv|oplus|uplus|ominus|times|otimes|perp|lceil|rceil|lfloor|rfloor|ell|vee|frown|smile|sqcup|sqcap|odot|asymp|dagger)/g,
	       "\&$1;" );
t = t.replace( /([^a-zA-Z\&\\])(Alpha|Beta|Gamma|Delta|Epsilon|Zeta|Eta|Theta|Iota|Kappa|Lambda|Mu|Nu|Xi|Omicron|Rho|Sigma|Tau|Upsilon|Phi|Chi|Psi|Omega|alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|rho|sigma|tau|upsilon|phi|chi|psi|omega|forall|nabla|prod|sum|cap|cup|sim|cong|equiv|oplus|uplus|ominus|otimes|perp|lceil|rceil|lfloor|rfloor|ell|vee|frown|smile|sqcup|sqcap|odot|asymp|dagger)([^a-z])/g,
	       "$1\&$2;$3" );
t = t.replace( /\\langle/g, "\&#x2329;" );
t = t.replace( /\\rangle/g, "\&#x232a;" );
t = t.replace( /\\ast/g, "*" );
t = t.replace( /\\bullet/g, "\&bull;" );
t = t.replace( /\\ddagger/g, "\&Dagger;" );
t = t.replace( /\\bigtriangleup/g, "\&xutri;" );
t = t.replace( /\\prec/g, "\&pr;" );
t = t.replace( /\\succ/g, "\&sc;" );
t = t.replace( /\\not\\subsec/g, "\&nsub;" );
t = t.replace( /\\not\\supsec/g, "\&nsup;" );
t = t.replace( /\\subsec/g, "\&sub;" );
t = t.replace( /\\supsec/g, "\&sup;" );
t = t.replace( /\\sqsubseteq/g, "\&sqsube;" );
t = t.replace( /\\sqsupseteq/g, "\&sqsupe;" );
t = t.replace( /\\approx/g, "\&thkap;" );
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
t = t.replace( /\\ll/g, "&Lt;" );
t = t.replace( /\\gg/g, "&Gt;" );
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
t = t.replace( /MathJax\+/g, "MathJax_" );
    t = t.replace( /gmail<sub>quote<\/sub>/g, "gmail_quote" );
    t = t.replace( /id="q-([a-z0-9]+)-([0-9]+)"/g, 'id=\"q_' + "$1_$2" + '\"' );
    t = t.replace( /(title|alt)=(\"[^\"]*\")/g, va_dta );
    e.innerHTML = t;
}
function va_fra(){
    var d = new Array();
    var e = document.getElementsByClassName("LW-avf");
    for( f=0; f<e.length; f++ ) d.push( e[f] );
    var a = document.getElementsByClassName("Am Al editable");
    for( b=0; b<a.length; b++ ){
	var c = a[b].contentDocument;
	if( c ){
	    e = c.getElementsByClassName("LW-avf");
	    for( f=0; f<e.length; f++ ) d.push( e[f] );
	}
	c2 = a[b].firstChild;
	if( c2 ) c = c2.contentDocument;
	if( c ){
	    e = c.getElementsByClassName("LW-avf");
	    for( f=0; f<e.length; f++ ) d.push( e[f] );
	}
    }
    return d;
}
function va_gra(){
    d = va_fra();
    for( f=0; f<d.length; f++ ){
	e = d[f];
	e.blur();
	var x = e.scrollLeft;
	var y = e.scrollTop;
	va_go(e);
	e.scrollLeft = x;
	e.scrollTop = y;
    }
}
function va_tra(){
    d = va_fra();
    for( f=0; f<d.length; f++ ){
	e = d[f];
	va_iwl( e );
    }
}
function va_trif(event){ 
    var k = event.keyCode;
    if( k == 119 ){ 
	va_tra();
    }
    if( k == 120 ){ 
	va_gra();
    }
}
function va_alr(){
    d = va_fra();
    for( f=0; f<d.length; f++ ){
	e = d[f];
	if( ! e.className.match(/va_ar/) ){
	    e.className = e.className + ' va_ar';
	    e.addEventListener( "keyup", va_trif, false );
	    va_alrt( e );
	    if( e.parentNode.style.display == "block" ) va_rtp();
	}	    
    }
    va_te();
}
setInterval( "va_alr()", 3000 );  
function va_ts(){
    va_tra();
    if( !location.href.match(/view=btop/) ) 
	va_tr();
}
var va_in;
function va_bam(){
    if( va_am == 0 ){
	clearInterval( va_in );
    } else { 
	clearInterval( va_in );
	va_in = setInterval( "va_ts()", va_am * 1000 );  
    }
}
va_bam();
function va_bam2( e ){
    if( va_am == 0 ){
	clearInterval( va_in );
    } else { 
	clearInterval( va_in );
	va_in = e.setInterval( "va_ts()", va_am * 1000 );  
    }
}
function va_bam3(){
    var a = document.getElementsByClassName("Am Al editable");
    for( b=0; b<a.length; b++ ){
	var c = a[b].contentDocument;
	if( c ){
	    e = c.getElementsByClassName("LW-avf");
	    for( f=0; f<e.length; f++ ) va_bam2( e[f] );
	}
	c2 = a[b].firstChild;
	if( c2 ) c = c2.contentDocument;
	if( c ){
	    e = c.getElementsByClassName("LW-avf");
	    for( f=0; f<e.length; f++ ) va_bam2( e[f] );
	}
    }
}
if( !location.href.match(/view=btop/) ){
var path_to_mathjax = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
if( !document.getElementById('GmailTeX') ){
var va_version = '5.7.8';
var va_pdr = /[\r]{0,1}\n[ \t]*[\r]{0,1}\n/;
function va_sc(){ 
    var cst = 
	".math, .MathJax_Display, .MathJax, .MathJax .ms, .MathJax .mi,.MathJax .mn,.MathJax .mo { color:#000 }";
    var cs = document.getElementById("cs"); 
    if( cs ) cs.innerHTML = cst;
    else{
	cs = document.createElement("style");
	cs.id = "cs";
	cs.innerHTML = cst;
	document.getElementsByTagName("head")[0].appendChild( cs );	
    }
}
va_sc();
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
'bbA: "{\\\\mathbb A}",'+
'bbB: "{\\\\mathbb B}",'+
'bbC: "{\\\\mathbb C}",'+
'bbD: "{\\\\mathbb D}",'+
'bbE: "{\\\\mathbb E}",'+
'bbF: "{\\\\mathbb F}",'+
'bbG: "{\\\\mathbb G}",'+
'bbH: "{\\\\mathbb H}",'+
'bbI: "{\\\\mathbb I}",'+
'bbJ: "{\\\\mathbb J}",'+
'bbK: "{\\\\mathbb K}",'+
'bbL: "{\\\\mathbb L}",'+
'bbM: "{\\\\mathbb M}",'+
'bbN: "{\\\\mathbb N}",'+
'bbO: "{\\\\mathbb O}",'+
'bbP: "{\\\\mathbb P}",'+
'bbQ: "{\\\\mathbb Q}",'+
'bbR: "{\\\\mathbb R}",'+
'bbS: "{\\\\mathbb S}",'+
'bbT: "{\\\\mathbb T}",'+
'bbU: "{\\\\mathbb U}",'+
'bbV: "{\\\\mathbb V}",'+
'bbW: "{\\\\mathbb W}",'+
'bbX: "{\\\\mathbb X}",'+
'bbY: "{\\\\mathbb Y}",'+
'bbZ: "{\\\\mathbb Z}",'+
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
'iso: "{\\\\simeq}",'+
'reals: "{\\\\mathbb{R}}",'+
'm: "{\\\\mathfrak{m}}",'+
'p: "{\\\\mathfrak{p}}",'+
'Sp: "{\\\\operatorname{Sp}}",'+
'SL: "{\\\\operatorname{SL}}",'+
'GL: "{\\\\operatorname{GL}}",'+
'Ass: "{\\\\operatorname{Ass}}",'+
'Aut: "{\\\\operatorname{Aut}}",'+
'End: "{\\\\operatorname{End}}",'+
'Gal: "{\\\\operatorname{Gal}}",'+
'Gr: "{\\\\operatorname{Gr}}",'+
'gr: "{\\\\operatorname{gr}}",'+
'Pic: "{\\\\operatorname{Pic}}",'+
'Supp: "{\\\\operatorname{Supp}}",'+
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
 	'"HTML-CSS": { }'+
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
	'.MathJax { color: #000; font-size: 125% !important; white-space: normal; }'+
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
    '<tr><td><a title="TeX using MathJax or insert images hosted at CodeCogs"'+
    'onClick="va_ta()">rich math (F8)</a>'+ 
    '<tr><td><a title="TeX using simple HTML"'+
    'onClick="va_ga()">simple math (F9)</a>'+
    '<tr><td><a title="Like pressing F8 every N seconds" style="cursor:default">auto: </a>'+
    '<a name="va_am"'+
    'onClick="va_sam(0)">off</a>'+
    '&nbsp;&nbsp;<a name="va_am"'+
    'onClick="va_sam(1)">1</a>'+
    '&nbsp;&nbsp;<a name="va_am"'+
    'onClick="va_sam(2)">2</a>'+
    '&nbsp;&nbsp;<a name="va_am"'+
    'onClick="va_sam(3)">4</a>'+
    '&nbsp;&nbsp;<a name="va_am"'+
    'onClick="va_sam(4)">8</a>'+
    '<tr><td><a title="Format for outgoing images" style="cursor:default">images: </a>'+
    '<a title="GIF" name="va_if"'+
    'onClick="va_sif(0)">gif</a>'+
    '&nbsp;&nbsp;<a title="SVG" name="va_if"'+
    'onClick="va_sif(1)">svg</a>'+
    '<tr><td><a title="Show help"'+
    'onClick="va_ab()">help</a>'+
    '</tbody></table>';
function va_ta(){
    va_tr();
    va_tc();
    va_tra();
    va_alr();
}
function va_ga(){
    va_gre();
    va_gra();
    d = va_fra();
    for( f=0; f<d.length; f++ ){
	e = d[f];
	e.addEventListener( "keyup", va_trif, false );
    }
}	    
var va_ap = document.createElement('div');
va_ap.id = 'GmailtexAbbrevPanel';
va_ap.className = 'wa';
va_ap.style.display = 'none';
var va_af = 0; 
document.getElementsByTagName("body")[0].appendChild( va_ap);
function va_cap(){
    va_ap.style.display = 'none';
    va_af = 0;
}
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
    '<a style="float:left;" title="Created by VA (&copy;2010-13)" ' +
    'onClick="window.open(\'http://alexeev.org/gmailtex.html\')">v.' + va_version + '</a>' + "Powered by<br>" +
    '<a title="MathJax" style=" text-decoration:none;" onClick="window.open(\'http://www.mathjax.org\')">MathJax</a>' +
        ' and <a style="text-decoration:none;" title="CodeCogs Online LaTeX Equation Editor" onClick="window.open(\'http://www.codecogs.com/latex/eqneditor.php\')">CodeCogs</a>' +
    '</div>'+
    '</div><div class="nH"><div style="display: none;" class="b8 UC p1"><div class="J-J5-Ji"><div class="UD"></div><div class="vh"></div><div class="UB"></div></div></div></div></div></div></div></div>';
var va_cm = document.getElementsByClassName('aim')[0];
va_cp.style.fontSize = "125%";
if( ! va_cm ){
    va_cm = document.getElementsByClassName('T0 pp')[0];
    va_cp.style.fontSize = "100%";
}
if( ! va_cm ){ 
    console.log( "nowhere to attach GmailTeX panel" );
} else {
    var va_lms = va_cm.parentNode;
    va_lms.appendChild( va_cp );
    console.log( "attaching GmailTeX panel using div " + va_cm.className );
}
function va_tb(num){ 
    if(num == 1){ document.getElementById("va_bu").className = "pq TY";}
    else {document.getElementById("va_bu").className = "pq"; }
}
var va_st; 
function va_dit(){ 
    if( va_st == 1 ){
	document.getElementById("va_cpencl").className = "nH r pv";
	document.getElementById("va_cptble").style.display = "block";
    } else {
	document.getElementById("va_cpencl").className = "nH r pr";
	document.getElementById("va_cptble").style.display = "none";
    }
}
function va_tt(){
    if( va_st == 1 ){
	va_st = localStorage.va_fst = 0;
    } else {
	va_st = localStorage.va_fst = 1;
    }
    va_dit();
}
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
function va_sat(num){ 
    var is = document.getElementsByName("va_at");
    for( var i=0; i<is.length; i++ ){
	if( i == 1-num ) is[i].style.fontWeight = "bold";
	else is[i].style.fontWeight = "normal";
    }
    va_at = num;
}
va_sat( va_at );
function va_sif(num){ 
    var is = document.getElementsByName("va_if");
    for( var i=0; i<is.length; i++ ){
	if( i == num ) is[i].style.fontWeight = "bold";
	else is[i].style.fontWeight = "normal";
    }
    va_if = num;
    if(typeof(Storage)!=="undefined") localStorage.va_fif = num;
    va_sbp( va_if );
}
va_sif( va_if );
function va_sam(num){ 
    var is = document.getElementsByName("va_am");
    for( var i=0; i<is.length; i++ ){
	if( i == num ) is[i].style.fontWeight = "bold";
	else is[i].style.fontWeight = "normal";
    }
    if( num == 0 ) va_am = 0;
    if( num == 1 ) va_am = 1;
    if( num == 2 ) va_am = 2;
    if( num == 3 ) va_am = 4;
    if( num == 4 ) va_am = 8;
    if(typeof(Storage)!=="undefined") localStorage.va_fam = num;
    va_bam();
}
va_sam( va_am );
var va_fst;
if(typeof(Storage)!=="undefined"){
    va_fst = localStorage.va_fst;
}
if ( va_fst ) va_st = va_fst;
else va_st = 1; 
va_dit();
function va_fy(obj) { 
    var curtop = 0;
    if (obj.offsetParent) {
	do {
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return curtop;
    }
}
var va_dl, 
    va_dld, 
    va_ib, 
    va_pp, 
    va_mc, 
    va_wd, 
    va_vd, 
    va_rh;
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
function va_toew( e ){
    e = va_fe( e );
    var t = e.innerHTML;
    t = t.replace( /(\$\$[^$]*\$\$)/g, va_rdd );
    t = t.replace( /(\$[^$]*\$)/g, va_rsd );
    t = t.replace( /\\\[([^\]]*?)\\\]/g, va_rdd );
    t = t.replace( /\\\(([^\)]*?)\\\)/g, va_rsd );
    e.innerHTML = t;
}
var va_fanf = 1;
function va_tc(){ 
    if( !document.getElementById('va_pp') ){
	va_ib = document.getElementsByClassName("aXjCH")[0];
	if( document.getElementsByClassName("Ar Au")[0] &&
	    document.getElementsByClassName("Ar Au")[0].style.display == "block"  ) {
	    va_tra();
	    d = va_fra();
	    for( f=0; f<d.length; f++ ){
		e = d[f];
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
	    if( !va_sd[0] ) return;
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
    if( typeof va_wd === "undefined" ){ return; }
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
		if( typeof s === "undefined" ) return;
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
    for( var i=0; i<es.length; i++ )
	if( ! es[i].className.match("va_ar") )
	    if( va_en == 1 ){
		va_toel( es[i] );
	    } else va_toew( es[i] );
}
function va_gre(){ 
    var es = document.getElementsByClassName('ii gt'); 
    for( var i=0; i<es.length; i++ )
	va_go( es[i] );
}
function va_fe( e ){ 
    var t = e.innerHTML;
    t = t.replace(/<br>/g,"\n");
    t = t.replace(/<\/?wbr>/g,"");
    t = t.replace(/\n\n/g,"<br>");
    e.innerHTML = t;
    return e;
}
function va_toel( e ){ 
    if( e.innerHTML.match(/\$|\\\)|\\\]/) ){ 
	e = va_fe( e );
	if( va_qu ){
	    va_qu.Push( ["Typeset",MathJax.Hub, e] );
	    va_qu.Push( function(){ 
		e.className = 'va_ar ' + e.className;
	    } );
	}
    }
}
function va_ab(){
va_ap.innerHTML = 
    '<div class="wc" role="alert" tabindex="-1">'+
    '<table cellpadding="0" class="cf wd" style="border-top: 0px; font-weight:normal;">'+
    '<tbody>'+
    '<tr>'+
    '<td class="Dn" align="left" width="60%">'+
    '<h2><font color="#DDDD00">Rich math (F8)</font></h2>'+
    '<div style="padding-left:2em; padding-right:2em; text-align=left;">'+
    'Clicking this menu item or pressing F8 while reading or composing an email typesets LaTeX formulas, '+
    'which should be enclosed in <font color="#DDDD00">$...$</font> or <font color="#DDDD00">\\(...\\)</font> for inline math and '+
    'in <font color="#DDDD00">$$...$$</font> or <font color="#DDDD00">\\[...\\]</font> for displayed math. '+
    'In the outgoing messages, formulas are replaced by images. Double-clicking on an image turns it back into text. '+
    '<br><br>If you are composing using new Compose/Reply, make sure you are NOT in "Plain text mode"!'+
    '</div>'+
    '<h2><font color="#DDDD00">Simple math (F9)</font></h2>'+
    '<div style="padding-left:2em; padding-right:2em; text-align=left;">'+
        'Clicking this menu item or pressing F9 while reading or composing an email replaces LaTeX formulas by simple HTML (subscripts, superscripts, Greek letters, etc). Only a subset of LaTeX is supported but the formulas do not need to be enclosed in <font color="#DDDD00">$...$</font>, etc. Also handles TeX accents, e.g. H\\\'el\\\`ene.'+
    '<br><br>Tip: if you have trouble exiting the subscript/superscript mode, use the button "Remove Formatting" from Gmail HTML editor\'s toolbar.'+    
    '</div>'+
    '<h2><font color="#DDDD00">Auto mode: off 1 2 4 8</font></h2>'+
    '<div style="padding-left:2em; padding-right:2em; text-align=left;">'+
    'Equivalent to letting GmailTeX press F8 every N seconds (N=1,2,4, or 8).'+
    '</div>'+
    '<h2><font color="#DDDD00">Images: gif svg</font></h2>'+
    '<div style="padding-left:2em; padding-right:2em; text-align=left;">'+
    'Choose format for outgoing images.'+
    '</div>'+
    '<h2><font color="#DDDD00">GmailChat</font></h2>'+
    '<div style="padding-left:2em; padding-right:2em; text-align=left;">'+
    'Just include your math in <font color="#DDDD00">$...$</font> or <font color="#DDDD00">$$...$$</font>. It should automatically show upon entering.'+
    '</div>'+
    '<br><br>'+
    '<center><font color="#DDDD00">(Click anywhere here to close)</font></center>'+
    '</td>'+
    '<td width="1" bgcolor="white"><br></td>'+
    '<td class="Dn" align="center" width="40%">'+
    '<h2>Help with LaTeX</h2>'+
    '<div style="padding-left:2em; padding-right:2em; text-align=left;">'+
    'Novice users may find <a href="http://www.codecogs.com/latex/eqneditor.php" style="color:#FFFFFF;">CodeCogs Online LaTeX Equation Editor</a> to be useful. '+
    '</div>'+
    '<h2>Common LaTeX commands</h2>'+
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
    '<td align="left"> \\alpha, \\beta, \\Gamma, \\Delta...</td></tr>'+
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
    '<br><h2>Abbreviations supported<br> by GmailTeX</h2>'+
    '<table cellpadding="0" class="cf">'+
    '<tbody>'+
    '<tr><td align="right"><font color="#DDDD00">\\bA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbb A, etc.</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\bfA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathbf A, etc.</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\cA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathcal A, etc.</td></tr>'+
    '<tr><td align="right"><font color="#DDDD00">\\fA</font> </td>'+
    '<td>&nbsp;&nbsp;</td>'+
    '<td align="left"> \\mathfrak A, etc.</td></tr>'+
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
GmailTeX = document.createElement('div');
GmailTeX.id = 'GmailTeX';
GmailTeX.style.display = 'none';
document.getElementsByTagName('head')[0].appendChild( GmailTeX );
} else { alert("GmailTeX is already running. If it is really not running, reload Gmail and try again.") }
}
