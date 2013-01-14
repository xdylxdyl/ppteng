 /**
 * @fileoverview  行业选择控件实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom packages
 */

$register(
	'sohu.ctrl.IndustrySelector',
	function(){
		sohu.ctrl.IndustrySelector = Class.create({	
			/**
			 * 绑定行业类别下拉选择框
			 * @param {Object} category 行业的设置数据（必填项），其为一个对象，其中包括如下配置属性：
			 * 		ele: select对象（必填项）
			 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 * @param {Object} name 行业名称的设置数据（可选项），其为一个对象，其中包括如下配置属性：
			 * 		ele: select对象（必填项）
			 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 */
			initialize: function(category, name){
				// 初始化控件配置参数
				this._setOptions(category, name);
				// 初始化整个控件
				this._initControl();
			},
			
			/**
			 * 初始化配置参数
			 */
			_setOptions: function(category, name){
				// 把传入的参数进行判断加入默认值
				this._options = {
					category : typeof category == 'undefined' ? null : Object.extend(category,{opt:{'0':'选择行业类别'}}),
					name : typeof name == 'undefined' ? null : Object.extend(name,{opt:{'0':'选择行业名称'}})
				};
				if(this._options.category)	this._options.category.ele = $(this._options.category.ele);
				if(this._options.name)	this._options.name.ele = $(this._options.name.ele);
				this.global = sohu.ctrl.IndustrySelector;
			},
			
			/**
			 * 初始化整个行业行业类别选择控件
			 */
			_initControl: function(){
				// 绑定行业类别下拉框
				if (this._options.category)	this._bindCategory();
				if (this._options.name) {
					// 绑定onChange事件之前手动触发一次该事件以便该事件的处理方法去初始化行业名称下拉框
					this._bindName();
					this._options.category.ele.on('change', this._bindName.bind(this));
				}
			},
					
			/**
			 * 绑定行业类别下拉选择框
			 * @param {Object} category 行业类别的设置数据（必填项），其为一个对象，其中包括如下配置属性：
			 * 		ele: select对象（必填项）
			 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 */
			_bindCategory: function(category) {
				this._options.category.ele.clear()
					.addOptions(this._options.category.opt)
					.addOptions(this.global.data.category)
					.select(this._options.category.val);
			},
			
			/**
			 * 当行业类别变更时调用的方法，用来更新行业名称列表
			 * @param {Object} name 市的设置数据（必填项），其为一个对象，其中包括如下配置属性：
			 * 		ele: select对象（必填项）
			 * 		opt: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 * @param {Element} ele 行业类别element对象（必填项）
			 */
			_bindName: function() {
				this._options.name.ele.clear().addOptions(this._options.name.opt);
				//	用于存储当前省的市列表
				var data = this.global.data.name[this._options.category.ele.val()];		
				if (data) {
					this._options.name.ele.addOptions(data).select(this._options.name.val);
				}
			}
		});
		
		/**
		 *  创建一个新的industry 对象并返回该对象实例
		 */
		sohu.ctrl.IndustrySelector.init = function(category, name){
			return new sohu.ctrl.IndustrySelector(category, name);
		};
		
		/**
		 * 获取指定行业类别ID的和行业名称ID所对应的名称
		 * @param {String} categoryId 行业类别ID （必填项）
		 * @param {String} nameId 行业名称ID 
		 */
		sohu.ctrl.IndustrySelector.getCateName = function(categoryId, nameId){
			var industry=['',''];
				if(typeof(categoryId)!== 'undefined' && categoryId != 0){
					industry[0] = this.data.category[categoryId];
					if(typeof(nameId)!== 'undefined' && nameId != 0)
						industry[1] = this.data.name[categoryId][nameId];
				}
				return industry;
		};
		
		/**
		 * 行业数据
		 */
		sohu.ctrl.IndustrySelector.data = {
			category: {
			    "K": "服务业",
			    "A": "农林牧渔业",
			    "R": "非盈利机构/协会/社团",
			    "E": "医疗保健",
			    "B": "制造加工业",
			    "H": "高新技术",
			    "F": "房地产/建筑/装潢",
			    "L": "企业服务",
			    "J": "金融财务",
			    "N": "政府及公共事业机构",
			    "P": "人事招聘",
			    "G": "运输物流",
			    "O": "文化艺术",
			    "D": "媒体",
			    "Q": "广告公关",
			    "C": "消费品",
			    "M": "教育/科研",
			    "I": " 餐饮/旅游/娱乐/体育"
			},
			name : {
			    "K": {
			        "73": "租赁服务",
			        "82": "家政服务",
			        "116": "中介服务业（房地产/留学…）",
			        "117": "翻译"
			    },
			    "A": {
			        "04": "渔业（含渔业服务业）",
			        "03": "畜牧业（含畜牧业服务业）",
			        "01": "农业（含农业服务业）",
			        "05": "农、林、牧、渔服务业",
			        "02": "林业（含林业服务业）"
			    },
			    "R": {
			        "126": "社团/俱乐部",
			        "123": "非盈利机构",
			        "125": "协会/学会",
			        "124": "慈善机构"
			    },
			    "E": {
			        "98": "心理咨询",
			        "27": "制药",
			        "100": "医疗保健服务",
			        "85": "医院",
			        "101": "医疗设备",
			        "99": "兽医"
			    },
			    "B": {
			        "12": "航空航天",
			        "38": "汽车及零配件",
			        "17": "纺织品",
			        "41": "工业自动化/仪器仪表",
			        "44": "电力/电气",
			        "06": "采掘冶炼",
			        "07": "石油/能源",
			        "35": "机械/机电/重工业制造",
			        "19": "化工"
			    },
			    "H": {
			        "106": "半导体",
			        "108": "纳米技术",
			        "104": "移动增值服务",
			        "107": "生物科技",
			        "103": "IT咨询与系统集成",
			        "61": "计算机（软件/硬件/网络/安全）",
			        "102": "互联网/电子商务",
			        "60": "通讯/电信（设备/运营）",
			        "105": " 游戏",
			        "109": "国防"
			    },
			    "F": {
			        "50": "建材",
			        "49": "室内设计/装潢",
			        "48": "建筑设计/工程",
			        "47": "房地产"
			    },
			    "L": {
			        "74": "企业服务业"
			    },
			    "J": {
			        "115": "会计/审计/税务",
			        "114": "金融",
			        "71": "理财与财务服务",
			        "69": "证券/基金",
			        "113": "投资银行",
			        "68": "银行",
			        "112": "风险投资/私人投资",
			        "70": "保险"
			    },
			    "N": {
			        "93": "政府/司法/军事机构",
			        "86": "公共事业机构"
			    },
			    "P": {
			        "119": "企业内人事/招聘",
			        "118": "猎头与招聘服务"
			    },
			    "G": {
			        "55": "航空客运/货运",
			        "57": "邮政/包裹/零担货运",
			        "51": "运输/汽运/铁路/水运",
			        "54": "运输/汽运/铁路 /水运",
			        "58": "仓储服务",
			        "59": "邮政/包裹/零担货运",
			        "56": "物流/供应链",
			        "52": "客运及城市公共交通"
			    },
			    "O": {
			        "90": "文化艺术业"
			    },
			    "D": {
			        "23": "出版/印刷",
			        "89": "广播电视",
			        "81": "媒体制作",
			        "79": "报纸杂志",
			        "80": "网络媒体"
			    },
			    "Q": {
			        "121": "公关",
			        "122": "市场推广",
			        "120": "广告"
			    },
			    "C": {
			        "18": "服装服饰",
			        "16": "烟草业",
			        "64": "家电/电器",
			        "77": "进出口",
			        "21": "家具",
			        "63": "批发业",
			        "24": "体育用品",
			        "15": "酒制品/饮料",
			        "13": "食品加工",
			        "78": "珠宝",
			        "65": "零售业",
			        "75": "日用品",
			        "76": "办公设备/用品"
			    },
			    "M": {
			        "84": "教育/科研"
			    },
			    "I": {
			        "66": "酒店/旅馆",
			        "91": "运动/体育",
			        "67": "餐饮业",
			        "110": "旅游业",
			        "92": "休闲娱乐",
			        " I": "餐饮/旅游/娱乐/体育",
			        "111": "休闲设施与服务"
			    }
			}
		};
	}	
);