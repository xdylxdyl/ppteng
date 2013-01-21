/**
 * @fileoverview  sns blog 日志相关的JS类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	sohu.core.* packages
 */

$register(
	'sohu.blog.*',function(){
		
		//===================================日志数据模型========================================
		var blogMdl = new sohu.core.Model({
			actions: {
				save: {
					url:	'/a/app/blog/entry/save.do',		
					method:	'post',						
					format:	'json',
					encode: 'uri'
				},
				del: {
					url:	'/a/app/blog/entry/del.do',
					method:	'post',
					format:	'json'
				}
			},
			url:			''
		});
		
		//===================================日志列表组件========================================
		/**
		 * 日志列表组件
		 */
		sohu.blog.List = {
			/**
			 * 获取初始化列表
			 * @param {function} callback 显示初始日志列表后的回调方法
			 */
			getInitList: function(callback){
				sohu.View.switchView('/app/blog/',{
					afCallback: callback,
					erCallback: this._showError.bind(this)
				});
			},
			
			/**
			 * 显示错误
			 */
			_showError: function(error){
				sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,sohu.blog.TIP.getListFail);
			}
		};
		
		//===================================博文组件========================================
		/**
		 * 日志组件实现
		 */
		sohu.blog.Entry = {
			
			/**
			 * 整个初始化
			 */
			init: function(){
				this._initProperties();
				this._initElements();
				this._initEvents();
				this._initControls();
			},
			
			/**
			 * 预览日志
			 */
			priview: function(e){
				var validRusult = Editor.validate();
				if(!validRusult[0]){
					sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,validRusult[1]);
				} else {
					window.open('http://sns.sohu.com/a/app/blog/preview.do');
				}
			},
			
			/**
			 * 自动开始保存为草稿
			 */
			startAutoSave: function(){
				if(!this.autoSaveInt){
					this.autoSaveInt = window.setInterval(this.saveDraft.bind(this),180000);
				}
			},
			
			/**
			 * 日志保存，有日志ID表示编辑，无表示新建
			 */
			saveEntry: function(){
				// 如果不需要发送设置提示，直接保存日志
				if(!this._needFeedSend()){
					this._save(this.TYPE.entry);
				}
			},
			
			/**
			 * 草稿保存，无ID表示第一次存草稿，有表示
			 */
			saveDraft: function(){
				this._save(this.TYPE.draft);
			},
			
			
			/**
			 * 删除日志,提示确认
			 * @param {number} entryId 要删除的日志的ID
			 * @param {boolean} fromList 标识删除事件来自于列表还是最终页
			 * 		true：列表
			 * 		false：最终页
			 */
			delEntry:function(entryId,fromList){
				this._delConfirm(this.TYPE.entry,entryId,fromList);
			},
			
			/**
			 * 删除草稿,提示确认
			 */
			delDraft:function(entryId){
				this._delConfirm(this.TYPE.draft,entryId,false);
			},
			
			/**
			 * 分享日志
			 */
			share: function(){
				sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,sohu.blog.TIP.noShare);
			},
			
			/**
			 * Entry的属性定义
			 */
			_initProperties: function(){
				// 上一次的日志内容，主要用于保存草稿时的判断是否有修改
				this._preContent = '';
				// 隐私定制时的相关参数
				this._params = {};
				// 设置隐私发送
			},
			
			/**
			 * 初始化标签对象
			 */
			_initElements: function(){
				this._els = {
					id: $('#entryId'),
					title: $('#entryTitle'),
					content: $('#entryContent'),
					fSelector: $('#friendSelector'),
					fSelected : $('#selectedFriend'),
					privacy: $('#privacylevel'),
					feedType: $('#feedType'),
					blogType: $('#blogType')
				};
			},
			
			/**
			 * 初始化事件绑定
			 */
			_initEvents: function(){
				// 新建日志才自动保存为草稿
				if(this._els.id.val() == ''){
					this.startAutoSave();
				}
				//this._els.privacy.on('change',this._setPrivacy.bind(this));
			},
			
			/**
			 * 初始化绑定控件
			 */
			_initControls: function(){
				$call(function(){
					this.friendSelector = sohu.blog.FriendSelector.init(
					this._els.fSelector,
					this._els.fSelected );
				}.bind(this),'sohu.friend.*');
				
				$call(function(){
					this.editor = Editor.init("editorContainer");
				}.bind(this),'sohu.blog.Editor');	
				
				//设置隐私的方法
				$call(function(){
					sohu.privacy.Select(this._els.privacy,{
						model:1,
						type:2,
						name:'blog'
		 			 });
				}.bind(this), 'sohu.privacy.*');
			},
			
			/**
			 * 保存隐私设置数据
			 */
			_savePrivacy: function(data){
				this._params.customlevel = data.cuslevel;
				this._params.blackgroupids = data.bg.join(',');
				this._params.blackuserids = data.bu.join(',');
				this._params.whitegroupids =  data.pg.join(',');
				this._params.whiteuserids = data.pu.join(',');
			},
			
			/**
			 * 是否发送 feed 的设置
			 */
			_needFeedSend: function(){
				// blogType标识是新建“”，编辑正文“0” 还是编辑草稿“1”，只有新建和草稿才提示
				if(parseInt(this._els.blogType.val()) != 0 && parseInt(this._els.feedType.val()) == 0){
					this._showFeedTip();
					return true;
				} else{
					return false;
				}
			},
			
			/**
			 * 显示feed发送设置对话框
			 */
			_showFeedTip: function(){
				new sohu.ctrl.Dialog({
					title : '发布动态提示',
					content : '<div>是否发布日志动态？</div><div class="meta">您已经选择了在发送日志动态时询问，如果想取消，请在左侧应用管理里进行设置。</div>',
					width : 400,
					mask : {color:'#fff',num:0},
					fadeOut : true,
					fadeIn :true,
					buttons :[
						{html:'是',event:'click',func:this._saveFeedSend.bind(this,0),close:true,isRed:true },
						{html:'否',event:'click',func:this._saveFeedSend.bind(this,1),close:true },
						{html:'取消',event:'click',func:function(){},close:true }
					  ]
				}).show();
			},
			
			/**
			 * 保存发送设置，并继续执行保存操作
			 */
			_saveFeedSend: function(isSend){
				this._params.feed = isSend;
				this._save(this.TYPE.entry);
			},
			
			// 编辑器的内容复制到textarea表单里
			_setContent: function(){
				this._els.content = $(sohu.blog.ELEMENT.entryContent);
				Editor.setContent();
			},
			
			/**
			 * 保存方法实现
			 */
			_save: function(type){
				this._setContent();
				if(!this._validLegal(type)) return false;
				var params = kola.dom.Form.val($(sohu.blog.ELEMENT.form));
				// type 标识是日志还是草稿（0：日志，1：草稿）
				this._params.type = (type == sohu.blog.Entry.TYPE.entry ? 0 : 1);
				// 设置隐私
				this._params = Object.extend(this._params,params);
				
				blogMdl.save(this._params,{
					success:this['_save'+type+'Success'].bind(this),
					failure:this['_save'+type+'Failure'].bind(this)
				});
			},
			
			/**
			 * 验证
			 */
			_validLegal: function(type){
				if(type == sohu.blog.Entry.TYPE.entry){
					var validRusult = Editor.validate();
					if(!validRusult[0]){
						sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,validRusult[1]);
						return false;
					} else{
						return true;
					}
				} else if(type == sohu.blog.Entry.TYPE.draft){
					var content = this._els.content.val();
					if(content.trim() == '' || content.trim() == '<br>' || this._preContent == content){
						return false;
					} else {
						return true;
					}
				}
			},
			
			/**
			 * 删除草稿,提示确认
			 */
			_delConfirm:function(type,entryId,fromList){
				sohu.ctrl.Dialog.confirm(sohu.blog.TIP.delConfirm + this.TITLE[type] + '？',{
	               title: '日志提示',
	               yes: this._del.bind(this,type,entryId,fromList),
	               no: function(){}
	            });
			},
			
			/**
			 * 执行删除
			 */
			_del: function(type,entryId,fromList){
				var params = {'id':entryId};
				blogMdl.del(params,{
					success:this['_del' + type + 'Success'].bind(this,entryId,fromList),
					failure:this['_del' + type + 'Failure'].bind(this)
				});
			},
			
			/**
			 * 新建日志成功
			 */
			_saveEntrySuccess: function(data){
				// 清除自动保存草稿轮询
				window.clearInterval(this.autoSaveInt);
				// 设置历史记录为日志最终页
				sohu.View.setHistory(window.location.hash.replace('edit','show'));
				// 显示最终页视图
				$(sohu.blog.ELEMENT.appCanvas).html(data.view);
				// 成功发表成功的提示，黄退效果
				kola.anim.Hide.action($(sohu.blog.ELEMENT.msg),{delay:5000,mode:kola.anim.TYPE.fade});
			},
			
			/**
			 * 新建日志失败
			 */
			_saveEntryFailure: function(){
				sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,sohu.blog.TIP.saveEntryFail);
			},
			
			/**
			 * 删除日志成功
			 */
			_delEntrySuccess: function(entryId,fromList){
				if(fromList == true){
					this._removeElement(sohu.blog.ELEMENT.get(sohu.blog.ELEMENT.eidPrefix + entryId));
				} else{
					this._switch2ListView();
				}
			},
			
			/**
			 * 删除日志失败
			 */
			_delEntryFailure: function(){
				sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,sohu.blog.TIP.delEntryFail);
			},
			
			/**
			 * 保存草稿成功
			 */
			_saveDraftSuccess: function(data){
				$(sohu.blog.ELEMENT.entryId).val(data.id);
				this._preContent = this._els.content.val();
				this._showTopTip(sohu.blog.TIP.autoSaveDraft);
			},
			
			/**
			 * 保存草稿失败
			 */
			_saveDraftFailure: function(){
				sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,sohu.blog.TIP.saveDraftFail);
			},
			
			/**
			 * 删除草稿成功
			 */
			_delDraftSuccess: function(entryId){
				this._removeElement(sohu.blog.ELEMENT.get(sohu.blog.ELEMENT.eidPrefix + entryId));
			},
			
			/**
			 * 删除草稿失败
			 */
			_delDraftFailure: function(){
				sohu.ctrl.Dialog.alert(sohu.blog.TIP.title,sohu.blog.TIP.delDraftFail);
			},
			
			/**
			 * 返回我的日志列表视图
			 */
			_switch2ListView: function(){
				sohu.blog.List.getInitList(this._showDeleleTip.bind(this));
			},
			
			/**
			 * 返回日志列表后的回调方法
			 */
			_showDeleleTip: function(){
				// 显示删除成功的提示
				this._showTopTip();
				return true;
			},
			
			/**
			 * 移除一个元素
			 */
			_removeElement: function(el){
				var el = $(el);
				kola.anim.BlindUp.action(el,{speed:20});
           		kola.anim.FadeOut.action(el,{speed:20});
			},
			
			/**
			 * 显示头部提示信息，比如保存草稿成功
			 */
			_showTopTip: function(msg){
				var msgEl = $(sohu.blog.ELEMENT.msg);
				if(typeof(msg) == 'string')	msgEl.html(msg);
				kola.anim.Hide.action(msgEl,{delay:5000,mode:kola.anim.TYPE.fade});
			}
		};
		
		/**
		 * 日志里的好友选择器
		 * params {element} selectorEl 好友选择器容器
		 * params {element} showEl 选择好友后显示好友的容器
		 */
		
		// FIXME  这里是一个控件形式的类，可以直接放到sohu.ctrl包里
		sohu.blog.FriendSelector = Class.create({
			initialize: function(selectorEl,showEl){
				this._selectorEl = $(selectorEl);
				this._showEl = $(showEl);
				this._selector = this._create();
				window.friendSelector = this._selector;
			},
			
			/**
			 * 创建一个原始的 FriendSelector对象
			 */
			_create: function(){
				var selector = new sohu.friend.Selector({
					type:2,
					element:this._selectorEl,
					isButton:false,
					maxNum: 20,
					tipWidth: 135,
					beforeSelectView: this._select.bind(this)
				});
				
				selector.tip = '请输入好友姓名';
				return selector;
			},
			
			/**
			 * 选择好友的回调方法
			 */
			_select: function(friend){
				var f = friend,
					fStr = 	'<img src="' + f.icon + '" class="avatar-48" />'+
							'<div class="sbInfo">' +
								'<a href="/profile.do?u=' + f.id + '">' + f.name + '</a><br />'+
								'<a onclick="sohu.blog.FriendSelector.removeFriend(this,'+f.id+')" href="javascript:void(0)" class="j-remove"><img class="icon i-ignore" src="http://sns.sohu.com/r/i/space.gif" />移除</a>' +
							'</div>';
				var fTag = kola.Element.create('li',{'class': 'fix'}).html(fStr);
				this._showEl.append(fTag);
				return false;
			}
		});
		
		/**
		 * 移除已选择好友
		 */
		sohu.blog.FriendSelector.removeFriend = function(eTag,fid){
			window.friendSelector.del(fid);
			$(eTag).up('li').remove();
		};
			
		/**
		 * 好友选择器的静态初始方法
		 */
		sohu.blog.FriendSelector.init = function(inputEl,valueEl,showEl){
			return new sohu.blog.FriendSelector(inputEl,valueEl,showEl);
		};
		
		/**
		 * 文章类型：日志和草稿
		 */
		sohu.blog.Entry.TYPE = {
			entry: 'Entry',
			draft: 'Draft'
		};
		
		sohu.blog.Entry.TITLE = {
			Entry: '日志',
			Draft: '草稿'
		};
		
		/**
		 * 所要用到的元素的#+名称的形式
		 */
		sohu.blog.ELEMENT = {
			msg: '#msgTip',
			form : '#form',
			appCanvas: '#app-blog',
			entryId: '#entryId',
			entryContent: '#entryContent',
			list: '#entrylist',
			more: '#moreList',
			eidPrefix: 'blog_entry_',
			
			/**
			 * 通过ID 获取对应的标签
			 */
			get: function(id){
				return $('#'+ id);
			}
		};
		
		sohu.blog.TIP = {
			title: '日志提示',
			getlistFail: '暂时无法读取日志列表',
			delConfirm: '你确认要删除这篇',
			saveDraftFail: '保存草稿失败',
			saveEntryFail: '保存日志失败',
			autoSaveDraft: '该日志于 '+(new Date()).getHours()+':'+ (new Date()).getMinutes() +' 自动保存草稿',
			delEntryFail: '删除日志失败',
			delDraftFail: '删除草稿失败',
			noShare: '分享暂时不可用'
		};
		
	},'sohu.core.*,kola.ctrl.PageTab,kola.dom.Form,sohu.ctrl.Dialog,kola.anim.Blind,kola.anim.Fade,kola.anim.Hide,kola.anim.Discolour');