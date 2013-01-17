 /**
 * @fileoverview  profile个人档案页面显示相关的JS类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core.* ,kola.dom.Form,kola.ctrl.DateSelector,kola.anim.Wink,kola.anim.Fade,
 * 				sohu.core.*,sohu.ctrl.AreaSelector,sohu.ctrl.SchoolSelector,sohu.ctrl.IndustrySelector,
 * 				sohu.ctrl.JobSelector,sohu.ctrl.CompanySelector,sohu.ctrl.Dialog,sohu.tool.ChangeCheck
 *				packages
 */

$register(
	'sohu.profile.*',
	function(){
//=====================================profile 处理基类=========================================		
		sohu.profile.Base = Class.create({
			/**
			 * @constructor 构建一个profile 处理基类
			 * @param {string} type 当前所处理的是那一种信息 
			 * @param {string} u 当前用户标识 
			 * @param {string or dom element object} inter 当前编辑操作触发接口
			 * @param {string or dom element object} sectionBody 表单或者包含表单字段的容器（必填项）
			 * @param {ref} 更新对象
			 */
			initialize: function(category,u,inter,section){
				this.category = category;
				this.user = u;
				this.inter = $(inter);
				this.section = $(section);
				this.sectionBody = this.section.down('div.sectionBody');
				this.model = this._createModel();
				this.scroller = new kola.anim.Scroller();
			},
			
			/**
			 * 初始化接口标签的显示和功能
			 */
			manage: function(){
				// 如果点击的时候是编辑，设置为取消，并请求相应的
				if(this.inter.html() == '编辑'){
					this.inter.html('取消');
					this._edit();
				} else {
					this.inter.html('编辑');
					this._cancel();
				}
			},
			/**
			 * 未保存提示绑定
			 */
			bindUnSaveTip: function(){
				sohu.profile.bindUnSaveTip(this.section,this._update.bind(this));
			},
			/**
			 * 自动获取公用的保存和取消按钮并绑定其单击事件的处理方法，
			 */
			_initCommEvents: function(){
				this.section.down('button.j-save').on('click',this._update.bind(this));
				this.section.down('a.j-cancel').on('click',this.manage.bind(this));
			},
			
			/**
			 * 编辑基本信息
			 * param {string or dom element object} sectionBody 显示编辑表单的容器面板
			 */
			_edit: function(){
				this._scroll2Top();
				var cache = this._getCache(sohu.profile.cache.type.edit);
	
				this._showEditContent();
				if(cache && cache != null){
					if(this.section.down('form') == null){ // sohu.profile.category != sohu.profile.CATEGORY.all
						this._showEditView(cache);
					}
				} else {
					this._showLoading();
					this._reqEditView();
				}
			},
			/**
			 * 取消编辑
			 */
			_cancel: function(){
				// 整体编辑状态时只做隐藏
				if(sohu.profile.category == sohu.profile.CATEGORY.all){
					this._hideEditContent();
				} else {
					this._recoverView();
				}
			},
			/**
			 * 发送表单数据，更新基本信息
			 */
			_update: function(){
				this._showLoading();
				this._format();
				var params = kola.dom.Form.objFields(this.section);
				params['u'] = this.user;
				this.model.update(params,
					{	success:this._showLookView.bind(this),
						failure:function(){
							this._hideLoading();
							this._showErrorMsg('暂时无法保存您的信息，请重新点击保存！');
							}.bind(this)}
				);
			},
			
			/**
			 * 创建基本信息的数据处理模型
			 */
			_createModel: function(){
				return new sohu.core.Model({
					actions: {
						edit: {
							url:	'.do',		
							method:	'get',						
							format:	'text'	
						},
						show: {
							url:	'/show.do',
							method:	'get',
							format:	'text'
						},
						update: {
							url:	'.do',
							method:	'post',
							format:	'text'
						}
					},
					url:			'/a/profile/'+ this.category.toLowerCase()
				});
			},
			
			/**
			 * 从服务器端获取编辑视图的HTML视图
			 */
			_reqEditView: function(){
				this.model.edit(
					{u:this.user},{
						success:this._showEditView.bind(this),
						failure:this._showEditError.bind(this)}
				);
			},
			
			/**
			 * 展示编辑HTML视图
			 */
			_showEditView: function(html){
				// 隐藏Loading图标
				this._hideLoading();
				// 备份当前显示的HMTL片段
				this._setCache(sohu.profile.cache.type.show,this.sectionBody.html());
				this._setCache(sohu.profile.cache.type.edit,html);
				// 显示当前操作需要显示的HTML片段
				this.sectionBody.html(html).show();
				// 显示完成绑定公用的事件
				this._initCommEvents();
				// 绑定完成私有的事件
				this._initPrivEvents();
				// 执行初始化控件的方法
				this.initCtrl(false,this.section);
				// 绑定未保存提示
				this.bindUnSaveTip();
			},
			/**
			 * 获取编辑片段错误处理
			 */
			_showEditError: function(){
				this.inter.html('编辑');
				this._hideLoading();
				this._showErrorMsg('暂时无法获取编辑信息，请重试！');
			},
			/**
			 * 展示显示HTML视图
			 */
			_showLookView: function(html){
				this._hideLoading();
				// 清空缓存：设置当前编辑成功项的缓存为空
				this._setCache(sohu.profile.cache.type.show,html);
				this._setCache(sohu.profile.cache.type.edit,null);
				// 整体编辑状态时的处理方式
				if(sohu.profile.category == sohu.profile.CATEGORY.all){
					if(this.category != sohu.profile.CATEGORY.contact){
						sohu.profile.edit(this.section.next());
					} else {
						this._hideEditContent();
					}
					return;
				}
				// 显示当前操作需要显示的HTML片段
				this.sectionBody.html(html);
				// 更新接口显示
				this.inter.html('编辑');
				// 回填信息
				this.backWrite();
				// 去掉编辑样式
				this._hideEditContent();
			},
			
			/**
			 * 恢复前一状态显示的HTML视图
			 */
			_recoverView: function(){
				// 恢复之前对当前显示的HTML片段保存起来
				var cache = this._getCache(sohu.profile.cache.type.show);
				this.sectionBody.html(cache);
				this._hideEditContent();
			},
			
			/**
			 * 设置缓存当前显示的HTML视图
			 */
			_setCache: function(type,cache){
				 sohu.profile.cache[type][this.category] = cache;
			},
			
			/**
			 * 获取当前需要展示的缓存
			 */
			_getCache: function(type){
				return sohu.profile.cache[type][this.category];
			},
			/**
			 * 滚动当前编辑项到顶部
			 */
			_scroll2Top: function(){
				
				var navBarHeight = parseInt($('#navbar').prop('offsetHeight')),
					sectionTop = parseInt(this.section.prop('offsetTop')),
					scrollHeight = sectionTop-navBarHeight;
				
				//alert(scrollHeight);
				this.scroller.scrollTo(scrollHeight);
				
			},
			/**
			 * 显示 Loading 图标
			 */
			_showLoading:function(){
				this.section.addClass('section-load load-page');
			},
			
			/**
			 * 隐藏 Loading 图标
			 */
			_hideLoading: function(){
				this.section.removeClass('section-load').removeClass('load-page');
			},
			
			/**
			 * 显示编辑状态下的标题栏
			 */
			_showEditContent: function(){
				this.section.addClass('section-edit');
				//this.section.elements()[0].scrollIntoView();
			},
			
			/**
			 * 显示展示状态下的标题栏
			 */
			_hideEditContent: function(){
				this.section.removeClass('section-edit');
				sohu.profile.clearUnSaveTip();
			},
			
			/**
			 * 显示错误提示
			 */
			_showErrorMsg: function(msg){
				this._showMessage(msg,'msg-failed');
			},
			
			/**
			 * 显示成功提示
			 */
			_showSuccdMsg: function(msg){
				this._showMessage(msg,'msg-succeed');
			},
			
			/**
			 * 显示消息
			 */
			_showMessage: function(msg,face){
				var msgBar = $('#profileInfoMsg').addClass(face).html(msg).show('block');
				kola.anim.Discolour.action(msgBar,{to:'#FFFEF5',speed:100});
			}
		});
		
//=====================================profile 基本信息处理类=========================================	
		
		sohu.profile.Basic = Class.create(sohu.profile.Base.prototype,{
			/**
			 * 初始化私有事件
			 */
			_initPrivEvents: function(){
				//$('#sameAsHometown').on('click',this.autoSetLiveLoc.bindEvent(this));
			},
			
			/**
			 * 初始化基本信息里的控件
			 */
			initCtrl: function(){
				var birthYear = $('#birthdayYear'),birthMonth = $('#birthdayMonth'),birthDate = $('#birthdayDate'),
					workProv = $('#workProvinceId'),workCity = $('#workCityId'),workCnty = $('#workCountyId'),
					birthProv = $('#birthProvinceId'),birthCity = $('#birthCityId'),birthCnty = $('#birthCountyId');
				
				kola.ctrl.DateSelector.init(	
					{ele:birthYear,val:birthYear.attr('data-value')},
					{ele:birthMonth,val:birthMonth.attr('data-value')},
					{ele:birthDate,val:birthDate.attr('data-value')});
				sohu.ctrl.AreaSelector.init(	
					{ele: workProv, val: workProv.attr('data-value')}, 
					{ele: workCity, val: workCity.attr('data-value')},
					{ele: workCnty, val: workCnty.attr('data-value')});
				sohu.ctrl.AreaSelector.init(	
					{ele: birthProv, val: birthProv.attr('data-value')}, 
					{ele: birthCity, val: birthCity.attr('data-value')},
					{ele: birthCnty, val: birthCnty.attr('data-value')});
				//绑定工作地同出生地的事件
				$('#setLiveLocation').on('click',
					function(e,worProv,workCity,workCnty,birthProv,birthCity,birthCnty){
						if(kola.Event.element(e).prop('checked')){
							sohu.ctrl.AreaSelector.init(
								{ele: workProv, val: birthProv.val()}, 
								{ele: workCity, val: birthCity.val()},
								{ele: workCnty, val: birthCnty.val()});
						} else {
							sohu.ctrl.AreaSelector.init(
								{ele: workProv, val: workProv.attr('data-value')}, 
								{ele: workCity, val: workCity.attr('data-value')},
								{ele: workCnty, val: workCnty.attr('data-value')});
						}
					}.bindEvent(this,workProv,workCity,workCnty,birthProv,birthCity,birthCnty));
				
			},
			
			/**
			 * 回填信息
			 */
			backWrite: function(){},
			
			/**
			 * 验证输入的合法性
			 */
			_validate: function(){},
			
			/**
			 * 格式化相关信息，主要是动态添加的表单项的处理
			 * 基本信息暂无动态添加项
			 */
			_format: function(){}
			/*
			autoSetLiveLoc: function(e){
				if(kola.Event.element(e).prop('checked'))
					
			}
			*/
		});
		
		/**
		 * 静态方法，获取一个Basic类的实例
		 */
		sohu.profile.Basic.init = function(category,user,inter,section){
			// 查看是否有已存在的实例，有直接返回，无就创建后再返回
			if(!this.instance)  
				this.instance = new sohu.profile.Basic(category,user,inter,section);
			return this.instance;
		};
		
//=====================================profile 联系信息处理类=========================================	
		
		sohu.profile.Contact = Class.create(sohu.profile.Base.prototype,{
			/**
			 * 初始化私有事件
			 */
			_initPrivEvents: function(){},
			/**
			 * 初始化联系方式里的控件
			 */
			initCtrl: function(){
				var homeProv = $('#homeProvinceId'),homeCity = $('#homeCityId'),homeCnty = $('#homeCountyId');
				sohu.ctrl.AreaSelector.init(
					{ele: homeProv, val: homeProv.attr('data-value')}, 
					{ele: homeCity, val: homeCity.attr('data-value')},
					{ele: homeCnty, val: homeCnty.attr('data-value')});
			},
			
			/**
			 * 回填信息
			 */
			backWrite: function(){},
			
			/**
			 * 验证输入的合法性
			 */
			_validate: function(){},
			
			
			/**
			 * 格式化相关信息，主要是动态添加的表单项的处理
			 * 这里对动态添加的IM表单项的name属性的重置处理
			 */
			_format: function(){
				var ims = $('#contact_im_container').children();
				ims.each(function(it,i){
					var childs = it.children();
					childs.get(1).attr('name','imList['+ i +'].imAccount');
					childs.get(2).attr('name','imList['+ i +'].imType');
					childs.get(7).attr('name','imList['+ i +'].id');
					childs.get(8).attr('name','imList['+ i +'].userId');
				});
			}
		});
		
		/**
		 * 静态方法：动态添加IM信息
		 */
		sohu.profile.Contact.addIM = function(eventTarget){
			var target = $(eventTarget.parentNode);
			if(sohu.profile.checkCount('即使通讯账号',target.attr('class'))){
				var newCell = sohu.profile.newFormCell(target,target,'after',true);
				kola.anim.Discolour.action(newCell,{to: "#fffdf0",speed: 100});
				//kola.anim.Wink.action(newCell,{pClass:'highLight',speed:0.5,time:2});
			}
		},
		
		/**
		 * 静态方法：动态删除IM信息
		 */
		sohu.profile.Contact.delIM = function(eventTarget){
			var delNode = $(eventTarget.parentNode);
			sohu.profile.del('即时通讯账号',delNode,delNode.attr('class'));
		},
		
		/**
		 * 静态方法，获取一个Contact类的实例
		 */
		sohu.profile.Contact.init = function(category,user,inter,section){
			// 查看是否有已存在的实例，有直接返回，无就创建后再返回
			if(!this.instance)  
				this.instance = new sohu.profile.Contact(category,user,inter,section);
			return this.instance;
		};
		
//=====================================profile 个人信息处理类=========================================	
		
		sohu.profile.Personal = Class.create(sohu.profile.Base.prototype,{
			/**
			 * 初始化私有事件
			 */
			_initPrivEvents: function(){},
			/**
			 * 初始化联系方式里的控件
			 */
			initCtrl: function(){},
			
			/**
			 * 回填信息
			 */
			backWrite: function(){},
			
			/**
			 * 验证输入的合法性
			 */
			_validate: function(){},
			
			/**
			 * 格式化相关信息，主要是动态添加的表单项的处理
			 * 个人信息暂无动态添加项
			 */
			_format: function(){}
		});
		
		/**
		 * 静态方法，获取一个Contact类的实例
		 */
		sohu.profile.Personal.init = function(category,user,inter,section){
			// 查看是否有已存在的实例，有直接返回，无就创建后再返回
			if(!this.instance)  
				this.instance = new sohu.profile.Personal(category,user,inter,section);
			return this.instance;
		};
		
//=====================================profile 教育信息处理类=========================================	
		
		sohu.profile.Education = Class.create(sohu.profile.Base.prototype,{
			/**
			 * 初始化私有事件
			 */
			_initPrivEvents: function(){},
			/**
			 * 初始化联系方式里的控件
			 */
			initCtrl: function(isNew,scope){	// scope 使用$的范围限定符
				
				if(typeof(scope) == 'undefined') scope = '';
				// 所有类型的学校的相关信息对象
				var allSchools={
					university:{
						infos: $('.j-edu-university-school',scope),
						depts: $('.j-edu-university-department',scope),
						dates: $('.j-edu-university-date',scope)
					},
					senior:{
						infos: $('.j-edu-senior-school',scope),
						dates: $('.j-edu-senior-date',scope)
					},
					junior:{
						infos: $('.j-edu-junior-school',scope),
						dates: $('.j-edu-junior-date',scope)
					},
					grade:{
						infos: $('.j-edu-grade-school',scope),
						dates: $('.j-edu-grade-date',scope)
					}
				};
				
				// 循环初始化所有控件和相应的事件绑定
				for(schType in allSchools){
					var schools = allSchools[schType],
						schInfos = schools.infos,
						dates = schools.dates,
						depts = null;
					if(	schools.depts )
						var depts = schools.depts;
					
					// 学校控件初始化及事件绑定
					if(schInfos){
						for(var i = 0 ; i< schInfos.elements().length ; i++){
							var config = sohu.profile.Education.TYPE[schType],
								school = schInfos.get(i),
								school_id = $('.j-edu-schoolId',school),
								school_name = $('.j-edu-schoolName',school),
								status = $('.j-edu-status',school),
								school_toggle = $('.j-edu-toggle',school),
								date_childs = dates.get(i).children();
							
							if(depts) 
								var dept = depts.get(i).children().get(0);
							// 初始化学校选择器
							sohu.ctrl.SchoolSelector.init(
								config.sType,
								school_name,
								school_id,
								school_toggle,{
									deptEl:dept,
									aFilter:config.aFilter,
									callBack:function(status){
										status.val('1');
									}.bind(this,status)
								}
							);
							
							// 给学校选择器输入框绑定onblur事件，处理是否是用户在新建学校
							school_name.on('blur',function(school_name,status){
								if(school_name.val() != school_name.prop('data-selected')){
									status.val('0');
								}
							}.bind(this,school_name,status));
			
							kola.ctrl.DateSelector.init(	
								{ele:date_childs.get(0),val:date_childs.get(0).attr('data-value')},
								{ele:date_childs.get(1),val:date_childs.get(1).attr('data-value')});
							kola.ctrl.DateSelector.init(	
								{ele:date_childs.get(3),val:date_childs.get(3).attr('data-value')},
								{ele:date_childs.get(4),val:date_childs.get(4).attr('data-value')});
							
							// 绑定现在在这间学校的事件
							date_childs.get(5).children().get(0).on('click',function(e,today,endYear,endMonth){
								if(kola.Event.element(e).prop('checked')){
									endYear.hide();
									endMonth.hide();
									today.show();
								} else {
									today.hide();
									endYear.show();
									endMonth.show();
								}
							}.bindEvent(this,date_childs.get(2),date_childs.get(3),date_childs.get(4)));
							// 表示是新增加的，那把至今中“今”隐藏
							if(isNew){
								date_childs.get(2).hide();
								school_id.val('');
								school_name.val('');
								status.val(0);
							}
						}
					}
				}
			},
			
			/**
			 * 回填信息
			 */
			backWrite: function(){},
			
			/**
			 * 验证输入的合法性
			 */
			_validate: function(){},
			
			/**
			 * 格式化相关信息，主要是动态添加的表单项的处理
			 * 这里对动态添加的学校表单项的name属性的重置处理
			 */
			_format: function(){
				// 所有类型的学校的相关信息对象
				var allSchools={
					university:{
						types: $('.j-edu-university-schoolType',this.section),
						infos: $('.j-edu-university-school',this.section),
						depts: $('.j-edu-university-department',this.section),
						dates: $('.j-edu-university-date',this.section)
					},
					senior:{
						types: $('.j-edu-senior-schoolType',this.section),
						infos: $('.j-edu-senior-school',this.section),
						dates: $('.j-edu-senior-date',this.section)
					},
					junior:{
						types: $('.j-edu-junior-schoolType',this.section),
						infos: $('.j-edu-junior-school',this.section),
						dates: $('.j-edu-junior-date',this.section)
					},
					grade:{
						types: $('.j-edu-grade-schoolType',this.section),
						infos: $('.j-edu-grade-school',this.section),
						dates: $('.j-edu-grade-date',this.section)
					}
				};
				
				// 循环初始化所有控件和相应的事件绑定
				for(schType in allSchools){
					var schools = allSchools[schType],
						types = schools.types,
						schInfos = schools.infos,
						dates = schools.dates,
						depts = null;
					if(	schools.depts )
						var depts = schools.depts;
					
					// 学校控件初始化及事件绑定
					if(schInfos){
						for(var i = 0 ; i< schInfos.elements().length ; i++){
							var type = types.get(i),
								school = schInfos.get(i),
								school_id = $('.j-edu-schoolId',school),
								school_name = $('.j-edu-schoolName',school),
								status = $('.j-edu-status',school),
								date_childs = dates.get(i).children(),
								dept = null,
								degree = null;
							
							if(depts){
								dept = depts.get(i).children().get(0),
								degree = $('.j-edu-degree',school);
							}
							
							type.attr('name',schType+'List[' + i + '].schoolType');
							school_id.attr('name',schType+'List[' + i + '].schoolId');
							school_name.attr('name',schType+'List[' + i + '].schoolName');
							status.attr('name',schType+'List[' + i + '].status');
							if(dept){
								degree.attr('name',schType+'List[' + i + '].degree');
								dept.attr('name',schType+'List[' + i + '].departmentId');
							}
							date_childs.get(0).attr('name',schType+'List[' + i + '].startYear');
							date_childs.get(1).attr('name',schType+'List[' + i + '].startMonth');
							date_childs.get(3).attr('name',schType+'List[' + i + '].endYear');
							date_childs.get(4).attr('name',schType+'List[' + i + '].endMonth');
							date_childs.get(5).children().get(0).attr('name',schType+'List[' + i + '].isCurrented');
						}
					}
				}
			}
		});
		
		/**
		 * 学校类型对应的学校弹出层控件的相应配置参数
		 */
		sohu.profile.Education.TYPE = {
			university: {sType:6,aFilter:1},
			senior: {sType:4,aFilter:2},
			junior: {sType:4,aFilter:2},
			grade: {sType:1,aFilter:2}
		};
		
		/**
		 * 静态方法，获取一个Contact类的实例
		 */
		sohu.profile.Education.init = function(category,user,inter,section){
			// 查看是否有已存在的实例，有直接返回，无就创建后再返回
			if(!this.instance)
				this.instance = new sohu.profile.Education(category,user,inter,section);
			return this.instance;
		};
		
		/**
		 * 再增加一项工作记录
		 */
		sohu.profile.Education.add = function(eventTarget){
			var target = $(eventTarget).up('fieldset').prev();
			if(sohu.profile.checkCount('学校',target.down('dd').get(0).attr('class'))){
				var newCell = sohu.profile.newFormCell(target,target,'after',true);
				kola.anim.Discolour.action(newCell,{to: "#fffdf0",speed: 100});
				//kola.anim.Wink.action(newCell,{pClass:'highLight',speed:0.5,time:2});
				var scope = $('#' + newCell.attr('id'));	// scope 用作initCtrl方法查找控件时的范围限定
				this.instance.initCtrl(true,scope);
			}
		};
		/**
		 * 删除一个工作记录
		 */
		sohu.profile.Education.del = function(eventTarget){
			var delNode = $(eventTarget).up('fieldset');
			sohu.profile.del('学校',delNode,delNode.down('dd').get(0).attr('class'));
		};
//=====================================profile 工作信息处理类=========================================	
		
		sohu.profile.Work = Class.create(sohu.profile.Base.prototype,{
			/**
			 * 初始化私有事件
			 */
			_initPrivEvents: function(){},
			/**
			 * 初始化联系方式里的控件
			 * param {bool} isNew 新添加的公司
			 */
			initCtrl: function(isNew,scope){	// scope 使用$的范围限定符

				if(typeof(scope) == 'undefined') scope = '';
				var infos = $('.j-work-companyInfoView',scope),
					names = $('.j-work-companyNameEdit',scope),
					details = $('.j-work-companyDetailEdit',scope),
					areas = $('.j-work-location',scope),
					industrys = $('.j-work-industry',scope),
					jobs = $('.j-work-job',scope),
					dates = $('.j-work-date',scope);
				
				if(names){
					// 公司控件初始化及事件绑定
					for(var i = 0 ; i< names.elements().length ; i++){
						var info = infos.get(i),
							name = names.get(i),
							detail = details.get(i),
							name_childs = name.children(),
							area_childs = areas.get(i).children(),
							idst_childs = industrys.get(i).children(),
							job_childs = jobs.get(i).children(),
							date_childs = dates.get(i).children();
						// 公司名称控件初始化及事件绑定
						//company.get(0).on('click',this.searchCompany.bind(this));
							
						// 初始化公司选择器
						sohu.ctrl.CompanySelector.profile(
							isNew,
							name_childs.get(0),
							name_childs.get(1),
							name_childs.get(2),
							info,
							name,
							detail,
							$('.j-work-companyName',info),
							$('.j-work-companyDetail',info),
							$('.j-work-CompanyNameEditBtn',info));
							
						// 公司地址控件初始化及事件绑定
						sohu.ctrl.AreaSelector.init(	
							{ele: area_childs.get(0), val: area_childs.get(0).attr('data-value')}, 
							{ele: area_childs.get(1), val: area_childs.get(1).attr('data-value')},
							{ele: area_childs.get(2), val: area_childs.get(2).attr('data-value')});
						
						// 所在行业控件初始化及事件绑定
						sohu.ctrl.IndustrySelector.init(
							{ele: idst_childs.get(0), val: idst_childs.get(0).attr('data-value')},
							{ele: idst_childs.get(1), val: idst_childs.get(1).attr('data-value')});
						//sohu.ctrl.JobSelector.init({ele: idst_childs.get(2), val: idst_childs.get(2).attr('data-value')});
						// 工作类别和名称控件初始化及事件绑定
						sohu.ctrl.JobSelector.init(
							{ele: job_childs.get(0), val: job_childs.get(0).attr('data-value')},
							{ele: job_childs.get(1), val:job_childs.get(1).attr('data-value')});
						// 工作时间控件初始化及事件绑定	
						kola.ctrl.DateSelector.init(	
							{ele:date_childs.get(0),val:date_childs.get(0).attr('data-value')},
							{ele:date_childs.get(1),val:date_childs.get(1).attr('data-value')});
						kola.ctrl.DateSelector.init(	
							{ele:date_childs.get(3),val:date_childs.get(3).attr('data-value')},
							{ele:date_childs.get(4),val:date_childs.get(4).attr('data-value')});
							
						// 绑定现在在这家公司的事件
						date_childs.get(5).children().get(0).on('click',function(e,today,endYear,endMonth){
							if(kola.Event.element(e).prop('checked')){
								endYear.hide();
								endMonth.hide();
								today.show();
							} else {
								today.hide();
								endYear.show();
								endMonth.show();
							}
						}.bindEvent(this,date_childs.get(2),date_childs.get(3),date_childs.get(4)));
					}
				}
			},
			
			/**
			 * 回填信息
			 */
			backWrite: function(){
				// 回填职位信息
				var jobPositions = $('.j-work-position',this.section);
				if(jobPositions){
					jobPositions.each(function(it,i){
				 		var jobPostion = sohu.ctrl.JobSelector.getCateName(it.attr('data-positionId'),it.attr('data-subPositionId'));
				 		it.html(jobPostion[0] + '&nbsp;&nbsp;' + jobPostion[1]);
					});
				}
			},
			
			/**
			 * 验证输入的合法性
			 */
			_validate: function(){},
			
			/**
			 * 格式化相关信息，主要是动态添加的表单项的处理
			 * 这里对动态添加的工作表单项的name属性的重置处理
			 */
			_format: function(){
				var ids = $('.j-work-id',this.section),
					userIds = $('.j-work-userId',this.section),
					names = $('.j-work-companyNameEdit',this.section),
					areas = $('.j-work-location',this.section),
					industrys = $('.j-work-industry',this.section),
					jobs = $('.j-work-job',this.section),
					dates = $('.j-work-date',this.section);
					
				// 公司名称控件排序
				for(var i = 0 ; i< names.elements().length ; i++){
					var name_childs = names.get(i).children(),
						area_childs = areas.get(i).children(),
						idst_childs = industrys.get(i).children(),
						job_childs = jobs.get(i).children(),
						date_childs = dates.get(i).children();
					
					ids.get(i).attr('name','workInfos[' + i + '].id');
					userIds.get(i).attr('name','workInfos[' + i + '].userId');
					name_childs.get(0).attr('name','workInfos[' + i + '].companyName');
					name_childs.get(1).attr('name','workInfos[' + i + '].companyId');
					name_childs.get(2).attr('name','workInfos[' + i + '].status');
					// 公司地址控件排序
					area_childs.get(0).attr('name','workInfos[' + i + '].provinceId');
					area_childs.get(1).attr('name','workInfos[' + i + '].cityId');
					area_childs.get(2).attr('name','workInfos[' + i + '].countyId');
					// 所在行业控件排序
					idst_childs.get(0).attr('name','workInfos[' + i + '].businessCode');
					idst_childs.get(1).attr('name','workInfos[' + i + '].subBusinessCode');
					//idst_childs.get(2).attr('name','workInfos[' + img + '].position');
					// 工作类别控件排序
					job_childs.get(0).attr('name','workInfos[' + i + '].position');
					job_childs.get(1).attr('name','workInfos[' + i + '].subPosition');
					// 工作时间控件排序
					date_childs.get(0).attr('name','workInfos[' + i + '].startYear');
					date_childs.get(1).attr('name','workInfos[' + i + '].startMonth');
					date_childs.get(3).attr('name','workInfos[' + i + '].endYear');
					date_childs.get(4).attr('name','workInfos[' + i + '].endMonth');
					date_childs.get(5).children().get(0).attr('name','workInfos[' + i + '].isCurrented');
					date_childs.get(5).children().get(1).attr('name','_workInfos[' + i + '].isCurrented');
				}
			}
		});
		
		/**
		 * 静态方法，获取一个Contact类的实例
		 */
		sohu.profile.Work.init = function(category,user,inter,section){
			// 查看是否有已存在的实例，有直接返回，无就创建后再返回
			if(!this.instance)  
				this.instance = new sohu.profile.Work(category,user,inter,section);
			return this.instance;
		};
		
		/**
		 * 再增加一项工作记录
		 */
		sohu.profile.Work.add = function(eventTarget){
			var target = $(eventTarget).up('fieldset').prev();
			if(sohu.profile.checkCount('学校',target.down('dd').get(0).attr('class'))){
				var newCell = sohu.profile.newFormCell(target,target,'after',true);
				kola.anim.Discolour.action(newCell,{to: "#fffdf0",speed: 100});
				//kola.anim.Wink.action(newCell,{pClass:'highLight',speed:0.5,time:2});
				var scope = $('#' + newCell.attr('id'));	// scope 用作initCtrl方法查找控件时的范围限定
				this.instance.initCtrl(true,scope);
			}
		};
		/**
		 * 删除一个工作记录
		 */
		sohu.profile.Work.del = function(eventTarget){
			var delNode = $(eventTarget).up('fieldset');
			sohu.profile.del('公司',delNode,delNode.down('dd').get(0).attr('class'));
		};
//=====================================profile 静态方法或者对象==============================================
		// profile操作的信息类型
		sohu.profile.CATEGORY={
			all:'All',				// 整体编辑
			basic:'Basic',
			work:'Work',
			education:'Education',
			personal:'Personal',
			contact:'Contact'
		};
		
		/**
		 * 标识编辑方式，有以下两种
		 * 1、整体编辑
		 * 2、各项单独编辑:包括
		 */ 
		sohu.profile.category = null;

		/**
		 * 存储一些临时对象
		 */
		sohu.profile.temp = {};
		/**
		 * 整个profile的管理入口
		 */
		sohu.profile.manage = function(category,inter,section){
			if(!this.user.valid())	return false;
			this.category = category;
			// category == null 标识整体编辑的完成操作
			if(category == null){
				this.switch2Show();
				return;
			}
			// 判断是否是从整体的编辑按钮触发的编辑事件
			if(category == this.CATEGORY.all){
				this.switch2Edit();
				inter = $('a.optionEdit').get(0);
				category = this.CATEGORY.basic;
			}
			this[category].init(category,this.user.id,inter,section).manage();
		};
		
		/**
		 * 进行编辑
		 */
		sohu.profile.edit = function(section){
			if(!this.user.valid())	return false;
			var category = section.attr('data-category'),
				inter = section.down('a.optionEdit');
			
			$('div.section').removeClass('section-edit');	
			this[category].init(category,this.user.id,inter,section).manage();
		};
		/**
		 * 删除动态添加的项目
		 */
		sohu.profile.del = function(category,delNode,selector){
			if($('.' + selector).elements().length > 1){
				sohu.ctrl.Dialog.confirm(
					'您确认要移除该' + category + '信息？您将丢失所有保存的资料！',
					{
						title: '删除该' + category + '信息？',
						yes: function(delNode){$(delNode).remove();}.bind(this,delNode)
					} 
	            );
			} else{
				sohu.ctrl.Dialog.alert('删除该' + category + '信息？','您不能删除最后一项' + category + '信息！');	 			
			}
		};
		
		/**
		 * 添加公司，学校和IM信息的数量验证
		 */
		sohu.profile.checkCount = function(category,selector){
			if($('.'+selector).elements().length < 11){
				return true;
			} else{
				sohu.ctrl.Dialog.alert('添加' + category + '信息？','您不能再添加' + category + '信息！');
				return false;
			}
		};
		/**
		 * 转换到编辑状态
		 */
		sohu.profile.switch2Edit = function(inter){
			$('#profileInfo a.optionEdit').html('编辑');
			$('#startEditAll').hide();
			$('#endEditAll').show('block');
			$('#profileInfo>div.section').removeClass('section-edit');	
			$('#profileInfo').addClass('editAll');
			// 绑定每一项标题栏的点击事件
			this.temp.clickSectionHead = this.clickSectionHead.bindEvent(this);
			$('#profileInfo div.sectionHead').on('click',this.temp.clickSectionHead);
		};
		
		/**
		 * 绑定每一项标题栏的点击事件
		 */ 
		sohu.profile.clickSectionHead = function(e){
			this.edit(kola.Event.element(e).up('div.section'));
			kola.Event.stop(e);
			
		};
		
		/**
		 * 切换到显示状态
		 */
		sohu.profile.switch2Show = function(inter){
			$('#profileInfo>div.section').removeClass('section-edit');	
			$('#profileInfo div.sectionHead').un('click',this.temp.clickSectionHead);
			$('#profileInfo a.optionEdit').html('编辑');
			$('#profileInfo').removeClass('editAll');
			$('#endEditAll').hide();
			$('#startEditAll').show('block');
			$('#profileInfo>div.section').each(function(it,i){
				var category = it.attr('data-category'),
					cache = sohu.profile.cache['show'][category];
				if(cache && cache != null){
					it.down('div.sectionBody').html(cache);
					// 显示状态时回填信息项，暂时只用于工作中的职位回填
					sohu.profile[category].init(category,
						sohu.profile.user.id,
						it.down('a.optionEdit'),
						it
					).backWrite();	
				}
			});
			sohu.profile.clearUnSaveTip();
		};
		
		/**
		 * 未保存的提示初始化绑定
		 */
		sohu.profile.bindUnSaveTip = function(section,callBack){
			sohu.tool.ChangeCheck.init(section,callBack);
		};
		
		/**
		 * 未保存的提示初始化清除
		 */
		sohu.profile.clearUnSaveTip = function(){
			if(!$('#profileInfo>form')){
				sohu.tool.ChangeCheck.clear();
			} else{
				var category = $('#profileInfo>div.section-edit').get(0).attr('data-category');
				this[category].init().bindUnSaveTip();
			}
		};
		
		/**
		 * 初始化当前用户的相关信息
		 */
		sohu.profile.user = eval("("+kola.Cookie.get('sns')+")") ? eval("("+kola.Cookie.get('sns')+")"):{};

		/**
		 * 验证用户是否已经登录
		 */
		sohu.profile.user.valid = function(){
			var user =  eval("("+kola.Cookie.get('sns')+")");
			if(user && user.id)
				return true;
			else{
				sohu.user.logout();
				return false;
			}
		};
		
		/**
		 * 动态生成表单单元
		 * param {string or dom element object} source 需要添加的表单单元
		 * param {string or dom element object} target 目标表单单元
		 * param {string} postion 添加到目标表单单元的什么的位置
		 * param {boolean}  clear 是否需要清空表单单元项
		 */
		sohu.profile.newFormCell= function(source,target,position,clear){
			source = $(source);
			target = $(target);
			var newCell = kola.Element.create(
				source.prop('tagName'),
				{
					'id':'ele_'+(new Date()).getTime(),	// 设置ID，以便后买初始化控件的时候，只读取此新增的单元里的控件
					'class':source.prop('className')
				}
			);
			newCell.html($(source).html()).hide();
			if(position == 'before')		target.before(newCell);
			else if(position == 'after')	target.after(newCell);
			else if(position == 'top')		target.prepend(newCell);
			else if(position == 'bottom')	target.append(newCell);
			
			if(clear){
				var fields = kola.dom.Form.fields(newCell);
				for (var i=0; i<fields.length; i++){
					var input = fields[i].elements()[0];
					input.style.display='';
					switch(input.type){
						case 'text':
						case 'textarea': 
							input.value = '';
							break;
						case 'checkbox':
						case 'radio':
							input.checked = false;
							break;
						case 'select-one':
						case 'select-multiple':
							input.value = 0;
							input.setAttribute('data-value',0);
							break;
					}
				} 
			}
			return newCell.show();
		};
		
		/**
		 * 缓存显示和编辑的HTML片段，减少Ajax请求
		 */
		sohu.profile.cache = {
			type: {				// 表示缓存类型
				show: 'show',	// 展示片段
				edit: 'edit'	// 编辑片段
			},
			show: {
				Basic: null,
				Contact: null,
				Personal: null,
				Education: null,
				Work:null
			},
			edit: {
				Basic: null,
				Contact: null,
				Personal: null,
				Education: null,
				Work: null
			}
		};
		
	},
	'kola.dom.Form,kola.ctrl.DateSelector,kola.anim.Wink,kola.anim.Discolour,'+
	'sohu.core.*,sohu.ctrl.AreaSelector,sohu.ctrl.SchoolSelector,sohu.ctrl.IndustrySelector,'+
	'sohu.ctrl.JobSelector,sohu.ctrl.CompanySelector,sohu.ctrl.Dialog,sohu.tool.ChangeCheck,kola.anim.Scroller'
);