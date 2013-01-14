/*
 * 照片选择器
 * yanyun@sohu-inc.com
 */
$register("sohu.album.PhotoSelector", function(){
	var photoMdl = new sohu.core.Model({
		actions: {
			getAlbumList:{
				url:        '/getalbumlist.do',
                params:     ['u'],
                method:     'get',
                format:     'json',
                type:		'all'
			},
			getPhotoList:{
				url:        '/getphotolist.do',
                params:     ['u','aid'],
                method:     'get',
                format:     'json',
                type:		'all'
			}
		},
		url:			'/a/app/album/list'
	});
	if(!sohu.album.Data)
		sohu.album.Data = {};
	if(!sohu.album.Data.AlbumList)
		sohu.album.Data.AlbumList = {};
	if(!sohu.album.Data.PhotoList)
		sohu.album.Data.PhotoList = {};
	if(!sohu.album.Data.getAlbumList)
		sohu.album.Data.getAlbumList = function(u, callback){
			if(sohu.album.Data.AlbumList[u]){
				callback(sohu.album.Data.AlbumList[u]);
			} else {
				photoMdl.getAlbumList({
					u: u
				}, {
					success: function(data){
						sohu.album.Data.AlbumList[u] = data;
						callback(data);
					},
					failure: function(){alert('load album list error!')}
				})
			}
		};
	if(!sohu.album.Data.getPhotoList)
		sohu.album.Data.getPhotoList = function(u, aid, callback){
			if(sohu.album.Data.PhotoList[u] && sohu.album.Data.PhotoList[u][aid]){
				callback(sohu.album.Data.PhotoList[u][aid]);
			} else {
				if(!sohu.album.Data.PhotoList[u]) sohu.album.Data.PhotoList[u] = {};
				photoMdl.getPhotoList({
					u: u,
					aid: aid
				}, {
					success: function(data){
						sohu.album.Data.PhotoList[u][aid] = data;
						callback(data);
					},
					failure: function(){alert('load photo list error!')}
				})
			}
		};
	
	sohu.album.PhotoSelector = Class.create({
		initialize: function(options){
			this.settings = {
				u:0,
				element: null,	  ///填充照片选择器的容器
				type: 1,		  ///1为单选，2为多选
				max:0			  ///多选时的上线
			};
			Object.extend(this.settings, options);
			this.element = $(this.settings.element);
			
			this._load();
			return this;
		},
		
		_curAid: 0, 	  ///当前选择的相册ID
		_status: 'small', ///当前选择照片的尺寸，small(小), big(大)
		_selected: [],	  ///已经选中的照片
		
		get: function(clear){
			clear = clear || false;
			var r = [];
			var album = sohu.album.Data.PhotoList[this.settings.u][this._curAid];
			album.each(function(it){
				if(this._selected.include(it.pid + '')){
					r.push(it);
				}
			}.bind(this));
			if(clear)this.clear();
			return r;
		},
		
		clear: function(){
			this._selected.each(function(it){
				var li = $('#PS_pid_' + it);
				if(li)li.removeClass('cur');
			});
			this._selected = [];
		},
		
		show: function(){
			if(this.box)this.box.show();
		},
		
		hide: function(){
			if(this.box)this.box.hide();
		},
		
		_load: function(){
			this.element.html('<div class="photoSelector">' + this._loadtext + '</div>');
			sohu.album.Data.getAlbumList(this.settings.u, function(data){
				var _alist = [], _firstid = 0;
				data.each(function(it){
					if(_firstid == 0)
						_firstid = it.id;
					_alist.push('<option value="'+ it.id +'">'+ it.name +'</option>');
				});
				this._curAid = _firstid;
				this._loadPhotoList(_firstid, function(s){
					var _str = this._tempBox.evaluate({album: _alist.join(''), photo: s});
					this.box = this.element.down('.photoSelector');
					this.box.html(_str);
					this._bind();
				}.bind(this));
			}.bind(this));
		},
		
		_bind: function(){
			this.input = this.box.down('p select');
			this._big = this.box.down('.photoSizeSwitch .sizeSwitch-large');
			this._small = this.box.down('.photoSizeSwitch .sizeSwitch-small');
			this.input.on('change', this._selectChange.bind(this));
			this._big.on('click', this._size.bind(this, 'big'));
			this._small.on('click', this._size.bind(this, 'small'));
			this._bindImgClick();
		},
		
		_bindImgClick: function(){
			var li = this.box.down('.fix li');
			if(li)li.on('click', this._imgClick.bindEvent(this));
		},
		
		_imgClick: function(e){
			var li = kola.Event.element(e).upWithMe('li');
			var pid = li.attr('id').replace('PS_pid_','');
			if(this._selected.include(pid)){  ///已选
				li.removeClass('cur');
				this._selected.del(pid);
			} else { ///未选
				if(this.settings.type == 1){ ///为单选
					if(this._selected.length > 0){
						var sli = $('#PS_pid_' + this._selected[0]);
						sli.removeClass('cur');
					}
					this._selected[0] = pid;
					li.addClass('cur');
				} else { ///为多选
					if(this.settings.max == 0){ ///无上限
						this._selected.push(pid);
						li.addClass('cur');
					} else {
						if(this._selected.length >= this.settings.max){
							alert('只能选择'+ this.settings.max + '张照片');
						} else {
							this._selected.push(pid);
							li.addClass('cur');
						}
					}
				}
			}
		},
	
		_selectChange: function(){
			var aid = this.input.val();
			var box = this.box.down('.fix');
			box.html('');
			box.addClass('load-page');
			this._loadPhotoList(aid, function(s){
				this._curAid = aid;
				box.removeClass('load-page');
				box.html(s);
				this._selected = [];
				this._bindImgClick();
			}.bind(this), this._status);
		},
		
		_size: function(type){
			var box = this.box.down('.fix');
			if(this._status == type) return;
			if(type == 'big'){
				box.removeClass('smallBox');
				box.addClass('largeBox');
				this._big.addClass('on');
				this._small.removeClass('on');
			} else {
				box.removeClass('largeBox');
				box.addClass('smallBox');
				this._small.addClass('on');
				this._big.removeClass('on');
			}
			this._loadPhotoList(this._curAid, function(s){
				box.html(s);
				this._checkSelected();
				this._bindImgClick();
				this._status = type;
			}.bind(this), type);
		},
		
		_loadPhotoList: function(aid, callback, type){
			type = type || 'small';
			var _tempType = 'murl';
			if(type == 'small'){
				type = 'surl';
			} else {
				type = 'murl';
				_tempType = 'surl';
			}
			sohu.album.Data.getPhotoList(this.settings.u, aid, function(data){
				var _plist = [];
				var _t = this._tempLi;
				var _tempImg = [];
				data.each(function(it){
					_plist.push(_t.evaluate({id: it.pid, url: it[type], desc: it.desc}));
					_tempImg.push(it[_tempType]);
				});
				callback(_plist.join(''));
				_tempImg.each(function(it){
					this._loadImg(it);
				}.bind(this));
			}.bind(this));
		},
		
		_checkSelected: function(){
			this._selected.each(function(it){
				var li = $('#PS_pid_' + it);
				if(li)li.addClass('cur');
			}.bind(this));
		},
		
		_loadImg: function(url, callback){
			var img = new Image();
			img.src = url;
			if(callback){
				img.onreadystatechange = img.onload = function(){
					callback();
				}
			}
		},
		
		_loadtext: '<div class="load-page"></div>',
		
		_tempBox: new kola.Template('<div class="photoSizeSwitch"><a class="sizeSwitch-small on" title="小图" href="javascript:void(0)"><img src="/r/apps/blog/c/i/switch75.gif"></a><a class="sizeSwitch-large" href="javascript:void(0)" title="大图"><img src="/r/apps/blog/c/i/switch130.gif"></a></div><p>选择 <select class="select">#{album}</select> 专辑内的照片</p><ul class="fix smallBox">#{photo}</ul>'),
			 
		_tempLi: new kola.Template('<li id="PS_pid_#{id}"><i></i><a href="javascript:void(0)"><img src="http://sns.sohu.com/r/i/space.gif" style="background-image:url(#{url})" title="#{desc}" alt="#{desc}"/></a></li>')
	}); 
},'sohu.core.*');