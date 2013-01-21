 /**
 * @fileoverview  页码组件
 * @author  springwang@sohu-inc.com
 * @version  0.2
 */

$register('sohu.ctrl.Pager', function() {
	
	var Pager = Class.create({
		
		//	构造器
		//	TODO: 现在只处理options.type=1的情况，type=2的情况暂时不处理
		initialize: function(element, options) {
			
			//	获取基本配置信息
			this._element = $(element);
			this._options = Object.extend({
				category:	1,
				type:		1,
				radios:		1,
				size:		10,
				callback:	null
			}, options || {});
			
			//	绑定相关事件
			if (this._options.callback) this._element.on('click', this._activePage.bindEvent(this));
		},
		
		//	根据页码描述信息，刷新页码组件
		refresh: function(info) {
			this._updatePages(this._calculate(info));
		},
		
		//	根据提供的信息，计算有关页码的相关显示信息
		_calculate: function(info) {
			var pageCount =	0,		//	总页数
				pageNow =	-1,		//	当前页
				pagePrev =	-1,		//	前一页
				pageNext =	-1,		//	后一页
				pageInfo = {};		
			
			var count = 	info.count,				//	总数量
				start = 	info.start,				//	开始值
				size = 		this._options.size,		//	一页显示数量
				radios = 	this._options.radios;	//	页半径
			
			//	获取有关页的基本信息，包括总页数，当前页，上一页和下一页
			pageCount = Math.ceil(count / size);
			//	--	如果总页数小于2的话，那就直接返回相关信息
			if (pageCount < 2) {
				pageInfo = {
					pageCount: 	pageCount
				}
				return pageInfo;
			}
			pageNow = Math.min(Math.floor(start / size), pageCount - 1);
			pagePrev = pageNow - 1;
			pageNext = (pageNow == pageCount - 1 ? -1 : (pageNow + 1));
			
			//	如果是显示全页码的话，那就计算更多的信息
			if (this._options.category == 1) {
				//	需要计算第一页，最后一页，连续开始的那一页，连续开始的最后一页
				var first = 0,						//	第一页
					last = 	pageCount - 1,			//	最后一页
					listStart = -1,					//	列表开始值
					listEnd = -1;					//	列表结束值
				
				//	对计算过程进行优化处理
				if (pageCount > 2) {
					listStart = pageNow - radios,	//	列表开始值
					listEnd = pageNow + radios;
					if (listStart <= first) {
						var diff = first - listStart + 1;
						listStart = first + 1;
						listEnd += diff;
					}
					if (listEnd >= last) {
						var diff = listEnd - last + 1;
						listEnd -= diff;
						listStart -= diff;
						if (listEnd <= first) listEnd = last - 1;
						if (listStart <= first) listStart = first + 1;
					}
				}
				
				pageInfo = {
					first: 		first,
					last:		last,
					listStart:	listStart,
					listEnd:	listEnd
				}
			}
			
			pageInfo.pageCount =	pageCount;
			pageInfo.pageNow =		pageNow;
			pageInfo.pagePrev =		pagePrev;
			pageInfo.pageNext =		pageNext;
			return pageInfo;
		},
		
		//	根据页码的信息，在指定的对象上显示页码
		_updatePages: function(pageInfo) {
			var html = [];
			
			//	如果总页数大于1的话，那就生成要显示的页码html
			if (pageInfo.pageCount > 1) {
				
				//	生成上一页
				html.push('<a href="javascript:void(0);" class="pagePrev' + (pageInfo.pagePrev > -1 ? '' : ' pageNow') + '" data-page="' + pageInfo.pagePrev + '">上一页</a>');
				
				//	判断是否需要显示中间的数字
				if (this._options.category == 1) {
					
					var getPage = function(page, text) {
						if (page == pageInfo.pageNow) {
							return '<strong>' + text +'</strong>';
						} else {
							return '<a href="javascript:void(0);" data-page="' + page + '">' + text + '</a>';
						}
					}
					
					//	显示首页
					html.push(getPage(pageInfo.first, pageInfo.first + 1));
					
					//	根据需要生成中间的连页
					if (pageInfo.listStart > -1 && pageInfo.listStart <= pageInfo.listEnd) {
						//	判断是否显示前面的省略符
						if (pageInfo.listStart > pageInfo.first + 1) {
							html.push('<span>...</span>');
						}
						for (var i=pageInfo.listStart; i<=pageInfo.listEnd; i++) {
							html.push(getPage(i, i+1));
						}
						//	判断是否显示后面的省略符
						if (pageInfo.last > pageInfo.listEnd + 1) {
							html.push('<span>...</span>');
						}
					}
					
					//	显示尾页
					html.push(getPage(pageInfo.last, pageInfo.last + 1));
				}
				
				//	生成下一页
				html.push('<a href="javascript:void(0);" class="pageNext' + (pageInfo.pageNext > -1 ? '' : ' pageNow') + '" data-page="' + pageInfo.pageNext + '">下一页</a>');
			}
			
			this._element.html(html.join(''));
		},
		
		//	页码的单击处理方法
		_activePage: function(e) {
			var element = kola.Event.element(e).upWithMe('[data-page]');
			if (element && element.attr('data-page')) {
				this._options.callback(parseInt(element.attr('data-page')) * this._options.size);
			}
		}
	});
	
	sohu.ctrl.Pager = Object.extend(Pager, {
		newInstance: function(element, options) {
			return new sohu.ctrl.Pager(element, options);
		}
	});
});
				