$("input").keydown(function(event){if(event.keyCode==13) login();});
$("button#login_button").click(function(){login();});
const login=function()
{
	var user=document.getElementById("username").value;
	var passwd=document.getElementById("password").value;
	if(users.includes(user))
	{
		var userid=users.indexOf(user);
		if(userid!=-1&&password[userid]==md5(passwd)&&base64_password[userid]==md5(btoa(passwd)))
		{
			$("span#at").text("Welcome, "+user+'!');
			var x=location.href;
			if(x.substr(x.length-9,x.length)=="sketchpad")
				setTimeout(function(){location.href="../sketchpad/";},3000);
		}
		else
			$("span#at").text("密码错误");
	}
	else
		$("span#at").text("用户未找到");
}
