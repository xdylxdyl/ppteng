/**
 * @fileoverview 用来做各种数据格式转换的工具类,功能有限请按需添加实现
 * @author Neo http://www.neoy.cn
 * @versio v0.1
 * @base kola
 **/
$register(
	'kola.tool.Formatter',
	function(){
		
		kola.tool.Formatter = Class.create({			
			initialize:function(){	
			}
		});
		
		/**
		 * 静态方法将数值按照1024的进率转换成以B,KB,MB,GB为单位的数值字符串
		 * @param {num} Number 
		 * @return {str} 以B,KB,MB,GB为单位的数值字符串 
		 */
		
		 kola.tool.Formatter.formatByte = function(num){
		 	if(isNaN(num)) {
				return false;
			}
			num = parseInt(num);
			var unit = [" B", " KB", " MB", " GB"];
			for(var i = 0; i < unit.length; i += 1) {
				if(num < 1024) {
					num = num + "";
					if(num.indexOf(".") != -1 && num.indexOf(".") != 3) {
						num = num.substring(0,4);
					}
					else {
						num = num.substring(0,3);
					}
					break;
				}
				else {
					num = num/1024;
				}
			}
			//num = (num+"").replace(/(\d*\.\d{0,2})\d*/ig, "$1");
			return num + unit[i];
		}
	}
)