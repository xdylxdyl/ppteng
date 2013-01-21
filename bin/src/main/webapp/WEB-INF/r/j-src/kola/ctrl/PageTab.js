 /**
 * @fileoverview  PageTab类
 * @author  Jady@Live.com
 * @version  0.1
 */
 
$register('kola.ctrl.PageTab', function() {
	kola.ctrl.PageTab = Class.create({
		initialize: function(tabs, options) {
			this._setOptions(options);
			this.resetTabs(tabs, this.options);
		},
		
		_setOptions: function(options) {
			//	设置相应的配置参数
			this.options = Object.extend({
					pages: 			null,				//	tab对应的页面
					activeSelector:	null,				//	激活元素的选择器
					overClass:		'',					// 	鼠标滑过的样式
					activeClass: 	'on',				//	激活时要添加的样式名称
					activeEvent: 	'click',			//	激活事件
					callback:		null				// 切换完tab的回调
				}, options || {}); 
		},
		
		//	激活某一个Tab
		active: function(key) {
			//	切换Tab的显示状态
			if (this.keyIndex != -1) {
				this.tabs.get(this.keyIndex).removeClass(this.options.activeClass);
				var el = this.pages.get(this.keyIndex);
				if (el) el.hide();
			}
			this.keyIndex = key;
			this.tabs.get(this.keyIndex).removeClass(this.options.overClass).addClass(this.options.activeClass);
			var el = this.pages.get(this.keyIndex);
			if (el) el.show();
			// 回调
			if(this.options.callback) this.options.callback(this.tabs.get(this.keyIndex));
			
			return this;
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
			//	重新获取tab和page
			this._setOptions(options);
			this.tabs = $(tabs).clone();
			this.pages = $(this.options.pages);
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
			this.keyIndex = -1;
			this.tabs.each(function(it, i) {
				it.data('tabkey', i);
				if (it.hasClass(this.options.activeClass)) this.keyIndex = i;
			}.bind(this));
			
			//	在Tab上绑定相应的切换事件
			this._tabOverHandler = this._onMouseOver.bindEvent(this);
			this._tabOutHandler = this._onMouseOut.bindEvent(this);
			this._tabActiveHandler = this._onActive.bindEvent(this);
			this._activeEls.on('mouseover', this._tabOverHandler);
			this._activeEls.on('mouseout', this._tabOutHandler);
			this._activeEls.on(this.options.activeEvent, this._tabActiveHandler);
			
			return this;
		},
		
		/**
		 * 鼠标滑过事件处理方法
		 */
		_onMouseOver: function(e){
			var tab = kola.Event.element(e).upWithMe('[data-tabkey]');
			if(tab.data('tabkey') != this.keyIndex){
				tab.addClass(this.options.overClass);
			}
		},
		
		/**
		 * 鼠标移除事件处理方法
		 */
		_onMouseOut: function(e){
			var tab = kola.Event.element(e).upWithMe('[data-tabkey]');
			if(tab.data('tabkey') != this.keyIndex){
				tab.removeClass(this.options.overClass);
			}
		},
		
		//	Tab准备被激活时的处理方法
		_onActive: function(e) {
			this.active(parseInt(kola.Event.element(e).upWithMe('[data-tabkey]').data('tabkey')));
		}
	});
});