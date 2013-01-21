/*
 * 鼠标拖拽移动功能
 * yunyan@sohu-inc.com
 */
$register('kola.anim.Drag', function(){
	kola.anim.Drag = Class.create({
		initialize: function(options){
			this.settings = {
				element: 	null, ///拖动元素
				target:		null, ///拖动对象元素
				parent:		null, ///可拖动范围容器
				cursor:		'move',
				opacity: 	1,
				cloneClass: '',
				clone:		false, ///是否是克隆拖拽
				revert:		false, ///是否复位
				position: 	'relative',
				onStart:	function(el){},  ///el为拖动的目标对象
				onStop:		function(el){},  ///el为拖动的目标对象
				onMove:		function(el, mouseXY, cloneXY){}  ///el为拖动的目标对象,mouseXY鼠标移动坐标，克隆对象的坐标
			};
			Object.extend(this.settings, options);
			this._bind();
			return this;
		},
		_max: {left:0, top: 0}, 	///最大移动的坐标
		_min: {left:0, top: 0}, 	///最小移动的坐标
		_mouseDown: {x:0, y:0},		///鼠标着力点的坐标
		_mouseMove: {x:0, y:0},		///鼠标移动时的坐标
		_margin: {x:0, y:0},		///鼠标着力点与拖动元素之间的间隔
		_curElement: null,			///当前触发的拖动元素
		_curTargetXY: {left:0, top:0},///拖动元素的坐标
		_curTarget: null,			///当前拖动的对象
		_status: 0, 				///0未进行任何操作，1按下，2移动
		_clone: null,				///克隆对象
		_cloneXY: {x:0, y:0},	///克隆对象的坐标
		
		
		
		_pos:{
			element: {left: 0, top: 0},	///
			mouse: {x: 0, y: 0} 		///鼠标着力点的坐标
		},
		_lastValue:{},
		/*
		 * 绑定对象
		 */
		_bind: function(){
			this.element = $(this.settings.element);
			if(this.settings.target){
				this.target = $(this.settings.target);
			} else {
				this.target = this.element;
			}
			this.element.css('cursor', this.settings.cursor);
			this.target.css('position', this.settings.position);
			if(!this._bindEvent){
				this._bindEvent = this._down.bindEvent(this);
			}
			this.element.on('mousedown', this._bindEvent);
		},
		/*
		 * 重新绑定对象
		 */
		_rebind: function(){
			if(this._bindEvent){
				this.element.un('mousedown', this._bindEvent);
			}
			this.element = $(this.settings.element);
			if(this.settings.target){
				this.target = $(this.settings.target);
			} else {
				this.target = this.element;
			}
			this.element.on('mousedown', this._bindEvent);
		},
		
		_down: function(e){
			if(this.settings.parent){
				var _parent = $(this.settings.parent);
				this._min = _parent.pos();
				this._max.left = this._min.left + _parent.width() - this.target.width();
				this._max.top = this._min.top + _parent.height() - this.target.height();
			}
			var ele = kola.Event.element(e).elements()[0],
				elements = this.element.elements(),
				_find = false,
				_i = 0;
			while(ele){
				for(var i = 0, il = elements.length; i <　il; i++){
					if(elements[i] == ele){
						_i = i;
						_find = true;
						break;
					}
				}
				if(_find) break;
				ele = ele.parentNode;
			}
			this._curElement = this.element.get(_i);
			this._curTarget = this.target.get(_i);
			Object.extend(this._mouseDown,this._getMouseXY(e));
			Object.extend(this._curTargetXY, this._curTarget.pos());
			this._margin = {
				x: this._mouseDown.x - this._curTargetXY.left,
				y: this._mouseDown.y - this._curTargetXY.top
			};
			if(!this._moveBind){
				this._moveBind = this._move.bindEvent(this);
				$(document).on('mousemove', this._moveBind);
			} 
			if(!this._upBind){
				this._upBind = this._up.bindEvent(this);
				$(document).on('mouseup', this._upBind);
			} 
			this.settings.onStart.apply(null, [this._curTarget, _i]);
			this._status = 1;
			kola.Event.stop(e);
			return false;
		},
		_move: function(e){
			if(this._status == 0) return;  ///若没有按下，返回
			this._status = 2;
			Object.extend(this._mouseMove,this._getMouseXY(e));
			if(!this._clone){
				this._clone = document.createElement('div');
				document.body.appendChild(this._clone);
				$(this._clone).html(this._curTarget.html());
				this._clone.className = this.settings.cloneClass;
				if(!this.settings.clone){
					this._curTarget.hide();
				}
			}
			var _cloneXY = {x:this._repos('left', this._mouseMove.x - this._margin.x), y:this._repos('top', this._mouseMove.y - this._margin.y)};
			with(this._clone.style){
				left = _cloneXY.x + 'px';
				top = _cloneXY.y + 'px';
				position = 'absolute';
				opacity = this.settings.opacity;
            	filter = "alpha(opacity:" + this.settings.opacity * 100 + ")";
			}
			this._cloneXY = _cloneXY;
			this.settings.onMove.apply(null, [this._curTarget, this._mouseMove, _cloneXY]);
			kola.Event.stop(e);
			return false;
		},
		_up: function(e){
			if(this._status != 2){
				this._status = 0;
				return;
			} 
			var _top, _left;
			if(this.moveBind){
				$(document).un('mousemove', this.moveBind);
				this.moveBind = false;
			}
			if(this.upBind){
				$(document).un('mouseup', this.upBind);
				this.upBind = false;
			}
			if(!this.settings.revert){
				var _parent = this._curTarget.parent();
				if(this.settings.position == 'absolute'){
					_left = this._cloneXY.x;
					_top = this._cloneXY.y;
				} else {
					if(_parent){
						var t =_parent.pos();
						_left = this._cloneXY.x - t.left;
						_top = this._cloneXY.y - t.top;
					}
				}
				this._curTarget.css('left',_left + 'px');
				this._curTarget.css('top',_top + 'px');
			}
			this._curTarget.show();
			$(this._clone).remove();
			this._clone = null;
			this._status = 0;
			this._rebind();
			this.settings.onStop.apply(null, [this._curTarget, this._mouseMove, this._cloneXY]);
			kola.Event.stop(e);
			return false;
		},
		
		_repos:function(str,value){
			if(this.settings.parent){
				if(value < this._min[str]){
					value = this._min[str];
				};
				if(value > this._max[str]){
					value = this._max[str];
				}
			}
			return value;
		},
		_getMouseXY: function(e){
			if (e.pageX || e.pageY) {
	            return {
	                x: e.pageX,
	                y: e.pageY
	            };
	        }
	        return {
	            x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
	            y: e.clientY + document.body.scrollTop - document.body.clientTop
	        };
		}
	});
});