
/**
 * @fileoverview  剪贴板实现网页元素内容的复制粘贴和剪贴
 * @authot  hongweiwang@sohu-inc.com
 * @version  0.1
 * @class    Clipboard
 */

$register(
	'sohu.tool.Clipboard',
	function(){	
	 sohu.tool.Clipboard={
			_DataTxt : null,
			_tooTip  : new sohu.ctrl.ToolTip({fadeIn:true,time:5,fadeOut:true,width:150}),
			copy  :  function(element){
				if(element){
				this._tooTip.element=$(element);
				this._tooTip.setPos();
				var	element=$(element).elements()[0]
					element.select();
				}
				if(kola.Browser.ie){
					_DataTxt = document.selection.createRange()
					_DataTxt.execCommand("Copy");
					this._tooTip.setContent("信息复制成功<br/>您可以使用Ctrl+V粘贴给朋友").show();
				}else{
					alert("该浏览器不支持直接复制，请您尝试手动复制。")
					this._tooTip.setContent("请按Ctrl+c复制").show();		
				}
			},
			paste : function(element){
				if(kola.Browser.ie){
				var element=$(element).elements()[0];
				element.focus();
				_DataTxt = element.createTextRange();
				_DataTxt.execCommand('Paste');
				this._tooTip.setContent("粘贴成功！").show();
				}
				else{
					alert("该浏览器不支持直接粘贴，请您尝试手动粘贴。");
					this._tooTip.setContent("浏览器不支持次操作!").show();	
				}
			},
			cut : function(element){
				if(element){
				var	element=$(element).elements()[0]
					element.select();
				}
				if(kola.Browser.ie){
				_DataTxt = document.selection.createRange();
				_DataTxt.execCommand("Cut");
				this._tooTip.setContent("剪贴成功！").show();
				}
				else{
					alert("该浏览器不支持直接剪贴，请您尝试手动剪贴。")
					this._tooTip.setContent("浏览器不支持次操作!").show();
				}
			}
		}
	},"sohu.ctrl.ToolTip");