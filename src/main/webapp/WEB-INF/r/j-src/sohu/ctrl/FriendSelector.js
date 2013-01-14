/**
* @fileoverview  好友选择器，支持输入框提示、弹出框、多选单选
* @authot  yunyan@sohu-inc.com
* @version  0.1
**/
$req('sohu.ctrl.TipSuggest');
$register(
	"sohu.ctrl.FriendSelector",
	function(){
		sohu.ctrl.FriendSelector=Class.create({
			/**
			 * @constructor  FriendSelector类的构造函数
			 **/
			initialize:function(options){
				this.settings={
					uid:0,
					friends:[],
					element:"",///目标对象，比填项
					type:1,  ///1为单选器，2为多选器
					isButton:true, ///是否显示好友选择器按钮
					isGroup:true,///是否显示好友分组，isButton=true有效
					except:null,///启动屏蔽好友,此功能暂时没法做，需要讨论
					autoSubmit:null,///选择好友后，执行函数,为函数格式，如function(i){}
					maxNum:0,///复选器选择用户人数上限，0为无上限
					tipWidth: 320, ///tip提示框的默认宽度
					defaultValue:null///预选的好友,数组格式[123,432,45]
				};
				Object.extend(this.settings,options);

				this.tip="请输入好友姓名（支持模糊输入和拼音首字母输入）";
				this.errtip="没有找到匹配的好友";
				this.body=$(document.body);
				this.canClose=true;
				this.selectDialog=null;
				this.tips=null;
				this.element=$(this.settings.element);
				this._setup();
			},
			/**
			 * 好友选择器的主要方法
			 **/
			_setup:function(){
				var _this=this;
				var element=this.element;
				if(this.settings.isButton){
					this.selectDialog=new sohu.ctrl.FriendSelectDialog({
						element:this.settings.element,
						defaultValue:this.settings.defaultValue,
						isGroup:this.settings.isGroup,
						maxNum:this.settings.maxNum,
						friends:this.settings.friends,
						type:this.settings.type,
						submit:function(a){
							a.each(function(i){
								_this._selectOn.bindEvent(_this,_this._getFriendById(i))();
							});
						}
					});
				}
				
				if(this.settings.defaultValue){
					this.settings.defaultValue.each(function(i){
						_this._selectOn.bindEvent(_this,_this._getFriendById(i))();
					});
				};
				this.tips=new sohu.ctrl.SelectChangeTip({
					element:this.settings.element+ ' input',
					onFocus: function(){
						_this.tips.content(_this.tip);
					},
					onChange: function(v){
						if(v.length>0){
							var flag=false;
							_this.tips.content('');
							_this.settings.friends.each(function(i){
								if(_this._matching(i,v)){
									_this.tips.add(i.name.replace(v,"<em>"+v+"</em>"),'u'+i.uid);
									flag=true;
								}
							});
							if(flag){
								_this.tips.firstOn();
							}else{
								_this.tips.content(_this.errtip);
							}
						}else{
							_this.tips.content(_this.tip);
						}
					},
					onSelect: function(t,v){
						_this._selectOn.bindEvent(_this,{uid:parseInt(v),name:t})();
					},
					posto:_this.settings.element,
					position: [0,-1],
					width: 320
				});
				
			},
			/**
			 * 模糊查找
			 * @param {Object} u用户json
			 * @param {Object} s要匹配的值
			 */
			_matching:function(u,s){
				var a=s.split('');
				var r=true;
				a.each(function(i){
					if(u.name.indexOf(i)<0 && u.ename.indexOf(i)<0){
							return r=false;
						}
				});
				return r;
			},
			/**
			 *根据用户ID号获取好友
			 */
			_getFriendById:function(id){
				var r={};
				this.settings.friends.each(function(i){
					if(i.uid==parseInt(id)){
						r=i;
					}
				});
				return r;
			},
			/**
			 *选中操作    
			 */
			_selectOn:function(){
				if(this.settings.type==1){
					this.element.down('input').val(arguments[1].name);
				}else{
					this._tokenAdd(arguments[1]);
				}
			},
			_tokeGet:function(){
				var r=[];
				var o=this.element.down('input').parent();
				if(o.prevAll()){
					o.prevAll().each(function(i){
						r.push(parseInt(i.attr('id').replace("radio_",'').replace("checkbox_",'')));
					});
				}
				return r;
			},
			_tokenAdd:function(f){
				if(!this._tokeGet().include(parseInt(f.uid))){
					this.element.down('input').parent().before("<li id='checkbox_"+f.uid+"'><a href='javascript:void(0);'><span>"+f.name+"<em class='x'></em></span></a></li>");
				}					
				this.element.down('input').val('');
				this.element.down('li a').un('click',this._tokenHove);
				this.element.down('li a').on('click',this._tokenHove);
				this.element.down('li a em').un('click',this._tokenDel);
				this.element.down('li a em').on('click',this._tokenDel);

			},
			/**
			 *删除一好友
			 *
			 */
			_tokenDel:function(e){
				kola.Event.element(e).parent().parent().parent().remove();
			},
			
			_tokenHove:function(e){
				var obj=kola.Event.element(e).parent().parent();
				if(obj.attr("class")){
					if(obj.attr("class")=='on'){obj.attr("class",'');return;}
				}
				obj.attr("class",'on');
			}
		});
	}
);
$register(
	"sohu.ctrl.FriendSelectDialog",
	function(){
		sohu.ctrl.FriendSelectDialog=Class.create({
			initialize:function(options){
				var settings={
					element:"",
					type:1,
					friends:[],
					defaultValue:[],
					isGroup:true,
					maxNum:0,
					width:200,
					name:'FSelectDialog',
					submit:function(){}
				};
				Object.extend(settings,options);
				this.settings=settings;
				settings.name+="_"+settings.element;
				settings.element=$(settings.element);
				this.layerBtn="<a class='toggle' href='javascript:void(0);'></a>";
				this._this=null;
				settings.element.attr('class','selector  selector-toggle');
				settings.element.prepend(this.layerBtn);
				
				if(!document.getElementById(settings.name)){
					var str="<div id='"+settings.name+"' class='popLayer toggleWrap' style='display:none;width:"+settings.width+"px;'><div class='decor'></div>";
					str+="<div class='content'>";
					str+="<div class='head'><h4>请选择发送对象</h4></div>";
					str+="<div class='body'></div>";
					str+="<div class='foot'><span class='button button-main'><span><button type='button'>确定</button></span></span></div>";
					str+="</div></div>";
					$(document.body).append(str);
					this.popLayer=$("#"+this.settings.name);
					this.popLayer.down(".foot .button").on('click',this._buttonOK.bindEvent(this));
				}
				this.popLayer=$("#"+this.settings.name);
				settings.element.down(".toggle").on('click',this._toggleHandler.bindEvent(this));
			},
			
			_toggleHandler:function(){
				var button=this.settings.element.down('.toggle');
				if(button.attr('class')=='toggle'){
					button.attr('class','toggle toggle-on');
					this._show();
				}else{
					button.attr('class','toggle');
					this._hide();
					return;
				}
				var str="";
				var tokenget=this._tokenGet();
				if(this.settings.isGroup){
					if(this.popLayer.down('.option'))this.popLayer.down('.option').remove();
					str="<div class='option'><select class='select' name=''>";
					str+="<option>全部好友</option>";
					this._getFriendType().each(function(i){
						str+="<option>"+i+"</option>";
					});
					str+="</select></div>";
					this.popLayer.down('.head').append(str);
					this.popLayer.down(".option select").on('change',this._selectChange.bindEvent(this,tokenget));
				}
				this.popLayer.down('.body').html(this._getFriend(0,tokenget));
			},
			
			_selectChange:function(){
				var v=this.popLayer.down(".option select").val();
				this.popLayer.down(".body").html(this._getFriend(v,arguments[1]));
			},
			_buttonOK:function(){
				var r=[];
				this.popLayer.down(".body input").each(function(i){
					if(i.val()!=null){
						r.push(i.val());
					}
				});
				if(r.length>0){
					this.settings.submit.apply(null,[r]);
				}
				this.settings.element.down('.toggle').attr("class","toggle");
				this._hide();
			},
			
			_show:function(){
				var button=this.settings.element.down('.toggle');
				this.popLayer.css('left',(button.pos().left-this.settings.width+button.width()+1)+'px');
				this.popLayer.css('top',(button.pos().top+button.height())+'px');
				this.popLayer.show();
			},
			
			_hide:function(){
				this.popLayer.hide();
			},
			
			/**
			 *获取好友分类
			 */
			_getFriendType:function(){
				var r=[];
				this.settings.friends.each(function(i){
					if(!r.include(i.type)){
						r.push(i.type);
					}
				});
				return r;
			},
			
			_getFriend:function(type,token){
				var t=this.settings.type==1?"radios":"checkboxes";
				var s="<ul class='"+t+"'>"
				var o='';
				var checkFriend=function(id){
					var r=false;
					token.each(function(i){
						if(i.uid==id){
							r=true;
						}
					});
					return r;
				};
				this._getFriendByType(type).each(function(i){
					if(checkFriend(i.uid))
						o=" checked=checked"
					else
						o="";
					if(t=='radios')
						s+="<li><label for='radio_"+i.uid+"'><input type='radio' value='"+i.uid+"' id='radio_"+i.uid+"' name='radio'"+o+" />"+i.name+"</label></li>";
					else
						s+="<li><label for='friend_"+i.uid+"'><input type='checkbox' value='"+i.uid+"' id='friend_"+i.uid+"' name='checkbox'"+o+" />"+i.name+"</label></li>";
				});
				s+="</ul>"
				return s
			},
			
			/**
			 *根据好友分类获取好友
			 */
			_getFriendByType:function(type){
				type=type==null || type==0?"全部好友":type;
				var r=[];
				if(type=="全部好友"){
					return this.settings.friends;
				}else{
					this.settings.friends.each(function(i){
						if(i.type==type)
							r.push(i);
					});
					return r;
				}
			},
			/**
			 *获取已选择好友，返回好友数组
			 *
			 */
			_tokenGet:function(){
				var r=[];
				var o=this.settings.element.down('input').parent();
				if(o.prevAll()){
					o.prevAll().each(function(i){
						r.push({uid:parseInt(i.attr('id').replace("radio_",'').replace("checkbox_",'')),name:i.text()});
					});
				}
				return r;
			}
		});
	}
);
