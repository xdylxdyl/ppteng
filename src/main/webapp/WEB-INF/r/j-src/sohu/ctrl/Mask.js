
/**
 * @fileoverview  这是一个遮罩类，生成一个可以遮住整个浏览页面到指定透明度到层。
 * @authot  hongweiwang@sohu-inc.com
 * @version  0.1
 * @class    Mask
 * @augments options
 * @example
 * var mask =new sohu.ctrl.Mask({color:red,num:30}) 
 * 
 */

$register(
	"sohu.ctrl.Mask",
	function(){
		sohu.ctrl.Mask=Class.create({
			initialize : function(options){
				var _style={color:options.color,per0:options.num/100,per1:options.num}
			  	this.pannel=kola.Element.create("div").html("<iframe> </iframe>");
			 	this.pannel.addClass("maskLayer");
			  	this.pannel.attr("style","background:"+_style.color+";-moz-opacity:"+_style.per0+";opacity:"+_style.per0+";filter:alpha(opacity="+_style.per1+");")
			  	$(document.body).append(this.pannel);	
			},
			show	: function(){
				this.pannel.show();
				return this;
			},
			hide	: function(){
				this.pannel.hide();
				return this;
			},
			close	: function(){
				if(this.pannel.parent()){
					this.pannel.remove();
				}
 
			}
		
		})
})