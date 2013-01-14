/*
 * 键盘操作控件
 */
$register('kola.ctrl.KeyAction', function(){
	kola.ctrl.KeyAction = Class.create({
		initialize: function(options){
			this.settings = {
				element: document,
				onKeyDown: function(keyCode){},
				onKeyUp:   function(keyCode){}
			};
			Object.extend(this.settings, options);
			
			this.settings.element = $(this.settings.element);
			this.bind();
			return this;
		},
		/*
		 * 注销键盘绑定
		 */
		stop: function(){
			if(this._bindDown){
				this.settings.element.un('keyup', this._bindDown);
			}
			if(this._bindUp){
				this.settings.element.un('keydown', this._bindUp);
			}
		},
		/*
		 * 键盘绑定
		 */
		bind: function(){
			if(this._bindUp){
				this.settings.element.un('keyup', this._bindUp);
			} else {
				this._bindUp = this._bind.bindEvent(this);
			}
			if(this._bindDown){
				this.settings.element.un('keydown', this._bindDown);
			} else {
				this._bindDown = this._bind.bindEvent(this);
			}
			this.settings.element.on('keyup',this._bindUp);
			this.settings.element.on('keydown',this._bindDown);
		},
		
		_bind: function(e){
			var type = e.type;
			var code = e.keyCode;
			if(e.type == 'keydown'){
				this.settings.onKeyDown.apply(null,[e.keyCode]);
			}
			if(e.type == 'keyup'){
				this.settings.onKeyUp.apply(null,[e.keyCode]);
			}
		}
	});
	
	kola.ctrl.KeyAction.action = function(keyCode, callback){
		var codeArr = [];
		if(typeof(keyCode) == 'number'){
			codeArr.push(keyCode);
		}
		if(typeof(keyCode) == 'object'){
			codeArr = keyCode;
		}
		
		var myKeyAction = new kola.ctrl.KeyAction({
			onKeyUp: function(code){
				if(codeArr.include(code)){
					callback(code);
				}
			}
		});
		return myKeyAction;
	};
});