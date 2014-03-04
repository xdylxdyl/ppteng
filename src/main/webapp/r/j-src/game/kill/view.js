/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */


var settingPostParameter = function (rid, version, killCount, dayTime, nightTime, lastwordTime, policeCount) {
    return{
        rid:rid,
        version:version,
        setting:[
            {"killerCount":killCount},
            {"policeCount":policeCount},
            {"dayTime":dayTime},
            {"nightTime":nightTime},
            {"lastwordTime":lastwordTime}
        ]
    }
}


var commandSimpleSetting = {
    vote:"投他一票",
    kill:"杀人灭口"

}


/**
 * 游戏区域
 */
var killGameAreaView;
killGameAreaView = {

    getCommandHint:function (command) {
        return killGameAreaView.Hint[command];
    },
    Hint:{
        start:"<p style='color:#F00'>【系统消息】 游戏开始,白天时间~</p>",
        vote:"人生就是这样,何必挣扎说自己不是杀手呢",
        kill:"杀谁都一样,你只是太闪亮了",
        night:"【系统消息】 月黑风高杀人夜，大家各自保重",
        day:"【系统消息】 天光大亮，大家集中精力找出凶手",
        killerList:"【系统消息】 绝密杀手名单： ",
        kick:"你好,再见",
        check:"贼眉鼠眼必有隐情",
        voteDie:function (name) {
            return " <p style='color:#F00;'>【系统消息】 积毁销骨，众口铄金，[" + name + "]你就认命吧！</p>";
        },
        killDie:function (name) {
            return " <p style='color:#F00;'>【系统消息】 [" + name + "] 被杀了。</p>";
        },
        votePerson:function (color, subjectName, exp, objectName, objectName, content) {
            return "<p style='font-weight:bold;color:" + color + "'>[" + subjectName + "] " + controlView.showExpression(exp) + " 指证 [" + objectName + "] 说 : " + content + " </p>";
        },
        killPerson:function (killerName, exp, objName, content) {
            return "<p style='color:#F00;'>" + killerName + " " + controlView.showExpression(exp) + "杀了 [" + objName + "] 说 : " + content + " </p>";
        },
        checkPerson:function (killerName, exp, objName, content) {
            return  "<p style='color:#F00;'>" + killerName + " " + controlView.showExpression(exp) + "查证 [" + objName + "] 说 : " + content + " </p>";
        },

        killerWin:function (recordLink) {
            return "<p style='color:#F00'>【系统消息】 游戏结束，杀手胜利！</p> " + recordLink;
        },
        waterWin:function (recordLink) {
            return "<p style='color:#F00'>【系统消息】 游戏结束，水民胜利！</p> " + recordLink;

        },

        recordLink:function (recordID) {
            return   "<a href='/record/enter?recordID=" + recordID + "' target='_blank'>查看战例</a>";
        },
        decryption:function (name, role) {
            return   "<p style='color:#F00;'> 【系统消息】 [" + name + "] 是" + killGameAreaView.RoleName[role] + "</p>"
        },
        lastwordHint:function (name) {
            return "<p style='color:#F00;'>【系统消息】 [" + name + "]  被杀了,遗言时间，静下来聆听[" + name + "] 的最后一句话。</p>";
        }



    },
    View:{
        say:function (color, name, express, content) {
            return  "<p  style='color:" + color + "'>[" + name + "] " + express + " 说：" + content + "</p>"
        }

    },

    Phase:{
        night:"【当前状态】晚上 ",
        day:"【当前状态】白天 ",
        lastword:"【当前状态】遗言 ",
        end:"游戏结束"
    },

    RoleHint:{
        water:"【身份】水民 ",
        killer:function (names) {
            return "【杀手名单】 " + JSON.stringify(names);
        },
        appendKiller:function (name) {
            return "【杀手名单】 " + name;
        },
        police:function (names) {
            return "【警察名单】 " + JSON.stringify(names);
        },
        appendPolice:function (name) {
            return "【警察名单】 " + name;
        }
    },
    RoleName:{
        water:"水民 ",
        killer:"杀手 ",
        police:"警察 "
    },
    Role:{
        water:"water",
        killer:"killer",
        police:"police"
    },


    say:function (id, name, content, exp, color, subject, subjectName) {
        var express = controlView.showExpression(exp);
        var obj;
        if (subject != "-500") {
            obj = " 对 [" + subjectName + " ]";
        } else {
            obj = "";
        }
        //say出现的位置 这个.话说.原来死人说的话是JS控制的么
        //1、死人（dead_area）——a、游戏结束后；b、游戏未结束时。 2、活人——a、白天； b、遗言时； css、晚上（killer_area）。
        var player = playerService.getPlayer(id);
        var place = "normal";


        switch (player.status) {
            case playerStatus.die:
                if ($("#time").val() == "over") {

                } else {
                    //没有结束

                    place = "deadArea";

                }
                break;
            case playerStatus.lastword:
                break;
            case playerStatus.unready:
                if ($("#time").val() == "over") {

                } else {
                    //没有结束

                    place = "deadArea";

                }
                break;
            case playerStatus.living:
                //delay message
                if ("day" != globalView.getGameStatus()) {
                    switch (player.role) {
                        case killGameAreaView.Role.water:
                            place = "discard";
                            break;
                        case killGameAreaView.Role.killer:

                            break;
                        case killGameAreaView.Role.police:

                            break;
                    }

                }
                break;
            default :
                place = "deadArea";


        }

        switch (place) {
            case "normal":
                $("#" + selects.$gameArea).append(killGameAreaView.View.say(color, name, express, content));
                viewUtil.autoBottom($("#" + selects.$gameArea));
                break;
            case "deadArea":
                $("#" + selects.$dieArea).append(killGameAreaView.View.say(color, name, express, content));
                viewUtil.autoBottom($("#" + selects.$dieArea));
                break;
            default:
        }


    },
    vote:function (subjectName, objectName, color, exp, content) {


        $("#" + selects.$gameArea).append(killGameAreaView.Hint.votePerson(color, subjectName, exp, objectName, objectName, content));
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },

    die:function (id, name, action) {
        $("#" + id).children("a").removeClass().addClass("die");
        if (action == "vote") {

            $("#" + selects.$gameArea).append(killGameAreaView.Hint.voteDie(name));
        } else if (action == "kill") {

            $("#" + selects.$gameArea).append(killGameAreaView.Hint.killDie(name));
        }

    },
    kill:function (killerName, objName, exp, content) {
        $("#" + selects.$gameArea).append(killGameAreaView.Hint.killPerson(killerName, exp, objName, content));
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },
    check:function (killerName, objName, exp, content) {
        $("#" + selects.$gameArea).append(killGameAreaView.Hint.checkPerson(killerName, exp, objName, content));

        viewUtil.autoBottom($("#" + selects.$gameArea));
    },


    showContentForRoleArea:function (content) {

    },
    showContentForGameArea:function (content) {
        if (content == "" || content == undefined) {

        } else {
            $("#" + selects.$gameArea).append("<p><span style='color: #F00'>" + content + "</span></p>");
        }

    },
    showConentForGamePhase:function (content) {
        $("#" + selects.$gamePhase).empty().html(content);
    },
    clearStatusArea:function () {
        $("#" + selects.$gamePhase).empty();
    },
    clearGameArea:function () {
        $("#" + selects.$gameArea).empty();
    },
    clearRoleArea:function () {
        $("#" + selects.$playerRole).empty();
    },
    showOver:function (recordID, obj) {

        var recordLink = killGameAreaView.Hint.recordLink(recordID);

        switch (obj) {
            case "killer win" :
                $("#" + selects.$gameArea).append(killGameAreaView.Hint.killerWin(recordLink));

                break;
            case "water win" :
                $("#" + selects.$gameArea).append(killGameAreaView.Hint.waterWin(recordLink));

                break;
            default :
                $("#" + selects.$gameArea).append("<p style='color:#F00'>" + obj + "</p>");
        }

        //时间清空
        clearTimeout(timer);
        timer = null;
        $("#" + selects.$countDown).val("00:00");
        viewUtil.autoBottom($("#" + selects.$gameArea));


    }

};


