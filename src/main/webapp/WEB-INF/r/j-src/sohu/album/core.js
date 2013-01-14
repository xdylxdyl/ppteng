$register("sohu.album.*", function(){
	var Pack = sohu.album;
	var option = Pack.AlbumMdlOption = {
		actions:{
			album:{
				url:        '/album.do',
                params:     ['u', 'page'],
                method:     'get',
                format:     'json'
			},
			list:{
				url:        '/list.do',
                params:     ['u', 'aid', 'page'],
                method:     'get',
                format:     'json'
			},
			listMark:{
				url:        '/listmark.do',
                params:     ['u'],
                method:     'get',
                format:     'json'
			},
			photo:{
				url:        '/photo.do',
                params:     ['u', 'aid', 'pid'],
                method:     'get',
                format:     'json'
			},
			upload:{
				url:        '/upload.do',
                params:     ['u'],
                method:     'get',
                format:     'json'
			},
			uploadEdit:{
				url:        '/uploadedit.do',
                params:     ['u','aid','pids'],
                method:     'get',
                format:     'json'
			},
			uploadEditOk:{
				url:        '/uploadeditok.do',
                params:     ['u','aid','result'],
                method:     'post',
                format:     'json'
			},
			order:{
				url:        '/order.do',
                params:     ['u','aid'],
                method:     'get',
                format:     'json'
			},
			divert:{
				url:        '/divert.do',
                params:     ['u','aid'],
                method:     'get',
                format:     'json'
			},
			profile:{
				url:        '/profile.do',
                params:     ['u'],
                method:     'get',
                format:     'json'
			},
			albumEdit:{
				url:        '/albumedit.do',
                params:     ['u','aid'],
                method:     'get',
                format:     'json'
			},
			photoEdit:{
				url:        '/photoedit.do',
                params:     ['u','pid'],
                method:     'get',
                format:     'json'
			},
			albumEditOk:{
				url:        '/albumeditok.do',
                params:     ['u', 'aid', 'name', 'desc', 'viewrights', 'commentrights','cuslevel','pu','bu','pg','bg'],
                method:     'post',
                format:     'json'
			},
			photoEditOk:{
				url:        '/photoeditok.do',
                params:     ['u', 'pid', 'desc', 'aid', 'iscover'],
                method:     'post',
                format:     'json'
			},
			orderOk:{
				url:        '/orderok.do',
                params:     ['u', 'aid', 'result'],
                method:     'post',
                format:     'json'
			},
			divertOk:{
				url:        '/divertok.do',
                params:     ['u', 'result', 'toaid'],
                method:     'post',
                format:     'json'
			},
			albumDel:{
				url:        '/albumdel.do',
                params:     ['u', 'aid'],
                method:     'get',
                format:     'json'
			},
			albumDelOk:{
				url:        '/albumdelok.do',
                params:     ['u', 'aid', 'result'],
                method:     'post',
                format:     'json'
			},
			photoDel:{
				url:        '/photodel.do',
                params:     ['u','pid'],
                method:     'post',
                format:     'json'
			},
			markAdd:{
				url:        '/markadd.do',
                params:     ['u', 'pid','x','y','width','height','title','friendid'],
                method:     'post',
                format:     'json'
			},
			markDel:{
				url:        '/markdel.do',
                params:     ['u','mid'],
                method:     'post',
                format:     'json'
			},
			setProfile:{
				url:        '/setprofile.do',
                params:     ['u','pid'],
                method:     'post',
                format:     'json'
			},
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
			},
			getPhotoMark:{
				url:        '/getphotomark.do',
                params:     ['u','pid'],
                method:     'get',
                format:     'json',
                type:		'all'
			}
		},
		url:			'/a/app/album/list'
	};
	var albumMdl = Pack.AlbumMdl = new sohu.core.Model(option);
	
	Pack.AlbumCtl = {
		form: {},
		
		manageBtn: function(element, type){
			var listBtn = ['编辑专辑','照片转移','照片排序','删除专辑'];
			var mobileBtn = ['照片转移'];
			var _this = this;
            var manageBtn = new sohu.ctrl.MenuTip({
                element: element,
                show: 'mouseover',
                content: type == '0' ? listBtn : mobileBtn,
                position:[-5,5],
                width:64,
                onSelect:function(i){
                    _this.mangeClick(type, i);
                }
            });
		},
		
		mangeClick: function(type, i){
			switch (i){
				case '编辑专辑':{
					this.albumEdit(Album.aid, 'photoListFresh');
					break;
				}
				case '照片转移':{
					this.go('list/divert.do?aid='+ Album.aid + '&u='+ Album.u);
					break;
				}
				case '照片排序':{
					this.go('list/order.do?aid='+ Album.aid + '&u='+ Album.u);
					break;
				}
				case '删除专辑':{
					this.albumDel(Album.aid,'albumListFresh');
					break;
				}
			}
		},
		
		albumEdit: function(aid,callback){
			var isEdit = aid != 0 ? true : false;
			this.form.albumEdit = null;
			this.form.albumDialog = new sohu.ctrl.Dialog({
				title: isEdit ? '编辑专辑' : '添加专辑',
				width: 400,
				buttons :[
					{html:"确定",isRed:true,func:this.albumEditOK.bind(this, aid, callback)},
					{html:"取消",close:true}
				],
				mask: true
			});
			this.form.albumDialog.setLoad();
			this.form.albumDialog.show();
			var _opt = {u: Album.u};
			if(isEdit) _opt.aid = aid;
			albumMdl.albumEdit(_opt,{
				success: function(data){
					this.form.albumDialog.setContent(data.view);
					this.form.albumEditP = data.p;
					this.form.albumEditPR = {cuslevel:'',pu: '',bu: '',pg: '',bg: ''};
					var t = this.form.albumEdit = {
						type: isEdit? 'edit' : 'add',
						name: $('#albumName'),
						nameErr: isEdit,
						desc: $('#albumDesc'),
						descErr: true,
						rights: $('#accessRight'),
						comment: $('#commentRight')
					};
					t.tip1 = t.name.next();
					t.tip2 = t.desc.next();
					t.desc.on('blur' ,function(){
						if(t.desc.val().length > 30){
							t.tip2.show();
							t.descErr = false;
						} else {
							t.tip2.hide();
							t.descErr = true;
						}
					});
					t.desc.on('focus',function(){t.tip2.hide();});
					t.name.on('blur', function(){
						if(t.name.val().replace(' ','') < 1 ){
							t.tip1.show();
							t.nameErr = false;
						} else {
							t.tip1.hide();
							t.nameErr = true;
						}
					});
					t.name.on('focus',function(){t.tip1.hide();});
					this.form.albumEdit.rights.on('change', function(){
						var input = this.form.albumEdit.rights;
						var t = $('#ae_privacy');
						if(input.val()== '4'){
							this.privacy();
							if(t)t.show();
						} else {
							if(t)t.hide();
						}
					}.bind(this));
				}.bind(this),
				failure: function(){}
			});
		},
		
		albumEditOK: function(aid,callback){
			var t = this.form.albumEdit;
			if(t){
				var canSubmit = true;
				if(!t.nameErr){
					t.tip1.show();
					canSubmit = false;
				}
				if(!t.descErr){
					t.tip2.show();
					canSubmit = false;
				}
				if(!canSubmit) return;
				var _opt = {
					u: Album.u,
					name: t.name.val(),
					desc: t.desc.val(),
					viewrights: t.rights.val(),
					commentrights: t.comment.val()
				};
				for(var it in this.form.albumEditPR){
					if(it == 'cuslevel'){
						_opt[it] = this.form.albumEditPR[it] ? this.form.albumEditPR[it] : -1 ;
					} else {
						_opt[it] = this.form.albumEditPR[it];
					}
				}
				if(t.type == 'edit') _opt.aid = aid;
				albumMdl.albumEditOk(_opt, {
					success: function(data){
						this.form.albumDialog.close();
						if(callback)this[callback](data.id, data.name);
					}.bind(this),
					failure: function(){}
				});
			}
		},
		/*
		 * 相册权限定制
		 */
		privacy: function(){
			var _form = this.form;
			$call(function(){
				new sohu.privacy.Base({
					model:2,
					type:2,
					data: _form.albumEditP,
					callback: function(data){
		 			 	_form.albumEditPR = data;
		 			 }
	 			 });
			}, 'sohu.privacy.*');
	 			 
		},
		
		albumListFresh:function(){
			this.go('index.do?u='+ Album.u + '&page='+ Album.albumPage);
		},
		
		photoListFresh: function(){
			this.go('list/list.do?u='+ Album.u + '&aid='+ Album.aid + '&page='+ Album.photoPage);
		},
		
		photoEditFresh: function(){
			this.go('list/photo.do?u='+ Album.u + '&pid=' + Album.photo._photoId);
		},
		
		photoEdit: function(pid,callback){
			this.form.photoEdit = null;
			this.form.photoDialog = new sohu.ctrl.Dialog({
				title: '编辑照片',
				width: 400,
				buttons :[
					{html:"确定",isRed:true,func:this.photoEditOK.bind(this, pid, callback)},
					{html:"取消",close:true}
				],
				mask: true
			});
			this.form.photoDialog.setLoad();
			this.form.photoDialog.show();
			albumMdl.photoEdit({
				u: Album.u,
				pid: pid
			},{
				success: function(data){
					this.form.photoDialog.setContent(data.view);
					var t = this.form.photoEdit = {
						desc: $('#e_photoDesc'),
						descErr: true,
						album: $('#e_photoAlbum'),
						profile: $('#e_setAsCover')
					};
					t.tip1 = t.desc.next();
					t.desc.on('blur',function(){
						if(t.desc.val().length > 40){
							t.tip1.show();
							t.descErr = false;
						} else {
							t.tip1.hide();
							t.descErr = true;
						}
					});
					t.desc.on('focus',function(){t.tip1.hide();});
				}.bind(this),
				failure: function(){}
			});
		},
		
		photoEditOK: function(pid, callback){
			var t = this.form.photoEdit;
			if(t){
				if(!t.descErr){
					t.tip1.show();
					return;
				}
				albumMdl.photoEditOk({
					u: Album.u,
					pid: pid, 
					desc: t.desc.val(), 
					aid: t.album.val(), 
					iscover: t.profile.val() ? 1 : 0
				}, {
					success: function(){
						this.form.photoDialog.close();
						if(callback)this[callback]();
					}.bind(this),
					failure: function(){}
				});
			}
		},
		
		albumDel: function(aid, callback){
			this.form.albumDel = null;
			this.form.albumDelDialog = new sohu.ctrl.Dialog({
				title: '删除专辑',
				width: 400,
				buttons :[
					{html:"确定",isRed:true,func:this.albumDelOk.bind(this, aid, callback)},
					{html:"取消",close:true}
				],
				mask: true
			});
			this.form.albumDelDialog.setLoad();
			this.form.albumDelDialog.show();
			albumMdl.albumDel({
				u: Album.u,
				aid: aid
			},{
				success: function(data){
					this.form.albumDelDialog.setContent(data.view);
				}.bind(this),
				failure: function(){}
			});
		},
		
		albumDelOk: function(aid, callback){
			var t = {
				u: Album.u, 
				aid: aid
			};
			if($('#movePhotos').val()){
				t.result = $('#moveSelect').val();
			}
			albumMdl.albumDelOk(t, {
				success: function(data){
					this.form.albumDelDialog.close();
					if(callback)this[callback]();
				}.bind(this),
				failure: function(){}
			});
		},
		
		photoDel: function(pid, callback){
			sohu.ctrl.Dialog.confirm('是否要删除此张照片？',{
               title: '提示：',
               yes: function(){
                    albumMdl.photoDel({
                    	u: Album.u,
                    	pid: pid
                    },{
                    	success: function(data){
                    		if(callback)this[callback]();
                    	}.bind(this),
                    	failure: function(){}.bind(this)
                    });
               }.bind(this),
               no: function(){}
            });
		},
		
		albumSelect: function(id, name){
			var select =$('#selectalbum').elements()[0];
			select.options.add(new Option(name, id));
            select.options[select.options.length - 1].selected = true;
		},
		
		setProfile: function(pid){
			sohu.ctrl.Dialog.confirm('确定将此照片设为头像吗？',{
               title: '提示：',
               yes: function(){
                    albumMdl.setProfile({
                    	u: Album.u,
                    	pid: pid
                    },{
                    	success: function(data){
                    		alert("success!please refresh!")
                    	}.bind(this),
                    	failure: function(){}.bind(this)
                    });
               }.bind(this),
               no: function(){}
            });
		},
		
		getMouseXY: function(e){
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
		
		go: function(url){
			sohu.View.switchView('/app/album/' + url);
		}
	};

}, 'sohu.core.*, sohu.ctrl.Dialog, sohu.ctrl.TipSuggest');