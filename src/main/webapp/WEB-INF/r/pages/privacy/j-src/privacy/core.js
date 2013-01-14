/**
 * @fileoverview  隐私功能显示相关的JS类实现
 * @author  hongwei@sohu-inc.com & Neo www.neoy.cn
 * @version  0.1
 * 
 * @requires 	kola
 */

$register(
	'sohu.privacy.*',
	function(){
		/**
		 * @constructor
		 */
		sohu.privacy.Base = Class.create({			
			initialize:function(){	
			}
		});
		/**
		 * 初始化检查是否有改变的方法
		 */
		sohu.privacy.InitCheck = function(formId,callBackFun){
			sohu.tool.ChangeCheck.initCheck(formId,callBackFun);
		}
	},'sohu.tool.ChangeCheck'
);
			