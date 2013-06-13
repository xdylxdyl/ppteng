/**
 * Created with JetBrains WebStorm. User: Administrator Date: 13-6-7 Time:
 * 上午10:08 To change this template use File | Settings | File Templates.
 */

var webSocketUtil = {
    _ws:"",
    uid:null,
    retryCount:0,
    retryLimit:3,

    connect:function (uid) {
        webSocketUtil.uid = uid;
        var l = document.location.toString();
        var index = l.indexOf("com");
        var location = "ws://42.121.113.70:8013/servlet/websocket?uid=" + uid;
        if (index > 0) {

        } else {
            location = "ws://192.168.11.68:9090/servlet/websocket?uid=" + uid;
        }
        console.log(" this will be error,upgrade version work? test again? " + location);


        webSocketUtil._ws = new WebSocket(location);
        console.log(webSocketUtil._ws.readyState);
        webSocketUtil._ws.onopen = webSocketUtil._onopen;
        webSocketUtil._ws.onmessage = webSocketUtil._onmessage;
        webSocketUtil._ws.onclose = webSocketUtil._onclose;
        webSocketUtil._ws.onerror = webSocketUtil._onerror;


    },

    _onopen:function () {
        webSocketUtil._ws.send('i am open ~~,are you ready ?');
        webSocketUtil.retryCount = 0;
        webSocketUtil.check();

    },

    _send:function (message) {
        if (webSocketUtil._ws)
            webSocketUtil._ws.send(message);
    },

    send:function (text) {
        if (text != null && text.length > 0)
            webSocketUtil._ws._send(text);
    },

    retry:function () {
        console.log("retry count is " + webSocketUtil.retryCount);
        if (webSocketUtil.retryCount > webSocketUtil.retryLimit) {

        } else {
            webSocketUtil.retryCount = webSocketUtil.retryCount + 1;
            webSocketUtil.connect(webSocketUtil.uid);


        }
    },

    _onmessage:function (m) {
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
    _onclose:function (m) {
        console.log("connection close .reopen it ");
        $("#netSpeedHint").text("断线中..正重连");
        webSocketUtil.retry();
    },
    _onerror:function (m) {

        console.log("connection close cause something wrong?.reopen it ");
        $("#netSpeedHint").text("断线中..正重连");
        webSocketUtil.retry();
    },
    isConnect:function () {
        if (webSocketUtil._ws == null || webSocketUtil._ws.readyState == 3) {
            return false;
        } else {
            return true;
        }
    },
    check:function () {
        setInterval(function () {
            if (!webSocketUtil._ws || webSocketUtil._ws.readyState != 1) {
                console.log("reconnect");

                webSocketUtil.connect(webSocketUtil.uid);
            } else {
                console.log("normal");
            }
        }, 5000);
    }

}

function isJson(content) {
    if (content.match("^\{(.+:.+,*){1,}\}$")) {
        return true;
    } else {
        return false;
    }
}


