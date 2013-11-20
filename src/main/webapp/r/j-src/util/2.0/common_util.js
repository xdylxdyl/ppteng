/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-14
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-29
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */


var app = angular.module('myApp', []);
var angularUtil = {
    updateModels:function (id,models) {
        var s = angular.element($("#"+id)).scope();
        $.each(models, function(key, value){
                console.log(key, value);
            s[key] = value;
            });
        s.$apply();
    }
}


function ajaxJson(url, type, param, parse, timeout, dataType, async) {
    lastMessageSendAt = jQuery.now();

    if (timeout == null) {
        timeout = 10000;
    }
    if (async == null) {
        async = false;
    }
    var result;
    $.ajax({
        url:url,
        type:type,
        data:param,
        dataType:dataType,
        timeout:timeout,
        async:async,
        success:function (data) {

            if (parse == null) {
                result = data;

            } else {
                if (parse != null) {
                    result = parse(data);


                }

            }


        },

        error:function (XMLHttpRequest, textStatus) {
            if (textStatus == "timeout") {
                console.log("[超时]");
                //alert("连接超时");
                return null;
            } else {
                console.log("[error]" + textStatus);
                // alert("无法获取版本号");
                return null;
            }

        }

    });
    return result;
}

function redirect(url) {
    document.location.href = url;
};


/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 下午5:24
 * To change this template use File | Settings | File Templates.
 */

var notifyUtil = {



    sendNotify:function (title, content, icon) {
        if (!window.webkitNotifications) {

        } else {
            if (window.webkitNotifications.checkPermission() != 0) {
                notifyUtil.RequestPermission(notifyUtil.sendNotify);
            } else {
                var notification = window.webkitNotifications.createNotification(icon, title, content);
                notification.ondisplay = function (event) {
                    setTimeout(function () {
                        event.currentTarget.cancel();
                    }, 2 * 1000);
                }

                notification.show();

            }
        }


    },
    RequestPermission:function (callback) {
        window.webkitNotifications.requestPermission(callback);
    }

}


/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-7
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */
function DBC2SBC(str) {
    var result = '';
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);//获取当前字符的unicode编码
        if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已及各种字符
        {
            result += String.fromCharCode(str.charCodeAt(i) - 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码
        } else if (code == 12288)//空格
        {
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}

function full2half(str) {
    str = str.replace('，', ',');
    str = str.replace('“', '"');
    str = str.replace('”', '"');
    return str
}

function format(str) {
    str = DBC2SBC(str);
    str = full2half(str);
    return str;
}


function htmlEncode(value) {
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    }
    else {
        return '';
    }
}

function isJson(content) {
    if (content.match("^\{(.+:.+,*){1,}\}$")) {
        return true;
    } else {
        return false;
    }
}

function array2splitString(arrays, split) {

    var result = "";
    for (var i = 0; i < arrays.length; i++) {
        if (i == arrays.length - 1) {
            result = result + arrays[i];
        } else {
            result = result + arrays[i] + split;
        }

    }

    return result;

}

function splitString2Array(string, split) {
    if (string == null) {
        string == "";
    } else {
        var result = string.split(split)
        return result;
    }


}

/*
 * poll ajax
 * */


var timeUtil = {
    constant:{
        Second_MILLISECOND:1000,
        Minute_MILLISECOND:60 * 1000,
        Hour_MILLISECOND:3600 * 1000,
        Day_MILLISECOND:24 * 3600 * 1000,
        WEEK_MILLISECOND:7 * 24 * 3600 * 1000,
        MONTH_MILLISECOND:30 * 24 * 3600 * 1000,
        YEAR_MILLISECOND:365 * 24 * 3600 * 1000
    },


    convertTime2Length:function (time) {
        var s;

        if (time <= this.constant.Minute_MILLISECOND) {
            s = time / this.constant.Second_MILLISECOND + "秒";
        } else if (time <= this.constant.Hour_MILLISECOND) {
            s = time / this.constant.Minute_MILLISECOND + "分钟";

        } else if (time <= this.constant.Day_MILLISECOND) {
            s = time / this.constant.Hour_MILLISECOND + "小时";
        } else if (time <= this.constant.WEEK_MILLISECOND) {
            s = time / this.constant.Day_MILLISECOND + "日";

        } else if (time <= this.constant.MONTH_MILLISECOND) {
            s = time / this.constant.WEEK_MILLISECOND + "周";
        } else if (time <= this.constant.YEAR_MILLISECOND) {
            s = time / this.constant.MONTH_MILLISECOND + "月";
        } else {
            s = "好长";
        }
        return s;

    },
    time2String:function (time) {
        var date = new Date(time);

        return date.format("hh:mm");

    }
}


Date.prototype.format = function (format) {
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+":this.getMonth() + 1,
        "d+":this.getDate(),
        "h+":this.getHours(),
        "m+":this.getMinutes(),
        "s+":this.getSeconds(),
        "q+":Math.floor((this.getMonth() + 3) / 3),
        "S":this.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

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


$(document).ready(function () {
    $("#netSpeedHint").on("click", 'a', function (event) {

        webSocketUtil.retry();
        event.preventDefault();


    });
});



var musicService = {
    getMusics:function () {

        return  ajaxJson("/music/list", "get", {}, musicService.parseMusic, 5000, "json");

    },
    parseMusic:function (result) {
        return result.data;
    }
}
function MusicCtrl($scope) {
    $scope.musics = musicService.getMusics();
    $scope.refreshMusic = function() {
           $scope.musics = musicService.getMusics();
       };



};

$(function () {
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded:function () {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
    });

    // Load in the first track
    var audio = a[0];
    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing');


    if(audio!=undefined){
        audio.load(first);
    }else{

    }


    // Load in a track on click
    $('ol').on("click","li",function (e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });
});


