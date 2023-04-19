span=document.getElementById("time")
pro=document.getElementById("progress")
going=document.getElementById("going")
test=1686499200000// Date Mon Jun 12 2023 00:00:00 GMT+0800 (中国标准时间)
function time()
{
	now=new Date()

	past=now.getMilliseconds()/1000+now.getSeconds()+now.getMinutes()*60+now.getHours()*3600
	past/=86400/100
	past=String(past).slice(0,10)

	//remain=test-now
	//remain/=1000*60*60*24// ms->day
	//remain=String(remain)
	//if(remain.length<=18) remain+="0".repeat(18-remain.length)
	//span.innerText="距中考还剩 "+remain+" 天"

	remain=Object()
	remain.ms=test-now
	remain.day=Math.floor(remain.ms/86400000)
	remain.ms-=remain.day*86400000
	remain.hour=Math.floor(remain.ms/3600000)
	remain.ms-=remain.hour*3600000
	remain.min=Math.floor(remain.ms/60000)
	remain.ms-=remain.min*60000
	remain.sec=Math.floor(remain.ms/1000)
	remain.ms-=remain.sec*1000

	remain.ms=String(remain.ms)
	if(remain.ms.length<=3) remain.ms+="0".repeat(3-remain.ms.length)

	remain.sec=String(remain.sec)
	if(remain.sec.length<2) remain.sec="0"+remain.sec

	remain.min=String(remain.min)
	if(remain.min.length<2) remain.min="0"+remain.min

	remain.hour=String(remain.hour)
	if(remain.hour.length<2) remain.hour="0"+remain.hour
	span.innerText="距中考还剩 "+remain.day+" 天 "+remain.hour+":"+remain.min+":"+remain.sec+"."+remain.ms

	pro.style.width=4*past+"px"
	going.innerText=past+"%"
}
tick=setInterval(time,false)