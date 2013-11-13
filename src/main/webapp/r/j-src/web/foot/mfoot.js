/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-12
 * Time: 下午12:52
 * To change this template use File | Settings | File Templates.
 */
function switchInvisible(id) {
    var dom = $("#" + id);
    var hide = dom.is(":hidden");//是否隐藏
    if (hide) {
        dom.removeClass("hidden").addClass("show")
        // $("#main_area").removeClass("bigContent").addClass("smallContent");
    } else {
        dom.removeClass("show").addClass("hidden")
        // $("#main_area").removeClass("smallContent").addClass("bigContent");
    }
}

$(document).ready(function () {

   /* $(".pinned").pin();*/

    if (navigator.userAgent.match(/IEMobile\/10\.0/) || (navigator.userAgent.toString().indexOf("MSIE") > 0)) {

        var msViewportStyle = document.createElement("style")
        msViewportStyle.appendChild(
            document.createTextNode(
                "@-ms-viewport{width:auto!important}"
            )
        )
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
    } else {

    }


    controlHeight();
    $(window).resize(controlHeight);

    $('#foot').grumble(
        {
            text:'回复消息/查看身份,请轻触屏幕',
            angle:0,
            distance:300,
            showAfter:200,
            hideAfter:1500,
            onHide:function () {
                $(".clickHide").each(function () {
                    switchInvisible($(this).attr("id"));
                });
                controlHeight();

            }
        }
    );
    $("#game_area").on('click', function () {
        $(".clickHide").each(function () {
            switchInvisible($(this).attr("id"));
        });
        controlHeight();

    })

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

    $('.multiselect').multiselect({
        buttonClass:'btn',
        buttonWidth:'auto',
        buttonContainer:'<div class="btn-group" />',
        maxHeight:false,
        buttonText:function (options) {
            var text="";
            if (options.length == 0) {
                text= '对象 <b class="caret"></b>';
            }
            else if (options.length > 3) {
                text= options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
                options.each(function () {
                    selected += $(this).text() + ', ';
                });
                text= selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
            }
            var result = [];
            options.each(function () {
                result.push($(this).attr("value"));
            });
            controlView.multiObject=result;



            return text;
        }
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

        var mainH = winH - footH - headH - toolH;
        $('.main_area').css({
            maxHeight:mainH,
            minHeight:mainH
        });
        console.log("foot:" + footH + " main:" + mainH + " head:" + headH + " tool:" + toolH + " all:" + winH);

    }

    function getHeigh(dom) {

        var height = dom.outerHeight(true);
        var hide = dom.is(":hidden");//是否隐藏
        if (hide) {
            height = 0;
        }
        return height;
    }

    function extracted(mid, did) {
        var txt = $(this).text();
        var val = $(this).attr('data-default');

        $("#" + mid).html(txt + "<span class='caret'></span>");
        $("#" + did).attr('data-default', val);

    }

   /* $("#sayButton").on("click", function () {
        say();
    })

    $("#sayInput").on("keydown", function (event) {

        //发送内容违禁词过滤检查函数
        //TODO
        var key = event.keyCode || event.which;
        //回车就发送消息
        if (key == "13") {
            event.preventDefault();

                say();

        }

    });

    function say() {
        $("#game_area").append("<p>" + $("#sayInput").val() + "</p>");
        var height = $("#game_area")[0].scrollHeight;
        $("#game_area").scrollTop(height);
    }*/


})

