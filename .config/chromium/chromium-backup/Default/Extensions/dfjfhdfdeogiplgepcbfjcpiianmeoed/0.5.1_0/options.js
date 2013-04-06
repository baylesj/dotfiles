

//Save the string to local storage 
function save_string() { 

    var str;

    var str=document.getElementById('txtmsg').value;
    localStorage['str']=str;

	show_notification("The Blocked Message updated !","Blocked Message");	



}

function save_string_diff() { 

    var str="This web page is blocked by administrator";

    document.getElementById('txtmsg').value="This web page is blocked by administrator";
    localStorage['str']=str;


    show_notification("The site set to the default messege","Blocked Message");	


}

function save_site(site){

if (site=='1'){

 localStorage['urlset']=1;
 localStorage['theurl']=document.getElementById("txturl").value;
 
	show_notification("The site saved sucessfully","Redirection site");	
	localStorage['siteblock_list']=localStorage['siteblock_list']+"\n+"+localStorage['theurl'];

}else{

 localStorage['urlset']=0;
show_notification("The site set to the default page","Redirection site");	

}


}


function save_options() {
  localStorage['siteblock_list'] = document.getElementById("siteblock_list").value;

  chrome.extension.getBackgroundPage().updatePaths();
	
  // Update status to let user know options were saved.
  show_notification("Site list sucessfully updated !,","Site List ");
}
function restore_options() {
  var list = localStorage['siteblock_list'];
  if (list !== undefined) {
      document.getElementById("siteblock_list").value = list;
  }
}


function changepass(){

		
		
		/*
		
			FUNCTION change password
			
			check the user entered old pasword with the local storage and change the password
			
			---------CHAnGE Notes ---------
			
			-------------------------------
			
		
		
		
		*/
		
		var old_password=localStorage['password']; 
		var user_enter_old_password=document.getElementById("txtpassword").value;
		var new_password=document.getElementById("txtnewpassword").value;
		var new_password2=document.getElementById("txtnewpassword2").value;
		
		
		if(user_enter_old_password==old_password)
		{
		
				if(new_password==new_password2)
				{
				
				localStorage['password']=new_password2;
				chrome.extension.getBackgroundPage().updatePaths();
				show_notification("Password changed sucessfully,","Password ");

				
				break;
			
				}
				else{
					alert("Password mismatch");
				}
			
		}
		else
		{
			alert("the current password you enterd is wrong !");
		}


}






function block_all() {
  localStorage['siteblock_list'] = "*";

  chrome.extension.getBackgroundPage().updatePaths();
	
  // Update status to let user know options were saved.
  var status = document.getElementById("status");

show_notification("Now the all sites now blocked !","All blocked");
  
}



function clear_all() {
  localStorage['siteblock_list'] = "";

  chrome.extension.getBackgroundPage().updatePaths();
	
  // Update status to let user know options were saved.
  var status = document.getElementById("status");

  
  show_notification("Now the all sites can be accessed ","All cleared");
  

}

function show_notification(heading,msg){

	  	  var notification = webkitNotifications.createNotification(
			  'settings.png',  // icon url - can be relative
			  msg,  // notification title
			  heading // notification body text
			);
			
			notification.show();
			
			
			setTimeout(function() {
            	notification.cancel();
				},         2750);

}


