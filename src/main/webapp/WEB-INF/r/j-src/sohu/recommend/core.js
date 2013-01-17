
$register('sohu.recommend.*', function() {
	
	var PACK = sohu.recommend;

	/********************************************* RecommendMdl *********************************************/
	
	var RecommendMdl = new sohu.core.Model({
		
		actions: {
			
			add: {
				url:		'recommend.do',
				params: 	['rid','users'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			list: {
				url:        'list.do',
				params:     ['count'],
				method:     'get',
				format:     'json',
				type  :     'data'
			},
			del : {
				url:        'del.do',
				method:     'post',
				params:     ['id'],
				format:     'json',
				type  :     'blank'
			}		
		},
		
		url:				'/a/friend/recommend/'
	});
	/********************************************* RecommendCtl *********************************************/	
	PACK.RecommendCtl = {
		
		/**
		 * @param {Object} options 配置对象
		 * 		{
		 * 			rid:		'',
		 * 			name:		''
		 * 		}
		 */
		init: function(options) {
			this.opt=options;
			this._initDialog();
		},
		delList  : function(options){
			this.count=options.count|| 10;
			this._temp=options.filterList||{};
			var _element=$(options.element).up(".friendItem");
			this._getList(this._fadeOut.bind(this,_element,options.id));	
		},	
		addList  : function(element,type){
			var _listHTML ='<div class="friendAvatar"><a title="#{name}" href="/profile.do?u=#{id}"><img class="avatar-48" src="#{icon}" /></a></div>'+
					'<div class="firendOption">'+
						'<a title="#{name}" onclick="delList(this,#{id})" class="icon img-ignore" href="javascript:void(0)">不认识</a>'+
					'</div>'+
					'<div class="friendInfo">'+
						'<h4><a title="#{name}" href="/profile.do?u=#{id}">#{name}</a></h4>'+
						'<p class="action"><a title="加为好友" onclick=\'$call("sohu.friend.FriendAddWgt.add(#{id}, \'#friendRecommend_#{id}\')", "sohu.friend.*")\' href="javascript:void(0)" class="friendAdd">加为好友</a>'+
					'</div>';
			var _template = new kola.Template(_listHTML);
			var  _data=this._filterId();
			if(!_data){
				element.remove();
				return ;
			}
            this._dataCatche=this._dataCatche.slice(1);
            this._temp[_data.id]=true;
			element.html(_template.evaluate(_data));
			if(type){
				return;
			}
			kola.anim.FadeIn.action(element,{speed:8})
		},
		fillList   : function(element,num,filterList){
			this.count=50;
			this._temp=filterList||{};
			this._getList(this._fillList.bind(this,element,num));	
		},
		_fillList  : function(element,num){
			for(var i=0;i<num;i++){
				var _element=kola.Element.create("li");
				_element.addClass("friendItem");
				$(element).append(_element);
				this.addList(_element,true);
			}
		},
		_filterId : function(){
			if(this._dataCatche.length==0){
				return false;
			}
			var _data=this._dataCatche[0];
			if(this._temp[_data.id]){
				this._dataCatche=this._dataCatche.slice(1);
				_data=this._filterId();
			}
			return _data;
		},
		_fadeOut : function (element,id){
			kola.anim.FadeOut.action(element,{display:'',speed:8,callback:function(){
			   this._delList(id);	
			   this.addList	(element)	
				}.bind(this)
			});
		},
		_getList : function(func){
			var _list=this._dataCatche;
			if((!_list||_list.length==0)&&!this.noData){
				RecommendMdl.list({count : this.count}, {
					success: function(data) {
						this._dataCatche=data;
						func();
					}.bind(this), 
					failure: function() {
						this.noData=true;
						this._dataCatche=[];
				         func();
					}.bind(this)
				})
			}else{
				func();
				return false;
			}
		
		},
		_dataCatche :[],
		_delList : function(rid){
			RecommendMdl.del({
				id: rid
			}, {
				success: function() {
					
				}.bind(this), 
				failure: function() {
					//this._dialog.setContent("<p>发送失败</p><p>这样的事情都可以发生太不可思议了</p>");
				}
			})
		},
		_initDialog : function(){
			var html='<div id="recommendSelecter" class="selector">'+
						'<ol class="tokenList"><li><input id="wName" name="receiverIds" type="hidden" /><input type="text"/></li></ol>'+
					'</div>';
		    var html='<div class="friendDialog-recommend">'+
				'<p>把'+this.opt.name+'介绍给谁认识呢？</p>'+
				'<dl class="fieldset">'+	
					'<dt><img src="'+this.opt.src.replace(">","")+'" class="avatar-48" /></dt>'+	
					'<dd>'+
						'<p id="recommendTitle" ></p><div id="recommendSelecter" class="selector">'+
						'<ol class="tokenList"><li><input id="wName" name="receiverIds" type="hidden" /><input type="text"/></li></ol>'+
						'</div>'+
					'</dd>'+
				'</dl>'+
			'</div>';
			this._dialog= new sohu.ctrl.Dialog({
				title: '把<b>'+this.opt.name+'</b>推荐给好友',
				content: html,
				width: 420,
				buttons :[
					{html:"推荐给好友",isRed:true,func:this._send.bind(this)},
					{html:"取消",close:true}
				],
				onClose :this._closeSelector.bind(this),
				mask: true
			});
			this.friendSelector=new sohu.friend.Selector({
	            element:'#recommendSelecter',
	            type: 2,
	            zindex :3500,
	            except :[this.opt.rid+""],
	            isButton:true
	        });
	        this._mesBox=$("#recommendTitle");
			this._dialog.show();
		}, 
		_closeSelector : function(){
			if(this.friendSelector.selectDialog.popLayer.parent()){
				this.friendSelector.selectDialog.popLayer.remove();
			}
		},
		_send  : function(){
			var _users=$("#wName").val();
			if(_users==""){this._setMes("请选择要推荐给的朋友！");return;}
			this._setMes("提交中...");
			this._dialog.setButton({html:"关闭",close:true,isRed:true});
			this._sendRecommend(_users);
		},
		_setMes  : function(str){
			this._mesBox.show();
			this._mesBox.html(str);
			setTimeout(function(){
				this._mesBox.hide();
			}.bind(this),2000)
		},
		_sendRecommend: function(ulist) {
			RecommendMdl.add({
				rid 	:  this.opt.rid,
				users   :  ulist
			}, {
				success: function() {
					this._dialog.setContent("<p>发送成功</p><p>他们将收到你的推荐，感谢你介绍<b>"+this.opt.name+"</b>给他们认识。</p>");
					this._dialog.close.bind(this._dialog).timeout(3);
				}.bind(this), 
				failure: function() {
					this._dialog.setContent("<p>发送失败</p><p>这样的事情都可以发生太不可思议了</p>");
					this._dialog.setButton({html:"关闭",close:true,isRed:true});
					this._dialog.close.bind(this._dialog).timeout(3);
				}.bind(this)
			});
		}	
    }
	
}, 'sohu.core.*, sohu.ctrl.Dialog, sohu.friend.*');