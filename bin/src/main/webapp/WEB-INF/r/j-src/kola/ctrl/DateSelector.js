/**
 * @fileoverview 有关日期的级联选择器
 * @author Neo
 * @versio v1.1
 * @base kola
 **/
$register(
	'kola.ctrl.DateSelector',	
	function(){	
		kola.ctrl.DateSelector = Class.create({
			/**
			 * 绑定日期级联选择器
			 * @param {Object} year 年的设置数据（必填项），其为一个对象，其中包括如下配置属性：
			 * 		ele{Eelment}: select对象（必填项）
			 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		from{Number}: 起始年份（可选项），默认为1900
			 * 		to{Number}: 结束年份（可选项），默认为当前年份与2008的最大值
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 * @param {Object} month 月的设置数据（可选项），其为一个对象，其中包括如下配置属性：
			 * 		ele{Eelment}: select对象（必填项）
			 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 * @param {Object} date 日的设置数据（可选项），其为一个对象，其中包括如下配置属性：
			 * 		ele{Eelment}: select对象（必填项）
			 * 		opt{Object}: 默认选项（可选项），这也是一个对象，对象的每个属性都为一个选项，如果没有的话，就采用默认选项
			 * 		val: 默认值（可选项），如果为字符串的值，那就设置为这个值，如果为数字值，那就表示默认选中为哪一项，如果没填写，那就默认选中第一项
			 */		 
			 initialize:function(year,month,date){			 	
				this.initSelector(year,month,date);
			 },
			 
			 /**
			 * 初始化时间选择器
			 */
			 initSelector:function(year,month,date){
			 	//	取得基本变量
				this.year = year;
				this.month = month;
				this.date = date;
				
				this.hasYear=year ? true : false;
				this.hasMon=month ? true : false;
				this.hasDay=date ? true: false;
				
				this.yearSel = $(year.ele);
				if(this.hasDay){
					this.dateSel = $(date.ele);
				}

				
				//	初始化日期
				this.initYear();

				//做是否填写月的判断
				if(this.hasMon){
					this.monthSel = $(month.ele);
					this.initMonth();
					this.onMonthChange();
					this.monthSel.on("change", this.onMonthChange.bind(this));
				}
				
				if(this.hasDay){
					//if(date.val){
					this.dateSel.select(date.val?date.val.toString():0);
					//}
				}
				
				//	建立事件
				this.yearSel.on("change", this.onYearChange.bind(this));

			 },
			 
			 /**
			 *初始化年选择器		 
			 **/
			 initYear:function(){			
				var year = this.year;
				var from = typeof(year.from) == "number" ? year.from : (new Date()).getFullYear();
				var to = typeof(year.to) == "number" ? year.to : 1900;
				this.yearSel.clear()
					.addOptions(year.opt || {"0": "请选择年"})
					.addRange(from, to)
					.select(year.val?year.val.toString():0);
			 },
			 
			 /**
			 *初始化月选择器		 
			 **/
			 initMonth:function(){		 	
			 	var month = this.month;
				this.monthSel.clear()
					.addOptions(month.opt || {"0": "请选择月"})
					.addRange(1, 12)
					.select(month.val?month.val.toString():0);
			 },
			 
			 /**
			 * 当年份变更时调用的方法，用来更新月列表
			 */
			onYearChange: function() {
				if(this.hasMon){
					this.monthSel.select(0);
					this.onMonthChange();
				}
			},
			
			/**
			 * 当月份变更时调用的方法，用来更新日列表
			 */
			onMonthChange: function() {
				this.refreshDate();
			},
			
			/**
			 * 更新日列表
			 */
			refreshDate: function() {
				//	添加基础项
				if(this.hasDay){
					this.dateSel.clear()
						.addOptions(this.date.opt || {"0": "请选择天"});
				}
				//	取得月份的值
				var monthVal = parseInt(this.monthSel.val());
				monthVal = isNaN(monthVal) ? 0 : monthVal;
				if (monthVal >= 1) {
					var to = 1;
					var yearVal = parseInt(this.yearSel.val());
					yearVal = isNaN(yearVal) ? 0 : yearVal;
					if (monthVal == 2) {
						to = (yearVal % 4) == 0 ? 29 : 28; 
					} else {
						if (monthVal <= 7) {
							to = (monthVal % 2) == 1 ? 31 : 30;
						} else {
							to = (monthVal % 2) == 1 ? 30 : 31;
						}
					}
					if(this.hasDay){
						this.dateSel.addRange(1, to)
							.select(0);
					}
				}
			
			}		
					 
		});
		/**
		 *  创建一个新的Area 对象并返回该对象实例
		 */
		kola.ctrl.DateSelector.init = function(year,month,day){
			return new kola.ctrl.DateSelector(year,month,day);
		};
	}
);