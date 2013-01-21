$register('sohu.album.PhotoOrder', function(){
	sohu.album.PhotoOrder = Class.create({
		initialize: function(options){
			this.settings = {
				element: null,
				filter: '',
				cloneClass: '',
				aid: 0
			};
			Object.extend(this.settings, options);
			this.element = $(this.settings.element);
			this.parent = this.element.parent();
			this._num = this.element.size();
			this.order = new kola.anim.Order({
				element: this.settings.element,
				filter: this.settings.filter,
				clone: true,
				cloneClass: this.settings.cloneClass,
				onStart: function(el,i){this._start(el,i);}.bind(this),
				onChange: function(el, id, lastid){this._change(el,id,lastid);}.bind(this),
				onStop: function(el, lastEl){this._stop(el,lastEl);}.bind(this)
			});
			this._bind();
		},
		
		save: function(){
			var result = this.order.setValue();
			sohu.album.AlbumMdl.orderOk({
				u: Album.u,
				aid: this.settings.aid,
				result: result.join(',')
			}, {
				success: function(){
					sohu.album.AlbumCtl.go('list/list.do?u='+ Album.u + '&aid=' + this.settings._aid);
				}.bind(this),
				failure: function(){}
			});
		},
		
		desc: function(){
			var desc = this.order.getValue();
			desc.each(function(i){
					var el = $('#pid_'+ i);
					this.parent.prepend('<li id="pid_'+ i +'" style="cursor: move;">'+ el.html() +'</div>');
					el.remove();
			}.bind(this));
			this.order.setValue();
			this.order.rebind();
			if(this._clickBind){
				this.element.un('click', this._clickBind);
			};
			this.element = $(this.settings.element);
			this.element.on('click', this._clickBind);
		},
		
		regain: function(){
			if(this.order._default == this.order.getValue())return;
			this.order._default.reverse().each(function(i){
					var el = $('#pid_'+ i);
					this.parent.prepend('<li id="pid_'+ i +'" style="cursor: move;">'+ el.html() +'</div>');
					el.remove();
			}.bind(this));
			this.order._default.reverse();
			this.order.setValue();
			this.order.rebind();
			if(this._clickBind){
				this.element.un('click', this._clickBind);
			};
			this.element = $(this.settings.element);
			this.element.on('click', this._clickBind);
		},
		
		_bind: function(){
			if(!this._clickBind){
				this._clickBind = this._click.bindEvent(this);
			};
			this.element.on('click', this._clickBind);
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
			var pid = el.attr('id').replace(this.settings.filter,'');
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
		
		_start: function(el,i){
			var pid = el.attr('id').replace(this.settings.filter,'');
			if(!this._selected.include(pid)){
				el.addClass('selected');
				this._selected.push(pid);
			}
		},
		
		_change: function(el,id,lastid){
			this.element = $(this.settings.element);
			if(lastid>-1){
				if(lastid == this._num){
					this.element.get(this._num-1).removeClass("target-right");
				} else {
					this.element.get(lastid).removeClass("target-left");
				}
			}
			if(id < this._num){
				this.element.get(id).addClass("target-left");
			} else {
				this.element.get(this._num-1).addClass("target-right");
			}
		},
		
		_stop: function(el, lastEl){
			if(lastEl){
				lastEl.removeClass("target-right");
				lastEl.removeClass("target-left");
			}
			var id = el.attr('id').replace(this.settings.filter,'');
			var index = this._selected.index(id);
			for(var i = 0; i < this._selected.length; i++){
				var ele = $("#"+ this.settings.filter + this._selected[i]);
				if(i< index){
					el.before(ele.elements()[0]);
				}
				if(i>index){
					el.after(ele.elements()[0]);
				}
				ele.removeClass('selected');
			}
			this._selected = [];
		},
		
		_num: 0,
		_selected: []
	});
},'kola.anim.Order, kola.ctrl.KeyAction');