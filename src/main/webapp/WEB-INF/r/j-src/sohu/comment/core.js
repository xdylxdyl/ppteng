$register('sohu.comment.*', function() {

	/*
	 * 表情类
	 */
	sohu.ctrl.Emote = Class.create({
		initialize : function(options) {
			this.opt = Object.extend({
						parent : $(document.body),
						dataType : "base",
						boxClass : "emoteBox",
						emClass : "emItem",
						path : "",
						pageSize : 32,
						pos : [0, -150],
						onSelect : function() {
						},
						preview : false
					}, options);
			this.dataType = this.opt.dataType;
			this.setData(this.dataType);
			this.pageIndex = 0;
			this.pageSize = this.opt.pageSize;
			this._initEmotePannle();
		},
		_initEmotePannle : function() {
			var _html = '<div class="decor">'
					+ '<span class="tl"/>'
					+ '<span class="tr"/>'
					+ '<span class="br"/>'
					+ '<span class="bl"/>'
					+ '</div>'
					+ '<div class="content">'
					+ '<div style="width: 224px;" class="emotBox">'
					+ '<div class="emots">'
					+'</div>'
					+ '<div class="pager pager-simple">'
					+ '<a data-key="up" class="pagePrev pageNow"  href="javascript:void(0)">上一页</a>'
					+ '<a data-key="down" class="pageNext " href="javascript:void(0)">下一页</a>'
					+ '</div>' + '</div>' + '</div>';
			this.emBox = kola.Element.create("div");
			this.emBox.addClass("popLayer")
			this.emBox.html(_html);
			this.emBox.hide();
			$(this.opt.parent).append(this.emBox);
			this.emBox.pos({
						left : this.opt.pos[0],
						top : this.opt.pos[1]
					})
			this.emBox.emotsBody = $(".emots", this.emBox);
			this.setPage(this.pageIndex);
			this._initEvent();
			if (this.opt.preview) {
				this._initPreview();
			}
		},
		show : function() {
			this.emBox.show();

		},
		hide : function() {

			this.emBox.hide();
		},
		setPage : function(num) {
			_num = (this.pageIndex + num) * this.pageSize;
			var _len = this.currentData.length;
			if (_num < 0 || _num > _len) {
				_num = 0
			}
			this.emBox.emotsBody.html(this._initEmote(_num + 1))
		},
		_initPreview : function() {
			this._previewDiv = kola.Element.create("img");
			this.emBox.append(this._previewDiv);
			this._previewDiv.css("position", "relative");
		},
		_getImg : function(ubb) {
			var url = this.path + ubb + ".gif";
			if (this.opt.preview) {
				this._previewDiv.html('<img src= "' + url + '" />')
			}
		},
		_initEmote : function(index) {
			var _len = this.currentData.length;
			var _html = [];
			for (var i = index; i < index + 32; i++) { // var
														// img=1;img<=this.currentData.length;img++
				if (i > _len) {
					_html.push("</div>")
					return _html;
				}
				_html.push('<a href="javascript:void(0);" name=' + i
						+ ' class="emot e-' + this.dataType + '-' + i
						+ '" title=""></a>');
			}
			_html.push("</div>")
			return _html.join("");
		},
		_initEvent : function() {
			this.emBox.on('mouseover', this._choseEmote.bind(this));
			var _pageUp = $("a[data-key=up]", this.emBox);
			var _pageDown = $("a[data-key=down]", this.emBox);
			_pageUp.on("click", function() {
						_pageUp.addClass("pageNow");
						_pageDown.removeClass('pageNow');

						this.setPage(0);
					}.bind(this));
			_pageDown.on("click", function() {
						_pageUp.removeClass("pageNow");
						_pageDown.addClass("pageNow");

						this.setPage(1)

					}.bind(this));
		},
		setPos : function(pos) {
			this.emBox.pos(pos)
		},
		toggle : function() {
			var _dis = this.emBox.css("display");
			if (_dis == "none") {
				this.emBox.show();
			} else {
				this.emBox.hide();

			}
		},
		_choseEmote : function(e) {
			var eSrc = e.target || e.srcElement;
			var _ele = $(eSrc)
			if (_ele.hasClass("emot")) {
				_num = _ele.attr("name")
				_ubb = this.currentData[_num - 1];
				if (!_ubb) {
					return;
				}
				_info = this._getInfo(_ubb);
				_ele.attr('title', _info[1])
				if (!_ele.attr('yes')) {
					_ele.on('mousedown', function() {
								this._setUbb(_ubb)
							}.bind(this))
					_ele.on('click', function() {
								this.emBox.hide();
							}.bind(this))
					_ele.attr("yes", true);
				}
			}
		},
		//
		setData : function(type) {
			if (this._Data[type]) {
				this.dataType = type;
				this.currentData = this._Data[this.dataType].data
			}
		},
		// 获取ubb 码对应的信息
		_getInfo : function(obj) {
			return this._Ubbs[obj]
		},
		// 设置根据配置设置 ubb码
		_setUbb : function(str) {
			var ubb = ""
			if (this.dataType == "base") {
				ubb = str;
			} else {
				ubb = "[{" + this.dataType + "}" + str.replace(/[\[\]]/g, "")
						+ "]";
			}
			this.opt.onSelect(ubb, this._getImgTag(ubb));
		},
		/**
		 * 获取表情的img标签
		 */
		_getImgTag : function(ubb) {
			var tag = '', imgInfo = this._Ubbs[ubb], name = imgInfo[0], title = imgInfo[1], index = name
					.substring(0, name.indexOf('.'));

			tag = '<img src="http://sns.sohu.com/r/img/emots/base/' + index
					+ '.gif" title="' + title + '"/>';
			return tag;
		},

		// 表情数据
		_Data : {
			base : {
				info : {
					title : "",
					name : "",
					icon : ""
				},
				data : ["[:)]", "[#_#]", "[8*)]", "[:D]", "[:-)]", "[:P]",
						"[B_)]", "[B_I]", "[^_*]", "[:$]", "[:|]", "[:(]",
						"[:.(]", "[:_(]", "[):(]", "[:V]", "[*_*]", "[:^]",
						"[:?]", "[:!]", "[=:|]", "[:%]", "[:O]", "[:X]",
						"[|-)]", "[:Z]", "[:9]", "[:T]", "[:-*]", "[*_/]",
						"[:#|]", "[:69]", "[//shuang]", "[//qiang]", "[//ku]",
						"[//zan]", "[//heart]", "[//break]", "[//F]", "[//W]",
						"[//mail]", "[//strong]", "[//weak]", "[//share]",
						"[//phone]", "[//mobile]", "[//kiss]", "[//V]",
						"[//sun]", "[//moon]", "[//star]", "[(!)]", "[//TV]",
						"[//clock]", "[//gift]", "[//cash]", "[//coffee]",
						"[//rice]", "[//watermelon]", "[//tomato]", "[//pill]",
						"[//pig]", "[//football]", "[//shit]"]
			}
		},
		// 表情数据对应的ubb 编码
		_Ubbs : {
			"[:)]" : ["1.gif", "微笑"],
			"[#_#]" : ["2.gif", "谄媚"],
			"[8*)]" : ["3.gif", "偷笑"],
			"[:D]" : ["4.gif", "大笑"],
			"[:-)]" : ["5.gif", "害羞"],
			"[:P]" : ["6.gif", "调皮"],
			"[B_)]" : ["7.gif", "得意"],
			"[B_I]" : ["8.gif", "耍酷"],
			"[^_*]" : ["9.gif", "讽刺"],
			"[:$]" : ["10.gif", "委屈"],
			"[:|]" : ["11.gif", "郁闷"],
			"[:(]" : ["12.gif", "难过"],
			"[:.(]" : ["13.gif", "流泪"],
			"[:_(]" : ["14.gif", "大哭"],
			"[):(]" : ["15.gif", "发火"],
			"[:V]" : ["16.gif", "咒骂"],
			"[*_*]" : ["17.gif", "发呆"],
			"[:^]" : ["18.gif", "不惑"],
			"[:?]" : ["19.gif", "疑惑"],
			"[:!]" : ["20.gif", "吃惊"],
			"[=:|]" : ["21.gif", "流汗"],
			"[:%]" : ["22.gif", "尴尬"],
			"[:O]" : ["23.gif", "惊恐"],
			"[:X]" : ["24.gif", "闭嘴"],
			"[|-)]" : ["25.gif", "犯困"],
			"[:Z]" : ["26.gif", "睡觉"],
			"[:9]" : ["27.gif", "馋"],
			"[:T]" : ["28.gif", "吐"],
			"[:-*]" : ["29.gif", "耳语"],
			"[*_/]" : ["30.gif", "海盗"],
			"[:#|]" : ["31.gif", "重伤"],
			"[:69]" : ["32.gif", "拥抱"],
			"[//shuang]" : ["33.gif", "爽"],
			"[//qiang]" : ["34.gif", "强"],
			"[//ku]" : ["35.gif", "酷"],
			"[//zan]" : ["36.gif", "赞"],
			"[//heart]" : ["37.gif", "红心"],
			"[//break]" : ["38.gif", "心碎"],
			"[//F]" : ["39.gif", "花开"],
			"[//W]" : ["40.gif", "花谢"],
			"[//mail]" : ["41.gif", "邮件"],
			"[//strong]" : ["42.gif", "手势-棒"],
			"[//weak]" : ["43.gif", "手势-逊"],
			"[//share]" : ["44.gif", "握手"],
			"[//phone]" : ["45.gif", "电话"],
			"[//mobile]" : ["46.gif", "手机"],
			"[//kiss]" : ["47.gif", "嘴唇"],
			"[//V]" : ["48.gif", "V"],
			"[//sun]" : ["49.gif", "太阳"],
			"[//moon]" : ["50.gif", "月亮"],
			"[//star]" : ["51.gif", "星星"],
			"[(!)]" : ["52.gif", "灯泡"],
			"[//TV]" : ["53.gif", "电视"],
			"[//clock]" : ["54.gif", "闹钟"],
			"[//gift]" : ["55.gif", "礼物"],
			"[//cash]" : ["56.gif", "现金"],
			"[//coffee]" : ["57.gif", "咖啡"],
			"[//rice]" : ["58.gif", "饭"],
			"[//watermelon]" : ["59.gif", "西瓜"],
			"[//tomato]" : ["60.gif", "番茄"],
			"[//pill]" : ["61.gif", "药丸"],
			"[//pig]" : ["62.gif", "猪头"],
			"[//football]" : ["63.gif", "足球"],
			"[//shit]" : ["64.gif", "便便"]
		}
	})

	/**
	 * ******************************************* RequestMdl
	 * ********************************************
	 */

	var requestMdl = new sohu.core.Model({

				actions : {

					all : {
						url : '/all.do',
						params : ['appid', 'itemid'],
						method : 'get',
						format : 'json',
						type : 'one'
					},

					add : {
						url : '/add.do',
						params : ['content', 'itemid', 'tuid', 'appid'],
						method : 'post',
						format : 'json',
						type : 'one'
					},

					del : {
						url : '/del.do',
						params : ['itemid', 'cid', 'appid'],
						method : 'post',
						format : 'json',
						type : 'one'
					}
				},

				url : '/a/comment/info'
			});

	/**
	 * ******************************************* RequestCtl
	 * *******************************************
	 */

	sohu.comment = {

		init : function(options) {

			this.contentLength = options.length || 2000;
			this.textDefaultValue = "添加评论...";
			switch (options.type) {
				case "all" :

					this.getCommentList(options)
					break;

				case "del" :

					this.delComment(options);
					break;

				case "add" :
					this.addComment(options);
					break;

				case "show" :
					this.show(options);
				case "focus" :
					this.onFocus(options);
					break;
				case "blur" :
					this.onBlur(options)
					break;
				case "emote" :
					this.initEmote(options);
					break;
				default :
					break;
			}
		},
		_fillList : function(data, box, hide) {
			// var _hide=Boolean(options.hide)?false:true;
			if (data == "" && !hide) {
				box.parent().hide();
			}
			box.html(data);

		},
		_emote : new sohu.ctrl.Emote(),
		_keyEvent : function(e, options) {
			var e = e || window.event;
			if (e.ctrlKey && e.keyCode == 13) {
				this.addComment(options);
			}

		},
		_delComment : function(options) {
			var _listBox = $("#listBox_" + options.appid + "_" + options.itemid);
			requestMdl.del({
						itemid : options.itemid,
						cid : options.cid,
						appid : options.appid
					}, {
						success : function(data) {
							this._fillList(data.list, _listBox, options.hide);
						}.bind(this),
						failure : function() {

						}
					});
		},
		_checkLength : function(str) {
			if (str.byteLength() > this.contentLength) {
				return false
			}
			return true;

		},
		_clickEvent : function(e, options) {
			var _Id = options.appid + "_" + options.itemid;
			var e = e || window.event;
			var eSrc = e.target || e.srcElement;
			var eId = eSrc.id.split("_").slice(1).join("_");
			if(eSrc.id=="text_"+_Id){
				this._emote.emBox.hide();
			}
			if (eId == _Id || $(eSrc).hasClass("emot")
					|| $(eSrc).hasClass("button")
					|| $(eSrc).parent().hasClass("pager")) {
				return true;
			} else {
				this.onBlur(options);
			}
		},
		onFocus : function(options) {
			var _Id = options.appid + "_" + options.itemid;
			var _text = $("#text_" + _Id);
			var _btn = $("#btn_" + _Id);
			var _emotBtn = $("#emote_" + _Id);
			if (_text.attr("reg") && _text.attr("reg") == "false") {
				_text.removeClass("addInput");
				_text.addClass("addComment");
			}
			if (!_text.attr("anim")) {
				_text.attr("anim", true);
				_text.on("keydown", this._keyEvent.bindEvent(this, options))
				$(document.documentElement).on("click",
						this._clickEvent.bindEvent(this, options))
				// _text.attr("reg",true)
			}
			if (options.replyTo) {
				_text.val("回复" + options.replyTo + "：")
			} else if (_text.val() == this.textDefaultValue) {
				_text.val("");

			}
			_emotBtn.show();
			_btn.attr("style", " ");
			_text.focus();
		},

		show : function(options) {
			$("#listBox_" + options.appid + "_" + options.itemid).parent()
					.show();
			this.onFocus(options);
		},
		onBlur : function(options) {
			var _Id = options.appid + "_" + options.itemid;
			var _text = $("#text_" + _Id);
			var _btn = $("#btn_" + _Id);
			var _listBox = $("#listBox_" + _Id);
			var _emotBtn = $("#emote_" + _Id);
			this._emote.emBox.hide();
			if (_text.val()) {
				return;
			}
			var _hide = Boolean(options.hide) ? false : true;
			if (!_listBox.down("li") && _hide) {
				_listBox.parent().hide();
				return;
			}
			if (_text.attr("reg") && _text.attr("reg") == "false") {
				_btn.hide();
				_emotBtn.hide();
				_text.removeClass("addComment");
				_text.addClass("addInput");
			}
			_text.val(this.textDefaultValue)

		},
		delComment : function(options) {

			sohu.ctrl.Dialog.confirm("您确定删除这个评论吗？", {
						yes : this._delComment.bind(this, options),
						close : true
					});
		},

		addComment : function(options) {

			var _listBox = $("#listBox_" + options.appid + "_" + options.itemid);
			var _text = $("#text_" + options.appid + "_" + options.itemid);
			if (!this._checkLength(_text.val())) {
				// sohu.ctrl.Dialog.alert("搜狐sns提示您","您提交的信息长度大于"+this.contentLength+"字节请更正！");
				// return false;
				_text.byteLength(this.contentLength);
			}
			//var linkReg = /((http:\/\/)?([\w]+\.)?sohu\.[^\s]*)/
			//var _value = _text.val().replace(/<\/?\w+[^<>]*>/g, "");
			//if (linkReg.test(_value)) {
			//	_value = _value.replace(linkReg, "<a href='$1' >$1</a>");
			//}
			var _value=_text.val();
			if (_value == "") {
				return;
			}
			requestMdl.add({
						content : _value,
						appid : options.appid,
						itemid : options.itemid,
						tuid : options.tuid
					}, {
						success : function(data) {
							_listBox.html(data.list);
							_text.val("");
							if (_text.attr('anim')) {
								this.onBlur(options);
							}
						}.bind(this),
						failure : function() {

						}
					});
		},
		getList : function(options) {
			requestMdl.all({
						appid : options.appid,
						itemid : options.itemid,
						size : options.size || 10
					}, {
						success : function(data) {
							options.callback(data);
						}.bind(this),
						failure : function() {

						}
					});
		},
		getCommentList : function(options) {

			var _listBox = $("#listBox_" + options.appid + "_" + options.itemid);
			requestMdl.all({
						appid : options.appid,
						itemid : options.itemid,
						size : options.size
					}, {
						success : function(data) {
							_listBox.html(data.list);
						}.bind(this),
						failure : function() {

						}
					});
		},
		initEmote : function(options) {
			var _text = $("#text_" + options.appid + "_" + options.itemid);
			this._emote.opt.onSelect = function(str) {
				var _value = _text.val();
				if (_value == this.textDefaultValue) {
					_value = "";
				}
				_text.val(_value + str);
				_text.focus();
			}.bind(this)
			this._emote.emBox.show();

			this._emote.setPos(_text.pos());
		}
	}

}, 'sohu.core.*,sohu.ctrl.Dialog')
