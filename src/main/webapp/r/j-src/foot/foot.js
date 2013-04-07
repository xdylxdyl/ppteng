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
        winH =  300;
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
$(function() {
    controlHeight();
    $(window).resize(controlHeight);
});



/*
 * 动作栏下拉框
 * @elem 传入选择器ID
 * 选择器的文本变为所选项文本
 * 选择器的data-default属性变为所选项data-default属性
 * 所选项如果为color，则选择器文本颜色也改为相应颜色*/
/*
function selectors(elem) {
    var $elem = $('#' + elem);
    var $menu = $elem.siblings('ul.dropdown-menu');
    $menu.children('li').live("click", function () {
        var txt = $(this).text();
        var val = $(this).attr('data-default');
        $elem.find('span').text(txt);
        $elem.attr('data-default', val);
        if (val.indexOf('#') == '0') {
            $elem.find('span').css({
                color:val
            })
        }
    })
}
selectors('selectExpression');
selectors('selectColor');
selectors('selectOrder');
selectors('selectObject');
*/


$("#expression li").live("click", function () {
    extracted.call(this,"select_"+$(this).parent().attr("id"),$(this).parent().attr("id"));
    return false;
})
$("#color li").live("click", function () {
    extracted.call(this,"select_"+$(this).parent().attr("id"),$(this).parent().attr("id"));
    return false;
})
$("#command li").live("click", function () {
    extracted.call(this,"select_"+$(this).parent().attr("id"),$(this).parent().attr("id"));
    var command =controlView.getCommandValue();
    var playList=playerService.getAllPlayer();
    controlView.filterObject(command,playList);
    return false;
})
$("#object li").live("click", function () {
    extracted.call(this,"select_"+$(this).parent().attr("id"),$(this).parent().attr("id"));
    if (controlView.checkSayNotEmpty()) {

       } else {

           var command =controlView.getCommandValue();
           var content = hint[command];
           if (content == null) {
               content = versionFunction["commandHint"](command);
           }

           controlView.hintSay(content);
       }
    return false;
})





function extracted(mid,did) {
     var txt = $(this).text();
     var val = $(this).attr('data-default');
     $("#"+mid).find('span').text(txt);
     $("#"+did).attr('data-default', val);
 }