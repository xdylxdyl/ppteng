var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}

$register('kola.anim.Tween',function(){
	
 
	kola.anim.Tween= {
	
		create: function() {
			
			var c = function() {
				this.init.apply(this, arguments);
				Object.extend(this,{
					speed : 100,
					_t	  : 0,
					curve  :  "Circ",
					curveType  : "easeInOut",
					func   : "Linear"
				})
				this._func=Tween[this.curve][this.curveType];
				this.stop= function(){
						clearTimeout(this._timer)
				}
				this._start=function(){
						if(this._t<this.speed){
							this._t++;
							var _per=Math.ceil(this._func(this._t,0,100,this.speed))/100;
							this.method(_per);
							var _this=this;
							
							this.start();
						}else{
						
							this.method(1);
							this._t=0;
							if(this.callback)this.callback();
						}
				}
				this.start=function(){
						this._timer=setTimeout(function(){
							this._start();
						}.bind(this),1)
				}
			}
			for (var i=0, il=arguments.length, it; i<il; i++) {
				it = arguments[i];
				if (it == null) continue;
				
				Object.extend(c.prototype, it);
			}
			return c;
		}
	
	}
	kola.anim.zommOut=kola.anim.Tween.create({
		init : function(obj,options){
				this._element=$(obj);
				this._element.css("overflow","hidden");
				if(this._element.css("display")=="none"){
				   this._element.show();
				   this._box=this._element.box();
				   this._element.hide();
				}else{
				this._box=this._element.box();
				}
				this.opt=options;
		},
		method:function(per){
				this._element.css("width",Math.abs(this._box.width*(1-per)+this.opt.width)+"px");
				this._element.css("height",Math.abs(this._box.height*(1-per)+this.opt.height)+"px");
		},
		callback :function(){
			if(this.opt.callback){
				this.opt.callback();
			}
		}
	
	})
	kola.anim.zommOut.action=function(obj,options){
		return new kola.anim.zommOut(obj,options).start();
	}
	kola.anim.zommIn=kola.anim.Tween.create({
			init : function(obj,options){
				this._element=$(obj);
				this._element.css("overflow","hidden");
				this._box=this._element.box();
				this.opt=options;
			},
			method  : function(per){
				this._element.css("width",Math.abs(this._box.width+(this.opt.width-this._box.width)*per)+"px");
				this._element.css("height",Math.abs(this._box.height+(this.opt.height-this._box.height)*per)+"px");
			},
			callback: function(){
				if(this.opt.callback){
					this.opt.callback();
				}	
			}
		
	})
	kola.anim.zommIn.action=function(obj,options){
		return new kola.anim.zommIn(obj,options).start();
	}
	kola.anim.move=kola.anim.Tween.create({
			init : function(obj,options){
				this._element=$(obj);
				this._pos=this._element.pos();
				this.opt=options;
			},
			method  : function(per){
				var left=this._pos.left>this.opt.left?(this._pos.left*(1-per)+this.opt.left):(this._pos.left+(this.opt.left-this._pos.left)*per);
				var top =this._pos.top>this.opt.top?(this._pos.top*(1-per)+this.opt.top):(this._pos.top+(this.opt.top-this.pos.top)*per);	
				this._element.css("left",left+"px");
				this._element.css("top",top+"px");
			},
			callback: function(){
				if(this.opt.callback){
					this.opt.callback();
				}	
			}
	})
	kola.anim.move.action=function(obj,options){
		return new kola.anim.move(obj,options).start()
		
	}
	kola.anim.Toggle=Class.create({	
		initialize : function(element,options){
			this.opt=Object.extend({
				type     : "all",  		//设置 toggle的类型 all 时为 高宽同时变化，width 为仅宽度变化 height 为仅高度变化
				curve    : "Quint",		//设置 动画的曲线
				curveType: "easyInOut", // 设置 曲线的模式
				speed    : 50,     		// 设置动画的速度 值越大速度越慢
				anim     : true    		// 设置是否有动画 默认为有
			},options)
			this._element=$(element);
			if(options.bindEvent)$(options.bindEvent.element).on(options.bindEvent.event,this.action.bind(this))
			this._getBox();
		},
		_getBox : function(){
			var _dis=this._element.css("display")=="none";
			var _pos=this._element.css("position");
			this._element.css("position","absolute");
			this._element.css("visibility","hidden");
			if(_dis){
				this._element.css("display","block");
			}
			this._box=this._element.box();
			this._element.css("position",_pos);
			this._element.css("visibility","visible");
			if(_dis){
				this._element.css("display","none");
			}else{
				this._element.css("display","block")
			}
		},
		action : function(){
			if(!this.opt.anim){ 	//  如果无动画
				if(this._element.css("display")=="none"){
					this._element.show();
				}else{
					this._element.hide();
				}
				return;
			}
			var _optionsIn=Object.extend({},this.opt);
			var _optionsOut=Object.extend({callback:function(){this._element.hide()}.bind(this)},this.opt);
			switch (this.opt.type){
				case "width" :
					_optionsIn.width=this._box.width;
					_optionsOut.width=0;
					break;
				case "height" :
					_optionsIn.height=this._box.height;
					_optionsOut.height=0;
					break;
				default :
				  	Object.extend(_optionsIn,this._box);
					_optionsOut.height=_optionsOut.width=0;
			}
			if(this._element.css("display")=="none"){
				kola.anim.zommIn.action(this._element,_optionsIn);
				if(this.opt.fade){// 是否有渐变
					kola.anim.FadeIn.action(this._element)
				}else{
					this._element.show();
				}
			}else{
				kola.anim.zommOut.action(this._element,_optionsOut);
				if(this.opt.fade){
					kola.anim.FadeOut.action(this._element)
				}
			}
		}	
	});
	
	/**
	 * Toggle的静态方法
	 */
	kola.anim.Toggle.action = function(element,options){
		return new kola.anim.Toggle(element,options).action();
	};

},'kola.anim.Fade')