var REQs  = 1;
var start = 0;

/* Load effect setting from localStorage */
var effect;
chrome.extension.sendRequest(
	{
		name: "getSettings"
	},
	handle
);

/* Listen for mouseup && keyup events */
document.addEventListener("mouseup",	search, false);
document.addEventListener("keyup", 		search, false);

/* query, selection object */
var q = {
	query: "",
	definition: "",
	same_position: true,
	lastX: 0,
	lastY: 0,
	lock: true,
	get: function() {
		return this.query;
	},
	current: function() {
		return window.getSelection().toString().replace(/(\n|\r|\s)+$/, '');
	},
	set: function(e) {
		this.same_position = (Math.abs(e.pageX-this.lastX) < 30 && Math.abs(e.pageY-this.lastY) < 30);
		this.lastX = e.pageX ? e.pageX : this.lastX;
		this.lastY = e.pageY ? e.pageY : this.lastY;
		if(this.current() != "")
		{
			this.query = this.current();
		}
		if((this.current() == "" && this.get() == "") ||
			 (this.same_position == false && e.target.getAttribute("kind") != "container"))
		{
			this.lock = true;
		}
	},
	reset: function() {
		this.query = "";
		this.same_position = true;
		this.lock = true;
	},
	isNewDefinition: function() {
		if(this.definition != this.query) {
			this.definition = this.query;
			return true;
		} else {
			return false;
		}
	}
}

/* Timer function to prevent multiples click */
var delay;
function timer() {
	q.lock = true;
	clearTimeout(delay);
	delay = setTimeout(
		function(){
			q.lock = false;
		},
		330
	);
}

/* Messagebox */
function display(message) {
	$("#gis__message").text(message);
	$("#gis__message").slideDown("fast");
	setTimeout(
		function() {
			$("#gis__message").slideUp("fast");
		},
		1500
	);
}

/* Build containers */
function build_containers() {
	$(document.body).append('<div id="gis__c" kind="container"></div><div id="gis__t"></div><div id="gis__message"></div><div id="gis__preload"></div>');
}

/* Add html container */
$(document).ready( build_containers() );

/* Do a search */
function search(e) {	
	/* Do not search if key down, except esc, keyCode:86(v) show in google image */
	if(e.type == "keyup" && e.keyCode != 27 && e.keyCode != 86) return;
	
	/* Make sure that containers are there */
	if($("#gis__c").length <= 0) build_containers();
	
	var kind = e.target.getAttribute("kind");
	
	/* Update selected Text */
	q.set(e);
	
	// console.log("q.same_pos:"+q.same_position+",q.lock:"+q.lock+",q.current():"+q.current()+",q.get():"+q.get())
	
	/* Start timer to prevent multiples click */
	if(q.lock == true) timer();
	
	/* Open image or definition links if clicked on the right place */
	var boldClicked = (e.target.nodeName.toLowerCase() == "b" && e.target.parentNode.getAttribute("kind"));
	if( kind == "note" || kind == "definition" || boldClicked || (e.keyCode == 86 && $("#gis__c").is(":visible")) )
	{
			var url = e.keyCode == 86 ? "http://www.google.com/images?&q="+q.get()
											 : boldClicked ? e.target.parentNode.getAttribute("url")
											 							 : e.target.getAttribute("url");
			chrome.extension.sendRequest(
				{
					name:"openUrl",
					url:""+ url
				}
			);
			return;
	}
	
	/* Do a definition search */
	if(e.keyCode == 27 && $("#gis__c").is(":visible"))
	{
		// console.log("Get Definitions");
		if($("div[kind='definition']",$("#gis__c")).length > 0) {
			getImages();
		} else {
			getDefinitions();
			start = 0; // Force search image from page 1
			$("#gis__preload").empty();
		}
		return;
	}
	
	/* Do no search, if mouse position changed */
	if( (q.same_position == false && kind != "container") ||
			 q.lock == true ||
			(q.current() == "" && q.get() == "") )
	{
		$("#gis__c").slideUp(
			"fast",
			function(){
				$("#gis__c").empty();
				$("#gis__preload").empty();
			}
		);
		
		/* Set start to search from page 1 */
		start = 0;
		q.reset();
		return;
	}
	
	/* Do search images */
	if(e.type == "mouseup")
	{
		// console.log("Get Images");
		getImages();
	}
}


