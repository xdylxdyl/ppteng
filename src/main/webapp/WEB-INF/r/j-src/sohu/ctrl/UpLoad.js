 /**
 * @fileoverview  上传类 sohu.ctrl.UpLoad, 静态方法 FaceUp
 * @author  hongweiwang@sohu-inc.com
 * @version  0.1
 */


$register(
	'sohu.ctrl.UpLoad',
	function(){			
	sohu.ctrl.UpLoad = Class.create({	
	initialize : function (form,options){
		this.form=$(form);
		this.form.show();
		$(document.body).append(kola.Element.create("div").html("<iframe style='display:none'  src='about:blank' name='upLoadIframe' id='upLoadIframe'></iframe>"))
		this.form.attr('target',"upLoadIframe");
		this.form.attr('action',options.action);
		this.form.attr('method','POST');
		this.form.attr('enctype','multipart/form-data');
		this.fileFilter=new RegExp("."+options.fileFilter.join("|."),'i');
		this.callback=options.callback||"";
		//this.callback=options.callback||function(){}
		this.instName=options.name||"";
		this.mesBox=kola.Element.create("div").attr("class",options.mesClass||"upMesBox").hide();
		this.form.before(this.mesBox);
		var _this = this;
		this.form.elements()[0].onsubmit=function(){	
			var names=_this._getFileName();
			if(names.length>0){
				var isok=true;
				for(var i=0;i<names.length;i++){
					if(!_this.fileFilter.test(names[i])){
						_this.setMes("wrongType",names[i]);
						isok=false;
					}
				}
			if(!isok){return false;}
			_this.setMes("lodding");
			return true;
			}
			else{ 
				_this.setMes("nofile")
				return false;	
			}
		}
		this.init();
	},
	init  : function(){
		this.form.append(kola.Element.create("input").attr("name","cb").attr("value","window.parent."+this.callback).hide())
		//this.form.append(kola.Element.create("input").attr("name","cb").attr("value","window.parent."+this.instName+".callbackEvent").hide())
	}
	,
	_callbackEvent    : function(json){
		if(json.status==1)
		{
			this.callback(json.data);
		}
	},
	_getSubmitButton : function(){
		var btns=this.form.elements()[0].elements;
		for(var i=0;i<btns.length;i++){
			if(btns[i].tagName=="BUTTON"&&btns[i].type=="submit"){
				return $(btns[i])
			}
		}
		return false;
	},
	setMes  : function(type,str){
		var _mesBox=null;
		if(type=="lodding"){
			var submitBtn=this._getSubmitButton();
			if(submitBtn){
				submitBtn.html("上传中");
				var parentBtn=submitBtn.parent().parent();
				parentBtn.addClass("button-disabled");
				setTimeout(function(){
					submitBtn.html("上传");
					parentBtn.removeClass("button-disabled");
				},2000)
			}
		}
	    else{
	        _mesBox=this.mesBox.show();
			var messages={
				wrongType: "上传文件<b>"+str+"</b>格式受限",
				nofile  : "请选择要上传的文件"
			}
			_mesBox.html(messages[type]);
			setTimeout(function(){
				_mesBox.html("");	
				_mesBox.hide();
			},2000)
	    }	
	},
	_getFileName     : function(){
	   var  eles=this.form.elements()[0].elements;
		var elenames=[];
		var reg=/(\.\w+)$/;
		for(var i=0;i<eles.length;i++){
			if(eles[i].type!='file') continue;
			if(eles[i].value!=""){
				if(reg.test(eles[i].value)>0){
					elenames.push(RegExp.$1);
				}
			 }
		  }
		return elenames;}
     })
     
    /*
     * 头像上传
     * @parms  form 提交img的表单    callback 回调函数
     * 调用示例
     * 	
		var test=UpLoad.FaceUp(myForm,callback);
		function callback(){}
     */ 
    sohu.ctrl.UpLoad.FaceUp=function(form,callback){
    	//FIXME 这里是为了本地测试而添加的代码
    	var host = window.location.href.split('/')[2];
    	var options={
			action:"http://"+ host + "/a/photo/icon/commonUpload.do",
			callback:callback,
			mesClass : "msg msg-failed",
			lodeClass : "load-part",
			fileFilter:["gif","jpg","png","jpeg","bmp"]
		}
		document.domain="sohu.com";
	    return new sohu.ctrl.UpLoad(form,options);
    
    }
})