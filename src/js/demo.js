



/**
 *测试 kute.js 动画库
 *
 */
function kuteTest(){
    var kute=KUTE.to('.text',{
        // text:'阿发是否哈师大交话费发简历撒旦画缴费更合适',
        number:10,
        translateX:100,
        fontWeight:600,
    },{
        duration:2000
    })
    var kute2=KUTE.to('.text',{
        color:'#ff6400',
    },{
        duration:1000
    })
    
    $('#start').on('click',function(){
        kute.chain(kute2).start()
        var top=$('.text').scrollTop()
        if(top>0){
            KUTE.to('.text',{
                scroll: 0
            },{
                easing:'easingSinusoidalInOut'
            }).start()
        }
        
        
    })
    $('#stop').on('click',function(){
        kute.stop()
    })
}
kuteTest()


/**
 *测试tween.js动画库
 *
 */
function tweenTest(){
        var a=document.querySelector('.a');
        var position={
            x:0,
            y:0
        }
        var rotate={
            rotate:0
        }
        
        var tween1=new TWEEN.Tween(position)
        .to({
            x:200,
            y:200
        },1000)
        .onUpdate(function(){
            $('.a').css({
                left:this.x,
                top:this.y
            })
        })
        .easing(TWEEN.Easing.Elastic.In);

        var tween2=new TWEEN.Tween(rotate)
        .to({
            rotate:360
        },1000)
        .onUpdate(function(){
            $('.a').css('transform','rotate('+this.rotate+'deg)')
        })
        
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        $('#start').on('click',function(){
            tween1.chain(tween2).start()
        })
        $('#stop').on('click',function(){
            tween.stop()
        })
}