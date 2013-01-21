/*
 * 
 *  tooltip 类 
 * 
 */
 $register(
	"sohu.ctrl.ToolTip",
	function(){

		sohu.ctrl.ToolTip =Class.create({
			
			initialize : function(options){   
			    this.opt= Object.extend({
			    				element  : options.element || false,
			    				tooHtml : this._DefaultHtml,
								className :" ",
								content : " ",
								width   : " ",
								time    : 0,
								fadeIn  : false,
								fadeOut : false
							},options||{})	
				this._template={	
					content:this.opt.content,
					width  :this.opt.width
				}
				this.element=this.opt.element;
				this.template=new kola.Template(this.opt.tooHtml);
			    this.pannel=kola.Element.create("div").html(this.template.evaluate(this._template)).hide();
				$(document.body).append(this.pannel);
				this.pannel.addClass("balloon balloon-top");			
				this.setPos();
				$(window).on('resize',this.setPos.bind(this));
			},
			_DefaultHtml : '<div class="decor">\
									<span class="tl"></span><span class="tr"></span><span class="br"></span><span class="bl"></span>\
								</div>\
							<div class="content" style="width:@{width}; padding:6px;">@{content}</div>',
			_hide     : function(){
				if(this.opt.time){
					var _this=this;
					setTimeout(function(){
						_this.hide.bind(_this)();
					},_this.opt.time*1000)
				}
			},
			setPos      : function(){
						if(this.element)this.pannel.pos({left:this.element.pos().left||10,top:this.element.pos().top+this.element.height()||10})
			},
			setContent : function(str){
					   $(".content",this.pannel).html(str);
					   return this;
			},
			hide  :  function(){
	  		    if(this.opt.fadeOut){
	  		    	var options={
	  		    		speed :10
	  		    	}
	  		    	kola.anim.FadeOut.action(this.pannel,options)
	  		    }
	  		    else{
	  		    	this.pannel.hide();
	  		    }
	  		},
	  		show  :  function(){
	  			if(!this.element){return;}
	  			if(this.opt.fadeIn){
	  				var options ={
	  					speed : 10
	  				}
	  				kola.anim.FadeIn.action(this.pannel,options)
	  			}
	  			else{
	  				this.pannel.show();
	  			}
	  			this._hide();
	  		}
			
		})
	},'kola.anim.Fade')	