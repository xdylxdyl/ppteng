/**
 * Created with JetBrains WebStorm. User: Administrator Date: 13-6-7 Time:
 * 上午10:08 To change this template use File | Settings | File Templates.
 */

var webSocketUtil = {
	_ws : "",

	connect : function(uid) {

		var l = document.location.toString();
		var index = l.indexOf("com");
		var location = "ws://42.121.113.70:8013/servlet/websocket?uid=" + uid;
		if (index > 0) {

		} else {
			 location = "ws://192.168.11.68:9090/servlet/websocket?uid=" + uid;
		}
		console.log(location);

		webSocketUtil._ws = new WebSocket(location);
		console.log(webSocketUtil._ws.readyState);
		webSocketUtil._ws.onopen = webSocketUtil._onopen;
		webSocketUtil._ws.onmessage = webSocketUtil._onmessage;
		webSocketUtil._ws.onclose = webSocketUtil._onclose;
	},

	_onopen : function() {
		webSocketUtil._ws.send('i am open ~~,are you ready ?');
	},

	_send : function(message) {
		if (webSocketUtil._ws)
			webSocketUtil._ws.send(message);
	},

	send : function(text) {
		if (text != null && text.length > 0)
			webSocketUtil._ws._send(text);
	},

	_onmessage : function(m) {
		if (m.data) {

			if (isJson(m.data)) {
				console.log(m.data);
				var message = JSON.parse(m.data);
				$(document).queue("messages",
						cometService.parseMessage(message.message));

			} else {
				console.log(m.data);
			}

		}
	},
	_onclose : function(m) {
		webSocketUtil._ws = null;
	},
	isConnect:function(){	
		if(webSocketUtil._ws==null||webSocketUtil._ws.readyState==3){
			return false;
		}else{
			return true;
		}
	}

}

function isJson(content) {
	if (content.match("^\{(.+:.+,*){1,}\}$")) {
		return true;
	} else {
		return false;
	}
}
