fTween
======
 
An easy javascript object to handle tween animation.Can be used both in browser and nodejs.

refer in browser 
======
```
<script src="{path}/fTween.js"></script>
```
install with npm
======

npm install ftween

useage
======
```
var fTween = require('ftween'); //no need in browser
var tween = new fTween.tween.create({
    queue : [
        {
            from : {
                a : 0
            },
            to : {
                a : 10
            },
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
```
