var fTween = require('../fTween');
var tween = new fTween.tween.create({
    queue : [
        {
            from : {
                a : 0
            },
            to : {
                a : 10
            },
            easing : fTween.easing.bounceIn,
            onUpdate : function(now){
                console.log(now.a);
            },
            onComplete : function(){
                this.stop(2000);
            }
        },
        {
            from : {
                a : 100,
                b : 0
            },
            to : {
                a : 0,
                b : 50
            },
            onUpdate : function(now){
                console.log(now.a, now.b);
            }
        }
    ],
    isRepeat : false,
    onStart : function(){
        console.log('onStart');
    },
    onStop : function(){
        console.log('onStop');
    },
    onGoOn : function(){
        console.log('onGoOn');
    }
});
tween.start();