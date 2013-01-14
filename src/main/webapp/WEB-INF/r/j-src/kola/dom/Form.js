 /**
 * @fileoverview  提取表单字段类的实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom packages
 */

$register(
	'kola.dom.Form',
	function(){
		kola.dom.Form = Class.create({	
			/**
			 * @constructor 构建一个表单字段选择类
			 * 读取指定表单下的所有字段值组成一个键值对的对象
			 * @param {string or dom element object} form 表单或者包含表单字段的容器（必填项）
			 * @type Fetch Object
			 * @return 返回多有表单字段组成的键值对象
			 */
			initialize: function(form) {
				// 初始化控件配置参数
				this.formEle = $(form);
				this.fields = this.readFields();
			},
			
			/**
			 * 返回所有的表单字段的name和value的组成的对象
			 * 如：{id:1,name:'springwang'}
			 */
			fieldsToObject: function(){
				var object={};
				this.fields.each(function(field) {
					var name = field.attr('name');
					var value = field.val();
					if (value == null) return;
					if (typeof(object[name]) == 'undefined') {
						object[name] =  value.escapeHTML();
					} else {
						object[name] = object[name] + ',' + value.escapeHTML();
					}
				});
				return object;
			},
			
			/**
			 * 返回所有的表单字段的name和value的组成的对象。其与fieldsToObject是有区别的。
			 * 如：{id:1,name:'springwang',checkbox:['value1', 'value2']}
			 */
			val: function() {
				var obj = {};
				this.fields.each(function(field) {
					var name = field.attr('name');
					if (typeof(name) != 'string' || name.length == 0) return;
					
					var value = field.val();
					if (value == null) return;
					
					var t = typeof(obj[name]);
					if (t == 'undefined') {
						obj[name] =  value.toString();
					} else {
						if (t == 'string') {
							obj[name] = [obj[name]];
						}
						obj[name].push(value);
					}
				});
				return obj;
			},
			
			/**
			 * 返回所有的表单字段的name和value的组成的查询字符串
			 * 如：id=1&name=springwang
			 * toParams 方法依赖基础框架对Object对象的扩展
			 */
			fieldsToString: function(){
				return Object.toParams(this.fieldsToObject());
			},
			
			/**
			 * 初始化配置参数
			 */
			readFields: function(){
				var form = this.formEle.elements()[0];
				return $(form.tagName.toLowerCase() == 'form' ? $($A(form.elements)) : 
							[].concat($A(form.getElementsByTagName('input')))
							.concat($A(form.getElementsByTagName('select')))
							.concat($A(form.getElementsByTagName('textarea'))));
			}
		});
		/**
		 * 获取所有的表单字段，以数组返回
		 */
		kola.dom.Form.fields = function(form){
			return new kola.dom.Form(form).readFields();
		};
		
		/**
		 *  静态方法，返回当前表单里的字段对象
		 */
		kola.dom.Form.objFields = function(form){
			return new kola.dom.Form(form).fieldsToObject();
		};
		/**
		 *  静态方法，返回当前表单里的字段的查询字符串形式
		 */
		kola.dom.Form.strFields = function(form){
			return new kola.dom.Form(form).fieldsToString();
		};
		kola.dom.Form.val = function(form){
			return new kola.dom.Form(form).val();
		};
	}
);