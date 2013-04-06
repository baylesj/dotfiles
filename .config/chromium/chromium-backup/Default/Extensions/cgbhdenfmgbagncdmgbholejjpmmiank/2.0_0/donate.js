/*
Copyright (C) 2012 Cristian Perez (http://cpr.name)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Settings keys
var YTRP_COUNT_KEY = "YTRP_COUNT";

// Donate links:
// 0.5 https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CDHBNZDANXL6C
// 1   https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NT4QFLCNF5PUJ
// 2   https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ALUV2DL7VBFW8
// 5   https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HFQJ2L7U2TBQL
// 10  https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8CKB5DU259YXE
// 20  https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=T2QV2XWU36LY8
// 50  https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NLBXFYG777PAY
// 100 https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W739XCAMDV8AL
// 200 https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=32JLYMC35ARGA
// 500 https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LEQ45UXJEVFQC

// When the document loads
document.addEventListener('DOMContentLoaded', function()
{
	// Configure page according to mode (update or support)
	var mode = document.URL.split("?mode=")[1];
	if (mode == "update")
	{
		document.title = "Update successful - YouTube™ Ratings Preview";
		document.getElementById("p_title").innerHTML = "Update successful";
	}
	else if (mode == "support")
	{
		document.title = "Support YouTube™ Ratings Preview";
		document.getElementById("p_title").innerHTML = "Please support";
	}

	// Set bar count text if applies
	try
	{
		var count = parseInt(localStorage[YTRP_COUNT_KEY]);
		if (count > 0)
		{
			document.getElementById('label_count').innerHTML = "<br />Did you know that I have served you a total of <strong>" + ts(count) + "</strong> rating bars?";
		}
	}
	catch (err)
	{
	}
	
	// Donate amount range event
	document.getElementById('range_donate').addEventListener('change', function()
	{
		var value = document.getElementById('range_donate').value;
		var usd = 0.5;
		if (value == 1)
		{
			usd = 1;
		}
		else if (value == 2)
		{
			usd = 2;
		}
		else if (value == 3)
		{
			usd = 5;
		}
		else if (value == 4)
		{
			usd = 10;
		}
		else if (value == 5)
		{
			usd = 20;
		}
		else if (value == 6)
		{
			usd = 50;
		}
		else if (value == 7)
		{
			usd = 100;
		}
		else if (value == 8)
		{
			usd = 200;
		}
		else if (value == 9)
		{
			usd = 500;
		}
		var text = "$" + usd;
		if (value == 4)
		{
			text += " really?";
		}
		if (value == 5)
		{
			text += " really??";
		}
		if (value == 6)
		{
			text += " really!!??";
		}
		if (value == 7)
		{
			text += " must be kidding...";
		}
		if (value == 8)
		{
			text += " stop kidding...";
		}
		if (value == 9)
		{
			text += " NO BALLS";
		}
		document.getElementById('label_donate').innerHTML = text;
	});
	
	// Donate button event
	document.getElementById('button_donate').addEventListener('click', function()
	{
		var value = document.getElementById('range_donate').value;
		var link = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=";
		if (value == 0)
		{
			link += "CDHBNZDANXL6C";
		}
		else if (value == 1)
		{
			link += "NT4QFLCNF5PUJ";
		}
		else if (value == 2)
		{
			link += "ALUV2DL7VBFW8";
		}
		else if (value == 3)
		{
			link += "HFQJ2L7U2TBQL";
		}
		else if (value == 4)
		{
			link += "8CKB5DU259YXE";
		}
		else if (value == 5)
		{
			link += "T2QV2XWU36LY8";
		}
		else if (value == 6)
		{
			link += "NLBXFYG777PAY";
		}
		else if (value == 7)
		{
			link += "W739XCAMDV8AL";
		}
		else if (value == 8)
		{
			link += "32JLYMC35ARGA";
		}
		else if (value == 9)
		{
			link += "LEQ45UXJEVFQC";
		}
		window.open(link);
	});
	
});

// Formats the number with thousand separators
function ts(v)
{
	var val = v.toString();
	var result = "";
	var len = val.length;
	while (len > 3)
	{
		result = "," + val.substr(len - 3, 3) + result;
		len -= 3;
	}
	return val.substr(0, len) + result;
}