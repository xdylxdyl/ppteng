 /**
 * @fileoverview  热词选择器功能实现类
 * @author  Neo http://www.neoy.cn
 * @version  0.1
 * @requires kola.core package
 */
$register(
	'sohu.ctrl.HotTagSelector',
	function(){
		sohu.ctrl.HotTagSelector=Class.create({
			/**
			 * @constructor 构建热词选择器
			 * @param {Element} selected 显示选择后热词的容器
			 * @param {Element} tagContainer 显示候选热词的容器
			 * 					容器中候选热词格式为:<a href="javascript:void(0)">hotTag</a>
			 */
			 initialize:function(selected,tagContainer){
				 this.tagTotal=0;
				 this.slectedAry=new Array();
				 this.selected=$(selected);
				 this.tagContainer=$(tagContainer).children();
				 
				 this.addEventListeners();
			 },
			
			/**
			 * 添加点击事件
			 */
			addEventListeners:function(){
				this.tagTotal=this.tagContainer.size();
				for(var i=0;i<this.tagTotal;i++){
					var hotTag=this.tagContainer.get(i);
					hotTag.on('click', this.clickHandler.bindEvent(this,hotTag));	
				}				
			},
			
			/**
			 * 点击事件处理函数
			 * @param {element} tag 被点击的热词tag
			 */
			clickHandler:function(tag){
				var selectText=tag.text();
				var has=false;
				if(this.slectedAry.length>0){
					//has tag
					this.slectedAry.each(function(itm,i){
						if(selectText==itm){
							//has the same
							this.slectedAry.splice(i,1);
							i--;
							has=true;
						}
					}.bind(this));
				}
				
				if(!has){
					this.slectedAry.push(selectText);
					tag.attr('className', 'on');
				}else{
					tag.attr('className', '');
				}				
				
				this.selected.html(this.slectedAry.join(" "));
			}
											 
		});
	}		  
)