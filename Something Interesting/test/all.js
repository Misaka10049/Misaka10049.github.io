"use strict"
window.$=(id)=>{return document.getElementById(id)}
var logo=document.getElementsByClassName("logobox")[0]
var total=$("total")
var sub=document.getElementsByClassName("subject")
var stu=document.getElementsByClassName("stu")
var userinfo=$("info")
const resize=()=>{
	var width=(window.innerWidth-1077)/2
	if(width<70) width=70
	logo.style.width=width+"px"
}
addEventListener("resize",resize)
const point=(event)=>{
	if(!!event){
		var tar=event.currentTarget
		var name=tar.innerText
		var score=prompt("输入你该科的成绩：",tar.children[0].children[1].innerText)
		if(isNaN(score)){
			score=alert("输入无效！")
			return
		}
		tar.children[0].children[1].innerText=score
	}
	var tol=0
	for(var i=0;i<=7;i++)
		tol+=Number(sub[i].children[0].children[1].innerText)
	total.innerText=tol
	//console.log(tar)
}
for(var i=0;i<=7;i++)
	sub[i].addEventListener("click",point)
const info=(event)=>{
	if(!!event){
		var tar=event.currentTarget
		var text=prompt("输入你的信息：",tar.children[1].innerText)
		tar.children[1].innerText=text
	}
	var id=stu[1].children[1].innerText
	userinfo.innerText="姓名： "+stu[0].children[1].innerText+"  证件号码： "+id.slice(0,6)+"*".repeat(6)+id.substr(-4)
}
for(var i=0;i<=2;i++)
	stu[i].addEventListener("click",info)
const save=()=>{
	console.log("save!")
	var local=Object()
	for(var i=0;i<=2;i++)
		local[stu[i].children[1].id]=stu[i].children[1].innerText
	for(var i=0;i<=7;i++)
		local[sub[i].children[0].children[1].id]=sub[i].children[0].children[1].innerText
	localStorage.setItem("2023",JSON.stringify(local))
}
const load=()=>{
	var local=JSON.parse(localStorage["2023"])
	sub[0].children[0].children[1].innerText=local.chinese
	sub[1].children[0].children[1].innerText=local.math
	sub[2].children[0].children[1].innerText=local.english
	sub[3].children[0].children[1].innerText=local.physics
	sub[4].children[0].children[1].innerText=local.chemistry
	sub[5].children[0].children[1].innerText=local.politics
	sub[6].children[0].children[1].innerText=local.history
	sub[7].children[0].children[1].innerText=local.PE
	stu[0].children[1].innerText=local.name
	stu[1].children[1].innerText=local.id
	stu[2].children[1].innerText=local.school
	resize(),info(),point()
	setTimeout(()=>{alert("本网站使用方法：\n分别点击学科、学生姓名、报名号、毕业学校，输入对应信息\n")},100)
}
addEventListener("load",load())
setInterval(save,5000)