var simpleRightView = {
    rightView:function (right) {
        switch (right) {
            case "vote" :
                simpleRightView.commandRight(right);
                break;
            case "kill" :
                simpleRightView.commandRight(right);
                break;
            case "lastword" :
                simpleRightView.sayRight(right);
                break;
            case "check":
                simpleRightView.commandRight(right);
                break;
            default :
                console.log("version view not process right: " + right);
        }
    },

    commandRight:function (right) {
        rightView.commandRight(right);
    },
    sayRight:function (right) {
        $("#" + selects.$sayButton).prop("disabled", false);

    }



}

var simpleSettingView = {
    initSetting:function () {

        $("#dayTime").val($("#dayTime").val() / 60000);
        $("#nightTime").val($("#nightTime").val() / 60000);
        $("#lastwordTime").val($("#lastwordTime").val() / 60000);

        $("<span>分</span>").insertAfter("#dayTime");
        $("<span>分</span>").insertAfter("#nightTime");
        $("<span>分</span>").insertAfter("#lastwordTime");
    },
    getSettingParameter:function () {
        $("#dayTime").val($("#dayTime").val() * 60000);
        $("#nightTime").val($("#nightTime").val() * 60000);
        $("#lastwordTime").val($("#lastwordTime").val() * 60000);
        var params = jQuery("#setting").serialize();
        return params;
    },

    autoSettingShow:function (auto) {
        if (auto) {
            //autosetting
            $("#policeCount").attr("readonly", true);
            $("#killerCount").attr("readonly", true);

        } else {
            $("#killerCount").attr("readonly", false);
            $("#policeCount").attr("readonly", false);

        }
    }
}


