/**
 * Created with JetBrains WebStorm. User: Administrator Date: 13-6-7 Time:
 * 上午10:08 To change this template use File | Settings | File Templates.
 */


var checkWebSocket = function () {

    if (!webSocketUtil._ws || webSocketUtil._ws.readyState != 1) {
        console.log("reconnect");

        webSocketUtil.connect(webSocketUtil.uid);
    } else {
        console.log("normal");
    }
};

var checkID = null;

var webSocketUtil = {
    _ws:"",
    uid:null,
    retryCount:0,
    retryLimit:3,
    version:0,

    connect:function (uid) {

        if ("WebSocket" in window) {
            webSocketUtil.uid = uid;
            var l = document.location.toString();
            var index = l.indexOf("com");
            var location = "ws://42.121.113.70:8013/servlet/websocket?uid=" + uid;
            if (index > 0) {

            } else {
                location = "ws://192.168.11.68:9090/servlet/websocket?uid=" + uid;
            }
            console.log(" this will create websocket ? " + location);


            webSocketUtil._ws = new WebSocket(location);
            console.log(webSocketUtil._ws.readyState);
            webSocketUtil._ws.onopen = webSocketUtil._onopen;
            webSocketUtil._ws.onmessage = webSocketUtil._onmessage;
            webSocketUtil._ws.onclose = webSocketUtil._onclose;
            webSocketUtil._ws.onerror = webSocketUtil._onerror;
        } else {
            alert("不支持的浏览器~,请使用Chrome/Firefox/搜狗/360极速");


        }


    },

    _onopen:function () {
        clearInterval(checkID);
        webSocketUtil.retryCount = 0;
        //webSocketUtil.timer();
        $("#netSpeedHint").text("已连接");
        //$("#netSpeedHint").empty().html("断线了...点击此处<a href='' id='reconnect'>重连</a>");

    },

    _send:function (message) {
        webSocketUtil._ws.send(message);
        console.log(message);
    },


    retry:function () {
        console.log("retry count is " + webSocketUtil.retryCount);

        webSocketUtil.connect(webSocketUtil.uid);


    },

    _onmessage:function (m) {
        if (m.data) {

            if (isJson(m.data)) {
                console.log(m.data);
                var message = JSON.parse(m.data);
                cometService.parseMessage(message.message);

            } else {
                console.log(m.data);
            }

        }
    },
    _onclose:function (m) {
        console.log("connection close .reopen it ");
        $("#netSpeedHint").empty().html("断线了...点击此处<a href=''  id='reconnect'>重连</a>");

    },
    _onerror:function (m) {

        console.log("connection close cause something wrong?.reopen it ");
        $("#netSpeedHint").text("网络连接异常.");

    },
    isConnect:function () {
        if (webSocketUtil._ws == null || webSocketUtil._ws.readyState == 3) {
            return false;
        } else {
            return true;
        }
    },
    timer:function () {
        checkID = setInterval(checkWebSocket, 60000);
    }

}


$(document).ready(function(){
    $("#netSpeedHint").on("click",'a', function (event) {

             webSocketUtil.retry();
            event.preventDefault();


         });
});

