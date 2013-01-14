$register('sohu.album.Photo', function(){
	sohu.album.Photo = Class.create({
		///load list成功后方可进行选择编辑等操作
		initialize: function(options){
			this.settings = {
				aid: 0,
				pid: 0,
				mark: [],
				photoEl: '',
				photoDesc: '',
				markTipEl: '',
				markBoxEl: '',
				markDialogEl: '',
				manageEl: '',
				commentEl: ''
			};
			Object.extend(this.settings, options);
			this.photoEl = $(this.settings.photoEl);
			this.manageEl = $(this.settings.manageEl);
			this._albumId = this.settings.aid;
			this._photoId = this.settings.pid;
			this.markList[this._photoId] = this.settings.mark;
			this.commentList[this._photoId] = $(this.settings.commentEl).html();
			this.Mark = new sohu.album.Mark({
				photoEl: this.settings.photoEl,
				photoId: this._photoId,
				boxEl: this.settings.markBoxEl,
				dialogEl: this.settings.markDialogEl,
				onSubmit: function(){},
				onCancel: function(){}
			});
			this._loadPhotoList(function(){
				this._photoNum = this.photoList.length;
				this._photoIndex = this._getPhotoIndex(this._photoId);
				if(this.manageEl)this.manageEl.show();
				this._bind();
				this._loadSBefore(1,2,-1,-2);
				this._loadBBefore(1,2,-1,-2);
			}.bind(this));
			this._draw();
			return this;
		},
		
		prev: function(){
			if(!this._canPrev) return;
			this.action(-1);
		},
		
		next: function(){
			if(!this._canNext) return;
			this.action(1);
		},
		
		current: function(num){
			if(typeof(num) != 'number') return;
			if(num< 0 || num > this._photoNum) return;
			var diff = num - this._photoIndex; 
			this.action(diff);
		},
		
		action: function(num){
			if(num == 0) return;
			this._photoIndex  = this._photoIndex + num;
			var _photo = this.photoList[this._photoIndex];
			this._photoId = _photo.pid;
			this.photoEl.attr('src', _photo.url);
			$(this.settings.photoDesc).html(_photo.desc);
			this._bind();
			this.photoScroll.action(num);
			this.Mark.settings.photoId = this._photoId;
			this._loadMark(function(){
				this._draw();
				this._loadComment();
			}.bind(this));
			this._loadSBefore(num);
			this._loadBBefore(num);
		},
		
		edit: function(){
			sohu.album.AlbumCtl.photoEdit(this._photoId, 'photoEditFresh');
		},
		
		del: function(){
			sohu.album.AlbumCtl.photoDel(this._photoId, 'photoListFresh');
		},
		
		mark: function(){
			this._status = 'mark';
			this.Mark.loadSelector();
			$(this.settings.markTipEl).show();
		},
		
		markOk: function(){
			this._status = 'normal';
			$(this.settings.markTipEl).hide();
			this.Mark.done();
		},
		
		_draw: function(){
			this.Mark.clear();
			var mark = this.markList[this._photoId];
			var box = $('#photoView .photoTags');
			if(mark.length > 0){
				mark.each(function(it){
					this.Mark.draw(it);
				}.bind(this));
			} else {
				box.hide();
			}
		},
		
		setProfile: function(){
			sohu.album.AlbumCtl.setProfile(this._photoId);
		},
		
		_bind: function(){
			this._canPrev = false;
			this._canNext = false;
			if(this._photoIndex - 1 > -1)
				this._canPrev = true;
			if(this._photoIndex + 1 < this._photoNum)
				this._canNext = true;
			
			this._splitX = Math.round(this.photoEl.width() / 2 + this.photoEl.pos().left);
			if(!this.bindMouseMove){
				this.bindMouseMove = function(e){
					if(this._status == 'normal'){
						this._countMouse(e);
						this.Mark.showAll();
					}
					this._countMouse(e);
				}.bind(this);
				this.bindMouseOut = function(e){
					this.Mark.hideAll();
				}.bind(this);
				this.photoEl.on('mousemove', this.bindMouseMove.bindEvent(this));
				this.photoEl.on('mouseout', this.bindMouseOut.bindEvent(this));
			}
			if(!this.bindMouseClick){
				this.bindMouseClick = function(e){
					if(this._status == 'normal'){
						if(this._statusMouse == 'next' && this._canNext)
							this.next();
						if(this._statusMouse == 'prev' && this._canPrev)
							this.prev();
					}
				}.bind(this);
				this.photoEl.on('click', this.bindMouseClick.bindEvent(this));
			}
			if(!this.bindMouseDown){
				this.bindMouseDown = function(e){
					if(this._status == 'mark'){
						this.Mark.click(e);
					}
				}
				this.photoEl.on('mousedown', this.bindMouseDown.bindEvent(this));
			}
			if(!this.bindKeyboard){
				this.bindKeyboard = kola.ctrl.KeyAction.action([37, 39], function(code){
					if(code == 37 && this._canPrev)
						this.prev();
					if(code == 39 && this._canNext)
						this.next();
				}.bind(this));
			}
			this._loadRight();
		},
		
		_countMouse: function(e){
			var M = sohu.album.AlbumCtl.getMouseXY(e);
			if(this._status == 'normal'){
				if(M.x < this._splitX){
					if(this._canPrev){
						this.photoEl.attr('class','photoImg-prev');
						this._statusMouse = 'prev';
					}  else {
						if(this._canNext){
							this.photoEl.attr('class','photoImg-next');
							this._statusMouse = 'next';
						}  else {
							this.photoEl.attr('class','');
							this._statusMouse = 'normal';
						}
					}
				} else {
					if(this._canNext){
						this.photoEl.attr('class','photoImg-next');
						this._statusMouse = 'next';
					}  else {
						if(this._canPrev){
							this.photoEl.attr('class','photoImg-prev');
							this._statusMouse = 'prev';
						}  else {
							this.photoEl.attr('class','');
							this._statusMouse = 'normal';
						}
					}
				}
			}
			if(this._status == 'mark'){
				this.photoEl.attr('class','photoImg-tag');
				this._statusMouse = 'normal';
			}
		},
		
		_loadPhotoList: function(callback){
			sohu.album.AlbumMdl.getPhotoList({
				aid: this._albumId,
				u: Album.u
			},{
				success: function(data){
					this.photoList = data;
					callback();
				}.bind(this),
				failure: function(){}
			});
		},
		
		_loadComment: function(){
			var _comment = this.commentList[this._photoId];
			if(_comment)
				$(this.settings.commentEl).html(_comment);
		},
		
		_loadMark: function(callback){
			if(!this.markList[this._photoId]){
				sohu.album.AlbumMdl.getPhotoMark({
					u: Album.u,
					pid: this._photoId
				},{
					success: function(data){
						this.markList[this._photoId] = data.mark;
						this.commentList[this._photoId] = data.comment;
						if(callback){
							callback();
						}
					}.bind(this),
					failure: function(){}
				});
			} else {
				if(callback)callback();
			}
		},
		
		_loadRight: function(){
			if(!this.photoScroll)
				this.photoScroll = new sohu.album.PhotoScroll({
					boxEl: '#photoPager .photoPagerList ul',
					photoList: this.photoList,
					curIndex: this._photoIndex
				});
			var _child = $("#photoPager").children();
			var _prevEl = _child.get(0);
			var _nextEl = _child.get(2);
			if(this._canPrev){
				_prevEl.attr('class','photoPager-prev');
			} else {
				_prevEl.attr('class','photoPager-prev-disabled');
			}
			if(this._canNext){
				_nextEl.attr('class','photoPager-next');
			} else {
				_nextEl.attr('class','photoPager-next-disabled');
			}
			$("#photoPager").show();
		},
		
		_loadBBefore: function(){
			for(var i = 0, il = arguments.length; i < il; i++){
				var n = arguments[i];
				var ind = this._photoIndex + n;
				if(ind >= 0 && ind < this._photoNum){
					this._loadImage(this.photoList[ind].url);
				}
			}
		},
		
		_loadSBefore: function(){
			for(var i = 0, il = arguments.length; i < il; i++){
				var n = arguments[i];
				var ind = this._photoIndex + n;
				if(n < 0){
					ind = ind - 2;
				} else {
					ind = ind + 2;
				}
				if(ind >= 0 && ind < this._photoNum){
					this._loadImage(this.photoList[ind].surl);
				}
			}
		},
		
		_loadImage: function(url, callback){
			var img = new Image();
			img.src = url;
			if(callback){
				img.onreadystatechange = img.onload = function(){
					callback();
				}
			}
		},
		
		_getPhotoIndex: function(pid){
			var index = -1;
			for(var i = 0; i < this._photoNum; i++){
				if(this.photoList[i].pid == pid){
					index = i;
					break;
				}	
			}
			return index;
		},
		
		_status: 'normal', //normal or mark
		_statusMouse: 'normal', //normal or prev or next
		_photoId: 0,
		_albumId: 0,
		_splitX: 0,  ///分隔左右鼠标样式的宽度
		_photoNum: 0,
		_photoIndex: 0,
		_canPrev: false,
		_canNext: false,
		markList: {},
		photoList: [],
		commentList: {}
	});
}, 'sohu.album.*, sohu.album.Mark, sohu.album.PhotoScroll, kola.ctrl.KeyAction');