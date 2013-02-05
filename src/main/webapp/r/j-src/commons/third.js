//调用QC.Login方法，指定btnId参数将按钮绑定在容器节点中
QC.Login({btnId:"qqLoginBtn"}, function(oInfo, oOpts){
    console.log("qq login");
    QC.Login.getMe(function(openId, accessToken){
        login("qq",accessToken,oInfo.nickname);
    })

});


var login=function(type,openID,name){
    ajaxJson("/player/openID.do?", "post", {type:type,openID:openID,name:name}, null, 5000, "json");
    window.location.href="/m/list.do";
}



