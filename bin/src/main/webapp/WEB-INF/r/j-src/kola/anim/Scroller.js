/**
 * @fileoverview  Scroller 锚点平滑滚动效果
 * @authot  hongwei@sohu-inc.com
 * @version  0.1
 * @class    Scroller
 * @augments 
 * 
 * 调用方式  1 new kola.anim.Scroller();
 *           2 kola.anim.Scroller.action();
 *           3 var options={speed:20,callback:function(o){alert(o.attr('name'))}}
 *             var m=new kola.anim.Scroller(options);
 */
 
$register(
	"kola.anim.Scroller",
	function(){
		kola.anim.Scroller = Class.create({
			initialize : function(options){
				if(typeof(options) == 'undefined')	options = {};
				this.speed=options.speed|| 10;
				this.callback=options.callback || false;
				$(document.body).on('click',this._clickHandle.bindEvent(this));
				$(window).on('load',this._loadEvent.bind(this));
			},
			 _loadEvent: function(){
			 	var s=location.hash
			 	if(s){
			 		document.documentElement.scrollTop=0;
			 		this.scrollTo(this._getAnchor(s)); 	
			 	}
			 },
		 	 _scrollTop: function (){
				var d=document.documentElement;
				if (d){
					return d.scrollTop;
				}else if (window.pageYOffset) {
					return window.pageYOffset;
				}
				return 0
			},
				// 移动滚动条到指定位置
			_scrollTo: function(element){
				var d;
				if(element.constructor==Number){
					d=element;
				}else {
					d = $(element).pos().top;
				} 
				var a=this._scrollTop();
				if(d>a){
						a+=Math.ceil((d-a)/this.speed);
				}else{
					a = a+(d-a)/this.speed;
				}
			 	document.documentElement.scrollTop=a<0?0:a;
				if(a==d || this.offsetTop==a){
				  		
					clearInterval(this.interval);
					if(this.callback){
				  		this.callback(element);
					}
				}
				this.offsetTop=a;
			},
			_getAnchor   :function(value){
				var a=document.getElementsByTagName("a");
					for(var i=0;i<a.length;i++){
						
						if(a[i].name==value.split("#")[1]){
							return a[i]
						}
					}
			},
			_clickHandle :function(e){
				var e=e||window.event;
				var eSrc=e.target||e.srcElement;
				if(eSrc.tagName=="A"&&eSrc.href && eSrc.href.indexOf('#') != -1 && ((eSrc.pathname==location.pathname) || ('/'+eSrc.pathname==location.pathname))){
					kola.Event.preventDefault(e);
					this.scrollTo(this._getAnchor(eSrc.href));
					return false;
				}else{
					return true;
				}
			},
			scrollTo : function(ele){
				
				var __this=this;
				clearInterval(this.interval);
				this.interval=setInterval(function(){__this._scrollTo(ele)},10);
			}
			
	})
	kola.anim.Scroller.action=function(){
		var options={speed:8}
		return new kola.anim.Scroller(options);
	}
})