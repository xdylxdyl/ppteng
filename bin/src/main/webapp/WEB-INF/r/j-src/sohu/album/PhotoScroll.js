$register('sohu.album.PhotoScroll', function(){
	sohu.album.PhotoScroll = Class.create({
		initialize: function(options){
			this.settings = {
				boxEl: null,
				photoList: null,
				curIndex: 0,
				num: 5
			};
			Object.extend(this.settings, options);
			this.box = $(this.settings.boxEl);
			this.list = this.settings.photoList;
			this.count = this.list.length;
			this.current = this.settings.curIndex;
			var r = [];
			var n = (this.settings.num - 1) / 2;
			for(var i = this.current - n, il = this.current + n; i <= il; i++){
				r.push(this._getIndex(i));
			}
			this.box.html(r.join(''));
			return this;
		},
		
		action: function(num){
				this.current  = this.current + num;
				if(num == 1){
					this._addChild(this.current + 2,true);
				}
				if(num == -1){
					this._addChild(this.current - 2, false);
				}
				if(num == 2){
					this._addChild(this.current + 1,true);
					this._addChild(this.current + 2,true);
				}
				if(num == -2){
					this._addChild(this.current - 1, false);
					this._addChild(this.current - 2, false);
				}
		},
		
		_addChild: function(i, isLast){
			if(isLast){
				this.box.append(this._getIndex(i));
				this.box.children().get(0).remove();
			} else {
				this.box.prepend(this._getIndex(i));
				var child = this.box.children();
				child.get(child.size()-1).remove();
			}
		},
		
		_getIndex: function(index){
			var r = '';
			if(index < this.count && index > -1){
				r = '<li><a href="javascript:void(0)" onclick="Album.photo.current('+ index +')"><img class="photo-50" src="'+ this.list[index].surl +'" title="'+ this.list[index].desc +'" alt="'+ this.list[index].desc +'" /></a></li>'
			} else {
				r = '<li>&nbsp;</li>'
			}
			return r;
		}
	});
});