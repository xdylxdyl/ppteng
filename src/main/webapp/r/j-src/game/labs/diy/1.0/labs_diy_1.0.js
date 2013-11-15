/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */


var timer = null;

var LabsDIYModel = {

    playerStatus:{
        living:"living",
        king:"king"

    },
    role:{
        water:"water",
        king:"king"
    },
    hint:{
        day:"【系统消息】 请大家听从国王的安排"

    },
    commandHint:{
        announce:"游戏结束~",
        kick:"你好,再见",
        private:"让我偷偷的告诉你"

    },

    phase:{
        day:"【当前状态】白天",
        over:"【当前状态】游戏结束 "



    },

    roleName:{
        water:"水民",
        king:"国王"
    },

    rightContent:{
        announce:"结束",
        private:"私聊"

    },
    settingPostParameter:function (rid, version, ghostCount, dayTime, topicTime, questionTime, descriptionTime) {
        return{
            rid:rid,
            version:version,
            setting:[

                {"dayTime":dayTime}


            ]
        }
    }




}


var LabsDIYController = {

    commandCheck:function () {
        var result = {};
        result.code = 0;
        return result;
    },
    parseMessage:function (message) {
        switch (message.predict) {

            case "time" :
                LabsDIYController.timeChange(message);
                break;
            case "die" :
                LabsDIYController.die(message);
                break;
            case "assign" :
                LabsDIYController.assign(message);
                break;

            case "status" :
                LabsDIYController.status(message);
                break;
            case "start" :
                gameView.start(message);
                break;
            case "over" :
                gameView.over(message);
                break;
            case "say":
                LabsDIYController.say(message);
                break;

            case "private":
                LabsDIYController.privateSay(message);
                break;

            default :
                console.log("未写到的动作：" + message.predict);
        }

    },


    assign:function (message) {
        //本地存入自己身份
        //杀手栏展示杀手名单
        var p = playerService.getPlayer(message.object);
        p.role = message.subject;
        playerService.updatePlayer(p);
        LabsDIYView.displayRole(LabsDIYModel.roleName[message.subject]);
        gameView.showSecondArea(p);


    },


    timeChange:function (message) {

        var status = message.subject;

        globalView.setGameStatus(status);

        var status = message.subject;
        var p = playerService.getPlayer(globalView.getCurrentID());

        LabsDIYView.showContentForGameArea(LabsDIYModel.hint[status]);


        switch (status) {
            case "day":
                LabsDIYView.showContentForGameArea(LabsDIYModel.hint.day);
                break;
            default:
                break;

        }


        LabsDIYView.showConentForGamePhase(LabsDIYModel.phase[status]);
        viewUtil.autoBottom($("#" + selects.$gameArea));
        controlView.clearCountDownTime();
        controlView.setCountDownTime(message.object);


    },

    say:function (message) {

        //1.get content from message

        //2.get place from message

        //3.show content at place


        var name;
        if (message.object != -500) {
            name = playerService.getPlayer(message.object).name;
        }

        var p = playerService.getPlayer(message.subject);
        LabsDIYView.say(message.subject, p.name, message.content, message.expression, message.color, message.object, name, "", message.privateContent);


    },

    privateSay:function (message) {

        //1.get content from message

        //2.get place from message

        //3.show content at place


        var name;
        if (message.object != -500) {
            name = playerService.getPlayer(message.object).name;
        }

        var p = playerService.getPlayer(message.subject);
        LabsDIYView.say(message.subject, p.name, message.content, message.expression, message.color, message.object, name, "", "true");


    },


    status:function (message) {
        var id = message.subject;
        var player = playerService.getPlayer(id);
        var name = player.name;
        playerService.setStatus(message.subject, message.object);
        playerListView.setStatus(message.subject, message.object);


    }




};


/**
 * 游戏区域
 */
var LabsDIYView = {
    clearHeadArea:function () {
        LabsDIYView.emptyRole();
    },

    emptyRole:function (card) {


        $("#" + selects.$playerRole).empty();


    },

    displayRole:function (role) {

        var hint = "【角色】" + role;
        $("#" + selects.$playerRole).removeClass().addClass("text-error").empty().html(hint);


    },

    getCommandHint:function (command) {
        return LabsDIYModel.commandHint[command];
    },


    say:function (id, name, content, exp, color, subject, subjectName, command, privateContent) {
        var express = controlView.showExpression(exp);
        var obj;
        if (subject != "-500") {
            obj = " 对 [" + subjectName + " ]";
        } else {
            obj = "";
        }

        var preStr = "";
        if ("true" == privateContent) {
            preStr = "[密]";
        }


        if (!command) {
            command = "";

        }
        //say出现的位置 这个.话说.原来死人说的话是JS控制的么
        //1、死人（dead_area）——a、游戏结束后；b、游戏未结束时。 2、活人——a、白天； b、遗言时； css、晚上（killer_area）。
        var player = playerService.getPlayer(id);
        var place = "normal";


        switch (player.status) {

            case LabsDIYModel.playerStatus.king:

                break;
            case LabsDIYModel.playerStatus.living:
                //delay message
                break;
            case playerStatus.unready:
                if ($("#time").val() == "over") {

                } else {
                    //没有结束

                    place = "deadArea";

                }
                break;

            default :


        }

        switch (place) {
            case "normal":
                $("#" + selects.$gameArea).append("<p style='color:" + color + "'>" + preStr + "[" + name + "] " + express + obj + command + " 说：" + content + "</p>");
                viewUtil.autoBottom($("#" + selects.$gameArea));
                break;
            case "deadArea":
                $("#" + selects.$dieArea).append("<p style='color:" + color + "'>" + preStr + "[" + name + "] " + express + obj + command + " 说：" + content + "</p>");
                viewUtil.autoBottom($("#" + selects.$dieArea));
                break;
            default:
        }


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

        var recordLink = "<a href='/record/enter?recordID=" + recordID + "' target='_blank'>查看战例</a>";
        var shareLink = "http://42.121.113.70/record/enter?recordID=" + recordID;
        var share;
        $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏终止</p> ");

        //时间清空
        clearTimeout(timer);
        timer = null;
        $("#" + selects.$countDown).val("00:00");
        viewUtil.autoBottom($("#" + selects.$gameArea));


    }


}


