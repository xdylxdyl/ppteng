$register('kola.anim.Order', function(){
	kola.anim.Order = Class.create({
		initialize: function(options){
			this.settings = {
				element: null,
				opacity: 0.5,
				clone: true,
				cloneClass: '',
				filter: '',
				onStart: function(el){},
				onChange: function(el, id, lastid){},
				onStop: function(el,lastel){}
			};
			Object.extend(this.settings, options);
			
			this._default = this._result = this._getResult();
			this.parent = this.element.parent();
			this.drag = new kola.anim.Drag({
				element: this.settings.element,
				opacity: this.settings.opacity,
				position: '',
				revert:true, 
				cloneClass: this.settings.cloneClass,
				clone: this.settings.clone,
				onStart: function(el,i){this._start(el,i)}.bind(this),
				onStop: function(el){this._stop(el)}.bind(this),
				onMove: function(el,mouseXY,cloneXY){this._move(el,mouseXY,cloneXY)}.bind(this)
			});
			this.element.each(function(it){
				this._pos.push({
					left: it.pos().left,
					top: it.pos().top,
					width: it.width(),
					height: it.height()
				});
			}.bind(this));
		},
		
		_start: function(el, i){
			this._selected = el;
			this._selectid = i;
			this._selectPos = {width: el.width(), height: el.height()};
			this.settings.onStart.apply(null,[el,i]);
		},
		
		_stop: function(el){
			if(!el)return;
			var _size = this.element.size();
			var _id = this._lastid;
			var lastEl = this.element.get(_id);
			if(_id > -1 && this._selectid != _id){
				if(_id <= _size - 1){  ///insertBefore
					if(this.element.get(_id))this.element.get(_id).before(el.elements()[0]);
				} else { ///insertAfter
					if(this.element.get(_size - 1))this.element.get(_size - 1).after(el.elements()[0]);
					lastEl = this.element.get(_size - 1);
				}
				this._result = this._getResult();
				this._pos = [];
				this.element.each(function(it){
					this._pos.push({
						left: it.pos().left,
						top: it.pos().top,
						width: it.width(),
						height: it.height()
					});
				}.bind(this));
			}
			this.settings.onStop.apply(null,[el,lastEl]);
		},
		
		_move: function(el, mouseXY, cloneXY){
			var x = 0, y = 0, findid = 0, find = false;
			for(var i = 0, il = this._pos.length; i < il; i++){
				it = this._pos[i];
				x = it.left + Math.round(it.width / 2);
				y = it.top + Math.round(it.height / 2);
				if(cloneXY.x > x && cloneXY.y > y){
					findid++;
				} else {
					if(cloneXY.y > y){
						findid++;
					} else {
						if(cloneXY.x > x){
							findid++;
						} else {
							find = true;
						}
					}
				}
				if(find)break;
			}
			if(findid != this._lastid){
				this.settings.onChange.apply(null,[el, findid, this._lastid]);
				this._lastid = findid;
			}
		},
		
		getValue: function(){
			return this._result;
		},
		
		setValue: function(){
			this._result = this._getResult();
			return this._result;
		},
		
		rebind: function(){
			this.drag._rebind();
		},
		
		_getResult: function(){
			this.element = $(this.settings.element);
			var r = [], f = this.settings.filter;
			this.element.each(function(it){
				r.push(it.attr('id').replace(f,''));
			});
			return r;
		},
		
		_lastid: -1,
		_pos: [],							///可拖动元素的坐标大小数组
		_default:[], 					///初始顺序
		_result: [],  					///修改后的顺序
		_selected: null,  			///拖动的元素
		_selectid: 0, 					///拖动的元素是第几个
		_selectPos: {}					///拖动的元素长宽
	});
}, 'kola.anim.Drag');