/**
 * @fileoverview  user 显示相关的JS类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom 
 * 				sohu.core.Data
 * 				kola.ctrl.DateSelector,
 * 				kola.tool.Validator,
 * 				sohu.ctrl.AreaSelector	
 * 				sohu.User.*	packages
 */

$register(
	'sohu.user.*',
	function(){
//=====================================User项目注册处理类=========================================		
		sohu.user.Register = {
			//===================注册第一步：填写注册表单部分处理====================
			/**
			 * 初始化注册表单控件
			 */
			initCtrl:function() {
				// 时间控件初始化 地址控件初始化
				var birthYear = $('#birthdayYear'),birthMonth = $('#birthdayMonth'),birthDate = $('#birthdayDate'),
					workProv = $('#workProvinceId'),workCity = $('#workCityId'),workCnty = $('#workCountyId');
				
				kola.ctrl.DateSelector.init(	
					{ele:birthYear,opt: {'': '请选择年'},val:birthYear.attr('data-value')},
					{ele:birthMonth,opt: {'': '请选择月'},val:birthMonth.attr('data-value')},
					{ele:birthDate,opt: {'': '请选择日'},val:birthDate.attr('data-value')});
				sohu.ctrl.AreaSelector.init(	
					{ele: workProv, opt: {'': '选择省份'},val: workProv.attr('data-value')}, 
					{ele: workCity, opt: {'': '选择城市'},val: workCity.attr('data-value')},
					{ele: workCnty, opt: {'': '选择区县'},val: workCnty.attr('data-value')});
					
				 // 验证码控件初始化
				 /*
				  * sohu.ctrl.Vcode.init('#vcode',{'imgId':'#vcodeImg'});
				  */
			},
			
			/**
			 * 验证注册表单
			 */ 
			validForm: function(formEle){			
				if(KTV.Validate(formEle,3)) return true;
				else return false;
			},
			
			//===================注册第二步：第一次添加好友====================
			/**
			 * 注册成功后添加好友事件绑定
			 */
			initEvents: function(){
				$('.friendItem').on('click',this.selectFriend.bindEvent(this));
			},
			
			/**
			 * 选择好友
			 */
			selectFriend: function(e){
				/*
				var el = kola.Event.element(e);
				kola.Event.stop(e);
				if(el.prop('tagName').toLowerCase() != 'input'){
					el = el.up('.friendItem').down('.checkbox');
					if(el.prop('checked') == true){
						el.prop('checked',false);
					}
					else{
						el.prop('checked',true);
					}
				}
				*/
			},
			
			/**
			 * 设置用来存储被选择的好友id的表单字段
			 */
			setFormField: function(){
				$('#addFriendEl').prop('disabled', true).html('提交中');
				$('#friends').prop('value',this._getSlctedFids());
				return true;
			},
			
			/**
			 * 得到所有选择的好友的ID
			 */ 
			_getSlctedFids: function(){
				var slctdFids = [];
				$('input.checkbox').each(
					function(el,i){
						if(el.prop('checked') && el.attr('value'))
							slctdFids.push(el.attr('value'));
					}
				);
				return slctdFids.join(',');
			},
			
			//===================注册第三步：上传头像====================
			/**
			 * 初始化上传组件
			 */
			initUpload: function(){
				sohu.ctrl.UpLoad.FaceUp($('#uploadIconForm'),'sohu.user.Register.showIconEditor');
			},
			
			/**
			 * 显示头像编辑器
			 */
			showIconEditor: function(rsp){
				if(rsp.status == 1)
					$('#iconEditor').html(this._buildIconFlash(rsp.data.large)).show();
				else
					alert('上传头像错误：' + rsp.statusText);
			},
			
			/**
			 * 切换头像来源（上传或者摄像头）
			 */
			switchIconSource: function(isUpload){
				if(isUpload){
					//$('#uploadIconForm').show();
					$('#iconEditor').html('').show();
				}
				else{
					//$('#uploadIconForm').hide();
					$('#iconEditor').html(this._buildIconFlash()).show();
				}
			},
			
			/**
			 * 生成编辑头像的FLASH标签
			 */
			_buildIconFlash: function(iconUrl){
				var str='',vars='postUrl=/a/photo/icon/cameraUpload.do&saveUrl=/a/photo/icon/save.do&';
				if(typeof(iconUrl) =='string') 
					vars += 'type=photo&photoUrl='+iconUrl;
				else 
					vars+= 'type=camera';
				str = '<div class="flashBorder"><embed src="/r/f/AvatarEditor.swf" quality="high" width="395" height="430" allowScriptAccess="always"  type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" flashvars="'+ vars +'"></embed></div>'
				return str;
			}
		};
	},'kola.ctrl.DateSelector,kola.tool.Validator,sohu.ctrl.AreaSelector'
);
			