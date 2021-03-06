/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */






$(document).ready(function () {



        //玩家动作：say, ready, start, kick, vote, kill
        $("#" + selects.$sayInput).on("keydown", function (event) {

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
                controlView.clearSayInput();
                controlView.resetCommand();
                controlView.resetExpression();
            } else {
                //error
                alert(formatResult.message);
            }

            event.preventDefault();

        }

        $("#" + selects.$sayButton).on("click", function (event) {
            if (controlView.isMute()) {
                alert("嘘.现在不能说话.");
            }
            else {
                say(event);
            }

        });


        $("#" + selects.$startButton).on('click', function () {
            //检查准备人数是否合规则，否则return

            var count = versionFunction["readyCount"];
            if (count) {

            } else {
                count = 0;
            }
            var isReady = playerService.statusCount("ready", count);

            if (isReady) {

                var message = controlView.getMessage();
                message.predict = "start";
                cometService.sendMessage(message);
                $("#" + selects.$startButton).hide();
            } else {
                alert("超过" + count + "人再开游戏好不好啊~~~~~");
            }

        });
        $("#" + selects.$readyButton).on('click', function () {
            //检查准备人数是否合规则，否则return
            var maxCount = versionFunction["readyMaxCount"];
            if (maxCount) {

            } else {
                maxCount = 65539;
            }
            var isMaxReady = playerService.statusCount("ready", maxCount);

            if (isMaxReady) {
                alert("已经超过" + maxCount + "人了.等一局吧亲~~~~~");
            } else {
                var message = controlView.getMessage();
                message.predict = "ready";
                cometService.sendMessage(message);
                $("#" + selects.$readyButton).hide();
            }


        });
        $("#" + selects.$exitButton).click(function () {
            var type = globalView.getRoomType();
            var url;
            var r = confirm("确定退出？");

            if ("game" == type) {
                url = "/m/list";
                if (r == true) {

                    var message = controlView.getMessage();
                    message.predict = "logout";
                    cometService.sendMessage(message);
                    redirect(url);


                }
            } else {
                url = "/record/list";
                redirect(url);
            }


        });

        $("#replayButton").on("click", function () {
            recordFirstTime = null;
            recordSecondTime = null;
            msg_interval = null;
            recordReplayStartAt = new Date().getTime();
            record_timer = null;

            var text = $("#contents").text();
            var messages = eval(text);
            recordService.showRecord(messages, 1);
            $("#" + selects.$replayButton).val("播放中..");
            controlView.showRecordCurrentTime(0, globalView.getRecordTime());


        });


        $("#displayRole").on("click", function () {

            if (controlView.isShow()) {
                $("#" + selects.$playerRole).show();
                gameView.showDieArea();
            }
            else {
                $("#" + selects.$playerRole).hide();
                gameView.hideDieArea();
            }


        });


        $("#" + selects.$gameArea).on("dblclick", "p", function () {

            roomService.appendContent.call(this);
            return false;

        });

        $('#sidebar-toggle').toggle(function () {
            globalView.hidePlayerList('#sidebar-toggle');
        }, function () {
            globalView.showPlayerList('#sidebar-toggle');
        });

        $('[href][auto-bottom]').on("shown", function () {
            var linkID = $(this).attr("href");
            viewUtil.autoBottom($(linkID));
        })





    }

)
;
