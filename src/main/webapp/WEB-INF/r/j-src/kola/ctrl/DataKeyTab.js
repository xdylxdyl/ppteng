 /**
 * @fileoverview  实现Tab功能，通过DataKey的形式
 * @author  Jady@Live.com
 * @version  0.1
 */
 
$register('kola.ctrl.DataKeyTab', function() {
	kola.ctrl.DataKeyTab = Class.create({
		initialize: function(tabs, options) {
			
			//	设置相应的配置参数
			this.options = Object.extend({
					activeSelector:	null,				//	激活元素的选择器
					overClass:		'',				// 	鼠标滑过的样式
					activeClass: 	'on',				//	激活时要添加的样式名称
					activeEvent: 	'click',			//	激活事件
					firstCall: 		false,				//	初始化之后是否对默认的激活的Tab执行初始化方法
					refresh:		true,				//	Tab是否能够刷新，也就是说单击现在激活的Tab是否还会触发这个Tab对应的方法
					callback: 		function() {}		//	激活之后的回调方法
				}, options || {});
			
			this.resetTabs(tabs, this.options);
			
			//	如果需要进行初次调用并且存在选中值的话，进行初次调用
			if (this.options.firstCall && this.keyIndex != -1) {
				this._evalCall();
			}
		},
		
		key: null,
		
		//	激活某一个Tab
		active: function(key, refresh) {
			key = this._getKeyIndex(key);
			//	切换Tab的显示状态
			if (this.keyIndex != -1) {
				this.tabs.get(this.keyIndex).removeClass(this.options.activeClass);
			}
			this.keyIndex = key;
			this.tabs.get(this.keyIndex).removeClass(this.options.overClass).addClass(this.options.activeClass);
			this._refreshKey();
			
			//	如果是当前值，而且不能刷新的话，不作任何处理
			if (!refresh && !this.options.refresh && key == this.keyIndex) return this;
			
			//	对激活的Tab进行相应的调用
			this._evalCall();
			return this;
		},
		
		/**
		 * 获取tab的索引值
		 */
		_getKeyIndex: function(key){
			//	把key转化成将要激活的tab的位移值
			switch (typeof(key)) {
				case 'string':
					key = this.keys['key-' + key];
					break;
				case 'undefined':
					key = this.keyIndex;
					break;
			}
			return key;
		},
		//	重新设置tab
		resetTabs: function(tabs, options) {
			
			//	清楚掉原来的事件绑定
			if (this._tabActiveHandler) {
				this._activeEls.un(this.options.activeEvent, this._tabActiveHandler);
			}
			if(this._tabOverHandler){
				this._activeEls.un('mouseover', this._tabOverHandler);
			}
			if(this._tabOverHandler){
				this._activeEls.un('mouseout', this._tabOutHandler);
			}
			//	重新获取tab
			if (tabs) {
				this.tabs = $(tabs).clone();
			}
			if (this.options && this.options.activeSelector) {
				this._activeEls = null;
				this.tabs.each(function(el, i) {
					if (this._activeEls) {
						this._activeEls = this._activeEls.concat(el.down(this.options.activeSelector));
					} else {
						this._activeEls = el.down(this.options.activeSelector);
					}
				}.bind(this));
			} else {
				this._activeEls = this.tabs;
			}
			
			
			//	建立Key
			this.keys = [],
			this.keyIndex = -1;
			this.tabs.each(function(it, i) {
				var v = it.data('tabkey');
				if (v == null) v = '' + i;
				this.keys.push(v);
				this.keys['key-' + v] = this.keys.length - 1;
				if (it.hasClass(this.options.activeClass)) this.keyIndex = i;
			}.bind(this));
			this._refreshKey();
			
			//	在Tab上绑定相应的切换事件
			this._tabOverHandler = this._onMouseOver.bindEvent(this);
			this._tabOutHandler = this._onMouseOut.bindEvent(this);
			this._tabActiveHandler = this._onActive.bindEvent(this);
			this._activeEls.on('mouseover', this._tabOverHandler);
			this._activeEls.on('mouseout', this._tabOutHandler);
			this._activeEls.on(this.options.activeEvent, this._tabActiveHandler);
			
			return this;
		},
		
		//	新Tab被激活后，调用的方法
		_evalCall: function() {
			if (this.options.callback) this.options.callback(this.keys[this.keyIndex]);
		},
		
		//	重新设置对象的key属性
		_refreshKey: function() {
			this.key = this.keyIndex == -1 ? null : this.keys[this.keyIndex];
		},
		
		
		/**
		 * 鼠标滑过事件处理方法
		 */
		_onMouseOver: function(e){
			var key = this._getKeyIndex(kola.Event.element(e).upWithMe('[data-tabkey]').data('tabkey'));
		
			if(key != this.keyIndex){
				this.tabs.get(key).addClass(this.options.overClass);
			}
		},
		
		/**
		 * 鼠标移除事件处理方法
		 */
		_onMouseOut: function(e){
			var key = this._getKeyIndex(kola.Event.element(e).upWithMe('[data-tabkey]').data('tabkey'));
		
			if(key != this.keyIndex){
				this.tabs.get(key).removeClass(this.options.overClass);
			}
		},
		
		//	Tab准备被激活时的处理方法
		_onActive: function(e) {
			this.active(kola.Event.element(e).upWithMe('[data-tabkey]').data('tabkey'));
		}
	});
});