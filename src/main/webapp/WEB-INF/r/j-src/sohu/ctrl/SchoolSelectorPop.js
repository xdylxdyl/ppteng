 /**
 * @fileoverview  学校选择器类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom,
 * 				sohu.ctrl.AreaSelector	
 * 				sohu.ctrl.Pager	packages
 */

$register(
	'sohu.ctrl.SchoolSelectorPop',
	function(){
		/**
		 * 学校数据模型
		 */
		var SchoolMdl =  new sohu.core.Model({
			actions: {
				list: {
					url:	'/school/show.do',		
					method:	'get',						
					format:	'json'	
				}
			},
			url:			'/a/profile'
		});
		
		
		sohu.ctrl.SchoolSelectorPop = Class.create({
			/**
			 * @constructor 构建一个学校选择类
			 * 构建一个学校选择面板，并初始化相关属性
			 * @param {Object} 学校的设置数据（必填项），其为一个对象，其中包括如下配置属性：
			 * 		sNameEle: 学校名称显示标签（必填项）
			 * 		sIdEle: 学校ID存储标签（必填项）
			 * 		deptEle 学院名称选择标签
			 * 		sType: 学校类型，默认值为6（6：大学，4：高中，2：小学）
			 * 		aFilter: 区域过滤条件，默认值为1（1：省一级，2：省市两级，3：省市区三级）
			 * 		width: 选择面板大小，默认为560px
			 * 		col: 学校列表显示列数，默认值为3
			 * 		row：学校列表显示行数，默认值为15
			 */
			initialize: function(options) {
				// 初始化控件配置参数
				this.setOptions(options);
				// 初始化整个控件
				this._initControl();
			},
			
			/**
			 * 初始化配置参数
			 */
			setOptions: function(options){
				this._options = Object.extend({
						deptEle:null,	// 学院的控件
						sType: 6, 		//（6：大学，4：高中，1：小学）
						aFilter: 1, 	//（1：省一级，2：省市两级，3：省市区三级）
						width: 560,
						col: 3,
						row: 15,
						callBack:function(){}
					}, options);
				this._options.sNameEle = $(this._options.sNameEle);
				this._options.sIdEle = $(this._options.sIdEle);
				if(this._options.deptEle) this._options.deptEle = $(this._options.deptEle);
				this.pageSize = this._options.col * this._options.row;
				return this;
			},
			
			/**
			 * 显示选择面板
			 */
			show: function() {
				
				var sNameElePos = this._options.sNameEle.pos(),
					sNameEleHeight = this._options.sNameEle.height(),
					sNameEleWidth = this._options.sNameEle.width();
				var pos = {
					left: sNameElePos.left,//Math.max(sNameElePos.left - ((this._options.width-sNameEleWidth)/2)),
					top: (sNameElePos.top + sNameEleHeight + 5)
				}
				// 让牧天修改样式，增加'position','absolute'的样式
				this.selector.css('position','absolute').pos(pos).show();
				this.iframe.width(this.selector.width()).height(this.selector.height());
				this.iframe.css('position','absolute').css('borderWidth','0px').pos(pos).show();
				//this.selector.show();
			},
			
			/**
			 * 隐藏选择面板
			 */
			hide: function(selected) {
				this.selector.hide();
				this.iframe.hide();
				// 调用回调方法处理触发器状态
				if(!selected) // 不是选择学校的时候调用callBack
					this._options.callBack(false);
				return false;
			},
			
			/**
			 * 切换选择器显示与隐藏
			 */
			switchDisplay: function(){
				this.selector.css('display') == 'none' ? this.show() : this.hide(false);
			},
			/**
			 * 跳到某一页
			 */
			gotoPage: function(start) {
				this._reqSchool(start);
			},
			/**
			 * 重置页码
			 */
			resetPager: function(data) {
				this.pager.refresh(data);
			},
			/**
			 * 清空页码
			 */
			clearPager: function() {
				this.eles.pagerBar.html('&nbsp;');
			},
			
			/**
			 * 初始化控件
			 */
			_initControl: function(){
				this._initPanel();
				this.show();
				this._initElements();
				this._initEvents();
				this._initPager();
				this._initSchool();
				return this;
			},
			/**
			 * 初始化选择面板
			 */
			_initPanel: function() {
				var str = ''+
					'<div class="decor">'+
						'<span class="tl"></span>'+
						'<span class="tr"></span>'+
						'<span class="br"></span>'+
						'<span class="bl"></span>'+
					'</div>'+
					'<div class="content" style="width:'+ this._options.width +'px;">'+
							'<div class="head">'+
								'<h4>'+
									'<label for="selectPprovince">请选择学校所在的省市：</label>'+
									'<select class="select province" id="selectPprovince" name="selectPprovince"></select>&nbsp;';
						if(this._options.aFilter == 2 || this._options.aFilter == 3) // 有城市或者区县过滤条件时
							str += '<select class="select city" id="selectCity" name="selectCity"></select>&nbsp;';
							if(this._options.aFilter == 3) // 有区县过滤条件时
							str += '<select class="select county" id="selectCounty" name="selectCounty"></select>';
						str+= '</h4>'+
								'<div class="option"><a class="icon img-close" href="javascript:void(0);">关闭</a></div>'+
							'</div>'+
							'<div class="body schoolList"></div>'+
							'<div class="foot">'+
								//*******************这里是因为基础框架的CSS选择不能用，导致暂时用ID调试******************************
								'<div id="schooLPagerBar" class="pager"></div>'+
							'</div>'+
						'</div>'+
					'</div>';
				this.panel = kola.Element.create('div');
				// IE6兼容处理，用iframe遮盖select标签
				this.iframe = kola.Element.create('iframe');
				this.selector = this.panel.attr('class','popLayer schoolSelector-pop none').html(str);
				//if($('#dropWrap')){
					//$('#dropWrap').append(this.panel).append(this.iframe);
				//} else{
					$(document.body).append(this.panel).append(this.iframe);
				//}
			},
			
			/**
			 * 初始化需要被用到的对象
			 */
			_initElements: function(){
				var areaFilters = this.panel.down('select');
				this.eles = {
					aFltrProv: areaFilters.get(0),
					aFltrCity: ((this._options.aFilter == 2 || this._options.aFilter == 3))? areaFilters.get(1):null,
					aFltrCnty: (this._options.aFilter == 3)? areaFilters.get(2):null,
					schoolList: this.panel.down('div.schoolList').get(0),
					closeBtn: this.panel.down('a').get(0),
					pagerBar: this.panel.down('div.pager').get(0)
				}
			},
			
			/**
			 * 绑定相应的事件处理方法
			 */
			_initEvents: function(){
				this._getLastAFilter().on('change', this._bindSchool.bind(this));
				this.eles.closeBtn.on('click', this.hide.bind(this,false));
				this.eles.schoolList.on('click', this._selectSchool.bindEvent(this));
			},
	
			/**
			 * 获取最后一个区域过滤器
			 */
			_getLastAFilter: function() {
				switch(this._options.aFilter){
					case 1: return this.eles.aFltrProv;
					case 2: return this.eles.aFltrCity;
					case 3: return this.eles.aFltrCnty;
					default: return this.eles.aFltrProv;
				}
			},
			/**
			 * 根据区域过滤器显示默认的区域的学校
			 */
			_initSchool: function() {
				//	默认显示第一个
				if(this._options.aFilter == 3){
					this.areaFilter = sohu.ctrl.AreaSelector.init(
						{ele: this.eles.aFltrProv, val: 1}, 
						{ele: this.eles.aFltrCity, val: 1},
						{ele: this.eles.aFltrCnty, val: 1});
				}
				else if(this._options.aFilter == 2){
					this.areaFilter = sohu.ctrl.AreaSelector.init(
						{ele: this.eles.aFltrProv, val: 1}, 
						{ele: this.eles.aFltrCity, val: 1});
				}
				else {
					this.areaFilter = sohu.ctrl.AreaSelector.init(
						{ele: this.eles.aFltrProv, val: 1});
				}
				this._bindSchool();
			},
			
			/**
			 * 初始化翻页信息
			 */
			_initPager: function() {
				this.pager = sohu.ctrl.Pager.newInstance(this.eles.pagerBar, {
					size: this.pageSize,
					callback: this.gotoPage.bind(this)
				});
			},
			
			/**
			 * 选择学校
			 */
			_selectSchool: function(e) {
				var ele = kola.Event.element(e),
					text = '',
					value = '';
					
				if (ele && ele.prop('tagName').toLowerCase() == 'a' && this._options.sIdEle.val()!= ele.attr('value')) {
					this.hide(true);
					this._options.callBack(true,ele.html(),ele.attr('value'));
				}
			},
			
			/**
			 * 绑定学校列表
			 */
			_bindSchool: function() {
				this.clearPager();
				if (this._getLastAFilter().value == '0') {
					this.eles.schoolList.html('请先选择城市');
				} 
				else {
					this._reqSchool(0);
				}
			},
			/**
			 * 从服务器端请求学校列表
			 */
			_reqSchool: function(start) {
				this._showLoading();
				var params = {
					f: 'json',
					sc: this._options.sType,
					provId: this.eles.aFltrProv.val(),
					st: start,
					sz: this.pageSize
				};
				if(this._options.aFilter == 2 || this._options.aFilter == 3)
					params['cityId'] = this.eles.aFltrCity.val();
				if(this._options.aFilter == 3)
					params['countyId'] = this.eles.aFltrCnty.val();
				SchoolMdl.list(params,{
					success:this._showSchool.bind(this),
					failure:this._reqError.bind(this)
				});
			},
			/**
			 * 展示学校列表
			 */
			_showSchool: function(data) {
				this._hideLoading();
				this._listSchool(data.ctt);
				this.resetPager(data);
			},
			
			/**
			 * 请求学校发生错误处理方法
			 */
			_reqError: function() {
				this._hideLoading();
				this.eles.schoolList.html('暂时无法获取所需信息！请稍候再试...');
				this.clearPager();
			},
			
			/**
			 * 构建学校列表项
			 */
			_listSchool: function(schools) {
				var str = '<table width="100%" cellspacing="4" cellpadding="0" border="0"><tbody>';
				if (typeof(schools) == 'undefined' || schools.length == 0) {
					str += '没有学校';
				} 
				else {
					var canLoop = true,
						trIndex = 0,
						schoolCount = schools.length;
					while (canLoop) {
						str += '<tr>';
						
						var startIndex = trIndex * this._options.col;
						for (var i=0; i<this._options.col; i++) {
							str += '<td>';
							if (startIndex + i < schoolCount) {
								str += '<a href="javascript:void(0);" value="' + schools[startIndex + i][0] + '" title="' + schools[startIndex + i][1] + '">' + schools[startIndex + i][1] + '</a>';
							} 
							else {
								str += '&nbsp;';
								canLoop = false;
							}
							str += '</td>';
						}
						
						if ((startIndex + this._options.col) == schoolCount) 
							canLoop = false;
						trIndex ++;
						
						str += '</tr>';
					}
				}
				str += '</tbody></table>';
				this.eles.schoolList.html(str);
				this.show();
			},
			/**
			 * 显示 loading条
			 */
			_showLoading: function(){
				this.eles.schoolList.html('');
				this.eles.schoolList.addClass('load-page');
			},
			/**
			 * 隐藏 loading条
			 */
			_hideLoading: function(){
				this.eles.schoolList.removeClass('load-page');
			}
		});
		/**
		 * 提供缓存机制的初始化方法
		 */
		sohu.ctrl.SchoolSelectorPop.init = function(options){
			var instances = sohu.ctrl.SchoolSelectorPop.instances;
			if (!instances) {
				sohu.ctrl.SchoolSelectorPop.instances = {};
				instances = sohu.ctrl.SchoolSelectorPop.instances;
			}
			if (!instances['type_'+options.sType]) {
				instances['type_'+options.sType] = new sohu.ctrl.SchoolSelectorPop(options);
			}
			else{
				instances['type_'+options.sType].setOptions(options).switchDisplay();
			}
			return instances['type_'+options.sType];
		};
	},
	'sohu.core.*,sohu.ctrl.AreaSelector,sohu.ctrl.Pager'
);