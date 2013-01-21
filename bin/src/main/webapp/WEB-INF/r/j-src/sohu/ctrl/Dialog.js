
/**
 * @fileoverview  这是 dialog 的一个通用类 可以在它的基础上扩展出更多的dialog应用 。
 * @authot  hongwei@sohu-inc.com
 * @version  0.1
 * @class    Dialog
 * @augments options
 * @example
 * var mydialog= new sohu.ctrl.Dialog();
 * 
 */
$register(
	"sohu.ctrl.Dialog",
	function(){

		/* Dialog类 */
		sohu.ctrl.Dialog =Class.create({
	
			initialize : function(options){
				this.opt = Object.extend({
					className :" ",
					title   : " ",
					content : " ",
					foot    : " ",
					width   : 400,
					onClose : function(){},
					mask    : false,
					fadeIn  : false,
					fadeOut : false,
					buttons : false,
					events  : false,
					loadding :false,
					closeTime    : 0
				},options||{})
				this.dialogHtml=options.dialogHtml||this._DefaultHtml;
				this.template=new kola.Template(this.dialogHtml);
				if(this.opt.loadding){
					this.opt.loadding="load-page";
				
				}
				this.pannel=kola.Element.create("div").html(this.template.evaluate(this.opt)).hide();
				$(document.body).append(this.pannel);
				this.body=$(".body",this.pannel)||this.pannel;
				this.mask=options.mask?(new sohu.ctrl.Mask({color:"#fff",num:1})): false;
				this._init();
			},	
			
			/* Dialog模板文件的html 形式可以 有多种配置 */
			_DefaultHtml : '<div class="dialog  #{className}"  style="width:#{width}px;display: #{display}" >'+
				'<div class="decor">'+
					'<span class="tl"></span>'+
					'<span class="tr"></span>'+
					'<span class="br"></span>'+
					'<span class="bl"></span>'+
				'</div>'+
					'<div class="content #{loadding}">'+
						'<div class="head">'+
							'<h4 class="title"> #{title} \</h4>'+
							'<div class="option"><a tag="close" href="javascript:void(0)" class="icon i-close">关闭</a></div>'+
						'</div>'+
						'<div class="body" style="height:#{height}px;">'+
							' #{content}'+
						'</div>'+
						'<div class="foot">'+
							' #{foot} '+
						'</div>'+
					'</div>'+
				'</div>',
			_init : function(){
				this.setButton(this.opt.buttons);
				this._regEvent();
				this.setPos();
			
			},	
			//注册 dialog 内元素的事件
	  		_regEvent : function(){
	  			var closeBtn=$(" .option .i-close",this.pannel );
	  			if(closeBtn){
					closeBtn.on("click",this.close.bind(this));
	  			}
	  			if(this.opt.events){
		  			this.addEvent(this.opt.events);
	  			}
	  			$(window).on("resize",this.setPos.bind(this));
	  		},
	  		_show  :  function(){
	  			this.pannel.show();
	  			if(this.mask){
	  				this.mask.show.bind(this.mask)();
	  			}
	  			if(this.opt.closeTime){
	  				setTimeout(function(){
	  					this.close();
	  				}.bind(this),this.opt.closeTime*1000)
	  			}
	  			return this;
	  		},
	  		
	  		_close : function(){
	  			if(this.opt.onClose){
	  		    	this.opt.onClose();
	  		    }
	  		    if(this.mask){
	  		    	this.mask.close();
	  		    }
	  		    if(this.pannel.parent()){
	  		    	this.pannel.remove();
	  		    }
	  		},
	  		setButton : function(_buttons){
	  			
	  			if(_buttons){
	  				if(_buttons.constructor==Object){
	  					_buttons=[_buttons];
	  				}
	  				var str="";
	  				var btnHtml="<span class='button #{isRed}'><span><button type='#{type}' title='#{html}'>#{html}</button></span></span>";
	  				
	  				_buttons.each(function(it,i){
	  					var buttonTemplate=new kola.Template(btnHtml);
	  					it.isRed=it.isRed?"button-main":"";
	  					it.type=it.type?it.type:"button";
	  					str+=buttonTemplate.evaluate(it);
	  				})
	  			  	this.setFoot(str);
	  			  	var buttons=$(".foot .button",this.pannel);
		  			if(buttons){
			  			buttons.each(function(it,i){
			  				if(_buttons[i].close){
			  			  		it.on('click',this.close.bind(this));
			  			  	}
			  			  	if(_buttons[i].func&&_buttons[i].func.constructor==Function){
			  			  		it.on(_buttons[i].event||'click',_buttons[i].func);
			  			  	}
			  			}.bind(this))
		  			}
		  		}
	  			else{
	  				this.setFoot(" ");
	  			}
	  			return this;
	  			
	  		},
	  		//设置 dialog 的位置
	  		setPos      : function(pos){
	  			var pannelBox=$(".dialog",this.pannel)?$(".dialog",this.pannel):this.pannel; 
	 			if(pos&&pos.left){
	 				pannelBox.pos(pos);
	 			}
	 			else{
	  				pannelBox.css("marginLeft",-this.opt.width/2+"px");
	  				var top=pannelBox.pos().top;
	  				var dHeight=pannelBox.height()==0?180:pannelBox.height();
	  				//var bHeight= document.documentElement.clientHeight;
	  				var bHeight= document.documentElement.offsetHeight;
	  				// bHeight 为
	  				if(dHeight<bHeight-50){
	  					pannelBox.css("top",(bHeight-dHeight)/2-40+"px");
	  				}
	  				else{
	  					pannelBox.css("top","50px");
	  				}
	 			
	 			}
	 			return this;
	  		},
	  		//设置 dialog 的title
	  		setTitle : function(html){
	  			var _title=$(" .title",this.pannel);
	  			if(_title){
	  				_title.html(html);
	  			}
	  			return this;
	  		},
	  		//设置 dialog 的content
	  		setContent  : function(html){
	  			var _body=$(" .body",this.pannel);
	  			var _content =$(".content",this.pannel);
	  			if(_body){
	  				_body.html(html);
	  				
	  			}
	  			if(this.opt.loadding){
	  				_content.removeClass(this.opt.loadding)
	  			}
	  			return this;
	  		},
	  		//设置 dialog 的foot
	  		setFoot     : function(html){
	  			var _foot=$(" .foot",this.pannel);
	  			if(_foot){
	  				_foot.html(html);
	  			}
	  			return this;
	  		}, 
	  		setLoad     : function(){
	  			var _content =$(".content",this.pannel);
	  			if(this.opt.loadding){
	  				_content.addClass("load-page");
	  			}
	  			
	  		},
	  		//为 dialog 注册指定事件
	  		addEvent : function(Eves){
	  			if(!Eves){
	  				return;
	  			}
	  			if(Eves.constructor==Object){
	  				Eves=[Eves];
	  			}
	  			Eves.each(function(it){
	  				    try{
	  				    	var _button=$("[tag="+it.tag+"]",this.pannel);
	  						if(_button){
								_button.on(it.event?it.event:'click',it.func.bindEvent(this))	
	  						}
	  				    }catch(e){}
					}.bind(this))
				return this;
	  		},
	  		
	  		//隐藏 dialog 
	  		hide  :  function(){
	  			this.pannel.hide();
	  			if(this.mask){
	  				this.mask.hide.bind(this.mask)();
	  			}
	  			return this;
	  		},
	  		show  :  function(){
	  			if(this.opt.fadeIn){
	  				var options ={
	  					speed : 5,
	  					callback : this._show.bind(this)
	  				}
	  				kola.anim.FadeIn.action(this.pannel,options)
	  			}
	  			else{
	  				this._show();

	  			}
	  			return this;
	  		},
	  		//隐藏 并删除 dialog 
	  		close :  function(){
	  		    if(this.opt.fadeOut){
	  		    	var options={
	  		    		speed :5,
	  		    		callback : this._close.bind(this)
	  		    	}
	  		    	kola.anim.FadeOut.action(this.pannel,options)
	  		    }
	  		    else{
	  		    	this._close();
	  		    }
	  		}
		})
		/* 根据Dialog 生成 的 alert 静态 类*/
		sohu.ctrl.Dialog.alert=function(title,mes,call){
				var options={
					title : title||"提示",
					content : mes,
					mask  : {color:'#fff',num:1},
					fadeOut : true,
					buttons :{html:'确定',event:'click',func:call,close:true,isRed:true}
				} 
			   return new sohu.ctrl.Dialog(options).show();
		}
		/* 根据Dialog 生成 的 confirm  静态 类*/
		sohu.ctrl.Dialog.confirm=function(mes,options){
			   var _options={
			   	   title : options.title||'提示',
			   	   content : mes,
			   	   mask  : {color:'#fff',num:1},
			   	   fadeOut : true,
			   	   closeTime : options.time || 0,
			   	   buttons :[
			   	   		{html:'确定',func:options.yes?options.yes:function(){},close:options.close==true||options.close==undefined?true:false,isRed:true},
			   	   		{html:'取消',func:options.no?options.no:function(){},close:true}
			   	   ]
			   }
			  return new sohu.ctrl.Dialog(_options).show();
		}
		/*
		sohu.ctrl.Dialog.alertChange=function(callback){
			var options={
			title : "修改尚未保存",
			content : 	"您部分修改尚未保存。您现在想保存修改吗？",
			width : 500,
			mask : {color:"#fff",num:40},
			fadeOut : true,
			fadeIn :true,
			buttons :[
				{html:'修改',event:'click',func:callback.save},
				{html:'不修改',event:'click',func:callback.noSave},
				{html:'返回',event:'click',func:callback.back }
			
			  ]
			}
			return  new sohu.ctrl.Dialog(options);
		}*/
	},"kola.anim.Fade,sohu.ctrl.Mask")
