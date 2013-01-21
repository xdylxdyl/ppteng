$register('sohu.album.Order', function(){
	sohu.album.Order = Class.create({
		initialize: function(element, aid){
			this._element = element;
			this.parent = $('#photoSort .sortList');
			this.element = $(element);
			this._aid = aid;
			this._getResult();
			this.oldResult = this.result;
			
			this._ctrlPressDown = false;
			
			this._each = 85;
			this._islast = false;
			this._first = this.element.get(0).pos();
			
			var num = this.element.size();
			this._num = num;
			this._row = Math.floor(num / 6);
			if((num % 6)> 0) this._row++;
			this._bind();
		},
		
		_bind: function(){
			if(!this._clickBind){
				this._clickBind = this._click.bindEvent(this);
			};
			this.element.on('click', this._clickBind);
			this.drag = new kola.anim.Drag({
				element: this._element,
				opacity: 0.5,
				position: '',
				clone: true,
				onStart: function(el){this._start(el)}.bind(this),
				onStop: function(el){this._stop(el)}.bind(this),
				onMove: function(el,mouseXY,cloneXY){this._move(el,mouseXY,cloneXY)}.bind(this)
			});
			if(!this.bindKeyboard){
				this.bindKeyboard = new kola.ctrl.KeyAction({
					onKeyUp: function(code){
						if(code == 17){
							this._ctrlPressDown = false;
						}
					}.bind(this),
					onKeyDown: function(code){
						if(code == 17){
							this._ctrlPressDown = true;
						}
					}.bind(this)
				});
			}
		},
		
		_click: function(e){
			var el = kola.Event.element(e).upWithMe('li');
			var pid = el.attr('id');
			if(!this._selected.include(pid)){
				el.addClass('selected');
				this._selected.push(pid);
			} else {
				if(this._ctrlPressDown){
					el.removeClass('selected');
					this._selected.del(pid);
				}
			}
		},
		
		_start: function(el){
			var pid = el.attr('id');
			if(!this._selected.include(pid)){
				el.addClass('selected');
				this._selected.push(pid);
			}
		},
		
		_stop: function(el){
			if(this._canOrder  && this._nowEl){
				if(!this._islast){
					this._selected.each(function(i){
						var el = $('#'+ i);
						this._nowEl.before('<li id="'+ i +'" style="cursor: move;">'+ el.html() +'</div>');
						el.remove();
					}.bind(this));
				} else {
					this._selected.each(function(i){
						var el = $('#'+ i);
						this._nowEl.parent().append('<li id="'+ i +'" style="cursor: move;">'+ el.html() +'</div>');
						el.remove();
					}.bind(this));
				}
				this.drag.rebind();
				if(this._clickBind){
					this.element.un('click', this._clickBind);
				};
				this.element = $(this._element);
				this.element.on('click', this._clickBind);
				this._nowEl.attr('class','');
			}
			this._nowEl = null;
			this._islast = false;
			this._selected = [];
			this.result = [];
		},
		
		_move: function(el, mouseXY, cloneXY){
			var clone = this.drag._clone;
			clone.className = 'photoSortFloater';
			this._count(mouseXY);
		},
		/*
		 * 计算temp位置
		 */
		_count: function(mouseXY){
			var x = mouseXY.x  - this._first.left,
				  y = mouseXY.y  - this._first.top;
			if(x<0 || y<0) return;
			var X = { n: Math.floor(x/this._each), m: x % this._each};
			var Y = { n: Math.floor(y/this._each), m: y % this._each};
			
			var n = {x: X.n, y: Y.n};
			if(X.m>Math.round(this._each / 2)){
				n.x = X.n + 1;
			}
			if(Y.m>Math.round(this._each / 2)){
				n.y = Y.n + 1;
			}
			if(n.x > 6) n.x = 6;
			if(n.y > this._row) n.y = this._row;
			if(n.y < 1 || n.x < 0) return;
			var now = (n.y -1) * 6 + n.x; 
			if(this._nowEl)this._nowEl.attr('class','');
			
			if(now<=this._num){
				this._nowEl = this.element.get(now - 1);
				if(!this._nowEl)return;
				this._nowEl.attr('class', 'target-left');
			} else {
				this._islast = true;
				this._nowEl = this.element.get(this._num-1);
				this._nowEl.attr('class', 'target-right');
			}
			this._canOrder = true;
		},
		
		save: function(){
			this._getResult();
			sohu.album.AlbumMdl.orderOk({
				u: Album.u,
				aid: this._aid,
				result: this.result.join(',')
			}, {
				success: function(){
					sohu.album.AlbumCtl.go('list/list.do?u='+ Album.u + '&aid=' + this._aid);
				}.bind(this),
				failure: function(){}
			});
		},
		
		desc: function(){
			this._getResult();
			var desc = this.result;
			desc.each(function(i){
					var el = $('#pid_'+ i);
					this.parent.prepend('<li id="pid_'+ i +'" style="cursor: move;">'+ el.html() +'</div>');
					el.remove();
			}.bind(this));
			this._getResult();
			this.drag.rebind();
			if(this._clickBind){
				this.element.un('click', this._clickBind);
			};
			this.element = $(this._element);
			this.element.on('click', this._clickBind);
		},
		
		regain: function(){
			if(this.oldResult == this.result)return;
			this.oldResult.reverse().each(function(i){
					var el = $('#pid_'+ i);
					this.parent.prepend('<li id="pid_'+ i +'" style="cursor: move;">'+ el.html() +'</div>');
					el.remove();
			}.bind(this));
			this.oldResult.reverse();
			this._getResult();
			this.drag.rebind();
			if(this._clickBind){
				this.element.un('click', this._clickBind);
			};
			this.element = $(this._element);
			this.element.on('click', this._clickBind);
		},
		
		_getResult: function(){
			this.result = [];
			$(this._element).each(function(el){
				this.result.push(el.attr('id').replace('pid_',''));
			}.bind(this));
		},
		
		_canOrder: false,
		result: [],
		oldResult: [],
		_selected: [],
		_isChanged: false
	});
}, 'kola.anim.Drag, kola.ctrl.KeyAction');