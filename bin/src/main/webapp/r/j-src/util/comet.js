/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-11-29
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */

var cometUtil = {
    polling:function(url, successCB) {
        $.ajax({
            dataType: "jsonp",
            url: url,
            timeout: 100500,
            jsonp: "callback",
            // test repeat data
            // jsonpCallback: "callBack",

            success: function(data) {

                //console.log(data);
                successCB(data);
                console.log("success");
                cometUtil.polling(url, successCB);
            },
            error: function(XMLHttpRequest, textStatus) {
                if (textStatus == "timeout") {
                    console.log("timeout");
                    cometUtil.polling(url, successCB);

                } else {
                    console.log("error");
                    cometUtil.polling(url, successCB);

                }

            }
        });
    }
}

//实时流