var LabsDIYRightView = {
    rightView:function (right) {
        switch (right) {
            case "announce" :
                LabsDIYRightView.commandRight(right);
                break;
            case "private" :
                LabsDIYRightView.commandRight(right);
                break;
            default :
                console.log("version view not process right: " + right);
        }
    },

    commandRight:function (right) {
        rightView.showCommandRight(right, LabsDIYModel.rightContent[right]);
        $("#" + selects.$sayButton).prop("disabled", false);
    },
    sayRight:function (right) {
        $("#" + selects.$sayButton).prop("disabled", false);

    },
    commandFilter:function (right) {
        var objectStr = "<li data-default=''><a href='#'>对象</a></li> <li class='divider'></li>";
        $("#object").empty().append(objectStr);


    }



}

var LabsDIYSettingView = {
    initSetting:function () {


        $("#dayTime").val($("#dayTime").val() / 60000);


        $("<span>分</span>").insertAfter("#dayTime");


    },


    getSettingParameter:function () {
        $("#dayTime").val($("#dayTime").val() * 60000);
        var params = jQuery("#setting").serialize();
        return params;
    }

}


var gameView = {
    start:function () {


        $("#" + selects.$startButton).hide();
        $("#" + selects.$gameArea).empty();
        $("#" + selects.$killerArea).empty();
        $("#" + selects.$dieArea).empty();
        $("#" + selects.$playerRole).empty();

        $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏开始,请听从国王的吩咐</p>");

        playerListView.sortPlayer();
        playerListView.clearPlayerNameClass();
        LabsDIYView.clearStatusArea();
        settingView.hideSettingButton();
        gameView.hideDieArea();
        var p = playerService.getPlayer(globalView.getCurrentID());
        gameView.showSecondArea(p);
        notifyUtil.sendNotify("各位大神", "国王生气了，赶紧上朝", "");

    },
    over:function (message) {
        var obj = message.object;
        var recordID = message.subject;
        //标明游戏结束
        globalView.setGameStatusHint("游戏结束");
        globalView.setGameStatus(gameGlobalStatus.over);

        playerService.setUnreadyStatus();
        //只重新显示.不用重新计算
        settingView.displaySetting();


        LabsDIYView.showOver(recordID, obj);
        LabsDIYView.showConentForGamePhase(LabsDIYModel.phase["over"]);
        LabsDIYView.clearHeadArea();
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
    },
    clearDescription:function () {
        $("#" + selects.$description).empty();
    }

}

var LabsDIYService = {
    parseDetail:function (data) {
        roomService.parsePerson(data.person);
        LabsDIYService.parseGame(data.game);
        roomService.parseRight(data.right);
        LabsDIYService.parseRole(data.role);

    },


    parseRole:function (data) {
        if (data == null) {
            return;
        }

        var p = playerService.getPlayer(data.id)
        p.role = data.role;
        playerService.updatePlayer(p);
        LabsDIYView.displayRole(LabsDIYModel.roleName[data.role]);


    },
    parseGame:function (data) {
        if (data == null) {
            return;
        }

        globalView.setGameStatusHint(LabsDIYModel.phase[data.status]);

        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var uid = globalView.getCurrentID();
        var p = playerService.getPlayer(uid);
        gameView.showSecondArea(p);


    }
}

versionFunction = {
    //处理权限的展示
    "rightView":LabsDIYRightView.rightView,
    //处理权限对应的数据
    "rightContent":LabsDIYModel.rightContent,
    //初始化设置
    "initSetting":LabsDIYSettingView.initSetting,
    //获取初始化参数
    "getSettingParameter":LabsDIYSettingView.getSettingParameter,
    "autoSettingShow":LabsDIYSettingView.autoSettingShow,
    //解析消息
    "parseMessage":LabsDIYController.parseMessage,
    //解析房间Detail,用于页面刷新及进入房间
    "parseDetail":LabsDIYService.parseDetail,
    //设置参数
    "settingPostParameter":LabsDIYModel.settingPostParameter,
    //游戏中发言
    "say":LabsDIYController.say,
    //游戏中开始游戏的限制
    "readyCount":0,
    //Command Hint
    "commandHint":LabsDIYView.getCommandHint,
    commandCheck:LabsDIYController.commandCheck,
    commandFilter:LabsDIYRightView.commandFilter


}




