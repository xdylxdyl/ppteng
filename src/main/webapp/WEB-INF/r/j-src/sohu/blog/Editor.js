/**
 * @fileoverview  SNS blog 日志编辑器实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires
 */

// 这里使用包的方式加载
$register('sohu.blog.Editor',function(){},'sohu.comment.*,sohu.ctrl.MultiPhotoSelector');
		

//	浏览器的类型判断
window.isIE = (navigator.appName == "Microsoft Internet Explorer");
if(window.isIE) {
	if(navigator.userAgent.indexOf("Opera")>-1) window.isIE = null;
}
else{
	if(navigator.userAgent.indexOf("Gecko")==-1) window.isIE = null;
}

Function.prototype.bindAsEventListener2 = function(object,info) {
  var __method = this;
  return function(event) {
    return __method.call(object, event || window.event,info);
  }
};

/**
 * $的替换方法
 * @param {} element
 * @return {}
 */
function $get(element) {
  if (typeof(element) == 'string')
    element = document.getElementById(element);
  return element;
}

function $F(element){
	element = $get(element)
	var tag = element.tagName.toLowerCase();
	if (tag == 'input') {
		switch (element.type) {
			case 'checkbox':
			case 'radio':
				return element.checked ? true : false;
				break;
		}
	}
	return element.value;
};

var Event = {};
Event.observe = function(o, t, f){ 
	if (o.addEventListener) o.addEventListener(t, f, false);
	else if (o.attachEvent) o.attachEvent('on'+ t, f);
	else o['on'+ t] = f;
}

Event.stopObserving = function (o, t, f) {
	if (o.removeEventListener) o.removeEventListener(t, f, false);
	else if (o.detachEvent) o.detachEvent('on'+ t, f);
	else o['on'+ t] = null;
};
Event.stop = function(e){
	e.cancelBubble = true;
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	e.returnValue = false;
	if (e.preventDefault) {
		e.preventDefault();
	}
};

Event.element = function(e){
	return e.target || e.srcElement;
};

function Dom(){}

Dom.create = function(tag,class2,parent)
{
	var element = document.createElement(tag);
	if(class2) element.className = class2;
	if(!parent) parent = document.body;
	parent.appendChild(element);
	return element;
};

Dom.show = function(element)
{
	element.style.display = "block";
};
Dom.hide = function(element)
{
	element.style.display = "none";
};

Dom.getOffsetRect = function(element)
{
	var rect = 
	{
		left:0,
		top:0,
		width:0,
		height:0,
		bottom:0,
		right:0
	};
	if(element == document)
	{
		element = document.documentElement;
		rect.left = element.scrollLeft;
		rect.top = element.scrollTop;
		if(window.isIE)
		{
			rect.width = element.offsetWidth;
			rect.height = element.offsetHeight;
		}
		else
		{
			rect.width = window.innerWidth;
			rect.height = window.innerHeight;
		}
	}
	else
	{
		rect.left = element.offsetLeft;
		rect.top = element.offsetTop;
		if(element == document.body && !window.isIE)
		{
			element = document.documentElement;
			rect.width = element.scrollWidth;
			rect.height = element.scrollHeight;
		}
		else
		{
			rect.width = element.offsetWidth;
			rect.height = element.offsetHeight;
		}
	}
	rect.bottom = rect.top + rect.height;
	rect.right = rect.left + rect.width;
	return rect;
};

Dom.getRect = function(element)
{
	var rect = Dom.getOffsetRect(element);
	var parent = element.offsetParent;
	while(parent)
	{
		var tempRect = Dom.getOffsetRect(parent);
		rect.left += tempRect.left;
		rect.top += tempRect.top;
		parent = parent.offsetParent;
	}
	rect.bottom = rect.top + rect.height;
	rect.right = rect.left + rect.width;
	return rect;
};

Dom.setPosition = function(element,position)
{
	element.style.left = position.left + "px";
	element.style.top = position.top + "px";
};


var Editor = new Object();

Editor.editorWin = false;
Editor.editorObj = false;
Editor.cache = false;
Editor.coder = false;
Editor.range = null;
Editor.selection = false;
Editor.rangeCache = false;
Editor.viewState = "view";

Editor.init = function (parent)
{
	this.parent = $get(parent);
	// 保存编辑时的初始内容
	Editor.initContent = $get("entryContent").value;
	Editor.initFrame();
	Editor.menu = $get("menuContainer");
	Editor.coder = $get("entryContent");
	if(window.isIE == null)
	{
		alert("您现在所使用的浏览器不支持此编辑器很多高级功能，建议您采用IE或Firefox！");
		//Dom.show(Editor.coder);
		Editor.menu.style.height = "0px";
	}
	else
	{
		//if(window.isIE) $get(recoverName).style.display = "";
		Editor.container = $get("editorContainer");
		Editor.txtContainer = $get("txtEditorContainer");
		Editor.ifrContainer = $get("ifrEditorContainer");
		// 用于编辑的时候初始化日志内容
		Editor.coder.value = Editor.initContent;
		Editor.initElements();
		Editor.focusContent();
	}
};


Editor.initFrame = function(){
	this.parent.innerHTML = '<div class="all_container">'+
								'<div id="menuContainer" class="menu_container"></div>'+
								'<div id="editorContainer" class="editor_container">'+
									'<div id="txtEditorContainer" class="editor_coder">' +
										'<textarea id="entryContent" name="content" style="display:none;"></textarea>' +									'</div>'+
									'<div id="ifrEditorContainer" class="editor"></div>'+
								'</div>'+
							'</div>';
};

