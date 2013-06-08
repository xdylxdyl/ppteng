/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-7
 * Time: 上午10:08
 * To change this template use File | Settings | File Templates.
 */

var webSocketUtil = {
    _ws:"",

    connect:function (uid) {

        var l = document.location.toString();
        var location = l.substr(0, l.indexOf("9090")).replace('http://', 'ws://').replace('https://', 'wss://') + '9090/servlet/websocket?uid=' + uid;

        webSocketUtil._ws = new WebSocket(location);

        webSocketUtil._ws.onopen = webSocketUtil._onopen;
        webSocketUtil._ws.onmessage = webSocketUtil._onmessage;
        webSocketUtil._ws.onclose = webSocketUtil._onclose;
    },

    _onopen:function () {
        webSocketUtil._ws.send('i am open ~~,are you ready ?');
    },

    _send:function (message) {
        if (webSocketUtil._ws)
            webSocketUtil._ws.send(message);
    },

    send:function (text) {
        if (text != null && text.length > 0)
            webSocketUtil._ws._send(text);
    },

    _onmessage:function (m) {
        if (m.data) {

            if (isJson(m.data)) {
            	  console.log(m.data);
            	  var message=JSON.parse(m.data);
                $(document).queue("messages", cometService.parseMessage(message.message));

            } else {
                console.log(m.data);
            }

        }
    },
    _onclose:function (m) {
        webSocketUtil._ws = null;
    }

}

function isJson(content){
    if(content.match("^\{(.+:.+,*){1,}\}$")){
        return true;
    }else{
        return false;
    }
}
