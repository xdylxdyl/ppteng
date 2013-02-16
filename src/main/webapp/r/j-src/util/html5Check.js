/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-2-16
 * Time: 下午1:16
 * To change this template use File | Settings | File Templates.
 */



//显示灰色遮罩层
function showBg() {
    var bh = $(window).height();
    var bw = $(window).width();
    $("#mask").css({
        height:bh,
        width:bw,
        display:"block"
    });
    $("#mask").show();
}
//关闭灰色遮罩
function closeBg() {
    $("#mask").hide();
}
$(document).ready(function() {
    function checkhHtml5() {
        if (typeof(Worker) !== "undefined") {
            //什么都不用做
           // alert("支持~")
        }
        else {
            showBg();
        }
    }
    checkhHtml5();
    $(window).resize(function() {
        checkhHtml5();
    })
})
