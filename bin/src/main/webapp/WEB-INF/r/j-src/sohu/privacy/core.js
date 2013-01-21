/**
 * @fileoverview 隐私功能显示相关的JS类实现
 * @author hongwei@sohu-inc.com & Neo www.neoy.cn
 * @version 0.1
 * 
 * @requires kola
 */

$register('sohu.privacy.*', function() {
	/**
	 * @constructor
	 */

	var requestMdl = new sohu.core.Model({

		actions : {

			show : {
				url : '/privacy/profile/show.do',
				params : ['typeid'],
				method : 'get',
				format : 'json',
				type : 'one'
			},
			update : {
				url : '/privacy/profile/update.do',
				params : ['typeid', 'level', 'cuslevel', 'pu', 'bu', 'pg', 'bg'],
				method : 'post',
				format : 'json',
				type : 'blank'
			}
		},
		url : '/a'
	});
	sohu.privacy.Base = Class.create({
		initialize : function(options) {

			this.opt = Object.extend({
						title : options.title || " ",
						model : options.model || 1,
						type : options.type || 2,
						name : options.name || "privacy",
						data : options.data || false,
						groups : options.groups || false,
						callback : options.callback || function(){},
						onCancel : options.onCancel || function(){}
					}, options || {});
			this.backData = {};
			this.data = this.opt.data, this.groups = this.opt.groups;
			this.catche = false;
			this.dialogType = this.opt.type;
			this._selector = {};
			var _okBtn = this.opt.model == 1 ? "确定" : "保存";
			this.selfBox = $("#selfBox_" + this.opt.name);
			this.dialog = new sohu.ctrl.Dialog({
						title : "自定义设置",
						lodding : true,
						content : " ",
						mask : true,
						onClose : this._close.bind(this),
						buttons : [{
									html : _okBtn,
									isRed : true,
									func : this._submit.bind(this)
								}, {
									html : '取消',
									event : 'click',
									func : this._cancel.bind(this)
								}]
					});
			this._loadData();
			this.dialog.show();
		},
		_loadData : function() {
			var _state = 0;
			if (!this.data) {
				if (this.opt.model == 1) {

					this.data = {
						cuslevel : $("input[data-key=cuslevel]", this.selfBox)
								.val(),
						pu : $("input[data-key=pu]", this.selfBox).val()
								.split(","),
						bu : $("input[data-key=bu]", this.selfBox).val()
								.split(","),
						pg : $("input[data-key=pg]", this.selfBox).val()
								.split(","),
						bg : $("input[data-key=bg]", this.selfBox).val()
								.split(",")
					}
					if (_state >= 1) {
						this._initDialog();
					} else {
						_state++;
					}

				} else {
					requestMdl.show({
								typeid : this.opt.typeid
							}, {
								success : function(data) {

									this.data = data;
									if (_state >= 1) {
										this._initDialog();
									} else {
										_state++;
									}
								}.bind(this),
								failure : function() {

								}
							});
				}
			} else {
				_state++
			}
			if (!this.groups) {
				sohu.friend.friendMdl.groupList(null, {
							success : function(data) {
								this.groups = data;
								if (_state >= 1) {
									this._initDialog();
								} else {
									_state++;
								}
							}.bind(this),
							failure : function() {
							}
						});
			} else {
				_state++
			}
			if (_state >= 2) {
				this._initDialog();
			}
		},
		_select : function(data) {
			var _select = $("select", this.dialog.body);
			if (!_select) {
				return;
			}
			var _selfSetBox = $("#selfBox_privacy");

			if (data) {

				if (data.constructor == Number) {
					// alert(data)
					_select.select(data);
					if (data >= 1 && _selfSetBox) {
						_selfSetBox.show();
					}
					return;
				};
				if (data == "Event") {

					_select.on('change', function() {
								if (this.value == "5") {
									_selfSetBox.show();
								} else {
									_selfSetBox.hide();
								}
							})
				}
			} else {
				return _select.val();
			}

		},
		_radio : function(data) {
			var _id = 0;
			var _radios = $("input[type=radio]", this.dialog.body);
			var _someFriendSel = $("#wfriend").parent();
			if (!_radios) {
				return;
			}
			if (data) {
				if (data == "Event") {

					_radios.on('click', function() {
						
								if (_id) {
									$(_id).up("div.row").removeClass("rowOver");
								}
								//_id = this;
								//$(_id).up("div.row").addClass("rowOver");
								if (this.id == 'someFriend') {
									$("#someFriend").up("div.row").addClass("rowOver");
									_id=this;
									_someFriendSel.toggle();
								} else {
									_someFriendSel.hide();
									$("#someFriend").up("div.row")
											.removeClass("rowOver");
								}
							})
				} else {
					data = parseInt(data);
					_radios.each(function(lt, i) {
								if (lt.attr("value") == data) {
									if (data == 3) {
										_someFriendSel.show();
									}
									lt.attr("checked", true);
									lt.up("div.row").addClass("rowOver");
									_id = lt;
								}
							}.bind(this));
					return;
				}

			} else {
				var _data = 0;
				_radios.each(function(lt, i) {
							if (lt.val()) {
								_data = lt.attr('value');
							}
						})
				return _data;
			}
		},
		_checkBox : function(element, data, type) {
			var _ele = $(element);
			var _checks = $("input[type=checkbox]", _ele);
			if (!_ele) {
				return;
			}
			if (data) {
				if (type == "list") {
					var _str = "";
					data.each(function(lt, i) {
								_str += '<label ><input type="checkbox" name="'
										+ lt.id + '" class="checkbox" value="'
										+ lt.id + '" />' + lt.name + '</label>'
							})
					_ele.html(_str);
				}
				if (type == "set") {
					_checks.each(function(lt, i) {
								data.each(function(ot, l) {
											var _id = ot.id ? ot.id : ot;
											if (lt.attr("value") == _id) {
												lt.attr("checked", true);
											}
										})
							})
				}
			} else {
				var _data = [];
				_checks.each(function(lt, i) {
							if (lt.val()) {
								_data.push(lt.val());
							}
						})
				return _data.join(",");
			}
		},
		_buttons : function() {
			var _button = this.dialog.pannel.down(".foot button[type=button]")
					.get(0)
			if (!_button) {
				return;
			}
			if (_button) {
				if (this.opt.model == 1) {
					_button.html('确定');
				} else {
					_button.html("保存")
				}
			}
		},
		_uggroups : function(element, data) {
			var _ele = $(element);
			if (!_ele) {
				return;
			}
			if (data && _ele) {
				var _str = "";
				data.each(function(lt, i) {
							if (lt.name) {
								_str += '<a href="javascript:void(0)">'
										+ lt.name + '</a>';
							} else {
								if (lt && lt.constructor != Object) {
									_str += '<a href="javascript:void(0)">'
											+ lt + '</a>';
								}
							}
						})
				_ele.html(_str);
			} else {
				return;

			}
		},

		_setPannelA : function(data) {

			this.dialog.setContent(this._setDialog);
			this._select(data.cuslevel);
			this._select("Event");
			this._uggroups("#wgroupList", data.pg);
			this._uggroups("#bgroupList", data.bg);
			this._uggroups("#wfriend", data.pu);
			this._uggroups("#bfriend", data.bu);
			this._setTitle(this.opt.title);
			$("#selfSetting").on('click', function() {
						/*
						 * if(this.catche){ this._setPannelB(this.catche);
						 * }else{ this._setPannelB(this.data); }
						 */
						this._setPannelB(data);
					}.bind(this))
			this.dialogType = 1;
			this._buttons();
		},
		_setPannelB : function(data) {
			this.dialog.setContent(this._selSetHtml);
			this.dialog.body.addClass("setting");
			this._radio(data.cuslevel);
			this._radio("Event");
			this._checkBox("#wgroupList", this.groups, "list");
			this._checkBox("#bgroupList", this.groups, "list");
			this._checkBox("#wgroupList", data.pg, "set");
			this._checkBox("#bgroupList", data.bg, "set");
			this._initFriendSelector('wfriend', data.pu);
			this._initFriendSelector('bfriend', data.bu);
			this._setTitle(this.opt.title);
			this.dialog.setPos();
			this.dialogType = 2;
			this._buttons();
		},
		_setTitle : function(str) {

			this.dialog.body.down("h5").html("谁可以看到" + str);

		},
		_initFriendSelector : function(id, data) {
			this._selector[id] = new sohu.friend.Selector({
				element : "#" + id,
				type : 2,
				zindex : 3500,
				except : [],
				complete : function(data) {
					this.backData[id] = this._formatObjectToArray(data, "name");
				}.bind(this),
				defaultValue : this._formatObjectToArray(data, "id"),
				isButton : true
			});
		},
		_initDialog : function() {

			if (this.opt.type == 1) {
				this._setPannelA(this.data);
			} else {
				this._setPannelB(this.data);
			}
		},
		_setHiddenInput : function(data) {
			var _cus = $("input[data-key=cuslevel]", this.selfBox);
			var _pu = $("input[data-key=pu]", this.selfBox);
			var _bu = $("input[data-key=bu]", this.selfBox);
			var _pg = $("input[data-key=pg]", this.selfBox);
			var _bg = $("input[data-key=bg]", this.selfBox);
			_cus.val(data.cuslevel);
			_pu.val(data.pu);
			_bu.val(data.bu);
			_pg.val(data.pg);
			_bg.val(data.bg);
		},
		_getDataList : function() {
			var _result = {};
			_result.cuslevel = this._getCuslevel();
			if (parseInt(_result.cuslevel) != 3) {
				_result.pu = "";
				_result.pg = "";
			} else {
				_result.pu = this._getUsers("#pName");
				_result.pg = this._getGroups("#wgroupList");
			}
			_result.bu = this._getUsers("#bName");
			_result.bg = this._getGroups("#bgroupList");
			this.data
			return _result;
		},

		_reSet : function(value) {
			this.dialog.setContent(this._setDialog);
			this._select(1);
			this._select("Event");
			this.resetData(value);
			$("#selfSetting").on('click', function() {
						this._setPannelB(value);
					}.bind(this))
			this.dialogType = 1;
			this._buttons();
		},
		resetData : function(value) {
			var cusLevel = ["所有登陆用户", "好友及好友的好友", "好友", "部分好友", "仅自己", "制定"];
			var _cus = $("div[data-key=level]", this.selfBox);
			if (value.cuslevel && _cus) {
				_cus.show();
				_cus.html(cusLevel[value.cuslevel]);
			}
			$("#selfBox_" + this.opt.name).show();
			this._resetData("wfriend");
			this._resetData("wgroupList");
			this._resetData("bgroupList");
			this._resetData("bfriend");
		},
		_resetData : function(str) {
			var _ele = $("div[data-key=" + str + "]", this.selfBox);
			if (_ele) {
				_ele.show();
				if (this.backData[str] && this.backData[str].length > 0) {
					_ele.parent().parent().show();
					_ele.parent().show();
					this._uggroups(_ele, this.backData[str]);
				} else {
					_ele.parent().hide();
				}
			}
		},
		_reSetGroups : function(id) {
			if (this.backData[id]) {
				this._initGroupsA("#" + id, this.backData[id])
			} else {
				return true;
			}
		},
		_getGroupsName : function(ids) {
			var _group = [];
			for (var i = 0; i < ids.length; i++) {
				for (var j = 0; j < this.groups.length; j++) {
					if (this.groups[j].id == ids[i]) {
						_group.push(this.groups[j]);
					}
				}
			}
			return _group;
		},
		_getCuslevel : function() {
			var _data = "";
			if (this.dialogType == 2) {
				_data = this._radio();
			} else if (this.dialogType == 1) {
				_data = this._select();
			}
			return _data;
		},
		_getUsers : function(ele) {
			var _ele = $(ele);
			if (!_ele) {
				return [];
			}
			var _value = _ele.val();
			//var _groups = _value.split(",");
			return _value;
			//return _value ? _groups ? _groups : [_value] : [];
		},
		_getGroups : function(ele) {
			var _data = [];
			var _checks = $("input", $(ele));
			if (!_checks) {
				return "";
			}
			_checks.each(function(lt, i) {
						if (lt.val()) {
							_data.push(lt.val());
						}
					})
			return _data.join(",");
		},
		_update : function(value, func) {
			//var _options = {}
			//_options.level = value.cuslevel;
			//_options.typeid = this.opt.typeid;
			//_options.pu = value.pu;
			////_options.bu = value.bu;
			//_options.pg = value.pg;
			//_options.bg = value.bg;
			var _options=Object.extend({
				level  : value.cuslevle,
				typeid : this.opt.typeid,
				pu     : "",
				bu     : "",
				bg     : "",
				pg     : ""
			},value)
			this.dialog.setLoad();
			requestMdl.update(_options, {
						success : function(data) {

							func();
						}.bind(this),
						failure : function() {

						}
					});

		},
		_submit : function() {
			var _value = this._getDataList();
			this.backData["wgroupList"] = this._getGroupsName(_value.pg.split(","));
			this.backData["bgroupList"] = this._getGroupsName(_value.bg.split(","));
			if (this.opt.type == 1 && this.dialogType == 2) {
				this.catche = _value;
				this._reSet(_value);
			} else if (this.opt.type == 1 && this.dialogType == 1) {
				var _val = this.catche ? this.catche : this.data;
				this._callBack(_val);
			} else if (this.opt.type == 2) {
				this._callBack(_value);
			}
		},
		_cancel : function() {
			if (this.opt.type == 1 && this.dialogType == 2) {
				this._setPannelA(this.data);
			} else {
				this.dialog.close();
			}
			this.opt.onCancel();
		},
		_callBack : function(value) {
			if (this.opt.model == 1) {
				this._setHiddenInput(value);
				this.resetData(value);
				this.dialog.close();
			}
			if (this.opt.model == 3) {
				this.dialog.setLoad();
				this._update(value, function() {
							this.dialog.setContent("保存成功！");
							this.dialog.setButton({
										html : "确定",
										isRed : true,
										close : true
									});
							this.dialog.close.bind(this.dialog).timeout(2);
						}.bind(this));
			}
			this.opt.callback(value);

		},
		_close    : function(){
			this._closeSelector();
		},
		_closeSelector : function(){
			if(this._selector.wfriend&&this._selector.bfriend){
				this._selector.wfriend.selectDialog.popLayer.remove();
				this._selector.bfriend.selectDialog.popLayer.remove();
			}
		},
		_formatObjectToArray : function(data, key) {

			var _temp = [];
			if (data && data[0] != "") {

				if (data.length && data.length > 0) {
					data.each(function(lt, i) {
								var _v = lt[key] ? lt[key] : lt
								_temp.push(_v);
							})
				}

			}
			return _temp;
		},
		_selSetHtml : '<h5></h5>'
				+ '<div class="row"><label ><input type="radio" value="0"  class="radio" name="cuslevel" />全部登录用户</label></div>'
				+ '<div class="row"><label ><input type="radio" value="1" class="radio" name="cuslevel" />好友及好友的好友</label></div>'
				+ '<div class="row"><label ><input type="radio" value="2" class="radio" name="cuslevel"  />仅好友</label></div>'
				+ '<div class="row">'
				+ '<label for="someFriend"><input type="radio" class="radio" name="cuslevel" value="3" id="someFriend"/>某些好友</label>'
				+ '<div class="listList" style="display:none" >'
				+ '<div class="selector selector-toggle" id="wfriend" ><a href="javascript:void(0);" class="toggle"></a><ol class="tokenList"><li><input type="hidden" name="wreceiverIds" id="pName"/><input type="text" style="display: none;"/></li></ol></div>'
				+ '<p>指定某些好友分组：</p>'
				+ '<div id="wgroupList">'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div class="bListTit">排除某些好友</div>'
				+ '<div class="bListRow">'
				+ '<div class="selector selector-toggle" id="bfriend" ><a href="javascript:void(0);" class="toggle"></a><ol class="tokenList"><li><input type="hidden" name="breceiverIds" id="bName"/><input type="text" style="display: none;"/></li></ol></div>'
				+ '</div>' + '<div class="bListTitGroup">排除某些分组</div>'
				+ '<div class="bListRow" id="bgroupList">' +

				'</div>',
		_setDialog : '<h5></h5>'
				+ '<div class="privacyIcon">'
				+ '<select class="select" name="cuslevel">'
				+ '<option value="0" >全部登录用户</option>'
				+ '<option value="5" >自定义设置</option>'
				+ '</select>'
				+ '</div>'
				+ '<div data-key="level"></div>'
				+ '<div id="selfBox_privacy" style="display:none;_display:block">'
				+ '<div class="wList">'
				+ '<div class="listBox fix">'
				+ '<div class="listTit"><strong>允许：</strong>好友</div>'
				+ '<div class="listContent" data-key="wfriend"></div>'
				+ '</div>'
				+ '<div class="listBox fix">'
				+ '<div class="listTit">分组</div>'
				+ '<div class="listContent" data-key="wgroupList">'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div class="bList">'
				+ '<div class="listBox fix">'
				+ '<div class="listTit"><strong>排除：</strong>好友</div>'
				+ '<div class="listContent" data-key="bfriend">'
				+ '</div>'
				+ '</div>'
				+ '<div class="listBox fix">'
				+ '<div class="listTit">分组</div>'
				+ '<div class="listContent" data-key="bgroupList">'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div class="option"  style="padding-right:10px"><a id="selfSetting" href="#">编辑自定义设置</a></div>'
				+ '</div>'
	});
	sohu.privacy.InitCheck = function(formId, callBackFun) {
		sohu.tool.ChangeCheck.initCheck(formId, callBackFun);
	}

	sohu.privacy.Select = function(ele, options) {
		$(ele).on("change", function() {
					if (this.value == 5) {
						return new sohu.privacy.Base(options)
					} else {
						$("#selfBox_" + options.name).hide();
					}
				})
	}
	sohu.privacy.button = function(element) {
		$("ele").on("click", function(ele, options) {
					return new sohu.privacy.Base(options)
				})
	}

	/**
	 * *****************************大黑名单部分
	 * ***************************************************
	 */

	var blacklistMdl = new sohu.core.Model({

				actions : {

					add : {
						url : '/add.do',
						params : ['id'],
						method : 'post',
						format : 'json',
						type : 'one'
					},
					del : {
						url : '/del.do',
						params : ['id'],
						method : 'post',
						format : 'json',
						type : 'blank'
					},
					list : {
						url : '/list.do',
						method : 'get',
						format : 'json',
						type : 'blank'
					}
				},
				url : '/a/privacy/blacklist'
			});

	sohu.privacy.blackList = {

		init : function() {

		},

		add : function(id) {
			blacklistMdl.add({
						id : id
					}, {
						success : function(data) {
							sohu.ctrl.Dialog.alert("提示","该用户已经被加入黑明单！");
						}.bind(this),
						failure : function() {
							sohu.ctrl.Dialog.alert("提示","操作失败！");

						}
					});

		},
		list : function() {
			blacklistMdl.list(null, {
						success : function(data) {

						}.bind(this),
						failure : function() {

						}
					});
		},
		del : function(obj,id) {
			sohu.ctrl.Dialog.confirm("您确认要把他从黑名单中删除吗？",{
				yes: this.delList.bind(this,obj,id),
				no : function(){
				
				
				}
			})

		},
		delList  : function(obj,id){
		 	blacklistMdl.del({
						id : id
					}, {
						success : function(data) {
							$(obj).remove();
						}.bind(this),
						failure : function() {
							sohu.ctrl.Dialog.alert("提示","删除操作失败！");
						}
			});
		
		}

	}

}, 'sohu.ctrl.Dialog,sohu.friend.*,sohu.tool.ChangeCheck');
