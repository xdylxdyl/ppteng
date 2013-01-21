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
	"sohu.ctrl.SchoolSelectorTip",
	function(){
		
		var SchoolMdl = new sohu.core.Model({	
			actions: {	
				show: {
						url:		'suggestion.do',				
						method: 	'get',
						format: 	'json',
						type:       'list'        
					}
			},
			url:				'/a/profile/school/'
		});
		
		sohu.ctrl.SchoolSelectorTip =Class.create({
			/**
			 * @constructor 构建一个学校选择器
			 * @param {string or Object} element 选择输入框
			 * @param {Object} options 学校选择器的设置数据（选填项），其为一个对象，其中包括如下配置属性：
			 * 		pos		: 	tip显示坐标[width,height]
			 * 		width	: 	tip显示宽度
			 * 		onSelect	: 	选择项时callback
			 */
			initialize : function(type,element,options){
				this._type = type;
				this._el=$(element);
				this._data = null;
				this._options = this._setOptions(options);
				this._tip=new sohu.ctrl.SelectChangeTip({
					element : this._el, 
				 	posto:this._el,
					position: this._options.pos,
					width: this._options.width,
				 	onFocus : this._onFocus.bind(this),
				 	onChange: this._onChange.bind(this),
				 	onSelect: this._options.onSelect.bind(this)
			 	});
			},
			/**
			 * 设置tip的change事件是否有效
			 */
			setChange: function(isActive){
				this._tip.setChange(isActive);
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
				this._tip.content("请输入学校名称进行查找");
			},
			
			/**
			 * 输入变化时调用的方法
			 */
			_onChange : function(key){
				key = this._el.val();
                SchoolMdl.show({sc:this._type,key:key},{
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
				sohu.ctrl.SchoolSelectorTip._data = data;
				this._tip.content('');
				for(id in data){
					var it = data[id]; 
					if(it.name){
						this._tip.add(this._buildTipItem(it,key),id);
					}
				}
				this._tip.firstOn();
		    },
		    
		    /**
		     * 构建每一项
		     */
		    _buildTipItem: function(item,key){
		    	return 	item.name.replace(key,"<em>"+key+"</em>");
		    }
		});
	},'sohu.core.*,sohu.ctrl.TipSuggest');
