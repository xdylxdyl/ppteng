/**
 * @fileoverview  Validator v1.3 提供表单验证方法的类实现
 * @author  Neo
 * @version  1.3
 * @base kola
 */
$register('kola.tool.Validator', function(){	
	/**
	 * 声明该类的静态变量和静态方法
	 */
	kola.tool.Validator={
		Require : /.+/,
		Username : /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,15}$/,
		Realname : /^[\u0391-\uFFE5]{2,6}$/,
		Nosign : /^[^\s]{1}[^-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*$/,
		Domain : /^([a-zA-Z0-9]|[-]){4,16}$/,
		V_code : /^[a-zA-Z0-9]{6}$/,
		Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
		Mobile : /^((\(\d{3}\))|(\d{3}\-))?1(3|5)\d{9}$/,
		Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
		IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
		Currency : /^\d+(\.\d+)?$/,
		Number : /^\d+$/,
		Zip : /^[1-9]\d{5}$/,
		QQ : /^[1-9]\d{4,8}$/,
		Integer : /^[-\+]?\d+$/,
		Double : /^[-\+]?\d+(\.\d+)?$/,
		English : /^[A-Za-z]+$/,
		Chinese :  /^[\u0391-\uFFE5]+$/,
		UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
		IsSafe : function(str){return !this.UnSafe.test(str);},
		SafeString : "this.IsSafe(value)",
		Limit : "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
		LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
		Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
		Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
		Range : "getAttribute('min') < value && value < getAttribute('max')",
		Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
		Custom : "this.Exec(value, getAttribute('regexp'))",
		Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
		ErrorItem : [document.forms[0]],
		OkItem : [document.forms[0]],
		ErrorMessage : ["以下原因导致提交失败：\t\t\t\t\n"],
		OkMessage : ["以下内容已通过验证：\t\t\t\t\n"],
		
		/**
		 * @ 验证单个对象
		 * @param {Element} obj 需要被验证的element对象
		 * @param {Number} mode 验证模式
		 * @param {Object}
		 * 		remsg 提示信息
		 * 		require 是否为必选项
		 * 		dataType 验证类型与本类的某一静态属性相符
		 * 		msg	错误提示
		 * 		okmsg 正确提示
		 */
		ValidateThis: function(obj, mode, options) {
			this.ErrorMessage.length = 1;
			this.ErrorItem.length = 1;
			this.ErrorItem[0] = obj;
			this.OkMessage.length = 1;
			this.OkItem.length = 1;
			this.OkItem[0] = obj;
			
			this.ClearState(obj);
			var goCheck = true;
			if (obj.value == "") {
				if (options.require === true) {
					this.AddErrorOne(obj, options.remsg);
					goCheck = false;
				} else if (options.require === false) {
					goCheck = false;
				}
			}
			if (goCheck) {
				switch (options.dataType) {
					case "Date" :
					case "Repeat" :
					case "Range" :
					case "Compare" :
					case "Custom" :
					case "Group" : 
					case "Limit" :
					case "LimitB" :
					case "SafeString" :
						alert("不支持此验证方法！");
						break;
					default :
						if(!this[options.dataType].test(obj.value)){
							this.AddErrorOne(obj, options.msg);
						}
						else if(options.okmsg) {
							this.AddOkOne(obj, options.okmsg);
						}
						break;
				}
			}
			
			this.ShowOkMsg(mode);
			return( this.ShowErrorMsg(mode) );
		},
		
		/**
		 * 获得一个对象下所有的提交元素列表
		 */
		_elements: function(form) {
			if (form.tagName.toLowerCase() == 'form') {
				return form.elements;
			} else {
				return [].concat($A(form.getElementsByTagName('input')))
								.concat($A(form.getElementsByTagName('select')))
								.concat($A(form.getElementsByTagName('textarea')));
			}
		},
		/**
		 * @ 验证整个表单
		 * @param {Form} theForm 需要被验证的Form对象
		 * @param {Number} mode 验证模式
		 */
		Validate : function(theForm, mode){
			var obj = theForm || event.srcElement;
			var elements = this._elements(obj);
			var count = elements.length;
			this.ErrorMessage.length = 1;
			this.ErrorItem.length = 1;
			this.ErrorItem[0] = obj;
			this.OkMessage.length = 1;
			this.OkItem.length = 1;
			this.OkItem[0] = obj;
			for(var i=0;i<count;i++){
				with(elements[i]){
					var _dataType = getAttribute("dataType");
					if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined")  continue;
					this.ClearState(elements[i]);
					if (value == "") {
						if (getAttribute("require") == "true") {
							this.AddError(i, getAttribute("remsg"));
							continue;
						} else if (getAttribute("require") == "false") {
							continue;
						}
					}
					switch(_dataType){
						case "Date" :
						case "Repeat" :
						case "Range" :
						case "Compare" :
						case "Custom" :
						case "Group" : 
						case "Limit" :
						case "LimitB" :
						case "SafeString" :
							if(!eval(this[_dataType])) {
								this.AddError(i, getAttribute("msg"));
							}
							else if(getAttribute("okmsg")) {
								this.AddOk(i, getAttribute("okmsg"));
							}
							break;
						default :
							if(!this[_dataType].test(value)) {
								this.AddError(i, getAttribute("msg"));
							}
							else if(getAttribute("okmsg")) {
								this.AddOk(i, getAttribute("okmsg"));
							}
							break;
					}
				}
			}
			this.ShowOkMsg(mode);
			return(this.ShowErrorMsg(mode, true));
		},
		
		/**
		 * @ 验证单个元素
		 * @param {Form} theElement 需要被验证的元素
		 * @param {Number} mode 验证模式
		 */
		ValidateOne : function(theElement, mode){
			var obj = theElement || event.srcElement;
			this.ErrorMessage.length = 1;
			this.ErrorItem.length = 1;
			this.ErrorItem[0] = obj;
			this.OkMessage.length = 1;
			this.OkItem.length = 1;
			this.OkItem[0] = obj;
			with(obj){
				var _dataType = getAttribute("dataType");
				if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined"){
					var a;	//do nothing
				}
				else{
					this.ClearState(obj);
					var goCheck = true;
					if (value == "") {
						if (getAttribute("require") == "true") {
							this.AddErrorOne(obj, getAttribute("remsg"));
							goCheck = false;
						} else if (getAttribute("require") == "false") {
							goCheck = false;
						}
					}
					if (goCheck) {
						switch(_dataType){
							case "Date" :
							case "Repeat" :
							case "Range" :
							case "Compare" :
							case "Custom" :
							case "Group" : 
							case "Limit" :
							case "LimitB" :
							case "SafeString" :
								if(!eval(this[_dataType]))	{
									this.AddErrorOne(obj, getAttribute("msg"));
								}
								else if(getAttribute("okmsg")) {
									this.AddOkOne(obj, getAttribute("okmsg"));
								}
								break;
							default :
								if(!this[_dataType].test(value)){
									this.AddErrorOne(obj, getAttribute("msg"));
								}
								else if(getAttribute("okmsg")) {
									this.AddOkOne(obj, getAttribute("okmsg"));
								}
								break;
						}
					}
				}
			}
			this.ShowOkMsg(mode);
			return( this.ShowErrorMsg(mode) );
		},
		
		/**
		 * @ 添加通知容器
		 * @param {Object} obj 通知容器的父容器
		 */
		GetNoticeBox : function(obj) {
			try{
				if(obj.parentNode.childNodes[obj.parentNode.childNodes.length-1]){
					var lastNode = obj.parentNode.childNodes[obj.parentNode.childNodes.length-1];
				}
				if( lastNode && lastNode.tagName && lastNode.tagName.toLowerCase() == kola.tool.Validator.tip){
					var span = lastNode;
				}
				else if( obj.nextSibling && obj.nextSibling.tagName && obj.nextSibling.tagName.toLowerCase() == kola.tool.Validator.tip){
					var span = obj.nextSibling;
				}
				else{
					var span = document.createElement(kola.tool.Validator.tip);
					obj.parentNode.appendChild(span);
				}
				return span;
			}
			catch(e) {
				return null;
			}
		},
		
		/**
		 * @ 显示错误
		 * @param {Object} obj 显示信息容器的父容器
		 * @param {String} error 错误内容
		 */
		ShowError : function(obj, error) {
			var span = kola.tool.Validator.GetNoticeBox(obj);
			if (span) {
				span.className = "formError";
				span.innerHTML = error;
			}
		},
		
		/**
		 * @ 显示信息
		 * @param {Object} obj 显示信息容器的父容器
		 * @param {String} info 提示内容
		 */
		ShowInfo : function(obj, info) {
			var span = kola.tool.Validator.GetNoticeBox(obj);
			if (span) {
				span.className = "formCorrect";
				span.innerHTML = info;
			}
		},
		
		/**
		 * @ 显示错误信息
		 * @param {Number} mode 显示类型
		 * @param {Boolean} 是否滚动到出错的元素
		 */
		ShowErrorMsg : function(mode, isToView){
			if(this.ErrorMessage.length > 1){
				mode = mode || 1;
				var errCount = this.ErrorItem.length;
				switch(mode){
				case 2 :
					/*
					for(var img=1;img<errCount;img++)
						this.ErrorItem[img].style.color = "red";
					*/
						//this.ErrorItem[img].className = "text-error";
				case 1 :
					alert(this.ErrorMessage.join("\n"));
					this.ErrorItem[1].focus();
					break;
				case 3 :
					for(var i=1;i<errCount;i++){
						try{
							var span = this.GetNoticeBox(this.ErrorItem[i]);
							if (span) {
								span.innerHTML = this.ErrorMessage[i].replace(/\d+:/,"");
								span.className = "formError";
							}
						}
						catch(e){alert(e.description);}
					}
					if (isToView) {
						try{
							this.ErrorItem[1].focus();
							this.ErrorItem[1].scrollIntoView();
						} catch(e){}
					}
					break;
				default :
					alert(this.ErrorMessage.join("\n"));
					break;
				}
				return false;
			}
			return true;
		},
		
		/**
		 * @ 显示正确信息
		 * @param {Number} mode 显示类型
		 */
		ShowOkMsg : function(mode){
			if(this.OkMessage.length > 1){
				mode = mode || 1;
				var okCount = this.OkItem.length;
				switch(mode){
				case 2 :
				/*
					for(var img=1;img<okCount;img++)
						this.OkItem[img].style.color = "green";
				*/
				case 1 :
					//alert(this.OkMessage.join("\n"));
					//this.OkItem[1].focus();
					break;
				case 3 :
					for(var i=1;i<okCount;i++){
						try{
							var span = this.GetNoticeBox(this.OkItem[i]);
							if (span) {
								span.innerHTML = this.OkMessage[i].replace(/\d+:/,"");
								span.className = "formCorrect";
							}
						}
						catch(e){alert(e.description);}
					}
					break;
				default :
					//alert(this.OkMessage.join("\n"));
					break;
				}
				return true;
			}
			return true;
		},
		
		/**
		 * @ 显示错误信息
		 * @param {Object} obj 通知容器的父容器
		 * @param {String} 提示内容
		 */
		limit : function(len,min, max){
			min = min || 0;
			max = max || Number.MAX_VALUE;
			return min <= len && len <= max;
		},
		LenB : function(str){
			return str.replace(/[^\x00-\xff]/g,"**").length;
		},
		
		/**
		 * @ 清空提示内容
		 * @param {Object} obj 提示信息容器的父容器
		 */
		Clear : function(obj) {
			var span = kola.tool.Validator.GetNoticeBox(obj);
			if (span) {
				span.innerHTML = "";
			}
			span.parentNode.removeChild(span);
		},
		
		/**
		 * @ 清空提示内容
		 * @param {Element} elem 提示信息容器的父容器
		 */
		ClearState : function(elem){
			this.Clear(elem);
		},
		
		/**
		 * @ 增加错误提示信息
		 * @param {Number} index 错误信息显示的元素索引
		 */
		AddError : function(index, str){
			this.ErrorItem[this.ErrorItem.length] = this._elements(this.ErrorItem[0])[index];
			this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
		},
		
		/**
		 * @ 增加错误提示信息
		 * @param {Object} obj 错误信息显示的元素索引
		 */
		AddErrorOne : function(obj, str){
			this.ErrorItem[this.ErrorItem.length] = obj;
			this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
		},
		AddOk : function(index, str){
			this.OkItem[this.OkItem.length] = this._elements(this.OkItem[0])[index];
			this.OkMessage[this.OkMessage.length] = this.OkMessage.length + ":" + str;
			//alert(this.OkMessage);
		},
		AddOkOne : function(obj, str){
			this.OkItem[this.OkItem.length] = obj;
			this.OkMessage[this.OkMessage.length] = this.OkMessage.length + ":" + str;
		},
		Exec : function(op, reg){
			return new RegExp(reg,"g").test(op);
		},
		compare : function(op1,operator,op2){
			switch (operator) {
				case "NotEqual":
					return (op1 != op2);
				case "GreaterThan":
					return (op1 > op2);
				case "GreaterThanEqual":
					return (op1 >= op2);
				case "LessThan":
					return (op1 < op2);
				case "LessThanEqual":
					return (op1 <= op2);
				default:
					return (op1 == op2);            
			}
		},
		MustChecked : function(name, min, max){
			var groups = document.getElementsByName(name);
			var hasChecked = 0;
			min = min || 1;
			max = max || groups.length;
			for(var i=groups.length-1;i>=0;i--)
				if(groups[i].checked) hasChecked++;
			return min <= hasChecked && hasChecked <= max;
		},
		IsDate : function(op, formatString){
			formatString = formatString || "ymd";
			var m, year, month, day;
			switch(formatString){
				case "ymd" :
					m = op.match(new RegExp("^\\s*((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})\\s*$"));
					if(m == null ) return false;
					day = m[6];
					month = m[5]--;
					year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
					break;
				case "dmy" :
					m = op.match(new RegExp("^\\s*(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$"));
					if(m == null ) return false;
					day = m[1];
					month = m[3]--;
					year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
					break;
				default :
					break;
			}
			var date = new Date(year, month, day);
	        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());
			function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
		}
	};
	 
	kola.tool.Validator.tip = 'span';
	
	window.KTV = kola.tool.Validator; 
});
