/*
 * ¶¯»­¿â Shake 
 *	author  QianCheng
 * version  1.0
 * base kola
*/

$register('kola.anim.Shake',function(){
	kola.anim.Shake = Class.create({		
		initialize:function(elem,options){
			var ospeed = 10;
			var otime = 1;
			var ocallback = null;
			if (options){
				if (options.speed != null) ospeed = options.speed;
				if (options.time != null) otime = options.time;
				if (options.callback != null) ocallback = options.callback;
			}
			options = {speed: ospeed,time:otime,callback: ocallback};
			var i=0;
			var l = elem.css("left");
			l = parseInt(l) || 0;
			var ll = (l - 5+'px');
			var lr = (l + 10+'px');
			function run(elem){
				elem.css("display","");
				elem.css("position","absolute");
				i++;
				if (i%2!=0){
					elem.css("left", ll); 
				}else{
					elem.css("left",lr); 
				}
			}
			function stop(){
				window.clearInterval(tt);
				elem.css("left", l+'px');
			}
			stop.timeout(otime);
			var tt=run.bind(this,elem).interval(ospeed/100);
			if(ocallback){
				setTimeout(ocallback,otime*1000);
			}
		}
	});
	kola.anim.Shake.action = function(elem, options) {
		return new kola.anim.Shake(elem, options);
	}
});