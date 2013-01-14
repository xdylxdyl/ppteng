/**
 * @fileoverview  省市区县三级地址选择类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom 
 * 				sohu.core.*,
 * 				sohu.ctrl.TipSuggest	packages
 */
 $register(
	"sohu.ctrl.CompanySelector",
	function(){
		
		var CompanyMdl = new sohu.core.Model({	
			actions: {	
				show: {
						url:		'suggestion.do',				
						method: 	'get',
						format: 	'json',
						type:       'list'        
					}
			},
			url:				'/a/profile/company/'
		});
		
		sohu.ctrl.CompanySelector =Class.create({
			/**
			 * @constructor 构建一个公司选择器
			 * @param {string or Object} element 选择输入框
			 * @param {Object} options 公司选择器的设置数据（选填项），其为一个对象，其中包括如下配置属性：
			 * 		pos		: 	tip显示坐标[width,height]
			 * 		width	: 	tip显示宽度
			 * 		onSelect	: 	选择项时callback
			 */
			initialize : function(element,options){
				this._el=$(element);
				this._data = null;
				this.options = this._setOptions(options);
				this._tip=new sohu.ctrl.SelectChangeTip({
					element : this._el, 
				 	posto:this._el,
					position: this.options.pos,
					width: this.options.width,
				 	onFocus : this._onFocus.bind(this),
				 	onChange: this._onChange.bind(this),
				 	onSelect: this.options.onSelect.bind(this)
			 	});
			},
			/**
			 * 设置配置参数
			 */
			_setOptions: function(options){
				var _options = typeof(options) == 'undefined' ? {}:options;
				_options = Object.extend({
					pos: [0,-1],
					width: 320,
					onSelect: this._onSelect
				},options);
				return _options;
			},
			/**
			 * 获取焦点调用的方法
			 */
			_onFocus : function(){
				this._tip.content("请输入公司名称进行查找");
			},
			
			/**
			 * 输入变化时调用的方法
			 */
			_onChange : function(key){
				key = this._el.val();
				CompanyMdl.show({key:key},{
		 	     	success: this._resetTipList.bind(this,key),
		 	     	failure: function(json){}
		 	    });
			},
			
			/**
			 * 选择时调用的方法
			 */
			_onSelect : function(txt,val){
				this._el.val(txt);
			},
			
			/**
			 * 重新设置tip列表
			 */
			_resetTipList :  function(key,data){
				sohu.ctrl.CompanySelector._data = data;
				this._tip.content('');
				for(id in data){
					var it = data[id]; 
					this._tip.add(this._buildTipItem(it,key),id)	  	 	
				}
				this._tip.firstOn();
		    },
		    
		    /**
		     * 构建每一项
		     */
		    _buildTipItem: function(item,key){
		    	var str = item.name.replace(key,"<em>"+key+"</em>");
		    	
		    	if(item.address != ''|| item.idstCate != '' || item.idstName != ''){
		    		var arr = [];
		    		
		    		str += '<div class="meta">';
		    		if(item.address != '') arr.push(item.address);
		    		if(item.idstCate != '') arr.push(item.idstCate);
		    		if(item.idstName != '') arr.push(item.idstName);
		    		str += arr.join('，');
		    		str += '</div>';
		    	}
		    	return str;
		    }
		});
		/**
		 * 用户profie的公司选择器
		 * param {string,HTMLElement or kola.Element }
		 */
		sohu.ctrl.CompanySelector.profile = function(
			isDynamicNewCompany,// 标识是否是新添加的公司
			selectorInputEl,	// 公司名称输入标签
			selectedValueEl,	// 公司ID保存标签
			selectedStatusEl,	// 公司选择状态标签
			companyInfoViewEl,	// 公司详细信息显示容器
			companyNameEditEl,	// 公司名称编辑容器
			companyDetailEditEl,// 公司详细信息编辑容器
			companyNameViewEl,	// 公司名称显示标签
			companyDetailViewEl,// 公司详细信息显示标签
			companyNameEditBtn){// 修改公司的按钮
			
			// 根据公司ID值判断是显示编辑视图还是显示视图
			if(isDynamicNewCompany){
				$(companyInfoViewEl).hide();
				$(companyNameEditEl).show();
				$(selectedValueEl).val('');
				$(selectedStatusEl).val('0');
			}
			else{
				$(companyInfoViewEl).show();
				$(companyNameEditEl).hide();
			}
			// 隐藏添加新公司时的详细信息输入容器
			$(companyDetailEditEl).hide();
			
			// 给公司选择器输入框绑定onblur事件，处理是否是用户在新建公司，如果是需要显示新公司详细信息输入容器
			$(selectorInputEl).on('blur',function(selectedValueEl,companyDetailEditEl){
				if($(selectedValueEl).val() == ''){
					$(selectedStatusEl).val('0');
					$(companyDetailEditEl).show();
				}
			}.bind(this,selectedValueEl,companyDetailEditEl));
			
			// 修改公司按钮绑定修改事件，显示公司选择器，隐藏公司详细信息显示容器，同时清空已选择的公司ID
			$(companyNameEditBtn).on('click',function(selectedValueEl,companyInfoViewEl,companyNameEditEl){
				$(selectedValueEl).val('');
				$(companyInfoViewEl).hide();
				$(companyNameEditEl).show();
				
			}.bind(this,selectedValueEl,companyInfoViewEl,companyNameEditEl));
			
			//  初始化 公司选择的 AutoComplete 控件
			return new sohu.ctrl.CompanySelector(selectorInputEl,{
				onSelect: function(selectedValueEl,companyNameViewEl,companyDetailViewEl,companyInfoViewEl,companyNameEditEl,companyDetailEditEl,txt,val){
					var item = this._data[val],
						arr = [];
		    		if(item.address != '') arr.push(item.address);
		    		if(item.idstCate != '') arr.push(item.idstCate);
		    		if(item.idstName != '') arr.push(item.idstName);
		    		
					$(companyNameViewEl).html(this._data[val].name);
					$(companyDetailViewEl).html(arr.join('，'));
					$(selectedValueEl).val(val);
					$(selectedStatusEl).val('1');
					$(companyInfoViewEl).show();
					$(companyNameEditEl).hide();
					$(companyDetailEditEl).hide();
				}.bind(this,selectedValueEl,companyNameViewEl,companyDetailViewEl,companyInfoViewEl,companyNameEditEl,companyDetailEditEl)
			});
		};
	},'sohu.core.*,sohu.ctrl.TipSuggest');
