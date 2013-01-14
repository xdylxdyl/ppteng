 /**
 * @fileoverview  SNS IM 所有类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires kola.anim.Fade,sohu.core.*,sohu.ctrl.Dialog	packages
 */

$register('sohu.im.*',function(){
	
	var PACK = sohu.im;

	/********************************************* ImMdl *********************************************/
	
	PACK.imMdl = {
		
		init: function() {
			//	建立事件机制
			kola.Event.initEventObserver(this);
			
			//	与小纸条建立绑定
			//	cr.evt.Register('webim.response', 'message', this._e_message.bind(this));
			window._im_message = this._e_message.bind(this);
			window._im_presence = this._e_presence.bind(this);
			cr.evt.Register('webim.window', 'minimize', this._e_minimize.bind(this));
			cr.evt.Register('webim.window', 'close', this._e_close.bind(this));
			cr.evt.Register('webim.sync', 'window', this._e_sync.bind(this));
			
			//	获取当前用户的设置信息
			webim.api.get_profile(this._parseImProfile.bind(this));
			
			return this;
		}, 
		
		/**
		 * 获取好友列表（包括好友信息和在线状态）
		 */
		getFriends: function(options) {
			if (this._data) {
				this._getFriends(options);
			} else {
				this._reqFriendData(this._getFriendOnlineData.bind(this, options));
				if (!this._onlineData) {
					this._reqOnlineData(options);
				}
			}
		},
		
		/**
		 * 从小纸条返回的一个好友对象中解析出用户的在线状态
		 */
		_parseOnlineStatus: function(user) {
			var type = user.type;
			if (type == 'available') {
				switch (user.icon) {
					case '0998':
						type = 'busy';
						break;
					case '0997':
						type = 'away';
					default:
						type = 'online';
				}
			} else {
				type = 'offline';
			}
			return type;
		},
		//	请求好友列表信息
		_reqFriendData: function(callback) {
			this._waitFriendData.push(callback);
			
			if (this._friendData) {
				this._dispatchFriendData();
			} else if (!this._isLoadingFriendData) {
				this._isLoadingFriendData = true;
				kola.Ajax.json('/a/friend/relation/stdlist.do', {
					success: this._succFriendData.bind(this, callback)
				});
			}
		},
		//	成功获取到好友列表的处理方法
		_succFriendData: function(callback, json) {
			//	解析好友数据，建立hash
			var D = json.data;
			if (D.user) {
				D._user = {};
				D.user.each(function(user, i) {
					user.online = 'offline';
					D._user['i' + user.id] = user;
					D._user[user.pp] = user;
				});
			}
			if (D.group) {
				D._group = {};
				D.group.each(function(group, i) {
					D._group['i' + group.id] = group;
				});
			}
			this._friendData = D;
			
			this._dispatchFriendData();
		},
		_dispatchFriendData: function() {
			var func;
			while (func = this._waitFriendData.shift()) {
				func(this._friendData);
			}
		},
		//	请求在线状态信息的方法
		_reqOnlineData: function(options) {
			webim.api.get_roster(this._succOnlineData.bind(this, options));
		},
		//	成功获取在线状态信息的方法
		_succOnlineData: function(options, data) {
			//	解析在线数据，建立hash
			var D = {
				online: {},
				busy: [],
				away: [],
				offline: []
			};
			data.friends.each(function(user, i) {
				D[this._parseOnlineStatus(user)][user.id] = true;
			}.bind(this));
			this._onlineData = D;
			
			this._getFriendOnlineData(options);
		},
		//	判断好友和在线状态是否都已经获取的方法
		_getFriendOnlineData: function(options) {
			if (this._friendData && this._onlineData) {
				this._data = this._friendData;
				this._data.online = [];
				this._data.busy = [];
				this._data.away = [];
				this._data.offline = [];
				
				//	分析好友和在线数据，分别建立在线表和离线表
				var types = ['online', 'busy', 'away'];
				this._data.user.each(function(data, onlineData, user) {
					var pp = user.pp,
						isOnline = false;
					for (var i=0, il=types.length; i<il; i++) {
						if (onlineData[types[i]][pp]) {
							user.online = types[i];
							data[types[i]].push(user);
							isOnline = true;
							break;
						}
					}
					if (!isOnline) data.offline.push(user); 
				}.bind(this, this._data, this._onlineData));
				
				this._getFriends(options);
			}
		},
		//	获得好友和在线信息后的回调方法
		_getFriends: function(options) {
			var groupId = options.groupId || null;
			var size = typeof(options.size) == 'number' ? options.size : null;
			
			var users = [];
			if (groupId == null) {
				if (size == null) {
					users = this._data.online.concat(this._data.busy, this._data.away, this._data.offline);
				} else {
					['online', 'busy', 'away', 'offline'].each(function(type) {
						users = users.concat(this._data[type]);
						if (users.length > size) {
							users.length = size;
							throw $break;
						}
					}.bind(this));
				}
			} else {
				var groupStr = null;
				if (groupId != null) {
					groupStr = ',' + this._data._group['i' + groupId].users.join(',') + ',';
				}
				['online', 'busy', 'away', 'offline'].each(function(type) {
					if (size != null && users.length == size) throw $break;
					this._data[type].each(function(user) {
						if (groupStr != null) {
							if (groupStr.indexOf(',' + user.id + ',') != -1) {
								users.push(user);
							}
						} else {
							users.push(user);
						}
						if (size != null) {
							if (users.length > size) {
								users.length = size;
								throw $break;
							}
						}
					}.bind(this));
				}.bind(this));
			}
			
			//	回调
			options.callback(users);
		},
		
		//	获取分组列表
		getGroups: function(callback) {
			this._reqFriendData(function(cb) {
				cb(this._friendData.group);
			}.bind(this, callback));
		},
		
		//	获取好友的SNS Status列表
		getStatus: function(callback) {
			kola.Ajax.json('/a/status/info/friends.do', {
				success: this._succStatus.bind(this, callback)
			});
		},
		_succStatus: function(callback, json) {
			var data = json.data,
				newData = {};
			if (this._data && this._data.user && this._data.user.length) {
				this._data.user.each(function(user) {
					user.status = data[user.pp] || '';
					if (data[user.pp]) {
						newData[user.id] = data[user.pp];
					}
				});
			}
			callback(newData);
		},
		
		//	获取用户的设置信息
		getSetting: function(callback) {
			if (window._im_isReady) {
				webim.api.get_profile(this._getSettingCallback.bind(this, callback));
			} else {
				window._im_ready = function() {
					webim.api.get_profile(this._getSettingCallback.bind(this, callback));
				}
			}
			
			return this;
		},
		_getSettingCallback: function(callback, data) {
			this._parseImProfile(data);
			callback(this.getSettingNow());
		},
		getSettingNow: function() {
			return this._imSetting;
		},
		setSetting: function(setting, options) {
			this._imSetting = Object.extend(this._imSetting, setting);
			
			var data = {
				newmsg_no_risen: !setting.message_alert,
				newmsg_no_sound: !setting.message_sound,
				online_no_risen: !setting.online_alert
			}
			webim.api.set_profile({
				setting: data
			}, function(ok) {
				var cb = options[ok ? 'success' : 'failure'];
				if (typeof(cb) == 'function') {
					cb();
				}
			});
			
			return this;
		},
		
		getOnline: function(callback, pps) {
			//	对数据格式进行判断
			var adminPp = Me.pp();
			switch (typeof(pps)) {
				case 'undefined':
					pps = adminPp;
				case 'string':
					pps = pps.replace(/\s/g, '').split(',');
				case 'object':
					if (pps.length) break;
				default:
					return;
			}
			
			var adminPp = Me.pp();
			if (pps.include(adminPp)) {
				pps.del(adminPp);
				webim.api.get_my_presence(this._succMyPresence.bind(this, callback));
			}
			if (pps.length > 0) {
				webim.api.get_presence(pps, this._presenceSuccess.bind(this, callback));
			}
			
			return this;
		},
		_presenceSuccess: function(callback, data) {
			data.each(function(user) {
				this._userOnline[user.userid] = user.presence;
			}.bind(this));
			callback(data);
		},
		_succMyPresence: function(callback, data) {
			this._userOnline[Me.pp()] = data.presence;
			callback(data);
		},
		setOnline: function(online) {
			webim.api.set_my_presence(online, null, function(){});
			return this;
		},
		getOnlineNow: function(pp) {
			return this._userOnline[pp] || (this._data && this._data._user && this._data._user[pp].online) || null;
		},
		
		//	打开于某用户的聊天窗口 
		talk: function(pp, pos) {
			//	设置状态
			this._session[pp] = 'open';
			
			//	调用小纸条的会话方法
			webim.api.chat(pp, this.getName(pp), 'sohu/sns', null, (pos  && pos.left) || null, (pos  && pos.top) || null);
			var msg;
			if (msg = this._userMessage[pp]) {
				webim.api.chat_msg(msg);
				this._userMessage[pp] = null;
			}
		},
		
		minimize: function(pp) {
			//	设置状态
			this._session[pp] = 'minimize';
			
			//	调用小纸条的会话方法
			webim.api.mini_imWin([pp]);
		},
		
		close: function(pp) {
			//	设置状态
			this._session[pp] = null;
			
			//	调用小纸条的会话方法
			webim.api.close_imWin([pp]);
		},
		
		/**
		 * 获取昵称
		 */
		getName: function(pp) {
			return (this._data && this._data._user && this._data._user[pp] && this._data._user[pp].name) || 
						(this._userData && this._userData[pp]) || 
						pp;
		},
		
		/**
		 * 小纸条的事件
		 */
		_e_message: function(obj, eventName, data) {
			
			//	从所有的新消息中检索出未读的消息，如果当前没有正在进行对话，那就发布相应的事件
			this._userMessage = {};
			var onSessions = [],
				newMessages = data.collect(function(message) {
					if (message.unread && message.type == 'chat') {
						var pp = message.from;
						this._userData[pp] = message.nick;
						var name = this.getName(pp);
						
						//	保存当前用户的消息
						if (!this._userMessage[pp]) {
							this._userMessage[pp] = [];
						}
						this._userMessage[pp].push(message);
						
						if (!this._session[pp]) {
							this._session[pp] = 'minimize';
							onSessions.push({
								pp: pp,
								name: name
							});
						}
						
						return pp;
					}
				}.bind(this)).unique();
			
			//	如果当前不是在对话状态，那就发布正在对话状态
			if (onSessions.unique().length > 0) {
				this.fire('onsession', {
					data: onSessions
				});
			}
			
			if (newMessages.length > 0) {
				this.fire('newmessage', {
					data: newMessages
				});
			}
			
			return 'break';
		},
		_e_minimize: function(obj, name, data) {
			if (data.type != 'chat') return;
			
			var pp = data.uid;
			if (typeof(this._session[pp]) == 'string' && this._session[pp] != 'minimize') {
				//	设置内部的状态
				this._session[pp] = 'minimize';
				
				//	分发事件
				this.fire('minimize', {
					data: {
						pp: pp
					}
				});
			}
		},
		_e_close: function(obj, name, data) {
			if (data.type != 'chat') return;
			
			var pp = data.uid;
			if (typeof(this._session[pp]) == 'string' && this._session[pp] != 'close') {
				//	设置内部的状态
				this._session[pp] = null;
				
				//	分发事件
				this.fire('close', {
					data: {
						pp: pp
					}
				});
			}
		},
		_e_presence: function(obj, name, data) {
			var users = data.collect(function(user) {
				var pp = user.id;
				if (this._data && this._data._user && this._data._user[pp]) {
					var newOnline = user.presence,
						oldOnline = this._data._user[pp].online;
						
					if (newOnline == oldOnline) return;
					
					//	从老位置中移除用户
					var snsUser = this._data._user[pp];
					this._data[oldOnline].del(snsUser);
					
					//	放置到新位置中，并更新状态
					this._data[newOnline].unshift(snsUser);
					snsUser.online = newOnline;
					
					return snsUser;
				}
			}.bind(this));
			
			if (users.length > 0) {
				this.fire('onlinechange', {
					data: users
				});
			}
		},
		_e_sync: function(obj, name, data) {
			var arr = [];
			Object.each(data.w, function(user) {
				if (user && user.s && user.s != 'c') {
					arr.push({
						pp: user.u,
						name: user.n
					});
				}
			});
			if (arr.length > 0) {
				this.fire('onsession', {
					data: arr
				});
			}
		},
		_parseImProfile: function(data) {
			this._imSetting.online_alert = !data.setting.online_no_risen;
			this._imSetting.message_alert = !data.setting.newmsg_no_risen;
			this._imSetting.message_sound = !data.setting.newmsg_no_sound;
		},
		
		//	当前用户的IM信息
		_imSetting: {
			online_alert: true,		//	上线是否弹出提示框
			message_alert: true,	//	是否自动显示消息
			message_sound: true		//	新消息是否播放声音
		},
		//	SNS好友列表原始数据
		_friendData: null,
		//	是否正在请求好友数据
		_isLoadingFriendData: false,
		//	正在等待好友数据的方法列表
		_waitFriendData: [],
		//	在线状态原始数据
		_onlineData: null,
		/**
		 * 收集的用户名称信息，格式如下：
		 * {
		 * 		userpp1: 'nick1',
		 * 		userpp2: 'nick2',
		 * 		...
		 * }
		 */
		_userData: {},
		/**
		 * 收集的用户登陆信息，格式如下：
		 * {
		 * 		userpp1: 'online',
		 * 		userpp2: 'away',
		 * 		...
		 * }
		 */
		_userOnline: {},
		/**
		 * 收集的用户聊天新信息，格式如下：
		 * {
		 * 		userpp1: message1,
		 * 		userpp2: message2,
		 * 		...
		 * }
		 */
		_userMessage: {},
		/**
		 * 好友数据（包含SNS好友信息和在线状态的好友数据）
		 * {
		 * 		user: [
		 * 			{
		 * 				id: userid1,
		 * 				pp: userpp1,
		 * 				...
					},
		 * 			{
		 * 				id: userid2,
		 * 				pp: userpp2,
		 * 				...
					}, 
					...
				],
		 * 		_user: {
		 * 			iuserid1: {user1},
		 * 			iuserid2: {user2},
		 * 			userpp1: {user1},
		 * 			...
		 * 		},
		 * 		group: [{group1}, {group2}, ...],
		 * 		_group: {
		 * 			igroupid1: {group1},
		 * 			igroupid2: {group2},
		 * 			...
		 * 		},
		 * 		online: [
		 * 			user1,
		 * 			user2,
		 * 			...
		 * 		],
		 * 		busy: [
		 * 			user1,
		 * 			user2,
		 * 			...
		 * 		],
		 * 		away: [
		 * 			user1,
		 * 			user2,
		 * 			...
		 * 		],
		 * 		offline: [
		 * 			user1,
		 * 			user2,
		 * 			...
		 * 		]
		 * }
		 */
		_data: null,
		/**
		 * 存储当前所有正在进行的对话，格式如下
		 * {
		 * 		pp1: 'status',		//	当前状态，有minimize, open
		 * 		pp2: 'status',
		 * 		...
		 * }
		 */
		_session: {}
	}

	/********************************************* SessionWgt *********************************************/
	
	PACK.SessionWgt = {
		init: function(mdl) {
			this._mdl = mdl;
			this._ctr = $('#imbarTaskList .taskList');
			
			this._mdl.on('newmessage', this._e_newMessage.bind(this));
			this._mdl.on('onsession', this._e_onSession.bind(this));
			this._mdl.on('minimize', this._e_minimize.bind(this));
			this._mdl.on('close', this._e_close.bind(this));
		},
		
		/**
		 * 创建正在对话的信息
		 * @param {Object} session 一个对话的信息，其属性如下：
		 * 		pp: passport
		 * 		name: 姓名
		 */
		_onSession: function(session) {
			if (!this._items[session.pp]) {
				var el = kola.Element.create('li')
						.html('<strong>' + session.name + '</strong><a href="javascript:void(0);" onclick="sohu.im.SessionWgt.close(\'' + session.pp + '\');kola.Event.stop(event);" class="icon i-close" title="关闭和' + session.name + '的聊天">关闭</a>')
						.on('click', this.talk.bind(this, session.pp));
				this._ctr.append(el);
				this._items[session.pp] = el;
			}
		},
		_minimize: function(pp) {
			var el;
			if (el = this._items[pp]) {
				el.removeClass('on');
			}
			if (this._openNow == pp) this._openNow = null;
		},
		_close: function(pp) {
			var el;
			if (el = this._items[pp]) {
				el.remove();
			}
			this._items[pp] = null;
			if (this._openNow == pp) this._openNow = null;
		},
		_newMessage: function(pp) {
			//	判断是否能够直接显示对话框
			if ((this._openNow == pp) || (sohu.im.imMdl.getSettingNow().message_alert && this._openNow == null)) {
				this.talk(pp);
			} else {
				var el;
				if ((el = this._items[pp]) && this._openNow != pp) {
					$call(function() {
						var wink = el.prop('winkObj');
						if (wink) {
							wink.action();
						} else {
							el.prop('winkObj', kola.anim.Wink.action(el, {
								pClass: 'on'
							}));
						}
						
					}, 'kola.anim.Wink');
				}
			}
		},
		
		_e_onSession: function(event) {
			event.data.each(function(session) {
				this._onSession(session);
			}.bind(this));
		},
		_e_newMessage: function(event) {
			event.data.each(function(pp) {
				this._newMessage(pp);
			}.bind(this));
		},
		_e_minimize: function(event) {
			this._minimize(event.data.pp);
		},
		_e_close: function(event) {
			this._close(event.data.pp);
		},
		
		talk: function(pp) {
			if (this._openNow == pp) {
				this._mdl.talk(pp);
				return this;
			}
			
			if (!this._items[pp]) {
				this._onSession({
					pp: pp,
					name: this._mdl.getName(pp)
				});
			}
			
			var pos = this._items[pp].pos();
			pos.left -= 370;
			this._mdl.talk(pp, pos);
			
			if (this._openNow) {
				this.minimize(this._openNow);
			}
			this._openNow = pp;
			this._items[pp].addClass('on');
			
			return this;
		},
		minimize: function(pp) {
			this._mdl.minimize(pp);
			this._minimize(pp);
			
			return this;
		},
		close: function(pp) {
			this._mdl.close(pp);
			this._close(pp);
			
			return this;
		},
		
		/**
		 * 正在对话中的对象列表，格式如下：
		 * {
		 * 		pp1: element1,
		 * 		pp2: element2,
		 * 		...
		 * }
		 */
		_items: {},
		/**
		 * 当前正在对话的用户的passport
		 */
		_openNow: null
	};

	/********************************************* OnlineWgt *********************************************/
	
	PACK.OnlineWgt = {
		init: function(options) {
			this.mineEl = $(options.mineEl);
			this.setMineEl = $(options.setMineEl);
			
			if (this.mineEl) this.refresh();
			if (this.setMineEl) {
				this.setMineEl.parent().on('click', this._showOnlineSetting.bind(this));
			}
		},
		
		refresh: function() {
			var pps = this._refresh();
			
			if (pps && pps.length > 0) {
				sohu.im.imMdl.getOnline(this._refresh.bind(this), pps);
			}
		},
		_refresh: function() {
			var els = document.getElementsByName('OnlineIcon');
			if (!els || els.length < 1) return;
			
			var pps = $A(els).collect(function(el) {
				return this._getOnline($(el));
			}.bind(this));
			
			return pps;
		},
		
		_getOnline: function(el) {
			if (el.data('online')) return;
			
			var pp = el.data('pp');
			if (!pp) return;
			
			var online = sohu.im.imMdl.getOnlineNow(pp);
			if (online) {
				this._setOnlineStatus(el, online);
			} else {
				return pp;
			}
		},
		
		_setOnlineStatus: function(el, online) {
			var state = sohu.im.STATE[online];
			el.attr('class', state.style).html(state.name).data('online', online).show();
		},
		
		_showOnlineSetting: function() {
			if (!this._hadBindEvent) {
				this._hadBindEvent = true;
				this.setMineEl.down('li').on('click', this._e_setonline.bindEvent(this));
			}
			if (this.setMineEl.css('display') == 'none') {
				this.setMineEl.show();
				this.setMineEl.parent().out('click', this._hide.bind(this));
			} else {
				this.setMineEl.hide();
			}
		},
		_e_setonline: function(e) {
			var el = kola.Event.element(e).upWithMe('[data-key]');
			if (el) {
				this._hide();
				var online = el.data('key');
				var state = sohu.im.STATE[online];
				this.mineEl.attr('class', state.style).html(state.name);
				sohu.im.imMdl.setOnline(online);
			}
			kola.Event.stop(e);
		},
		_hide: function() {
			this.setMineEl.hide();
		}
	}
		
	//=========================IM Bar 类======================================
	/**
	 * IM Bar 生成类，负责整个Bar外框架，
	 * 并且调用 FriendLister 初始化好友列表
	 */
	sohu.im.Bar = Class.create({
		initialize: function(config){
			this._initElements();
			this._initProperties(config);
			this._initEvents();
			this._initList();
			this._initGroup();
			this.collapse();
		},
		
		/**
		 * 展开IM Bar
		 */
		expand: function(){
			var c = this._config, s = sohu.im.STYLE;
			this.imbar.attr('class',s[c.expand]);
			// 第一次展开操作（只针对home页富版的时候）需要再去请求更多的好友数据
			if(this._isFirstExpand){
				this._fullList();
				this._isFirstExpand = false;
			}
			// 显示所有的好友
			this._showAllFriend();
			if(this.scrollbar) this.scrollbar.show();
		},
		
		/**
		 * 收起 IM Bar
		 */
		collapse: function(){
			var c = this._config, s = sohu.im.STYLE;
			// 不能在可视区域显示的好友全部隐藏
			this._hideMoreFriend(this._initCount);
			this.imbar.attr('class',s[c.collapse]);
			if(this.scrollbar) this.scrollbar.hide();
		},
		
		/**
		 * 收缩和展开的触发器
		 */
		toggle: function(){
			if(this._isExpandState){
				this.collapse();
				this._isExpandState = false;
			}
			else {
				this.expand();
				this._isExpandState = true;
			}
		},
		
		/**
		 * 初始化各种element元素对象
		 */
		_initElements: function(){
			this.imbar = $('#imbar');
			this.groupList = $('#imbarGroup');
			this.viewArea = $('#imbarBuddy');
			this.frndList = $('#imbarBuddyList');
			this.chatList = $('#imbarTaskList');
			this.lineList = $('#imbarNotiArea');
			this.toggleBtn = $('#imbarToggle');
			this.manageBtn = $('#imbarManage');
			this.alertList = $('#imbarOnlineAlert');
			this.scrollFrame = $('#imbarScrollbar');
		},
		
		/**
		 * 初始化属性值
		 */
		_initProperties: function(options){
			// 配置信息
			this._config = options;
			// 标识是否是展开状态，默认是收缩状态
			this._isExpandState = false;
			// 是否是第一次进行展开操作
			this._isFirstExpand = true;
			 // 默认能显示的好友数
			this._initCount = this._getInitCount(); 
			// 好友列表
			this._friend = sohu.im.Friend.init(this.frndList,this.alertList);
			// 滚动条对象
			this.scrollbar = null;
			// 视图缓存
			this.cache = {
				simple:'', 	// 简单视图
				full:''		// 富版视图
			};
		},
		
		
		/**
		 * 绑定相应的事件
		 */
		_initEvents: function(){
			// IMbar 两种显示样式切换事件绑定
			this.toggleBtn.on('click',this.toggle.bind(this));
			// 好于分组change事件绑定
			this.groupList.on('change',this._groupList.bind(this));
			// 窗口改变大小事件绑定
			$(window).on('resize',this._setBarHeight.bind(this));
			// 注册上线提示事件
			sohu.im.imMdl.on('onlinechange',this._friend.onlineChange.bind(this._friend));
		},
		
		/**
		 * 初始化分组列表
		 */
		_initGroup: function(){
			sohu.im.Group.init(this.groupList);
		},
		
		/**
		 * 初始化好友列表
		 */
		_initList: function(){
			this._buildList({
				size: this._initCount,
				callback: this._setBarHeight.bind(this)
			});
		},
		
		/**
		 * 全部好友列表
		 */
		_fullList: function(){
			this._buildList({
				callback: this._flCallback.bind(this)
			});
		},
		
		/**
		 * 某个分组的好友列表
		 */
		_groupList: function(){
			if(this.groupList.prop('selectedIndex') != '' ){
				this._buildList({
					groupId:this.groupList.val(),
					callback: function(){}
				});
			} else{
				this._fullList();
			}
		},
		
		/**
		 * 获取全部列表时候的回调方法
		 */
		_flCallback: function(){
			this._setScrollBar();
			this._getStatus();
			this._setBarHeight();
		},
		
		/**
		 * 设置滚动条
		 */
		_setScrollBar: function(){
			$req('sohu.ctrl.ScrollBar',function(){
				this.scrollbar = sohu.ctrl.ScrollBar.initY(this.scrollFrame,this.viewArea,this.frndList);
			}.bind(this));
		},
		/**
		 * 获取好友一句话状态
		 */
		_getStatus: function(){
			this._friend.getStatus();
		},
		
		/**
		 * 好友列表生成
		 */
		_buildList: function(options){
			this._friend.getList(options);
		},
		
		/**
		 * 第一次可显示的好友数
		 */
		_getInitCount: function(){
			return Math.floor(this._getMaxHeight()/sohu.im.CONFIG.iHeight);
		},
		
		/**
		 * 获取当前显示的好友数
		 */
		_getShowCount: function(){
			var lis = this.frndList.down('li');
			return lis ? lis.size() : 0;
		},
		
		/**
		 * 获取页面可见高度
		 */
		_getClientHeight: function(){
			return document.body.clientHeight;
		},
		
		/**
		 * 获取IM Bar的适合浏览器高度
		 */
		_getMaxHeight: function(){
			var actHeight = (this._getClientHeight()-200),
				minHeight = sohu.im.CONFIG.minHeight;
			actHeight = actHeight > minHeight ? actHeight: minHeight;
			return actHeight;
		},
		
		/**
		 * 获取IM bar的全部显示时的实际高度
		 */
		_getActualHeight: function(){
			return this._getShowCount() * sohu.im.CONFIG.iHeight;
		},
		
		/**
		 * 获取Im bar 当前的可见高度
		 */
		_getBarHeight: function(){
			return this.viewArea.height();
		},
		/**
		 * 设置IM Bar 的显示高度
		 */
		_setBarHeight: function(){
			var maxHeight = this._getMaxHeight(),
				maxCount = this._getInitCount();
			
			// 处理当前高度问题
			if(this._getActualHeight() > maxHeight){
				this.viewArea.height(maxHeight);
			}
			// 处理最小高度的问题
			if(this._getBarHeight() < sohu.im.CONFIG.minHeight){
				this.viewArea.height(sohu.im.CONFIG.minHeight);
			}
			
			if(this._isExpandState == false){
				 // 默认能显示的好友数
				if(maxCount > this._initCount) this._showMoreFriend(maxCount);
				else if(maxCount < this._initCount) this._hideMoreFriend(maxCount);

				this._initCount = maxCount;
			} else {
				if(this.scrollbar) this.scrollbar.resize();
			}
		},
		
		/**
		 * 显示所有的好友
		 */
		_showAllFriend: function(){
			var friends = this.frndList.down('li');
			if(friends) friends.show();
		},
		
		/**
		 * 可视区域变大时，显示更多的好友
		 */
		_showMoreFriend: function(maxCount){
			var friends = this.frndList.down('li');
			if(friends){
				friendCount = friends.elements().length;
				for(var i = 0; i < maxCount && i < friendCount; i++ ){
					friends.get(i).show();
				}
			}
		},
		
		/**
		 * 隐藏可视区域显示不了的好友
		 */
		_hideMoreFriend: function(maxCount){
			var friends = this.frndList.down('li');
			if(friends){
				friendCount = friends.elements().length;
				for(var i = maxCount; i < friendCount; i++ ){
					friends.get(i).hide();
				}
			}
		}
	});
	
	/**
	 * IM 初始化静态方法
	 */
	sohu.im.Bar.init = function(){
		if(window.location.href == 'http://sns.sohu.com/home.do'){
			return sohu.im.Bar.initFull();
		} else{
			return sohu.im.Bar.initSimple();
		}
	};
	
	/**
	 * 除home以外的IM bar的静态初始化方法
	 */
	sohu.im.Bar.initSimple = function(){
		return new sohu.im.Bar(sohu.im.CONFIG.simple);
	};
	
	/**
	 * home页IM bar的静态初始化方法
	 */
	sohu.im.Bar.initFull = function(){
		return new sohu.im.Bar(sohu.im.CONFIG.full);
	};
	
	//=========================好友分组处理类======================================
	sohu.im.Group = Class.create({
		initialize: function(element,options){
			this.selector = element;
			this._setOptions(options);
		},
		
		/**
		 * 构建整个分组列表
		 */
		buildList: function(){
			this._getGroups();
		},
		
		/**
		 *  设置参数
		 */
		_setOptions: function(options){
			this._options = Object.extend({
				callback: function(){}
			},options || {});
		},
		
		/**
		 *  获取分组数据
		 */
		_getGroups: function(){
			sohu.im.imMdl.getGroups(this._buildSelector.bind(this));
		},
		
		/**
		 * 构建分组下拉选择框选项
		 */
		_buildSelector: function(group){
			var el = this.selector.elements()[0],
				g = group;
				
			el.options.length = 0;	
			el.options[el.options.length] = new Option('全部好友', '');
			for(var i = 0 ; i< g.length; i++){
				el.options[el.options.length] = new Option(g[i].name, g[i].id);
			}
			this._options.callback()
		}
	});
	
	/**
	 * 构建分组列表的静态方法
	 */
	sohu.im.Group.init = function(element){
		return new sohu.im.Group(element).buildList();
	};
	
	//=========================好友列表类======================================
	/**
	 * 只负责从ImMdl读取好友列表数据
	 * 并生成包含各种状态的好友列表片段
	 */
	sohu.im.Friend = Class.create({
		
		/**
		 * 好友列表类构造函数
		 * param {element} friendEl 好友列表容器对象
		 * param {element} alertEl 好友上线提示tip的容器对象
		 */
		initialize: function(friendEl,alertEl){
			// 好友列表外出容器对象
			this._lister = friendEl;
			
			// 好友的一句话状态是否为空
			this._statusNull = false;
			
			this._newInstance = true;
			// 上线提示
			this._onlineAlert = sohu.im.OnlineAlert.init(alertEl);
			
			// 初始化各种状态对应的列表容器对象
			this._initSubListers();
			
		},
		
		/**
		 * 获取好友列表
		 */
		getList: function(options){
			this._setOptions(options);
			sohu.im.imMdl.getFriends(this._options);
		},
		
		/**
		 * 获取好友的一句话状态
		 */
		getStatus: function(){
			if(this._statusNull){
				sohu.im.imMdl.getStatus(this._backWriteStatus.bind(this));
			}
		},
		
		/**
		 * 好友在线状态变化处理
		 */
		onlineChange: function(e){
			var friends = e.data;
			var f = null,	// 好友数据对象
				it = null,	// 好友标签对象
				of = [],	// 上线的好友列表
				st = sohu.im.STATE;
			for(var i = 0; i < friends.length ; i++){
				f = friends[i];
				// 获取当前ID值的好友
				it  = $('#' + sohu.im.CONFIG.fidPrefix +  f.id);	
				// 判断此好友是否在显示的好友列表中，不在就新建一项
				if(!it)	it = this._buildItemObj(f);
				
				switch(f.online){
					case st.online.id : {
						this.onlineLister.prepend(it);
						of.push(f);
						break;
					}
					case st.away.id : {
						this.awayLister.append(it);
						break;
					}
					case st.busy.id : {
						this.busyLister.append(it);
						break;
					}
					case st.offline.id : {
						this.offlineLister.append(it);
						break;
					}
				}
			}
			this._setListerDisplay();
			this._onlineAlert.show(of);
		},
		
		/**
		 * 设置配置参数，这个主要用来请求好友数据时配置参数
		 */
		_setOptions: function(options){
			// 这个callback上级调用者的 callback，好友列表生成完以后需要调用这个方法
			this._callback = options.callback;
			// 下面的callback是调用imMdl的callback
			this._options = Object.extend(options || {},{	
				callback: this._buildLister.bind(this)
			});
		},
		
		/**
		 * 创建区别各种状态的列表容器对象
		 */
		_initSubListers: function(){
			var s = sohu.im.STYLE,
				el = kola.Element;
			this.onlineLister = el.create('ul',{'class':s.online});
			this.awayLister = el.create('ul',{'class':s.away});
			this.busyLister = el.create('ul',{'class':s.busy});
			this.offlineLister = el.create('ul',{'class':s.offline});
		},
		
		/**
		 * 构建整个好友列表
		 */
		_buildLister: function(fredList){
			var st = sohu.im.STATE,
				fl = fredList,
				listers = {};	// 各种状态的好友列表
			
			// 这里统一采用数据存储列表以提高性能，如果直接用字符串，大字符串的时候性能可能比较差一些
			listers[st.online.id] = [],	// 在线好友列表
			listers[st.away.id] = [],	// 离开好友列表
			listers[st.busy.id] = [],	// 忙碌好友列表
			listers[st.offline.id] = []	// 离线好友列表
			
			if(typeof(fl.length != 0 && fl[0].status) == 'undefined'){
				this._statusNull = true;
			}
			
			for(var i = 0; i < fl.length; i++){
				var f = fl[i];
				listers[f.online].push(this._buildItemStr(f));
			}
			this.onlineLister.html(listers[st.online.id].join(''));
			this.awayLister.html(listers[st.away.id].join(''));
			this.busyLister.html(listers[st.busy.id].join(''));
			this.offlineLister.html(listers[st.offline.id].join(''));
			if(this._newInstance){
				this._lister.html('')
							.append(this.onlineLister)
							.append(this.awayLister)
							.append(this.busyLister)
							.append(this.offlineLister);
				this._newInstance = false;
			}
			this._setListerDisplay();
			// 执行调用者的回调
			this._callback();
		},
		
		/**
		 * 设置各个状态对应的容器的显示与隐藏状态，
		 * 主要是为了解决IE6下，块元素总是有个最小高度
		 */
		_setListerDisplay: function(){
			if(this.onlineLister.down('li')) this.onlineLister.show();
			else this.onlineLister.hide();
			if(this.awayLister.down('li')) this.awayLister.show();
			else this.awayLister.hide();
			if(this.busyLister.down('li')) this.busyLister.show();
			else this.busyLister.hide();
			if(this.offlineLister.down('li')) this.offlineLister.show();
			else this.offlineLister.hide();
		},
		/**
		 * 构建单独的一个好友项,单纯的字符串形式
		 */
		_buildItemStr: function(friend){
			var f = friend,
				status = typeof(f.status) == 'undefined' ? '' : f.status,
				item =	'<li id="' + sohu.im.CONFIG.fidPrefix + f.id +'" onmouseover="this.className=\'on\'" onmouseout="this.className=\'\'">'+
							'<div class="buddyAvatar">'+
								'<a href="/profile.do?u='+ f.id +'" title="'+ f.name +'的主页">'+
									'<img class="avatar-32" src="'+ f.icon +'" alt="'+ f.name +'" />'+
									'<em></em>'+
								'</a>'+
							'</div>'+
							'<div class="buddyInfo">'+
								'<strong>'+
									'<a href="/profile.do?u='+ f.id +'" title="'+ f.name +'的主页">'+ f.name +'</a>'+
								'</strong>'+
								'<span class="actions">'+
									'<a href="javascript:void(0)" onclick="sohu.im.Friend.talk(event,this,\''+f.pp+'\')" class="icon i-chat" title="与他聊天">与他聊天</a>'+
								'</span>'+
								'<span class="status">'+ status +'</span>'+
							'</div>'+
						'</li>';
			return item;
		},
		
		/**
		 * 构建单独的一个好友项,对象形式
		 */
		_buildItemObj: function(friend){
			var item = null,
				itemId = sohu.im.CONFIG.fidPrefix + friend.id,
				itemStr = this._buildItemStr(friend),
				tmpEl = kola.Element.create('div').hide().html(itemStr);
				
			$(document.body).append(tmpEl);
			item = $('#' + itemId);
			tmpEl.remove();
			return item;
		},
		
		/**
		 * 回写好友的一句话状态
		 */
		_backWriteStatus: function(statusList){
			var sl = statusList,
				f = null;
			for(var it in sl){
				var f = $('#' + sohu.im.CONFIG.fidPrefix + it);
				if(f){	
					f.down('span.status').html(sl[it]);
				}
			}
			this._statusNull = false;
		}
	});
	
	/**
	 * 好友列表初始化静态方法
	 */
	sohu.im.Friend.init = function(friendEl,alertEl){
		return new sohu.im.Friend(friendEl,alertEl);
	};
	
	/**
	 * 聊天的静态方法实现，条用
	 */
	sohu.im.Friend.talk = function(e,eSrc,pp){
		sohu.im.SessionWgt.talk(pp);
		$(eSrc).up('li').attr('class','hide');
		kola.Event.stop(e);
	};
	
	//=========================好友上线提示类======================================
	/**
	 * 好友上线提示
	 */
	sohu.im.OnlineAlert = Class.create({
		initialize: function(element){
			this.alertList = $(element);
		},
		
		/**
		 * 显示上线提示
		 */
		show: function(friends){
			for(var i = 0; i < friends.length; i++){
				var alert = this._build(friends[i]);
				this.alertList.prepend(alert);
				this._hide(alert);
			}
		},
		
		/**
		 * 构建上线提示
		 */
		_build: function(friend){
			var f = friend,
				alert = '<div class="close"><a href="javascript:void(0)" onclick="sohu.im.OnlineAlert.remove($(this).up(\'li\'))" class="icon i-close">关闭</a></div>'+
						'<div class="buddyAvatar">'+
							'<a href="/profile.do?u='+ f.id +'" title="'+ f.name +'的主页">' +
								'<img class="avatar-32" src="' + f.icon + '" alt="'+ f.name +'" />'+
							'</a>'+
						'</div>'+
						'<div class="buddyInfo">'+
							'<strong><a href="/profile.do?u='+ f.id +'" title="'+ f.name +'的主页">'+ f.name +'</a></strong>'+
							'<span class="status">上线了' +
								'<a href="javascript:void(0)" onclick="sohu.im.Friend.talk(event,this,\''+f.pp+'\')" class="icon i-chat" title="与他聊天">与他聊天</a>' +
							'</span>'+
						'</div>';
			return kola.Element.create('li').html(alert);
		},
		
		/**
		 * 隐藏上线提示
		 */
		_hide: function(alert){
			kola.anim.Hide.action(alert,{
				delay:5000,
				mode:kola.anim.TYPE.fade,
				callback: this._remove.bind(this,alert)
			});
		},
		
		/**
		 * 删除上线提示
		 */
		_remove: function(alert){
			alert.remove();
		}
	});
	
	/**
	 * 上线提示初始化的静态方法
	 */
	sohu.im.OnlineAlert.init = function(element){
		return new sohu.im.OnlineAlert(element);
	};
	
	/**
	 * 关闭上线提示的静态方法
	 */
	sohu.im.OnlineAlert.remove = function(alert){
		$(alert).remove();
	};

	//=========================IM 静态配置参数======================================		
			
	/**
	 * IM Bar的配置参数，home页面和其他页面不太一样
	 */
	sohu.im.CONFIG = {
		iHeight:42,					// 每一个好友LI标签的高度
		minHeight: 320,				// imbar的最小高度
		fidPrefix: 'im_friend_',		// 好友标签的id前缀
		simple: { 					// 除home页以外的bar配置
			collapse: 'collapse',
			expand: 'full'
		},
		full: {						//home页的bar配置
			collapse: 'simple',
			expand: 'full'
		}
	};
	
	/**
	 * IM 状态类型
	 */
	sohu.im.STATE = {
		online: {
			id:		'online',
			name:	'在线',
			style:	'imStatus im-available'
		},
		away: {
			id:		'away',
			name:	'离开',
			style:	'imStatus im-idle'
		},
		busy: {
			id:		'busy',
			name:	'忙碌',
			style:	'imStatus im-busy'
		},
		offline: {
			id:		'offline',
			name:	'离线',
			style:	'imStatus im-offline'
		},
		invisible: {
			id:		'invisible',
			name:	'隐身',
			style:	'imStatus im-offline'
		}
	};
	
	/**
	 * IM Bar 样式
	 */
	sohu.im.STYLE = {
		// IM Bar 外层框架显示隐藏控制样式
		collapse: 'imbar-tiny',
		simple: 'imbar-thin',
		full: 'imbar-full',
		//IM 好友各种状态的样式
		online: 'buddyList im-available',
		away: 'buddyList im-idle',
		busy: 'buddyList im-busy',
		offline: 'buddyList im-offline'
	};

	/********************************************* ImWgt *********************************************/
	
	PACK.ImWgt = {
		init: function() {
			if (this._hadInit) return;
			this._hadInit = true;
			
			var mdl = PACK.imMdl;
			mdl.init();
			
			PACK.OnlineWgt.init({
				mineEl:		'#online_myicon',
				setMineEl:	'#online_setting'
			});
			PACK.SessionWgt.init(mdl);
			PACK.Bar.init();
		},
		
		initSetting: function() {
			this.init();
			PACK.imMdl.getSetting(this._succGetSetting.bind(this));
		},
		_succGetSetting: function(setting) {
			var html = 
				'<h4>当好友上线时</h4>' +
				'<p class="checkboxes" style="padding:5px 10px 15px;">' +
					'<label for="imOnlineNotify"><input type="checkbox" value="1" id="online_alert" ' + (setting.online_alert ? 'checked="checked"' : '') + ' />弹出提示</label>' +
				'</p>' +
				'<h4>当收到消息时</h4>' +
				'<p class="checkboxes" style="padding:5px 10px 15px;">' +
					'<label for="imOpenDialog"><input type="checkbox" value="1" id="message_alert" ' + (setting.message_alert ? 'checked="checked"' : '') + ' />直接弹出对话框</label><br />' +
					'<label for="imVoicePrompt"><input type="checkbox" value="1" id="message_sound" ' + (setting.message_sound ? 'checked="checked"' : '') + ' />播放声音</label>' +
				'</p>' +
				'<div class="buttons">' +
					'<span class="button button-main"><span><button type="button" title="保存设置">保存设置</button></span></span>' +
				'</div>';
			var button = $('#settingCtrEl').html(html).down('button');
			button.on('click', this._e_save.bind(this, button));
		},
		_e_save: function(button) {
			button.prop('disabled', true);
			var data = {
				online_alert: $('#online_alert').prop('checked'),
				message_alert: $('#message_alert').prop('checked'),
				message_sound: $('#message_sound').prop('checked')
			}
			PACK.imMdl.setSetting(data, {
				success: function() {
					button.prop('disabled', false);
					$('#pageMsgEl').show();
				},
				failure: function() {
					button.prop('disabled', false);
				}
			});
		}
	}
		
},'sohu.core.*, kola.anim.Fade, kola.anim.Hide');