var gameView = {
    start:function () {


        $("#" + selects.$startButton).hide();
        $("#" + selects.$readyButton).hide();
        $("#" + selects.$gameArea).empty();
        $("#" + selects.$killerArea).empty();
        $("#" + selects.$dieArea).empty();
        $("#" + selects.$playerRole).empty();

        $("#" + selects.$gameArea).append(killGameAreaView.Hint.start);


        playerListView.sortPlayer();
        killGameAreaView.clearStatusArea();
        settingView.hideSettingButton();
        var p = playerService.getPlayer(globalView.getCurrentID());

        gameView.showSecondArea(p);
        globalView.setGameStatus("run");

        notifyUtil.sendNotify("举起手来", "杀人了杀人了杀人了", "");


    },
    over:function (message) {
        var obj = message.object;
        var recordID = message.subject;
        //标明游戏结束
        globalView.setGameStatusHint(killGameAreaView.Phase.end);
        globalView.setGameStatus(gameGlobalStatus.over);

        playerService.setUnreadyStatus();
        //只重新显示.不用重新计算
        settingView.displaySetting();


        killGameAreaView.showOver(recordID, obj);
        killGameAreaView.showConentForGamePhase(killGameAreaView.Phase["over"]);
        gameView.showDieArea();
    },
    showDieArea:function () {
        $("#" + selects.$secondArea).show();
        $("#" + selects.$secondArea).removeClass().addClass("span3");
        $("#" + selects.$mainArea).removeClass().addClass("span9");
    },
    hideDieArea:function () {
        $("#" + selects.$secondArea).hide();
        $("#" + selects.$mainArea).removeClass().addClass("span12");
    },
    showSecondArea:function (p) {
        if (playerStatus.die == p.status || playerStatus.unready == p.status) {
            gameView.showDieArea();
        } else {
            gameView.hideDieArea();
        }
    }


}

var simpleService = {
    parseDetail:function (data) {
        roomService.parsePerson(data.person);
        simpleService.parseGame(data.game);
        roomService.parseRight(data.right);
        roomService.parseCount(data.votes);
        simpleService.parseRole(data.role);
        simpleService.parseGroup(data.group);
    },

    parseGroup:function (group) {
        var p = playerService.getPlayer(globalView.getCurrentID());
        if (killGameAreaView.Role.water == p.role) {

        } else {
            playerListView.displayRole(p.role, group);

        }

    },

    parseRole:function (data) {
        if (data == null) {
            return;
        }

        var p = playerService.getPlayer(data.id)
        p.role = data.role;
        playerService.updatePlayer(p);
        playerListView.displayRole(data.role);


    },
    parseGame:function (data) {
        if (data == null) {
            return;
        }

        globalView.setGameStatusHint(killGameAreaView.Phase[data.status]);

        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var uid = globalView.getCurrentID();
        var p = playerService.getPlayer(uid);
        gameView.showSecondArea(p);


    }
}

versionFunction = {
    //处理权限的展示
    "rightView":simpleRightView.rightView,
    //处理权限对应的数据
    "rightContent":commandSimpleSetting,
    //初始化设置
    "initSetting":simpleSettingView.initSetting,
    //获取初始化参数
    "getSettingParameter":simpleSettingView.getSettingParameter,
    "autoSettingShow":simpleSettingView.autoSettingShow,
    //解析消息
    "parseMessage":killController.parseMessage,
    //解析房间Detail,用于页面刷新及进入房间
    "parseDetail":simpleService.parseDetail,
    //设置参数
    "settingPostParameter":settingPostParameter,
    //游戏中发言
    "say":killController.say,
    //游戏中开始游戏的限制
    "readyCount":2,
    //Command Hint
    "commandHint":killGameAreaView.getCommandHint


}


