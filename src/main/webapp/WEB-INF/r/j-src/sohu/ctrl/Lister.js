
$register('sohu.ctrl.Lister', function() {
	
	var Lister = Class.create({
		
		initialize: function(options) {
			this.listData = null;
			this._setOptions(options);
		},
		
		/**
		 * @param {Object} options 配置参数（下面为options实例）
		 */
		/**
		 * 	options实例
		 * 	{
		 * 		//	列表类型，现在有三种值：
		 * 		//		all：全列表
		 * 		//		page：带翻页的列表
		 * 		//		more：More形式的列表
		 * 		type:			'all',		
		 * 
		 * 		//	列表的配置信息
		 * 		list: {
		 * 			ctrEl:		'#listCtrEl',		//	列表容器对象
		 * 			itemsEl:	'>div',				//	所有项的CSS匹配符
		 * 			itemEl:		'#feed${id}',		//	指定项的CSS匹配符
		 * 			size:		10,					//	列表显示数量，仅在列表类型为翻页或者more时有意义
		 * 			countEl:	'#listCountEl'		//	数量显示容器对象
		 * 		},
		 * 		
		 * 		//	页的配置信息，仅在列表类型为翻页或者more时有意义
		 * 		page: {
		 * 			ctrEl:		'#pageCtrEl',		//	页容器对象
		 * 			sizeEl:		'#sizeEl'			//	用于显示也数量的容器对象
		 * 		},
		 * 
		 * 		//	模型配置信息
		 * 		model: {
		 * 			obj:		requestMdl,			//	模型对象
		 * 			key:		'id'				//	主键名称
		 *		},
		 * 		
		 * 		//	方法的配置信息
		 * 		methods: {
		 * 			
		 * 			//	list方法的配置信息
		 * 			list: {
		 * 				action:	'list',				//	对应模型的方法名
		 * 				data: {						//	默认的参数
		 * 					u:	'2'
		 * 				},
         * 				beforeList: func,           //  在开始调用数据之前的处理方法
		 * 				beforeSuccess: func,		//	成功之前先调用的处理方法
		 * 				afterSuccess: func			//	成功之后调用的处理方法
		 * 			},
		 * 
		 * 			//	del方法的配置信息			
		 * 			del: {
		 * 				action: 'del'				//	对应模型的方法名
		 * 			},
		 * 		
		 * 			//	show方法的配置信息	
		 * 			show: {
		 * 				action: 'get'				//	对应模型的方法名
		 * 			}
		 * 		}
		 * 	}
		 */
		_setOptions: function(options) {
			this.options = options;
            this._setBinds();
		},
		
        _setBinds: function(){
            //把model相应的方法，直接作为当前对象的一个方法，便于快捷操作
            ['list', 'del', 'show', 'update'].each(function(it, i) {
				var opt = this.options,
					methodOpt = opt.methods[it];
				if (!!methodOpt) {
					this['_model_' + it] = opt.model.obj[methodOpt.action].bind(opt.model.obj);
				}
			}.bind(this));
        },

		list: function(index) {
			var opt = this.options;
			this._index = index;
			
			var data = {};
			switch (opt.type) {
				case 'all':
					break;
					
				case 'page':
					//	index代表开始值
					var data = {
						start:	index,
						size:	opt.list.size
					};
					break;
				
				case 'more':
					//	index代表开始值
					var data = {
						start:	index,
						size:	opt.list.size
					};
					break;
			}
			var func = opt.methods.list.beforeList;
            if(func)
                func({index:index,type: opt.type});
			return this._action('list', data);
		},
		
		del: function(id) {
			var data = {};
			data[this.options.model.key] = id;
			return this._action('del', data);
		},
		
		show: function(id) {
			var data = {};
			data[this.options.model.key] = id;
			
			return this._action('show', data);
		},
		
		update: function(data) {
			return this._action('update', data);
		},
		
		refresh: function() {
			this.list(this._index);
		},
		
		//  点击更多
		more: function() {
			this.list(this._start);
		},
		
		//	更新某一项，id为对象的编号，content为要更新的内容
		updateItem: function(id, content) {
			this.getItemEl(id).outerHtml(content);
		},
		//	更新列表中的内容
		updateContent: function(data) {
			this._getListEl().html(data.list);
			this._refreshPage(data);
		},
		
		setContentHtml: function(html) {
			this._getListEl().html(html);
			if (this.options.type == 'page') {
				this._getPageEl().html('');
			}
		},
		
		//	删除某一项
		delItem: function(id) {
			this.getItemEl(id).remove();
		},
		
		//	获得某个元素
		getItemEl: function(id) {
			var str = this.options.list.itemEl.replace('${id}', id);
			return this._getListEl().down(str);
		},
		
		//	设置方法的默认数据
		setMethodData: function(data, name) {
			this.options.methods[name].data = data;
		},
		
		//	设置方法的默认model配置方法
		setMethodAction: function(str, name){
			this.options.methods[name].action = str;
            this._setBinds();
    	},
		
		_action: function(method, data) {
			data = Object.extend(data, this.options.methods[method].data || {});
			this['_model_' + method](data, {
				success: this['_' + method + 'Success'].bind(this, data),
				failure: this['_' + method + 'Failure'].bind(this, data)
			});
			return this;
		},
		
		//	更新页码
		_refreshPage: function(countInfo) {
			if (this.options.type == 'page') {
				if (!this.pager) {
					var opt = this.options;
					//	this.pager = new sohu.ctrl.Pager(opt.page.ctrEl, opt.list.size, this.list.bind(this));
					this.pager = new sohu.ctrl.Pager(opt.page.ctrEl, {
						size: opt.list.size,
						callback: this.list.bind(this)
					});
				}
				this.pager.refresh(countInfo);
			} else {
				var el = this._getPageEl();
				var hadMore =  countInfo.start + countInfo.size < countInfo.count;
				if (hadMore) {
					this._start = countInfo.start + countInfo.size;
					if (!this.pager) {
						this.pager = true;
                        if(el.down('a'))
                            el.down('a').on('click', this.more.bind(this));
                        else
                            el.on('click', this.more.bind(this));
					}
				}
				el[hadMore ? 'show' : 'hide']();
			}
		},
		
		/**
		 * 成功之前处理之前需要调用的方法
		 */
		_onBeforeSuccess: function(method, postData, data) {
			//	判断现在的方法是否存在预处理方法，存在的话调用，并取得相应的结果
			var func = this.options.methods[method].beforeSuccess;
			if (func) {
				return func({
					postData: postData,
					responseData: data
				});
			} else {
				return data;
			}
		},
		_onAfterSuccess: function(method, postData, data) {
			//	判断现在的方法是否存在后处理方法，存在的话调用
			var func = this.options.methods[method].afterSuccess;
			if (func) {
				func({
					postData: postData,
					responseData: data
				});
			}
		},
		
		_listSuccess: function(postData, data) {
			data = this._onBeforeSuccess('list', postData, data);
			this.listData = data;
			var el = this._getListEl();
			switch (this.options.type) {
				case 'all':
					el.html(data);
					break;
				case 'page':
					el.html(data.list);
					this._refreshPage(data);
					this._setCount(data.count);
					break;
				case 'more':
					el[postData.start == 0 ? 'html' : 'append'](data.list);
					this._refreshPage(data);
					break;
			}
			this._onAfterSuccess('list', postData, data);
		},
		
		_listFailure: function(postData, error) {
			this._getListEl().html(error.statusText);
		},
		
		_delSuccess: function(postData, data) {
			data = this._onBeforeSuccess('del', postData, data);
            var el = this.getItemEl(postData[this.options.model.key]);
            kola.anim.BlindUp.action(el,{speed:20});
            kola.anim.FadeOut.action(el,{speed:20});
			//el.remove();
			this._onAfterSuccess('del', postData, data);
		},
		
		_delFailure: function(postData, error) {
			alert(error.statusText);
		},
		
		_showSuccess: function(postData, data) {
			data = this._onBeforeSuccess('show', postData, data);
			this.updateItem(postData[this.options.model.key], data);
			this._onAfterSuccess('show', postData, data);
		},
		
		_showFailure: function(postData, error) {
			alert(error.statusText);
		},
		
		_updateSuccess: function(postData, data) {
			data = this._onBeforeSuccess('update', postData, data);
			this.updateItem(postData[this.options.model.key], data);
			this._onAfterSuccess('update', postData, data);
		},
		
		_updateFailure: function(postData, error) {
			alert(error.statusText);
		},
		
		_getListEl: function() {
			if (!this._listEl) this._listEl = $(this.options.list.ctrEl);
			return this._listEl;
		},
		
		_getPageEl: function() {
			if (!this._pageEl) this._pageEl = $(this.options.page.ctrEl);
			return this._pageEl;
		},
		
		//	如果存在数量，那就设置一下数量
		_setCount: function(count) {
			if (this.options.list.countEl) {
				if (!this._countEl) this._countEl = $(this.options.list.countEl);
				this._countEl.html(count);
			}
		}
	});
	
	Lister.getAllList = function(options) {
		options.type = 'all';
		return new this(options);
	}
	
	Lister.getPageList = function(options) {
		options.type = 'page';
		return new this(options);
	}
	
	Lister.getMoreList = function(options) {
		options.type = 'more';
		return new this(options);
	}
	
	sohu.ctrl.Lister = Lister;
	
	
}, 'sohu.ctrl.Pager, kola.anim.Fade, kola.anim.Blind');