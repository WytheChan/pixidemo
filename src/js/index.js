// 监听手机屏幕状态
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
    hengshuping()
    setRem()
}, false); 

//设置rem
setRem()
window.addEventListener('resize',setRem,false)

//长按不出现菜单
contextmenu()

//播放音乐
autoPlay($('#music').get(0))
musicPlay()