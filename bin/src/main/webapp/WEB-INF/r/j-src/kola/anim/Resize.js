$register('kola.anim.Resize', function(){
	kola.anim.Resize = Class.create({
		initialize: function(options){
			this.settings = {
				element: null, //resize target
				parent: null,
				left:    0,
				top:	 0,
				max:	[0, 0],
				min:	[0, 0],
				btn: {
					btnNW: null, //north west
					btnNM: null, //north middle
					btnNE: null, //north east
					btnWM: null, //west middle
					btnEM: null, //east middle
					btnSW: null, //south west
					btnSM: null, //south middle
					btnSE: null //south east
				},
				onChange: function(){}
			};
			Object.extend(this.settings, options);
			this.element = $(this.settings.element);
			this._bind();
			return this;
		},
		
		_bind: function(){
			var element = this.element;
			var btn = this.settings.btn;
			this._setMiddle();
			for(var it in btn){
				var el = btn[it];
				if(el){
					var ele = $(el);
					ele.on('mousedown',this._down.bindEvent(this, it));
				}
			}
			this._pos.left = this.settings.left || 0;
			this._pos.top = this.settings.top || 0;
			element.css('left',this._pos.left + 'px');
			element.css('top',this._pos.top + 'px');
		},
		
		_down: function(e, type){
			var element = this.element;
			var M = this._getMouseXY(e);
			this._pos.x = M.x;
			this._pos.y = M.y;
			this._pos.xx = M.x - this._pos.left;
			this._pos.yy  = M.y - this._pos.top;
			this._pos.width = element.width();
			this._pos.height = element.height();
			this._pos.maxLeft = this._pos.left + this._pos.width - this.settings.min[0];
			this._pos.maxTop = this._pos.top + this._pos.height - this.settings.min[1];
			if(!this.moveBind){
				this.moveBind = this._move.bindEvent(this, type);
				$(document).on('mousemove', this.moveBind);
			} 
			if(!this.upBind){
				this.upBind = this._up.bindEvent(this, type);
				$(document).on('mouseup', this.upBind);
			} 
			this._status = 1;
			kola.Event.stop(e);
		},
		
		_move: function(e, type){
			var element = this.element;
			if(this._status == 0) return;
			this._status = 2;
			var M = this._getMouseXY(e),
				el = element.elements()[0];
			switch (type){
				case 'btnNW':{
					this._pos.left = M.x - this._pos.xx;
					this._pos.top = M.y - this._pos.yy;
					this._pos.width += this._pos.x - M.x;
					this._pos.height += this._pos.y - M.y;
					break;
				}
				case 'btnNM':{
					this._pos.top = M.y - this._pos.yy;
					this._pos.height += this._pos.y - M.y;
					break;
				}
				case 'btnNE':{
					this._pos.top = M.y - this._pos.yy;
					this._pos.width -= this._pos.x - M.x;
					this._pos.height += this._pos.y - M.y;
					break;
				}
				case 'btnWM':{
					this._pos.left = M.x - this._pos.xx;
					this._pos.width += this._pos.x - M.x;
					break;
				}
				case 'btnEM':{
					this._pos.width -= this._pos.x - M.x;
					break;
				}
				case 'btnSW':{
					this._pos.left = M.x - this._pos.xx;
					this._pos.width += this._pos.x - M.x;
					this._pos.height -= this._pos.y - M.y;
					break;
				}
				case 'btnSM':{
					this._pos.height -= this._pos.y - M.y;
					break;
				}
				case 'btnSE':{
					this._pos.width -= this._pos.x - M.x;
					this._pos.height -= this._pos.y - M.y;
					break;
				}
			}
			var max = this.settings.max;
			var min = this.settings.min;
			if(this._pos.width < min[0])
				this._pos.width = min[0];
			if(this._pos.height < min[1])
				this._pos.height = min[1];
			///判断最大值
			if(max[0] != 0){
				if(this._pos.width > max[0])
					this._pos.width = max[0];
				if(this._pos.height > max[1])
					this._pos.height = max[1];
			}
			if(this._pos.top > this._pos.maxTop)
				this._pos.top = this._pos.maxTop;
			if(this._pos.left > this._pos.maxLeft)
				this._pos.left = this._pos.maxLeft;
			///判断是否在某个容器内
			if(this.settings.parent){
				this._parent = $(this.settings.parent);
				var _pos =this._parent.pos();
				var _width = this._parent.width(),
					_height = this._parent.height();
				if(this._pos.left < _pos.left)
					this._pos.left = _pos.left
				if(this._pos.top < _pos.top)
					this._pos.top = _pos.top
				if(this._pos.left + this._pos.width > _pos.left + _width)
					this._pos.width = _pos.left + _width - this._pos.left;
				if(this._pos.top + this._pos.height > _pos.top + _height)
					this._pos.height = _pos.top + _height - this._pos.top;
			}
			with(el.style){
				left = this._pos.left + 'px';
				top = this._pos.top + 'px';
				width = this._pos.width + 'px';
				height = this._pos.height + 'px';
			}
			this._setMiddle();
			this._pos.x = M.x;
			this._pos.y = M.y;
			this.settings.onChange.apply(null, [this._pos.left, this._pos.top, this._pos.width, this._pos.height]);
			kola.Event.stop(e);
		},
		
		_up: function(e, type){
			var element = this.element;
			if(this._status != 2){
				this._status = 0;
				return;
			} 
			if(this.moveBind){
				$(document).un('mousemove', this.moveBind);
				this.moveBind = false;
			}
			if(this.upBind){
				$(document).un('mouseup', this.upBind);
				this.upBind = false;
			}
			this._status = 0;
			kola.Event.stop(e);
		},
		_pos: {
			x: 0, //鼠标绝对坐标
			y: 0,
			xx: 0, ///鼠标相对坐标与绝对坐标的差值
			yy: 0,
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			maxLeft: 0,
			maxTop: 0
		},
		_status: 0, ///0未进行任何操作，1是单击操作，未移动，2移动操作
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
		},
		_setMiddle: function(){
			return;
			var btn = this.settings.btn, ele = null;
			var w = Math.round(this.element.width() / 2), h = Math.round(this.element.height() / 2);
			if(btn.btnNM){
				ele = $(btn.btnNM)
				ele.css('left', Math.round(w - ele.width() / 2) + 'px');
			}
			if(btn.btnWM){
				ele = $(btn.btnWM)
				ele.css('top', Math.round(h - ele.width() / 2) + 'px');
			}
			if(btn.btnEM){
				ele = $(btn.btnEM)
				ele.css('top', Math.round(h - ele.width() / 2) + 'px');
			}
			if(btn.btnSM){
				ele = $(btn.btnSM)
				ele.css('left', Math.round(w - ele.width() / 2) + 'px');
			}
		}
	});
});