/**
 * @fileoverview 分享功能显示相关的JS类实现
 * @author hongwei@sohu-inc.com
 * @version 0.1
 * 
 * @requires sohu.ctrl.dialog kola.core
 */

$register('sohu.share.*', function() {

	var requestMdl = new sohu.core.Model({

				actions : {

					addoutside : {
						url : '/info/addoutside.do',
						params : ['url'],
						method : 'post',
						format : 'json',
						type : 'custom'
					},
					feed : {
						url : '/info/getfromfeed.do',
						params : ['userid', 'id'],
						method : 'post',
						format : 'json',
						type : 'custom'
					},
					add : {
						url : '/info/add.do',
						params : ['title', 'userid', 'type', 'url',
								'detailurl', 'reason', 'authorid', 'sharetype',
								'picurls', 'description', 'containername'],
						method : 'post',
						format : 'json',
						type : 'blank'
					},
					del : {
						url : '/info/del.do',
						params : ['id'],
						method : 'post',
						format : 'json',
						type : 'blank'
					},
					page : {
						url : '/list/index.do',
						params : ['_view_mode', 'pg'],
						method : 'get',
						format : 'json',
						type : 'one'
					}

				},

				url : '/a/app/share'
			});
	sohu.share.Base = Class.create({

		initialize : function(data) {
			this.opt = {};
			if (data) {
				this.opt.data = data;
			}
		},

		setTitle : function(str) {
			var _vt = this.dialog.body.down(".divInt input");
			_vt.val(str);
		},
		setContent : function(html) {
			var _vl = this.dialog.body.down(".meta");
			_val.html(html);
		},
		_playerPannel : function(type, options) {
			var flash = null;
			switch (type) {
				case 0 :
					flash = this._flash;
					break;
				case 1 :
					flash = this._flash;
					flash.options={
						height : 180,
						width :  216	
					}
				default :
					break;
			}
			if (flash) {
				var _template = new kola.Template(flash.html);
				return _template
						.evaluate(Object.extend(flash.options, options))
			}
		},
		play : function(ele, src, type) {
			var _ele = $(ele);
			if (!_ele) {
				return;
			}
			_ele.html(this._playerPannel(type, {
						src : src
					}))
		},
		_loadData : function(url) {
			if (url) {
				_url = decodeURIComponent(url);
				if (!(_url && /[(http:\/\/)|\w*]\..+/.test(_url))) {
					sohu.ctrl.Dialog.alert("提示", "您的url格式不正确请重新提交！");
					return;
				}
			}
			if (url == "") {
				sohu.ctrl.Dialog.alert("提示", "请填写url后再进行提交！");
				return;
			}
			this.dialog = new sohu.ctrl.Dialog({
						title : "分享",
						loadding : true,
						mask : true,
						onClose : this.onClose || function() {
						},
						buttons : [{
									html : '立即分享',
									isRed : true,
									func : this._submit.bind(this)
								}, {
									html : '取消',
									event : 'click',
									close : true
								}]

					});
			this.dialog.body.addClass("shareDialogBox");
			this.dialog.show();
			if (!this.opt.data) {
				requestMdl.addoutside({
							url : url
						}, {
							success : function(data) {
								this.dialog.setContent(this._setContent(data));
								this.data = data;
							}.bind(this),
							failure : function() {

							}
						});
			} else {
				this.dialog.setContent(this._setContent(this.opt.data));
				this.data = this.opt.data;
			}

		},

		_submit : function() {
			this._save();
		},
		_save : function() {
			if (!this.data) {
				return;
			}
			_reason = this.dialog.body.down('textarea').val();
			_title = this.dialog.body.down('input[name=title]').val();
			if (_reason.byteLength() >= 360) {
				//sohu.ctrl.Dialog.alert("提示", "分享理由字数不能超过360个字符！");
				this.dialog.body.down("dd .formError").get(0).show();
				return;
			}else{
			     this.dialog.body.down("dd .formError").get(0).hide();
			}
			if (_title.byteLength()>= 60) {
				_title.subString(0,30);
			}
			var _options = {
				userid : this.data.info.userid,
				title : _title,
				url : this.data.info.url,
				detailurl : this.data.info.detailurl,
				reason : _reason,
				description : this.data.info.description,
				containername : this.data.info.containername,
				authorid : this.data.info.authorid,
				sharetype : this.data.type,
				picurls : this.data.info.picurls
			}
			requestMdl.add(_options, {
						success : function(data) {
							this.dialog.setContent("分享成功！");
							this.dialog.setButton({
										html : "确定",
										isRed : "true",
										close : true,
										func : function() {
											if (this.data.type == 1) {
												this._pager.bind(this, 1)
											}
										}.bind(this)
									});
							setTimeout(function() {
										if (this.data.type == 1) {
											this._pager(1);
										}
										this.dialog.close();
									}.bind(this), 1500)
						}.bind(this),
						failure : function() {

						}
					});

		},
		_feed : function(userid, id) {
			requestMdl.feed({
						userid : userid,
						id : id
					}, {
						success : function(data) {
							this.opt.data = data;
							this._loadData();
						}.bind(this),
						failure : function() {

						}
					});

		},
		del : function(id) {
			sohu.ctrl.Dialog.confirm("确认要删除此分享吗?", {
						yes : function() {
							requestMdl.del({
										id : id
									}, {
										success : function(data) {
											this._pager(1);
										}.bind(this),
										failure : function() {

										}
									});
						}.bind(this)
					})
		},
		_pager : function(n) {
			requestMdl.page({
						_view_mode : 'list_index',
						pg : n
					}, {
						success : function(data) {
							var _ele = $("#app-share");
							if (_ele) {
								_ele.html(data.view);
							}
						}.bind(this),
						failure : function() {

						}
					});

		},
		_reload : function() {
			location.href = location.href.split("#")[0] + " ";
		},
		_cancel : function() {

		},
		_flash : {
			html : '<embed height="#{height}" width="#{width}" '
					+ 'allowscriptaccess="always" wmode="transparent" allowfullscreen="true" '
					+ 'type="application/x-shockwave-flash" src="#{src}"/>',
			options : {
				height : 396,
				width : 476,
				src : ''
			}
		},
		_setContent : function(options) {
			var _meta = decodeURIComponent(options.info.url);
			if (options.type == "0") {
				_meta ='<img src="'+options.info.picurls+'" />';	

			}
			_defaultHtml = '<dl class="fieldset">'
					+ '<dt>分享理由</dt>'
					+ '<dd>'
					+ '<textarea class="text" rows="4"></textarea>'
					+ '<span style="display: none;" class="formError">分享理由不能超过360个字符</span>'
					+ '</dd>'
					+ '<dd>'
					+ '<div class="shareDialogDiv">'
					+ '<div class="divInt">'
					+ '<input type="text" name="title" class="text" value="'
					+ options.info.title
					+ '"/>'
					+ '<span style="display: none;" class="formError">标题不能超过60字符</span>'
					+ '<div class="meta">' + _meta + '</div>' + '</div>'
					+ '</div>' + '</dd>' + '</dl>';
			this.dialog.setContent(_defaultHtml)
		}
	})
	sohu.share.init = function(data) {
		if (data.constructor == Object) {
			return new sohu.share.Base(data)._loadData();
		} else {
			return new sohu.share.Base()._loadData(data);
		}
	}
	sohu.share.play =function(ele,src,type){
		return new sohu.share.Base.play(ele,src,type);
	}
	sohu.share.blog = function(id, title, uid) {
		var _options = {
			type : 2,
			info : {
				title : title,
				url : encodeURIComponent(location.href),
				authorid : id
			}
		}
		return new sohu.share.Base(_options)._loadData();

	}
	sohu.share.album = function(type, title, src, uid, url, aname) {// type,title,src,uid,url,aname
		var _options = {
			type : type, // 分享的是相册为4，照片为3。
			info : {
				url : encodeURIComponent(url), // 相册url或照片的url，当type为3的时候url是照片的url，当type为4的时候url是相册的url。
				title : title, // 图片标题
				picurls : src, // 图片地址
				authorid : uid, // 发布者id
				containername : aname
				// 相册名称
			}
		};

		return new sohu.share.Base(_options)._loadData();

	}
	sohu.share.feed = function(userid, id) {
		return new sohu.share.Base()._feed(userid, id)

	}
}, "sohu.ctrl.Dialog,sohu.core.*")