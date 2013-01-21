
/**
 * kola 库的内核部分
 * 其中包括：
 * 		对语言本身的扩展
 * 		对包依赖和注册的支持
 * 		对象选择器
 * 		对Dom对象的封装
 * 		对浏览器的一些扩展
 * @author Jady@live.com
 */


/************************************************** kola *******************************************************/

var kola = {
	version: '0.0.1'
}

/************************************************** Object *******************************************************/

/**
 * 对象继承
 */
Object.extend = function(target, src) {
	
	for (var it in src) {
		target[it] = src[it];
	}
	
	return target;
}

Object.create = function(/*String*/varName, /*Object?*/varValue, /*Object?*/scope) {
	var a = varName.split('.'),
		obj = scope || window;
	for (var i=0, il=a.length, it; i<il; i++) {
		it = a[i];
		var v = obj[it];
		if (typeof(v) == 'undefind' || v == null) {
			obj[it] = {};
		}
		if (i == il-1) {
			if (typeof(varValue) != 'undefined') obj[it] = varValue;
			return obj[it];
		} else {
			obj = obj[it];
		}
	}
}

/*
 * Object.clone(obj, [options]);
 * @param {Object} obj
 * @param {Object} options
 * 		items: Array，默认可以没有，表示拷贝哪些属性
 */
Object.clone = function(obj, options) {
	var n = {};
	
	if (options && options.items) {
		options.items.each(function(it, i) {
			n[it] = obj[it];
		});
	} else {
		for (var it in obj) {
			n[it] = obj[it];
		}
	}
	
	return n;
}

Object.each = function(obj, iterator) {
	//	TODO: 临时去掉了所有的try catch，以便于更方便的调试程序
	/*
	try {
	*/
		var i = 0;
		for (var it in obj) {
			iterator(obj[it], it, i++);
		}
	/*
	} catch (e) {
		if (e != $break) throw e; 
	}
	*/
}
//TODO 对象内嵌对象的实现 
Object.toParams = function(obj){
	var arr = [];
	for (var it in obj) {
		arr.push(it + '='+ obj[it]);
	}
	return arr.join('&');
}
/************************************************** Class *******************************************************/

var Class = {
	
	/*
	 * 创建一个新类，并继承指定的对象
	 */
	create: function() {
		
		var c = function() {
			this.initialize.apply(this, arguments);
		}
		for (var i=0, il=arguments.length, it; i<il; i++) {
			it = arguments[i];
			if (it == null) continue;
			
			Object.extend(c.prototype, it);
		}
		
		return c;
	}
	
}

/************************************************** Function *******************************************************/

