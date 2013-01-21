/*
 * ������ Wink 
 *	author  QianCheng
 * version  1.0
 * base kola
*/

$register('kola.anim.Wink',function(){
	kola.anim.Wink = Class.create({	
		initialize:function(elem,options){
			this._options = Object.extend({
				speed: 1,
				time: 5,
				pClass: 'highLight'
			}, options || {})
			this._el = $(elem);
			
			this.action();
		},
		action: function() {
			if (this._timer) {
				this.stop();
			}
			
			this._stopTimer = this.stop.bind(this).timeout(this._options.time);
			this._index = 0;
			this._timer = this._action.bind(this).interval(this._options.speed);
		},
		_action: function() {
			if ((++this._index)%2!=0){
				this._el.addClass(this._options.pClass);
			}else {
				this._el.removeClass(this._options.pClass);
			}
		},
		stop: function() {
			window.clearInterval(this._timer);
			this._timer = null;
			this._el.removeClass(this._options.pClass);
			window.clearInterval(this._stopTimer);
			this._stopTimer = null;
			
			if(typeof(this._options.callback) == 'function') {
				this._options.callback();
			}
		}
	});
	kola.anim.Wink.action = function(elem, options) {
		return new kola.anim.Wink(elem, options);
	}
});