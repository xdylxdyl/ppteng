/**
 * 有关Friend页面应用内容的包
 */

$register('sohu.friend.page.*', function() {
	
	//	这里是故意没有使用sohu.friend.page，因为这个更像是整合包
	var PACK = sohu.friend;

	/********************************************* MemberAddWgt *********************************************/
	
	PACK.MemberAddWgt = {
		init: function(options) {
			//	初始化好友选择器
			this._selector = new sohu.friend.Selector({
				element: options.selEl,
                type: 2,
                isButton:true
			});
			
			//	绑定添加事件
			this._addBtnEl = $(options.ctrEl).down('button').on('click', this._add.bind(this));
			return this;
		},
		
		_add: function() {
			var users = this._selector.getValue().trim();
			if (users.length == 0) return;
			
			this._addBtnEl.prop('disabled', true).html('添加中');
			var data = {
				gid: sohu.friend.FriendListWgt.groupId,
				fids: users
			}
			sohu.friend.friendMdl.addMember(data, {
				success: this._addSuccess.bind(this),
				failure: this._addFailure.bind(this)
			})
		},
		_addSuccess: function(data) {
			sohu.friend.FriendListWgt.list(sohu.friend.FriendListWgt.groupId);
			this._addBtnEl.prop('disabled', false).html('添加');
			this._selector.clear();
		},
		_addFailure: function(error) {
			sohu.ctrl.Dialog.alert('错误', error.statusText, function() {
				this._addBtnEl.prop('disabled', false).html('添加');
				this._selector.clear();
			}.bind(this));
		}
	}

	/********************************************* FriendListWgt *********************************************/
	
	PACK.FriendListWgt = {
		
		/**
		 * 初始化方法
		 * @param {object} options 设置项，包括如下属性：
		 *  	listEl: 列表容器对象 
		 *  	pageEl: 翻页代码容器对象
		 *  	countEl: 显示数量的容器对象
		 *  	addMemberEl: 添加好友进组的容器对象
		 *  	addMemberSelEl: 添加好友进组的Selector容器对象
		 */
		init: function(options) {
			this.groupId = '-1';
			
			this._countEl = $(options.countEl);
			this._addMemberEl = $(options.addMemberEl);
			
			var listOpt = {
		  		list: {
		  			ctrEl:		options.listEl,		//	列表容器对象
		  			itemsEl:	'>li',				//	所有项的CSS匹配符
		  			itemEl:		'#friend_${id}',	//	指定项的CSS匹配符
		  			size:		10,
		  			countEl:	this._countEl
		  		},
		  		
		  		page: {
		  			ctrEl:		options.pageEl
		  		},
		  
		  		//	模型配置信息
		  		model: {
		  			obj:		sohu.friend.friendMdl,			//	模型对象
		  			key:		'id'
		  		},
		  		
		  		//	方法的配置信息
		  		methods: {
		  			
		  			//	list方法的配置信息
		  			list: {
		  				action:	'list',				//	对应模型的方法名
		  				data: {						//	默认的参数
		  					groupid: this.groupId
		  				},
		  				beforeSuccess: this._listBeforeSuccess.bind(this),
		  				afterSuccess: this._listAfterSuccess.bind(this, this._addMemberEl, options.addMemberSelEl)
		  			}
		  		}
			};
			this._lister = sohu.ctrl.Lister.getPageList(listOpt);
			this.list(this.groupId);
		},
		
		//	显示某一组的列表
		list: function(groupId) {
			this.groupId = groupId;
			this._lister.setMethodData(this.groupId == '-1' ? {} : {
				groupid: this.groupId
			}, 'list');
			this._lister.list(0);
		},
		
		//	显示搜索结果
		listSearchResults: function(list) {
			this._addMemberEl.hide();
			this._countEl.html(list.length);
			this._lister.setContentHtml(list == 0 ? '没有找到匹配的好友，您可以换一些搜索关键词' : list.collect(this._getItemHtml.bind(this)).join(''));
		},
		
		//	把一个好友从当前分组中删除
		delMember: function(userId) {
			this._delMemberDialog = sohu.ctrl.Dialog.confirm('确定要从本组中移除吗？', {
				yes: this._sureDelMember.bind(this, userId)
			});
		},
		_sureDelMember: function(userId) {
			this._delMemberDialog.setContent('正在删除...');
			this._delMemberDialog.setButton();
			sohu.friend.friendMdl.delMember({
				fid: userId,
				gid: this.groupId
			}, {
				success: this._delMemberSuccess.bind(this),
				failure: this._delMemberFailure.bind(this)
			});
		},
		_delMemberSuccess: function(userId, data) {
			this._delMemberDialog.close();
			this._lister.refresh();
		},
		_delMemberFailure: function(error) {
			this._delMemberDialog.setContent('<p>发生错误：' + error.statusText + '</p>');
			this._delMemberDialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
		},
		
		//	设置某个用户的所属分组
		resetMember: function(userId) {
			//	取得当前用户所属的好友分组
			var mdl = sohu.friend.friendMdl;
			var html = mdl.getGroups().collect(function(group, i) {
				var id = group.id;
				var inThis = group.users.include(userId);
				return '<label for="gids' + id + '"><input type="checkbox" name="gids" id="gids' + id + '" value="' + id + '"' + (inThis ? ' checked="checked"' : '') + ' />' + group.name + '</label>';
			}).join('');
			var userName = mdl.getUser(userId).name;
			html = 
				'<div class="friendDialog-changeGroup"><p>' + userName + '属于的分组</p>' + 
				'<div class="changeGroup">' + 
					'<div class="checkboxes">' + html + '</div>' + 
				'</div></div>';
			
			//	显示对话框
			this._resetMemberDialog = sohu.ctrl.Dialog.confirm(html, {
				title: '设置所属分组',
				yes: this._sureResetMember.bind(this, userId)
			});
			/*
			this._resetMemberDialog = new sohu.ctrl.Dialog({
				title: '设置所属分组',
				content: html,
				buttons: [
					{
						html: '确定',
						func: this._sureResetMember.bind(this, userId)
					}
				]
			});
			*/
			this._resetMemberDialog.show();
		},
		_sureResetMember: function(userId) {
			var data = kola.dom.Form.objFields(this._resetMemberDialog.body);
			this._resetMemberDialog.setContent('<p>正在保存...</p>');
			data.fid = userId;
			sohu.friend.friendMdl.resetMember(data, {
				success: this._resetMemberSuccess.bind(this),
				failure: this._resetMemberFailure.bind(this)
			});
		},
		_resetMemberSuccess: function(data) {
			this._resetMemberDialog.close();
			
			this.list(this.groupId);
		},
		_resetMemberFailure: function(data) {
			this._resetMemberDialog.setContent('<p>发生错误：' + error.statusText + '</p>');
			this._resetMemberDialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
		},
		
		/**
		 * 与一个好友解除关系调用的方法
		 */
		delFriend: function(userId) {
			this._delFriendDialog = sohu.ctrl.Dialog.confirm('确定把' + sohu.friend.friendMdl.getUser(userId).name + '从你的好友列表中删除吗？', {
				yes: this._sureDelFriend.bind(this, userId)
			});
		},
		_sureDelFriend: function(userId) {
			this._delFriendDialog.setContent('<p>正在操作中...</p>');
			this._delFriendDialog.setButton();
			var data = {
				fid: userId
			}
			sohu.friend.friendMdl.del(data, {
				success: this._delFriendSuccess.bind(this),
				failure: this._delFriendFailure.bind(this)
			});
		},
		_delFriendSuccess: function() {
			this._delFriendDialog.close();
			this._lister.refresh();
		},
		_delFriendFailure: function(error) {
			this._delFriendDialog.setTitle('错误');
			this._delFriendDialog.setContent('<p>' + error.statusText + '</p>');
			this._delFriendDialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
		},
		
		//	列表成功获得之前对数据的预处理方法
		_listBeforeSuccess: function(option) {
			var data = option.responseData;
			data.list = data.list.collect(this._getItemHtml.bind(this)).join('');
			return data;
		},
		
		//	成功获得列表后的方法
		_listAfterSuccess: function(addMemberEl, addMemberSelEl, data) {
			if (this.groupId != '-1') {
				if (!this._memberAddWgt) {
					this._memberAddWgt = sohu.friend.MemberAddWgt.init({
						ctrEl: addMemberEl,
						selEl: addMemberSelEl
					});
				}
				$(addMemberEl).show();
			} else {
				$(addMemberEl).hide();
			}
		},
		
		//	获得一个好友描述项的html片段
		_getItemHtml: function(data) {
			var str =  
				'<li class="friendItem" onclick="$(this).toggleClass(\'click\');">' +
					'<div class="friendAvatar"><a href="http://sns.sohu.com/profile.do?u=' + data.id + '" title="' + data.name + '" onclick="kola.Event.stopPropagation(event);">' +
						'<img src="' + data.icon + '" class="avatar-48 basic" />' +
						'<img src="' + data.big + '" class="avatar-full extra" />' +
					'</a></div>' +
					'<div class="firendOption"><ul>' +
						'<li><a class="opt opt-changeGroup" href="javascript:void(0);" onclick="sohu.friend.FriendListWgt.resetMember(\'' + data.id + '\');kola.Event.stop(event);return false;">修改所属分组</a></li>' +
						(this.groupId != -1 ? ('<li><a class="opt opt-changeGroup" href="javascript:void(0);" onclick="sohu.friend.FriendListWgt.delMember(' + data.id + ');kola.Event.stop(event);return false;">从本组中移除</a></li>') : '') +
						'<li class="extra"><a class="opt opt-break" href="javascript:void(0);" onclick="sohu.friend.FriendListWgt.delFriend(\'' + data.id + '\');kola.Event.stop(event);return false;">解除好友关系</a></li>' +
						'<li class="extra"><a href="javascript:void(0);">隐藏&nbsp;&laquo;</a></li>' +
						'<li class="basic"><a href="javascript:void(0);">更多&nbsp;&raquo;</a></li>' +
					'</ul></div>' +
					'<div class="friendInfo">' +
						'<h4><a href="http://sns.sohu.com/profile.do?u=' + data.id + '" title="' + data.name + '" onclick="kola.Event.stopPropagation(event);">' + data.name + '</a></h4>' +
						'<p>' + data.status + '</p>' +
					'</div>' +
				'</li>';
			return str;
		}
	}

	/********************************************* GroupListWgt *********************************************/
	
	PACK.GroupListWgt = {
		
		/**
		 * 初始化方法
		 * @param {object} options 设置项，包括如下属性：
		 *  	listEl: 列表容器对象 
		 *  	addEl: 添加新组对象
		 */
		init: function(options) {
			this.listEl = $(options.listEl);
			
			var listOpt = {
		  		list: {
		  			ctrEl:		options.listEl,		//	列表容器对象
		  			itemsEl:	'>li',				//	所有项的CSS匹配符
		  			itemEl:		'#group_${id}',	//	指定项的CSS匹配符
		  			size:		10
		  		},
		  
		  		//	模型配置信息
		  		model: {
		  			obj:		sohu.friend.friendMdl,			//	模型对象
		  			key:		'id'
		  		},
		  		
		  		//	方法的配置信息
		  		methods: {
		  			
		  			//	list方法的配置信息
		  			list: {
		  				action:	'groupList',		//	对应模型的方法名
		  				data: {},					//	默认的参数
		  				beforeSuccess: this._listBeforeSuccess.bind(this),
		  				afterSuccess: this._listAfterSuccess.bind(this)
		  			},
		  			
		  			del: {
		  				action: 'delGroup'
		  			}
		  		}
			};
			this._lister = sohu.ctrl.Lister.getAllList(listOpt);
			this._lister.list(0);
			
			//	初始化添加新组按钮
			$(options.addEl).on('click', this.add.bind(this));
		},
		
		/**
		 * 添加新组时调用的方法
		 */
		add: function() {
			if (this.editEl) return;
			
			this.listEl.append(this._getEditItemHtml());
			this.editEl = this.listEl.last();
			var inputEl = this.editEl.down('input');
			var buttonEl = this.editEl.down('button');
			var cancelEl = this.editEl.down('a').on('click', this._cancelAdd.bind(this));
			var eh = this._sureAdd.bind(this, inputEl, buttonEl, cancelEl);
			inputEl.focus().on('keyenter', eh);
			buttonEl.on('click', eh);
		},
		//	确认添加时调用的方法
		_sureAdd: function(inputEl, buttonEl, cancelEl) {
			var name = inputEl.val().trim();
			
			//	判断组名的有效性
			if (name.length == 0) {
				sohu.ctrl.Dialog.alert('错误', '请填入分组名称');
				return;
			}
			
			inputEl.prop('disabled', true);
			cancelEl.hide();
			buttonEl.prop('disabled', true).html('添加中');
			
			var data = {
				name: name
			}
			sohu.friend.friendMdl.addGroup(data, {
				success: this._addSuccess.bind(this),
				failure: this._addFailure.bind(this)
			});
		},
		_cancelAdd: function() {
			this.editEl.remove();
			this.editEl = null;
		},
		_addSuccess: function(data) {
			this.editEl.outerHtml(this._getItemHtml(data));
			this.editEl = null;
			
			this._resetTabs().active(data.id.toString());
		},
		_addFailure: function(error) {
			this.editEl.remove();
			this.editEl = null;
			sohu.ctrl.Dialog.alert('错误', error.statusText);
		},
		
		/**
		 * 修改一个组时调用的方法
		 */
		edit: function(id) {
			if (this.editEl) return;
			
			this._lister.getItemEl(id).outerHtml(this._getEditItemHtml());
			this.editEl = this.listEl.down('li.edit');
			var inputEl = this.editEl.down('input').val(sohu.friend.friendMdl.getGroup(id).name).focus();
			var buttonEl = this.editEl.down('button');
			var cancelEl = this.editEl.down('a').on('click', this._cancelEdit.bind(this, id));
			var eh = this._sureEdit.bind(this, id, inputEl, buttonEl, cancelEl);			
			inputEl.on('keyenter', eh);
			buttonEl.on('click', eh);
		},
		//	确认添加时调用的方法
		_sureEdit: function(groupId, inputEl, buttonEl, cancelEl) {
			var name = inputEl.val().trim();
			
			//	判断组名的有效性
			if (name.length == 0) {
				sohu.ctrl.Dialog.alert('错误', '请填入分组名称');
				return;
			}
			
			inputEl.prop('disabled', true);
			cancelEl.hide();
			buttonEl.prop('disabled', true).html('保存中');
			
			sohu.friend.friendMdl.updateGroup({
				id: groupId,
				name: name
			}, {
				success: this._editSuccess.bind(this),
				failure: this._editFailure.bind(this, groupId)
			});
		},
		_cancelEdit: function(groupId) {
			this.editEl.outerHtml(this._getItemHtml(sohu.friend.friendMdl.getGroup(groupId)));
			this.editEl = null;
			
			this._resetTabs().active(groupId.toString(), true);
		},
		_editSuccess: function(data) {
			this.editEl.outerHtml(this._getItemHtml(data));
			this.editEl = null;
			this._resetTabs().active(data.id.toString());
		},
		_editFailure: function(groupId, error) {
			this.editEl.outerHtml(this._getItemHtml(sohu.friend.friendMdl.getGroup(groupId)));
			this.editEl = null;
			
			this._resetTabs().active(groupId);
			
			sohu.ctrl.Dialog.alert('错误', error.statusText);
		},
		
		/**
		 * 删除一个组时调用的方法
		 */
		del: function(id) {
			var name = sohu.friend.friendMdl.getGroup(id).name;
			var ctt = 
				'<p>确定要删除分组' + name + '吗？</p>' +
				'<p>提示：删除分组操作，并不会删除本分组的好友。</p>';
			this._delDialog = sohu.ctrl.Dialog.confirm(ctt, {
				yes: this._sureDel.bind(this, id)
			});
		},
		//	确认组时调用的方法
		_sureDel: function(id) {
			this._delDialog.setContent('<p>正在操作中...</p>');
			this._delDialog.setButton();
			var data = {
				id: id
			}
			sohu.friend.friendMdl.delGroup(data, {
				success: this._delSuccess.bind(this),
				failure: this._delFailure.bind(this)
			});
		},
		_delSuccess: function(data) {
			this._lister.refresh();
			this._delDialog.close();
			this._tab.active(0);
		},
		_delFailure: function(error) {
			this._delDialog.setContent('<p>发生错误：' + error.statusText + '</p>');
			this._delDialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
		},
		
		_listBeforeSuccess: function(option) {
			var html = option.responseData.collect(this._getItemHtml.bind(this)).join('');
			return html;
		},
		_listAfterSuccess: function(option) {
			this.listEl.prepend('<li data-tabkey="-1"><a class="fgName all" href="javascript:void(0)">全部好友</a></li>');
			
			this._resetTabs().active(0);
		},
		
		//	重新设置tab
		_resetTabs: function() {
			var tabs = this.listEl.down('li[data-tabkey]');
			if (this._tab) {
				this._tab.resetTabs(tabs, {
					activeSelector: 'a.fgName'
				});
			} else {
				this._tab = new kola.ctrl.DataKeyTab(tabs, {
					activeSelector: 'a.fgName',
					callback: PACK.FriendListWgt.list.bind(PACK.FriendListWgt)
				});
			}
			return this._tab;
		},
		
		//	获得一个好友分组描述项的html片段
		_getItemHtml: function(data) {
			var str = '<li data-tabkey="' + data.id + '" id="group_' + data.id + '"><span class="fgOption"><a href="javascript:void(0)" onclick="sohu.friend.GroupListWgt.edit(' + data.id + ')" class="icon img-edit" title="编辑">编辑</a><a href="javascript:void(0)" onclick="sohu.friend.GroupListWgt.del(' + data.id + ')" class="icon img-del" title="删除">删除</a></span>' +
			'<a class="fgName" href="javascript:void(0)"><span>' + data.name + '</span></a></li>';
			return str;
		},
		
		//	获得一个组编辑框的html片段
		_getEditItemHtml: function() {
			var str = 
				'<li class="edit" style="display:block;">' +
					'<div class="fgName"><input type="text" class="text" />' +
					'<br />' +
					'<span class="button button-main"><span><button type="button">确认</button></span></span>&nbsp;<a href="javascript:void(0);">取消</a></div>' +
				'</li>';
			return str;
		}
	}
	
	/********************************************* FriendWgt *********************************************/
	
	PACK.FriendWgt = {
		
		/**
		 * 初始化方法
		 * @param {object} options 设置项，包括如下属性：
		 *  	groupListEl: 好友分组列表容器对象 
		 *  	groupAddEl: 添加新组对象
		 *  	friendListEl: 好友列表容器对象 
		 *  	friendPageEl: 好友列表页码容器对象 
		 *  	friendCountEl: 好友列表数量容器对象 
		 *  	addMemberEl: 添加好友进组的容器对象
		 *  	addMemberSelEl: 添加好友进组的Selector容器对象
		 *  	searchWordEl: 搜索关键词输入框 
		 *  	searchBtnEl: 搜索关键词按钮
		 */
		init: function(options) {
			
			PACK.FriendListWgt.init({
				listEl: options.friendListEl,
				pageEl: options.friendPageEl,
				countEl: options.friendCountEl,
				addMemberEl: options.addMemberEl,
				addMemberSelEl: options.addMemberSelEl
			});
			PACK.GroupListWgt.init({
				listEl: options.groupListEl,
				addEl: options.groupAddEl,
				activeGroup: PACK.FriendListWgt.list.bind(PACK.FriendListWgt)
			});
			
			var searchWordEl = $(options.searchWordEl);
			var handler = PACK.FriendWgt.search.bind(PACK.FriendWgt, searchWordEl);
			$(options.searchBtnEl).on('click', handler);
			searchWordEl.on('keyenter', handler);
		},
		
		search: function(wordEl) {
			//	判断有没有可搜索值
			wordEl = $(wordEl);
			var word = wordEl.val().trim();
			if (word.length == 0) return;
			wordEl.val('');
			
			//	停止搜索按钮的使用
			sohu.friend.search(word, PACK.FriendListWgt.listSearchResults.bind(PACK.FriendListWgt));
		}
	}
	
	
}, 'sohu.core.*, sohu.friend.*, sohu.ctrl.Lister, sohu.ctrl.Dialog, kola.dom.Form, kola.ctrl.DataKeyTab');