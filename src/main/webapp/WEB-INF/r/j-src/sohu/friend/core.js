/**
 * 有关Friend的包
 */

$register('sohu.friend.*', function() {
	
	var PACK = sohu.friend;

	/********************************************* friendMdl *********************************************/
	
	var friendMdl = new sohu.core.Model({
		
		actions: {
			
			//	有关好友列表的方法
			stdList: {
				url:		'/a/friend/relation/stdlist.do',
				method: 	'get',
				format: 	'json',
				type:		'custom'
			},
			fullList: {
				url:		'/a/friend/relation/fulllist.do',
				method: 	'get',
				format: 	'json',
				type:		'custom'
			},
			
			//	有关好友关系的方法
			fixInvite: {
				url:		'/a/friend/relation/fixinvite.do',
				params:		['fid'],
				method: 	'get',
				format: 	'json',
				type:		'one'
			},
			invite: {
				url:		'/a/friend/relation/invite.do',
				params:		['fid', 'gids', 'message'],
				method: 	'post',
				format: 	'json',
				type:		'custom'
			},
			del: {
				url:		'/a/friend/relation/del.do',
				params:		['fid'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			
			//	有关好友分组的方法
			addGroup: {
				url:		'/a/friend/group/add.do',
				params:		['name'],
				method: 	'post',
				format: 	'json',
				type:		'one'
			},
			updateGroup: {
				url:		'/a/friend/group/update.do',
				params:		['id', 'name'],
				method: 	'post',
				format: 	'json',
				type:		'one'
			},
			delGroup: {
				url:		'/a/friend/group/del.do',
				params:		['id'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			
			//	有关好友与组关系的方法
			addMember: {
				url:		'/a/friend/member/add.do',
				params:		['gid', 'fids'],
				method: 	'post',
				format: 	'json',
				type:		'one'
			},
			resetMember: {
				url:		'/a/friend/member/reset.do',
				params:		['fid', 'gids'],
				method: 	'post',
				format: 	'json',
				type:		'one'
			},
			delMember: {
				url:		'/a/friend/member/del.do',
				params:		['fid', 'gid'],
				method: 	'post',
				format: 	'json',
				type:		'one'
			}
			
		},
		
		url:				''
	});
	
	Object.extend(friendMdl, {
		
		//	有关好友关系的预处理方法
		_delRepData: function(data) {
			this._buildHash();
			//	从组中删除好友
			this._listData.group.each(function(group) {
				var i = group.users.index(data.id);
				if (i >= -1 && i < group.users.length) {
					group.users.splice(i, 1);
					group.members.splice(i, 1);
				}
			});
			
			//	从好友列表中删除
			var id = 'h_' + data.id;
			var obj = this._listData.user._hash[id];
			this._listData.user.del(obj);
			delete this._listData.user._hash[id];
		},
		
		//	有关组的预处理方法
		_addGroupRepData: function(data) {
			this._buildHash();
			var group = this._listData.group;
			group.push(data);
			group._hash['h_' + data.id] = data;
			data.users = [];
			data.members = [];
		},
		_updateGroupRepData: function(data) {
			this._buildHash();
			Object.extend(this._listData.group._hash['h_' + data.id], data);
		},
		_delGroupRepData: function(data) {
			this._buildHash();
			var id = 'h_' + data.id;
			var obj = this._listData.group._hash[id];
			this._listData.group.del(obj);
			delete this._listData.group._hash[id];
		},
		
		//	有关好友与组关系的预处理方法
		_addMemberRepData: function(data) {
			this._buildHash();
			var group = this._listData.group._hash['h_' + data.gid];
			data.uids.each(function(id) {
				group.users.push(id);
				group.members.push(this._listData.user._hash['h_' + id]);
			}.bind(this));
		},
		_delMemberRepData: function(data) {
			this._buildHash();
			var group = this._listData.group._hash['h_' + data.id];
			var i = group.users.index(data.fid);
			if (i >= -1 && i < group.users.length) {
				group.users.splice(i, 1);
				group.members.splice(i, 1);
			}
		},
		_resetMemberRepData: function(data) {
			this._buildHash();
			var inThis = {};
			data.gids.each(function(now) {
				inThis['h_' + now] = true;
			});
			this._listData.group.each(function(group) {
				if (inThis['h_' + group.id]) {
					//	需要添加到这个组中
					
					//	如果当前不在这个组中，那就添加到这个组
					var userId = data.fid;
					if (!group.users.include(userId)) {
						var user = this._listData.user._hash['h_' + userId];
						group.users.push(userId);
						group.members.push(user);
					}
				} else {
					//	不能在这个组中
					
					//	如果当前在这个组中，那就从中删除
					var userId = data.fid,
						index = group.users.index(userId);
					if (index >= -1 && index < group.users.length) {
						group.users.splice(index, 1);
						group.members.splice(index, 1);
					}
				}
			}.bind(this));
		}
		
	});
	
	Object.extend(friendMdl, {
		
		//	请求分组列表
		groupList: function(data, options) {
			var success = this._groupListSuccess.bind(this, options);
			this._fullList(success, options.failure);
		},
		
		//	请求全信息版的好友列表
		/**
		 * 请求好友列表
		 * @param {object} data 要发送的数据，包含的属性如下：
		 *  	groupid: 分组编号，如果没有表示为获取所有分组
		 *  	start: 开始值
		 *  	size: 一页的数量
		 */
		list: function(data, options) {
			var success = this._listSuccess.bind(this, data, options);
			this._fullList(success, options.failure);
		},
		
		/**
		 * 请求好友列表（标准版或者简版都可以）
		 */
		friendList: function(data, options) {
			if (!this._listData) {
				this.stdList(null, options);
			} else {
				options.success.bind(this, this._listData).timeout(0);
			}
		},
		
		//	获得某个组的信息
		getGroup: function(id) {
			this._buildHash();
			return this._getGroupList()._hash['h_' + id];
		},
		
		//	获得某个用户的信息
		getUser: function(id) {
			this._buildHash();
			return this._listData.user._hash['h_' + id];
		},
		
		//	从缓存中获得组列表
		getGroups: function() {
			return this._listData.group;
		},
		
		//	成功获取分组列表的处理方法
		_groupListSuccess: function(options) {
			options.success(this._getGroupList());
		},
		
		//	成功好友列表的处理方法
		_listSuccess: function(param, options) {
			options.success(this._getList(param));
		},
		
		//	从缓存中获取列表数据
		_getGroupList: function() {
			return this._listData.group;
		},
		
		//	从缓存中获取某种类型，某个区间的列表数据
		_getList: function(param) {
			
			//	首先获取全部列表
			if (param.groupid) {
				//	如果没有建立hash，那就先建立hash
				this._buildHash();
				var list = this._listData.group._hash['h_' + param.groupid].members;
			} else {
				var list = this._listData.user;
			}
			
			//	然后返回指定的区间
			if (!list) list = []
			var data = {
				start: param.start,
				size: param.size,
				count: list.length
			}
			if (param.start < list.length) {
				data.list = list.slice(param.start, Math.min(param.start + param.size, list.length));
			} else {
				data.list = []
			}
			return data;
		},
		
		//	请求全部好友列表信息的方法
		_fullList: function(success, failure) {
			if (!this._listData) {
				this._callbacks.push({success: success, failure: failure});
				if (!this._hadRequestFull) {
					this._hadRequestFull = true;
					this.fullList(null, {
						success: this._fullListSuccess.bind(this),
						failure: this._fullListFailure.bind(this)
					});
				}
			} else {
				success.timeout(0);
			}
		},
		//	获取全部好友信息成功后的处理方法
		_fullListSuccess: function(data) {
			this._listData = data;
			var callback = null;
			while(callback = this._callbacks.shift()) {
				callback.success();
			}
		},
		//	获取全部好友信息失败后的处理方法
		_fullListFailure: function(data) {
			this._listData = data;
			var callback = null;
			while(callback = this._callbacks.shift()) {
				callback.failure();
			}
		},
		//	对数据建立hash
		_buildHash: function() {
			if (!this._listDataHash) {
				this._listData.user._hash = {};
				this._listData.user.each(function(hash, it, i) {
					hash['h_' + it.id] = it;
				}.bind(this, this._listData.user._hash));
				
				this._listData.group._hash = {};
				this._listData.group.each(function(group, groupNow, i) {
					group._hash['h_' + groupNow.id] = groupNow;
					groupNow.members = [];
					groupNow.users.each(function(members, user, it2, i2) {
						members.push(user._hash['h_' + it2]);
					}.bind(this, groupNow.members, this._listData.user));
				}.bind(this, this._listData.group));
				
				this._listDataHash = true;
			}
		},
		
		//	全部列表数据
		_listData: null,
		//	是否已经发送过fulllist请求
		_hadRequestFull: false,
		//	返回处理队列
		_callbacks: [],
		//	对列表数据是否建立了hash
		_listDataHash: false
	});
	PACK.friendMdl = friendMdl;

	/********************************************* FriendAddWgt *********************************************/
	
	PACK.FriendAddWgt = Class.create({
		
		/**
		 * 准备添加一个用户为好友的方法 
		 */
		initialize: function(userId) {
			this._initDialog();
			friendMdl.fixInvite({
				fid: userId
			}, {
				success: this._fixInviteSuccess.bind(this),
				failure: this._fixInviteFailure.bind(this)
			});
		},
		
		/**
		 * 初始化
		 */
		_initDialog: function() {
			this._dialog = new sohu.ctrl.Dialog({
				title: '加为好友',
				content: '<p>正在获取信息</p>',
				width: 420,
				mask: true
			});
			this._dialog.show();
		},
		
		/**
		 * 显示邀请信息
		 */
		_showInvite: function() {
			var selects = '';
			if (this._data.adminGroups && this._data.adminGroups.length) {
				selects = 
					'<dd><select name="gids" class="select"><option>加入到分组</option>' + 
					this._data.adminGroups.collect(function(group) {
						return '<option value="' + group.id + '">' + group.name + '</option>';
					}) +
					'</select></dd>';
			} 
			var html = 
				'<div class="friendDialog-addFriend">' +
				'<p>发送好友申请后，' + this._data.name + '将收到您的请求，他确认后就可以互为好友了。</p>' + 
				'<dl class="fieldset">' + 
					'<dt><img src="' + this._data.icon + '" class="avatar-48" /></dt>' + 
					'<dd><label for="message">附加信息：</label><br />' + 
						'<textarea name="message" class="text" cols="10" rows="5" style="width:200px;height:50px"></textarea></dd>' + 
						selects + 
				'</dl></div>';
			this._dialog.setContent(html);
			this._dialog.setButton([
				{
					html: '确定',
					isRed: true,
					func: this._sureInvite.bind(this)
				}, {
					html: '取消',
					func: this._cancelInvite.bind(this)
				}
			]);
		},
		
		/**
		 * 发送邀请时调用的方法
		 */
		_sureInvite: function() {
			var message = this._dialog.body.down('textarea').val();
			var selectEl = this._dialog.body.down('select');
			var gids = selectEl ? selectEl.val() :'' ;
			var data = {
				fid: this._data.id,
				gids: gids,
				message: message
			}
			friendMdl.invite(data, {
				success: this._inviteSuccess.bind(this),
				failure: this._inviteFailure.bind(this)
			});
			this._dialog.setContent('<p>正在发送邀请...</p>');
			this._dialog.setButton();
		},
		_cancelInvite: function() {
			this._dialog.close();
		},
		
		_inviteSuccess: function(data) {
			this._dialog.setContent('<p>' + this._data.name + '将收到您的请求，他确认后就可以互为好友了。</p>');
			this._dialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
			this._dialog.close.bind(this._dialog).timeout(3);
		},
		
		_inviteFailure: function(error) {
			this._dialog.setTitle('错误');
			this._dialog.setContent('<p>' + error.statusText + '</p>');
			this._dialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
			this._dialog.close.bind(this._dialog).timeout(3);
		},
		
		/**
		 * 成功获得邀请信息的方法
		 */
		_fixInviteSuccess: function(data) {
			this._data = data;
			this._showInvite();
		},
		/**
		 * 未成功获得邀请信息的方法
		 */
		_fixInviteFailure: function(error) {
			this._dialog.setTitle('错误');
			this._dialog.setContent('<p>' + error.statusText + '</p>');
			this._dialog.setButton({
				html: '关闭',
				isRed: true,
				close: true
			});
			this._dialog.close.bind(this._dialog).timeout(3);
		}
	});
	PACK.FriendAddWgt.add = function(id) {
		return new PACK.FriendAddWgt(id);
	}
	// 删除home页 加为好友后的删除事件
    /********************************************* FriendCache *********************************************/

    PACK.CacheFriend = null;

    PACK.CacheFriendGet = function(fun, addMe){
    	addMe = addMe || false;
        if (PACK.CacheFriend != null){
            if(fun)
                fun.apply(this,[PACK.CacheFriend]);
       }else{
            friendMdl.friendList(null,{
                success: function(data){
                    if(addMe){
		        		data.user.push({
		        			icon: 'http://www.sohu.com',
		        			id: sohu.user.id || 0,
		        			name: '自己',
		        			phonic: 'yanyun',
		        			pp: 'yunyan@sohu-inc.com'
		        		});
		        	}
		        	PACK.CacheFriend = data;
                    if (fun)
                        fun.apply(this,[data]);
                }.bind(this),
                failure: function(){}
            });
        }
    };
    /**
     * 模糊查找，异步加载list列表
     */
    PACK.search = function(key, callback){
       PACK.CacheFriendGet(function(data){
           var result = PACK.match(key);
           callback.apply(null,[result]);
       });
    };

    /**
     * 模糊查找
     * @param {Object} u用户json
     * @param {Object} s要匹配的值
     */
    PACK.match = function(key){
        var re = [];
        var _matching = function(u, s){
            var a=s.split('');
            var r=true;
            a.each(function(i){
                if(u.name.indexOf(i)<0 && u.phonic.indexOf(i)<0){
                        return r=false;
                }
            });
            return r;
        }
        if (PACK.CacheFriend != null){
            var data = PACK.CacheFriend;
            if(key.length > 0){
                data.user.each(function(i){
                    if(_matching(i,key)){
                        re.push(i);
                    }
                })
            }
        }
        return re;
    };
    /********************************************* FriendSelector *********************************************/
	PACK.Selector=Class.create({
        /**
         * @constructor  Selector类的构造函数
         **/
        initialize:function(options){
            this.settings={
                element:"",///目标对象，比填项
                type:1,  ///1为单选器，2为多选器
                isButton:true, ///是否显示好友选择器按钮
                isGroup:true,///是否显示好友分组，isButton=true有效
                except:[],///屏蔽好友,数组格式['123','432','45']
                complete:null,///选择好友后，执行函数,为函数格式，如function(friendsList){}
                maxNum:0,///复选器选择用户人数上限，0为无上限
                tipWidth: 320, ///tip提示框的默认宽度
                zindex: 200,
                addMe: false, ///添加我自己
                defaultValue:[]///预选的好友,数组格式['123','432','45']
            };
            Object.extend(this.settings,options);

            this.tip="请输入好友姓名（支持模糊输入和拼音首字母输入）";
            this.errtip="没有找到匹配的好友";
            this.body=$(document.body);
            this.canClose=true;
            this.selectDialog=null;
            this.tips=null;
            this.element=$(this.settings.element);
            this.textEl=this.element.down('input[type=text]');
            this.valueEl=this.element.down('input[type=hidden]');
            this._setup();
            
            return this;
        },
        /*
         * 获取选择器都值，值为好友ID,多个用,隔开
         */
        getValue: function(){
        	/**
        	 * 修改了这部分的实现
        	 */
        	/*
            var str=this.valueEl.val();
            var r=[];
            str.
            str.split(',').each(function(img){
                if(img!='')
                    r.push(img);
            });
            return r.join(',');
            */
        	var v = this.valueEl.val().trim().replace(/,{2,}/g, ',').replace(/^,|,$/g, '').split(',').unique().join(',');
        	this.valueEl.val(v);
        	return v;
        },
        ///多选时，清空已选方法
        clear: function(){
            var e=this.textEl.parent().prevAll();
            if(e)
                e.remove();
            this.valueEl.val('');
            
            this._complete();
        },
        /**
         * 从已选值中删除一个好友
         */
        del: function(id) {
        	id = id.toString();
        	//	判断指定用户是否在已选好友列表中
        	var arr = this.getValue().split(',');
        	if (arr.length == 0 || !arr.include(id)) return;
        	
        	//	从各个位置删除当前的这个好友
        	this.valueEl.val(arr.del(id).join(','));
        	var el;
        	if (this.settings.type == 2 && (el = $('#checkbox_' + id))) {
        		el.remove();
        	}
        	this._complete();
        },
        
        /**
         * 获得所有已选好友的方法
         */
        getSelectedFriends: function() {
        	return this.getValue().split(',').collect(function(id) {
        		var f = this._getFriendById(id);
        		if (f) return f;
        	}.bind(this));
        },
        
        /**
         * 好友选择器的主要方法
         **/
        _setup:function(){
            var _this=this;
            var element=this.element;
            element.on('click',function(e){  ///获取焦点
                var el=kola.Event.element(e);
                if(el.down('li')){
                    this.textEl.show();
                    this.textEl.elements()[0].select();
                }
            }.bind(this));
            //如果有选择器对话框
            if(this.settings.isButton){
                this.selectDialog=new PACK.SelectDialog({
                    element:this.settings.element,
                    defaultValue:this.settings.defaultValue,
                    isGroup:this.settings.isGroup,
                    maxNum:this.settings.maxNum,
                    addMe: this.settings.addMe,
                    zindex:this.settings.zindex,
                    except:this.settings.except,
                    type:this.settings.type,
                    submit:function(a){
                        a.each(function(i){
                            //	_this._selectOn.bindEvent(_this,_this._getFriendById(img))();
                        	_this._selectOn.call(_this,_this._getFriendById(i));
                        });
                        
                        _this._complete();
                    }
                });
            }
            if(this.settings.type==2){
                this.textEl.elements()[0].onblur=function(){
                    this.textEl.hide();
                    this.textEl.val('');
                }.bind(this);
                this.textEl.hide();
            }

            if(this.settings.defaultValue){
                PACK.CacheFriendGet(function(data){
                    this.settings.defaultValue.each(function(i){
                        this._selectOn(this._getFriendById(i));
                    }.bind(this));
                    this._complete();
                }.bind(this));
            }
            _this=this;
            var except = this.settings.except;
            this.tips=new sohu.ctrl.SelectChangeTip({
                element:this.textEl,
                onFocus: function(){
                    _this.tips.content(_this.tip);
                    if(_this.selectDialog){   ///如果选择器对话框已出现，则关闭
                        _this.selectDialog.hide();
                    }
                },
                onChange: function(v){
                    PACK.CacheFriendGet(function(data){
                        if(v.length>0){
                            var flag=false;
                            _this.tips.content('');
                            var match = PACK.match(v);
                            if(match.length > 0){
                                match.each(function(i){
                                	flag=true;
                                	if(except){
                                		if(except.include(i.id.toString())){
                                			flag = false;
                                		}
                                	}
                                	if(flag)
                                    	_this.tips.add(i.name.replace(v,"<em>"+v+"</em>"),i.id);
                                });
                            }
                            if(flag){
                                _this.tips.firstOn();
                            }else{
                                _this.tips.content(_this.errtip);
                            }
                        }else{
                            _this.tips.content(_this.tip);
                        }
                    },_this.settings.addMe);
                },
                onSelect: function(t,v){
                    _this.tips.value="";
                    _this.textEl.val('');
                    _this._selectOn({id:v,name:t});
                    _this._complete();
                },
                posto:_this.settings.element,
                position: [0,-1],
                width: 320
            });

        },
        /**
         *根据用户ID号获取好友
         */
        _getFriendById:function(id){
            var r={};
            PACK.CacheFriend.user.each(function(i){
                if(i.id.toString()==id.toString()){
                    r=i;
                    throw $break;
                }
            });
            return r;
        },
        /**
         *选中操作
         */
        _selectOn:function(){
            var f = arguments[0];
            if (!f) return;
            if(this.settings.type==1){
                this.valueEl.val(f.id);
                
                //	进行显示前的预处理
                if (this._call_beforeSelectView(f)) {
                	this.textEl.val(f.name);
                }
            }else{
                this._tokenAdd(f);
            }
        },
        _tokeGet:function(){
            var r=[];
            var o=this.textEl.parent();
            if(o.prevAll()){
                o.prevAll().each(function(i){
                    r.push(i.attr('id').replace("radio_",'').replace("checkbox_",''));
                });
            }
            return r;
        },
        _tokenAdd:function(f){
            if(f)
                if(!this._tokeGet().include(f.id)){
                    if(!this._checkMax()){
                        return;
                    }
                    this.valueEl.val(this.valueEl.val()+','+ f.id);
                    this.valueEl.val(this.getValue());
                    this.textEl.val('');
                    
                    //	进行显示前的预处理
                    if (!this._call_beforeSelectView(f)) return;
                    
                    this.textEl.parent().before("<li id='checkbox_"+f.id.toString()+"'><a href='javascript:void(0);'><span>"+f.name+"<em class='x'></em></span></a></li>");
                    //this.textEl.elements()[0].blur();
                    this.element.down('li a').un('click',this._tokenHove).on('click',this._tokenHove);
                    this.element.down('li a em').un('click',this._tokenDel.bind(this)).on('click',this._tokenDel.bind(this));
                }
        },
        //	当选择完了一个好友后的，显示前的预处理方法
        _call_beforeSelectView: function(friend) {
        	//	判断是否存在显示前的处理方法，有的话执行显示前的处理方法
            if (typeof(this.settings.beforeSelectView) == 'function') {
            	var v = this.settings.beforeSelectView(this._getFriendById(friend.id) || friend);
            	
            	//	如果结果为false，那就不再进行显示
            	if (typeof(v) == 'boolean' && !v) return false;
            }
            return true;
        },
        _alert: false,
        _checkMax: function(){
            if(this._alert)
                return false;
            
            /**
             * 原来的代码进行了更换，通过判断li的数量来决定选择了多少是不准确的，应该是判断input中值的数量
             */
            /*
            if(this.settings.maxNum > 0){
                var li = this.element.down('.tokenList li');
                if(li.size() >= this.settings.maxNum + 1){
                    sohu.ctrl.Dialog.alert('提示','对不起，您最多只能选择'+this.settings.maxNum+'位好友！',function(){this._alert=false;}.bind(this));
                    this._alert = true;
                    return false;
                }
            }
            */
            if(this.settings.maxNum > 0){
                if(this.getValue().split(',').length > this.settings.maxNum){
                    sohu.ctrl.Dialog.alert('提示','对不起，您最多只能选择'+this.settings.maxNum+'位好友！',function(){this._alert=false;}.bind(this));
                    this._alert = true;
                    return false;
                }
            }
            return true;
        },
        /**
         *删除一好友
         */
        _tokenDel:function(e){
            var li = kola.Event.element(e).parent().parent().parent();
            if(li){
                var id = li.attr('id').replace("radio_",'').replace("checkbox_",'');
                var r = this.getValue().split(',');
                try{
                    li.remove();
                    r.splice(r.index(id));
                    this.valueEl.val(r.join(','));
                }catch(ex){}
                this._complete();
            }
        },

        _tokenHove:function(e){
            var obj=kola.Event.element(e).parent().parent();
            if(obj.attr("class")){
                if(obj.attr("class")=='on'){obj.attr("class",'');return;}
            }
            obj.attr("class",'on');
        },
        
        /**
         * 选择完好友之后调用的方法
         */
        _complete: function() {
        	if (typeof(this.settings.complete) == 'function') {
        		this.settings.complete(this.getSelectedFriends());
        	}
        }
	});

    /********************************************* FriendDialogSelector *********************************************/
	PACK.SelectDialog=Class.create({
        initialize:function(options){
            var settings={
                element:"",
                type:1,
                defaultValue:[],
                except: null,
                isGroup:true,
                addMe: false,
                maxNum:0,
                width:360,
                zindex: 200,
                name:'FSelectDialog',
                submit:null
            };
            Object.extend(settings,options);
            this.settings=settings;
            settings.name+="_"+settings.element;
            settings.element=$(settings.element);
            this.layerBtn="<a class='toggle' href='javascript:void(0);'></a>";
            this._this=null;
            settings.element.attr('class','selector  selector-toggle');
            settings.element.prepend(this.layerBtn);

            if(!document.getElementById(settings.name)){
                var str="<div id='"+settings.name+"' class='popLayer toggleWrap' style='display:none;z-index:"+ settings.zindex +";'><div class='decor'></div>";
                str+="<div class='content'>";
                str+="<div class='head'><h4>请选择发送对象</h4></div>";
                str+="<div class='body'></div>";
				str+="<div class='foot'><input type='hidden' id='values' /><span class='button button-main'><span><button type='button'>确定</button></span></span></div>";
                str+="</div></div>";
                $(document.body).append(str);
                this.popLayer=$("#"+this.settings.name);
                this.popLayer.down(".foot .button").on('click',this._buttonOK.bindEvent(this));
            }
            this.friend=null;
            this.popLayer=$("#"+this.settings.name);
            this._values = this.popLayer.down('#values')
            PACK.CacheFriendGet(function(data){
                this.friend = data;
                settings.element.down(".toggle").on('click',this._toggleHandler.bindEvent(this));
            }.bind(this),this.settings.addMe);
        },

        hide: function(){
            var button=this.settings.element.down('.toggle');
            button.attr('class','toggle');
            this._hide();
        },

        _toggleHandler:function(){
            var button=this.settings.element.down('.toggle');
            if(button.attr('class')=='toggle'){
                button.attr('class','toggle toggle-on');
                this._show();
            }else{
                button.attr('class','toggle');
                this._hide();
                return;
            }
            var str="";
            var tokenget=this._tokenGet();
            var r=[];
            tokenget.each(function(i){
                r.push(i.id);
            }.bind(this));
            this._values.val(r.join(','));
            if(this.settings.isGroup){
                if(this.popLayer.down('.option'))this.popLayer.down('.option').remove();
                str="<div class='option'><select class='select' name=''>";
                str+="<option>全部好友</option>";
                this._getFriendType().each(function(i){
                    str+="<option value='"+i+"'>"+i+"</option>";
                });
                str+="</select></div>";
                this.popLayer.down('.head').append(str);
                this.popLayer.down(".option select").on('change',this._selectChange.bindEvent(this));
            }
            this.popLayer.down('.body').html(this._getFriend(0));
            this.setBind();
        },

        setBind: function(){
            this._popInput = this.popLayer.down('.body input');
            if(!this._popInput)return;
            if(this._popInputClick){
                this._popInput.un('change',this._popInputClick);
            }else{
                this._popInputClick = function(e){
                    var el=kola.Event.element(e);
                    var id = el.attr('id').replace("friend_","");
                    if(el.val()!=null){  ///选择状态
                        this.setValues(1,id);
                    }else{ ///未选中状态
                        this.setValues(2,id);
                    }
                }.bind(this);
            }
            this._popInput.on('change',this._popInputClick)
        },

        setValues: function(type,id){
            var v = this.getValues();
            if(type == 1){ ///加
                if(!v.include(id)){
                    v.push(id);
                }
            }else{ ///减
                if(v.include(id)){
                    v.del(id)
                }
            }
            this._values.val(v.join(','));
        },

        getValues: function(){
            var v=[];
            var r = this._values.val().split(',');
            r.each(function(i){
                if(i!=""){
                    v.push(i);
                }
            });
            return v;
        },

        _selectChange:function(){
            var v=this.popLayer.down(".option select").val();
            this.popLayer.down(".body").html(this._getFriend(v));
            this.setBind();
        },
        _buttonOK:function(){
            var r=this.getValues();
            if(r.length>0){
                this.settings.submit.apply(null,[r]);
            }
            this.settings.element.down('.toggle').attr("class","toggle");
            this._hide();
        },

        _show:function(){
            var button=this.settings.element.down('.toggle');
            this.popLayer.css('left',(button.pos().left-this.settings.width+button.width()+1)+'px');
            this.popLayer.css('top',(button.pos().top+button.height())+'px');
            this.popLayer.show();
        },

        _outHide:function(){
              this.popLayer.out('click',function(){
                  this._hide();
                  this.settings.element.down('.toggle').attr('class','toggle');
              }.bind(this));
        },

        _hide:function(){
            this.popLayer.hide();
        },

        /**
         *获取好友分类
         */
        _getFriendType:function(){
            var r=[];
            this.friend.group.each(function(i){
                    r.push(i.name);
            });
            return r;
        },

        _getFriend:function(type){
            var t=this.settings.type==1?"radios":"checkboxes";
            var s="<ul class='"+t+"'>"
            var o='';
            var checkFriend = function(id){
                var r=false;
                this.getValues().each(function(i){
                    if(i.toString()==id.toString()){
                        r=true;
                    }
                });
                return r;
            }.bind(this);
            var ff=this._getFriendByType(type)
            if(ff.length>0){
                ff.each(function(i){
                	if(!this.settings.except.include(i.id.toString())){
                		if(checkFriend(i.id))
                        	o=" checked=checked"
                    	else
                        	o="";
	                    if(t=='radios')
	                        s+="<li><label for='friend_"+i.id+"'><input type='radio' value='"+i.id+"' id='friend_"+i.id+"' name='radio'"+o+" />"+i.name+"</label></li>";
	                    else
	                        s+="<li><label for='friend_"+i.id+"'><input type='checkbox' value='"+i.id+"' id='friend_"+i.id+"' name='checkbox'"+o+" />"+i.name+"</label></li>";
                	}
                }.bind(this));
            }else
                s+="无好友。";
            s+="</ul>"
            return s
        },

        /**
         *根据好友分类获取好友
         */
        _getFriendByType:function(type){
            type=type==null || type==0?"全部好友":type;
            var r=[];
            if(type=="全部好友"){
                return this.friend.user;
            }else{
                this.friend.group.each(function(i){
                    if(i.name == type){
                        i.users.each(function(ii){
                            var t=this._getFriendById(ii);
                            if(t)
                                r.push(t);
                        }.bind(this));
                    }
                }.bind(this));
                return r;
            }
        },
        _getFriendById: function(id){
          var r=null;
          this.friend.user.each(function(i){
              if(i.id.toString()==id.toString()){
                  r = i;
              }
          });
          return r;
        },
        /**
         *获取已选择好友，返回好友数组
         */
        _tokenGet:function(){
            var r=[];
            var o=this.settings.element.down('input').parent();
            if(o.prevAll()){
                o.prevAll().each(function(i){
                    r.push({id:parseInt(i.attr('id').replace("radio_",'').replace("checkbox_",'')),name:i.text()});
                });
            }
            return r;
        }
    });
}, 'sohu.core.*, sohu.ctrl.Dialog, sohu.ctrl.TipSuggest');