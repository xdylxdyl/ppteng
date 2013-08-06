/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-7
 * Time: 下午3:20
 * To change this template use File | Settings | File Templates.
 */

/*小提示*/
$('#exitRoom').tooltip();
/*键盘快捷控制，还未想好如何设置*/
var key = new Kibo();
$('#inputText').focus(function () {
    key.down(['alt 1'], function () {
        $("#selectExpression").click();
    })
});
/*宽度min-width: 600px时页面高度控制*/
function controlHeight() {
    var winH;
    if ($(window).height() <= 300) {
        winH = 300;
    } else {
        winH = $(window).height();
    }
    var headH = $('.navbar').outerHeight();
    var footH = $('.foot').outerHeight();
    var mainH = winH - headH - footH - 20;
    var contentH = mainH - $('ul.nav-tabs').outerHeight();
    $('.sidebar-nav').css({
        maxHeight:mainH,
        minHeight:mainH
    });
    $('.tab-pane').css({
        maxHeight:contentH,
        minHeight:contentH
    });

}
$(function () {
    controlHeight();
    $(window).resize(controlHeight);
});


$("#expression").on("click","li", function () {
    extracted.call(this, "select_" + $(this).parent().attr("id"), $(this).parent().attr("id"));


})
$("#color").on("click","li",function () {
    var mid="select_" + $(this).parent().attr("id");
    var did=$(this).parent().attr("id");
    extracted.call(this, mid,did );


})
$("#command").on("click","li", function () {
    extracted.call(this, "select_" + $(this).parent().attr("id"), $(this).parent().attr("id"));
    var command = controlView.getCommandValue();
    var playList = playerService.getAllPlayer();
    controlView.filterObject(command, playList);

})
$("#object").on("click","li", function () {
    extracted.call(this, "select_" + $(this).parent().attr("id"), $(this).parent().attr("id"));
    if (controlView.checkSayNotEmpty()) {

    } else {

        var command = controlView.getCommandValue();
        var content = hint[command];
        if (content == null) {
            if (versionFunction["commandHint"]) {
                content = versionFunction["commandHint"](command);
            }

        }

        controlView.hintSay(content);
    }

})


function extracted(mid, did) {
    var txt = $(this).text();
    var val = $(this).attr('data-default');
    $("#" + mid).find('span').text(txt);
    $("#" + did).attr('data-default', val);
}