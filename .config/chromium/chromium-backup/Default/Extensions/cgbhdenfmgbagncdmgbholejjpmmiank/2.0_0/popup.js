/*
Copyright (C) 2012 Cristian Perez (http://cpr.name)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function updateThickness()
{
	var newValue = document.getElementById('range_thickness').value;
	document.getElementById('label_thickness').innerHTML = '&nbsp;&nbsp;' + newValue + ' pixels';
	updateBarThickness(newValue);
	chrome.extension.sendMessage({"storage_set_thickness" : newValue});
}

function updateHighlighted()
{
	var newValue = document.getElementById('range_highlighted').value;
	if (newValue == 0)
	{
		document.getElementById('label_highlighted').innerHTML = 'Disabled';
	}
	else if (newValue == 1)
	{
		document.getElementById('label_highlighted').innerHTML = '&nbsp;&nbsp;1 video';
	}
	else
	{
		document.getElementById('label_highlighted').innerHTML = '&nbsp;&nbsp;' + newValue + ' videos';
	}
	chrome.extension.sendMessage({"storage_set_highlighted" : newValue});
}

function updateCaching()
{
	var newValue = document.getElementById('range_caching').value;
	var text = "Disabled";
	if (newValue == 1)
	{
		text = "5 minutes";
	}
	else if (newValue == 2)
	{
		text = "30 minutes";
	}
	else if (newValue == 3)
	{
		text = "1 hour";
	}
	else if (newValue == 4)
	{
		text = "2 hours";
	}
	else if (newValue == 5)
	{
		text = "6 hours";
	}
	else if (newValue == 6)
	{
		text = "12 hours";
	}
	else if (newValue == 7)
	{
		text = "24 hours";
	}
	document.getElementById('label_caching').innerHTML = '&nbsp;&nbsp;' + text;
	chrome.extension.sendMessage({"storage_set_caching" : newValue});
}

document.addEventListener('DOMContentLoaded', function()
{
	document.getElementById('range_thickness').addEventListener('change', updateThickness);
	document.getElementById('range_highlighted').addEventListener('change', updateHighlighted);
	document.getElementById('range_caching').addEventListener('change', updateCaching);
	
	chrome.extension.sendMessage({"storage_get_thickness" : "true"}, function(value)
	{
		document.getElementById('range_thickness').value = value;
		updateThickness();
	});
	chrome.extension.sendMessage({"storage_get_highlighted" : "true"}, function(value)
	{
		document.getElementById('range_highlighted').value = value;
		updateHighlighted();
	});
	chrome.extension.sendMessage({"storage_get_caching" : "true"}, function(value)
	{
		document.getElementById('range_caching').value = value;
		updateCaching();
	});
	
	document.getElementById('label_donate').addEventListener('mouseover', function()
	{
		this.style.textDecoration ='underline';
	});
	document.getElementById('label_donate').addEventListener('mouseout', function()
	{
		this.style.textDecoration ='none';
	});
	document.getElementById('label_donate').addEventListener('mouseout', function()
	{
		this.style.textDecoration ='none';
	});
	document.getElementById('label_donate').addEventListener('click', function()
	{
		chrome.tabs.create({url:chrome.extension.getURL("donate.html") + "?mode=support"});
	});
});

function updateBarThickness(newValue)
{
	updateCss(".ytrp_rb_bg_bottom", "height", newValue + "px");
	updateCss(".ytrp_rb_fg_like", "height", (newValue-1) + "px");
	updateCss(".ytrp_rb_fg_dislike", "height", (newValue-1) + "px");
}

function updateCss(theClass, element, value)
{
	for (var i = 0; i < document.styleSheets.length; i++)
	{
		document.styleSheets[i].addRule(theClass, element + ": " + value + ";");
		break;
	}
}
