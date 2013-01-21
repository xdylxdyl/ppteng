 /**
 * @fileoverview  学校选择器类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom,
 * 				sohu.ctrl.SchoolSelectorPop
 * 				sohu.ctrl.SchoolSelectorTip	packages
 */

$register(
	'sohu.ctrl.SchoolSelector',
	function(){
		
		sohu.ctrl.SchoolSelector = Class.create({
			/**
			 * @constructor 构建一个学校选择类
			 * 该学校选择类，包装弹出层和Suggestion方式的学校选择类
			 * 	@param	{number}	type:学校类型标识	默认值为6（6：大学，4：高中，2：小学）
			 * 	@param 	{element}	nameEl: 学校名称显示标签（必填项）
			 * 	@param 	{element}	valueEl: 学校ID存储标签（必填项）
			 * 	@param	{element}	toggle: 弹出层的触发器（必填项）
			 * @param {Object} 学校的设置数据（必填项），其为一个对象，其中包括如下配置属性：
			 * 		deptEl 学院名称选择标签(大学需要用)
			 * 		aFilter: 区域过滤条件（弹出层选择类使用）默认值为1（1：省一级，2：省市两级，3：省市区三级）
			 * 		width: 选择面板大小，默认为560px（弹出层选择类使用）
			 * 		col: 学校列表显示列数，默认值为3（弹出层选择类使用）
			 * 		row：学校列表显示行数，默认值为15（弹出层选择类使用）
			 * 		其它根据实际情况添加
			 */
			initialize: function(type,nameEl,valueEl,toggleEl,options) {
				this._type = type;
				this._nameEl = $(nameEl);
				this._valueEl = $(valueEl);
				this._toggleEl = $(toggleEl);
				this._options = Object.extend({
					deptEl:null,
					aFilter:1,
					width:560,
					col:3,
					row:15,
					callBack:function(){}
				},options);
				this._tipSelector = null;
			},
			/**
			 * 初始化两种选择器
			 */
			initSelectorAll: function(){
				this.initSelectorTip();
				this.initSelectorPop(); 
			},
			/**
			 * 初始化suggestion方式
			 */
			initSelectorTip: function(){
				// 给学校选择器输入框绑定onblur事件，处理是否是用户在新建学校
				this._nameEl.on('blur',this._analyzeInput.bind(this));
				
				//  初始化 学校选择的 Suggestion 控件
				this._tipSelector = new sohu.ctrl.SchoolSelectorTip(this._type,this._nameEl,{
					onSelect: this._tipOnSelect.bind(this)
				});
			},
			/**
			 * 当焦点离开学校名称输入框的时候分析输入框的值是否改变
			 */
			_analyzeInput: function(){
				if(this._nameEl.val() != this._nameEl.prop('data-selected')){
					this._valueEl.val('');
				}
			},
			/**
			 * Suggestion 选则的回调方法实现，有SelectChangeTip调用
			 */
			_tipOnSelect: function(txt,val){
				this._tipSelector.setChange(false);
				this._nameEl.val(txt);
				this._valueEl.val(val);
				this._nameEl.prop('data-selected',txt);
				this._tipSelector.setChange(true);
				this._options.callBack();
				this._bindAcadme();
			},
			
			/**
			 * 初始化suggestion方式
			 */
			initSelectorPop: function(){
				this._toggleEl.on('click',this._toggleOnClick.bind(this));
			},
			/**
			 * 点击触发器时，对学校选择层实现显示与隐藏的切换
			 */
			_toggleOnClick: function(){
				this._toggleSwitch();
				sohu.ctrl.SchoolSelectorPop.init({
						sNameEle:this._nameEl,
						sIdEle:this._valueEl,
						deptEle:this._options.deptEl,
						sType:this._type,
						aFilter:this._options.aFilter,
						callBack:this._popOnSelect.bind(this)}
				);
			},
			
			/**
			 * 切换toggle按钮
			 */
			_toggleSwitch: function(){
				if(this._toggleEl.hasClass('toggle-on')){
					this._toggleOff();
				} else {
					this._toggleOn();
				}
			},
			
			/**
			 * 激活toggle按钮
			 */
			_toggleOn: function(){
				this._toggleEl.addClass('toggle-on');
			},
			/**
			 * 关闭toggle按钮
			 */
			_toggleOff: function(){
				this._toggleEl.removeClass('toggle-on');
			},
			/**
			 * 弹出层选择器选择后的回调方法
			 * param {bool} selected 是否是选择了学校还是纯粹的关闭选择器
			 */
			_popOnSelect: function(selected,txt,val){
				var _this = this;
				this._toggleOff();
				if(selected){
					// 设置输入框不触发tip
					this._tipSelector.setChange(false);
					this._nameEl.val(txt);
					this._valueEl.val(val);
					// 恢复输入框触发tip
					this._tipSelector.setChange(true);
					this._options.callBack();
					this._bindAcadme();
				}
			},
			/**
			 * 绑定学院下拉列表
			 */
			_bindAcadme: function(){
				if(this._type = sohu.ctrl.SchoolSelector.type.university)
					sohu.ctrl.SchoolAcadme.init(this._options.deptEl,this._valueEl.val());
			}
		});
		
		sohu.ctrl.SchoolSelector.type={
			university: '6',
			senior: '4',
			junior: '4',
			grade: '2'
		}
		/**
		 * 学院数据模型
		 */
		var AcadmeMdl =  new sohu.core.Model({
			actions: {
				list: {
					url:	'/department/show.do',
					method:	'get',
					format:	'json'
				}
			},
			url:			'/a/profile'
		});
		
		sohu.ctrl.SchoolAcadme = {
			/**
			 * 绑定学院信息
			 */
			init: function(deptEl,schoolId){
				this._deptEl = $(deptEl);
				this._schoolId = schoolId;
				this._reqAcadme();
			},
			
			/**
			 * 请求学院信息
			 */
			_reqAcadme: function(){
				var params = {
					f: 'json',
					schoolId: this._schoolId
				}
				AcadmeMdl.list(params,{
					success:this._showAcadme.bind(this),
					failure:this._reqError.bind(this)
				});
			},
			
			/**
			 * 显示学院信息
			 */
			_showAcadme: function(data){
				this._deptEl.clear().addOptions({'0':'请选择学院'}).addOptions(data);
			},
			
			/**
			 * 请求学校发生错误处理方法
			 */
			_reqError: function() {
				this._showAcadme({});
			}
		};
		/**
		 * 初始化静态方法:初始化两种方式的选择器
		 */
		sohu.ctrl.SchoolSelector.init = function(type,nameEl,valueEl,toggleEl,options){
			return new sohu.ctrl.SchoolSelector(type,nameEl,valueEl,toggleEl,options).initSelectorAll();
		};
		
		/**
		 * 初始化静态方法：初始化suggestion选择器
		 */
		sohu.ctrl.SchoolSelector.initTip = function(type,nameEl,valueEl,toggleEl,options){
			return new sohu.ctrl.SchoolSelector(type,nameEl,valueEl,toggleEl,options).initSelectorTip();
		};
		
		/**
		 * 初始化静态方法：初始化popup方式选择器
		 */
		sohu.ctrl.SchoolSelector.initPop = function(type,nameEl,valueEl,toggleEl,options){
			return new sohu.ctrl.SchoolSelector(type,nameEl,valueEl,toggleEl,options).initSelectorPop();
		};
	},
	'sohu.ctrl.SchoolSelectorPop,sohu.ctrl.SchoolSelectorTip'
);