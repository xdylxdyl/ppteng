
/**
 * @fileoverview  Discolour 黄退效果
 * @authot  hongwei@sohu-inc.com
 * @version  0.1
 * @class    Discolour
 * @augments element options
 * 
 */
 
$register(
	"kola.anim.Discolour",
	function(){
		kola.anim.Discolour = Class.create({
			initialize: function(element,options){
				this.opt=Object.extend({
					property: "background",
					from     : "#ffffcc",
					to       : "#ffffff",
					speed    : 50,
					delay	 : 0,
					resume   : 0,
					hide	 : false,
					callback : false 
				},options||{})
				this.flag=0;
				this.resume=this.opt.resume;
				this.backFlag=false;
				this._startRgb=this.opt.from;
				this._endRgb=this.opt.to;
				this.element=$(element),
				this.property=this.opt.property;
				this.callback=this.opt.callback;
				this.speed=this.opt.speed;
				this.startRgb=this._getRGB(this.opt.from);
				this.endRgb=this._getRGB(this.opt.to);
				
			},
				// 获取 统一的RGB 格式的数据
			_getRGB   : function(str){
				if(!str){
					return [255,255,255]
				}
				if(str.constructor==Array){
					return str;
				}
				var arr=str.slice(1).split("");
				if(!arr){return false}
				while(arr.length<6){
					arr[arr.length]=0
				}
				arr.length=6;
				return this._getDeci([""+arr[0]+arr[1],""+arr[2]+arr[3],""+arr[4]+arr[5]]);
			},
			   // 16进制颜色值转换成rgb
			_getDeci   : function(strArray){
				var result=[];
				strArray.each(
					function(lt,i){
						var num=parseInt(lt,16);
						result[i]=num>=16?num<=255?num:255:16;
					}
				)
				return result;
			},
				// 获取配置的 颜色变化参数
			_getChangeArray  : function(arr1,arr2){
				var temp=[];
				for(var i=0;i<=2;i++){
					var _value=arr2[i]-arr1[i];
					temp[i]={
						sign : _value>0?1:-1,
						value: Math.abs(_value),
						type : i
					};	
				}
				return temp;
			},
				// 设置绑定借点的相应参数
			setColor   : function(value){
				this.element.css(this.property,value);
			},
				// 字符 转换成 16 进制
			_getHex     : function(num){
				return num.toString(16);
			},
				// 获取可以应用的 16进制颜色值
			_getHexColor : function(array){
				var color="#";
				if(array.length==3){
					color+=this._getHex(array[0])+this._getHex(array[1])+this._getHex(array[2]);
				}
				return color;
			},
			
			/**
			 * 添加延迟 springwang 2009-2-19
			 */
			start: function(){
				this.element.show();
				window.setTimeout(function(){
					this._start();
				}.bind(this),this.opt.delay);
			},
			
				// 开始变化
			_start      : function(){
				var arr=this._getChangeArray(this.startRgb,this.endRgb);
				for(var j=0;j<arr.length;j++){
					this._change(arr[j])
				}
			},
				// 重新变回默认颜色
			back    : function(){
				this.endRgb=this._getRGB(this._startRgb);
				this.flag=0;
				this.backFlag=true;
				this.start();		
			},
				// 变化函数
			_change     : function(option){
				var _this=this;
				if(option.value>0){
					this.startRgb[option.type]=this.startRgb[option.type]+1*option.sign;
					option.value-=1;
					this.setColor(this._getHexColor(this.startRgb));
					setTimeout(function(){_this._change(option)},this.speed)
				}
				else{
						
					this.flag++;
					if(this.flag==3){
						if(this.backFlag){
							 return ;
						}
						this.setColor(this._getHexColor(this.startRgb));
						if(this.resume){
							setTimeout(function(){_this.back()},this.resume*1000)
						} else if(this.opt.hide){
							this.element.hide();
						}
						if(this.callback){
							this.callback();	
						}
					}
				}
				
			}
		});
		/**
		 * 静态方法
		 */
		kola.anim.Discolour.action = function(element,options){
			return new kola.anim.Discolour(element,options).start();
		};
	})