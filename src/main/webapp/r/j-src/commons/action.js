/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */






$(document).ready(function () {



        //玩家动作：say, ready, start, kick, vote, kill
        $("#" + selects.$sayInput).bind("keydown", function (event) {

            //发送内容违禁词过滤检查函数
            //TODO
            var key = event.keyCode || event.which;
            //回车就发送消息
            if (key == "13") {
                event.preventDefault();
                if (controlView.isMute()) {
                    alert("嘘.现在不能说话.");
                }
                else {
                    say(event);
                }
            }

        });

        function say(event) {
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
            controlView.resetCommand();
            event.preventDefault();

        }

        $("#" + selects.$sayButton).bind("click", function (event) {
            say(event);
        });


        $("#" + selects.$startButton).click(function () {
            //检查准备人数是否合规则，否则return

            var count = versionFunction["readyCount"];
            ;
            if (count) {

            } else {
                count = 0;
            }
            var isReady = playerService.statusCount("ready", count);


            if (isReady) {

                var message = controlView.getMessage();
                message.predict = "start";
                cometService.sendMessage(message);
                $("#start").hide();
            } else {
                alert("超过" + count + "人再开游戏好不好啊~~~~~");
            }

        });
        $("#" + selects.$readyButton).click(function () {
            //检查准备人数是否合规则，否则return
            var message = controlView.getMessage();
            message.predict = "ready";
            cometService.sendMessage(message);

        });
        $("#" + selects.$exitButton).click(function () {
            var type = globalView.getRoomType();
            var url;
            var r = confirm("确定退出？");

            if ("game" == type) {
                url = "/m/list.do";
                if (r == true) {

                    var message = controlView.getMessage();
                    message.predict = "logout";
                    cometService.sendMessage(message);
                    redirect(url);


                }
            } else {
                url = "/record/list.do";
                redirect(url);
            }


        });

        $("#" + selects.$replayButton).click(function () {
            recordFirstTime = null;
            recordSecondTime = null;
            msg_interval = null;
            recordReplayStartAt = new Date().getTime();
            record_timer = null;

            var text = $("#contents").text();
            var messages = eval(text);
            showRecord(messages, 1);
            $("#" + selects.$replayButton).val("播放中..");
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


        $("#" + selects.$gameArea + " p").live("dblclick", function () {

            getContent.call(this);
            return false;

        });

        function getContent() {
            var content = $(this).html();
            controlView.appendSay(content);
        }


        function showMessage(index, messages, delay) {

            setTimeout(showMessage(index), delay);

        }


    }

)
;
