//调用QC.Login方法，指定btnId参数将按钮绑定在容器节点中
QC.Login({btnId:"qqLoginBtn"}, function(oInfo, oOpts){
   alert(oInfo.nickname)  //昵称
    window.location.href="/record/list.do";
});

