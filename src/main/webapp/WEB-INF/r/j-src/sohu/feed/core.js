

$register('sohu.feed.*', function() {
	
	var PACK = sohu.feed;

    var feedTip={
        beforeList: function(contentEl,type,moreEl){
            var tip='<div class=\"load-page\"></div>';
            contentEl=$(contentEl);
            if(type=='add'){
                feedTip.afterList(contentEl);
                contentEl.append(tip);
            }
            if(type=='clear'){
                contentEl.html(tip);
                if(moreEl)
                    $(moreEl).hide();
            }
        },
        afterList: function(contentEl){
            var t=$(contentEl).down('.load-page');
            if(t)
                t.remove();
        }
    };

	/********************************************* NewsMdl *********************************************/
	
	var newsMdl = new sohu.core.Model({
		
		actions: {
			
			time: {
				url:		'/time.do',
				params: 	['start', 'size', 'flagid'],
				method: 	'get',
				format: 	'json',
				type:		'list'
			},
			
			user: {
				url:		'/user.do',
				params: 	['start', 'size', 'flagid'],
				method: 	'get',
				format: 	'json',
				type:		'list'
			},

            app: {
                url:        '/app.do',
                params:     ['start', 'size', 'appid'],
                method:     'get',
                format:     'json',
                type:       'list'
            }
			
		},
		
		url:				'/a/feed/news'
	});
	
	/********************************************* NewsCtl *********************************************/
	
	PACK.NewsCtl = {
		init: function(options) {
			this.options=options;
            var config={
		  		list: {
		  			ctrEl:		options.listEl,		//	列表容器对象
		  			itemsEl:	'>div',				//	所有项的CSS匹配符
		  			itemEl:		'#request_${id}',		//	指定项的CSS匹配符
		  			size:		30
		  		},
		  		
		  		page: {
		  			ctrEl:		options.moreEl
		  		},
		  
		  		//	模型配置信息
		  		model: {
		  			obj:		newsMdl,			//	模型对象
		  			key:		'id'
		  		},
		  		
		  		//	方法的配置信息
		  		methods: {
		  			
		  			//	list方法的配置信息
		  			list: {
		  				action:	'time',				//	对应模型的方法名
		  				data: {						//	默认的参数
		  					u:	'2'
		  				},
                        beforeList: feedTip.beforeList.bind(this,this.options.listEl,'add'),		//	成功之前先调用的处理方法
                        afterSuccess: this._checkTime.bind(this)
		  			}
		  		}
			}
			this.defaultSort='time';
			this.lister = sohu.ctrl.Lister.getMoreList(config);
            this.moreEl = $(options.moreEl);
			this.sortTabCtr = $(options.sortTabCtr);
			this.sortTabs = $(options.sortTabs, this.sortTabCtr);
			this.sortTab = new kola.ctrl.DataKeyTab(this.sortTabs, {
				callback: this._sortTabCall.bind(this)
			});
            return this.sortTab;
		},
        /*
         *按应用分类的Newsfeed列表
         */
        app:function(id){
            this.sortTabCtr.hide();
            $(this.options.starMoreEl).hide();
            feedTip.beforeList(this.options.listEl,'clear',this.options.moreEl);
            newsMdl.app({
                start:0,
                size:30,
                appid:id
            },{
                success:function(data) {
                   this.lister.setMethodAction('app','list');
                   var mydata={
                     appid: id
                   };
                   this.moreEl.down('a').html("查看更多此类新鲜事");
                   this.lister.setMethodData(mydata,'list');
                   this.lister.updateContent(data);
                   PACK.StarCtl.hide(this.options.listEl);
                }.bind(this)
            })
        },
		
		_sortTabCall:function(key){
            feedTip.beforeList(this.options.listEl,'clear',this.options.moreEl)
			//if(this.defaultSort==key)return;
            this.sortTabCtr.show();
            $(this.options.starMoreEl).hide();
            this.defaultSort=key;
            if(key=="star"){
                $(this.options.moreEl).hide();
                $(this.options.starMoreEl).show();
                sohu.feed.StarCtl.init({
                    listEl: this.options.listEl,
                    moreEl: this.options.starMoreEl
                });
            }else{
                this.moreEl.down('a').html("查看更多30条新鲜事");
                this.lister.setMethodAction(key,'list');
                this.lister.list(0);
            }
            
		},

        _checkTime: function(){
            feedTip.afterList(this.options.listEl);
            PACK.StarCtl.hide(this.options.listEl);
            //	判断是否存在相同的时间，如果存在就删除
            var times = $(this.options.listEl).down('span.label');
            if (times) {
                var timeNow = '';
                times.each(function(it) {
                    var text = it.text();
                    if (text == timeNow) {
                        it.parent().remove();
                    } else {
                        timeNow = text;
                    }
                });
            }
        }
		
	};

    /********************************************* starMdl *********************************************/
    var starMdl=new sohu.core.Model({
        actions:{
            list:{
                url:		'/list.do',
				params: 	['start', 'size'],
				method: 	'get',
				format: 	'json',
				type:		'list'
            },
            add:{
                url:		'/add.do',
				params: 	['id'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
            },
            del:{
                url:		'/del.do',
				params: 	['id'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
            }
        },
        url:            '/a/feed/star'
    });

    /********************************************* StarCtl *********************************************/
    PACK.StarCtl={
        init:function(options){
            var config = {
		  		list: {
		  			ctrEl:		options.listEl,		//	列表容器对象
		  			itemsEl:	'>div',				//	所有项的CSS匹配符
		  			itemEl:		'#star_${id}',		//	指定项的CSS匹配符
		  			size:		30
		  		},
		  		page: {
		  			ctrEl:		options.moreEl
		  		},
		  		model: {
		  			obj:		starMdl,			//	模型对象
		  			key:		'id'
		  		},
		  		methods: {
		  			list: {
		  				action:	'list',				//	对应模型的方法名
                        afterSuccess: this.hide.bind(this,options.listEl)
                    }
		  		}
		  	}
			this.lister = sohu.ctrl.Lister.getPageList(config).list(0);
        },
        /*
         *添加为星标
         */
        star: function(fid){
            var icoEl=$("#feed_"+fid).down('.feedOption img');
            if(icoEl.attr('class').indexOf('img-clearStar')>-1){
                //add
                starMdl.add({
                    id : fid
                },{
                    success: function(data){
                        icoEl.removeClass('img-clearStar').addClass('img-starred');
                    }.bind(this),
                    failure: function() {}
                });
                
            }else{
                //del
                starMdl.del({
                    id : fid
                },{
                    success: function(data){
                        icoEl.removeClass('img-starred').addClass('img-clearStar');
                    }.bind(this),
                    failure: function() {}
                });	
            }
        },

        hide: function(listEl){
            var feedli = $(listEl).down('.feedList .feedItem');
            var star='.feedOption img';
            if(feedli)
                if(feedli.down(star)){
                    //feedli.down(star).hide();
                    feedli.on('mouseover',function(e){
                        var li = kola.Event.element(e).upWithMe('.feedItem');
                        li.down(star).show('block');
                    }.bind(this));
                    feedli.on('mouseout',function(e){
                        var li = kola.Event.element(e).upWithMe('.feedItem');
                        if(li.down(star).attr('class') =='icon img-clearStar'){
                            li.down(star).hide();
                        }
                    }.bind(this));
                }
        }
    };
    /********************************************* newSettingMdl *********************************************/
    var newsSettingMdl= new sohu.core.Model({
        actions:{
            edit:{
                url:		'/edit.do',
				params: 	[],
				method: 	'get',
				format: 	'text'
            },
            apps:{
                url:		'/apps.do',
				params: 	['ids'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
            },
            users:{
                url:		'/users.do',
				params: 	['ids'],
				method: 	'post',
				format: 	'text'
            }
        },
        url:        '/a/feed/setting'
    });

    PACK.NewsSettingsCtl={
        edit: function(options){
            newsSettingMdl.edit({},{
                success: function(data){
                    $(options.listEl).html(data);
                    $call(function(){
                        this.friendSelector1=new sohu.friend.Selector({
                            element:'#selector1',
                            type: 2,
                            isButton:true,
                            maxNum: 20
                        });
                    }.bind(this), 'sohu.friend.*');
                }.bind(this),
                failure: function() {}
            });
        },
        /*
         *设置app后保存
         */
        apps: function(el){
            var inputs=$(el).down('input');
            var r=[];
            inputs.each(function(i){
                if(i.val()=='2') {
                    r.push(i.attr('name'));
                }
            });
            newsSettingMdl.apps({
                ids:    r.join(',')
            },{
                success: function(data){
                    PACK.TabCtl.Tab.active('newsfeed');
                }.bind(this),
                failure: function() {}
            })
        },

        user: function(input,inputh,listEl,listTxt){
            var ids=$(inputh).val();
            if(ids==''){
                ids=$(input).val();
            }else{
                ids=ids+','+$(input).val();
            }
            if(this.friendSelector1)
                this.friendSelector1.clear();
            newsSettingMdl.users({
                ids: ids
            },{
                success:function(data){
                    $(listTxt).show();
                    $(input).val('');
                    $(inputh).val(ids);
                    $(listEl).html(data);
                }
            })
        },

        delUser: function(id,inputh,listEl){
            inputh=$(inputh);
            var r=inputh.val().split(',');
            var t=[];
            r.each(function(i){
                if(i.toString()!=id.toString()){
                    t.push(i)
                }
            });
            var ids=t.join(',');
            newsSettingMdl.users({
                ids: ids
            },{
                success:function(data){
                    $(inputh).val(ids);
                    $(listEl).html(data);
                }
            })
        }
    };

    /********************************************* tabCtl *********************************************/
    PACK.TabCtl={
        init: function(options){
            this.options=options;
            this.tabCtr=$(options.tabCtr);
            this.tabs = $(options.tabs, this.tabCtr);
            this.sortTabCtr=$(this.options.sortTabCtr);
            this.contentEl=$(options.contentEl);
			this.Tab = new kola.ctrl.DataKeyTab(this.tabs, {
                firstCall:	true,
				callback: this._tabCall.bind(this)
			});
            return this.Tab;
        },

        _tabCall: function(key){
            this.sortTabCtr.hide();
            feedTip.beforeList(this.options.contentEl,'clear',this.options.moreEl);
            var starMoreEl=$(this.options.starMoreEl);
            switch (key){
                case 'newsfeed':{
                    this.sortTabCtr.show();
                    starMoreEl.hide();
                    if(!this.sortTab)
                        this.sortTab = sohu.feed.NewsCtl.init({
                            listEl: this.options.contentEl,
                            moreEl: this.options.moreEl,
                            sortTabCtr: this.options.sortTabCtr,
                            sortTabs: this.options.sortTabs,
                            starMoreEl: this.options.starMoreEl
                        });
                    this.sortTab.active('time',true);
                    break;
                }
                case 'setting':{
                    $(this.options.moreEl).hide();
                    starMoreEl.hide();
                    sohu.feed.NewsSettingsCtl.edit({
                        listEl: this.options.contentEl,
                        moreEl: this.options.moreEl
                    });
                    break;
                }
            }
        }

    };
	
	/********************************************* StoryMdl *********************************************/
	
	var storyMdl = new sohu.core.Model({
		actions: {
			
			list: {
				url:		'/list.do',
				params: 	['u', 'start', 'size', 'type',  'flagid'],
				method: 	'get',
				format: 	'json',
				type:		'list'
			},
			
			style: {
				url:		'/style.do',
				params: 	['id', 'style'],
				
				method: 	'post',
				format: 	'json',
				type:		'one'
			},
			
			del: {
				url:		'/del.do',
				params: 	['id'],
				
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			
			add: {
				url:		'/add.do',
				params: 	['u', 'message'],
				method: 	'post',
				format: 	'json',
				type:		'one'
			}
			
		},
		
		url:				'/a/wall/story'
	});
	
	/********************************************* StoryCtl *********************************************/
	PACK.StoryCtl = {
		
		/**
		 * @param {Object} options 配置参数
		 * 	{
		 * 		
		 * 	}
		 */
		init: function(options) {
            this.options=options;
            var config = {
		  		//	列表的配置信息
		  		list: {
		  			ctrEl:		this.options.contentEl,		//	列表容器对象
		  			itemsEl:	'>div',				//	所有项的CSS匹配符
		  			itemEl:		'#feed_${id}',		//	指定项的CSS匹配符
		  			size:		30
		  		},

		  		page: {
		  			ctrEl:		this.options.moreEl
		  		},

		  		//	模型配置信息
		  		model: {
		  			obj:		storyMdl,			//	模型对象
		  			key:		'id'
		  		},

		  		//	方法的配置信息
		  		methods: {

		  			//	list方法的配置信息
		  			list: {
		  				action:	'list',				//	对应模型的方法名
		  				data: {						//	默认的参数
		  					u:	this.options.testId
		  				},
                        beforeList: feedTip.beforeList.bind(this,this.options.contentEl,'add'),		//	成功之前先调用的处理方法
		  				afterSuccess: this._afterList.bind(this)
		  			},

		  			del: {
		  				action: 'del'				//	对应模拟的方法名
		  			}
		  		}
		  	}
            this.lister = sohu.ctrl.Lister.getMoreList(config);
            this.tabCtr=$(options.sortTabCtr);
            this.tabs = $(options.sortTabs, this.tabCtr);
			this.Tab = new kola.ctrl.DataKeyTab(this.tabs, {
                firstCall:	true,
				callback: this._tabCall.bind(this)
			});
            return this.Tab;
		},

        _tabCall: function(key){
            feedTip.beforeList(this.options.contentEl,'clear',this.options.moreEl);
            this.lister.options.methods.list.data.type=key;
            this.lister.list(0);

            var optionbtn=new sohu.ctrl.TipSuggest({
                name:"MenuTip",
                position:[20,0],
                width:80,
                event:[
                    {e:"click",f:function(){
                        optionbtn.tipContent('');
                        ['单行显示','缩略显示','详细显示'].each(function(i){
                            optionbtn.tipAddLi(i);
                        });
                        optionbtn.tipShow();
                        optionbtn.popLayer.out('click',function(){
                            optionbtn.tipHide();
                        });
                        optionbtn.mouseAction(function(t){
                            var txt=t.text;
                            var type;
                            if(txt == '单行显示')
                                type = 1;
                            if(txt == '缩略显示')
                                type = 2;
                            if(txt == '详细显示')
                                type = 4;
                            this.setStyle(type,this.selectid);
                        }.bind(this));
                    }.bind(this)}
                ]
            });
            this.optionbtn = optionbtn;
        },
        //绑定设置按钮
        option: function(id){
           this.selectid = id;
           this.optionbtn.setElement($(this.options.contentEl).down('#feed_'+id) ,$(this.options.contentEl).down('#feed_'+id).down('.option'), 'click');
        },

        _afterList: function(){
            feedTip.afterList(this.options.contentEl);
        },
		
		setStyle: function(mode, id) {
			storyMdl.style({
				id:		id,
				style:	mode
			}, {
				success: function(id, data) {
					this.lister.updateItem(id, data);
				}.bind(this, id), 
				failure: function() {
					
				}
			});
		},
		
		del: function(id) {
            sohu.ctrl.Dialog.confirm('是否要删除此条信息？',{
               title: '提示：',
               yes: function(){
                    this.lister.del(id);
               }.bind(this),
               no: function(){}
            });
		},

        message: function(uid,contentEl,btnEl,listEl){
            contentEl=$(contentEl);
            btnEl = $(btnEl).down('button');
            var content=contentEl.val().substring(0, 500);
            if(content.trim().length<1){
                contentEl.elements()[0].focus();
                return;
            }
            btnEl.attr('disabled','disabled');
            btnEl.text('提交中');
            storyMdl.add({
                u: uid,
                message: content
            }, {
                success: function(data){
                   contentEl.val('');
                   btnEl.elements()[0].disabled=false;
                   btnEl.text('提交');
                   this.Tab.active('0');
                }.bind(this),
                failure: function() {}
            });
        }
	}
}, 'sohu.core.*, kola.ctrl.DataKeyTab, sohu.ctrl.Dialog, sohu.ctrl.TipSuggest, kola.dom.Form, sohu.ctrl.Lister');