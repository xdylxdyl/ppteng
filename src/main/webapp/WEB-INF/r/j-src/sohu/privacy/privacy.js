/**
 * @fileoverview  隐私功能显示相关的JS类实现
 * @author  hongwei@sohu-inc.com & Neo www.neoy.cn
 * @version  0.1
 * 
 * @requires 	kola
 */

$register(
	'sohu.privacy.privacy',
	function(){
		/**
		 * @constructor
		 */


		var requestMdl = new sohu.core.Model({
		
			actions: {
				
				show: {
					url:		'/privacy/profile/show.do',
					params: 	['typeid'],			
					method: 	'get',
					format: 	'json',
					type:		'one'
				}
			},
			
			url:		  '/a'
		});
		
		var     data={
						"typeid":14,
						"level":3,
						"cuslevel":1,
						"pu":[
								{"id":11601,"name":"张静十号"},
								{"id":13604,"name":"大白菜"}
								],
						"bu":[
								{"id":111,"name":""},
								{"id":222,"name":""}
								],
						"pg":[
								{"id":1,"name":"朋友"},
								{"id":2,"name":"邻居"}
								],
						"bg":[
								{"id":3,"name":"朋友"},
								{"id":1,"name":"邻居"}]
					}
			_groups=[
				{name:"家人" ,id:1},
				{name:"同事" ,id:2},
				{name:"朋友" ,id:3},
				{name:"陌生人",id:4}	
				]
			us=[11601,13604];

		sohu.privacy.Base = Class.create({			
			initialize:function(options){
				this.opt=Object.extend({
					model    : options.model || 1,
					type     : options.type || 1,
					name     : options.name || "privacy",
					element  : $(document.body),
					data     : options.data || false,
					groups   : options.groups || false,
					callback : function(){}
				},options||{});
				this.backData={};
				this.data=this.opt.data,
				this.groups=this.opt.groups;
				this.catche=false;
				this.dataBox={cuslevel:true,pu:true,bg:true,pg:true,bu:true}
				this.dialogType=this.opt.type;
				this._selector={};
				this._loadData();
				var _okBtn=this.opt.model==1?"确定":"保存";
				this.dialog=new sohu.ctrl.Dialog({
					title:"隐私设置",
					lodding : true,
					content :" ",
					mask    : true,
					buttons :[
						  {html:_okBtn,isRed:true,func:this._submit.bind(this)},
			              {html:'取消',event:'click',func:this._cancel.bind(this)}
			              ]
				});
				this.dialog.show();
			},
			_loadData : function(){
				var _state=0;
				 if(!this.data){
					requestMdl.show({
						typeid : this.opt.typeid
					}, {
						success: function(data) {
							
		                	this.data=data;
		                	if(_state>=1){
		                		this._initDialog();
		                	}else{
		                	  _state++;
		                	}
						}.bind(this),
						failure: function() {
							
						}
					});
				 }else{_state++}
				 if(!this.groups){
					sohu.friend.friendMdl.groupList(null, {
						success: function(data) {
							this.groups=data;
							if(_state>=1){
		                		this._initDialog();
		                	}else{
		                	  _state++;
		                	}
						}.bind(this),
						failure: function() {
						}
					});
				 }else{
				 	_state++
				 }
				 if(_state>=2){
				 	this._initDialog();
				 }
			},
			_select: function(data){
				var _select=$("select",this.dialog.body);
				var _selfSetBox=$("#selfSetBox");
				
				if(data){
					
					if(data.constructor==Number){
						//alert(data)
						_select.select(data);
						if(data>=1){
							_selfSetBox.show();
						}
						return ;
					};
					if(data=="Event"){
						
						_select.on('change',function(){
							if(this.value=="2"){
								_selfSetBox.show();
							}else{
								_selfSetBox.hide();
							}
						})
					}
				}else{
					return _select.val();
				}
			
			},
		    _radio : function  (data) {
				var _radios=$("input[type=radio]",this.dialog.body);
				var _someFriendSel=$("#wfriend").parent();
				if(data){
					if(data.constructor==Number){
						_radios.each(function(lt,i){
							if(lt.attr("value")==data){
								if(data==5){
									_someFriendSel.show();	
								}
								lt.attr("checked",true);
							}
						}.bind(this));
						return;
					}
				
					if(data=="Event"){
						
						_radios.on('click',function(){
							if(this.id=='someFriend'){
								_someFriendSel.toggle();
							}else{
								_someFriendSel.hide();
							}
						})
					}
				}else{
					var _data=0;
					_radios.each(function(lt,i){
						if(lt.val()){
							_data=lt.attr('value');
						}
					})
					return _data;
				}
		    },
			_checkBox  : function(element,data,type){
				var _ele=$(element);
				var _checks=$("input[type=checkbox]",_ele);
				if(data){
					if(type=="list"){
						var _str="";
						data.each(function(lt,i){
							_str+='<label ><input type="checkbox" name="'+lt.id+'" class="checkbox" value="'+lt.id+'" />'+lt.name+'</label>'
						})
						_ele.html(_str);
					}
					if(type=="set"){
						
						_checks.each(function(lt,i){
							data.each(function(ot,l){
								if(lt.attr("value")==ot.id){
									lt.attr("checked",true);
								}
							})
						})
					}
				}else{
					var _data=[];
					_checks.each(function(lt,i){
						if(lt.val()){
							_data.push(lt.val());
						}
					})
					return _data;
				}
			},
			_buttons   : function(){
				var _button=this.dialog.pannel.down(".foot button[type=button]").get(0)
				if(_button){
					if(this.opt.model==2){
						_button.html('确定');
					}else{
						if(this.dialogType==1){
							_button.html("确定")
						}else{
							_button.html("保存")
						}
					}
				}
			},
			_uggroups  : function(element,data){
				var _ele=$(element);
				if(data){
					var _str="";
					data.each(function(lt,i){
						_str+='<a href="javascript:void(0)">'+lt.name+'</a>';
					})
					_ele.html(_str);
				}else{
					
				
				}
			},
			
			_setPannelA  : function(data){
					this.dialog.setContent(this._setDialog);
					
					this._select(data.cuslevel);
					this._select("Event");
					this._uggroups("#wgroupList",data.pg);
					this._uggroups("#bgroupList",data.bg);
					this._uggroups("#wfriend",data.pu);
					this._uggroups("#bfriend",data.bu);
					$("#selfSetting").on('click',function(){
						this._setPannelB(data);						
					}.bind(this))
					this.dialogType=1;
					this._buttons();
			},
			_setPannelB   : function(data){
					this.dialog.setContent(this._selSetHtml);
					this._radio(data.cuslevel);
					this._radio("Event");
					this._checkBox("#wgroupList",this.groups,"list");
					this._checkBox("#bgroupList",this.groups,"list");
					this._checkBox("#wgroupList",data.pg,"set");
					this._checkBox("#bgroupList",data.bg,"set");
					this._initFriendSelector('wfriend',data);
					this._initFriendSelector('bfriend',data);
					this.dialogType=2;
					this._buttons();
			},
			_initFriendSelector : function(id,data){
				
				this._selector[id]=new sohu.friend.Selector({
		            element:"#"+id,
		            type: 2,
		            zindex :3500,
		            except :[],
		            complete    : function(data){
			           this.backData[id]=data;
		            }.bind(this),
		            defaultValue :false, 
		            isButton:true
		        });
			},
			_initDialog   :function(){ 
				if(this.opt.type==1){
					this._setPannelA(this.data);
				}else{
					this._setPannelB(this.data);
				}
			},
			_setHiddenInput : function(data){
				var _hiddenBox=$("#"+this.opt.name+"_hiddenBox");
				if(!_hiddenBox){
					var _hiddenBox=kola.Element.create("div");
					_hiddenBox.attr('id',this.opt.name+"_hiddenBox")
					this.opt.element.append(_hiddenBox);
				}else{
					_hiddenBox.html("");
				}
				for(var o in data){
					if(this.dataBox[o]){
					var _value="";
					if(data[o].constructor==Array){
						var temp=[];
						data[o].each(function(lt,i){
						  if(lt.constructor==Object){
						  	temp.push(lt.id);
						  }else{
						  	temp[i]=lt;
						  }
						})
						_value=temp.join(",");
					}else{
						_value=data[o];
					}
					
					var _input =kola.Element.create("input");
					_input.attr('name',o+"_"+this.opt.name);
					_input.attr('value',_value);
					_hiddenBox.append(_input);
					}
				}
				
			},
			_getDataList : function(){
				var _result={
					cuslevel : this._getCuslevel(),
					pu       : this._getUsers("#wName"),
					bu       : this._getUsers("#bName"),
					pg       : this._getGroups("#wgroupList"),
					bg       : this._getGroups("#bgroupList")
				}
				return _result;	
			},
			
			_reSet       :function(value){
					this.dialog.setContent(this._setDialog);
					this._select(1);
					this._select("Event");
					this._uggroups("#wgroupList",this._getGroupsName(value.pg));
					this._uggroups("#bgroupList",this._getGroupsName(value.bg));
					this._uggroups("#wfriend",this.backData['wfriend']);
					this._uggroups("#bfriend",this.backData['bfriend']);
					$("#selfSetting").on('click',function(){
						this._setPannelB(data);						
					}.bind(this))
					this.dialogType=1;
					this._buttons();
			},
			_reSetGroups :  function(id){
				if(this.backData[id]){
					this._initGroupsA("#"+id,this.backData[id])
				}else{
					return true;
				}
			},
			_getGroupsName : function(ids){
				var _group=[];
				for(var i=0;i<ids.length;i++){
					for(var j=0;j<this.groups.length;j++){
						if(this.groups[j].id==ids[i]){	
							_group.push(this.groups[j]);
						}
					}
				}
				return _group;			
			},
			_getCuslevel : function(){
				var _data="";
				if(this.dialogType==2){
					_data=this._radio();
				}else if(this.dialogType==1){
					_data=this._select();
				}
			   return _data;
			},
			_getUsers      :function(ele){
				var _ele=$(ele);
				if(!_ele){
					return [];
				}
				return _ele.val().split(",");
			},
			_getGroups      :function(ele){
				var _data=[];
				var _checks=$("input",$(ele));
				if(!_checks){
					return "";
				}
				_checks.each(function(lt,i){
					if(lt.val()){
						_data.push(lt.val());
					}
				})
				return _data;
			},
			_submit     :function(){
				var _value=this._getDataList();
				if(this.opt.type==1&&this.dialogType==2){
					this.catche=_value;
					this._reSet(_value);
				}else if(this.opt.type==1&&this.dialogType==1){
					var _val=this._getDataList();
					if(this.catche&&_val.cuslevel!=1){
						this._callBack(this.catche);
					}else {
						if(_val.cuslevel>1){
							this._callBack(this.data);
						}else{
							this._callBack({cuslevel:0})
						}
					}
				}	
			},
			_cancel     :function(){
				var _hiddenBox=$("#"+this.opt.name+"_hiddenBox");
				if(this.opt.type==1&&this.dialogType==2){
					this._setPannelA(this.data);
				}else{
					if(_hiddenBox){
						_hiddenBox.remove();
					}
					this.dialog.close();
				}
			},
			_callBack :    function(value){
				if(this.opt.model==1){
					this.opt.callback(value);
				}else if(this.opt.element){
					this._setHiddenInput(value);
					this.dialog.close();
				}
			},
			_selSetHtml : '<form method="post"><h5>个人网站：</h5>'+
					'<div class="row"><label ><input type="radio" value="0"  class="radio" name="cuslevel" />全部登录用户</label></div>'+
					'<div class="row"><label ><input type="radio" value="1" class="radio" name="cuslevel" />好友及好友的好友</label></div>'+
					'<div class="row"><label ><input type="radio" value="2" class="radio" name="cuslevel"  />仅好友</label></div>'+
					'<div class="rowOver">'+
						'<label for="someFriend"><input type="radio" class="radio" name="cuslevel" value="3" id="someFriend"/>某些好友</label>'+
						'<div class="listList" style="display:none" >'+
							'<div class="selector selector-toggle" id="wfriend" ><a href="javascript:void(0);" class="toggle"/><ol class="tokenList"><li><input type="hidden" name="receiverIds" id="wName"/><input type="text" style="display: none;"/></li></ol></div>'+
							'<p>指定某些好友分组：</p>'+
							'<div id="wgroupList">' +
								
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="bListTit">排除某些好友</div>'+
					'<div class="bListRow">'+
						'<div class="selector selector-toggle" id="bfriend" ><a href="javascript:void(0);" class="toggle"/><ol class="tokenList"><li><input type="hidden" name="receiverIds" id="bName"/><input type="text" style="display: none;"/></li></ol></div>'+
					'</div>'+
					'<div class="bListTitGroup">排除某些分组</div>'+
					'<div class="bListRow" id="bgroupList">'+
							
					'</div></form>',
		  _setDialog    : '<form method="post"><h5>个人网站：</h5>'+
					'<div class="privacyIcon">'+
						'<select class="select" name="cuslevel">'+
							'<option value="1" >全部登录用户</option>'+
							'<option value="2" >自定义设置</option>'+
						'</select>'+
					'</div>'+
					'<div id="selfSetBox" style="display:none;_display:block">'+
						'<div class="wList">'+
							'<div class="listBox fix">'+
								'<div class="listTit"><strong>允许：</strong>好友</div>'+
							    '<div class="listContent" id="wfriend"></div>'+
							'</div>'+
							'<div class="listBox fix">'+
								'<div class="listTit">分组</div>'+
								'<div class="listContent" id="wgroupList">'+
									
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="bList">'+
							'<div class="listBox fix">'+
							  '<div class="listTit"><strong>排除：</strong>好友</div>'+
							  '<div class="listContent" id="bfriend">'+
								
						      '</div>'+
						'</div>'+
							'<div class="listBox fix">'+
								'<div class="listTit">分组</div>'+
							    '<div class="listContent" id="bgroupList">'+
									
							    '</div>'+
							'</div>'+
						'</div>'+
						'<div class="option"  style="padding-right:10px"><a id="selfSetting" href="#">编辑自定义设置</a></div>'+
					'</div></form>'
		});
	},'sohu.ctrl.Dialog,sohu.friend.*');
			