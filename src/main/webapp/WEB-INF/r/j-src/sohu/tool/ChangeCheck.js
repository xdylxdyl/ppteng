/*
 * @fileoverview 用来检测选项有无改变类的封装
 * @author Neo www.neoy.cn
 * @update springwang
 * @versio v0.2
 * */

$register(
	'sohu.tool.ChangeCheck',
	function(){	
		sohu.tool.ChangeCheck={
			
		 	_hrfUrl:null,
		 	
			/**
			 * 静态方法外部使用的接口
			 * 此方法提供使用Dilog提示的Form改动是否修改的功能
			 * @param {string or dom element object} formId 表单或者包含表单字段的容器（必填项）
			 * @param {function} callBack 如数据使用Ajax提交方式，该参数为提交方法的引用 (选填)
			 */
			initCheck:function(form,callBack){
				this.initProp(form,callBack);
				this._onEvent();
				return this;
			},
			/**
			 * 初始化属性
			 */
			initProp: function(form,callBack){
				this._form = $(form);
				this._callBack = callBack;
				this._isInit = true;
				this._referStr = null;	
				this._clickHandler = this._clickHandle.bindEvent(this);
			},
			
			/**
			 * 解除事件绑定
			 */
			unEvent: function(){
				$(document.body).un('click',this._clickHandler);
			},
			
			/**
			 * 绑定事件
			 */
			_onEvent: function(){
				$(document.body).on('click',this._clickHandler);
			},
			
			/**
			 * 私有方法点击事件的处理
			 */
			_clickHandle:function(e){
				if(this._isInit && !this._referStr){
					this._isInit = false;
					this._referStr = kola.tool.ChangeCheck.getFormDefault(this._form);
				}
				if(this._isLink(kola.Event.element(e))){
					this._checkChange(e);
				}
			},
			
			/**
			 * 私有方法判断点击的对象是否为跳转链接
			 */
			_isLink:function(target){
				var _this=this;
				var eventTarget;
				
				if(target.prop('tagName')=="A"){
					//alert('a alone')
					eventTarget=target;
				}else if(target.up('a')!=null){
					eventTarget=target.up('a');
				}else{
					//alert('return false');
					return false;
				}
				
				//alert(eventTarget.prop('tagName'));
				if(eventTarget.prop('tagName')=="A"){
					//alert("A the href:"+eventTarget.prop('href'));
					var href=eventTarget.prop('href');
					_this._hrfUrl=href;
					if(href.indexOf('javascript')==0||href.lastIndexOf('#')==(href.length-1)){
						//alert('A but not a link');
						return false;
					}else{
						//alert('A also a link');
						return true;
					}
				}else{
					//alert("not A not link either");
					return false;
				}
			},
			
			/**
			 * 私有方法检测Form中的设置是否有改变并调用_alertChange进行提示
			 */
			_checkChange:function(e){
				var _this=this;
				if(kola.tool.ChangeCheck.checkForm(this._form,this._referStr)){
					//alert("there's a change");
					//kola.Event.stop(e)在IE6下没有正常执行
					kola.Event.stop(e);
					//alert('stop the event');
					callback={
					 	save: function(){
					 		if(_this._callBack!=null){
					 			_this._callBack();
					 		}else{
					 			// 判断是否当前的form是一个真正的form标签，如果不是就向下查找
					 			if(_this._form.prop('tagName').toLowerCase() != 'form')
					 				_this._form = _this._form.down('form');
					 			_this._form.elements()[0].submit()
					 		}
					 	},
					 	noSave : function(){window.location.href=_this._hrfUrl},
					 	back   : function(){return true}
				 	}
				 	
					this._alertChange(callback).show();
					return false;
				}else{
					//alert("there's no change");
					return false;
				}
			},
			
			/**
			 * 私有方法提示是否保存Form中的数据改变
			 */
			_alertChange:function(callback){
				//alert('show alert');
				var options={
					title : "修改尚未保存",
					content : 	"您部分修改尚未保存。您现在想保存修改吗？",
					width : 400,
					mask : {color:"#fff",num:0},
					fadeOut : true,
					fadeIn :true,
					buttons :[
						{html:'保存',event:'click',func:callback.save,className:'button-main',close:true,isRed:true },
						{html:'不保存',event:'click',func:callback.noSave,close:true },
						{html:'取消',event:'click',func:callback.back,close:true }
					
					  ]
				}
				return  new sohu.ctrl.Dialog(options);
			}			
		};
		/**
		 * 工厂模式的初始化方法
		 */
		sohu.tool.ChangeCheck.init = function(form,callBack){
			var instance = sohu.tool.ChangeCheck.instance;
			if (!instance) {
				instance = sohu.tool.ChangeCheck.initCheck(form,callBack);
				sohu.tool.ChangeCheck.instance = instance;
			}else{
				instance.initProp(form,callBack);
			}
			return instance;
		};
		/**
		 * 清除检查事件绑定
		 */
		sohu.tool.ChangeCheck.clear = function(){
			var instance = sohu.tool.ChangeCheck.instance;
			if (instance) {
				instance.unEvent();
				sohu.tool.ChangeCheck.instance = null;
			} 
		};
		
	},'kola.tool.ChangeCheck,sohu.ctrl.Dialog'
);