addEventListener('touchstart',listener);
addEventListener('touchmove',listener);
addEventListener('touchend',listener);
addEventListener('mousedown',listener);
addEventListener('mouseup',listener);
//addEventListener('mousemove',listener);
document.body.addEventListener('mouseleave',listener);
addEventListener('keydown',listener);
 
function listener(event){
	var span=document.createElement("span")
	console.log(event)
	switch(event.type){
		case "touchstart":
			span.innerHTML="Touch Start (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")<br>";
			break;
		case "touchend":
			span.innerHTML="Touch End (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")<br>";
			break;
		case "touchmove":
			event.preventDefault();
			span.innerHTML="Touch Move (" + event.x + "," + event.y + ")<br>";
			break;
		case "mousedown":
			addEventListener('mousemove',listener);
			span.innerHTML="Mouse Down (" + event.x + "," + event.y + ")<br>";
			break;
		case "mouseup":
			removeEventListener('mousemove',listener);
			span.innerHTML="Mouse Up (" + event.x + "," + event.y + ")<br>";
			break;
		case "mousemove":
			span.innerHTML="Mouse Move (" + event.x + "," + event.y + ")<br>";
			break;
		case "mouseleave":
			span.innerHTML="Mouse Leave (" + event.x + "," + event.y + ")<br>";
			break;
		case "keydown":
			span.innerHTML="Key '"+event.key+"' Down <br>";
			break;
	}
	document.body.append(span)
	span.style.opacity=1;
	setInterval(function(){
		if(span.style.opacity>=0.2) span.style.opacity-=0.025;
		else span.remove()
	},50)
}