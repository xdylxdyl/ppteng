$register('sohu.album.Upload', function(){
	sohu.album.Upload = Class.create({
		initialize: function(selectAlbumEl, boxEl, flashEl){
			this.selectAlbumEl = $(selectAlbumEl);
			this.boxEl = $(boxEl);
			this.flashEl = $(flashEl);
			
			if(Album.aid){
				$('#selectalbum').val(Album.aid);
			}
		},
		
		step1: function(){
			var el = this.selectAlbumEl;
			if(el.val() == '0'){
				sohu.ctrl.Dialog.alert('提示', '请选择照片专辑', function(){el.focus();});
			} else {
				this._albumId = parseInt(el.val());
				var settings = {
					flash_url : "/r/f/album/upload/SWFUpload.swf",
					file_types : "*.jpg;*.jpeg;*.gif;*.png;*.tif;*.tiff",
					file_types_description : "图片文件",			
					debug: false,
					button_image_url: "/r/f/album/upload/uploadBtnBig.png"
				};
				this.boxEl.hide();
				this.flashEl.show();
				var spare = Album.albumSpare[this._albumId];
				if(spare == null){spare = 200;} else {spare = parseInt(spare);}
				this.uploader = sohu.album.swfUpload.PhotoUploader.init('http://10.10.82.51/upload.do',this._albumId,'alumb',this._callback.bind(this),"5 MB",spare,settings);
			}
		},
		
		cancel: function(){
			sohu.album.AlbumCtl.go('list/list.do?u=' + Album.u + '&aid=' + this._albumId);	
		},
		
		submit: function(){
			this.photoEditEl = $('#photoEdit');
			var result = [], each = [];
			this.photoEditEl.down('.fieldset').each(function(it){
				each = [];
				each.push(it.attr('id').replace('edit_',''));
				var text = it.down('.photoDesc').val();
				each.push(text);
				each.push(it.down('.photoAlbum').val());
				each.push(it.down('.setAsCover').val() ? 1 : 0);
				result.push(each.join(','))
			}.bind(this));
			
			sohu.album.AlbumMdl.uploadEditOk({
				u: Album.u,
				aid: this._albumId,
				result: result.join('|')
			}, {
				success: function(data){
					this.cancel();
				}.bind(this),
				failure: function(){}
			});			
		},
		
		_callback: function(arr){
			var pids = [];
			this.arr = arr;
			arr.each(function(it){
				it = eval('('+ it + ')');
				if(it.status)pids.push(it.data.id);
			});
			sohu.album.AlbumMdl.uploadEdit({
				u: Album.u,
				aid: this._albumId,
				pids: pids.join(',')
			}, {
				success: function(data){
					$("#canvas-appInt .appContent").html(data.view);
				}.bind(this),
				failure: function(){}
			});
		},
		
		_albumId: 0
	});
}, 'sohu.ctrl.Dialog, sohu.album.swfUpload');