
$register('sohu.inbox.*', function() {
    
    var PACK=sohu.inbox;

    var tip = {
        beforeList: function(contentEl,type){
            var tmp='<div class=\"load-page\"></div>';
            contentEl=$(contentEl);
            if(type=='add'){
                tip.afterList(contentEl);
                contentEl.append(tmp);
            }
            if(type=='clear')
                contentEl.html(tmp);
        },
        afterList: function(contentEl){
            var t=$(contentEl).down('.load-page');
            if(t)
                t.remove();
        },
        success: function(contentEl,str){
            var tmp = "<div class=\"msg msg-succeed\">" + str + "</div>";
            contentEl=$(contentEl);
            contentEl.before(tmp);
            var timeFun = function(){
                contentEl.parent().down('.msg').remove();
            };
            timeFun.timeout(3);
        }
    };
    /***********InboxMdl*************/

    var inboxMdl=new sohu.core.Model({
        actions:{
            list:{
                url :       '/list.do',
                params:     ['type', 'cate', 'start', 'size'],
                method:     'get',
                format:     'json',
                type:       'list'
            },

            del:{
                url:        '/del.do',
                params:     ['id'],
                method:     'post',
                format:     'json',
                type:       'blank'
            },

            delall:{
                url:        '/delall.do',
                params:     ['type'],
                method:     'post',
                format:     'json',
                type:       'blank'
            },

            readed:{
                url:        '/readed.do',
                params:     ['id'],
                method:     'post',
                format:     'json',
                type:       'blank'
            },

            reply: {
                url:        '/reply.do',
                params:     ['threadId','content'],
                method:     'post',
                format:     'json',
                type:       'one'
            }
        },
        url:                '/a/inbox/info'
    });

    /************inboxCtl*************/

    PACK.InboxCtl={
        init: function(options) {
            this._options=options;
            this.barEls=$(this._options.barEls);
            this.tab=new kola.ctrl.DataKeyTab(options.tabEls,{
				callback: 	this._showType.bind(this)
            });
            if(tabtype)
                this.tab.active(tabtype);
            else
                this.tab.active('0');
        },

        del: function(id){
            sohu.ctrl.Dialog.confirm('是否要删除此信件？',{
               title: '删除信件：',
               yes: function(){
                    this.lister.del(id);
               }.bind(this),
               no: function(){}
            });
        },

        delto: function(id){
            sohu.ctrl.Dialog.confirm('是否要删除此信件？',{
               title: '删除信件：',
               yes: function(){
                    inboxMdl.del({
                        id: id
                    },{
                        success: function(data){
                            document.location="index.do";
                        }
                    })
               }.bind(this),
               no: function(){}
            });
        },

        delAll: function(type){
            sohu.ctrl.Dialog.confirm('是否清空收件箱？',{
               title: '清空收件箱：',
               yes: function(){
                   inboxMdl.delall({
                        type: type
                    }, {
                        success: function(data) {
                            tip.success(this._options.listEl, '已清空收件箱。');
                            this.lister.list(0);
                        }.bind(this),
                        failure: function() {}
                    });
               }.bind(this),
               no: function(){}
            });
        },

        readed: function(id){
            if(id == null || id == 'undefined') id = 0;
            inboxMdl.readed({
                id: id
            }, {
                success: function(tid,data) {
                    if(id != 0){
                        var el=$("#inbox_"+tid);
                        el.attr('class','');
                        //el.down('.i4').down('font[color=red]').remove();
                        //this.lister.updateItem(tid, data);
                    }else{
                        tip.success(".inboxTopBar", '已全部设为已读。');
                        this.lister.list(0);
                    }
				}.bind(this, id),
				failure: function() {}
            });
        },

        reply: function(form){
            form = $(form);
            var id = form.down('#threadId').val();
            var content = form.down('#contentEl').val();
            if(content.trim().length<1){
                return;
            }
            inboxMdl.reply({
                threadId: id,
                content: content
            }, {
                success: function(data){
                    form.before(data);
                    form.down('#contentEl').val('');
                }.bind(this),
                failure: function() {}
            });
        },

        _showType: function(key){
            tip.beforeList(this._options.listEl,'clear');
            if (!this.lister) this._initLister();
            var data={
                
            };
            if(key!='0'){ //发件箱选中
                data.type=1;
                this.barEls.hide();
            }else{
                this.barEls.show();
            }
            this.lister.setMethodData(data, 'list');
            this.lister.list(0);
        },
       /*
        * 初始化列表控件
        */
        _initLister: function(){
            var config={
                type: 'page',
                //	列表的配置信息
                list:{
                    ctrEl:		this._options.listEl,		//	列表容器对象
		  			itemsEl:	'>tr',				//	所有项的CSS匹配符
		  			itemEl:		'#inbox_${id}',		//	指定项的CSS匹配符
		  			size:		10					//	列表显示数量
                },
                //	页的配置信息
		  		page: {
		  			ctrEl:		this._options.pageEl		//	翻页容器对象
		  		},
                //	模型配置信息
		  		model: {
		  			obj:		inboxMdl,			//	模型对象
		  			key:		'id'
		  		},
                //	方法的配置信息
		  		methods: {
		  			//	list方法的配置信息
		  			list: {
		  				action:	'list',			//	对应模型的方法名
                        afterSuccess: this._afterSuccess.bind(this)
		  			},
                    del:{
                        action: 'del'
                    }
		  		}
            };
            this.lister = sohu.ctrl.Lister.getPageList(config);
        },
        
        _afterSuccess: function(data){
            tip.afterList(this._options.listEl);
            var count = data.responseData.count;
            if(count==0){
                $(this._options.listEl).html("<div class=\"noMailBox\">暂无邮件，您可以现在 <a href=\"write.do\">给好友发站内信</a></div>");
                this.barEls.hide();
            }
        }
    }
    
}, 'sohu.core.*, sohu.ctrl.Dialog, sohu.ctrl.Lister, kola.ctrl.DataKeyTab');