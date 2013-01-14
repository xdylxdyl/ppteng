/**
 * @fileoverview  自动提示框
 * @authot  hongwei@sohu-inc.com
 * @version  0.1
 * 调用示例
 * var options={
		width:{number},
		position :[number,number]
	}
	var m=new sohu.ctrl.AutoComplete("#selectorId input","")
	var m=new sohu.ctrl.AutoComplete($("#selectorId"),options)
	}
 */

$register(
	"sohu.ctrl.AutoComplete",
	function(){
		var UrlModel = new sohu.core.Model({	
			actions: {	
				show: {
					url:		'/a/autoComplete/show.do',				
					method: 	'get',
					format: 	'json',
					type:       'list'        
				}
			},
			url:				''
		});		
		sohu.ctrl.AutoComplete =Class.create({
			initialize : function(el,options){
				this.ele=$(el);
				this.Tip=this._initTip(el,options);
				this.data='';
			},
			_loadData :  function(data){
			 this.data=data;
			 var _this=this;
		  	 if(this.Tip.content.constructor==Function){
		  	 	this.Tip.content("");
		  	 }
		  	 if(data.length>0){
		  	 	data.each(function(it,i){
		  	 		_this.Tip.add(it.html,it.value)	  	 	
		  	 	})
		  	 	
		  	  }
		    },
			_initTip :function(el,options){ 
				return  new sohu.ctrl.SelectChangeTip({
					element : el, 
					position: options.position||[0,0],
					width   : options.width || $(el).width(),
					onFocus : options.onFocus.bind(this) ||this._onFocus.bind(this),
					onChange: options.onChange.bind(this)||this._onChange.bind(this),
					onSelect: options.onSelect.bind(this)||this._onSelect.bind(this)
				})
			},
			_onFocus : function(){
				this.Tip.content("请输入您的搜索内容");
			},
			_onChange : function(v){
				var noptions={
						success: this._loadData.bind(this),
						failure: function(json){}
				}
				var v=this.ele.val().trim();
				var Param={key:v};
				if(this.Tip.lastMath!=this.ele.val()){
					UrlModel['show'](Param,noptions);
						this.Tip.lastMath=this.ele.val();
					}
						 	
			},
			_onSelect : function(txt,val){
				this.ele.val(txt)
			}	 
		})
	
	},'sohu.core.*,sohu.ctrl.TipSuggest');

