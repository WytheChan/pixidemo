
/**
 *截取url的参数
 *
 * @param {string} name  要截取的参数名
 * @returns
 */
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//打印调试
var log=console.log.bind(console);

// 手机号验证
function isPhone(phone){
    var phoneReg=/^1[3|4|5|6|7|8|9]\d{9}$/;
    var ok=false;
    if(phoneReg.test(phone)){
        ok=true
    }
    return ok
}

/**
 *监听手机屏幕状态，要在手机上才有用
 *
 */
function hengshuping(){
    if(window.orientation==180||window.orientation==0){
    // alert("竖屏状态！")
    $('.remind-box').hide()
    }
    if(window.orientation==90||window.orientation==-90){
    // alert("建议竖屏状态下体验！")
    $('.remind-box').show()
    
    }
}
// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); 

//设置rem  50px
function setRem() {
    var cw=document.body.clientWidth || document.documentElement.clientWidth;
    document.getElementsByTagName("html")[0].style.fontSize = cw / 7.5 + "px";
};

/**
 *获取元素的距离屏幕的宽高信息
* @param {string} cls 传入元素的class或id
* @returns
*/
function getPos(cls){
    var pos={
        x:0,
        y:0,
        w:0,
        h:0
    }
    var obj=document.querySelector(cls);
    var left=obj.getBoundingClientRect().left;  //到左边距离
    var top=obj.getBoundingClientRect().top;   //到顶部距离
    var width=obj.offsetWidth;  //元素宽度
    var height=obj.offsetHeight; //元素高度
    var right=obj.getBoundingClientRect().right;  //到右边距离

    pos.x=left
    pos.y=top
    pos.w=width
    pos.h=height
    pos.r=right

    return pos
}

/**
 *
 *
 * @param {arr} imgSrc  imgSrc参数是页面中要预加载的图片的路径数组，如imgSrc=['img/xx.png','img/xxx.png'...]
 * @param {function} callback  callback就是你加载完图片之后要执行的函数
 * @returns
 */
function perload(imgSrc,callback) {　　
    var imgs = [];
    var c = 0;
    for (var i = 0; i < imgSrc.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = imgSrc[i];
        imgs[i].onload = function(){
            c++
            if(c == imgSrc.length){
                if(callback){
                    callback();
                }
            }
        }
    }
    return imgs;　　//返回加载的图片列表，这个省略也没有问题
}

/**
 * 移动端禁止页面滚动
 * 
 * @returns {object} 
 */
function stopScroll(){
    var html=document.getElementsByTagName('html')[0];
    var body=document.getElementsByTagName('body')[0];
    var o={};
    o.can=function(){
        html.style.overflow="visible";
        html.style.height="auto";
        body.style.overflow="visible";
        body.style.height="auto";
    },
    o.stop=function(){
        html.style.overflow="hidden";
        html.style.height="100%";
        body.style.overflow="hidden";
        body.style.height="100%";
    }
    return o
}

/**
 * 页面后退时触发的事件
 * 
 * @param {function} callback 
 */
function unload(callback){
    pushHistory();  
    var bool=false;  
    setTimeout(function(){  
            bool=true;  
    },1500);  
    window.addEventListener("popstate", function(e) {  
        if(bool)  
        {  
                callback()//根据自己的需求实现自己的功能  
        }  
        pushHistory();  
            
    }, false);  
    function pushHistory() {  
        var state = {  
            title: "title",  
            url: "#"  
        };  
        window.history.pushState(state, "title", "#");  
    }  
}


/**
 *禁止出现右键菜单，移动端防止微信长按出现菜单
 *
 */
function contextmenu(){
    $(document).on('contextmenu', function(e){
        e.preventDefault();
    });
}


/**
 *@desc 自动播放音乐
 *
 * @param {dom} dom  直接的dom，不是JQ对象
 */
function autoPlay(dom){
    if(window.WeixinJSBridge){
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                dom.play();
            }, false);
        }else{
            document.addEventListener("WeixinJSBridgeReady", function() {
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                dom.play();
            });
        }, false);
    }
}


/**
 *点击停止或播放音乐
 *
 */
function musicPlay(){
    $('.music-box').on('touchend',function(){
        var music=$('#music').get(0)
        if($(this).hasClass('stop')){
            $(this).removeClass('stop')
            music.play()
        }else{
            $(this).addClass('stop')
            music.pause()
        }
    })
}

//对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {
    //alert(img);
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = img.height;
    var width = img.width;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}


/**
 *旋转iphone拍照变横后的照片
 *
 * @param {*} o 传入当前的input type=file，一般在change事件里传入this 
 * @param {*} callback 回调函数，照片旋转后执行的事件
 * @returns
 */
