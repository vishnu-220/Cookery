$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

$(document).ready(function(){
        $(".container").show();

    });

function authorize(){
	var name = document.getElementById("username").value;
	var pwd = document.getElementById("password").value;
	
	document.getElementById("username").value="";
	document.getElementById("password").value="";
	document.getElementById("username").focus();

	//forming route
	var sendURL = "http://localhost:3000/login/";
	sendURL = sendURL + name +"/"+pwd;
	console.log(sendURL);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var text=xhr.responseText;
			console.log(text);
			if(text == "valid_user"){
				alert(text);

				window.location.assign("homepage.html");

			}
			else{
				alert("invalid_user");	
				window.location.assign("http://localhost:3000");
			}			
		}
	}
	xhr.open("GET",sendURL,true);
	xhr.send();
}

function submit_form(){
	var username = document.getElementById("usernamesignup").value;
	var newpwd = document.getElementById("newpwdsignup").value;
	var conpwd = document.getElementById("conpwdsignup").value;
	
	document.getElementById("usernamesignup").value="";
	document.getElementById("newpwdsignup").value="";
	document.getElementById("conpwdsignup").value="";
	document.getElementById("usernamesignup").focus();

	
 if(username==""){
		alert("Fill Required input-Username !!");
		document.getElementById("usernamesignup").focus();
		return false;
	}
	if(newpwd==""){

		alert("Fill Required input-New password !!");
		document.getElementById("newpwdsignup").focus();
		return false;
	}
	
	if(conpwd==""){
		alert("Fill Required input-Confirm passowrd !!");
		document.getElementById("conpwdsignup").focus();
		return false;
	}
      var passw=  /^[A-Za-z]\w{7,14}$/;  
	if(!(conpwd.match(passw))&&(newpwd.match(passw)))  
	{   
	alert('password is weak!!!');  
	document.getElementById("newpwdsignup").focus();
	return false;  
	}  
	if(!(newpwd==conpwd))
	{
		alert("password doesnt matches!!!");
		document.getElementById("newpwdsignup").focus();
		return false;
	}
	 
	
      var sendURL="http://localhost:3000/signup/"+username+"/"+newpwd+"/"+conpwd;

		console.log(sendURL);

		var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log("User added!!!");	
					var text=xhr.responseText;
					console.log(text);
					alert(text);
				
			}
		};
		xhr.open("GET",sendURL,true);
		xhr.send();	
		window.location.assign('http://localhost:3000');

}
// $("#show_login").on('click',function(){
// 	alert("chg");
// 	$(".container").show();
// });
function getUsername(){
	
	var sendURL = "http://localhost:3000/getUsername/";
	console.log(sendURL);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			text=xhr.responseText;	
			
			document.getElementById("username-home").innerHTML=text;	
		}
	};
	xhr.open("GET",sendURL,true);
	xhr.send();
}

