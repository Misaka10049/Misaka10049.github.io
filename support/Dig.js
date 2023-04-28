// 每隔0.5s自动"顶一下"贺小鹏
function dig(){
    $.post('https://www.cqyz.cn/ajax.aspx',{cmd:'digg',aid:8013})
    console.log("ok")
}
var Dig=setInterval(dig,500)