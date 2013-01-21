/*
* poll ajax
* */

function poll(url, param, suc) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        timeout: 60000,     //ajax请求超时1秒
        data: param,
        success: function(data){
            //从服务器得到数据，显示数据并继续查询
            if(data.code=="0"){
                suc(data);
                setTimeout(function() {
                    poll(url, param, suc);
                }, 1000)
            }
            //未从服务器得到数据，继续查询
            if(data.code!="0"){
                setTimeout(function() {
                    poll(url, param, suc);
                }, 1000)
            }
        },
        //Ajax请求超时，继续查询
        error:function(XMLHttpRequest,textStatus,errorThrown){
            if(textStatus=="timeout"){
                setTimeout(function() {
                    poll(url, param, suc);
                }, 1000)
            }
        }

    });
}

function ajaxGet(url, param, success) {
    var result;
    $.get(url, param, function(data) {
        success(data);
    })
}
function ajaxPost(url, param, success) {
    $.post(url, param, function(data) {
        success(data);
    })
}