//调用QC.Login方法，指定btnId参数将按钮绑定在容器节点中

var loginView = {
    isLogin:function () {
        var uid = $("#uid").val();
        if (uid) {

            return true;
        } else {
            return false;
        }
    }

}

if (loginView.isLogin()) {



} else {

    QC.Login({btnId:"qqLoginBtn"}, function (oInfo, oOpts) {
        console.log("qq login");
        QC.Login.getMe(function (openId, accessToken) {
            login("qq", openId, oInfo.nickname);
        })

    });
}


var login = function (type, openID, name) {
    ajaxJson("/player/openID.do?", "post", {type:type, openID:openID, name:name}, null, 5000, "json");
    window.location.href = "/";
}


$(document).ready(function() {

$("#punch").bind('click', function() {

        var uid = $("#uid").val();

        $.ajax({
            url : "/player/punch.do",
            data : {},
            type: "post",
            dataType:"json",
            success : function(data) {
                window.location.href = "/";
            }
        })
        /**/
        return false;
    })
})