function rotatePhoto(o,callback){
    var file=o.files[0];
    // $('.loading').show()
    var Orientation = null;
    if (file) {
        console.log("正在上传,请稍后...");
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
        if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);
            return;
        }
        // var URL = URL || webkitURL;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
            // alert(EXIF.pretty(this));
            EXIF.getAllTags(o);
            //alert(EXIF.getTag(this, 'Orientation'));
            Orientation = EXIF.getTag(o, 'Orientation');
            //return;
        });
        var oReader = new FileReader();
        oReader.onload = function(e) {
            //var blob = URL.createObjectURL(file);
            //_compress(blob, file, basePath);
            var image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;
                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var u = navigator.userAgent;
                //修复ios
                if (u.match(/iphone/i)) {
                    console.log('iphone');
                    //如果方向角不为1，都需要进行旋转 added by lzk
                    if(Orientation != "" && Orientation != 1){
                        console.log('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                console.log('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                console.log('需要逆时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                console.log('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }
                    }
                    //base64 在外定义为全局变量
                    //下面base64为得到旋转后的base64图片
                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                    var type = 'jpeg';
                    var fixtype = function (type) {
                        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
                        var r = type.match(/png|jpeg|bmp|gif/)[0];
                        return 'image/' + r;
                    };
                    base64 = base64.replace(fixtype(type), 'image/jpeg');
                    // saveFile(base64, '111')  此处是如果想要保存当前图片到本地的话;
                    //这里是把已经旋转过的图片路径赋值到img中
                    callback(base64)
                    
                }  else if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
                    
                    //如果安卓收到ios拍摄的照片，可以按PC端方式判断
                    callback(e.target.result)

                }
                else{
                    //修复PC端上上传ios拍出来的图片
                    if(Orientation != "" && Orientation != 1){
                        //alert('旋转处理');
                        switch(Orientation){
                            case 6://需要顺时针（向左）90度旋转
                                console.log('需要顺时针（向左）90度旋转');
                                rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                console.log('需要逆时针（向右）90度旋转');
                                rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                console.log('需要180度旋转');
                                rotateImg(this,'right',canvas);//转两次
                                rotateImg(this,'right',canvas);
                                break;
                        }
                    } 
                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                    var type = 'jpeg';
                    var fixtype = function (type) {
                        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
                        var r = type.match(/png|jpeg|bmp|gif/)[0];
                        return 'image/' + r;
                    };
                    base64 = base64.replace(fixtype(type), 'image/jpeg');
                    callback(base64)
                }

            };

        };
        oReader.readAsDataURL(file);
    }
    // if(!o.files.length>0){
    //     $('.loading').hide()
    // }
}

/**
 *获取元素的距离屏幕的宽高信息
 * @param {string} cls 传入元素的class或id
 * @returns
 */
function getPos(cls) {
    var pos = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }
    var obj = document.querySelector(cls);
    var left = obj.getBoundingClientRect().left; //到左边距离
    var top = obj.getBoundingClientRect().top; //到顶部距离
    var width = obj.getBoundingClientRect().width; //元素宽度
    var height = obj.getBoundingClientRect().height; //元素高度
    var right = obj.getBoundingClientRect().right; //到右边距离

    pos.x = left
    pos.y = top
    pos.w = width
    pos.h = height
    pos.r = right

    return pos
}


/**
 * 把图片处理成圆形,如果不是正方形就按最小边一半为半径处理
 * @param  {object} imgObj 图片(img)对象
 * @param  {number} imgType 设置生成图片的大小：0设置生成的图片大小是以图片设置的css大小为准，1设置生成的图片大小是以图片分辨率为准，默认值为0
 * @return {string}     return base64 png图片字符串
 */
function circle_img(img, imgType) {
    var type = imgType || 0;
    var radius, diameter, canvas, ctx, natural;
    if (type) {
        if (img.naturalWidth > img.naturalHeight) {
            radius = img.naturalHeight / 2;
        } else {
            radius = img.naturalWidth / 2;
        }
    } else {
        if (img.width > img.height) {
            radius = img.height / 2;
        } else {
            radius = img.width / 2;
        }
        if (img.naturalWidth > img.naturalHeight) {
            natural = img.naturalHeight;
        } else {
            natural = img.naturalWidth;
        }
    }
    diameter = radius * 2;
    canvas = document.createElement('canvas');
    if (!canvas.getContext) { // 判断浏览器是否支持canvas，如果不支持在此处做相应的提示
        console.log('您的浏览器版本过低，暂不支持。');
        return false;
    }
    canvas.width = diameter;
    canvas.height = diameter;
    contex = canvas.getContext("2d");
    contex.clearRect(0, 0, diameter, diameter);
    contex.save();
    contex.beginPath();
    contex.arc(radius, radius, radius, 0, Math.PI * 2, false);
    contex.clip();
    if (type) {
        contex.drawImage(img, 0, 0, diameter, diameter, 0, 0, diameter, diameter);
    } else {
        contex.drawImage(img, 0, 0, natural, natural, 0, 0, diameter, diameter);
    }
    contex.restore();
    return canvas.toDataURL('image/png');
}

/**
 *监听浏览器的后退事件
 *场景：苹果微信浏览器后退按钮
 */
function winBack(){
    window.onpopstate = function(event) { 
        // alert('退出页面')
        window.location.reload()
    };  
    //加入以下俩行代码，才能触发 onpopstate事件
    window.history.pushState('forward', null, '#'); 
    window.history.forward(1);
}