
/**
 * @fileoverview  Vcode 是验证码到一个通用类 用来动态添加验证码并注册响应到交互事件
 * @authot  hongweiwang@sohu-inc.com
 * @version  0.1
 * @class    Vcode
 * @augments options
 * @example
 * var mycode=new sohu.ctrl.Vcode(options);
 * var mycode2=new sohu.ctrl.Vcode.init("#id",{imgId:"#tt"})
 * 
 */
$register(
	'sohu.ctrl.Vcode',
	function(){	
		
	/*-------------------------------------------------------------------------
	 * 
	 * 请求数据模型
	 * 
	 */	
	var  validateModel = new sohu.core.Model({	
			actions: {
				
				show: {
						url:		'/a/verifyCode/show.do',				
						method: 	'get',
						format: 	'json',
						type:       'one'        
					}
			},
			url:				''
		});	
			
	/*-------------------------------------------------------------------------
	 * Vcode类    生成一个验证码控件
	 * @class    Vcode
	 * @version  1.0
	 */	
		
	sohu.ctrl.Vcode = Class.create({	
		initialize : function(options){
			this.inputObj = options.inputObj;    		// 验证输入表单项
			this.keyObj   = options.keyObj;				// 隐藏表单项 value 为 key值
			this.imgObj   = options.imgObj;         	// 图片放置节点
			this.refreshModel =options.refreshModel||1;
			this.dataModle    =validateModel;
			this.url	   = options.url;
			if(!this.imgObj){
				var imgObj=kola.Element.create('img');
				this.inputObj.after(imgObj);
				imgObj.attr('src',this.url+'1.gif');
				this.imgObj=imgObj;
			}
			if(!$("#vcodeEn")){
			var hInput=kola.Element.create('input');
			    this.inputObj.after(hInput);
			    hInput.attr('value','');
			    hInput.attr('name','vcodeEn')
			    hInput.css('display','none');
			    this.keyObj=hInput;
			}
			else{
				this.keyObj=$("#vcodeEn");
			}
			this.inputObj.attr('name','vcode');
			this._addEvent();
	   },
	  _addEvent    : function(){
	  	switch(this.refreshModel){
			case 1:
				this._imgClick();
				this._textClick();
				break;
			case 2:
				this._imgClick();
				break;
			case 3:
				this._textClick();
				break;
			case 4:
				this._onfocus();
				break;
			default:
				break;		
			}
		    this._updateEvent();
			this._updateImg;
	  },
	  _imgClick :function(){
	  		this.imgObj.on('click', this._updateEvent.bind(this));
			this.imgObj.css('cursor','pointer');
			this.imgObj.attr('title','点击刷新图片');
	  
	  },
	  _textClick :function(){
	  	var RefTab=kola.Element.create('a');
			this.imgObj.after(RefTab);
			RefTab.html('点击刷新图片');
			RefTab.attr('href','javascript:void (0)');
			RefTab.on('click',this._updateEvent.bind(this));	
	  
	  },
	  _onfocus  :function(){
	  		this.inputObj.on('focus',this._updateEvent.bind(this));
	  },
	  _updateEvent :function(){
	  	var _this=this;
	  	var options={
	  		success:_this._updateImg.bind(_this),
	  		failure: function(json){alert('验证图片加载失败')}
	  	}
	  	this.Param={}
	  	this.dataModle['show'](this.Param,options);
	  },
	  _updateImg : function(obj){
	  	 	this.keyObj.attr('value',obj.vcode);
	  	 	this.inputObj.attr('value','');
	  	 	this.imgObj.attr('src',this.url+"?vcode="+obj.vcode);
	  }
	});
	
	/*------------------------------------------------------------------------------
	 * 
	 * Vcode的静态方法   根据配置参数返回一个 Vcode 对象
	 * @param   inputId 对应的验证码输入项 Id，可选参数包括  图片显示节点 ImgId ,图片刷新方式 reType
	 * @return  一个实例化的Vcode对象
	 * 
	 */
	
	sohu.ctrl.Vcode.init=function(inputId,options){
		  var coptions={
		  	url      : '/a/verifyCode/pic.do',
		  	inputObj : $(inputId),
		  	imgObj   : options.imgId?$(options.imgId):undefined,
		  	refreshModel :options.reType
		  }
		  return new sohu.ctrl.Vcode(coptions);
	}
},'sohu.core.*')















