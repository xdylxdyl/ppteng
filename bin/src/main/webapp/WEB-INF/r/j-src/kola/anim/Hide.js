/**
 * @fileoverview  定时隐藏效果实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	sohu.core.* packages
 */
 
 $register('kola.anim.Hide',function(){
 	kola.anim.Hide = Class.create({
 		initialize: function(element,options){
 			this._el = $(element);
 			this._setOptions(options);
 		},
 		
		/**
		 * 设置延迟，定时开始执行动画
		 */
		start: function(){
			this._el.show();
			window.setTimeout(function(){
				this._action();
			}.bind(this),this._options.delay);
			// 提前加载所需的动画包
			if(this._options.mode != kola.anim.TYPE.none){
				this._reqPackage(null);
			}
		},
		
		/**
		 * 设置参数
		 */
 		_setOptions: function(options){
 			this._options = Object.extend({
 				delay:5000,
 				mode:kola.anim.TYPE.none,
 				callback: function(){},
 				options:{}
 			},options||{});
 		},
 		
 		// 开始变化
		_action: function(){
			if(this._options.mode == kola.anim.TYPE.none){
				this._hide();
			} else{
				this._reqPackage(this._showAnim.bind(this));
			}
		},
		
		/**
		 * 加载所需的包
		 */
		_reqPackage: function(callback){
			// 加载相应的动画包，完成后执行动画
			var pack = 'kola.anim.'+ this._options.mode;
			$req(pack,callback);		
		},
		
		/**
		 * 执行相应的动画
		 */
		_showAnim: function(){
			var opt = this._options.options,
				m = this._options.mode,
				t = kola.anim.TYPE;
				
			if(m == t.fade){
				kola.anim.FadeOut.action(this._el,Object.extend({
					callback:this._hide.bind(this)
				},opt));
			} else if(m == t.disc){
				kola.anim.Discolour.action(this._el,Object.extend({
					callback:this._hide.bind(this)
				},opt));
			} else if(m == t.blind){
				kola.anim.BlindUp.action(this._el,Object.extend({
					speed:1,
					callback:this._hide.bind(this)
				},opt));
			} else if(m == t.tween){
				kola.anim.Toggle.action(this._el,Object.extend({
					type:"height",
					curve:"Circ",
					fade:true,
					callback: this._hide.bind(this)
				},opt))
			}
		},
		
		/**
		 * 隐藏元素
		 */
		_hide: function(){
			this._el.hide();
			this._options.callback();
		}
 	});
 	
 	/**
 	 * Hide 动画静态执行方法
 	 */
 	kola.anim.Hide.action = function(element,options){
 		return new kola.anim.Hide(element,options).start();
 	};
 	
 	/**
 	 * 隐藏时需要执行的动画类型
 	 */
 	kola.anim.TYPE = {
 		none: 'None',
 		fade: 'Fade',
 		disc: 'Discolour',
 		blind: 'Blind',
 		tween: 'Tween'
 	};
 	
 });