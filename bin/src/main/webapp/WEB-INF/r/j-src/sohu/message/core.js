
$register('sohu.message.*', function() {
	
	var PACK = sohu.message;

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
	/********************************************* RequestMdl *********************************************/
	
	var requestMdl = new sohu.core.Model({
		
		actions: {
			
			list: {
				url:		'/list.do',
				params: 	['start', 'size', 'cate', 'u'],
				
				method: 	'get',
				format: 	'json',
				type:		'list'
			},
			
			deal: {
				url:		'/deal.do',
				params: 	['id', 'action'],
				
				method: 	'get',
				format: 	'json',
				type:		'one'
			},
			
			ignore: {
				url:		'/ignore.do',
				params: 	['id'],
				
				method: 	'get',
				format: 	'json',
				type:		'blank'
			},
			
			ignoreall: {
				url:		'/ignoreall.do',
				params: 	['start', 'size', 'cate', 'u'],
				
				method: 	'get',
				format: 	'json',
				type:		'list'
			}
			
		},
		
		url:				'/a/request/info'
	});
	
	/********************************************* RequestCtl *********************************************/
	
	PACK.RequestCtl = {
		
		/**
		 * @param {Object} options 配置对象
		 * 		{
		 * 			listEl:		'#listEl',
		 * 			pageEl:		'#pageEl',
		 * 			tabEls:		'#tabEl>div'
		 * 		}
		 */
		init: function(options) {
			this._options = options; 
			
			this.tab = new kola.ctrl.DataKeyTab(options.tabEls, {
				firstCall:	true,
				callback: 	this._showCate.bind(this)
			});
		},
		
		deal: function(obj, url) {
            var element = $(obj);
            element = element.up(".reqItem");
            var requestId = element.down('.requestId').val();
            var appType = element.down('.appType').val();
			requestMdl.deal({
				id:		requestId,
				action:	encodeURIComponent(url)
			}, {
				success: function(id, data) {
                    if(url == "ignore" || appType == "1")
                        this.lister.updateItem(requestId, data);
                    else
                        document.location = url;
				}.bind(this, requestId),
				failure: function() {
					
				}
			});
		},
		
		ignore: function(id) {
			requestMdl.ignore({
				id:		id
			}, {
				success: function(id, data) {
					this.lister.delItem(id);
				}.bind(this, id), 
				failure: function() {
					
				}
			});
		},
		
		ignoreAll: function() {
            sohu.ctrl.Dialog.confirm('是否要忽略全部请求？',{
               title: '提示：',
               yes: function(){
                   var datas = {};
                   if (this.tab.key != '-1') datas.cate = this.tab.key;
                   requestMdl.ignoreall(datas, {
                        success: function(data) {
                            tip.success(this._options.listEl, '已忽略所有请求。');
                            this.lister.list(0);
                        }.bind(this),
                        failure: function() {

                        }
                    });
               }.bind(this),
               no: function(){}
            });
		},
		
		_showCate: function(name) {
            tip.beforeList(this._options.listEl,'clear');
			if (!this.lister) this._initLister();
			var data = {
				u:		Me.id()
			}
			if (name != '-1') data.cate = name; 
			this.lister.setMethodData(data, 'list');
			this.lister.list(0);
		},
		
		_initLister: function() {
			var config = {
				
		  		//	列表的配置信息
		  		list: {
		  			ctrEl:		this._options.listEl,		//	列表容器对象
		  			itemsEl:	'>div',				//	所有项的CSS匹配符
		  			itemEl:		'#request_${id}',		//	指定项的CSS匹配符
		  			size:		20					//	列表显示数量
		  		},
		  		
		  		//	页的配置信息
		  		page: {
		  			ctrEl:		this._options.pageEl		//	翻页容器对象
		  		},
		  
		  		//	模型配置信息
		  		model: {
		  			obj:		requestMdl,			//	模型对象
		  			key:		'id'
		  		},
		  		
		  		//	方法的配置信息
		  		methods: {
		  			
		  			//	list方法的配置信息
		  			list: {
		  				action:	'list',				//	对应模型的方法名
		  				data: {						//	默认的参数
		  					u:	Me.id()
		  				},
                        afterSuccess: this._afterSuccess.bind(this)
		  			}
		  		}
		  	}
			this.lister = sohu.ctrl.Lister.getPageList(config);
		},

        _afterSuccess: function(data){
            tip.afterList(this._options.listEl);
            data = data.responseData;
            if(data.count == 0){
                data.list = '没有任何请求。';
                $(this._options.actionEl).hide();
                this.lister.updateContent(data);
            }
        }
    }
	
	/********************************************* NoticeMdl *********************************************/
	
	var noticeMdl = new sohu.core.Model({
		
		actions: {
			
			all: {
				url:		'/all.do',
				params: 	['cate', 'u'],
				
				method: 	'get',
				format: 	'json',
				type:		'all'
			},
			list: {
				url:		'/list.do',
				params: 	['cate'],
				
				method: 	'get',
				format: 	'json',
				type:		'list'
			},
			del: {
				url:		'/del.do',
				params: 	['id'],
				
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			delAll: {
				url:		'/delall.do',
				params: 	['cate'],
				
				method: 	'post',
				format: 	'json',
				type:		'blank'
			}
			
		},
		
		url:				'/a/notice/info'
	});
	
	/********************************************* NoticeCtl *********************************************/
	
	PACK.NoticeCtl = {
		
		/**
		 * @param {Object} options 配置对象
		 * 		{
		 * 			listEl:		'#listEl',
		 * 			tabEls:		'#tabEl>div'
		 * 		}
		 */
		init: function(options) {
			this._options = options; 
			
			this.tab = new kola.ctrl.DataKeyTab(options.tabEls, {
				firstCall:	true,
				callback: 	this._showCate.bind(this)
			});
		},
		
		del: function(id) {
			this.lister.del(id);
		},
		
		delAll: function() {
            sohu.ctrl.Dialog.confirm('是否要删除所有通知？',{
               title: '提示：',
               yes: function(){
                   noticeMdl.delAll({
                        cate:	this.tab.key || ''
                    }, {
                        success: function(data) {
                            tip.success(this._options.listEl, '已删除所有通知。');
                            this.lister.list(0);
                        }.bind(this), 
                        failure: function() {

                        }
                    });
               }.bind(this),
               no: function(){}
            });
		},
		
		_showCate: function(name) {
            tip.beforeList(this._options.listEl,'clear');
			if (!this.lister) this._initLister();
			var data = {
				u:		Me.id()
			}
			if (name != '-1') data.cate = name; 
			this.lister.setMethodData(data, 'list');
			this.lister.list(0);
		},
		
		_initLister: function() {
			var config = {
				
		  		//	列表的配置信息
		  		list: {
		  			ctrEl:		this._options.listEl,		//	列表容器对象
		  			itemsEl:	'>div',				//	所有项的CSS匹配符
		  			itemEl:		'#notice_${id}'		//	指定项的CSS匹配符
		  		},
		  
		  		//	模型配置信息
		  		model: {
		  			obj:		noticeMdl,			//	模型对象
		  			key:		'id'
		  		},
		  		
		  		//	方法的配置信息
		  		methods: {
		  			
		  			//	list方法的配置信息
		  			list: {
		  				action:	'all',				//	对应模型的方法名
		  				data: {						//	默认的参数
		  					u:	Me.id()
		  				},
                        afterSuccess: this._afterSuccess.bind(this)
		  			},
		  			
		  			del: {
		  				action: 'del'				//	对应模拟的方法名
		  			}
		  		}
		  	}
		  	this.lister = sohu.ctrl.Lister.getAllList(config);
		},

        _afterSuccess: function(data){
            tip.afterList(this._options.listEl);
            data = data.responseData;
            if(data.count == 0){
                data.list = '没有任何通知。';
                $(this._options.actionEl).hide();
                this.lister.updateContent(data);
            }
        }
	}
}, 'sohu.core.*, sohu.ctrl.Lister, sohu.ctrl.Dialog, kola.ctrl.DataKeyTab');