/* Fetch definition from google */
function getDefinitions(allways_load) { // workaground for context-menu
	if(q.isNewDefinition() || allways_load) {
		/* Fetch only if the query has changed */
		chrome.extension.sendRequest(
			{
				name:"getDefinitions",
				query:""+q.get()
			},
			handle
		);
	}
	else {
		/* Fill container's content with last definitions */
		if( !$("#gis__t").is(":empty") ) $("#gis__c").html( $("#gis__t").html() );
		else {
			display("No definition found!");
		}
	}
}

/* Fetch images from google */
function getImages() {
	/* Empty the container if it contains definitions */
	if($("div[kind='definition']",$("#gis__c")).length > 0) $("#gis__c").empty();
	for(var page = 0; page < REQs; page++) {			
		start = start + page * 4 + 4;
		
		/* Fill main container with preloaded data if data available */
		if(!$("#gis__preload").is(":empty")) {
			$("#gis__c").prepend($("#gis__preload").html());
			$("#gis__preload").empty();
			/* Fade the new images */
			if(effect) {
				$("#gis__c > span:first > div").each(
					function(index){
						var el = this;
						$(el).css("opacity",0.1);
						setTimeout(
							function(){
								$(el).animate({"opacity":1}, "fast");
							},
							index*35
						);
					}
				);
			}
		}
		
		/* tell backgroundpage to make request */
		chrome.extension.sendRequest(
			{
				name: "getImages",
				query: ""+ q.get(),
				start: ""+ (start-4)
			},
			handle
		);
	}
}

/* Handle */
function handle(response){
	if(response.name == "definitions") {
		/* Show status if no result */
		if(response.message.length <= 0) {
			display("No definition found!");
			return;
		}
		/* Put results in boxes */
		var data = "";
		for(var i = 0; i < response.message.length; i++) {
			data = '<div url="'+response.message[i].url+'" kind="definition" class="gis__d">'+ response.message[i].definition +'</div>'+ data;
		}
		/* Fill container's content with definitions */
		$("#gis__c").html(data);
		$("#gis__t").html(data);
		/* Show container */
		$("#gis__c").slideDown("fast");
	}
	else if(response.name == "images") {
		/* Parse response as json */
		var json = JSON.parse(response.message);
		if(json.responseData) {
			/* Make html container for each images, but only if there are json data */
			var shortcut = json.responseData.results;
			/* Show status if no results */
			if(shortcut.length <= 0) {
				display("No image found!");
				return;
			}
			
			/* Display results */
			var data = "";
			for(var i = 0; i < shortcut.length; i++) {
				data ="<div kind='image' onmouseover=\"this.firstChild.style.display='block'\" onmouseout=\"this.firstChild.style.display='none'\" onmousedown=\"return false\" class='gis__ic'>"+
								"<div url='"+ shortcut[i].unescapedUrl +"' kind='note' class='gis__n' style='width:"+ shortcut[i].tbWidth +"px !important; height: "+ shortcut[i].tbHeight +"px !important'>"+ shortcut[i].title +"</div>"+
								"<img class='gis__i' kind='image' style='width:"+ shortcut[i].tbWidth +"px !important; height: "+ shortcut[i].tbHeight +"px !important' src='"+ shortcut[i].tbUrl +"' />"+
							"</div>"+data;
			}
			data = '<span id="gis__i'+ start +'">' + data + '</span>';
			
			/* Fill preload-container with formated data */
			$("#gis__preload").prepend(data);
			
			/* Begin of preload when container is empty */
			if($("#gis__c").is(":empty")) getImages();
		} else {
			/* Set start to search from page 1 */
			start  = 0;
			/* Empty preload-container to begin new cycle */
			$("#gis__preload").empty();
			/* Get Images from page 1 */
			getImages();
			/* Abort current process */
			return;
		}
		// Show container
		$("#gis__c").slideDown("fast");
	}
	else if(response.name == "settings") {
		effect = response.message.effect;
	}
	else if(response.name == "get_definitions") {
		/* Manuell set query */
		q.query = q.current();
		
		getDefinitions(true);
	}
	else {
		console.error("unknown action");
	}
}