Editor.initTools = function()
{
	Editor.controls = new Object();
	
	var toolsData = Config.tool.data;
	var css = Config.tool.css;
	
	var jump = false;
	
	for(var i=0;i<toolsData.length;i++)
	{
		
		var part = Dom.create("div",css.part,Editor.menu);
		var partData = toolsData[i];
		
		for(var j=0;j<partData.length;j++)
		{
			Dom.create("div",css.newLine,part);
			var row = Dom.create("div",css.row,part);
			var rowData = partData[j];
		
			for(var k=0;k<rowData.length;k++)
			{
				var toolData = rowData[k];
				var type = toolData[0];
				var controlId = toolData[1];
				if(type == "line")
				{
					var src = Config.tool.rPath + controlId + ".gif";
					var tool = Dom.create("div",css.tool,row);
					var img = Dom.create("img",false,tool);
					img.src = src;
				}
				else
				{
					var name = toolData[2];
					var downCall = toolData[3];
					var upCall = toolData[4];
					var selectCall = toolData[5];
					var cancelCall = toolData[6];
					
					var tool = Dom.create("div",css.tool,row);
					Editor.controls[controlId] = tool;
					
					tool.sohu = {};
					tool.sohu.id = controlId;
					tool.sohu.type = type;
					tool.sohu.state = 0;
					
					if(type == "img")
					{
						var src = Config.tool.rPath + controlId + ".gif";
						var img = Dom.create("img",false,tool);
						img.src = src;
						img.alt = name;
						img.title = name;
						
						tool.sohu.tool = img;
					}
					else
					{
						var toolCss = controlId + "Select";
						var tool2 = Dom.create("div",controlId,tool);
						
						if(window.isIE)
						{
							tool.sohu.tool = new Array();
							tool.sohu.tool.selectedIndex = 0;
							tool.sohu.tool[0] = Dom.create("div",toolCss,tool2);
							tool.sohu.tool[0].sohuValue = null;
							var texts,values;
							if(controlId == "fontname")
							{
								texts = Config.lister.fontNameData.text;
								values = Config.lister.fontNameData.value;
								tool.sohu.tool[0].innerHTML = "字体";
							}
							else
							{
								texts = Config.lister.fontSizeData.text;
								values = Config.lister.fontSizeData.value;
								tool.sohu.tool[0].innerHTML = "字号";
							}
							var i = 0;
							for(i=0;i<texts.length;i++)
							{
								var newElement = Dom.create("div",toolCss,tool2);
								newElement.style.display = "none";
								newElement.innerHTML = texts[i];
								newElement.sohuValue = values[i].toString();
								tool.sohu.tool[i+1] = newElement;
							}
						}
						else
						{
							jump = true;
							tool.sohu.tool = Dom.create("div",toolCss,tool2);
						}
					}
					
					tool.sohu.downCall = downCall;
					if(upCall)
					{
						tool.sohu.upCall = upCall;
						if(selectCall) tool.sohu.selectCall = selectCall;
						if(cancelCall) tool.sohu.cancelCall = cancelCall;
					}
					else tool.sohu.upCall = downCall;
					
					Event.observe(tool,"mouseover",Editor.toolMouseOver.bind(Editor,tool));
					Event.observe(tool,"mouseout",Editor.toolMouseOut.bind(Editor,tool));
					Event.observe(tool,"mousedown",Editor.toolMouseDown.bind(Editor,tool));
					Event.observe(tool,"mouseup",Editor.toolMouseUp.bindAsEventListener2(Editor,tool));
				}
			}
		}
		if(jump)
		{
			jump = false;
			i += 4;
		}
	}
};
Editor.initElements = function()
{
	var css = Config.tool.css;
	//Dom.show(Editor.coder);
	Dom.hide(Editor.txtContainer);
	
	Editor.initTools();
	Editor.menu.onselectstart = function(){return false;};
	
	window.editor_sohu = {};
	
	var iframeTag = window.isIE?"<iframe frameborder='0'></iframe>":"iframe";
	Editor.editorObj = Dom.create(iframeTag,'',Editor.ifrContainer);
	Editor.editorWin = Editor.editorObj.contentWindow;
	
	Editor.editorObj.style.height = '330px';
	Editor.coder.style.height = '330px';
	
	var doc = Editor.editorWin.document;
	doc.open();
	var html = '';
	html += '<html>';
	html += "<head>";
	html += '<meta http-equiv="Content-Type" content="text/html; charset=gbk" />';
	html += "<style> *{line-height:130%;}body{font-size:13px;line-height:130%;font-family:'宋体',Verdana,Arial,Helvetica,sans-serif;}img{border:0;}</style>";
	html += "</head>";
	html += "<body>";
	if(!window.isIE) html += Editor.coder.value;
	html += "</body>";
	html += "</html>";
	doc.write(html);
	doc.close();
		
	if(window.isIE)
	{
		Editor.iCache = Dom.create("iframe",css.cache,Editor.ifrContainer);
		Editor.iCacheDoc = Editor.iCache.contentWindow.document;
		Editor.iCacheDoc.open();
		Editor.iCacheDoc.write("<html><head><style>body{font-family:'宋体';}</style></head><body></body></html>");
		Editor.iCacheDoc.close();
		
		doc.body.contentEditable = true;
		
		Event.observe(Editor.editorWin.document.body,"beforedeactivate",Editor.cacheRange);
		Event.observe(Editor.getDocument().body,"paste",Editor.shortcutPaste);
		Event.observe(Editor.editorWin.document,"selectionchange",Editor.checkAllState);
		Editor.editorWin.document.body.innerHTML = Editor.coder.value;
	}
	else
	{
		Editor.bindLoadFF();
	}
	/*
	window.onunload = function(){
		
	};
	*/
	Editor.cache = Dom.create("div",css.cache,document.body);
	
	var footer = Dom.create("div",Config.tool.css.footer,Editor.container);
	footer.innerHTML =  '<div class="msg hide" id="msgTip"></div>'+
						'<span style="float:right;">'+
							'<div class="resize"></div>'+
						'</span>';
	Editor.wideAreaControler = footer.firstChild.nextSibling.firstChild;
	
	var editorWidth = parseInt(Dom.getOffsetRect(Editor.editorObj).width);
	$call(function(){
		new kola.anim.Resize({
			element: Editor.editorObj,
			min: [editorWidth, 100],
			max: [editorWidth, 1500],
			btn:{
				btnSE: Editor.wideAreaControler
			}
		});},'kola.anim.Resize');
};

Editor.bindLoadFF = function()
{
	Editor.setDesignMode(true);
	Event.observe(Editor.editorWin.document.body,"mouseup",Editor.checkAllState);
	Event.observe(Editor.editorWin.document,"keypress",Editor.checkAllState);
};

Editor.setContent = function()
{
	if(Editor.txtContainer.style.display == "none"  || Editor.coder.style.display == "none")
	{
		Editor.coder.value = Editor.editorWin.document.body.innerHTML;
		if(Editor.coder.value.trim() == '<br>'){
			Editor.coder.value = '';
		}
	}
};

Editor.validate = function(){
	Editor.setContent();
	var titleWords = $F("entryTitle").byteLength();
	var contentWords = $F(Editor.coder).replace('<br>','').byteLength();
	
	if(titleWords < 2 || titleWords > 100){
		$get("entryTitle").focus();
		return [false,'日志标题必须在 2 到 100 个字符之间'];
	}
	if(contentWords < 4 || contentWords > 60000){
		return [false,'日志内容必须在 4 到 60000 个字符之间'];
	}
	return [true,''];
};

