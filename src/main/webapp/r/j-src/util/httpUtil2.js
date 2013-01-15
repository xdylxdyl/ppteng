function ajaxJson(url, type, param, parse,timeout,dataType) {
    if(timeout==null){
        timeout=10000;
    }
    var result;
    $.ajax({
        url : url,
        type : type,
        data: param,
        dataType :dataType,
        timeout:timeout,
        async : false,
        success : function(data) {

            if (parse == null) {
                result= data;

            } else {
                result = parse(data);
                console.log("In Ajax The Result Is:");
                console.log(result);
            }


        },

        error: function(XMLHttpRequest, textStatus) {
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
    } ;