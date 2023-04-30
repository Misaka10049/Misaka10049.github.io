// 每隔1s"顶一下"指定老师
(function(){
    var type="application/x-www-form-urlencoded"
    var loop=0,TeacherID=8013
    function dig(){
        fetch("https://www.cqyz.cn/ajax.aspx",{
            method:"post",
            body:"cmd=digg&aid="+TeacherID,
            headers:{
                "Content-Type": type
            }
        })
        loop++
        console.log("已顶"+loop+"次")
    }
    setInterval(dig,1000)
})()