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

function controlHeight() {
    var winH;
    if ($(window).height() <= 300) {
        winH = 300;
    } else {
        winH = $(window).height();
    }

    var headH = getHeigh($(".header"));
    var footH = getHeigh($(".foot"))
    var toolH = getHeigh($(".tool"))

    var mainH = winH - footH - headH - toolH-20;
    $('.autoheight_area').css({
        maxHeight:mainH,
        minHeight:mainH
    });
    var navH=getHeigh($(".nav-tabs"));
    var paneH=mainH-navH-60;

    $(".tab-pane").css({
        maxHeight:paneH,
        minHeight:paneH
    })



    console.log("foot:" + footH + " main:" + mainH + " head:" + headH + " tool:" + toolH + " all:" + winH+" navh "+navH+" paneH "+paneH);

}

function getHeigh(dom) {

    var height = dom.outerHeight(true);
    console.log(" get height size "+height);
    var hide = dom.is(":hidden");//是否隐藏
    if (hide) {
        height = 0;
    }
    return height;
}



$("#expression").on("click", "li", function () {
    extracted.call(this, "select_" + $(this).parent().attr("id"), $(this).parent().attr("id"));


})
$("#color").on("click", "li", function () {
    var mid = "select_" + $(this).parent().attr("id");
    var did = $(this).parent().attr("id");
    extracted.call(this, mid, did);


})
$("#command").on("click", "li", function () {
    extracted.call(this, "select_" + $(this).parent().attr("id"), $(this).parent().attr("id"));
    var command = controlView.getCommandValue();
    var playList = playerService.getAllPlayer();
    controlView.filterObject(command, playList);

})
$("#object").on("click", "li", function () {
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

        $("#" + mid).html(txt + "<span class='caret'></span>");
        $("#" + did).attr('data-default', val);

    }

$(window).resize(controlHeight);
$(document).ready(function(){
    controlHeight();
})