const canvas=document.getElementById("sketchpad");
const ctx=canvas.getContext("2d");
var canvasStack=[],frame=0,choice="color1",color="#000000",canredo=false;
document.getElementById(choice).style.border="2.5px solid #00ff00";
canvas.width=window.innerWidth,canvas.height=window.innerHeight;
const draw=function(event){ctx.lineTo(event.x,event.y),ctx.stroke();};
const begin=function(){canvas.addEventListener("mousemove",draw);};
const end=function(){canvas.removeEventListener("mousemove",draw),ctx.beginPath();};
const save=function()
{
	frame++;
	canredo=true;
	const canvasData=ctx.getImageData(0,0,canvas.width,canvas.height);
	canvasStack[frame]=canvasData;
	if(canvasStack.length>=50) canvasStack.shift(),frame--;
};
save();
const undo=function()
{
	if(frame>1) frame--,ctx.putImageData(canvasStack[frame],0,0),canredo=true;;
	ctx.strokeStyle=color;
};
const redo=function()
{
	if(!canredo) return;
	if(canvasStack[frame+1]!=undefined)
		frame++,ctx.putImageData(canvasStack[frame],0,0);
	ctx.strokeStyle=color;
};
const keydown=function(event)
{
	if(event.key=="y"&&event.ctrlKey==true) redo();
	if(event.key=="z"&&event.ctrlKey==true) undo();
};
const resize=function()
{
	const canvasData=ctx.getImageData(0,0,canvas.width,canvas.height),size=ctx.lineWidth;
	canvas.width=window.innerWidth,canvas.height=window.innerHeight;
	ctx.putImageData(canvasData,0,0),ctx.strokeStyle=color,ctx.lineWidth=size;
};
const choose_color=function(event)
{
	document.getElementById(choice).style.border="2.5px solid #000000";
	let button=event.target;
	choice=button.id,color=ctx.strokeStyle=button.style.backgroundColor;
	ctx.lineWidth=2.5;
	button.style.border="2.5px solid #00ff00";
};
const eraser=function()
{
	document.getElementById(choice).style.border="2.5px solid #000000";
	choice="eraser",ctx.strokeStyle="#ffffff",ctx.lineWidth=10;
};
const clear=function()
{
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	canredo=false,save();
};
const touchmove=function(event)
{
	event.preventDefault();
	var touch=event.touches[0];
	ctx.lineTo(touch.clientX,touch.clientY),ctx.stroke();
};
const touchend=function(event)
{
	canvas.removeEventListener("touchmove",touchmove)
	canvas.removeEventListener("touchend",touchend)
	ctx.beginPath();
};
const touchstart=function(event)
{
	canvas.addEventListener('touchmove',touchmove);
	canvas.addEventListener('touchend',touchend);
};
$(canvas).mousedown(begin),$(canvas).mouseup(end),$(canvas).mouseup(save),$(canvas).mouseleave(end);
canvas.addEventListener("touchstart",touchstart)
canvas.addEventListener('touchend',save)
addEventListener("resize",resize),addEventListener("keydown",keydown);
$(".palette").click(choose_color);
$("#eraser").click(eraser),$("#clear").click(clear);
$("#undo").click(undo),$("#redo").click(redo);
ctx.lineWidth=2.5;
ctx.fillStyle="#ffffff";