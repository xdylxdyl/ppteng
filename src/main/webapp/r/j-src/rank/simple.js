/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */




$(document).ready(function() {

    headView.highLight("rank");
    leftView.highLight("leftNav_simple");


    /*表格排序*/
    $.fn.tableRank = function() {
        $(this).each(function() {

            var $query = $("#query");
            var $desc = $("#desc");//*asc*//
            var $page = $("#page");
            var $size = $("#size");

            var url = "/rank/statistics.do?type=simple";

            var classUp = "icon-arrow-up";
            var classDown = "icon-arrow-down";

            //改变input的value
            var changeParam = function(ele) {
                var curQuery = ele.attr("query");
                if (curQuery != $query.attr("value")) {
                    $desc.attr("value", 'desc');
                    $query.attr("value", curQuery);
                } else {
                    if ($desc.attr("value") == 'desc') {
                        $desc.attr("value", 'asc');
                    } else {
                        $desc.attr("value", 'desc');
                    }
                }
            };
            //从input的属性拼装字符串，返回完整网址
            var getParam = function() {
                var str = '&' + $query.attr('id') + '=' + $query.attr('value') +
                    '&' + $desc.attr('id') + '=' + $desc.attr('value') +
                    '&' + $page.attr('id') + '=' + $page.attr('value') +
                    '&' + $size.attr('id') + '=' + $size.attr('value');
                str = url +str;
                return str;
            };
            //改变样式
            var changeClass = function() {
                var getThId;
                var curClass;
                //根据$desc判断升序降序
                if ($desc.attr("value") == "desc") {
                    curClass = classDown;
                } else {
                    curClass = classUp;
                }
                //根据哪个值进行排序
                if ($query.attr("value") != 'query') {
                    getThId = $query.attr("value");
                    $("#" + getThId + " i").removeClass().addClass(curClass);
                }
            };
            changeClass();

            if ($(this).is("[query]")) {
                $(this).click(function() {
                    changeParam($(this));
                    console.log(getParam());
                    window.location.href = getParam();
                })
            }
        })
    };
    $("thead th").tableRank();
});


