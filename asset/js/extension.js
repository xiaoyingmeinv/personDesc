
/**
 * 
 *jquery功能扩展 
 *
 */
!function($){

    
    $.fn.slider = function(options){
        var namespace = ".cusSlider";
        var cacheName ="cacheCusSlider";
        var _this = this;
        var cacheOp = _this.data(cacheName);
        
        if(typeof options == "string"){
            
            if(cacheOp == null){
                throw new Error("slider 尚未初始化，不能执行方法");
            }
            if(options in cacheOp){
                throw new Error("slider 中不存在此属性或方法：" + options);
            }
            
            var exTarget = cacheOp[options];
            if($.isFucntion(exTraget)){
                var args = Array.prototype.slice.call(arguments, 1);
                exTarget.apply(cacheOp, args);
            }
            
            return exTraget;
            
            
        }
        
        if(cacheOp != null){
            cacheOp.destroy();//自动销毁
        }
        
        //配置
        var config = {
            selector:"a",
            prevClass:"slider-prev",
            nextClass:"slider-next",
            defaultClass:"slider-item",
            dotClass:"slider-item-dot",
            beforeClass:"before",
            activeClass:"active",
            waitTime:5000,
            duration:400,
            autoPlay:true,
            startIndex:0
        };
        
        $.extend(config, options);
        
        
        if(_this.css("position") == "static"){
            _this.css("position","relative");//强制设置定位方式
        }
        
        _this.css("overflow","hidden");//必须禁止溢出
        
        var autoPlayInterval = null;
        var effectList = ["slider-tip-left ",
                            "slider-tip-left slider-tip-bottom", 
                            "slider-tip-right", 
                            "slider-tip-right slider-tip-bottom"];
        var itemList = _this.children(config.selector);//所有目标元素，只针对子级
        itemList.addClass(config.defaultClass);
        
        itemList.each(function(index, anchor){
            var $anchor = $(anchor);
            var $tip = $("<span class='slider-tip'></span>");
            var tipMsg = $anchor.attr("title");
            if(tipMsg != null && tipMsg != ""){
                $tip.html(tipMsg);
                $anchor.append($tip);
            }
        });
        
        /**
         * 随机效果 
         * 
         */
        function randomEffect(){
            var randomIndex = Math.floor(Math.random() * effectList.length);
            return effectList[randomIndex];
        }
        
        /**
         * 改变位置
         *
         */
        function changePosition(nextIndex,callBack){
            var aleft = false;
            
            
            if(nextIndex < 0){
                nextIndex = itemList.length - 1;
            }
            
            if(nextIndex >= itemList.length){
                aleft = true;
                nextIndex = 0;
            }
           
            
            var currentItem = itemList.filter("." + config.activeClass);
            var curIndex = itemList.index(currentItem);
            var nextItem = itemList.eq(nextIndex);

            if(nextIndex == curIndex){
                callBack && callBack(nextItem);
                return;
            }
            
            if(nextIndex > curIndex){
                aleft = true;
            }
            
            
            if(aleft){
                nextItem.css({left:"100%",opacity:0});  
                nextItem.addClass(config.beforeClass);
                //向左移出去
                currentItem.stop(true,true).animate({left:"-100%",opacity:0}, config.duration);
            }else{
                nextItem.css({left:"-100%",opacity:0});
                nextItem.addClass(config.beforeClass);
                //向右移出去
                currentItem.stop(true,true).animate({left:"100%",opacity:0}, config.duration);
            }
            
            nextItem.children(".slider-tip").attr("class","slider-tip").addClass(randomEffect());
            
            nextItem.stop(true,true).animate({left:"0%",opacity:1}, config.duration, function(){
                currentItem.removeClass(config.activeClass);
                nextItem.removeClass(config.beforeClass);
                nextItem.addClass(config.activeClass);
                nextItem.children(".slider-tip").addClass("active");
                callBack && callBack(this);
            });
            
            //同步状态栏
            syncDotStatus(nextIndex);
        }
        
        function next(){
            var currentItem = itemList.filter("." + config.activeClass);
            var curIndex = itemList.index(currentItem);
            changePosition(curIndex + 1);
        }
        
        function prev(){
            var currentItem = itemList.filter("." + config.activeClass);
            var curIndex = itemList.index(currentItem);
            changePosition(curIndex - 1);
        }
        
        function stopAutoPlay(){
            clearInterval(autoPlayInterval);
        }
        
        function startAutoPlay(){
            stopAutoPlay();
            autoPlayInterval = setInterval(function(){
                next();
            }, config.waitTime);
        }
        
        //init 
        var toolDot = $("<div></div>");
        toolDot.css({
            position:"absolute",
            left:0,
            right:0,
            bottom:20,
            zIndex:108,
            textAlign:"center"
        });
        
        var dotContainer = $("<div></div>");
        dotContainer.css({
            display:"inline-block",
        });
        itemList.each(function(index, item){
           var dot = $("<span class='"+ config.dotClass +"'></span>") ;
           
           dot.on("click" + namespace, function(){
                var curDot = $(this);
                var nextIndex = curDot.index();   
                changePosition(nextIndex);
                startAutoPlay();
           });
           
           dotContainer.append(dot);
        });
        
        toolDot.append(dotContainer);
        
        _this.append(toolDot);//添加工具条
        
        function syncDotStatus(nextIndex){
             var dots = dotContainer.children();
             dots.removeClass(config.activeClass);
             dots.eq(nextIndex).addClass(config.activeClass);
        }
        
        
        var prevDom = $("<div class='"+config.prevClass+"'></div>");
        var nextDom = $("<div class='"+config.nextClass+"'></div>");
        var btnList = $();
        btnList = btnList.add(prevDom).add(nextDom);
        
        prevDom.click(function(){
            prev();
        });
        
        nextDom.click(function(){
            next();
        });
        
        _this.on("mouseenter" + namespace, function(){
            btnList.addClass("active");
            stopAutoPlay();
        });
        _this.on("mouseleave" + namespace, function(){
            btnList.removeClass("active");
            startAutoPlay();
        });
        
        _this.append(prevDom);
        _this.append(nextDom);
        
        var operationObj = {
            prev:prev,
            next:next,
            destroy:function(){
                stopAutoPlay();
                toolDot.remove();
                _this.removeData(cacheName);
                _this.off(namespace);
                prevDom.remove();
                nextDom.remove();
            }
        };
        
        _this.data(cacheName, operationObj);
        
        changePosition(config.startIndex);//默认开始位置
        if(config.autoPlay){
            startAutoPlay();
        }
        
        return _this;
        
    }
}(jQuery);