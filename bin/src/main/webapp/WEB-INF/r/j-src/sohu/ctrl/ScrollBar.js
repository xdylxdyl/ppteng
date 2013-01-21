/**
 * @fileoverview  自定义滚动条控件类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.bom packages
 */

$register(
	'sohu.ctrl.ScrollBar', function(){
		sohu.ctrl.ScrollBar = Class.create({
			/**
			 * 构造函数
			 * param {element} barEl 滚动条的容器
			 * param {element} viewEl 可视区的容器
			 * param {element} barEl 实际内容的容器
			 */
			initialize: function(barEl,viewEl,contentEl){
				this._build(barEl);
				this._initElements(barEl,viewEl,contentEl);
				this._initEvents();
				this._initProperties();
				this._initDisplay();
			},
			
			/**
			 * 改变大小时的重置滚动条
			 */
			resize: function(){
				this._reset();
			},
			/**
			 * 重新设置
			 */
			_reset: function(){
				if(this._viewableHeight){ 
					var newViewableHeight = parseInt(this._els.view.css('height'));
					this._top = Math.round((this._top * newViewableHeight)/ this._viewableHeight);
				}
				this._viewableHeight = parseInt(this._els.view.css('height'));
				this._contentHeight = this._els.content.prop('offsetHeight');
				this._trackOffsetTop = this._els.barTrack.pos().top;
				this._trackHeight = this._els.barTrack.prop('offsetHeight')-(this._initHandleTop * 2);
				this._handleHeight = Math.round((this._trackHeight * this._trackHeight) / this._contentHeight);
				this._setHandleTop(this._top);
				this._els.barHandle.css('height',this._handleHeight + 'px');
				// 这个滚动比例
				this._ratio = (this._contentHeight - this._viewableHeight)/(this._trackHeight - this._handleHeight);
			},
			
			/**
			 * 显示滚动条
			 */
			show: function(){
				this._els.bar.show();
			},
			
			/**
			 * 隐藏滚动条
			 */
			hide: function(){
				this._els.bar.hide();
			},
			
			/**
			 * 构建整个滚动条
			 */
			_build: function(barEl){
				var bar =  	'<div class="scrollbar">'+
								'<em class="scrollbarUp" onmouseover="this.className=\'scrollbarUp scrollbarUp-hover\'" onmouseout="this.className=\'scrollbarUp\'" onmousedown="this.className=\'scrollbarUp scrollbarUp-click\'" onmouseup="this.className=\'scrollbarUp scrollbarUp-hover\'"></em>'+
								'<em class="scrollbarHandle" style="top:0;height:0;" onmouseover="this.className=\'scrollbarHandle scrollbarHandle-hover\'" onmouseout="this.className=\'scrollbarHandle\'" onmousedown="this.className=\'scrollbarHandle scrollbarHandle-click\'" onmouseup="this.className=\'scrollbarHandle scrollbarHandle-hover\'">'+
									'<span class="scrollbarHandleTop"></span>'+
									'<span class="scrollbarHandleBottom"></span>'+
								'</em>'+
								'<em class="scrollbarDown" onmouseover="this.className=\'scrollbarDown scrollbarDown-hover\'" onmouseout="this.className=\'scrollbarDown\'" onmousedown="this.className=\'scrollbarDown scrollbarDown-click\'" onmouseup="this.className=\'scrollbarDown scrollbarDown-hover\'"></em>'+
							'</div>';
				barEl.html(bar);
			},
			
			/**
			 * 初始化html标签对象
			 */
			_initElements: function(barEl,viewEl,contentEl){
				this._els = {
					bar : $(barEl),
					view : $(viewEl),
					content: $(contentEl),
					barTrack: $(barEl).down('div.scrollbar'),
					barUp: $(barEl).down('em.scrollbarUp'),
					barDown: $(barEl).down('em.scrollbarDown'),
					barHandle: $(barEl).down('em.scrollbarHandle')
				};
			},
			
			/**
			 * 初始化事件绑定
			 */
			_initEvents: function(){
				this._event = {
					scrollTrack : this._scrollTrack.bindEvent(this),
					scrollUp : this._scrollUp.bindEvent(this),
					scrollDown : this._scrollDown.bindEvent(this),
					scrollHandle : this._scrollHandle.bindEvent(this),
					scrollDrag: this._scrollDrag.bindEvent(this),
					scrollStop : this._stopScroll.bindEvent(this)
				};
				this._els.barTrack.on('mousedown',this._event.scrollTrack);
				this._els.barUp.on('mousedown',this._event.scrollUp);
				this._els.barDown.on('mousedown',this._event.scrollDown);
				this._els.barHandle.on('mousedown',this._event.scrollHandle);
			},
			
			/**
			 * 重置参数
			 */
			_initProperties: function(){
				this._scrollStep = 5;
				this._initHandleTop = 17;
				this._scrollTimer = null;
				this._top = 0;
				this._mouseTopInHandle = 0;
				this._reset();
			},
			
			
			/**
			 * 初始化显示状态
			 */
			_initDisplay: function(){
				// 内容区域高度小于可视区域高度，隐藏滚动条，否则显示滚动条
				if (this._contentHeight < this._viewableHeight) {
					this.hide();
				} else {
					this.show();
				}
			},
			
			/**
			 * 开始滚动
			 */
			_startScroll: function (top) {
				this._stopScroll();
				// 绑定停止滚动的事件，所有停止滚动都是由mouseup事件触发
				$(document).on('mouseup',this._event.scrollStop);
				// 按步进值大小轮询滚动
				this._scrollTimer = window.setInterval(this._scrollBy.bind(this,top), 40);
			},
			
			/**
			 * 停止滚动
			 */
			_stopScroll: function () {
				// 清除定时器
				window.clearInterval(this._scrollTimer);
				// 解除事件绑定
				$(document).un('mouseup',this._event.scrollStop);
				$(document).un("mousemove", this._event.scrollDrag);
			},
			
			/**
			 * 向上滚动
			 */
			_scrollUp: function (e) {
				kola.Event.stop(e);
				this._startScroll(-this._scrollStep);
			},
			
			/**
			 * 向下滚动
			 */
			_scrollDown: function (e) {
				kola.Event.stop(e);
				this._startScroll(this._scrollStep);
			},
			
			/**
			 * 滚动到滚动轨道的点击的位置
			 */
			_scrollTrack: function (e) {
					// 当前鼠标的坐标
				var mouseTop = e.clientY + document.body.scrollTop,
					// 新的坐标值
					newTop = mouseTop - this._trackOffsetTop - this._handleHeight/2;
				// 内容滚动到当前新的坐标值
				this._scroll(newTop);
				kola.Event.stop(e);
			},
			
			/**
			 * 拖拽滚动条的滚动
			 */
			_scrollHandle: function (e) {
				this._mouseTopInHandle = e.clientY + document.body.scrollTop - this._els.barHandle.pos().top;
				// 绑定鼠标移动的事件，滚动条随鼠标一起移动
				$(document).on("mousemove", this._event.scrollDrag);
				// 绑定停止滚动的事件，所有停止滚动都是由mouseup事件触发
				$(document).on('mouseup',this._event.scrollStop);
				kola.Event.stop(e);
			},
			
			/**
			 * 拖动滚动条
			 */
			_scrollDrag: function (e) {
					// 新坐标变量
				var newHandleTop = 0,	
					// 当前鼠标的top坐标
					v = e.clientY + document.body.scrollTop - this._trackOffsetTop;
				
				if (v >= (this._trackHeight - this._handleHeight + this._mouseTopInHandle)){
					// 如果鼠标移动到滚动可视区域下边界外
					newTop = this._trackHeight - this._handleHeight;
				}else if (v <= this._mouseTopInHandle){
					// 如果鼠标移动到滚动可视区域上边界外
					newTop  = 0;
				}else {
					// 如果鼠标移动始终在滚动可视区域内
					newTop = v - this._mouseTopInHandle ;
				}
				
				this._setHandleTop(newTop);
				
				this._top = newTop;
				// 内容滚动到当前新的坐标值
				this._scrollTo(Math.round(this._top * this._ratio));
				kola.Event.stop(e);
			},
			
			/**
			 * 滚动到当前坐标值+给定距离
			 */
			_scrollBy: function (top) {
				this._scroll((-parseInt(this._els.content.css('top')) + top)/this._ratio);
			},
			
			_scroll: function (top) {				if (top > this._trackHeight - this._handleHeight + this._initHandleTop){
					// 坐标已经越出下边界
					top = this._trackHeight - this._handleHeight + this._initHandleTop ;
				}
				if (top < 0){
					// 坐标已经越出下上边界
					top = 0;
				}
				this._setHandleTop(top);
				 
				this._top = top;
		
				this._scrollTo(Math.round(this._top * this._ratio));
			},
	
			/**
			 * 滚动到给定坐标
			 */
			_scrollTo: function (top) {
				this._setPosition(-top);
			},
			
			/**
			 * 设置滚动控制条的top坐标值
			 */
			_setHandleTop: function(top){
				// 设置滚动控制条的相对于滚动滚到的top坐标，必须加上向上的箭头的高度值
				this._els.barHandle.css('top',(this._initHandleTop + top) + "px");
			},
			/**
			 * 设置坐标值
			 */
			_setPosition: function (top) {
				if (top < this._viewableHeight - this._contentHeight){ 
					// 坐标已经越出下上边界
					top = this._viewableHeight - this._contentHeight;
				}
				if (top > 0){
					// 坐标已经越出下上边界
					top = 0;
				}
				this._els.content.css('top',top + 'px');
			}
		});
		
		/**
		 * 纵向滚动条静态初始化
		 */
		sohu.ctrl.ScrollBar.initY = function(barEl,viewEl,contentEl){
			return new sohu.ctrl.ScrollBar(barEl,viewEl,contentEl);
		};
		
	})