Editor.checkAllState = function()
{
	if(!Editor.isChecking)
	{
		Editor.isChecking = true;
		if(!Editor.stateArray)
		{
			Editor.stateChecking = true;
			if(window.isIE)
			{
				Editor.stateArray = [
					"Paste","Cut","Copy","FontName","FontSize","Bold","Italic","Underline","JustifyLeft","InsertOrderedList","InsertUnorderedList","Undo"];
			}
			else
			{
				Editor.stateArray = ["fontname","fontsize","bold","italic","underline","justifyleft","insertorderedlist","insertunorderedlist"];
			}
		}
		try
		{
			var range = Editor.editorWin.document;
			if(range)
			{
				var i = 0;
				for(i=0;i<Editor.stateArray.length;i++)
				{
					Editor.checkCommandState(Editor.stateArray[i],range);
				}
			}
		}
		catch(e){}
		finally
		{
			Editor.isChecking = false;
		}
	}
};
Editor.checkCommandState = function(command,range)
{
	var returnValue = false;
	var commandLower = command.toLowerCase();
	var element = Editor.controls[commandLower];
	if(commandLower == "insertorderedlist") element = Editor.controls["orderlist"];
	else if(commandLower == "insertunorderedlist") element = Editor.controls["unorderlist"];
	
	switch(commandLower)
	{
		case "cut":
		case "copy":
		case "paste":
		{
			returnValue = range.queryCommandEnabled(command);
			if(returnValue) Editor.setState(element,0);
			else Editor.setState(element,-3);
			break;
		}
		case "fontname":
		case "fontsize":
		{
			returnValue = range.queryCommandValue(command);
			if(window.isIE)
			{
				var childs = element.sohu.tool;
				var oldSelectedIndex = childs.selectedIndex;
				if(childs[oldSelectedIndex].sohuValue != returnValue)
				{
					var i = 0, hasValue = false;
					if(returnValue != null)
					{
						for(i=1;i<childs.length;i++)
						{
							if(childs[i].sohuValue == returnValue)
							{
								hasValue = true;
								childs.selectedIndex = i;
							}
						}
					}
					if(!hasValue) childs.selectedIndex = 0;
					if(childs.selectedIndex != oldSelectedIndex)
					{
						childs[oldSelectedIndex].style.display = "none";
						childs[childs.selectedIndex].style.display = "";
					}
				}
			}
			else
			{
				if(commandLower == "fontname")
				{
					if(returnValue == "") returnValue = "字体";
					else
					{
						returnValue = returnValue.replace(/'/g,"");
						var dotIndex = returnValue.indexOf(",");
						if(dotIndex > 0) returnValue = returnValue.substr(0,dotIndex);
						dotIndex = returnValue.indexOf("_");
						if(dotIndex > 0) returnValue = returnValue.substr(0,dotIndex);
					}
				}
				else
				{
					if(returnValue == "") returnValue = "字号";
					else
					{
						var i = 0,hasValue = false;
						var values = Config.lister.fontSizeData.value;
						for(i=0;i<values.length;i++)
						{
							if(values[i] == returnValue)
							{
								returnValue = Config.lister.fontSizeData.text[i];
								hasValue = true;
								break;
							}
						}
						if(!hasValue) returnValue = "字号";
					}
				}
				element.sohu.tool.innerHTML = returnValue;
			}
			break;
		}
		case "justifyleft":
		case "justifycenter":
		case "justifyright":
		{
			var left=0,center=0,right=0;
			if(window.isIE)
			{
				left = range.queryCommandState("JustifyLeft")?-2:0;
				center = range.queryCommandState("JustifyCenter")?-2:0;
				right = range.queryCommandState("JustifyRight")?-2:0;
			}
			else
			{
				returnValue = range.queryCommandValue(command);
				if(returnValue == "left") left = -2;
				if(returnValue == "center") center = -2;
				if(returnValue == "right") right = -2;
			}
			Editor.setState(Editor.controls["justifyleft"],left);
			Editor.setState(Editor.controls["justifycenter"],center);
			Editor.setState(Editor.controls["justifyright"],right);
			break;
		}
		case "undo":
		{
			returnValue = Editor.editorWin.document.queryCommandEnabled(command);
			if(returnValue) Editor.setState(element,0);
			else Editor.setState(element,-3);
			break;
		}
		default:
		{
			returnValue = range.queryCommandState(command);
			if(returnValue) Editor.setState(element,-2);
			else Editor.setState(element,0);
			break;
		}
	}
	return returnValue;
};
Editor.command = function(commandText,option)
{
	var returnValue = false;
	if(Editor.isView())
	{
		Editor.checkRange();
		if(option && option=="#" && window.isIE)
		{
			Editor.removeColor(commandText);
		}
		else
		{
			try
			{
				if(!window.isIE) commandText = commandText.toLowerCase();
				Editor.editorWin.document.execCommand(commandText,false,option);
				if(!window.isIE) Editor.focusContent();
			}catch(e){}
		}
	}
	return returnValue;
};
Editor.getText = function()
{
	var range = Editor.getRange();
	if(range)
	{
		if(Editor.selection.type.toLowerCase() == "control")
		{
			html = range.item(0).innerHTML;
		}
		else
		{
			html = range.text;
		}
		if(!html) html = "";
	}	
	return html;
};
Editor.removeColor = function(command)
{
	var html = Editor.getText();
	if(html.length > 0)
	{
		var element = Editor.getSpecialElement("font",true);
		if(element && element.innerHTML == html)
		{
			if(command == "ForeColor")
			{
				element.color = "";
			}
			else
			{
				element.style.backgroundColor = "";
			}
		}
	}
	else
	{
		Editor.editorWin.document.execCommand(command,false,"#");
	}
};
Editor.undo = function()
{
	Editor.command("Undo",1);
	return -1;
};

Editor.checkFocus = function()
{
	if(window.editor_sohu && window.editor_sohu.win && window.editor_sohu.win.win) 
	{
		window.editor_sohu.win.win.focus();
	}
};

Editor.setState = function(element,stateValue,controlId)
{
	if(!element) element = Editor.controls[controlId];
	if(element)
	{
		element.sohu.state = stateValue;
		if(element.sohu.type != "select")
		{
			switch(stateValue)
			{
				case 1:
					element.className = Config.tool.css.toolOver;
					break;
				case 0:
					element.className = Config.tool.css.tool;
					break;
				case -1:
				case -2:
					element.className = Config.tool.css.toolDown;
					break;
				case -3:
					element.className = Config.tool.css.toolDisable;
					break;
			}
		}
	}
};
Editor.toolMouseOver = function(element)
{
	if(Editor.isView() && element.sohu.state == 0)
	{
		Editor.setState(element,1);
	}
};
Editor.toolMouseOut = function(element)
{
	if(Editor.isView() && (element.sohu.state == 1 || element.sohu.state == -1))
	{
		Editor.setState(element,0);
	}
};
Editor.toolMouseDown = function(element)
{
	if(Editor.isView() && element.sohu.state != -3)
	{
		if(Lister.now) 
		{
			if(!(element.sohu.lister && element.sohu.lister == Lister.now))
			{
				Lister.now.cancel(false);
			}
		}
		
		if(element.sohu.state != -1 && element.sohu.state != -2) Editor.setState(element,-1);
	}
};
Editor.toolMouseUp = function(e,element)
{
	if(Editor.isView() && element.sohu.state != -3)
	{
		var newState = 1;
		if(element.sohu.state == -1) newState = element.sohu.downCall.call(Editor);
		if(element.sohu.state == -2) newState = element.sohu.upCall.call(Editor);
		Editor.setState(element,newState);
		Event.stop(e);
		
		Editor.checkAllState();
	}
};
Editor.blankUpCall = function(){return 0;};
Editor.blankCall = function(returnValue)
{
	if(typeof(returnValue) != "undefined") return returnValue;
};
Editor.normalCancelCall = function(controlId,state)
{
	var newState = 0;
	if(state) newState = state;
	Editor.setState(null,newState,controlId);
};
Editor.showFontNameList = function()
{
	var element = Editor.controls["fontname"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,Config.lister.fontNameData,1,Config.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideFontNameList = function()
{
	var element = Editor.controls["fontname"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setFontName = function(fontName)
{
	if(fontName) Editor.command("FontName",fontName);
	Editor.setState(null,0,"fontname");
};
Editor.cancelFontName = function()
{
	Editor.setState(null,0,"fontname");
};
Editor.showFontName = function(fontName,fontValue)
{
	var element = Editor.controls["fontname"].sohu.tool;
	var str = "字体";
	if(fontName) str = fontName;
	else if(fontValue)
	{
		var i = 0;
		var fontNameData = Config.lister.fontNameData
		for(i=0;i<fontNameData.value.length;i++)
		{
			if(fontNameData.value[i] == fontValue)
			{
				str = fontNameData.text[i];
			}
		}
	}
	element.innerHTML = str;
};
Editor.showFontSizeList = function()
{
	var element = Editor.controls["fontsize"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,Config.lister.fontSizeData,1,Config.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideFontSizeList = function()
{
	var element = Editor.controls["fontsize"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setFontSize = function(fontSize)
{
	if(fontSize) Editor.command("FontSize",fontSize);
	Editor.setState(null,0,"fontsize");
};
Editor.cancelFontSize = function()
{
	Editor.setState(null,0,"fontsize");
};
Editor.showFontSize = function(fontName,fontValue)
{
	var element = Editor.controls["fontsize"].sohu.tool;
	var str = "字号";
	if(fontName) str = fontName;
	else if(fontValue)
	{
		var i = 0;
		var fontNameData = Config.lister.fontSizeData
		for(i=0;i<fontNameData.value.length;i++)
		{
			if(fontNameData.value[i] == fontValue)
			{
				str = fontNameData.text[i];
			}
		}
	}
	element.innerHTML = str;
};
Editor.showForeColorList = function()
{
	var element = Editor.controls["forecolor"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,Config.lister.colorData,6,Config.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideForeColorList = function()
{
	var element = Editor.controls["forecolor"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setForeColor = function(foreColor)
{
	if(foreColor) Editor.command("ForeColor",foreColor);
	Editor.setState(null,0,"forecolor");
};
Editor.cancelForeColor = function()
{
	Editor.setState(null,0,"forecolor");
};
Editor.showBackColorList = function()
{
	var element = Editor.controls["backcolor"];
	if(!element.sohu.lister) element.sohu.lister = new Lister(element,Config.lister.colorData,6,Config.lister.option);
	element.sohu.lister.show();
	return -2;
};
Editor.hideBackColorList = function()
{
	var element = Editor.controls["backcolor"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};
Editor.setBackColor = function(backColor,element)
{
	if(backColor)
	{
		if(window.isIE) Editor.command("BackColor",backColor);
		else Editor.command("hilitecolor",backColor);
	}
	Editor.setState(null,0,"backcolor");
};
Editor.cancelBackColor = function()
{
	Editor.setState(null,0,"backcolor");
};

Editor.getDocument = function()
{
	return Editor.editorWin.document;
};

Editor.setDesignMode = function (canEdit)
{
	Editor.getDocument().designMode = canEdit?"On":"Off";
};

Editor.canEdit = function()
{
	return (Editor.viewState != "changing");
};
Editor.isView = function()
{
	return (Editor.viewState == "view");
};
Editor.showBrow = function()
{
	var element = Editor.controls["emot"];
	if(!element.sohu.lister){
		element.sohu.lister = new Lister(element,Config.lister.emotData,6,Config.lister.option);
		Editor.emote = new sohu.ctrl.Emote({parent:$get('emotBox'),onSelect: Editor.addBrow});
		Editor.emote.setPos({left:1,top:1});
		Editor.emote.emBox.attr('class','');
	}
	Editor.emote.show();
	element.sohu.lister.show();
	return -2;
};

Editor.hideBrow = function()
{
	var element = Editor.controls["emot"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};

Editor.addBrow = function(browUbb,browtTag)
{
	if(browtTag)
	{
		var html = "&nbsp;" + browtTag + "&nbsp;";
		Editor.pasteHTML(html);
	}
	Editor.setState(null,0,"emot");
	Dom.hide($get('lister_emot'));
};

Editor.cancelBrowCall = function()
{
	Editor.setState(null,0,"emot");
};
Editor.fastPasteHTML = function(html)
{
	if(window.isIE)
	{
		var range = Editor.editorWin.document.selection.createRange();
		if(range) range.pasteHTML(html);
	}
	else
	{
		var range = Editor.editorWin.document;
		range.execCommand("inserthtml",null,html);
	}
};
Editor.pasteHTML = function(html,hasRange)
{
	var returnValue = false;
	if(Editor.isView())
	{
		var range = null;
		if(hasRange){
			range = Editor.range;
		} else{
			range = Editor.getRange();
		}
		if(range)
		{
			if(window.isIE) 
			{
				if(Editor.selection.type.toLowerCase() == "control")
				{
					var tempRange = Editor.editorWin.document.body.createTextRange();
					tempRange.moveToElementText(range.item(0));
					range = tempRange;
				}
				range.pasteHTML(html);
				range.select();
				//Editor.range = null;
			}
			else 
			{
				Editor.command("inserthtml",html);
				Editor.focusContent();
			}
			returnValue = true;
		}
		else
		{
			alert("发生错误，请重新操作！");
		}
	}
	return returnValue;
};

Editor.getClipboardData = function()
{
	Editor.iCacheDoc.body.innerHTML = window.clipboardData.getData('text');
	return Editor.iCacheDoc.body.innerHTML;
	
};

Editor.clearFromWord = function(html)
{
	html = html.replace(/<\/?SPAN[^>]*>/gi, "" );
	html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
	html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3");
	html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
	html = html.replace(/<\\?\?xml[^>]*>/gi, "");
	html = html.replace(/<\/?\w+:[^>]*>/gi, "");
	html = html.replace(/<\/?\w+:[^>]*>/gi, "");
	html = html.replace(/<\/?\w+:[^>]*>/gi, "");
	return html;
};



Editor.getSelectedHTML = function()
{
	var html = "";
	var range = Editor.getRange();
	if(range) 
	{
		if(window.isIE)
		{
			if(Editor.selection.type.toLowerCase() == "control")
			{
				html = range.item(0).outerHTML;
			}
			else
			{
				html = range.htmlText;
			}
			if(!html) html = "";
		}
		else
		{
			if(Editor.selection.rangeCount > 0)
			{
				var tRange = Editor.selection.getRangeAt(0);
				var dFragment = tRange.cloneContents();
				Editor.cache.innerHTML = "";
				Editor.cache.appendChild(dFragment);
				html = Editor.cache.innerHTML;
				Editor.cache.innerHTML = "";
			}
		}
		
	}
	return html;
};

Editor.setBold = function()
{
	var newState = Editor.command("Bold")?-2:0;
	return newState;
};
Editor.setItalic = function()
{
	var newState = Editor.command("Italic")?-2:0;
	return newState;
};
Editor.setUnderline = function()
{
	var newState = Editor.command("Underline")?-2:0;
	return newState;
};
Editor.copy = function()
{
	if(window.isIE) 
	{
		Editor.command("Copy");
		return -1;
	}
	else
	{
		alert("提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + C]！");
		return 0;
	}
};
Editor.cut = function()
{
	if(window.isIE)
	{
		Editor.command("Cut");
		return -1;
	}
	else
	{
		alert("提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + X]！");
		return 0;
	}
};
Editor.shortcutPaste = function()
{
	Editor.paste();
	return false;
};
Editor.paste = function()
{
	if(window.isIE) 
	{
		if(Editor.isView())
		{
			var pasteData = Editor.getClipboardData();
			if(pasteData && pasteData.length > 0)
			{
				var wordPattern = /<\w[^>]* class="?MsoNormal"?/gi;
				if(wordPattern.test(pasteData))
				{
					if(confirm("您现在是从word中复制，是否清除其中的格式？\r\n\r\n小提示：清除格式可以使编辑更为方便！"))
					{
						pasteData = Editor.clearFromWord(pasteData);
					}
				}
				Editor.pasteHTML(pasteData);
			}
		}
		return -1;
	}
	else
	{
		alert("提示：您现在所使用的浏览器不支持此操作，请使用快捷键 [Ctrl + V]！");
		return 0;
	}
};

Editor.setElementJustify = function(element,value)
{
	switch(value)
	{
		case "left":
			align = "FLOAT: left; MARGIN: 0px 10px 10px 0px";
			break;
		case "center":
			align = "DISPLAY: block; MARGIN: 0px auto 10px; TEXT-ALIGN: center";
			break;
		case "right":
			align = "FLOAT: right; MARGIN: 0px 0px 10px 10px";
			break;
		default:
			align = "DISPLAY: block";
			break;
	}
	element.style.cssText = align;
};

Editor.setLeft = function()
{
	var element = Editor.getSpecialElement(["img","embed"]);
	if(element) Editor.setElementJustify(element,"left");
	else Editor.command("JustifyLeft");
	//	Editor.command("JustifyLeft");
	return -1;
};
Editor.setCenter = function()
{
	var element = Editor.getSpecialElement(["img","embed"]);
	if(element) Editor.setElementJustify(element,"center");
	else Editor.command("JustifyCenter");
	//	Editor.command("JustifyCenter");
	return -1;
};
Editor.setRight = function()
{
	var element = Editor.getSpecialElement(["img","embed"]);
	if(element) Editor.setElementJustify(element,"right");
	else Editor.command("JustifyRight");
	//	Editor.command("JustifyRight");
	return -1;
};
Editor.setOrder = function()
{
	Editor.command("InsertOrderedList");
	return -1;
};
Editor.setUnorder = function()
{
	Editor.command("InsertUnorderedList");
	return -1;
};
Editor.setIndent = function()
{
	Editor.command("Indent");
	return -1;
};
Editor.setOutdent = function()
{
	Editor.command("Outdent");
	return -1;
};
Editor.showLink = function()
{
	var controler = Editor.controls["url"];
	
	var element = controler;
	if(!element.sohu.lister){
		element.sohu.lister = new Lister(element,Config.lister.urlData,6,Config.lister.option);
	}
	Editor.range = Editor.getRange();
	Editor.Url.init();
	element.sohu.lister.show();
	
	return -2;
};

Editor.hideLink = function()
{
	var element = Editor.controls["url"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	Editor.setState(null,0,"url");
	return 1;
};


Editor.clearLink = function()
{
	if(window.isIE)
	{
		Editor.command("Unlink");
	}
	else
	{
		var html = "";
		var linkElement;
		if(window.isIE) linkElement = Editor.getSpecialElement("a",true);
		else linkElement = Editor.getSpecialElement("a",false);
		
		if(linkElement)
		{
			html = linkElement.innerHTML;
			if(!window.isIE)
			{
				var tempRange = Editor.editorWin.document.createRange();
				tempRange.selectNode(linkElement);
				var sel = Editor.editorWin.getSelection();
				if(sel) 
				{
					sel.removeAllRanges();
					sel.addRange(tempRange);
				}
			}
			Editor.pasteHTML(html);
		}
	}
	Editor.hideLink();
};
Editor.cancelLinkCall = function()
{
	Editor.clearLink();
	
};

Editor.addLink = function(obj)
{
	if(obj)
	{
		var html = "";
		
		var linkElement = Editor.getSpecialElement("a");
		
		if(linkElement) html = linkElement.innerHTML;
		else html = Editor.getSelectedHTML();
		
		if(linkElement)
		{
			linkElement.href = obj.link;
			linkElement.target = obj.target;
		}
		else
		{
			html = '<a href="' + obj.link + '" target="' + obj.target + '">' + obj.text + '</a>';
			Editor.pasteHTML(html,true);
		}
	}
	Editor.hideLink();
};
Editor.showImg = function()
{
	var controler = Editor.controls["simg"];
	var imgElement = Editor.getSpecialElement("img",true);
	
	var element = controler;
	if(!element.sohu.lister){
		element.sohu.lister = new Lister(element,Config.lister.simgData,6,Config.lister.option);
		Editor.imageSelector = new sohu.ctrl.MultiPhotoSelector($get('imageSelector'),{
				selectCallback: Editor.addImg,
				cancelCallback: Editor.cancelImgCall
			}
		);
	}
	Editor.range = Editor.getRange();
	Editor.imageSelector.show();
	element.sohu.lister.show();
	
	return -2;
};

Editor.hideImg = function()
{
	var element = Editor.controls["simg"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};

Editor.cancelImgCall = function()
{
	Editor.setState(null,0,"simg");
	Editor.hideImg();
};

Editor.addImg = function(imgs)
{
	if(imgs)
	{
		var align = "float:left; margin:0px 10px 10px 0px;max-width:600px;",
			html = '';
		
		//	要插入多张图片
		for(var i=0;i<imgs.length;i++)
		{
			html += '<img src="'+imgs[i]+'" border="0" style="'+align+'" />';
		}	
		Editor.pasteHTML(html,true);
	}
	Editor.hideImg();
}

Editor.showMv = function()
{
	var controler = Editor.controls["svideo"];
	var mvElement = Editor.getSpecialElement("embed",true);
	
	var element = controler;
	if(!element.sohu.lister){
		element.sohu.lister = new Lister(element,Config.lister.svideoData,6,Config.lister.option);
	}
	Editor.range = Editor.getRange();
	element.sohu.lister.show();
		
	return -2;
};

Editor.hideMv = function()
{
	var element = Editor.controls["svideo"];
	if(element.sohu.lister) element.sohu.lister.cancel(false);
	return 1;
};

Editor.cancelMvCall = function()
{
	Editor.setState(null,0,"svideo");
	Editor.hideMv();
};
Editor.addMv = function(mvObj)
{
	if(mvObj)
	{
		if (mvObj.type == "net") {
			var mvElement = Editor.getSpecialElement("embed");
			
			var align = "float: left; margin: 0px 10px 10px 0px";
			
			var mediaFile = mvObj.videoUrl.substring(mvObj.videoUrl.lastIndexOf('.')+1).toLowerCase();
			var mediaType = "video";
			if ( /mp3|wma|wav|mid/.test(mediaFile) ) mediaType = 'audio';
			var width = "";
			var height = "";
			if(mvObj.videoWidth == "") width = (mediaType == "audio")?300:480;
			else width = mvObj.videoWidth;
			if(mvObj.videoHeight == "") height = (mediaType == "audio")?45:418;
			else height = mvObj.videoHeight;
			
			if(mvElement)
			{
				var range = Editor.getRange();
				mvElement.src = mvObj.videoUrl;
				mvElement.style.cssText = align;
				mvElement.width = width;
				mvElement.height = height;
				mvElement.autostart = (mvObj.videoAutostart=="true")?true:false;
				mvElement.loop = (mvObj.videoLoop=="true")?true:false;
			}
			else
			{
				var start = mvObj.videoAutostart;
				var loop = mvObj.videoLoop;
				
				var html = '<embed style="' + align + '" src="' + mvObj.videoUrl + '" width="' + width + '" height="' + height + '"  loop="' + loop + '" autostart="' + start + '"></embed>';
				Editor.pasteHTML(html,true);
			}
		} 
	}
	Editor.hideMv();
};
Editor.setView = function()
{
	if(Editor.viewState != "changing")
	{
		var oldViewState = Editor.viewState;
		Editor.viewState = "changing";
		var newViewState = (oldViewState=="view")?"code":"view";
		
		if(oldViewState != newViewState)
		{
			if(newViewState == "code")
			{
				Editor.viewControler.checked = true;
				
				Editor.coder.value = Editor.editorWin.document.body.innerHTML;
				
				Dom.hide(Editor.ifrContainer);
				//Dom.show(Editor.txtContainer);
				Editor.menu.style.filter = "Alpha(Opacity=30)";
				Editor.menu.style.MozOpacity = "0.3";
				
				Editor.coder.focus();
			}
			else if(newViewState == "view")
			{
				Editor.viewControler.checked = false;
				
				Editor.editorWin.document.body.innerHTML = Editor.coder.value;
				
				Dom.hide(Editor.txtContainer);
				Dom.show(Editor.ifrContainer);
				Editor.menu.style.filter = "Alpha(Opacity=100)";
				Editor.menu.style.MozOpacity = "1";
				
				if(window.isIE)
				{
					var range = Editor.editorWin.document.body.createTextRange();
					range.setEndPoint("EndToStart",range);
					range.select();
				}
				/* 11.1
				Editor.editorObj.focus();
				*/
				else Editor.editorWin.document.designMode = "on";
				if(Editor.editorObj.focus) Editor.editorObj.focus();
			}
		}
		Editor.viewState = newViewState;
	}
};

Editor.getDateStr = function(timestamp) {
	var date = new Date(parseInt(timestamp));
	var month = date.getMonth() + 1;
	month = (month>9?"":"0") + month;
	var day= (date.getDate()>9?"":"0") + date.getDate();
	var str = date.getFullYear() + "-" + month + "-" + day;
	return str;
};
Editor.focusContent = function() {
	Editor.editorWin.focus();
};

Editor.cacheRange = function()
{
	Editor.selection = Editor.editorWin.document.selection;
	Editor.rangeCache = Editor.selection.createRange();
};
Editor.checkRange = function()
{
	if(Editor.rangeCache)
	{
		Editor.focusContent();
		Editor.rangeCache.select();
		Editor.rangeCache = false;
	}
};
Editor.getRange = function()
{
	var range = false;
	if(window.isIE)
	{
		Editor.focusContent();
		Editor.selection = Editor.editorWin.document.selection;
		range = Editor.selection.createRange();
	}
	else 
	{
		Editor.selection = Editor.editorWin.getSelection();
		range = Editor.editorWin.document;
	}
	
	return range;
};
Editor.getElement = function()
{
	var element = null;
	var sel;
	var range;
	
	if(window.isIE)
	{
		sel = Editor.editorWin.document.selection;
		switch(sel.type.toLowerCase())
		{
			case "none":
				break;
			case "text":
			{
				range = sel.createRange();
				element = range.parentElement();
				break;
			}
			case "control":
			{
				var ranges = sel.createRange();
				element = ranges.item(0);
				break;
			}
		}
	}
	else
	{
		sel = Editor.editorWin.getSelection();
		if(sel.rangeCount > 0)
		{
			range = sel.getRangeAt(0);
			if(range.startContainer == range.endContainer)
			{
				if(range.startContainer.nodeType != 3)
				{
					element = range.startContainer.childNodes[range.startOffset];
				}
				else element = range.startContainer;
			}
			else element = range.commonAncestorContainer;
		}
		if(element && element.nodeType == 3) element = element.parentNode;
	}
	
	return element;
};
Editor.getSpecialElement = function(tagName,isFoucs)
{
	var element = null;
	
	var tempElement = Editor.getElement();
	
	if(tempElement)
	{
		if(typeof(tagName) == "string") tagName = [tagName];
		while(tempElement && tempElement.tagName)
		{
			for(var i=tagName.length-1;i>=0;i--)
			{
				if(tagName[i] == tempElement.tagName.toLowerCase())
				{
					element = tempElement;
					break;
				}
			}
			if(element) break;
			else tempElement = tempElement.parentNode;
		}
	}
	
	if(isFoucs && element)
	{
		if(window.isIE)
		{
			Editor.rangeCache = false;
			var range = Editor.editorWin.document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		}
		else
		{
			var sel = Editor.editorWin.getSelection();
			if(sel) 
			{
				var range = sel.getRangeAt(0);
				range.selectNode(element);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}
	
	return element;
};

var Lister = Class.create();

Lister.now = false;

Lister.prototype = 
{
	initialize: function(controler,listData,colCount,option)
	{
		this.controler = controler;
		this.listData = listData;
		this.colCount = colCount;
		this.containerClass = option.containerClass;
		this.itemClass = listData.itemClass?listData.itemClass:option.itemClass;
		this.itemOverClass = listData.itemOverClass?listData.itemOverClass:option.itemOverClass;
		
		if(!this.listData.text) this.listData.text = this.listData.value;
		
		this.clickEventObj = false;
		this.visibility = false;
		
		this.initContainer(this.containerClass);
	},
	
	initContainer: function(class2)
	{
		var element = document.createElement("div");
		element.id = this.listData.id;
		element.className = class2;
		element.style.display = "none";
		element.innerHTML = '<div class="decor">'+
					         	'<span class="tl"></span><span class="tr"></span><span class="br"></span><span class="bl"></span>'+
					         '</div>'+
					         '<div class="content" id="'+this.listData.id+'_content"></div>';
		this.container = element;
		document.body.appendChild(this.container);
		this.content = $get(this.listData.id+'_content');
		this.initContent();
		
	},
	
	initContent: function()
	{
		switch(this.listData.type)
		{
			case "auto":
			{
				for(var i=0;i<this.listData.value.length;i++)
				{
					if(i%this.colCount == 0 && i > 0) Dom.create("div","newLine",this.content);
					
					this.initListItem(i,this.content);
				}
				break;
			}
			case "manual":
			{
				for(var i=0;i<this.listData.value.length;i++)
				{
					this.initListItem2(i,this.content);
				}
				break;
			}
			case "manual2":
			{
				this.content.innerHTML = this.listData.content;
				break;
			}
			case "manual3":
			{
				this.content.innerHTML = this.listData.content;
				break;
			}
			case "function":
				this.listData.init(this.content, this.selectedCall.bind(this)); 
				break;
		}
	},
	
	initListItem: function(index,parent)
	{
		var text = this.listData.text[index];
		var value = this.listData.value[index];
		var pattern = this.listData.pattern;
		
		text = pattern.replace(/\$=text\$/ig,text).replace(/\$=value\$/ig,value);
		
		var element = Dom.create("div",this.itemClass,parent);
		
		element.innerHTML = text;
		
		var itemClickFunc = this.selectedCall.bind(this,value);
		var itemOverFunc = this.itemMouseOver.bind(this,element);
		var itemOutFunc = this.itemMouseOut.bind(this,element);
		Event.observe(element,"click",itemClickFunc);
		Event.observe(element,"mouseover",itemOverFunc);
		Event.observe(element,"mouseout",itemOutFunc);
	},
	
	initListItem2: function(index,parent)
	{
		var text = this.listData.value[index][0];
		var value = this.listData.value[index][1];
		
		if(text)
		{
			var element = Dom.create("div",this.itemClass,parent);
			
			element.innerHTML = text;
			
			var itemClickFunc = this.selectedCall.bind(this,value);
			var itemOverFunc = this.itemMouseOver.bind(this,element);
			var itemOutFunc = this.itemMouseOut.bind(this,element);
			Event.observe(element,"click",itemClickFunc);
			Event.observe(element,"mouseover",itemOverFunc);
			Event.observe(element,"mouseout",itemOutFunc);
		}
		else
		{
			Dom.create("div","newLine",this.content);
		}
	},
	
	itemMouseOver: function(element)
	{
		element.className = this.itemOverClass;
	},
	
	itemMouseOut: function(element)
	{
		element.className = this.itemClass;
	},
	
	selectedCall: function(value)
	{
		this.hide();
		this.controler.sohu.selectCall.call(Editor,value,this.controler);
	},
	
	cancel: function(e)
	{
		if(this.visibility)
		{
			var canCancel = true;
			if(typeof(e) != "boolean")
			{
				e = window.event || e;
				if(e)
				{
					eventEle = Event.element(e);
					while(eventEle)
					{
						if(this.container == eventEle)
						{
							canCancel = false;
							break;
						}
						eventEle = eventEle.parentNode;
					}
				}
			}
			if(canCancel)
			{
				this.hide();
				this.controler.sohu.cancelCall.call(this.controler);
			}
		}
	},
	
	show: function()
	{
		if(!this.visibility)
		{
			this.visibility = true;
			var rect = Dom.getRect(this.controler);
			var position = {left:rect.left,top:rect.bottom};
			Dom.setPosition(this.container,position);
			this.clickEventObj = this.cancel.bind(this);
			Event.observe(document,"mouseup",this.clickEventObj);
			Event.observe(Editor.editorWin.document,"mouseup",this.clickEventObj);
			Dom.show(this.container);
			Lister.now = this;
			
			if(this.listData.init) eval(this.listData.init);
		}
	},
	
	hide: function()
	{
		Lister.now = false;
		if(this.clickEventObj)
		{
			Event.stopObserving(document,"mouseup",this.clickEventObj);
			Event.stopObserving(Editor.editorWin.document,"mouseup",this.clickEventObj);
			this.clickEventObj = false;
		}
		this.visibility = false;
		Dom.hide(this.container);
	}
};


//	2007.7.20
//	配置对象
var Config = {};

//	----------------------  下面为针对工具栏的配置  ----------------------
Config.tool = {};

// 资源路径
Config.tool.rPath = '/r/pages/blog/c/i/editor/';

//工具栏中的工具配置信息
Config.tool.data = 
[
	[
	 	[
			["img","bold","粗体",Editor.setBold,Editor.clearBold],
			["img","fontname","字体",Editor.showFontNameList,Editor.hideFontNameList,Editor.setFontName,Editor.cancelFontName],
			["img","fontsize","字号",Editor.showFontSizeList,Editor.hideFontSizeList,Editor.setFontSize,Editor.cancelFontSize],
			["img","forecolor","文字颜色",Editor.showForeColorList,Editor.hideForeColorList,Editor.setForeColor,Editor.cancelForeColor]
		]
	],
	[
	 	[
			["line","line"]
		]
	],
	[
	 	[
			["img","simg","插入图片",Editor.showImg,Editor.hideImg,Editor.addImg,Editor.cancelImgCall],
			["img","svideo","插入视频",Editor.showMv,Editor.hideMv,Editor.addMv,Editor.cancelMvCall],
			["img","url","插入超链接",Editor.showLink,Editor.hideLink,Editor.addLink,Editor.cancelLinkCall],
			["img","emot","插入表情",Editor.showBrow,Editor.hideBrow,Editor.addBrow,Editor.cancelBrowCall]
		]
	]
];

//	与工具栏相关的css属性配置数据
Config.tool.css = 
{
	row:"tool_row",
	newLine:"newLine",
	part:"tool_part",
	
	tool:"tool_tool",
	toolOver:"tool_over",
	toolDown:"tool_down",
	toolDisable:"tool_disable",
	
	editor:"editor",
	cache:"editor_cache",
	footer:"editor_footer clearfix",
	coder:"editor_coder2"
};

//	----------------------  下面是显示列表的配置  ----------------------
Config.lister = {};
Config.lister.option = 
{
	containerClass:"popLayer",	//	列表容器的css
	itemClass:"listerItem",		//	列表中项的css
	itemOverClass:"listerItem_over"		//	列表中项的css
};

Config.lister.mapData = 
{
	type: "manual2",
	id:'lister_map',
	content: '<form action="#" onsubmit="Editor.checkMapInput($get(\'editorMapInput\'));return false;"><div style="background:#eee;padding:3px 5px;margin-bottom:2px;"><img src="http://img3.pp.sohu.com/ppp/blog/styles/images/editor/arr.gif" />&nbsp;插入地图</div><div style="width:120px;padding:5px;"><div style="margin-bottom:3px;">请填入地图关键词：</div><div style="margin-bottom:3px;"><input id="editorMapInput" name="editorMapInput" size=16 class="input" /></div><div style="text-align:center;"><input type="submit" value="搜索" class="button" /></div></div></form>',
	init: "Editor.initMapInput($get('editorMapInput'))"
};
Config.lister.fontNameData = 
{
	type:"auto",
	id:'lister_fontName',
	pattern:'<div class="wLine"></div>'+
				'<div style="float:left;width:130px;text-align:center;font-size:12pt;"><div style="font-family:$=value$">$=text$</div></div>',
	text:['宋体','黑体','隶书','楷体','幼圆','Arial','Impact','Georgia','Verdana','Sans-serif','Tahoma','Courier New','Times New Roman'],
	value:['宋体','黑体','隶书','楷体_GB2312','幼圆','Arial','Impact','Georgia','Verdana','Sans-serif','Tahoma','Courier New','Times New Roman']
};
Config.lister.fontSizeData = 
{
	type:"auto",
	id:'lister_fontSize',
	pattern:'<div class="wLine"></div>'+
				'<div style="float:left;width:100px;text-align:center;"><div style="font-size:$=text$" >$=text$</div></div>',
	text:['12px','14px','16px','18px','24px','32px','48px'],
	value:[-1,2,3,4,5,6,7]
};

Config.lister.urlData = 
{
	type:"manual3",
	id:'lister_url',
	content:'<div class="wLine"></div>'+
		        '<div class="updatePhoto">'+
		            '<div id="tC_2" style="display:block">'+
		                '<dl class="fieldset">'+
		                	'<dt id="linkTextTitle" class="hide">文字：</dt>'+
		                    '<dd id="linkTextInput" class="hide">'+
		                       '<input type="text" id="linkText" maxlength="1024" class="text" style="width: 90%" value="默认添加链接的文字" onfocus="this.value=\'\'" />'+
		                    '</dd>'+
		                    '<dt>链接地址：</dt>'+
		                    '<dd>'+
		                       '<input type="text" id="linkHref" class="text" style="width: 90%" value="http://" onfocus="this.select()" />'+
		                    '</dd>'+
		                    '<dt class="hide">打开方式：</dt>'+
		                    '<dd class="hide">'+
		                       '<select id="linkTarget" class="text">'+
		                          '<option value="_blank" selected>弹出新窗口</option>'+
		                          '<option value="_self">当前窗口</option>'+
		                        '</select>'+
		                    '</dd>'+
		                   '<dd>'+
		                        '<span class="button button-main"><span><button type="button" onclick="Editor.Url.onOK()">立即插入</button></span></span>'+		          
		                        '<span class="button"><span><button type="button" id="linkDelBtn" onclick="Editor.Url.onDel()">取消连接</button></span></span>'+
		                        '<a href="javascript:void(0)" onclick="Editor.Url.onCancel()" >取消</a></dd>'+
		                '</dl>'+
		            '</div>'+
		    '</div>'
	
};

Config.lister.svideoData = 
{
	type:"manual3",
	id:'lister_svideo',
	content:'<div class="wLine"></div>'+
		        '<div class="updatePhoto">'+
		            '<div id="tC_2" style="display:block">'+
		                '<dl class="fieldset">'+
		                    '<dt>视频地址：</dt>'+
		                    '<dd>'+
		                       '<input type="text" onfocus="this.select();" value="http://" style="width: 90%" title="输入音乐或视频地址" class="text" id="videoUrl"/>'+
		                    '</dd>'+
		                    '<dt>宽：</dt>'+
		                    '<dd>'+
		                       '<input type="text" size="3" id="videoWidth" class="text" onfocus="this.select();" value="300"/>px &nbsp;&nbsp;' +
		                       '高：<input type="text" size="3" class="text" id="videoHeight" onfocus="this.select();" value="http://"/>px '+
		                    '</dd>'+
		                    '<dt>播放选项：</dt>'+
		                    '<dd>'+
								'<label for="videoAutostart"><input type="checkbox" value="true" id="videoAutostart"/>自动播放</label>&nbsp;&nbsp;'+
								'<label for="videoLoop"><input type="checkbox" value="true" id="videoLoop"/>循环播放</label>'+
							'</dd>'+
		                   '<dd><span class="button button-main"><span>'+
		                        '<button type="button" onclick="Editor.Video.onOK()">立即插入</button>'+
		                        '</span></span><a href="javascript:void(0)" onclick="Editor.Video.onCancel()" >取消</a></dd>'+
		                '</dl>'+
		        '</div>'+
		    '</div>'
	
};



Config.lister.simgData = 
{
	type:"manual3",
	id:'lister_simg',
	content:'<div class="wLine"></div>'+
		    '<div id="imageSelector"></div>'+
		'</div>'
	
};


Config.lister.emotData = 
{
	type:"manual3",
	id:'lister_emot',
	content:'<div class="wLine"></div><div id="emotBox"></div>'
}

/*
*/
Config.lister.colorData = 
{
	type:"manual",
	id: 'lister_color',
	itemClass:"colorItem",
	itemOverClass:"colorItem_over",
	value:
	[
		['<div class="wLine"></div>','#'],
		['<div style="overflow:hidden;color:#333;height:16px;line-height:16px;width:229px;float:left;text-align:center;font-size:12px;margin-bottom:1px;">自动颜色</div>','#000000'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#003300;"></div>','#003300'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#006600;"></div>','#006600'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#009900;"></div>','#009900'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00CC00;"></div>','#00CC00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FF00;"></div>','#00FF00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#330000;"></div>','#330000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#333300;"></div>','#333300'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#336600;"></div>','#336600'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#339900;"></div>','#339900'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33CC00;"></div>','#33CC00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33FF00;"></div>','#33FF00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#660000;"></div>','#660000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#663300;"></div>','#663300'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#666600;"></div>','#666600'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#669900;"></div>','#669900'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66CC00;"></div>','#66CC00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66FF00;"></div>','#66FF00'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#333333;"></div>','#333333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000033;"></div>','#000033'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#003333;"></div>','#003333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#006633;"></div>','#006633'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#009933;"></div>','#009933'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00CC33;"></div>','#00CC33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FF33;"></div>','#00FF33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#330033;"></div>','#330033'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#333333;"></div>','#333333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#336633;"></div>','#336633'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#339933;"></div>','#339933'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33CC33;"></div>','#33CC33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33FF33;"></div>','#33FF33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#660033;"></div>','#660033'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#663333;"></div>','#663333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#666633;"></div>','#666633'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#669933;"></div>','#669933'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66CC33;"></div>','#66CC33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66FF33;"></div>','#66FF33'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#666666;"></div>','#666666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000066;"></div>','#000066'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#003366;"></div>','#003366'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#006666;"></div>','#006666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#009966;"></div>','#009966'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00CC66;"></div>','#00CC66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FF66;"></div>','#00FF66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#330066;"></div>','#330066'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#333366;"></div>','#333366'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#336666;"></div>','#336666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#339966;"></div>','#339966'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33CC66;"></div>','#33CC66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33FF66;"></div>','#33FF66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#660066;"></div>','#660066'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#663366;"></div>','#663366'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#666666;"></div>','#666666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#669966;"></div>','#669966'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66CC66;"></div>','#66CC66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66FF66;"></div>','#66FF66'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#999999;"></div>','#999999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000099;"></div>','#000099'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#003399;"></div>','#003399'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#006699;"></div>','#006699'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#009999;"></div>','#009999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00CC99;"></div>','#00CC99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FF99;"></div>','#00FF99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#330099;"></div>','#330099'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#333399;"></div>','#333399'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#336699;"></div>','#336699'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#339999;"></div>','#339999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33CC99;"></div>','#33CC99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33FF99;"></div>','#33FF99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#660099;"></div>','#660099'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#663399;"></div>','#663399'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#666699;"></div>','#666699'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#669999;"></div>','#669999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66CC99;"></div>','#66CC99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66FF99;"></div>','#66FF99'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCCCC;"></div>','#CCCCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0000CC;"></div>','#0000CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0033CC;"></div>','#0033CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0066CC;"></div>','#0066CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0099CC;"></div>','#0099CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00CCCC;"></div>','#00CCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FFCC;"></div>','#00FFCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3300CC;"></div>','#3300CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3333CC;"></div>','#3333CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3366CC;"></div>','#3366CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3399CC;"></div>','#3399CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33CCCC;"></div>','#33CCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33FFCC;"></div>','#33FFCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6600CC;"></div>','#6600CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6633CC;"></div>','#6633CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6666CC;"></div>','#6666CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6699CC;"></div>','#6699CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66CCCC;"></div>','#66CCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66FFCC;"></div>','#66FFCC'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFFFF;"></div>','#FFFFFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0000FF;"></div>','#0000FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0033FF;"></div>','#0033FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0066FF;"></div>','#0066FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0099FF;"></div>','#0099FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00CCFF;"></div>','#00CCFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FFFF;"></div>','#00FFFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3300FF;"></div>','#3300FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3333FF;"></div>','#3333FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3366FF;"></div>','#3366FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#3399FF;"></div>','#3399FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33CCFF;"></div>','#33CCFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#33FFFF;"></div>','#33FFFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6600FF;"></div>','#6600FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6633FF;"></div>','#6633FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6666FF;"></div>','#6666FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#6699FF;"></div>','#6699FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66CCFF;"></div>','#66CCFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#66FFFF;"></div>','#66FFFF'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF0000;"></div>','#FF0000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#990000;"></div>','#990000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#993300;"></div>','#993300'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#996600;"></div>','#996600'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#999900;"></div>','#999900'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99CC00;"></div>','#99CC00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99FF00;"></div>','#99FF00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC0000;"></div>','#CC0000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC3300;"></div>','#CC3300'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC6600;"></div>','#CC6600'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC9900;"></div>','#CC9900'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCC00;"></div>','#CCCC00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCFF00;"></div>','#CCFF00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF0000;"></div>','#FF0000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF3300;"></div>','#FF3300'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF6600;"></div>','#FF6600'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF9900;"></div>','#FF9900'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFCC00;"></div>','#FFCC00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFF00;"></div>','#FFFF00'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FF00;"></div>','#00FF00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#990033;"></div>','#990033'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#993333;"></div>','#993333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#996633;"></div>','#996633'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#999933;"></div>','#999933'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99CC33;"></div>','#99CC33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99FF33;"></div>','#99FF33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC0033;"></div>','#CC0033'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC3333;"></div>','#CC3333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC6633;"></div>','#CC6633'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC9933;"></div>','#CC9933'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCC33;"></div>','#CCCC33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCFF33;"></div>','#CCFF33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF0033;"></div>','#FF0033'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF3333;"></div>','#FF3333'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF6633;"></div>','#FF6633'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF9933;"></div>','#FF9933'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFCC33;"></div>','#FFCC33'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFF33;"></div>','#FFFF33'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#0000FF;"></div>','#0000FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#990066;"></div>','#990066'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#993366;"></div>','#993366'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#996666;"></div>','#996666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#999966;"></div>','#999966'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99CC66;"></div>','#99CC66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99FF66;"></div>','#99FF66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC0066;"></div>','#CC0066'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC3366;"></div>','#CC3366'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC6666;"></div>','#CC6666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC9966;"></div>','#CC9966'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCC66;"></div>','#CCCC66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCFF66;"></div>','#CCFF66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF0066;"></div>','#FF0066'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF3366;"></div>','#FF3366'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF6666;"></div>','#FF6666'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF9966;"></div>','#FF9966'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFCC66;"></div>','#FFCC66'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFF66;"></div>','#FFFF66'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFF00;"></div>','#FFFF00'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#990099;"></div>','#990099'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#993399;"></div>','#993399'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#996699;"></div>','#996699'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#999999;"></div>','#999999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99CC99;"></div>','#99CC99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99FF99;"></div>','#99FF99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC0099;"></div>','#CC0099'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC3399;"></div>','#CC3399'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC6699;"></div>','#CC6699'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC9999;"></div>','#CC9999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCC99;"></div>','#CCCC99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCFF99;"></div>','#CCFF99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF0099;"></div>','#FF0099'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF3399;"></div>','#FF3399'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF6699;"></div>','#FF6699'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF9999;"></div>','#FF9999'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFCC99;"></div>','#FFCC99'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFF99;"></div>','#FFFF99'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#00FFFF;"></div>','#00FFFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9900CC;"></div>','#9900CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9933CC;"></div>','#9933CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9966CC;"></div>','#9966CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9999CC;"></div>','#9999CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99CCCC;"></div>','#99CCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99FFCC;"></div>','#99FFCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC00CC;"></div>','#CC00CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC33CC;"></div>','#CC33CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC66CC;"></div>','#CC66CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC99CC;"></div>','#CC99CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCCCC;"></div>','#CCCCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCFFCC;"></div>','#CCFFCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF00CC;"></div>','#FF00CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF33CC;"></div>','#FF33CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF66CC;"></div>','#FF66CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF99CC;"></div>','#FF99CC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFCCCC;"></div>','#FFCCCC'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFFCC;"></div>','#FFFFCC'],
		[false,false],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF00FF;"></div>','#FF00FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#000000;"></div>','#000000'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9900FF;"></div>','#9900FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9933FF;"></div>','#9933FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9966FF;"></div>','#9966FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#9999FF;"></div>','#9999FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99CCFF;"></div>','#99CCFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#99FFFF;"></div>','#99FFFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC00FF;"></div>','#CC00FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC33FF;"></div>','#CC33FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC66FF;"></div>','#CC66FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CC99FF;"></div>','#CC99FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCCCFF;"></div>','#CCCCFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#CCFFFF;"></div>','#CCFFFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF00FF;"></div>','#FF00FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF33FF;"></div>','#FF33FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF66FF;"></div>','#FF66FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FF99FF;"></div>','#FF99FF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFCCFF;"></div>','#FFCCFF'],
		['<div style="width:10px;height:11px;overflow:hidden;background-color:#FFFFFF;"></div>','#FFFFFF'],
		[false,false]

	]
};


/**
 * sns日志扩展代码
 */
Editor.Url= {};

Editor.Url.init = function(){
	
	var linkElement = Editor.getSpecialElement("a",true);
	var linkTextTitle = $get("linkTextTitle");
	var linkTextInput = $get("linkTextInput");
	var linkDelBtn = $get("linkDelBtn");
	
	this.linkText = $get("linkText");
	this.linkUrl = $get("linkHref");
	this.linkTarget = $get("linkTarget");
	
	this.linkText.value = "默认添加链接的文字";
	this.linkUrl.value = "http://";
	
	if(!linkElement)
	{
		var selectedText = Editor.getSelectedHTML();
		Dom.hide(linkDelBtn);
		if(selectedText.length < 1){
			this.linkText.value = '';
		} else {
			this.linkText.value = selectedText;
		}
	} else {
		this.linkText.value = linkElement.innerHTML;
		this.linkUrl.value = linkElement.href;
		Dom.show(linkDelBtn);
	}
};

Editor.Url.onOK = function()
{
	if(Editor.Url.validateForm(this.linkUrl))
	{
		var returnValue = 
		{
			text: this.linkText.value.trim(),
			link: this.linkUrl.value.trim(),
			target: this.linkTarget.value
		};
		if(returnValue.text == '') returnValue.text = returnValue.link;
		Editor.controls["url"].sohu.selectCall.call(null,returnValue);
	}
	return false;
}

Editor.Url.onDel = function()
{
	Editor.controls["url"].sohu.cancelCall.call(null);
	return false;
};

Editor.Url.validateForm = function(linkUrl)
{
	//	验证网址
	if(linkUrl.value.length < 1)
	{
		alert("请填入网址！");
		linkUrl.focus();
		return false;
	}
	else
	{
		var expUrl = /^((ht)|f|(rs))tp[s]?:\/\/([a-zA-Z0-9]|[-_])+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
		if (!expUrl.test(linkUrl.value)) 
		{
			alert("网址格式不正确！");
			linkUrl.focus();
			return false;
		}
	}
	//	验证成功
	return true;
}

Editor.Url.onCancel = function()
{
	Editor.controls["url"].sohu.upCall.call();
}


// 插入视频

Editor.Video = {};

Editor.Video.onOK = function(){
	Editor.Video.onNet();
};

Editor.Video.onCancel = function() {
	Editor.Video.cancel();
}
Editor.Video.onNet = function() {
	var required = {
		"videoUrl": "请输入音乐或视频的网址"
	  };
	  for (var i in required) {
		try{
			var el = $get(i);
			if (!el.value || el.value == "http://") {
			  alert(required[i]);
			  el.select();
			  el.focus();
			  return false;
		}
		}catch(e){}
	  }
	  // pass data back to the calling window
	  var fields = ["videoUrl", "videoWidth", "videoHeight","videoAutostart","videoLoop"]; //, "videoAutostart", "videoLoop"
	  var param = new Object();
	  param.type = "net";
	  for (var i in fields) {
		try{
			var id = fields[i];
			param[id] = $F(id);
		}catch(e){}
	  }
	 
	 Editor.Video.callback(param);
	  
	 return false;
}
//	下面为POP中通用的方法
Editor.Video.callback = function(param)
{
	Editor.controls["svideo"].sohu.selectCall.call(null,param);
}

Editor.Video.cancel = function()
{
	Editor.controls["svideo"].sohu.cancelCall.call();
}
