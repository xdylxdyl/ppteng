$register('sohu.album.Divert', function(){
	sohu.album.Divert = Class.create({
		initialize: function(options){
			this.settings = {
				canvasEl: null,
				albumEl: null,
				aid: 0
			};
			Object.extend(this.settings, options);
			this.element = $(this.settings.canvasEl);
			this.element.down('img').on('click', this._bindImg.bindEvent(this));
			this.element.down('input').on('click', this._bindInput.bindEvent(this));
			this.settings.albumEl.each(function(ele){
				$(ele).on('change',this._albumChange.bindEvent(this, e));
			}.bind(this));
		},
		
		_albumChange: function(e){
			var input = kola.Event.element(e);
			var v = input.val();
			this.settings.albumEl.each(function(ele){
				$(ele).val(v);
			});
		},
		
		_bindImg: function(e){
			var el = kola.Event.element(e);
			var input = el.parent().next().elements()[0];
			if(input.checked){
				input.checked = '';
				this._delVal(input.id)
			} else {
				input.checked = 'checked';
				this._addVal(input.id)
			}
			kola.Event.stop(e);
		},
		
		_bindInput: function(e){
			var el = kola.Event.element(e);
			var input = el.elements()[0];
			if(!input.checked){
				//input.checked = '';
				this._delVal(input.id);
			} else {
				//input.checked = 'checked';
				this._addVal(input.id);
			}
		},
		
		_addVal: function(id){
			id = id.replace('pid_','');
			if(!this._selected.include(id)){
				this._selected.push(id);
			}
		},
		
		_delVal: function(id){
			id = id.replace('pid_','');
			if(this._selected.include(id)){
				this._selected.del(id);
			}
		},
		
		selectAll: function(){
			this.element.down('input').each(function(it){
				var el = it.elements()[0];
				el.checked = 'checked';
				this._addVal(el.id)
			}.bind(this));
			return false;
		},
		
		selectOther: function(){
			this.element.down('input').each(function(it){
				var el = it.elements()[0];
				if(el.checked){
					el.checked = '';
					this._delVal(el.id)
				} else {
					el.checked = 'checked';
					this._addVal(el.id)
				}
			}.bind(this));
			return false;
		},
		
		save: function(){
			if(this._selected < 0){
				sohu.album.AlbumCtl.go('list/list.do?aid='+ this.settings.aid);
				return;
			}
			sohu.album.AlbumMdl.divertOk({
				result: this._selected.join(','),
				toaid: $(this.settings.albumEl[0]).val(),
				u: Album.u
			}, {
				success: function(){
					this._selected = [];
					sohu.album.AlbumCtl.go('list/list.do?aid='+ this.settings.aid + '&u='+ Album.u);
				}.bind(this),
				failure: function(){}
			});
		},
		
		//check: function(){
			//this._selected.each(function(img){
				//var el = this.element.down(img).elements()[0];
				//el.checked = 'checked';
			//}.bind(this));
		//},
		
		_selected:[]
	});
}, 'sohu.album.*');