Object.extend(Function.prototype, {
	
	bind: function() {
		var method = this, _this = arguments[0], args = [];
		for (var i=1, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function() {
			var thisArgs = args.concat();
			for (var i=0, il=arguments.length; i<il; i++) {
				thisArgs.push(arguments[i]); 
			}
			return method.apply(_this, thisArgs);
		}
	},
	
	bindEvent: function() {
		var method = this, _this = arguments[0], args = [];
		for (var i=1, il=arguments.length; i<il; i++) {
			args.push(arguments[i]); 
		}
		return function(e) {
			var thisArgs = args.concat();
			thisArgs.unshift(e || window.event); 
			return method.apply(_this, thisArgs);
		}
	},
	
	timeout: function(time) {
		return setTimeout(this, time * 1000);
	},
	
	interval: function(time) {
		return setInterval(this, time * 1000);
	}
	
});

/************************************************** String *******************************************************/

Object.extend(String.prototype, {
	
	trim: function() {
		return this.replace(/^\s+|\s+$/g, '');
	},
	
	escapeHTML: function() {
		/*
		if (kola.Browser.safari || kola.Browser.ie) {
			return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
		} else {
	    var self = arguments.callee;
	    self.text.data = this;
	    return self.div.innerHTML;
		}
		*/
		var self = arguments.callee;
		self.text.data = this;
		return self.div.innerHTML;
	},

	unescapeHTML: function() {
		/*
		if (kola.Browser.safari || kola.Browser.ie) {
			return this.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		} else {
	    var div = document.createElement('div');
	    div.innerHTML = this;
	    if (div.childNodes.length > 0) {
    		var str = [];
    		for (var i=0, il=div.childNodes.length, il; i<il; i++) {
    			str.push(div.childNodes[i].nodeValue);
    		}
    		return str.join('');
	    }
	    return '';
		}
		*/
	    var div = document.createElement('div');
	    div.innerHTML = this;
	    if (div.childNodes.length > 0) {
    		var str = [];
    		for (var i=0, il=div.childNodes.length, il; i<il; i++) {
    			str.push(div.childNodes[i].nodeValue);
    		}
    		return str.join('');
	    }
	    return '';
	},
  
	//	取得字节长度（双字节字符认为是两个字符）
	byteLength: function() {
		return this.replace(/[^\x00-\xff]/g,"**").length;
	}
	
});

Object.extend(String.prototype.escapeHTML, {
  div:  document.createElement('div'),
  text: document.createTextNode('')
});
with (String.prototype.escapeHTML) div.appendChild(text);

/************************************************** Array *******************************************************/

var $break = { };
Object.extend(Array.prototype, {
	
	_each: function(iterator, collect) {
		var r = [];
		try {
			for (var i=0, il=this.length; i<il; i++) {
				var v = iterator(this[i], i);
				if (collect && typeof(v) != 'undefined') r.push(v);
			}
		} catch (e) {
			if (e != $break) throw e;
		}
		return r;
	},
	
	collect: function(iterator) {
		return this._each(iterator, true);
	},
	
	each: function(iterator) {
		this._each(iterator, false);
		return this;
	},
	
	//	判断是否包含某个值或者对象
	include: function(value) {
		return this.index(value) != -1;
	},
	
	//	判断一个对象在数组中的位置
	index: function(value) {
		for (var i=0, il=this.length; i<il; i++) {
			if (this[i] == value) return i;
		}
		return -1;
	},
	
	//	过滤重复项
	unique: function() {
		for (var i=0; i<this.length; i++) {
			var it = this[i];
			for (var j=this.length-1; j>i; j--) {
				if (this[j] == it) this.splice(j, 1);
			}
		}
		return this;
	},

	del: function(obj) {
		var index = this.index(obj);
		if (index >= 0 && index < this.length) {
			this.splice(index, 1);
		}
		return this;
	}
});

//	把类似于数组的对象转变成一个数组对象（比如arguments, childNodes等）
var $A = function(obj) {
	if (obj instanceof Array) return obj;
	//	if (obj.constructor == Array) return obj;
	var arr = [];
	for (var i=0, il=obj.length; i<il; i++) {
		arr.push(obj[i]);
	}
	return arr;
}

/************************************************** Hash *******************************************************/

var Hash = Class.create({
	initialize: function() {
		this._names = [];
		this._values = {};
	},
	
	put: function(name, value) {
		var v = this._values;
		
		if (!v[name]) {
			this._names.push(name);
		}
		v[name] = value;
		
		return this;
	},
	
	get: function(name) {
		return this._values[name];
	},
	
	concat: function(hash) {
		hash.each(function(it, i) {
			this.put(it.name, it.value);
		}.bind(this));
	},
	
	clone: function() {
		var a = new Hash();
		this.each(function(it, i) {
			a.put(it.name, it.value);
		});
		return a;
	},
	
	each: function(iterator) {
		//	TODO: 临时去掉了所有的try catch，以便于更方便的调试程序
		/*
		try {
		*/
			for (var i=0, il=this._names.length; i<il; i++) {
				var it = this._names[i];
				iterator({name: it, value: this._values[it]}, i);
			}
		/*
		} catch (e) {
			if (e != $break) throw e; 
		}
		*/
		return this;
	},
	
	collect: function(iterator) {
		var a = [];
		//	TODO: 临时去掉了所有的try catch，以便于更方便的调试程序
		/*
		try {
		*/
			for (var i=0, il=this._names.length; i<il; i++) {
				var it = this._names[i];
				a.push(iterator({name: it, value: this._values[it]}, i));
			}
		/*
		} catch (e) {
			if (e != $break) throw e; 
		}
		*/
		return a;
	}
});
/************************************************** Template *******************************************************/
//hongwei 2009-1-20  添加  kola.Template 类  类似后端的模板替换功能。
//hongwei 2009-2-3   修改  kola.Template 类  添加注释功能并替换算法
kola.Template = Class.create({
	initialize: function(template, pattern) {
		this.template = template.toString();
		this.pattern = (pattern&&pattern.left&&pattern.right)?pattern : {left:"#{",right:"}"};
		this.regPattern=new RegExp("(?:^|.|\r|\n)("+this.pattern.left+"(.*?)"+this.pattern.right+")",'g');
	},
	evaluate: function(obj) {
		var _template="";
		if(obj.constructor==Object){
			var _this=this;
			_template=this.template.replace(this.regPattern,function(s,v1,v2){
				var _left=s.split(_this.pattern.left)[0];
				if(_left&&_left=="\\"){
					return v1;
				}
				if(obj[v2]){
					return _left+obj[v2]
				}else{
					return _left;
				}
			})	
		}
		return _template;
	}
});
/************************************************** Browser *******************************************************/

(function() {
	var ag = navigator.userAgent.toLowerCase();
	kola.Browser = {
		webkit: ag.indexOf('webkit') != -1,
		opera: ag.indexOf('opera') != -1,
		ie: (ag.indexOf('msie') != -1) && (ag.indexOf('opera') == -1),
		mozilla: (ag.indexOf('mozilla') != -1) && (ag.indexOf('webkit') == -1) && (ag.indexOf('compatible') == -1),
		version: (ag.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1]
	}
})();

/************************************************** Element *******************************************************/

kola.Element = Class.create({
	
	initialize: function(els) {
		this._els = els;
	},
	
	attr: function(name, value) {
		if (typeof(value) == 'undefined') {
			var el = this._els[0];
			switch(name) {
				case 'class':
					return el.className;
				case 'style':
					return el.style.cssText
				default:
					return el.getAttribute(name);
			}
		} else {
			this._els.each(function(el) {
				switch(name) {
					case 'class':
						el.className = value;
						break;
					case 'style':
						el.style.cssText = value;
						break;
					default:
						el.setAttribute(name, value);
				}
			});
			return this;
		}
	},
	
	removeAttr: function(name) {
		this._els.each(function(el) {
			el.removeAttribute(name);
		});
		return this;
	},
	
	prop: function(name, value) {
		if (typeof(value) == 'undefined') {
			return this._els[0][name];
		} else {
			this._els.each(function(el) {
				el[name] = value;
			});
			return this;
		}
	},
	
	html: function(value) {
		return this.prop('innerHTML', value);
	},
	
	outerHtml: function(value) {
		var direct = typeof(HTMLElement) == "undefined";
		if (typeof(value) == 'undefined') {
			var el = this._els[0];
			return direct ? el.outerHTML : document.createElement("div").appendChild(el.cloneNode(true)).parentNode.innerHTML;
		} else {
			this._els.each(function(el, i) {
				if (direct) {
					el.outerHTML = value;
				} else {
					var r = el.ownerDocument.createRange();
					var df = r.createContextualFragment(value);
					el.parentNode.replaceChild(df, el);
				}
			});
			return this;
		}
	},
	
	text: function(value) {
		return this.prop(typeof(this._els[0].innerText) != 'undefined' ? 'innerText' : 'textContent', value);
	},
	
	val: function(value) {
		
		if (typeof(value) == 'undefined') {
			//	表示要获取第一个匹配对象的value值
			
			var el = this._els[0];
			
			//	判断对象是不是input:checkbox或者input:radio，如果是的话，进行特殊的处理
			var tag = el.tagName.toLowerCase();
			if (tag == 'input') {
				switch (el.type) {
					case 'checkbox':
					case 'radio':
						return el.checked ? el.value : null;
						break;
						/*
						var name = el.name;
						if (el.form) {
							var els = el.form.elements.namedItem(name);
							if (els.tagName) return els.checked ? els.value : null;
							for (var i=0, il=els.length; i<il; i++) {
								var it = els[i];
								if (it.checked) return it.value;
							}
							return null;
						}
						break;
						*/
				}
			}
			return el.value;
			
		} else {
			//	表示要设置所有匹配对象的value值		
			return this.prop('value', value);
		}
	},
	
	
	css: function(name, value) {
		if (typeof(value) == 'undefined') {
			var el = this._els[0];
			if (name == 'opacity') {
				if (kola.Browser.ie) {
					return el.filter && el.filter.indexOf("opacity=") >= 0 ? (parseFloat( el.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '': '';
				} else {
					return el.style.MozOpacity;
				}
			} else {
				return el.style[name];
			}
		} else {
			this._els.each(function(el) {
				if (name == 'opacity') {
					if (kola.Browser.ie) {
						el.style.filter = 'Alpha(Opacity=' + value*100 + ');'; 
					} else {
						el.style.MozOpacity = value;
					}
				} else {
					el.style[name] = value;
				}
			});
			return this;
		}
	},
	
	pos: function(position) {
		if (typeof(position) == 'undefined') {
			var el = this._els[0],
					left = 0,
					top = 0,
					doc = document,
					de = doc.documentElement,
					db = doc.body,
					add = function(l, t) {
						left += l || 0;
						top += t || 0;
					};
			
			if (el.getBoundingClientRect) {
				var box = el.getBoundingClientRect();
				add(box.left + Math.max(de.scrollLeft, db.scrollLeft) - de.clientLeft,
						box.top + Math.max(de.scrollTop, db.scrollTop) - de.clientTop);
			} else {
				var op = el.offsetParent,
						fixed = el.style.position == 'fixed',
						oc = el,
						parent = el.parentNode;
				
				// Initial element offsets
				add(el.offsetLeft, el.offsetTop);
	
				// Get parent offsets
				while (op) {
					// Add offsetParent offsets
					add(op.offsetLeft, op.offsetTop);
	
					// Mozilla and Safari > 2 does not include the border on offset parents
					// However Mozilla adds the border for table or table cells
					if (kola.Browser.mozilla && !/^t(able|d|h)$/i.test(op.tagName) || kola.Browser.safari)
						add(el.style.borderLeftWidth, el.style.borderTopWidth);
	
					// Add the document scroll offsets if position is fixed on any offsetParent
					if (!fixed && op.style.position == 'fixed')
						fixed = true;
	
					// Set offsetChild to previous offsetParent unless it is the body element
					oc  = op.tagName.toLowerCase() == 'body' ? oc : op;
					// Get next offsetParent
					op = op.offsetParent;
				}
	
				// Get parent scroll offsets
				while (parent && parent.tagName && !/^body|html$/i.test(parent.tagName) ) {
					// Remove parent scroll UNLESS that parent is inline or a table to work around Opera inline/table scrollLeft/Top bug
					if (!/^inline|table.*$/i.test(parent.style.display))
						// Subtract parent scroll offsets
						add(-parent.scrollLeft, -parent.scrollTop);
	
					// Mozilla does not add the border for a parent that has overflow != visible
					if (kola.Browser.mozilla && parent.style.overflow != 'visible')
						add(parent.style.borderLeftWidth, parent.style.borderTopWidth);
	
					// Get next parent
					parent = parent.parentNode;
				}
	
				// Safari <= 2 doubles body offsets with a fixed position element/offsetParent or absolutely positioned offsetChild
				// Mozilla doubles body offsets with a non-absolutely positioned offsetChild
				if (kola.Browser.mozilla && oc.style.position != 'absolute')
						add(-db.offsetLeft, -db.offsetTop);
	
				// Add the document scroll offsets if position is fixed
				if ( fixed )
					add(Math.max(de.scrollLeft, db.scrollLeft), Math.max(de.scrollTop,  db.scrollTop));
			}
			return {left: left, top: top};
		} else {
			this._els.each(function(el) {
				el.style.left = position.left + 'px';
				el.style.top = position.top + 'px';
			});
			return this;
		}
	},
	
	box: function() {
		var el = this._els[0],
				rect = this.pos();
		rect.width = el.offsetWidth;
		rect.height = el.offsetHeight;
		rect.bottom = rect.top + rect.height;
		rect.right = rect.left + rect.width;
		return rect;
	},
	
	width: function(value) {
		if (typeof(value) == 'undefined') { 
			return this._els[0].offsetWidth;
		} else {
			return this.css('width', value + 'px');
		}
	},
	
	height: function(value) {
		if (typeof(value) == 'undefined') {
			return this._els[0].offsetHeight;
		} else {
			return this.css('height', value + 'px');
		}
	},
	
	on: function(name, listener) {
		this._els.each(function(el) {
			kola.Event.on(el, name, listener);
		});
		return this;
	},
	
	un: function(name, listener) {
		this._els.each(function(el) {
			kola.Event.un(el, name, listener);
		});
		return this;
	},
	
	out: function(name, listener) {
		this._els.each(function(el) {
			kola.Event.out(el, name, listener);
		});
		return this;
	},
	
	show: function(value) {
		if (typeof(value) == 'string') { 
			this.css('display', value);
		}else{
			this.css('display', 'block');
		}
		return this;
	},
	
	hide: function() {
		this.css('display', 'none');
		return this;
	},
	
	toggle: function() {
		this[this._els[0].style.display == 'none' ? 'show' : 'hide']();
		return this;
	},
	
	focus: function() {
		this._els[0].focus();
		return this;
	},
	
	remove: function() {
		this._els.each(function(el) {
			el.parentNode.removeChild(el);
		});
	},
	
	get: function(index) {
		return kola.Element.newInstance(this._els[index]);
	},
	
	size: function() {
		return this._els.length;
	},
	
	append: function() {
		var el = this._els[0];
		for (var i=0, il=arguments.length; i<il; i++) {
			var it = arguments[i],
				itt = typeof(it);
			if (itt == 'object') {
				if (it.attr) {
					it.elements().each(function(child, j) {
						this._appendChild(el, child);
					}.bind(this));
				} else {
					this._appendChild(el, it);
				}
			} else {
				if (itt == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = it;
					var childs = ctr.childNodes;
					var nodes = [];
					for (var j=childs.length-1; j>=0; j--) {
						nodes.push(ctr.removeChild(childs[j]));
					}
					nodes = nodes.reverse();
					for (var j=0, jl=nodes.length; j<jl; j++) {
						this._appendChild(el, nodes[j]);
					}
				}
			}
		}
		return this;
	},
	_appendChild: function(parent, child) {
		if (parent.tagName.toLowerCase() == 'table' && child.tagName.toLowerCase() == 'tr') {
			if (parent.tBodies.length == 0) {
				parent.appendChild(document.createElement('tbody'));
			}
			parent.tBodies[0].appendChild(child);
		} else {
			parent.appendChild(child);
		}
	},
	
	prepend: function() {
		//	TODO：如果父对象是table，子对象是tr，需要做一个特殊处理，类似与append方法
		
		var el = this._els[0];
		for (var i=arguments.length-1; i>=0; i--) {
			var it = arguments[i],
					itt = typeof(it);
			if (itt == 'object') {
				if (it.attr) {
					it.elements().reverse().each(function(child, j) {
						el.insertBefore(child, el.firstChild);
					});
				} else {
					el.insertBefore(it, el.firstChild);
				}
			} else {
				if (itt == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = it;
					var childs = ctr.childNodes;
					var nodes = [];
					for (var j=childs.length-1; j>=0; j--) {
						nodes.push(ctr.removeChild(childs[j]));
					}
					nodes = nodes.reverse();
					for (var j=nodes.length-1; j>=0; j--) {
						el.insertBefore(nodes[j], el.firstChild);
					}
				}
			}
		}
		return this;
	},

	before: function() {
		//	TODO：如果父对象是table，子对象是tr，需要做一个特殊处理，类似与append方法
		
		var el = this._els[0];
		for (var i=0, il=arguments.length; i<il; i++) {
			var it = arguments[i],
					itt = typeof(it);
			if (itt == 'object') {
				var parent = el.parentNode;
				//	TODO: 如果没有子对象的话，应该使用appendChild方法，与after方法同
				if (it.attr) {
					it.elements().each(function(child, j) {
						parent.insertBefore(child.parentNode ? child.parentNode.removeChild(child) : child, el);
					});
				} else {
					parent.insertBefore(it.parentNode ? it.parentNode.removeChild(it) : it, el);
				}
			} else {
				if (itt == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = it;
					var childs = ctr.childNodes;
					var nodes = [];
					for (var j=childs.length-1; j>=0; j--) {
						nodes.push(ctr.removeChild(childs[j]));
					}
					nodes = nodes.reverse();
					for (var j=0, jl=nodes.length; j<jl; j++) {
						el.parentNode.insertBefore(nodes[j], el);
					}
				}
			}
		}
		return this;
	},

	after: function() {
		//	TODO：如果父对象是table，子对象是tr，需要做一个特殊处理，类似与append方法
		
		var el = this._els[0];
		for (var i=arguments.length-1; i>=0; i--) {
			var it = arguments[i],
					itt = typeof(it);
			if (itt == 'object') {
				var parent = el.parentNode,
						next = el.nextSibling;
				if (it.attr) {
					it.elements().each(function(child, j) {
						if (child == next) return;
						if (next) {
							parent.insertBefore(child.parentNode ? child.parentNode.removeChild(child) : child, next);
						} else {
							parent.appendChild(child.parentNode ? child.parentNode.removeChild(child) : child);
						}
					});
				} else {
					if (it != next) {
						if (next) {
							parent.insertBefore(it.parentNode ? it.parentNode.removeChild(it) : it, next);
						} else {
							parent.appendChild(it.parentNode ? it.parentNode.removeChild(it) : it);
						}
					}
				}
			} else {
				if (itt == 'string') {
					var ctr = document.createElement('div');
					ctr.innerHTML = it;
					var childs = ctr.childNodes;
					var nodes = [];
					for (var j=childs.length-1; j>=0; j--) {
						nodes.push(ctr.removeChild(childs[j]));
					}
					nodes = nodes.reverse();
					for (var j=nodes.length-1; j>=0; j--) {
						el.parentNode.insertBefore(nodes[j], el.nextSibling);
					}
				}
			}
		}
		return this;
	},
	
	//	inAllType 表示是否所有类型，否的话，表示只取得nodeType=1的元素
	prev: function(inAllType) {
		var el;
		if (inAllType) {
			el = this._els[0].previousSibling;
		} else {
			var ele = this._els[0];
			while (ele = ele.previousSibling) {
				if (ele.nodeType && ele.nodeType == 1) {
					el = ele;
					break;
				}
			}
		}
		
		return kola.Element.newInstance(el);
	},
	
	prevAll: function(inAllType) {
		inAllType = !!inAllType;
		var els = [],
				el = this._els[0];
				
		while (el = el.previousSibling) {
			if (inAllType) els.push(el);
			else {
				if (el.nodeType && el.nodeType == 1) {
					els.push(el);
				}
			}
		}
		
		return kola.Element.newInstance(els.reverse());
	},
	
	next: function(inAllType) {
		var el;
		if (inAllType) {
			el = this._els[0].nextSibling;
		} else {
			var ele = this._els[0];
			while (ele = ele.nextSibling) {
				if (ele.nodeType && ele.nodeType == 1) {
					el = ele;
					break;
				}
			}
		}
		
		return kola.Element.newInstance(el);
	},
	
	nextAll: function(inAllType) {
		inAllType = !!inAllType;
		var els = [],
				el = this._els[0];
				
		while (el = el.nextSibling) {
			if (inAllType) els.push(el);
			else {
				if (el.nodeType && el.nodeType == 1) {
					els.push(el);
				}
			}
		}
		
		return kola.Element.newInstance(els);
	},
	
	first: function(inAllType) {
		var el = this._els[0].childNodes[0];
		if (!inAllType) {
			var ele = el;
			el = null;
			while (ele) {
				if (ele.nodeType && ele.nodeType == 1) {
					el = ele;
					break;
				}
				ele = ele.nextSibling();
			}
		}
		
		return kola.Element.newInstance(el);
	},
	
	last: function(inAllType) {
		var thisEl = this._els[0];
		var el = thisEl.childNodes[thisEl.childNodes.length - 1];
		if (!inAllType) {
			var ele = el;
			el = null;
			while (ele) {
				if (ele.nodeType && ele.nodeType == 1) {
					el = ele;
					break;
				}
				ele = ele.previousSibling();
			}
		}
		
		return kola.Element.newInstance(el);
	},
	
	up: function(selector) {
		var sel = $.parseSelectorStr(selector)[0];
		var els = this._els.collect(function(el) {
			while (el = el.parentNode) {
				if ($.isMatchSelector(el, sel)) {
					return el;
				}
			}
		});
		return kola.Element.newInstance(els);
	},
	
	upWithMe: function(selector) {
		var sel = $.parseSelectorStr(selector)[0];
		var els = this._els.collect(function(el) {
			while (el) {
				if ($.isMatchSelector(el, sel)) {
					return el;
				}
				el = el.parentNode;
			}
		});
		return kola.Element.newInstance(els);
	},
	
	down: function(selector) {
		return $(selector, this._els);
	},
	
	parent: function() {
		return kola.Element.newInstance(this._els[0].parentNode);
	},
	
	children: function(inAllType) {
		var els = [],
				nodes = this._els[0].childNodes;
		for (var i=0, il=nodes.length; i<il; i++) {
			var it = nodes[i];
			if (inAllType) {
				els.push(it);
			} else {
				if (it.nodeType && it.nodeType == 1) els.push(it);
			}
		}
		return kola.Element.newInstance(els);
	},
	
	elements: function() {
		return this._els;
	},
	
	data: function(name, value) {
		return this.attr('data-' + name, value);
	},
	
	hasClass: function(name) {
		var el = this._els[0];
		return el.className && el.className.split(' ').include(name);
	},
	
	addClass: function(name) {
		this._els.each(function(el) {
			var arr = [];
			if (el.className) {
				arr = el.className.split(' ');
				if (!arr.include(name)) arr.push(name);
			} else {
				arr.push(name);
			}
			el.className = arr.join(' ');
		});
		return this;
	},
	
	removeClass: function(name) {
		this._els.each(function(el) {
			if (el.className) {
				var arr = el.className.split(' '),
						index = arr.index(name);
				if (index != -1) arr.splice(index, 1);
				el.className = arr.join(' ');
			}
		});
		return this;
	},
	
	toggleClass: function(class1, class2) {
		if (typeof(class2) == 'string') {
			this._els.each(function(el) {
				if (el.className && el.className == class1) {
					el.className = class2;
				} else {
					el.className = class1;
				}
			});
		} else {
			this._els.each(function(el) {
				if (el.className) {
					var arr = el.className.split(' ');
					if (arr.include(class1)) {
						el.className = arr.del(class1).join(' ');
					} else {
						arr.push(class1);
						el.className = arr.join(' ');
					}
				} else {
					el.className = class1;
				}
			});
		}
		return this;
	},
	
	concat: function() {
		var els = this._els.concat();
		$A(arguments).each(function(it, i) {
			if (it.attr) it = it.elements();
			els = els.concat(it);
		}.bind(this));
		return kola.Element.newInstance(els);
	},
	
	push: function(el) {
		this._els.push(el);
		return this;
	},
	
	each: function(iterator) {
		//	TODO: 临时去掉了所有的try catch，以便于更方便的调试程序
		/*
		try {
		*/
			for (var i=0, il=this._els.length; i<il; i++) {
				iterator(kola.Element.newInstance(this._els[i]), i);
			}
		/*
		} catch (e) {
			if (e != $break) throw e;
		}
		*/
		return this;
	},
	
	clone: function() {
		return new kola.Element(this._els);
	}
	
});
kola.Element.newInstance = function(els) {
	if (els == null) return null;
	if (els.constructor == Array && els.length == 0) return null;
	return new kola.Element(els.constructor == Array ? els : [els]);
}
kola.Element.create = function(tagName, attrs) {
	var el = this.newInstance(document.createElement(tagName));
	if (typeof(attrs) == 'object' && attrs != null) {
		Object.each(attrs, function(it, itn, i) {
			el.attr(itn, it);
		});
	}
	return el;
}


/**
 * @对 kola.Element类针对下拉选择框控件的扩展实现
 */
Object.extend(kola.Element.prototype,{
	/**
	 * 把一个对象中的所有字符串属性项添加到当前select中
	 * @param {Object} obj 要添加的属性对象（必填项）
	 * @type Select
	 * @return 当前的Select对象
	 */
	addOptions: function(obj) {
		var el = this._els[0];
		for (var i in obj) {
			if (typeof(obj[i]) == "string") {
				el.options[el.options.length] = new Option(obj[i], i);
			}
		}
		return this;
	},
	
	/**
	 * 添加一个区段
	 * @param {Number} from 开始值（必填项）
	 * @param {Number} to 结束值（必填项）
	 * @param {Number} step 变化量（可选项），默认为1，系统会自动根据from和to的大小，来决定step为正值或者负值
	 * @type Select
	 * @return 当前的Select对象
	 */
	addRange: function(from, to, step) {
		var el = this._els[0];
		
		// 设置step的值
		step = (typeof(step) == "number" && step != 0) ? Math.abs(step) : 1;
		if (from < to) {
			for (var i=from; i<=to; i+=step) {
				el.options[el.options.length] = new Option(i, i);
			}
		} else {
			for (var i=from; i>=to; i-=step) {
				el.options[el.options.length] = new Option(i, i);
			}
		}
		return this;
	},
	
	/**
	 * 获取或者设置select的值
	 * @param {StringOrNumber} val select的值，如果存在那就是设置值，如果不存在那就是想取得值。
	 * 		如果是准备设置值，只接受字符串类型和数字型。如果为字符串的值，那就表示select的值就是这个。如果为数字值，那就表示默认选中第几个。如果类型不对等，那就设置为第一个。
	 * @type SelectOrString
	 * @return 如果是设置select的值，那就返回当前的Select对象。如果是获取select的值，那就直接返回字符串型的值。
	 */
	select: function(val) {
		var el = this._els[0];
		switch (typeof(val)) {
			case "number":
				el.selectedIndex = (val > el.options.length ? 0 : val);
				break;
			case "string":
				el.value = val;
				if(el.value == '') el.value = 0;
				break;
			default:
				el.selectedIndex = 0;
				break;
		}
		return this;
	},
	
	/**
	 * 获取或者设置select的值
	 * @param {StringOrNumber} val select的值，如果存在那就是设置值，如果不存在那就是想取得值。
	 * 		如果是准备设置值，只接受字符串类型和数字型。如果为字符串的值，那就表示select的值就是这个。如果为数字值，那就表示默认选中第几个。如果类型不对等，那就设置为第一个。
	 * @type SelectOrString
	 * @return 如果是设置select的值，那就返回当前的Select对象。如果是获取select的值，那就直接返回字符串型的值。
	 */
	disable: function(val) {
		if (typeof(val) == "boolean") {
			this._els[0].disabled = val;
		}
		return this;
	},
	
	/**
	 * 清除所有选项
	 * @type Select
	 * @return 当前的Select对象
	 */
	clear: function() {
		this._els[0].options.length = 0;
		return this;
	}
});

/************************************************** Selector *******************************************************/

/**
 * 取得对象
 * @param exp 对象表达式，接受这三种类型的参数
 * 		1. String类型的对象选择表达式
 * 		2. 原生对象
 * 		3. 已经封装过的对象
 */

window.$ = function(exp, context) {
	var eles = [];
	
	var expt = typeof(exp);
	if (expt == 'object') {
		if (exp.attr) {
			return exp;
		} else {
			eles = exp;
		} 
	} else {
		if (expt != 'string') return null;
		if (exp.charAt(0) == '#' && exp.indexOf(' ') == -1 && exp.indexOf('>') == -1) {
			var idEl = document.getElementById(exp.substr(1));
			eles = idEl ? [idEl] : null;
		} else {
			var sels = $.parseSelectorStr(exp),
				parents = null;
			
			if (context == null) {
				parents = [window];
			} else {
				if (context.attr && context.elements) {
					if (context.elements().length > 0) {
						parents = context.elements();
					} else {
						parents = [window];
					}
				} else {
					if (context.constructor == Array) {
						parents = context;
					} else {
						parents = [context];
					}
				}
			}
			
			sels.each(function(sel, i) {
				var el;
				if (sel.scopeType == 0) {
					parents = [document.getElementById(sel.itemName)];
				} else {
					if (sel.scopeType == 1) {
						var els = [];
						parents.each(function(it, i) {
							for (var j=0, jl=it.childNodes.length; j<jl; j++) {
								els.push(it.childNodes[j]);
							}
						});
						parents = els;
						if (sel.itemName.length > 0) {
							parents = parents.collect(function(it, j) {
								if (it.tagName && it.tagName.toLowerCase() == sel.itemName) {
									return it;
								} 
							});
						}
					} else {
						var els = [];
						parents.each(function(it, i) {
							if (it == window) it = document;
							var childs = it.getElementsByTagName(sel.itemName || '*');
							for (var j=0, jl=childs.length; j<jl; j++) {
								els.push(childs[j]);
							}
						});
						parents = els;
					}
				}
				
				if (sel.propName != '') {
					var needValue = sel.propValue.length > 0;
					parents = parents.collect(function(it, i) {
						var v = sel.propName == 'class' ? it.className : it.getAttribute(sel.propName);
						if (v == null) return;
						if (needValue) {
							if (sel.propName == 'class') {
								v = ' ' + v + ' ';
								if (v.indexOf(' ' + sel.propValue + ' ') != -1) {
									return it;
								}
							} else {
								if (v == sel.propValue) return it;
							}
						} else {
							return it;
						}
					});
				}
			});
			eles = parents;
		}
	}
	
	return kola.Element.newInstance(eles); 
}

/*
{
	scopeType: '',			//	范围。三种：ID，子对象，孙对象
	itemName: '',				//	对象名称
	propName: '',				//	属性类型。两种：className或者属性名
	propValue: ''
}
*/
$.parseSelectorStr = function(str) {
	var sels = [];
	
	var arr = str.split(' ');
	arr.each(function(it, i) {
		var arr2 = it.split('>');
		arr2.each(function(it2, j) {
			var scopeType = (j == 0) ? 2 : 1,
					itemName = '',
					propName = '',
					propValue = '';
			
			var propIndex = it2.indexOf('.');
			if (propIndex != -1) {
				propName = 'class';
				propValue = it2.substr(propIndex+1);
				it2 = it2.substr(0, propIndex);
			} else {
				propIndex = it2.indexOf('[');
				if (propIndex != -1) {
					propName = it2.substring(propIndex+1, it2.length-1).split('=');
					it2 = it2.substr(0, propIndex);
					if (propName.length == 2) {
						propValue = propName[1];
					}
					propName = propName[0];
				}
			}
			
			if (it2.length > 0) {
				var c = it2.charAt(0);
				switch (c) {
					case '*':
						scopeType = 2;
						break;
					case '#':
						scopeType = 0;
						itemName = it2.substr(1);
						break;
					default:
						itemName = it2;
						break;
				}
			}
			
			sels.push({
				scopeType: 	scopeType,
				itemName: 	itemName,
				propName: 	propName,
				propValue: 	propValue
			});
		});
	});
	
	return sels;
}
$.isMatchSelector = function(el, sel) {
	
	el = $(el).elements()[0];
	
	var itemName = sel.itemName,
			propName = sel.propName,
			propValue = sel.propValue;
	
	//	如果是通过id进行匹配，那就判断id值是否正确
	if (sel.scopeType == 0) {
		if (el.id != itemName) return false; 
	}
	
	//	判断是否符合Tag名称
	if (itemName != '') {
		if (!el.tagName || el.tagName.toLowerCase() != itemName) return false;
	}
	
	//	判断属性
	if (propName != '') {
		var needValue = propValue.length > 0,
				v = sel.propName == 'class' ? el.className : (el.getAttribute ? el.getAttribute(sel.propName) : null);
		
		//	如果不存在属性值，那就是匹配失败
		if (v == null) return false;
		
		if (needValue) {
			//	判断是否是样式，如果是样式的话，要进行一个特殊的处理
			if (propName == 'class') {
				v = ' ' + v + ' ';
				if (v.indexOf(' ' + propValue + ' ') == -1) return false;
			} else {
				if (v != propValue) return false;
			}
		}
	}
				
	return true;
}


/************************************************** Event *******************************************************/

kola.Event = {
	
	on: function(el, name, func) {
		name = name.toLowerCase();
		
		//	对于自定义事件对象，采用自己的处理流程
		var D = null;
		if (D = el._EVENTDATA) {
			if (D._BEFOREON && D._BEFOREON[name]) {
				var v = D._BEFOREON[name](el, name, func);
				if (typeof(v) == 'boolean' && v == false) return this;
			}
			if (!D[name]) D[name] = [];
			D[name].push(func);
			if (D._AFTERON && D._AFTERON[name]) {
				D._AFTERON[name](el, name, func);
			}
			return this;
		}
		
		if (name == 'keyenter') {
			var cb = function(e) {
				if (e) {
					if (e.keyCode == 13) {
						func(e);
					}
				} else {
					if (event.keyCode == 13) {
						func();
					}
				}
			}
			name = 'keypress';
		} else {
			cb = func;
		}
		
		//	TODO: 下面这段被注释的代码，是存储每个事件 所对应的处理方法，可用在un方法中，但是还没有测，所以暂时隐去
		/*
		var elr, ela;
		el._event_listener = elr = el._event_listener || {};
		elr[name] = ela = erl[name] || [];
		if (ela.include(cb)) return;
		ela.push(cb);
		*/
		
		if (el.addEventListener) {
			el.addEventListener(name, cb, false);
		} else {
			el.attachEvent('on' + name, cb);
		}
		return this;
	},
	
	un: function(el, name, func) {
		name = name.toLowerCase();
		
		//	对于自定义事件对象，采用自己的处理流程
		var D = null;
		if (D = el._EVENTDATA) {
			if (D = D[name]) {
				D.del(func);
			}
			return this;
		}
		
		if (el.removeEventListener) {
			el.removeEventListener(name, func, false);
		} else {
			el.detachEvent('on' + name, func);
		}
		return this;
		
		//	TODO: 下面这段被注释的代码，可以删除掉某个事件的所有监听器，但是还没有测，所以暂时隐去
		/*
		if (func) {
			if (el.removeEventListener) {
				el.removeEventListener(name, func, false);
			} else {
				el.detachEvent('on' + name, func);
			}
		} else {
			var elrs;
			if ((elrs = el._event_listener) && (elrs = elrs[name]) && elrs.length) {
				while (elrs.length > 0) {
					if (func = elrs.pop()) {
						if (el.removeEventListener) {
							el.removeEventListener(name, func, false);
						} else {
							el.detachEvent('on' + name, func);
						}
					}
				}
			}
		}
		*/
	},
	
	out: function(el, name, func) {
		var callback = function(e) {
			var src = kola.Event.element(e).elements()[0];
			var isIn = false;
			while (src) {
				if (src == el) {
					isIn = true;
					break;
				}
				src = src.parentNode;
			}
			if (!isIn) {
				func(e);
				kola.Event.un(document.body, name, c);
			}
		}
		var c = callback.bindEvent();
		kola.Event.on(document.body, name, c);
	},
	
	stop: function(e) {
		kola.Event.stopPropagation(e);
		kola.Event.preventDefault(e);
	},
	
	stopPropagation: function(e) {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
	},
	
	preventDefault: function(e) {
		e.returnValue = false;
		if (e.preventDefault) {
			e.preventDefault();
		}
	},
	
	element: function(e) {
		return kola.Element.newInstance(e.target || e.srcElement);
	},
	
	fire: function(el, name, e) {
		//	TODO: 现在只处理了自定义事件，还未处理浏览器内置的事件，这一部分需要增加
		
		var D = null;
		if (D = el._EVENTDATA) {
			if (D = D[name]) {
				
				//	获取事件对象
				e = Object.extend({
					srcElement: el,
					type: name
				}, e || {});
				
				D.each(function(it, i) {
					it(e);
				});
			}
		}
		return this;
	},
	
	initEventObserver: function(obj, options) {
		/**
		 * _EVENTDATA为存储事件信息的对象，其一个样例值为：
		 * {
		 * 		'event1': [
		 * 			listener1, listener2, ...
		 * 		],
		 * 		'event2': [
		 * 			listener5, listener6, ...
		 * 		],
		 * 		...
		 * }
		 */
		obj._EVENTDATA = {};
		
		if (options) {
			if (options.beforeOn) {
				/**
				 * options
				 * {
				 * 		before: {
				 * 			'event1': function(obj, name, func) {return boolean},
				 * 			'event2': function(obj, name, func) {return boolean},
				 * 			...
				 * 		}
				 * }
				 */
				obj._EVENTDATA._BEFOREON = options.beforeOn;
			}
			if (options.afterOn) {
				/**
				 * options
				 * {
				 * 		after: {
				 * 			'event1': function(obj, name, func) {},
				 * 			'event2': function(obj, name, func) {},
				 * 			...
				 * 		}
				 * }
				 */
				obj._EVENTDATA._AFTERON = options.afterOn;
			}
		}
		
		var E = kola.Event;
		obj.on = E.on.bind(E, obj);
		obj.un = E.un.bind(E, obj);
		obj.fire = E.fire.bind(E, obj);
	}
		
}

/************************************************** Ajax *******************************************************/

kola.Ajax = {
	
	request: function(url, options) {
		var trans = this._getTransport();
		options = Object.extend({
			method:       'get',
			async:				true
		}, options || {});
		
		if (options.method == 'get' && typeof(options.data) == 'string') {
			url += (url.indexOf('?') == -1 ? '?' : '&') + options.data;
			options.data = null;
		}
		
		trans.open(options.method, url, options.async);
		
		if (options.method == 'post') {
			trans.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}
		
		trans.onreadystatechange = this._onStateChange.bind(this, trans, url, options);
		trans.send(options.data || null);
		return trans;
	},
	
	text: function(url, options) {
		options.format = 'text';
		return this.request(url, options);
	},
	
	json: function(url, options) {
		options.format = 'json';
		return this.request(url, options);
	},
	
	xml: function(url, options) {
		options.format = 'xml';
		return this.request(url, options);
	},
	
	_getTransport: function() {
		if (window.XMLHttpRequest) return new XMLHttpRequest();
		else {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					return new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					return false;
				}
			}
		}
  },
  
  _onStateChange: function(trans, url, options) {
  	if (trans.readyState == 4) {
  		var s = trans.status;
  		if (!!s && s >= 200 && s < 300) {
  			if (typeof(options.success) != 'function') return;
  			
  			var ctt = trans;
  			if (typeof(options.format) == 'string') {
  				switch(options.format) {
  					case 'text':
  						ctt = trans.responseText;
  						break;
  					case 'json':
  						ctt = eval('(' + trans.responseText + ')');
  						break;
  					case 'xml':
  						ctt = trans.responseXML;
  						break;
  				}
  			}
  			options.success(ctt);
  		} else {
  			if (typeof(options.failure) == 'function') options.failure(trans);
  		}
  	}
  }
	
}

/************************************************** Cookie *******************************************************/

kola.Cookie = {
	get: function(name) {
		var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
		if( tmp = reg.exec( unescape(document.cookie) ) )
			return(tmp[2]);
		return null;
	},
	set: function(name, value, expires, path, domain) {
		var str = name + "=" + escape(value);
		if (expires) {
			if (expires == 'never') {expires = 100*365*24*60;}
			var exp = new Date(); 
			exp.setTime(exp.getTime() + expires*60*1000);
			str += "; expires="+exp.toGMTString();
		}
		if (path) {str += "; path=" + path;}
		if (domain) {str += "; domain=" + domain;}
		document.cookie = str;
	},
	remove: function(name, path, domain) {
		document.cookie = name + "=" + 
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/************************************************** Require *******************************************************/

	
var Pack = {
	
	/**
	 * 加载指定的包，加载完成之后调用指定的回调方法
	 */
	require: function(/*String*/packages, /*Function*/callback) {
		var pa = packages.replace(/\s/g, '').split(','),		//	所有需要的包
				requires = [],																	//	还需要等待完成可以使用的包
				loads = [];																			//	还需要去加载的包
		
		//	找到所有需要加载的包和需要等待的包
		pa.each(function(it) {
			var st = Pack._status(it);
			if (st != 3) {
				if (st == 0) loads.push(it);
				requires.push(it);
			}
		});
		
		//	如果没有需要加载的包，那就调用回调
		if (requires.length == 0) {
			if (typeof(callback) == 'function') {
				callback.timeout(0);
			}
			return;
		}
		
		//	给需要等待的包设置标记位
		var ro = new Pack._Require(requires, callback);		//	
		requires.each(function(it) {
			Pack._connect(it, ro);
		});
		
		//	加载所有需要的包
		var l = function(loadsObj) {
			loadsObj.each(function(it) {
				Pack._load(it);
			});
		};
		l.bind(Pack, loads).timeout(0);
	},
	
	register: function(/*String*/packageName, /*Function?*/content, /*String?*/requires) {
		var st = Pack._status(packageName);
				
		//	根据包的不同状态进行不同的处理
		if (st == 3) return;									//	如果已经存在了该包，那就直接返回
		
		//	判断是否需要先加载一些包
		if (typeof(requires) == 'string') {
			//	有需要提前加载的包
			
			//	包的状态标识为加载完成
			Pack._status(packageName, 2);				
			
			//	那就先加载相应的包
			//	$req(requires, $.Package.register.bind(window, packageName, content));
			$req(requires, $register.bind(window, packageName, content));
		} else {
			//	不需要提前加载一些包
			
			//	如果有需要执行的内容，那就先执行
			if (typeof(content) == 'function') {
				content();
			}
			
			//	标志当前包为完全可用的状态
			Pack._status(packageName, 3);
		}
	},
	
	//	注册路径
	regPath: function(obj, name) {
		var path = Pack._paths;
		
		if (!path[name]) path[name] = {};		//	如果系统注册区域没有这个对象，那就添加这个对象
		var pack = path[name];
		for (var it in obj) {
			var iv = obj[it];
			if (typeof(iv) == 'string') {
				pack[it] = iv;
			}
		}
	},
	
	/**
	 * 取得包的路径
	 */
	_path: function(/*String*/name) {
		var pa = name.split('.'),
				tp = pa.shift(),							//	顶级包名
				cf = Pack._paths[tp],
				ua = [],
				lc = '';
		
		while (pa.length > 0) {
			var str = pa.join('.');
			if (cf[str]) {
				lc = cf[str];
				pa.length = 0;
			} else {
				ua.push(pa.pop());
			}
		}
		
		if (lc == '' && ua.length > 0) {
			if (ua[0] == '*') ua[0] = 'core';
			return (cf._path || '') + ua.reverse().join('/') + '.js';
		} else {
			if (ua.length == 0) return lc;
			
			if (ua[0] == '*') ua[0] = 'core';
			return lc + ua.reverse().join('/') + '.js';
		}
	},
	
	_paths: {
		/*
		
		$: {
			_path: 	'http://js1.pp.sohu.com.cn/ppp/js/',		//	表示这个包的根路径
			anim: 	'http://js4.pp.sohu.com.cn/ppp/sns/'
		},
		
		blog: {
			_path: 	'http://js1.pp.sohu.com.cn/ppp/js/',		//	表示这个包的根路径
			common: ''
		}
		
		 */
		
	},
	
	/**
	 * 用来表示包的状态，总共有如下几种状态：
	 * 	0: 		未初始化
	 * 	1:		加载中
	 * 	2:		加载完成，但是还不能使用
	 * 	3:		已经完全可用
	 */
	_packages: {
		
	},
	
	/**
	 * 取得或者设置一个包的状态
	 */
	_status: function(/*String*/packageName, /*Number?*/stat) {
		var P = Pack._packages;
		if (!P[packageName]) {
			P[packageName] = {
				status: 0,
				waits: []
			}
			
			var a = packageName.split('.'),
					s = window;
			a.each(function(it, i) {
				if (i != a.length-1) {
					if (!s[it]) {
						s[it] = {};
					}
					s = s[it];
				}
			});
		}
		if (typeof(stat) == 'number') {
			//	设置
			P[packageName].status = stat;
			
			//	如果是完成状态，那就进行相应的回调
			if (stat == 3) {
				var wa = P[packageName].waits;
				for (var i=wa.length-1, it; i>=0; i--) {
					it = wa[i];
					it.update(packageName);
				}
			}
		} else {
			//	获取
			return P[packageName].status;
		}
	},
	
	_connect: function(/*String*/packageName, /*Object*/requireObj) {
		var P = Pack._packages;
		if (!P[packageName]) {
			P[packageName] = {
				status: 0,
				waits: []
			}
		}
		P[packageName].waits.push(requireObj);
	},
	
	_disconnect: function(/*String*/packageName, /*Object*/requireObj) {
		var P = Pack._packages;
		if (!P[packageName]) {
			P[packageName] = {
				status: 0,
				waits: []
			}
		}
		var wa = P[packageName].waits;
		for (var i=wa.length-1, it; i>=0; i--) {
			if (wa[i] == requireObj) {
				wa.splice(i, 1);
			}
		}
	},
	
	_load: function(packageName) {
		var P = Pack,
				st = P._status(packageName),
				obj = P._packages[packageName];
		
		//	如果不是未初始化状态，那就不作任何处理
		if (st != 0) return;
		
		//	标记相应值
		P._status(packageName, 1);
		
		//	加载
		var s = document.createElement("script");
		s.type = 'text/javascript';
		s.src = P._path(packageName);
		document.getElementsByTagName('head')[0].appendChild(s);
	},
	
	_Require: function(/*String*/packages, /*Function?*/callback) {
		this.packages = packages;
		this.callback = callback;
	}
}

Pack._Require.prototype = {
	update: function(packageName) {
		var pa = this.packages;
		for (var i=pa.length-1; i>=0; i--) {
			var it = pa[i],
				stat = Pack._status(it);
			if (stat == 3 || (stat == 2 && it == packageName)) {
				pa.splice(i, 1);
				Pack._disconnect(it, this);
			}
		}
		
		//	如果已经没有任何需求，那说明所有相应的文件已经加载成功
		if (pa.length == 0) {
			if (typeof(this.callback) == 'function') {
				var cb = this.callback;
				cb.timeout(0);
			}
		}
	}
}

window.$req = Pack.require;
window.$register = Pack.register;
window.$regPath = Pack.regPath;

window.$call = function(/*Function*/func, /*String?*/requires, /*Object*/options) {
	if (typeof(func) == 'string') {
		func = eval.bind(window, func);
	}
	
	if (typeof(requires) == 'string' && requires.length > 0) {
		$req(requires, func);
	} else {
		func();
	}
}

//	注册路径
if (typeof(KOLAPATH) == 'object') {
	$regPath(KOLAPATH, 'kola');
} else { 
	$regPath({
			_path: '/r/j-src/kola/'
		}, 'kola');
}
if (typeof(KOLASOHUPATH) == 'object') {
	$regPath(KOLASOHUPATH, 'sohu');
} else { 
	$regPath({
			_path: '/r/j-src/sohu/'
		}, 'sohu');
}