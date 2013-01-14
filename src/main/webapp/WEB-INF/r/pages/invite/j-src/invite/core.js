/**
 * @fileoverview  邀请显示相关的JS类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom 
 * 				sohu.core.Data	packages
 */

$register(
	'sohu.friend.*',
	function(){
		/**
		 * 邀请数据模型 
		 */
		sohu.friend.InviteMdl =  new sohu.core.Model({
			actions: {
				list: {
					url:	'import.do',
					params: ['key'],
					method:	'get',
					format:	'json'
				}
			},
			url:			'/a/invite/friend/'
		});
		
		/**
		 * 邀请处理静态类
		 */
		sohu.friend.Invite = {
			/**
			 * 绑定复制URL的事件
			 */
			bindCopyEvent: function(){
				$('#copyBtn').on('click',function(){
			    	sohu.tool.Clipboard.copy('#inviteUrl');
			   	});
			},
			
			/**
			 *   帮定组装email的事件
			 */
			bindAssembleEvent: function(){
				$('#uname_input').on('blur',this._assembleEmail.bind(this));
			},
			
			/**
			 * 帮定显示隐藏好友列表的事件
			 */
			bindSwitchEvent: function(){
				$('#listSwitch').on('click',this._visibleToggle.bindEvent(this,'#sendList'));
			},
			
			/**
			 * 帮定显示隐藏好友列表的事件
			 */
			bindSlctAllEvent: function(){
				$('#all').on('click',this._checkAll.bindEvent(this,'#friendList', '.contact'));
			},
			
			/**
			 * 获取联系人
			 */
			requestContacts: function(){
				var params = {
					'key' : $('#key').attr('value')
				}
				sohu.friend.InviteMdl.list(params,{
					success: this._showContacts.bind(this),
					failure: this._showRqstError.bind(this)
				});
			},
			
			/**
			 * 添加好友的跳过操作
			 */
			skipAddFriend: function(){
				$('#skipFriend').elements()[0].submit();
			},
			/**
			 * 组装email地址
			 */
			_assembleEmail: function(){
				$('#uname').val( $('#uname_input').val()+'@'+$('#inviteType').prop('options')[$('#inviteType').prop('selectedIndex')].text);
			}, 
			
			/**
			 * 静态方法,由绑定visibleToggle方法的事件源对象来控制element参数的显隐
			 * @param e {Event} 触发事件的事件对象，参数占位
			 * @param element {DOM Element} 需要控制显隐的DOM Element对象
			 * @example
			 * <input type="checkbox" class="checkAll" id="checkAll" onclick="sohu.invite._visibleToggle(event,'container')" />
			 * 或
			 * var checkEl=$('#checkAll');
			 * checkEl.on('click',sohu.invite.checkAll.bindEvent('#container'));
			 */
			 _visibleToggle: function(e, element){
				 var ele = $(element);
				 ele.toggle();
			 },
			 
			/**
			 * ,由绑定checkAll方法的事件源对象来控制container对象中className为checkClass的checkbox选中与否
			 * @param e {Event} 触发事件的事件对象
			 * @param container {String or Element} 需要控制的checkbox的容器
			 * @param checkClass {String or Element} 需要控制的checkbox的className
			 * @example
			 * <input type="checkbox" id="checkAll"  onclick="sohu.invite.checkAll(event,'container','checkBx')" />
			 * 或
			 * var checkEl=$('#checkAll');
			 * checkEl.on('click',sohu.invite.checkAll.bindEvent(checkEl,'#container','.checkBx'));
			 *
			 */
			_checkAll: function(e,container,checkClass){
				 var ifChecked = kola.Event.element(e).prop('checked');			 
				 var boxContainer = $(container);
				 var checkBoxAry = $(checkClass,boxContainer);
				 
				 checkBoxAry.prop('checked',ifChecked);
			 },
			 
			
			
			/**
			 * 显示联系人
			 * param{json} data 后端返回的JSON数据对象
			 */
			_showContacts: function(data){
				// 回填显示用的count
				$('#registerCount1').html(data.registerCount);
				$('#registerCount2').val(data.registerCount);
				$('#friendCount1').html(data.friendCount);
				$('#nofriendCount1').html(data.unfriendCount);
				// 回填表单用的值
				$('#unfriendCount1').val(data.unfriendCount);
				$('#unregisiterString1').val(data.unregisiterString);
				$('#unfriendCount2').val(data.unfriendCount);
				$('#unregisiterString2').val(data.unregisiterString);
				
				if(data.registerCount == 0){
					this.skipAddFriend();
				} else{
					// 显示好友列表
					$('#friendList').html(data.friendlist);
					$('#loading').hide();
					$('#inviteView').show();
					this.bindSlctAllEvent();
				}
			},
			
			/**
			 * 请求联系人
			 */
			_showRqstError: function(error){
				//alert('暂时无法获取联系人：'+error.statusText);
				window.location.href = '/invite/import/dispatch.do?'+
					'type='+ error.data.type + 
					'&name=' + error.data.name + 
					'&status=' + error.status + 
					'&statusText='+error.statusText;
			}
		};
	}
);
			