/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */




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
    $("#sayInput").bind("keydown", function (event) {

        //发送内容违禁词过滤检查函数
        //TODO

        //回车就发送消息
        if (event.keyCode == "13") {

            if ($("#sendSay").prop("disabled")) {
                alert("嘘.现在不能说话.");
            }
            else {
                say();
            }


        } else {

        }


    });

    function say() {
        var formatResult = controlView.checkFormat();
        if (formatResult.code == 0) {
            //success
            var message = controlView.getMessage();

            //filter lastword ---not commons
            var player = playerService.getPlayer(globalView.getCurrentID());
            if (player.status == playerStatus.lastword && "lastword" == globalView.getGameStatus()) {
                message.predict = globalView.getGameStatus();
            }

            cometService.sendMessage(message);
        } else {
            //error
            alert(formatResult.message);
        }
        controlView.clearSayInput();

        }

        $("#sayButton").bind("click", function () {
            say();


        });

        function setScroll(id) {
            var height = $(id)[0].scrollHeight;
            console.log(height);
            $(id).scrollTop(height);
        }

        ;


        $("#startButton").click(function () {
            //检查准备人数是否合规则，否则return

            var count = versionFunction["readyCount"];
            ;
            if (count) {

            } else {
                count = 0;
            }
            var isReady = playerService.statusCount("ready", count);


            if (isReady) {
                //TODO
                information.sendInfo("start", null, information.info);

                $("#start").hide();
            } else {
                alert("超过" + count + "人再开游戏好不好啊~~~~~");
            }

        });
        $("#readyButton").click(function () {
            //检查准备人数是否合规则，否则return
            //TODO
            information.sendInfo("ready", null, information.info);

        });
        $("#exitButton").click(function () {
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

        $("#replayButton").click(function () {
            recordFirstTime = null;
            recordSecondTime = null;
            msg_interval = null;
            recordReplayStartAt = new Date().getTime();
            record_timer = null;

            var text = $("#contents").text();
            var messages = eval(text);
            showRecord(messages, 1);
            $("#replayButton").val("播放中..");
            controlView.showRecordCurrentTime(0, globalView.getRecordTime());


        });


        $("#replay_role_checkbox").bind("click", function () {

            if (controlView.isShow()) {
                $("#role_area").hide();
                $("#dead_area").hide();
                $("#killer_area").hide();
            }
            else {
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


        $("section article p").live("dblclick", function () {

            getContent.call(this);
            return false;

        });

        function getContent() {
            var content = $(this).html();
            controlView.hintSay(content);
        }


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


    }

    )
    ;