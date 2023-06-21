'use strict'
var left,right
window.width=window.innerWidth
function init(){
	var game={
		over: false,
		pxtonum(px){return Number(px.slice(0,-2))},
		ticker:
		{
			gun: 0,
			gu_shoot: 0,
			going: 0,
			spin: 0,
			clean(){
				clearInterval(this.gun)
				clearInterval(this.gu_shoot)
				clearInterval(this.going)
				clearInterval(this.spin)
			}
		},
		music:{
			allowed: true,
			play_time: 0,
			play_sound(num){
				if(!game.music.allowed) return
				var now=new Date(),mp3
				let play_time=game.music.play_time
				if(now-play_time<2000&&num==1) return
				play_time=now
				if(num==1) mp3=new Audio('cobalt.mp3')//创建音频对象
				else if(num==2) mp3=new Audio('ntmgzz.mp3')
				mp3.play()//播放
			}
		},
		cobalt:{
			itself: document.getElementById("cobalt"),
			face_changed: false,
			hurt_time: 0,
			rotate_deg: 0,
			hp: 500,
			death(){
				game.ticker.clean()
				game.over=true
			},
			move(x){
				this.itself.style.left=(x-75)+"px"
				game.progress.pro1.style.left=(x-120)+"px"
			},
			change_back(){
				game.cobalt.itself.src="gu.png"
				game.cobalt.face_changed=false
			},
			hurt(){
				var now=new Date()
				let itself=this.itself
				if(now-this.hurt_time<2000) return
				this.hurt_time=now
				itself.src="gu_hurt.png"
				this.face_changed=true
				setTimeout(this.change_back,1000)
			},
			spin(){
				let deg=this.rotate_deg,itself=this.itself
				deg=(deg+1)%360
				itself.style.transform="rotate("+deg+"deg)"
			},
			shoot(){
				var gu_x=pxtonum(game.cobalt.itself.style.left)
				var bullet=document.createElement("img"),tick=0
				bullet.style.position="absolute";
				bullet.style.width="25px",bullet.style.height="80px"
				bullet.style.left=(gu_x+75-12.5)+"px"
				bullet.style.bottom="525px"
				bullet.src="gu_bullet.png"
				document.body.append(bullet)
				const fly=function()
				{
					var x=pxtonum(bullet.style.left),y=pxtonum(bullet.style.bottom)
					bullet.style.bottom=(y-5)+"px"
					//var tank_x=pxtonum(image.style.left),tank_y=pxtonum(image.style.bottom)
					if(y<10||game.over) bullet.remove(),clearInterval(tick)
					//if(width/2-75<=x&&x<=width/2+75&&600<=y&&y<=650)
					//{
					//	bullet.remove(),clearInterval(tick),attacked++
					//	if(!hurted) hurt()
					//	if(attacked%100==0) play_sound(2)
					//	else if(attacked%40==0) play_sound(1)
					//}
				}
				tick=setInterval(fly,20)
			},
			going(){
				var x=pxtonum(game.cobalt.itself.style.left)+75-2
				if(x<left-120) x=right+120
				game.cobalt.move(x)
			}
		},
		tank:{
			attacked: 0,
			itself: document.getElementById("tank"),
			shoot: false,
			move(x)
			{
				if(x<=left+54) x=left+54
				if(x+54>right) x=right-54
				this.itself.style.left=(x-54)+"px"
			},
			gun(){
				if(!game.tank.shoot) return
				var bullet=document.createElement("img"),tick=0
				bullet.style.position="absolute";
				bullet.style.width="4px",bullet.style.height="25px"
				bullet.style.left=(pxtonum(game.tank.itself.style.left)+54-2)+"px"
				bullet.style.bottom="120px"
				bullet.src="bullet.png"
				document.body.append(bullet)
				const fly=function()
				{
					var x=pxtonum(bullet.style.left),y=pxtonum(bullet.style.bottom)
					bullet.style.bottom=(y+10)+"px"
					var gu=game.cobalt.itself
					var gu_x=pxtonum(gu.style.left),gu_y=pxtonum(gu.style.bottom),r=75
					if(y>width+10) bullet.remove(),clearInterval(tick)
					else if(gu_x<=x&&x<=gu_x+150)
					{
						let play=game.music.play_sound
						var goaly=(r**2-(r+gu_x-x)**2)**0.5
						var goal_y1=r-goaly+gu_y,goal_y2=r+goaly+gu_y
						if((y<goal_y1||y>goal_y2)&&!game.over) return
						bullet.remove(),clearInterval(tick),game.tank.attacked++
						game.cobalt.hp--
						game.progress.update()
						if(game.cobalt.hp<=0) return game.cobalt.death();
						if(!game.cobalt.hurted) game.cobalt.hurt()
						if(game.tank.attacked%100==0) play(2)
						else if(game.tank.attacked%40==0) play(1)
					}
				}
				tick=setInterval(fly,7.5)
			}
		},
		progress:{
			pro1: document.getElementsByClassName("g-container")[0],
			pro2: document.getElementsByClassName("g-progress")[0],
			update(){this.pro2.style.width=(game.cobalt.hp/500*100)+"%"}
		}
	}
	window.game=game
	window.pxtonum=game.pxtonum
}
init()
const resize=function()
{
	width=window.innerWidth
	left=(width-window.innerHeight/16*9)/2
	document.body.style.setProperty("--size",left+"px")
	right=window.innerWidth-left
	game.cobalt.move(width/2-75)
	game.tank.move(width/2-54)
}
addEventListener("load",resize)
const mousedown=function(event)
{
	game.tank.shoot=true
	addEventListener("mousemove",mousemove)
}
const mousemove=function(event){game.tank.move(event.x)}
const touchstart=function(event){
	game.tank.shoot=true
	addEventListener('touchmove',touchmove,{passive: false})
}
const touchend=function(event)
{
	game.tank.shoot=false
	removeEventListener("touchmove",touchmove)
}
const touchmove=function(event)
{
	event.preventDefault()
	var touch=event.touches[0]
	game.tank.move(touch.clientX)
}
const stop=function()
{
	game.tank.shoot=false
	removeEventListener("mousemove",mousemove)
}
game.cobalt.move(width/2)
addEventListener("resize",resize)
addEventListener("mousedown",mousedown),addEventListener("mouseup",stop),addEventListener("mouseleave",stop)
addEventListener("touchstart",touchstart),addEventListener('touchend',touchend)
game.ticker.gun=setInterval(game.tank.gun,50)
game.ticker.gu_shoot=setInterval(game.cobalt.shoot,2500)
game.ticker.going=setInterval(game.cobalt.going,10)
game.tank.move(width/2)