/*!
 * fTween 1.0.0 2014-7-24
 * Copyright 2014 Fancy
 * http://fancyboy.net/
 */
(function(w){
    if(w.fTween){
        return;
    }
    var extend = function (to, from) {
        for (var key in from) {
            if (!from.hasOwnProperty(key)) {
                continue;
            }
            to[key] = from[key];
        }
        return to;
    };
    var map = function (obj, fn) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fn(key, obj[key]) === false) {
                    break;
                }
            }
        }
    };
    var fps = 96;
    var getTimePerFrame = function(){ //每帧占用的时间(ms)
        return Math.floor(1000 / fps);
    };
    var fTween = {
        version : '1.0.0',
        setFps : function(f){
            fps = f;
        },
        tween : {
            create : function(opt){
                return new Tween(opt);
            }
        },
        easing : {
            'linear': function (t, b, c, d) {
                return c * t / d + b;
            },
            'backIn': function (t, b, c, d) {
                var s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            'backOut': function (t, b, c, d) {
                var s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            'backInOut': function (t, b, c, d) {
                var s = 1.70158;
                if ((t /= d / 2) < 1){
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            'bounceIn': function (t, b, c, d) {
                return c - this.bounceOut(d - t, 0, c, d) + b;
            },
            'bounceOut': function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)){
                    return c * (7.5625 * t * t) + b;
                }
                if (t < (2 / 2.75)){
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                }
                if (t < (2.5 / 2.75)){
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                }
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            },
            'bounceInOut': function (t, b, c, d) {
                if (t < d/2){
                    return this.bounceIn(t * 2, 0, c, d) * 0.5 + b;
                }
                return this.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
            },
            'circularIn': function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            'circularOut': function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
            },
            'circularInOut': function (t, b, c, d) {
                if ((t /= d / 2) < 1){
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            'cubicIn': function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            'cubicOut': function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            'cubicInOut': function (t, b, c, d) {
                if ((t /= d / 2) < 1){
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            'elasticIn': function (t, b, c, d) {
                if (t == 0){
                    return b;
                }
                if ((t /= d) == 1){
                    return b + c;
                }
                var p = d * 0.3, s = p / 4;
                return -(c * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            'elasticOut': function (t, b, c, d) {
                if (t == 0){
                    return b;
                }
                if ((t /= d) == 1){
                    return b + c;
                }
                var p = d * 0.3, s = p / 4;
                return c * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            },
            'elasticInOut': function (t, b, c, d) {
                if (t == 0){
                    return b;
                }
                if ((t /= d / 2) == 2){
                    return b + c;
                }
                var p = d * (0.3 * 1.5), s = p / 4;
                if (t < 1){
                    return -0.5 * (c * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
                }
                return c * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
            },
            'exponentialIn': function (t, b, c, d) {
                return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            'exponentialOut': function (t, b, c, d) {
                return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            'exponentialInOut': function (t, b, c, d) {
                if (t == 0){
                    return b;
                }
                if (t == d){
                    return b + c;
                }
                if ((t /= d / 2) < 1){
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                }
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            'quadraticIn': function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            'quadraticOut': function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            'quadraticInOut': function (t, b, c, d) {
                if ((t /= d / 2) < 1){
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            'quarticIn': function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            'quarticOut': function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            'quarticInOut': function (t, b, c, d) {
                if ((t /= d / 2) < 1){
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            'quinticIn': function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            'quinticOut': function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            'quinticInOut': function (t, b, c, d) {
                if ((t /= d / 2) < 1){
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
            'sineIn': function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            'sineOut': function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            'sineInOut': function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        }
    };
    var run = function(tween){
        var opt = tween._getOpt();
        if(tween._getStop()){ //暂停
            opt.onStop.call(tween, tween._readNow());
            return;
        }
        var i = tween._readQueueIndex(); //当前动画索引
        var q = tween._getQ(i); //获取当前动画对象
        if(tween._isAllComplete()){ //动画全部完成
            tween._setRun(false);
            q.onUpdate.call(tween, q.to);
            q.onComplete.call(tween, q.to);
            if(opt.isRepeat){
                tween.start();
            }
            return;
        }
        tween._setRun(true);
        if(tween._isComplete(i)){ //读取下一个动画
            q.onUpdate.call(tween, q.to);
            q.onComplete.call(tween, q.to);
            i++;
            q = tween._getQ(i);
            tween._saveNow(q.from, tween._readFrame(i), i);
        }
        var now = {};
        map(tween._readNow(), function(k, v){
            now[k] = q.easing.call(fTween.easing, tween._readFrame(i), q.from[k], q.to[k] - q.from[k], tween._readFrames(i));
        });
        tween._saveNow(now, tween._readFrame(i) + 1, i);
        q.onUpdate.call(tween, now);
        setTimeout(function(){
            run(tween);
        }, getTimePerFrame());
    };
    var Tween = function(opt){
        this._init(opt);
    };
    extend(Tween.prototype, {
        _init : function(opt){
            var self = this;
            self._opt = extend({
                queue : [],
                isRepeat : false,
                onStart : function(){},
                onStop : function(){},
                onGoOn : function(){}
            }, opt);
            var queue = [];
            for(var i = 0, len = self._opt.queue.length; i < len; i++){
                queue.push(extend({
                    from : null,
                    to : null,
                    duration : 1000,
                    easing : fTween.easing.sineInOut,
                    onUpdate : function(){},
                    onComplete : function(){}
                }, self._opt.queue[i]));
            }
            self._opt.queue = queue;
            return self;
        },
        _getOpt : function(){
            return this._opt;
        },
        _getQ : function(i){
            return this._opt.queue[i];
        },
        _isLastQ : function(){ //是否是最后一个动画
            return this._readQueueIndex() === this._opt.queue.length - 1;
        },
        _isComplete : function(i){
            return this._readFrame(i) === this._readFrames(i);
        },
        _isAllComplete : function(){
            var self = this,
                max = self._opt.queue.length - 1;
            return self._isLastQ() && self._isComplete(max);
        },
        _readFrames : function(i){ //读取某个动画的总帧数
            return Math.ceil(this._getQ(i).duration / getTimePerFrame());
        },
        _saveNow : function(now, t, i){ //保存当前状态,及对应动画的当前帧
            var self = this;
            self._now = now;
            self._ts[i] = t;
            self._i = i;
            return self;
        },
        _readNow : function(){
            return this._now;
        },
        _readFrame : function(i){ //读取某个动画的当前帧
            return this._ts[i] || 0;
        },
        _readQueueIndex : function(){
            return this._i;
        },
        _setStop : function(b){
            var self = this;
            self._isStop = !!b;
            return self;
        },
        _getStop : function(){
            return !!this._isStop;
        },
        _setRun : function(b){
            var self = this;
            self._isRun = !!b;
            return self;
        },
        _getRun : function(){
            return !!this._isRun;
        },
        _run : function(time){
            var self = this;
            if(self._delay){
                clearTimeout(self._delay);
            }
            var r = function(){
                if(self._getStop()){
                    self._opt.onGoOn.call(self, self._readNow());
                    self._setStop(false);
                }
                run(self);
            };
            if(!time){
                r();
            }
            else{
                self._delay = setTimeout(function(){
                    r();
                }, time);
            }
            return self;
        },
        start : function(){
            var self = this;
            if(self._getRun()){
                return self;
            }
            self._ts = [];
            self._saveNow(self._opt.queue[0].from, 0, 0);
            self._opt.onStart.call(self);
            self._setStop(false);
            self._run();
            return self;
        },
        stop : function(time){
            var self = this;
            if(!self._getRun()){
                return self;
            }
            self._setStop(true);
            if(time === true){ //stop and can not go on again
                self._setRun(false);
                return self;
            }
            time && self._run(time); //stop and go on delay
            return self;
        },
        goOn : function(){
            var self = this;
            if(!self._getRun() || !self._getStop()){
                return self;
            }
            self._run();
            return self;
        },
        setEasing : function(easing, i){
            var self = this;
            if(self._getRun()){
                return self;
            }
            if(i !== undefined){
                self._opt.queue[i].easing = easing;
            }
            else{
                var len = self._opt.queue.length;
                while(len--){
                    self._opt.queue[len].easing = easing;
                }
            }
            return self;
        },
        setQueueOpt : function(i, k, v){ //动态设置某一动画选项
            var self = this;
            self._opt.queue[i][k] = v;
            return self;
        }
    });
    if ( typeof define === "function") { //AMD|CMD
        define(function(require, exports, module) {
            module.exports = fTween;
        });
        return;
    }
    if(typeof require === 'function' && typeof exports === 'object' && typeof module === 'object'){ //CommonJS|NodeJS
        module.exports = fTween;
        return;
    }
    w.fTween = fTween; //normal
})(this);