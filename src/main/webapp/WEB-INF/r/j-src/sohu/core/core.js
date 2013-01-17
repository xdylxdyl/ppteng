
$register('sohu.core.*', function() {
	
	var PACK = sohu;
	
	/********************************************* Model *********************************************/

	sohu.core.Model = Class.create({
		
		initialize: function(options) {
			this._options = options;
			
			var _this = this;
			Object.each(this._options.actions, function(it, itn, i) {
				_this[itn] = _this._action.bind(_this, itn);
			});
			
			this._data = {};
			this._dataInfo = {};
		},
		
		/**
		 * 
		 */
		_action: function(action, params, opt) {
			var mOpt = this._options,					//	model对象的配置信息
					tOpt = mOpt.actions[action],	//	当前方法的配置信息
					aOpt = {};										//	Ajax对象的配置信息
			
			//	设置请求地址
			var url = mOpt.url + tOpt.url;
			
			tOpt.encode = tOpt.encode || '';
			if (tOpt.encode != 'uri') {
				var encode = function(v) {return v;};
			} else {
				var encode = function(v) {return encodeURIComponent(v);}
			}
			
			//	设置参数信息
			var arr = [];
			if (params) {
				
				//	判断是否存在应用部分的配置信息
				if (tOpt.params) {
					//	如果存在的话，那就按配置信息读取相应的参数值
					tOpt.params.each(function(it, i) {
						var iv = params[it],
								ivt = typeof(iv);
						if (ivt == 'string' || ivt == 'number') {
							arr.push(it + '=' + encode(iv));
						} else if (ivt == 'object' && iv.length && iv.each) {
							iv.each(function(ivit) {
								arr.push(it + '=' + encode(ivit));
							});
						}
					});
				} else {
					//	如果不存在，那就读取这个对象的参数值
					for (var it in params) {
						var iv = params[it],
								ivt = typeof(iv);
						if (ivt == 'string' || ivt == 'number') {
							arr.push(it + '=' + encode(iv));
						} else if (ivt == 'object' && iv.length && iv.each) {
							iv.each(function(ivit) {
								arr.push(it + '=' + encode(ivit));
							});
						}
					}
				}
			}
			// 根据是否使用缓存来添加时间戳
			if(!tOpt.cache) arr.push('ts='+(new Date()).getTime());
			
			var data = arr.join('&');
			
			//	配置所有的ajax设置信息
			var format = tOpt.format;
			aOpt = {
				data: 		data,
				method: 	tOpt.method,
				format:		format,
				success: 	opt.success,
				failure: 	opt.failure
			}
			
			//	如果返回类型为json，那就需要进行特殊处理
			if (format == 'json') {
				var tObj = {
					success: 	opt.success,
					failure: 	opt.failure
				}
				aOpt.success = this._jsonSuccess.bind(this, action, tObj);
				aOpt.failure = this._jsonFailure.bind(this, action, tObj);
			}
				
			//	发送请求
			kola.Ajax.request(url, aOpt); 
		},
		
		_jsonSuccess: function(action, options, json) {
			if (json.status == "1") {
				//	判断是否存在返回数据预处理程序，存在的话首先进行处理
				var func = this['_' + action + 'RepData'];
				if (func) func.call(this, json.data);
				options.success(json.data);
			} else {
				options.failure(json);
			}
		},
		
		_jsonFailure: function(action, options, trans) {
			options.failure(trans);
		}
		
	});
	
	/********************************************* Me *********************************************/
	
	/**
	 * TODO: 方法的实现需要需要重写，现在仅为一个临时方法
	 */
	window.Me = {
		id: function() {
			return this._get('id');
		},
		
		pp: function() {
			if (typeof(PassportSC) == 'object') {
				return PassportSC.cookieHandle();
			}
			return null;
		},
		
		xpt: function() {
			return this._get('xpt');
		},
		
		_get: function(name) {
			var str = kola.Cookie.get('sns');
			if (typeof(str) == 'string' && str.length > 0) {
				try {
					var o = eval('(' + str + ')');
					if (typeof(o[name]) != 'undefined') {
						return o[name];
					}
				} catch (e) {}
			}
			return null;
		}
	};
	
	/********************************************* log *********************************************/
	
	sohu.log = function(data) {
		if (window.console) console.log(data);
	}
	
	/********************************************* user *********************************************/
	
	/**
	 * 请求用户注册信息的数据模型
	 */
	var LogMdl = new sohu.core.Model({	
				actions: {	
					showPassport: {
							url:		'a/user/passport.do',				
							method: 	'get',
							format: 	'json',
							type:       'one'        
						},
					showRedirectUrl : {
							url:		'/a/passport/showRedirectUrl.do',				
							method: 	'get',
							format: 	'json',
							type:       'one'  
					
					}
				},
				url:	''
	});
	
	sohu.user = eval("("+kola.Cookie.get('sns')+")") ? eval("("+kola.Cookie.get('sns')+")"):{};
	
	//FIXME 这里是后端本地调试的cookie双重字符串的临时解决方法
	sohu.user = typeof(sohu.user) == 'string' ? eval("("+sohu.user+")") : sohu.user;
	
	Object.extend(sohu.user,{
		
		/**
		 * 登录验证，请求当前登录人在SNS中的信息
		 */
		login: function(){
			LogMdl.showPassport(null,{
					success: this._redirectHome.bind(this),
					failure: this._getRedirectUrl.bind(this)
			});
		},
		/**
		 * 退出，清空passport cookie和SNS cookie
		 */
		logout: function(){
			PassportSC.logoutHandle(document.body,this._outcallBack,this._outcallBack);
			
		},
		/**
		 * Passport退出以后的回调方法
		 */
		_outcallBack: function(){
			window.location.href = '/user/logout.do';
			return false;
		},
		
		//获取用户注册PASSPORT时的邀请地址
		_getRedirectUrl: function(){
			LogMdl.showRedirectUrl(null,{
					success: this._redirectUrl.bind(this),
					failure: function(){alert('亲亲，登录暂时有点问题...请重试一下！')}
				});
		},
		
		// 页面重定向到home页
		_redirectHome: function(json){
			if(PassportSC.autoRedirectUrl && PassportSC.autoRedirectUrl.length > 0){
				window.location.href = PassportSC.autoRedirectUrl;
			} else{
				window.location.href = "/user/login.do";
			}   
		},
		
		// 页面重定向到请求到的邀请地址
		_redirectUrl: function(data){
			if(data.redirectUrl){
				window.location.href=data.redirectUrl;
			} else{
				window.location.href = '/user/reg.do';
			}
		}
	});
	
	// 设置卡片回调方法
	
	window.drawAppInfo = sohu.user.login.bind(sohu.user);
	
	/********************************************* History *********************************************/
	
	//	TODO: History临时放到了这个包中，以后还需要放到合适的位置
	if (!sohu.tool) sohu.tool = {}
	sohu.tool.History = {

			/*Public: User-agent booleans*/
			isIE: false,
			isOpera: false,
			isSafari: false,
			isKonquerer: false,
			isGecko: false,
			isSupported: false,
			
			/*Public: Initialize the DHTML history infrastructure*/
			init: function(callback){
				this.create({
					debug:false
				})
				this.setFirstLoad();
				this.addListener(callback);
			},
			
			/*Public: Create the DHTML history infrastructure*/
			create: function(options) {
				
				/*
					options - object to store initialization parameters
					options.debugMode - boolean that causes hidden form fields to be shown for development purposes.
					options.toJSON - function to override default JSON stringifier
					options.fromJSON - function to override default JSON parser
				*/
		
				var that = this;
		
				/*set user-agent flags*/
				var UA = navigator.userAgent.toLowerCase();
				var platform = navigator.platform.toLowerCase();
				var vendor = navigator.vendor || "";
				if (vendor === "KDE") {
					this.isKonqueror = true;
					this.isSupported = false;
				} else if (typeof window.opera !== "undefined") {
					this.isOpera = true;
					this.isSupported = true;
				} else if (typeof document.all !== "undefined") {
					this.isIE = true;
					this.isSupported = true;
				} else if (vendor.indexOf("Apple Computer, Inc.") > -1) {
					this.isSafari = true;
					this.isSupported = (platform.indexOf("mac") > -1);
				} else if (UA.indexOf("gecko") != -1) {
					this.isGecko = true;
					this.isSupported = true;
				}
		
				/*Set up the sohu.tool.History.storage object; pass in init parameters*/
				sohu.tool.History.storage.setup(options);
		
				/*Execute browser-specific setup methods*/
				if (this.isSafari) {
					this.createSafari();
				} else if (this.isOpera) {
					this.createOpera();
				}
				
				/*Get our initial location*/
				var initialHash = this.getCurrentLocation();
		
				/*Save it as our current location*/
				this.currentLocation = initialHash;
		
				/*Now that we have a hash, create IE-specific code*/
				if (this.isIE) {
					this.createIE(initialHash);
				}
		
				/*Add an unload listener for the page; this is needed for FF 1.5+ because this browser caches all dynamic updates to the
				page, which can break some of our logic related to testing whether this is the first instance a page has loaded or whether
				it is being pulled from the cache*/
		
				var unloadHandler = function() {
					that.firstLoad = null;
				};
				
				this.addEventListener(window,'unload',unloadHandler);		
		
				/*Determine if this is our first page load; for IE, we do this in this.iframeLoaded(), which is fired on pageload. We do it
				there because we have no sohu.tool.History.storage at this point, which only exists after the page is finished loading in IE*/
				if (this.isIE) {
					/*The iframe will get loaded on page load, and we want to ignore this fact*/
					this.ignoreLocationChange = true;
				} else {
					if (!sohu.tool.History.storage.hasKey(this.PAGELOADEDSTRING)) {
						/*This is our first page load, so ignore the location change and add our special history entry*/
						this.ignoreLocationChange = true;
						this.firstLoad = true;
						sohu.tool.History.storage.put(this.PAGELOADEDSTRING, true);
					} else {
						/*This isn't our first page load, so indicate that we want to pay attention to this location change*/
						this.ignoreLocationChange = false;
						/*For browsers other than IE, fire a history change event; on IE, the event will be thrown automatically when its
						hidden iframe reloads on page load. Unfortunately, we don't have any listeners yet; indicate that we want to fire
						an event when a listener is added.*/
						this.fireOnNewListener = true;
					}
				}
		
				/*Other browsers can use a location handler that checks at regular intervals as their primary mechanism; we use it for IE as
				well to handle an important edge case; see checkLocation() for details*/
				var locationHandler = function() {
					that.checkLocation();
				};
				setInterval(locationHandler, 100);
			},	
			
			/*Public: Initialize our DHTML history. You must call this after the page is finished loading.*/
			setFirstLoad: function() {
				/*IE needs to be explicitly initialized. IE doesn't autofill form data until the page is finished loading, so we have to wait*/
				if (this.isIE) {
					/*If this is the first time this page has loaded*/
					if (!sohu.tool.History.storage.hasKey(this.PAGELOADEDSTRING)) {
						/*For IE, we do this in initialize(); for other browsers, we do it in create()*/
						this.fireOnNewListener = false;
						this.firstLoad = true;
						sohu.tool.History.storage.put(this.PAGELOADEDSTRING, true);
					}
					/*Else if this is a fake onload event*/
					else {
						this.fireOnNewListener = true;
						this.firstLoad = false;   
					}
				}
			},
			
			/*Public: Adds a history change listener. Note that only one listener is supported at this time.*/
			addListener: function(listener) {
				this.listener = listener;
				/*If the page was just loaded and we should not ignore it, fire an event to our new listener now*/
				if (this.fireOnNewListener) {
					this.fireHistoryEvent(this.currentLocation);
					this.fireOnNewListener = false;
				}
			},
			
			/*Public: Generic utility function for attaching events*/
			addEventListener: function(o,e,l) {
				if (o.addEventListener) {
					o.addEventListener(e,l,false);
				} else if (o.attachEvent) {
					o.attachEvent('on'+e,function() {
						l(window.event);
					});
				}
			},
			
			/*Public: Add a history point.*/
			add: function(newLocation, historyData) {
				
				if (this.isSafari) {
					
					/*Remove any leading hash symbols on newLocation*/
					newLocation = this.removeHash(newLocation);
		
					/*Store the history data into history storage*/
					sohu.tool.History.storage.put(newLocation, historyData);
		
					/*Save this as our current location*/
					this.currentLocation = newLocation;
			
					/*Change the browser location*/
					window.location.hash = newLocation;
				
					/*Save this to the Safari form field*/
					this.putSafariState(newLocation);
		
				} else {
					
					/*Most browsers require that we wait a certain amount of time before changing the location, such
					as 200 MS; rather than forcing external callers to use window.setTimeout to account for this,
					we internally handle it by putting requests in a queue.*/
					var that = this;
					var addImpl = function() {
		
						/*Indicate that the current wait time is now less*/
						if (that.currentWaitTime > 0) {
							that.currentWaitTime = that.currentWaitTime - that.waitTime;
						}
					
						/*Remove any leading hash symbols on newLocation*/
						newLocation = that.removeHash(newLocation);
		
						/*IE has a strange bug; if the newLocation is the same as _any_ preexisting id in the
						document, then the history action gets recorded twice; throw a programmer exception if
						there is an element with this ID*/
						if (document.getElementById(newLocation) && that.debugMode) {
							var e = "Exception: History locations can not have the same value as _any_ IDs that might be in the document,"
							+ " due to a bug in IE; please ask the developer to choose a history location that does not match any HTML"
							+ " IDs in this document. The following ID is already taken and cannot be a location: " + newLocation;
							throw new Error(e); 
						}
		
						/*Store the history data into history storage*/
						sohu.tool.History.storage.put(newLocation, historyData);
		
						/*Indicate to the browser to ignore this upcomming location change since we're making it programmatically*/
						that.ignoreLocationChange = true;
		
						/*Indicate to IE that this is an atomic location change block*/
						that.ieAtomicLocationChange = true;
		
						/*Save this as our current location*/
						that.currentLocation = newLocation;
				
						/*Change the browser location*/
						window.location.hash = newLocation;
		
						/*Change the hidden iframe's location if on IE*/
						if (that.isIE) {
							that.iframe.src = "/blank.html?" + newLocation;
						}
		
						/*End of atomic location change block for IE*/
						that.ieAtomicLocationChange = false;
					};
		
					/*Now queue up this add request*/
					window.setTimeout(addImpl, this.currentWaitTime);
		
					/*Indicate that the next request will have to wait for awhile*/
					this.currentWaitTime = this.currentWaitTime + this.waitTime;
				}
			},
		
			/*Public*/
			isFirstLoad: function() {
				return this.firstLoad;
			},
		
			/*Public*/
			getVersion: function() {
				return "0.6";
			},
		
			/*Get browser's current hash location; for Safari, read value from a hidden form field*/
		
			/*Public*/
			getCurrentLocation: function() {
				var r = (this.isSafari
					? this.getSafariState()
					: this.getCurrentHash()
				);
				return r;
			},
			
			/*Public: Manually parse the current url for a hash; tip of the hat to YUI*/
		    getCurrentHash: function() {
				var r = window.location.href;
				var i = r.indexOf("#");
				return (i >= 0
					? r.substr(i+1)
					: ""
				);
		    },
			
			/*- - - - - - - - - - - -*/
			
			/*Private: Constant for our own internal history event called when the page is loaded*/
			PAGELOADEDSTRING: "DhtmlHistory_pageLoaded",
			
			/*Private: Our history change listener.*/
			listener: null,
		
			/*Private: MS to wait between add requests - will be reset for certain browsers*/
			waitTime: 200,
			
			/*Private: MS before an add request can execute*/
			currentWaitTime: 0,
		
			/*Private: Our current hash location, without the "#" symbol.*/
			currentLocation: null,
		
			/*Private: Hidden iframe used to IE to detect history changes*/
			iframe: null,
		
			/*Private: Flags and DOM references used only by Safari*/
			safariHistoryStartPoint: null,
			safariStack: null,
			safariLength: null,
		
			/*Private: Flag used to keep checkLocation() from doing anything when it discovers location changes we've made ourselves
			programmatically with the add() method. Basically, add() sets this to true. When checkLocation() discovers it's true,
			it refrains from firing our listener, then resets the flag to false for next cycle. That way, our listener only gets fired on
			history change events triggered by the user via back/forward buttons and manual hash changes. This flag also helps us set up
			IE's special iframe-based method of handling history changes.*/
			ignoreLocationChange: null,
		
			/*Private: A flag that indicates that we should fire a history change event when we are ready, img.e. after we are initialized and
			we have a history change listener. This is needed due to an edge case in browsers other than IE; if you leave a page entirely
			then return, we must fire this as a history change event. Unfortunately, we have lost all references to listeners from earlier,
			because JavaScript clears out.*/
			fireOnNewListener: null,
		
			/*Private: A variable that indicates whether this is the first time this page has been loaded. If you go to a web page, leave it
			for another one, and then return, the page's onload listener fires again. We need a way to differentiate between the first page
			load and subsequent ones. This variable works hand in hand with the pageLoaded variable we store into sohu.tool.History.storage.*/
			firstLoad: null,
		
			/*Private: A variable to handle an important edge case in IE. In IE, if a user manually types an address into their browser's
			location bar, we must intercept this by calling checkLocation() at regular intervals. However, if we are programmatically
			changing the location bar ourselves using the add() method, we need to ignore these changes in checkLocation(). Unfortunately,
			these changes take several lines of code to complete, so for the duration of those lines of code, we set this variable to true.
			That signals to checkLocation() to ignore the change-in-progress. Once we're done with our chunk of location-change code in
			add(), we set this back to false. We'll do the same thing when capturing user-entered address changes in checkLocation itself.*/
			ieAtomicLocationChange: null,
			
			/*Private: Create IE-specific DOM nodes and overrides*/
			createIE: function(initialHash) {
				/*write out a hidden iframe for IE and set the amount of time to wait between add() requests*/
				this.waitTime = 400;/*IE needs longer between history updates*/
				var styles = (sohu.tool.History.storage.debugMode
					? 'width: 800px;height:80px;border:1px solid black;'
					: sohu.tool.History.storage.hideStyles
				);
				var iframeID = "rshHistoryFrame",
					iframeHTML = '<iframe frameborder="0" id="' + iframeID + '" style="' + styles + '" src="/blank.html?' + initialHash + '"></iframe>',
					iframeContainer = document.createElement('div');
				iframeContainer.innerHTML = iframeHTML;
				document.body.appendChild(iframeContainer);
				//document.write(iframeHTML);
				this.iframe = document.getElementById(iframeID);
			},
			
			/*Private: Create Opera-specific DOM nodes and overrides*/
			createOpera: function() {
				this.waitTime = 400;/*Opera needs longer between history updates*/
				var imgHTML = '<img src="javascript:location.href=\'javascript:dhtmlHistory.checkLocation();\';" style="' + sohu.tool.History.storage.hideStyles + '" />',
					imgContainer = document.createElement('div');
				imgContainer.innerHTML = imgHTML;
				document.body.appendChild(imgContainer);
				//document.write(imgHTML);
			},
			
			/*Private: Create Safari-specific DOM nodes and overrides*/
			createSafari: function() {
				var formID = "rshSafariForm";
				var stackID = "rshSafariStack";
				var lengthID = "rshSafariLength";
				var formStyles = sohu.tool.History.storage.debugMode ? sohu.tool.History.storage.showStyles : sohu.tool.History.storage.hideStyles;
				var inputStyles = (sohu.tool.History.storage.debugMode
					? 'width:800px;height:20px;border:1px solid black;margin:0;padding:0;'
					: sohu.tool.History.storage.hideStyles
				);
				var safariHTML = '<form id="' + formID + '" style="' + formStyles + '">'
					+ '<input type="text" style="' + inputStyles + '" id="' + stackID + '" value="[]"/>'
					+ '<input type="text" style="' + inputStyles + '" id="' + lengthID + '" value=""/>'
				+ '</form>';
				var formContainer = document.createElement('div');
				formContainer.innerHTML = safariHTML;
				document.body.appendChild(formContainer);
				this.safariStack = document.getElementById(stackID);
				this.safariLength = document.getElementById(lengthID);
				if (!sohu.tool.History.storage.hasKey(this.PAGELOADEDSTRING)) {
					this.safariHistoryStartPoint = history.length;
					this.safariLength.value = this.safariHistoryStartPoint;
				} else {
					this.safariHistoryStartPoint = this.safariLength.value;
				}
			},
			
			/*Private: Safari method to read the history stack from a hidden form field*/
			getSafariStack: function() {
				var r = this.safariStack.value;
				return sohu.tool.History.storage.fromJSON(r);
			},
		
			/*Private: Safari method to read from the history stack*/
			getSafariState: function() {
				var stack = this.getSafariStack();
				var state = stack[history.length - this.safariHistoryStartPoint - 1];
				return state;
			},			
			/*Private: Safari method to write the history stack to a hidden form field*/
			putSafariState: function(newLocation) {
			    var stack = this.getSafariStack();
			    stack[history.length - this.safariHistoryStartPoint] = newLocation;
			    this.safariStack.value = sohu.tool.History.storage.toJSON(stack);
			},
		
			/*Private: Notify the listener of new history changes.*/
			fireHistoryEvent: function(newHash) {
				/*extract the value from our history storage for this hash*/
				var historyData = sohu.tool.History.storage.get(newHash);
				/*call our listener*/
				this.listener(newHash, historyData);
			},
			
			/*Private: See if the browser has changed location. This is the primary history mechanism for Firefox. For IE, we use this to
			handle an important edge case: if a user manually types in a new hash value into their IE location bar and press enter, we want to
			to intercept this and notify any history listener.*/
			checkLocation: function() {
				
				/*Ignore any location changes that we made ourselves for browsers other than IE*/
				if (!this.isIE && this.ignoreLocationChange) {
					this.ignoreLocationChange = false;
					return;
				}
		
				/*If we are dealing with IE and we are in the middle of making a location change from an iframe, ignore it*/
				if (!this.isIE && this.ieAtomicLocationChange) {
					return;
				}
				
				/*Get hash location*/
				var hash = this.getCurrentLocation();
		
				/*Do nothing if there's been no change*/
				if (hash == this.currentLocation) {
					return;
				}
		
				/*In IE, users manually entering locations into the browser; we do this by comparing the browser's location against the
				iframe's location; if they differ, we are dealing with a manual event and need to place it inside our history, otherwise
				we can return*/
				this.ieAtomicLocationChange = true;
		
				if (this.isIE && this.getIframeHash() != hash) {
					this.iframe.src = "/blank.html?" + hash;
				}
				else if (this.isIE) {
					/*the iframe is unchanged*/
					return;
				}
		
				/*Save this new location*/
				this.currentLocation = hash;
		
				this.ieAtomicLocationChange = false;
		
				/*Notify listeners of the change*/
				this.fireHistoryEvent(hash);
			},
		
			/*Private: Get the current location of IE's hidden iframe.*/
			getIframeHash: function() {
				var doc = this.iframe.contentWindow.document;
				var hash = String(doc.location.search);
				if (hash.length == 1 && hash.charAt(0) == "?") {
					hash = "";
				}
				else if (hash.length >= 2 && hash.charAt(0) == "?") {
					hash = hash.substring(1);
				}
				return hash;
			},
		
			/*Private: Remove any leading hash that might be on a location.*/
			removeHash: function(hashValue) {
				var r;
				if (hashValue === null || hashValue === undefined) {
					r = null;
				}
				else if (hashValue === "") {
					r = "";
				}
				else if (hashValue.length == 1 && hashValue.charAt(0) == "#") {
					r = "";
				}
				else if (hashValue.length > 1 && hashValue.charAt(0) == "#") {
					r = hashValue.substring(1);
				}
				else {
					r = hashValue;
				}
				return r;
			},
		
			/*Private: For IE, tell when the hidden iframe has finished loading.*/
			iframeLoaded: function(newLocation) {
				/*ignore any location changes that we made ourselves*/
				if (this.ignoreLocationChange) {
					this.ignoreLocationChange = false;
					return;
				}
		
				/*Get the new location*/
				var hash = String(newLocation.search);
				if (hash.length == 1 && hash.charAt(0) == "?") {
					hash = "";
				}
				else if (hash.length >= 2 && hash.charAt(0) == "?") {
					hash = hash.substring(1);
				}
				/*Keep the browser location bar in sync with the iframe hash*/
				window.location.hash = hash;
		
				/*Notify listeners of the change*/
				this.fireHistoryEvent(hash);
			}
		
		};
		
		/*
			sohu.tool.History.storage: An object that uses a hidden form to store history state across page loads. The mechanism for doing so relies on
			the fact that browsers save the text in form data for the life of the browser session, which means the text is still there when
			the user navigates back to the page. This object can be used independently of the dhtmlHistory object for caching of Ajax
			session information.
			
			dependencies: 
				* json2007.js (included in a separate file) or alternate JSON methods passed in through an options bundle.
		*/
		sohu.tool.History.storage = {
			
			/*Public: Set up our sohu.tool.History.storage object for use by dhtmlHistory or other objects*/
			setup: function(options) {
				
				/*
					options - object to store initialization parameters - passed in from dhtmlHistory or directly into sohu.tool.History.storage
					options.debugMode - boolean that causes hidden form fields to be shown for development purposes.
					options.toJSON - function to override default JSON stringifier
					options.fromJSON - function to override default JSON parser
				*/
				
				/*process init parameters*/
				if (typeof options !== "undefined") {
					if (options.debugMode) {
						this.debugMode = options.debugMode;
					}
					/*
					if (options.toJSON) {
						this.toJSON = options.toJSON;
					}
					if (options.fromJSON) {
						this.fromJSON = options.fromJSON;
					}
					*/
				}		
				
				/*write a hidden form and textarea into the page; we'll stow our history stack here*/
				var formID = "rshStorageForm";
				var textareaID = "rshStorageField";
				var formStyles = this.debugMode ? sohu.tool.History.storage.showStyles : sohu.tool.History.storage.hideStyles;
				var textareaStyles = (sohu.tool.History.storage.debugMode
					? 'width: 800px;height:80px;border:1px solid black;'
					: sohu.tool.History.storage.hideStyles
				);
				var textareaHTML = '<form id="' + formID + '" style="' + formStyles + '">'
					+ '<textarea id="' + textareaID + '" style="' + textareaStyles + '"></textarea>'
				+ '</form>';
				var formContainer = document.createElement('div');
				formContainer.innerHTML = textareaHTML;
				document.body.appendChild(formContainer);
				//document.write(textareaHTML);
				this.storageField = document.getElementById(textareaID);
				if (typeof window.opera !== "undefined") {
					this.storageField.focus();/*Opera needs to focus this element before persisting values in it*/
				}
			},
			
			/*Public*/
			put: function(key, value) {
				this.assertValidKey(key);
				/*if we already have a value for this, remove the value before adding the new one*/
				if (this.hasKey(key)) {
					this.remove(key);
				}
				/*store this new key*/
				this.storageHash[key] = value;
				/*save and serialize the hashtable into the form*/
				this.saveHashTable();
			},
		
			/*Public*/
			get: function(key) {
				this.assertValidKey(key);
				/*make sure the hash table has been loaded from the form*/
				this.loadHashTable();
				var value = this.storageHash[key];
				if (value === undefined) {
					value = null;
				}
				return value;
			},
		
			/*Public*/
			remove: function(key) {
				this.assertValidKey(key);
				/*make sure the hash table has been loaded from the form*/
				this.loadHashTable();
				/*delete the value*/
				delete this.storageHash[key];
				/*serialize and save the hash table into the form*/
				this.saveHashTable();
			},
		
			/*Public: Clears out all saved data.*/
			reset: function() {
				this.storageField.value = "";
				this.storageHash = {};
			},
		
			/*Public*/
			hasKey: function(key) {
				this.assertValidKey(key);
				/*make sure the hash table has been loaded from the form*/
				this.loadHashTable();
				return (typeof this.storageHash[key] !== "undefined");
			},
		
			/*Public*/
			isValidKey: function(key) {
				return (typeof key === "string");
			},
			
			/*Public - CSS strings utilized by both objects to hide or show behind-the-scenes DOM elements*/
			showStyles: 'border:0;margin:0;padding:0;',
			hideStyles: 'left:-1000px;top:-1000px;width:1px;height:1px;border:0;position:absolute;',
			
			/*Public - debug mode flag*/
			debugMode: false,
			
			/*- - - - - - - - - - - -*/
		
			/*Private: Our hash of key name/values.*/
			storageHash: {},
		
			/*Private: If true, we have loaded our hash table out of the storage form.*/
			hashLoaded: false, 
		
			/*Private: DOM reference to our history field*/
			storageField: null,
		
			/*Private: Assert that a key is valid; throw an exception if it not.*/
			assertValidKey: function(key) {
				var isValid = this.isValidKey(key);
				if (!isValid && this.debugMode) {
					throw new Error("Please provide a valid key for sohu.tool.History.storage. Invalid key = " + key + ".");
				}
			},
		
			/*Private: Load the hash table up from the form.*/
			loadHashTable: function() {
				if (!this.hashLoaded) {	
					var serializedHashTable = this.storageField.value;
					if (serializedHashTable !== "" && serializedHashTable !== null) {
						this.storageHash = this.fromJSON(serializedHashTable);
						this.hashLoaded = true;
					}
				}
			},
			/*Private: Save the hash table into the form.*/
			saveHashTable: function() {
				this.loadHashTable();
				var serializedHashTable = this.toJSON(this.storageHash);
				this.storageField.value = serializedHashTable;
			},
			
			/*Private: Bridges for our JSON implementations - both rely on 2007 JSON.org library - can be overridden by options bundle*/
			toJSON: function(o) {
				return o.toString();//.toJSONString();
			},
			
			fromJSON: function(s) {
				return s;//.parseJSON();
			}
		};
	
	/********************************************* View *********************************************/
	//=====================SNS 自动绘制视图类=======================
	
	 /**
	 * @description  SNS 自动绘制所请求的视图工具类实现
	 * @author  springwang@sohu-inc.com
	 * @version  0.1
	 * @requires sohu.tool.History	packages
	 */
	
	PACK.View = {
		/**
		 * 初始化自动切换视图对象
		 */
		init: function(){
			this._initEvents();
			this._initHistory();
			this._firstLoad();
		},
		
		/**
		 * 切换视图
		 */
		switchView: function(href,options){
			this._startLoading();
			this._setProperties(href);
			this._setOptions(options);
			if(this._isInAppInner()){
				// 切换视图之前的回调方法
				if(this._switchBefore()){
					this._requestView(href); // 同一App内部的处理方式
				}
			} else{	// 不同system App时，刷新页面
				window.location.href = this._sourceUrl;
			}
		},
		
		/**
		 * 设置历史
		 */
		setHistory: function(href){
			sohu.tool.History.add(href,'');
		},
		
		/**
		 * 设置相关属性
		 * params {string} href 视图URL地址
		 */
		_setProperties: function(href){
			// 获取形如 /app/blog/list/index.do?params 的视图地址
			href = this._getAbsoluteUrl(href);
			// app 名称
			this._appName = this._getAppName(href);
			// app的canvas标签对象
			this._appCanvas = this._getAppCanvas(this._appName);
			// 此视图URL对应的接口URL
			this._intUrl = this._assembleIntUrl(href);
			// 此视图的层级模式
			this._viewMode = this._getViewMode(href);
			// 保存当前的视图URL
			this._sourceUrl = href;
		},
		
		/**
		 * 设置配置参数
		 */
		_setOptions: function(options){
			this._options = Object.extend({
				bfCallback: function(){ return true; },
				afCallback: function(){ return true; },
				erCallback: function(){ return true; }
			},options || {});
		},
		/**
		 * 视图切换之前的处理方法
		 */
		_switchBefore: function(){
			return this._options.bfCallback();
		},
		
		/**
		 * 视图切换之后的处理方法
		 */
		_switchAfter: function(){
			if(this._options.afCallback()){
				this.setHistory(this._sourceUrl);
			}
		},
		/**
		 * 切换视图发生错误的处理方法
		 */
		_switchError: function(rsp){
			if(this._options.erCallback(rsp)){
				this.setHistory(this._sourceUrl);
				this._showError(rsp);
			}
			this._endLoading();
		},
		
		//FIXME 获取当前app的名称,这里只针对system app的方式，如果将来base app需要使用这种方式，需要扩展这个方法
		_getAppName: function(url){
			return url.replace(PACK.View.domain,'').split('/')[2];
		},
		
		//FIXME 获取当前app的画布对象,这里只针对system app的方式，如果将来base app需要使用这种方式，需要扩展这个方法
		//这里的system app画布有一定的规则，app-appName的形式，如日志就是app-blog,相册就是app-album
		_getAppCanvas: function(appName){
			return $('#app-' + appName);
		},
		
		/**
		 * 绑定事件
		 */
		_initEvents: function(){
			//$(window).on('load',this._firstLoad.bind(this))
			// 给body绑定click事件，目的是统一捕获A标签的Click事件
			$(document.body).on('click',this._onBodyClick.bindEvent(this));
		},
		
		/**
		 * 初始化历史处理对象
		 */
		_initHistory: function(){
			sohu.tool.History.init(this._historyChange.bind(this));
		},
		
		/**
		 * 第一次加载页面
		 */
		_firstLoad: function(){
			var location = this._getAbsoluteUrl(window.location.href);
			// 只有app才使用这种方式
			if(location != null){
				this.switchView(location);
				this._reqAppPack(location);
			}
		},
		
		/**
		 * 鼠标点击触发，分析是否点击的是A标签
		 */
		_onBodyClick: function(e){
			var el = kola.Event.element(e).upWithMe('a');
			if(el){
				// IE 会自动给[/index.do]绝对地址加上域名 [http://sns.sohu.com]
				var href = this._getAbsoluteUrl(el.attr('href'));
				if(href == null || href =='' || href == '#' || href.indexOf('javascript:void(0)') != -1){
					return true; // 这里不能return false 不然IE 事件不冒泡了
				} else{
					kola.Event.stop(e);
					this.switchView(href);
				}
			}
		},
		
		/**
		 * 获取一个不带域名的绝对地址
		 * 如：/app/blog/list/index.do?params
		 */
		_getAbsoluteUrl: function(url){
			// 处理href直接是#的情况
			if(url == '#'){
				return null;
			}
			// 地址不包含app的直接返回
			if(url.indexOf('/app/') == -1){
				return null;
			} 
			// 处理href为/app/blog/#
			if(url.lastIndexOf('#') == (url.length -1)){
					url = url.slice(0,(url.length-1)); 
			}
			// 处理href为/app/blog/#/app/blog/list/tag.do
			if(url.indexOf('#') != -1){
				url = url.split('#')[1];
			}
			// 处理url不包含.do的情况，这里主要处理首页的情况
			if(url.indexOf('.do') == -1){
				// 处理href 为 /app/blog 的情况，自动补全后面的 /
				if(url.lastIndexOf('/') != (url.length -1)){
					url += '/'; 
				}
			}
			url = url.replace(PACK.View.domain,'').toLowerCase();
			return url;
		},
		
		//FIXME 加载当前app引用的JS包文件,默认是加载sohu.<appName>.core.js 包如果将来base app需要使用这种方式，可能需要扩展这个方法
		_reqAppPack: function(url){
			var pack = 'sohu.' + this._getAppName(url) + '.*';
			$req(pack);
		},
		
		/**
		 * 获取当前需要请求的view_mode
		 */
		_getViewMode: function(target){
			var source = typeof(this._sourceUrl) == 'undefined' ? '':this._sourceUrl,
				s_nodes = source.split('/'),
				t_nodes = target.split('/'),
				arr = [];
			
			for(var i= 0,len = t_nodes.length; i< len; i++){
				if(t_nodes[i] != s_nodes[i]){
					for(var j = i; j< len; j++){
						if(j == (len - 1)){
							arr.push(t_nodes[j].split('.')[0]);
						} else{
							arr.push(t_nodes[j]);
						}
					}
					break;
				}
			}
			return arr.join('_');
		},
		
		/**
		 * 判断是否在同一个APP之内
		 */
		_isInAppInner: function(){
			if(this._appCanvas) return true;
			else return false;
		},
		
		/**
		 * 获取视图
		 */
		_requestView: function(){
			var viewMdl = this._createModel(this._intUrl);
			
			viewMdl.show({'_view_mode':this._viewMode},{
					success:this._manageView.bind(this),
					failure:this._switchError.bind(this)
			});
		},
		
		/**
		 * 进行视图管理，包括执行前置任务和后置任务，显示视图等
		 */
		_manageView: function(data){
			//this._delLastLoad();
			this._bootload(data.bootload);
			this._showView(data.view);
			this._onload(data.onload);
			this._endLoading();
			this._switchAfter();
		},
		/**
		 * 移除上一视图动态加载的JS和CSS
		 */
		_delLastLoad: function(){
			try{
				var jsTags = $('head [name=loadByJs]');
				if(jsTags) jsTags.remove();
			} catch(e){}
		},
		
		/**
		 * 执行前置任务，加载必须的JS和CSS文件和相关的片段
		 */
		_bootload: function(list){
			this._load(list);
		},
		
		/**
		 * 显示视图
		 */
		_showView: function(view){
			this._appCanvas.html(view);
		},
		
		/**
		 * 执行前置任务，加载必须的JS和CSS文件和相关的片段
		 */
		_onload: function(list){
			//	TODO: 把内容放到了下一个执行队列中
			this._load.bind(this, list).timeout(0);
		},
		
		/**
		 * 加载需要的文件和执行片段
		 */
		 _load: function(list){
		 	if(typeof(list) == 'object'){
			 	for(var i= 0 ; i<list.length ; i++){
			 		var it = list[i];
			 		if(it.type == 'javascript'){
			 			if(typeof(it.src) == 'string' && it.src != ''){
			 				if(!this.Cache.get(it.src)){
			 					this._loadJs(it.src);
			 					this.Cache.set(it.src,true)
			 				}
			 			}
			 			if(typeof(it.text) == 'string' && it.text != ''){
			 				this._evalJs(it.text);
			 			}
			 		} else if(it.type == 'css' ){
			 			if(typeof(it.src) == 'string' && it.src != ''){
			 				if(!this.Cache.get(it.src)){
			 					this._loadCss(it.src);
			 					this.Cache.set(it.src,true)
			 				}
			 			}
			 			if(typeof(it.text) == 'string' && it.text != ''){
		     	 				this._evalCss(it.text);
			 			}
			 		}
			 	}
		 	}
		 },
		 
		 /**
		  * 加载 javascript 文件
		  */
		 _loadJs: function(jsSrc){
		 	var script = kola.Element.create('script');
			
		 	script.attr('name','loadByJs').attr('type','text/javascript').attr('src',jsSrc);
			$('head').append(script);
		 },
		 
		 /**
		  * 执行 javascript 片段
		  */
		 _evalJs: function(jsText){
		 	eval(jsText.unescapeHTML());
		 },
		 
		  /**
		  * 加载 css 文件
		  */
		 _loadCss: function(cssSrc){
		 	var link = kola.Element.create('link');
			
		 	link.attr('name','loadByJs').attr('rel','stylesheet').attr('type','text/css').attr('href',cssSrc);
			$('head').append(link);
		 },
		 
		 /**
		  * 执行 css 片段
		  */
		 _evalCss: function(cssText){
		 	var style = kola.Element.create('style');
			
		 	style.attr('name','loadByJs').attr('type','text/css');
			if(style.prop('styleSheet')){
				style.prop('styleSheet').cssText = cssText; // 这种是IE可用
			} else{
				style.append(document.createTextNode(cssText)); // 这种是其它浏览器可用
			}
			$('head').append(style);
		 },
		 
		/**
		 * 显示错误
		 */
		_showError: function(rsp){
			if(rsp && rsp.data && rsp.data.view){
				this._showView(rsp.data.view);
			} else{
				$call(function(){
					sohu.ctrl.Dialog.alert('页面提示','暂时无法打开当前页面，请稍后重试');
				},'sohu.ctrl.Dialog');
			}
		},
		
		/**
		 * 创建数据处理模型
		 */
		_createModel: function(intUrl){
			return new sohu.core.Model({
				actions: {
					show: {
						url:	intUrl,
						method:	'get',
						format:	'json'
					}
				},
				url:	''
			});
		},
		
		/**
		 * 配置接口地址
		 */
		_assembleIntUrl: function(href){
			var url = '/a'+ href;
			return url;
		},
		
		/**
		 * 历史改变事件处理方法
		 */
		_historyChange: function(locHash){
			this.switchView(locHash);
		},
		
		/**
		 * 开始加载视图，设置鼠标为loading状态
		 */
		_startLoading: function(){
			$(document.body).addClass('cursor-wait');
		},
		
		/**
		 * 完成加载视图，恢复鼠标为默认状态
		 */
		_endLoading: function(){
			$(document.body).removeClass('cursor-wait');
		}
	};
	PACK.View.toView = PACK.View.switchView;
	
	// 系统主域
	PACK.View.domain = 'http://sns.sohu.com';
	
	// 缓存信息，先主要用于缓存那些js和css已经加载过
	PACK.View.Cache = {
		// 缓存数据
		data:{},
		
		// 设置缓存
		set: function(key,value){
			this.data[key] = value;
		},
		
		// 获取缓存
		get: function(key){
			return this.data[key];
		}
	};
	
	/********************************************* appSettingMdl *********************************************/
	
	PACK.appSettingMdl = new sohu.core.Model({
		
		actions: {
			
			getConfig: {
				url:		'/getconfig.do',
				params:		['id'],
				method: 	'get',
				format: 	'json',
				type:		'custom'
			},
			setConfig: {
				url:		'/setconfig.do',
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			uninstall: {
				url:		'/uninstall.do',
				params:		['id'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			setOrder: {
				url:		'/setorder.do',
				params:		['orderlist'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			list: {
				url:		'/list.do',
				params:		['start', 'size'],
				method: 	'get',
				format: 	'json',
				type:		'list'
			}
			
		},
		
		url:				'/a/apps/setting'
	});

	/********************************************* AppBarWgt *********************************************/
	PACK.AppBarWgt = {
		init: function(options) {
			this._barEl = $(options.barEl);
			this._ctrEl = $(options.ctrEl);
			this._toggleEl = $(options.toggleEl);
			
			this._max = false;
			this._isShowAll = false;
			
			this._toggleEl.on('click', this._toggle.bind(this));
			
			this.refresh(true);
		},
		
		refresh: function(noCache) {
			var size = this._getSize();
			if (!noCache && this._data && size <= this._data.length) {
				this._fill();
			} else {
				this._listReq();
			}
		},
		
		_toggle: function() {
			if (this._max) {
				//	变小
				var nexts = this._ctrEl.first().nextAll();
				if (nexts) nexts.remove();
				this._barEl.attr('class', 'appbar-thin');
			} else {
				//	变大
				this._isShowAll = true;
				this._listReq();
			}
			
			this._max = !this._max;
			kola.Event.stop(e);
		},
		
		_fill: function() {
			this._isShowAll = false;
			if (!this._max) {
				this._barEl.attr('class', 'appbar-full');
			}
			var size = this._getSize(),
				count = this._isShowAll ? this._data.length : Math.min(size, this._data.size),
				arr = [];
			this._data.each(function(app, i) {
				if (i%size == 0) arr.push('<ul class="appList">');
				
				arr.push('<li><a href="' + app.url + '"><img src="' + app.icon + '" /><span>' + app.name + '</span></a></li>');
				
				if ((i+1)%size == 0) {
					arr.push('</ul>');
				}
				if (i == count - 1) throw $break;
			});
			this._ctrEl.html(arr.join(''));
		},
		
		_listReq: function() {
			sohu.appSettingMdl.list(this._isShowAll ? null : {
				start: 0,
				size: this._getSize()
			}, {
				success: this._listSuccess.bind(this),
				failure: function() {}
			});
		},
		_listSuccess: function(data) {
			this._data = data.list;
			this._fill();
		},
		
		_getSize: function() {
			//	还需要设定
			return 10;
		}
	}

	/********************************************* FW *********************************************/
	
	PACK.init = function() {
		sohu.AppBarWgt.init({
			barEl: '#appbar',
			ctrEl: '#appbarList',
			toggleEl: '#appbarToggle'
		});
	}
		
});