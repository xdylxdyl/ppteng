/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */
var num = 100;
var timeTest = null;
var information = {};
information.info = function (active, object) {
    object == null || object == "" ? object = -500 : object;
    var content = $("#say").val();
    console.log($("#say").val());
    content = $("#escape").text(content).html();
    $("#escape").empty();
    console.log($("#say").val() + " after escape " + content);

    var action = $("#uid").val() + "," + active + "," + object + "," + $("#color").val() + "," + $("#expression").val() + "," + $("#rid").val();
    var infos = {
        subject:$("#uid").val(),
        predict:active,
        object:object,
        where:$("#rid").val(),
        color:$("#color").val(),
        expression:$("#expression").val(),
        "content":content,
        "isDrools":"true",
        "version":$("#version").val()
    };
    return infos;
};
information.sendInfo = function (active, object, info, success, isAsync) {
    if (isAsync == null) {
        isAsync = true;
    }
    var startTime = jQuery.now();
    $.ajax({
        type:"POST",
        url:"/message/accept2.do",
        async:isAsync,
        data:info(active, object),
        success:function (data) {
            if (success == null) {

            } else {
                success();

            }
            $("#netspeed").text(jQuery.now() - startTime);
        }
    });
    return false;
};
var sendmessage = function (count) {

    console.log("send num " + count);
    $("#say").val(count);
    information.sendInfo("say", $("#send b").val(), information.info);
    count--;
    if (count < 0) {
        return;
    }
    setTimeout("sendmessage(" + count + ")", 100);
}

var playerList = {};
playerList.order = function (command) {
    switch (command) {
        case "kick" :
            this.filter();
            break;
        case "kill" :
            this.filter("living");
            break;
        case "vote" :
            this.filter("living");
            break;
        case "command" :
            this.filter("command");
            break;
        default :
            console.log("亲，这个指令你还没写嘛.");
    }
};
playerList.filter = function (keyword) {

    $("#object option:gt(0)").remove();

    if (keyword) {
        if (keyword == "command") {

        } else {
            for (var key in id_name) {
                var player = playerService.getPlayer(key);
                if (keyword == player.status) {
                    $("#object").append("<option value='" + player.id + "'>" + player.name + "</option>");
                }


            }

        }
    } else {
        for (var key in id_name) {
            var player = playerService.getPlayer(key);
            $("#object").append("<option value='" + player.id + "'>" + player.name + "</option>");

        }


    }
};


$(document).ready(function () {


    $("#command").change(function () {
        var command = $(this).val();
        playerList.order(command);
    });
    $("#object").change(function () {
        if (controlView.checkSayNotEmpty()) {

        } else {

            var command = $("#command").val();
            var content = hint[command];
            if (content == null) {
                content = versionFunction["commandHint"](command);
            }

            controlView.hintSay(content);
        }
    });

    //玩家动作：say, ready, start, kick, vote, kill
    $("#say").bind("keydown", function (event) {

        //发送内容违禁词过滤检查函数
        //TODO

        //回车就发送消息
        if (event.keyCode == "13") {

            say();

        } else {

        }


    });

    function say() {
        if (controlView.checkSayNotEmpty()) {


            var act = $("#command").val();
            if (act != "command") {
                var object = $("#object").val();
                if (object == "object" || object == null) {
                    alert("要选人哟亲");
                    return;
                } else {
                    information.sendInfo(act, object, information.info);
                    controlView.resetCommand();
                }


            } else {
                var p = "say";
                if ("lastword" == globalView.getGameStatus()) {
                    p = globalView.getGameStatus();
                }
                information.sendInfo(p, $("#send b").val(), information.info);

            }
            controlView.clearSayInput();


        } else {
            controlView.sayHint();
        }

    }

    $("#sendSay").bind("click", function () {
        say();


    });

    function setScroll(id) {
        var height = $(id)[0].scrollHeight;
        console.log(height);
        $(id).scrollTop(height);
    }

    ;


    $("#start").click(function () {
        //检查准备人数是否合规则，否则return
        //TODO
        information.sendInfo("start", null, information.info);
    });
    $("#ready").click(function () {
        //检查准备人数是否合规则，否则return
        //TODO
        information.sendInfo("ready", null, information.info);
    });
    $("#logout").click(function () {
        var type = globalView.getRoomType();
        var url;
        var r = confirm("确定退出？");

        if ("game" == type) {
            url = "/m/list.do";
            if (r == true) {
                information.sendInfo("logout", null, information.info, redirect(url), false);
                console.log("logout ");

            }
        } else {
            url = "/record/list.do";
            redirect(url);
        }


    });

    $("#replay").click(function () {
        recordFirstTime = null;
        recordSecondTime = null;
        msg_interval = null;
        recordReplayStartAt = new Date().getTime();
        record_timer = null;

        var text = $("#contents").text();
        var messages = eval(text);
        showRecord(messages, 1);
        $("#replay").val("播放中..");
        controlView.showRecordCurrentTime(0, globalView.getRecordTime());


    });


    $("#replay_role_checkbox").bind("click", function () {

        if (controlView.isShow())
        {
            $("#role_area").hide();
            $("#dead_area").hide();
            $("#killer_area").hide();
        }
        else
        {
            $("#role_area").show();
            $("#dead_area").show();
            $("#killer_area").show();
        }


    });

    $("#music_controller").bind("click", function () {

        var isHide = $("#music_controller").attr("isHide");
        musicUtil.hideMusic(isHide);
        return false;

    });


    function showMessage(index, messages, delay) {

        setTimeout(showMessage(index), delay);

    }


    /*   //点击玩家名字，改变说话对象
     $("nav b").click(function() {
     $("#send b").val("-500").text("");
     });
     */
    $("nav li a").click(function () {


    });


    if ($("#time").val() == "over") {
        $("#battle").css("display", "inline").click(function () {
            var mask = $("<div>", {"id":"mask"});
            mask
                .css({position:"absolute", left:"10px", top:"10px", marginTop:"5px", width:"915px", height:"1px", backgroundColor:"#FFFFEE", zindex:2})

                .animate({height:"96px"}, 1000)
                .appendTo("footer");
            $("#battle").appendTo($("#mask"));
        });
    }


})
;