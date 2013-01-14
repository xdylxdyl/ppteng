/*
 * 动画库 FadeIn & FadeOut 
 *	author  QianCheng
 * version  1.0
 * base kola
*/

$register('kola.anim.Fade',function(){
	kola.anim.FadeIn = Class.create({		
		
		// 设置透明度 ie和现代浏览器判断后~分开处理
		_setOpacity:function (elem,level){
			if (kola.Browser.ie){
				$(elem).css('filter' , 'alpha(opacity=' + level + ')');
			} else{
				$(elem).css('opacity' , level / 100);		
			//elem.innerHTML = elem.style.opacity;
			}
		},
		
		//FadeIn方法
		initialize:function(elem,options){
			if(elem._els){
				elem=elem._els[0];
			}
			var ospeed = 10;
			var ofrom = 0;
			var oto = 100;
			var ocallback = null;
			this._setOpacity(elem,ofrom);
			if (options){
				if (options.speed != null) {
					ospeed = options.speed;
				}
				if (options.from != null) {
					ofrom = options.from;
					this._setOpacity(elem,ofrom);
				}
				if (options.to != null) {
					oto = options.to;
				}
				if (options.callback != null) {
					ocallback = options.callback;
				}
			}
			options = {speed: ospeed, from: ofrom, to: oto, callback: ocallback};
			$(elem).show();
			for (var i=ofrom;i<=oto ;i += 5 ){
				setTimeout(function(pos){
					this._setOpacity(elem,pos);
				}.bind(this,i),(i + 1 ) * ospeed );
			}
			//临时添加效果完成后 display:'';
			if (kola.Browser.ie){
				setTimeout(function(){$(elem).css('display','');$(elem).css('filter','')},ospeed*105);
			} else{
				setTimeout(function(){$(elem).css('display','');$(elem).css('opacity','')},ospeed*105);
			}

			if(ocallback){
				setTimeout(ocallback,ospeed*100);
			}
		}
	});
	//静态方法
	kola.anim.FadeIn.action = function(elem, options) {
		return new kola.anim.FadeIn(elem, options);
	}

	kola.anim.FadeOut = Class.create({		
		//  设置透明度
		_setOpacity:function (elem,level){
			if (kola.Browser.ie){
				$(elem).css('filter' , 'alpha(opacity=' + level + ')');
			} else{
				$(elem).css('opacity' , level / 100);		
			}
			//elem.innerHTML = elem.style.opacity;
		},
		
		// FadeOut方法
		initialize:function(elem,options) {
			if(elem._els){
				elem=elem._els[0];
			}
			var ospeed = 10;
			var ofrom = 100;
			var oto = 0;
			var ocallback = null;
			var odisplay = 'none';
			if (options){
				if (options.speed != null) {
					ospeed = options.speed;
				}
				if (options.from != null) {
					ofrom = options.from;
					this._setOpacity(elem,ofrom);
				}
				if (options.to != null) {
					oto = options.to;
				}
				if (options.callback != null) {
					ocallback = options.callback;
				}
				if (options.display != null) {
					odisplay = options.display;
				}
			}
			options = {speed: ospeed, from: ofrom, to: oto, callback: ocallback,display:odisplay};
			$(elem).show();
			for ( var i = oto; i <= ofrom; i += 5 ) {
				setTimeout(function(pos){
					this._setOpacity( elem, 100 - pos );
				}.bind(this,i),( i + 1 ) * ospeed );
			}
			//临时添加效果完成后 display:none;
			if (kola.Browser.ie){
				setTimeout(function(){$(elem).css('display',odisplay);$(elem).css('filter','')},ospeed*105);
			} else{
				setTimeout(function(){$(elem).css('display',odisplay);$(elem).css('opacity','')},ospeed*105);
			}

			if(ocallback){
				setTimeout(ocallback,ospeed*105);
			}
		}
	});
	kola.anim.FadeOut.action = function(elem, options) {
		var a = new kola.anim.FadeOut(elem, options);
	}
});



