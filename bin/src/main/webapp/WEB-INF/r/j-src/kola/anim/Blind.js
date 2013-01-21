/*
 * 动画库 Blind 
 *	author  QianCheng
 * version  1.0
 * base kola
*/

$register('kola.anim.Blind',function(){
	kola.anim.BlindDown = Class.create({		
		initialize:	function (elem,options){
			var ospeed = 10;
			var ocallback = null;
			var oheight = 100;

			if (options){
				if (options.speed != null) ospeed = options.speed;
				if (options.height != null) oheight = options.height;
				if (options.callback != null) ocallback = options.callback;
			}
			options = {speed: ospeed,height:oheight,callback: ocallback};

			if(elem._els){
				elem=elem._els[0];
			}
			var h=elem.offsetHeight;
			var maxh=oheight;
			function dmove(){
				h+=ospeed; 
				if(h>=maxh){
					elem.style.height=maxh+'px';
					clearInterval(iIntervalId);
				}else{
					elem.style.display='block';
					elem.style.height=h+'px';
				}
			}
			iIntervalId=setInterval(dmove,2);
			if(ocallback){
				setTimeout(ocallback,ospeed*oheight*0.65);
			}
		}
	});
	kola.anim.BlindDown.action = function(elem, options) {
		return new kola.anim.BlindDown(elem, options);
	}

	kola.anim.BlindUp = Class.create({		
		initialize:function(elem,options){
			var ospeed = 10;
			var ocallback = null;
			var oheight = 0;

			if (options){
				if (options.speed != null) ospeed = options.speed;
				if (options.height != null) oheight = options.height;
				if (options.callback != null) ocallback = options.callback;
			}
			options = {speed: ospeed,height:oheight,callback: ocallback};
			if(elem._els){
				elem=elem._els[0];
			}
			var h=elem.offsetHeight;
			var maxh=oheight;
			function dmove(){
				h-=ospeed;
				if(h<=0){
					elem.style.display='none';
					clearInterval(iIntervalId);
				}else{
					elem.style.display='block';
					elem.style.height=h+'px';
				}
			}
			iIntervalId=setInterval(dmove,2);
			if(ocallback){
				setTimeout(ocallback,ospeed*oheight*0.65);
			}
		}
	});
	kola.anim.BlindUp.action = function(elem, options) {
		return new kola.anim.BlindUp(elem, options);
	}
});
;