/**
 * @fileoverview 用来检测选项有无改变的类实现
 * @author Neo http://www.neoy.cn
 * @versio v0.1
 * @base kola
 **/
$register(
	'kola.tool.ChangeCheck',
	function(){
		kola.tool.ChangeCheck=Class.create({
			/**
			 * @constructor 构建一个类实例
			 * 提供标志变量的存取方法
			 */
			 initialize:function(){
			 	alert('kola.tool.ChangeCheck do not use this way');
			 	//var changeFlag = false;
			 }
			 /*,
			 setFlag:function(){
			 	this.changeFlag = true;
			 },
			 resetFlag:function(){
			 	this.changeFlag = false;
			 },
			 getFlag:function(){
			 	return this.changeFlag;
			 }*/
		});
		
		/**
		 * 静态方法获得form中选项的初始值
		 * @param {string or dom element object} form 表单或者包含表单字段的容器（必填项）
		 * @return {str} 表单中选项键值对字符串 
		 */
		 kola.tool.ChangeCheck.getFormDefault = function(form){
		 	return kola.dom.Form.strFields(form);
		 };
		 
		 /**
		 * 静态方法检查form选项值相对targetAry是否有改变
		 * @param {string or dom element object} form 表单或者包含表单字段的容器（必填项）
		 * @param {string} targetStr 用来检查form中选项值是否改变的参照字符串(必填项)
		 * @return {boolean} 表单是否有改变的标志位true为有改变，false为无改变
		 */
		 kola.tool.ChangeCheck.checkForm = function(form,targetStr){
		 	var valueStr = kola.dom.Form.strFields(form);
		 	return (valueStr == targetStr)?false:true;
		 }
	},
	'kola.dom.Form'
)