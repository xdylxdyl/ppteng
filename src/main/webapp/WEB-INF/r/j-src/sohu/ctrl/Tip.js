/* 
 * Tip组件
 * yunyan@sohu-inc.com
 */

$register('sohu.ctrl.Tip', function(){
    sohu.ctrl.Tip = Class.create({
        /*
         * 初始化
         */
        initialize:function(options){
            this.settings = {
                element : null,
                showIn: null,
                showOut: null,
                type : 1, // 1 or 2
                direction : "down",  //down or up
                position : [0,0],
                fadeIn : 0,
                fadeOut : 0,
                close : 0,
                content : ''
            };
            Object.extend(this.settings, options || {});
            this._template={
                content: this.settings.content,
                direction: ""
            };
            if(this.settings.type == 1){
                this._template.direction = this.settings.direction == "down"? "tooltip-top" :"tooltip-bottom";
                this._html = this._tipHtml;
            }else{
                this._template.direction = this.settings.direction == "down"? "balloon-top" :"balloon-bottom";
                this._html = this._balloonHtml;
            }
            this.element = $(this.settings.element);
            this.template=new kola.Template(this._html);
            this.pannel=kola.Element.create("div").html(this.template.evaluate(this._template)).hide();
            $(document.body).append(this.pannel);
            this.setPos();
            this._setBind();
        },

        setPos: function(){
            this._pos = {
                left : this.element.pos().left || 0,
                top : this.element.pos().top || 0,
                bottom : this.element.pos().bottom || 0,
                height : this.element.height() || 0
            };
            var style ="left: " + (this._pos.left + this.settings.position[0]) + "px;";
            var _tmp = "top:"+ (this._pos.top + this._pos.height + this.settings.position[1]) +"px;";
            if(this.settings.direction == "up"){
                _tmp ="bottom:"+ (this._pos.bottom + this._pos.height + this.settings.position[1]) +"px;";
            }
            style += _tmp;
            this.pannel.first().attr("style", style);
        },

        show: function(){
            if(this.settings.fadeIn)
                kola.anim.FadeIn.action(this.pannel,{speed:this.settings.fadeIn});
            else
                this.pannel.show();
            if(this.settings.close){
                this.hide.bind(this).timeout(this.settings.close);
            }
        },
        hide: function(){
            if(this.settings.fadeOut)
                kola.anim.FadeOut.action(this.pannel,{speed:this.settings.fadeOut});
            else
                this.pannel.hide();
        },

        _setBind: function(){
            if(this.settings.showIn)
                this.element.on(this.settings.showIn, function(){
                    this.show();
                }.bind(this));
            if(this.settings.showOut)
                this.element.on(this.settings.showOut, function(){
                    this.hide();
                }.bind(this));
        },

        _tipHtml : "<div class=\"tooltip #{direction}\">\
                        <div class=\"content\">#{content}</div>\
                    </div>",
        _balloonHtml: "<div class=\"balloon #{direction}\">\
                            <div class=\"decor\">\
                                <span class=\"tl\"></span>\
                                <span class=\"tr\"></span>\
                                <span class=\"br\"></span>\
                                <span class=\"bl\"></span>\
                            </div>\
                            <div class=\"content\">#{content}</div>\
                        </div>"
    });
    /*
     * 遍历Dom元素，实现小气泡Tip提示，返回Tip对象数组
     */
    sohu.ctrl.Tip.tips = function(element){
        var el = $("[tip]", element);
        var r = new Array();
        el.each(function(i,y){
            r[y] = new sohu.ctrl.Tip({
                element: i,
                showIn: 'mouseover',
                showOut: 'mouseout',
                content : i.attr('tip')
            });
        });
        return r;
    };
    /*
     * 初始化一个大气泡
     */
    sohu.ctrl.Tip.balloon = function(options){
        var r = new sohu.ctrl.Tip({
            element : options.element || document,
            type : 2,
            position: options.option || [0,0],
            content: options.content || "",
            close : options.close || 0,
            fadeOut : 2
        });
        return r;
    };

}, 'kola.anim.Fade');