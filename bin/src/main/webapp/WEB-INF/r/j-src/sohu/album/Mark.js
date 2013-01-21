$register('sohu.album.Mark', function(){
	sohu.album.Mark = Class.create({
		initialize: function(options){
			this.settings = {
				photoEl: null,
				boxEl: null,
				dialogEl: null,
				photoId: 0,
				textEl: '#textselector',
				friendEl: '#markFirend',
				markBox: '#markdivBox',
				markDesc: '#markDesc',
				markTagText: '#markdivDesc',
				onSubmit: function(){},
				onCancel: function(){}
			};
			Object.extend(this.settings, options);
			this.photoEl = $(this.settings.photoEl);
			this.boxEl = $(this.settings.boxEl);
			this.markTagText = $(this.settings.markTagText);
			this.markBox = $(this.settings.markBox);
			this.markDesc = $(this.settings.markDesc);
			this.dialogEl = $(this.settings.dialogEl);
			this._photoXY = this.photoEl.pos();

			return this;
		},
		
		loadSelector: function(){
			if(!this.friendSelector){
				var _this = this;
				 $call(function(){
						_this.friendSelector = new sohu.friend.Selector({
				            element:'#friendselector',
				            isButton:true,
				            addMe: true
				        });
			    }, 'sohu.friend.*');
			}
		},
		
		draw: function(options){
			this.photoEl = $(this.settings.photoEl);
			this._photoXY = this.photoEl.pos();
			var x =options.x,
				  y = options.y,
				  w = options.width,
				  h = options.height,
				  id = options.id;
			var _left = this._photoXY.left + parseInt(x);
			var _top = this._photoXY.top + parseInt(y);
			var r =[], t= [];
			this._markList[id] = options;
			r.push('<div id="mark_'+ id +'" class="photoTagBox" style="top:'+ _top+'px; left: '+ _left +'px; display:none;">');
			r.push('<div class="photoTagBoxInt" style="width:'+ w +'px; height:'+ h +'px;"><div class="frame"></div></div>');
			r.push('</div>');
			t.push('<span id="marktip_'+ id +'" onmouseover="Album.photo.Mark.show('+ options.id +')" onmouseout="Album.photo.Mark.hide('+ options.id +')"> ')
			if(options.markedUserId && options.markedUserId != 0){
				t.push('<a href="/profile.do?u='+ options.markedUserId +'" target="_blank" title="'+ options.markedUserName +'">'+ options.markedUserName +'</a>');
				this._tagTextList[id] = options.markedUserName;
			} else {
				t.push(options.markDesc);
				this._tagTextList[id] = options.markDesc;
			}
			t.push('(<a href="/profile.do?u='+ options.markUserId +'" target="_blank" title="'+ options.markUserName +'">'+ options.markUserName +'</a>标记');
			if(options.canDel)
				t.push('<a class="icon i-del" href="javascript:void(0)" onclick="Album.photo.Mark.del('+ options.id +')" title="删除此条标记">删除</a>')
			t.push(')</span>');
			this.markBox.append(r.join(''));
			this.markDesc.append(t.join(''));
			this.markDesc.parent().show();
			if(!this.bindMouseOver){
				this.bindMouseOver = this._mouseOne.bindEvent(this);
			} else {
				this.markBox.down('.photoTagBox').un('mouseover', this.bindMouseOver);
			}
			this.markBox.down('.photoTagBox').on('mouseover', this.bindMouseOver);
			if(!this.bindMouseOut){
				this.bindMouseOut = this._mouseOneOut.bindEvent(this);
			} else {
				this.markBox.down('.photoTagBox').un('mouseover', this.bindMouseOut);
			}
			this.markBox.down('.photoTagBox').on('mouseout', this.bindMouseOut);
		},
		
		_mouseOne: function(e){
			this.showAll();
			var el = kola.Event.element(e).upWithMe('.photoTagBox');
			if(el){
				el.addClass('photoTagBox-hover');
				var id = parseInt(el.attr('id').replace('mark_',''));
				this.show(id);
			}
		},
		
		_mouseOneOut: function(e){
			var el = kola.Event.element(e).upWithMe('.photoTagBox-hover');
			if(el){
				el.removeClass('photoTagBox-hover');
				this.markTagText.hide();
			}
		},
		
		clear: function(){
			var t = this.markBox.down('.photoTagBox');
			if(t)t.remove();
			var t = this.markDesc;
			if(t)t.html('');
		},
		
		done: function(){
			this.boxEl.attr('style','');
			this.boxEl.hide();
			this.dialogEl.hide();
			this.dialogEl.down('#textselector').val('');
			this.dialogEl.down('#friendselector input').val('');
			this._isShow = false;
		},
		
		del: function(id){
			sohu.ctrl.Dialog.confirm('是否要删除此标记？',{
               title: '提示：',
               yes: function(){
                    sohu.album.AlbumMdl.markDel({
                    	u: Album.u,
                    	mid: id
                    },{
                    	success: function(data){
                    		this.delOk(id)
                    	}.bind(this),
                    	failure: function(){}.bind(this)
                    });
               }.bind(this),
               no: function(){}
            });
		},
		
		delOk: function(id){
			var m = this.markBox.down('#mark_'+ id);
			if(m)m.remove();
			var t = this.markDesc.down('#marktip_'+ id);
			if(t)t.remove();
		},
		
		show: function(id, noText){
			var m = this.markBox.down('#mark_'+ id);
			if(m){
				var _ptop = $(this.settings.photoEl).pos();
				var top = _ptop.top + parseInt(this._markList[id].y);
				m.css('top', top + 'px');
				m.show();
				if(!noText){
					var pos = m.pos();
					this.markTagText.css('top',pos.top + m.height() + 'px');
					this.markTagText.css('left',pos.left + 'px');
					this.markTagText.html(this._tagTextList[id]);
					this.markTagText.show();
				}
			}
		},
		
		showAll: function(){
			var t =this.markBox.down('.photoTagBox');
			if(t){
				t.each(function(it){
					var id = it.attr('id').replace('mark_','');
					this.show(id, true);
				}.bind(this));
			}
		},
		
		hide: function(id){
			var m = this.markBox.down('#mark_'+ id);
			if(m)m.hide();
			this.markTagText.hide();
		},
		
		hideAll: function(){
			var t =this.markBox.down('.photoTagBox');
			if(t)t.hide();
		},
		
		submit: function(){
			var desc = $(this.settings.textEl).val();
			var friendid = $(this.settings.friendEl).val();
			var x = this._left - this._photoXY.left;
			var y = this._top - this._photoXY.top;
			if(desc.length > 0 || friendid !=''){
				//////调用增加标记接口
				var param = {
					u: Album.u, 
					pid:this.settings.photoId,
					x:x,
					y:y,
					width:this._width,
					height:this._height
				};
				if(desc.replace(' ','').length > 0){
					param.title = desc;
				}
				if(friendid != ''){
					param.friendid = friendid;
				}
				sohu.album.AlbumMdl.markAdd(param, {
					success: function(data){
						data.each(function(it){
							this.draw(it);
						}.bind(this));
						this.done();
					}.bind(this),
					failure: function(){}
				});
			} else {
				alert('请写下您想标记的句子或好友！')
			}
		},
		
		click: function(e){
			this.photoEl = $(this.settings.photoEl);
			this._photoXY = this.photoEl.pos();
			this._mouseXY = sohu.album.AlbumCtl.getMouseXY(e);
			kola.Event.stop(e);
			if(this._isShow){
				this.done();
			} else {
				if(!this.moveBind){
					this.moveBind = this._move.bindEvent(this);
					$(document).on('mousemove', this.moveBind);
				} 
				if(!this.upBind){
					this.upBind = this._up.bindEvent(this);
					$(document).on('mouseup', this.upBind);
				} 
			}
			
		},
		
		_move: function(e){
			if(!this._isShow){
				this.boxEl.show();
				this.dialogEl.show();
				this._isShow = true;
			}
			var M = sohu.album.AlbumCtl.getMouseXY(e);
			var MM = {width: M.x - this._mouseXY.x, height: M.y - this._mouseXY.y}
			var _width = Math.abs(MM.width), _height = Math.abs(MM.height);
			var _top = 0, _left = 0;
			if(MM.height < 0){
				_top = M.y;
				if(_top <=  this._photoXY.top) _top = this._photoXY.top;
				var maxH = this._mouseXY.y - this._photoXY.top;
				if(_height > maxH) _height = maxH;
			} else {
				_top = this._mouseXY.y;
				var maxH = this._photoXY.top + this.photoEl.height() - this._mouseXY.y;
				if(_height > maxH) _height = maxH;
			}
			if(MM.width < 0){
				_left = M.x;
				if(_left <=  this._photoXY.left) _left = this._photoXY.left;
				if(_width > this._mouseXY.x - this._photoXY.left) _width = this._mouseXY.x - this._photoXY.left;
			} else {
				_left = this._mouseXY.x;
				var maxW = this._photoXY.left + this.photoEl.width() - this._mouseXY.x;
				if(_width > maxW) _width = maxW;
			}
			this.boxEl.width(_width);
			this.boxEl.height(_height);
			this.boxEl.css('left', _left + 'px');
			this.boxEl.css('top', _top + 'px');
			this._left = _left;
			this._top = _top;
			this._width = _width;
			this._height = _height;
			this.dialogEl.css('left', _left + 'px');
			this.dialogEl.css('top', (_top + _height) + 'px');
		},
		
		_up: function(e){
			if(this.moveBind){
				$(document).un('mousemove', this.moveBind);
				this.moveBind = false;
			}
			if(this.upBind){
				$(document).un('mouseup', this.upBind);
				this.upBind = false;
			}
			if(!this.resize)
				this.resize = new kola.anim.Resize({
						element:  this.settings.boxEl,
						parent: this.settings.photoEl,
						left:   this._left,
						top:	 this._top,
						max: [0, 0],
						min: [0, 0],
						btn: {
							btnNW: this.boxEl.down('.nw'),
							btnNM: this.boxEl.down('.n'),
							btnNE: this.boxEl.down('.ne'),
							btnWM: this.boxEl.down('.w'), 
							btnEM: this.boxEl.down('.e'), 
							btnSW: this.boxEl.down('.sw'), 
							btnSM: this.boxEl.down('.s'), 
							btnSE: this.boxEl.down('.se') 
						},
						onChange: function(left,top,w,h){
							this._left = left;
							this._top = top;
							this._width = w;
							this._height = h;
							this._setDialogPos();
						}.bind(this)
					});
			else {
				this.resize.settings._pos = {left: this._left, top: this._top};
			}
			if(!this.drag)
				this.drag = new kola.anim.Drag({
						element: this.settings.boxEl,
						parent: this.settings.photoEl,
						position: 'absolute',
						onMove: function(el, mouseXY, cloneXY){
							this.resize._pos.left = this._left = cloneXY.x;
							this.resize._pos.top = this._top = cloneXY.y;
							this._setDialogPos();
						}.bind(this)
					});
				
		},
		
		_setDialogPos: function(){
			this.dialogEl.css('left', this._left + 'px');
			this.dialogEl.css('top', (this._top + this._height) + 'px');
		},
		
		_isShow: false,
		_left: 0,
		_top: 0,
		_width:0,
		_height:0,
		_photoXY: [],
		_mouseXY: [],
		_markList: {},
		_tagTextList: {}
	});
}, 'sohu.friend.*, sohu.ctrl.Dialog, kola.anim.Drag, kola.anim.Resize, sohu.album.*');