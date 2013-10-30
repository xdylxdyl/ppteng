/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */


var timer = null;

var burgModel = {
    memberCount:2,
    dismissalObject:[
        { id:"agree", name:"通过"
        },
        {
            id:"disagree", name:"不通过"
        }

    ],
    dismissalObjectHint:{
        "agree":"通过",
        "disagree":"不通过"
    },
    actionObject:[
        { id:"agree", name:"炸毁"
        },
        {
            id:"disagree", name:"不炸"
        }

    ],
    actionObjectHint:{
        "agree":"炸毁",
        "disagree":"不炸"
    },

    actionResultHint:{
        "bomb":"成功炸毁",
        "unbomb":"未炸毁"
    },
    king:-500,
    playerStatus:{
        living:"living"


    },
    role:{
        water:"water",
        wolf:"wolf"
    },
    hint:{
        dispatch:"选人阶段,村长要担负起选择行动小组成员名单的重任了~~",
        dismissal:"大家要认真审核村长提出的名单~通过投票来决定是否通过~",
        action:"行动时间到了~~GoGoGo",
        assignKing:"被指定为村长,认真挑选行动小组名单吧~"

    },
    actionHint:{
        dispatch:"做为今天晚上炸狼堡的名单~~"
    },
    commandHint:{
        dispatch:"去吧英勇的葡萄藤人",
        dismissal:"投出神圣的一票",
        action:"这就是我的选择"

    },
    errorHint:{
        dispatch:function (count) {
            return "只能选" + count + "个人亲~~~"
        }
    },
    roleHint:{
        wolf:function (name) {
            return "【狼人名单】 " + JSON.stringify(name);
        },
        water:function (name) {
            return "【身份】水民 "
        }
    },

    phase:{
        dispatch:"【当前状态】选人",
        dismissal:"【当前状态】审核",
        over:"【当前状态】结束",
        action:"【当前状态】行动"


    },

    roleName:{
        water:"水民",
        wolf:"狼人",
        king:"村长"
    },

    rightName:{
        dispatch:"指派",
        dismissal:"审核",
        action:"行动"

    },
    settingPostParameter:function (rid, version, dispatchTime, dismissalTime, actionTime) {
        return{
            rid:rid,
            version:version,
            setting:[
                {"dispatchTime":dispatchTime},
                {"dismissalTime":dismissalTime},
                {"actionTime":actionTime}

            ]
        }
    }




}

var contentID = {
    dispatch:selects.$gameArea

}
//控制内容区域的显示,包括内容和显示区域
var burgContentView = {



    getContentID:function (action) {
        return selects.$gameArea;
    }


};
//控制权限相关的展示,包括权限内容,以及对应的
var burgRightView = {};
//玩家列表相关,如票数,颜色等.
var burgPlayerView = {

    changePlayerStatus:function (message) {

        var predict = message.predict;


        switch (predict) {
            case "assignKing":
                burgPlayerView.playerHeight(message.subject);
                break;
            default :
                break;
        }
    },
    playerHeight:function (id) {
        playerListView.setClass(burgModel.king, "");
        burgModel.king = id;
        playerListView.setClass(id, "text-error");
    }

};
//房间状态相关.如显身身份,当前状态等
var burgRoomView = {};

var burgController = {

    commandCheck:function () {
        var result = {};
        result.code = 0;
        var command = controlView.getCommandValue();
        switch (command) {
            case "dispatch":
                //检查人数是否符合要求
                var users = controlView.multiObject;
                if (users.length != burgModel.memberCount) {
                    result.code = -1;
                    result.message = burgModel.errorHint["dispatch"](burgModel.memberCount);
                } else {

                }

                break;
            default:
                break;

        }
        return result;
    },
    parseMessage:function (message) {
        switch (message.predict) {
            case "assignKing" :

                var content = {
                    color:message.color,
                    expression:controlView.showExpression(message.expression),
                    subject:playerService.getPlayer(message.subject).name,
                    firstAction:"第" + message.object + "次",
                    content:burgModel.hint[message.predict]
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);
                burgPlayerView.changePlayerStatus(message);
                break;

            case "dispatch" :

                var ids = splitString2Array(message.object, ",");
                var names = [];
                for (var index in ids) {
                    var name = playerService.getPlayer(ids[index]).name
                    names.push(name);
                }

                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:playerService.getPlayer(message.subject).name,
                    firstAction:"指定",
                    content:"[ " + array2splitString(names, ",") + " ]" + burgModel.actionHint[message.predict]
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);
                break;
            case "dismissal" :

                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:playerService.getPlayer(message.subject).name,
                    firstAction:"对行动小组的名单表决结果为",
                    content:"[ " + burgModel.dismissalObjectHint[message.object] + " ]"
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);

                break;
            case "dismissalResult" :

                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:playerService.getPlayer(message.subject).name,
                    firstAction:"给出的行动小组名单表决结果为",
                    content:"[ " + burgModel.dismissalObjectHint[message.object] + " ]"
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);

                break;

            case  "burgDetail":
                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:message.subject + "号狼堡",
                    firstAction:"的小组人员数是",
                    content:"[ " + message.object + " ]"
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);
                burgModel.memberCount = parseInt(message.object);


                break;

                break;


            case "set dismissal" :
                burgController.setVote(message);
                break;
            case "clear dismissal" :
                burgController.clearVote(message);
                break;
            case "time" :
                burgController.timeChange(message);
                break;
            case "die" :
                playerService.die(message)
                gameAreaView.showMessageContent(message);
                gameView.switchArea(message);
                break;
            case "assign" :
                //本地存入自己身份
                playerService.assign(message);
                wolfView.assignRole(message);

                break;
            case "action" :

                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:playerService.getPlayer(message.subject).name,
                    firstAction:"你对本次狼堡采取的行动是",
                    content:"[ " + burgModel.actionObjectHint[message.object] + " ]"
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);
                break;


            case "bombResult":
                var name = message.subject + "号城堡"
                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:name,
                    firstAction:"的结果是",
                    content:"[ " + burgModel.actionResultHint[message.object] + " ]"
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);
                break;
            case "decryption" :

                var content = {
                    color:colorConfig.system,
                    expression:controlView.showExpression(message.expression),
                    subject:playerService.getPlayer(message.subject).name,
                    firstAction:"的身份是",
                    content:"[ " + burgModel.roleName[message.object] + " ]"
                }
                var contentID = selects.$gameArea;
                var c = contentTemplate.generateSystemContent(content)
                gameAreaView.showContent(contentID, c);
                break;

            case "status" :
                burgController.status(message);
                break;
            case "start" :
                gameView.start(message);
                break;

            case "over" :
                gameView.over(message);
                break;
            case "say":
                burgController.say(message);
                break;
            case "sort" :
                wolfView.showSort(message);
                break;

            default :
                console.log("未写到的动作：" + message.predict);
        }

    },


    timeChange:function (message) {

        var status = message.subject;
        globalView.setGameStatus(status);
        controlView.clearCountDownTime();
        controlView.setCountDownTime(message.object);

        var content = {
            color:message.color,
            expression:controlView.showExpression(message.expression),
            subject:playerService.getPlayer(message.subject).name,
            firstAction:"",
            content:burgModel.hint[message.subject]
        }
        var contentID = selects.$gameArea;
        var c = contentTemplate.generateSystemContent(content)
        gameAreaView.showContent(contentID, c);


    },

    say:function (message) {

        //1.get content from message

        //2.get place from message

        //3.show content at place

        var p = playerService.getPlayer(message.subject);
        wolfView.say(message.subject, p.name, message.content, message.expression, message.color, message.object, "");


    },


    status:function (message) {
        var id = message.subject;
        var player = playerService.getPlayer(id);
        var name = player.name;
        playerService.setStatus(message.subject, message.object);
        playerListView.setStatus(message.subject, message.object);


    },


    isShowDispatch:function (message) {
        if ("day" == globalView.getGameStatus()) {
            return true;
        } else {
            return false;
        }
    },
    answer:function (message) {


        wolfView.answer(playerService.getPlayer(message.subject).name,
            playerService.getPlayer(message.object).name, message.color, message.expression, message.content);


    },


    setVote:function (message) {

        playerListView.setVote(message.subject, message.object);

    },
    clearVote:function () {
        $("nav li img").text("");
    }



};


/**
 * 游戏区域
 */
var wolfView = {
    assignRole:function (message) {
        var player=playerService.getPlayer(message.object);
        var hint = $("#" + selects.$playerRole).text();
        if (hint == "") {
            hint = burgModel.roleHint[message.subject](player.name);
        } else {
            hint = hint + "," + player.name;
        }
        $("#" + selects.$playerRole).removeClass().addClass("text-error").empty().html(hint);
    },
    systemContent:function (message) {
        console.log(message.predict + " get system content");
        var c = burgModel.hint[message.predict];
        var content = {
            color:message.color,
            expression:controlView.showExpression(message.expression),
            subject:playerService.getPlayer(message.subject).name,
            firstAction:first,
            content:c
        }


        console.log(content);
        return content;

    },
    content:function (message) {
        return burgModel.roleName[message.object];
    },
    clearHeadArea:function () {

        wolfView.emptyCard();
        wolfView.emptyRole();
    },
    emptyCard:function (card) {

        $("#" + selects.$playerCard).empty();


    },

    emptyRole:function (card) {


        $("#" + selects.$playerRole).empty();


    },
    displayCard:function (card) {

        if (card == "" || card == undefined) {
            return;
        }
        var hint = "【卡牌】" + card;
        $("#" + selects.$playerCard).removeClass().addClass("text-error").empty().html(hint);


    },
    displayRole:function (role) {

        var hint = "【角色】" + role;
        $("#" + selects.$playerRole).removeClass().addClass("text-error").empty().html(hint);


    },

    getCommandHint:function (command) {
        return burgModel.commandHint[command];
    },


    say:function (id, name, content, exp, color, subject, subjectName, command) {
        var express = controlView.showExpression(exp);
        var obj;
        if (subject != "-500") {
            obj = " 对 [" + subjectName + " ]";
        } else {
            obj = "";
        }

        if (!command) {
            command = "";

        }
        //say出现的位置 这个.话说.原来死人说的话是JS控制的么
        //1、死人（dead_area）——a、游戏结束后；b、游戏未结束时。 2、活人——a、白天； b、遗言时； css、晚上（killer_area）。
        var player = playerService.getPlayer(id);
        var place = "normal";


        switch (player.status) {
            case burgModel.playerStatus.die:
                if ($("#time").val() == "over" || $("#time").val() == "question") {

                } else {
                    //没有结束

                    place = "deadArea";

                }
                break;
            case burgModel.playerStatus.king:

                break;
            case burgModel.playerStatus.living:
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
                $("#" + selects.$gameArea).append("<p style='color:" + color + "'>[" + name + "] " + express + obj + command + " 说：" + content + "</p>");
                viewUtil.autoBottom($("#" + selects.$gameArea));
                break;
            case "deadArea":
                $("#" + selects.$dieArea).append("<p style='color:" + color + "'>[" + name + "] " + express + obj + command + " 说：" + content + "</p>");
                viewUtil.autoBottom($("#" + selects.$dieArea));
                break;
            default:
        }

        if (burgModel.rightName.description == command) {
            $("#" + selects.$description).append("<p style='color:" + color + "'>[" + name + "] " + express + obj + command + " 说：" + content + "</p>");
            viewUtil.autoBottom($("#" + selects.$description));
        }


    },
    description:function (message, p) {

        $("#" + selects.$gameArea).append("<p style='color:" + color + "'>[" + p.name + "] " + express + obj + command + " 说：" + content + "</p>");
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },
    vote:function (subjectName, objectName, color, exp, content) {


        $("#" + selects.$gameArea).append("<p style='font-weight:bold;color:" + color + "'>[" + subjectName + "] " + controlView.showExpression(exp) + " 指证 [" + objectName + "] 说 : " + content + " </p>");
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },

    answer:function (subjectName, objectName, color, exp, content) {


        $("#" + selects.$gameArea).append("<p style='font-weight:bold;color:" + color + "'>[" + subjectName + "] " + controlView.showExpression(exp) + " 回答 : " + content + " </p>");
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },


    die:function (id, name, action) {
        $("#" + id).children("a").removeClass().addClass("die");
        switch (action) {
            case "vote":
                $("#" + selects.$gameArea).append("<p style='color:#F00;'>【系统消息】 积毁销骨，众口铄金，[" + name + "]你就认命吧！</p>");

                break;
            case "drown":
                $("#" + selects.$gameArea).append("<p style='color:#F00;'>【系统消息】[" + name + "]无视国王的权威,失去了证明自己清白的机会.就这么被淹死了</p>");

                break;
            default :
                ;
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
        switch (obj) {
            case "ghost win" :
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏结束，狼人胜利！</p> ");
                share = "这局杀人游戏[简化]中,杀手又赢了~,抢走了2000金币~点此链接回放场景,重现杀人现场: " + shareLink + ";";
                break;
            case "water win" :
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏结束，水民胜利！</p> ");
                share = "这局杀人游戏[简化]中,水民又赢了~,赢回了2000金币~点此链接回放场景,重现水民分析实况:" + shareLink + ";";
                break;
            default :
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏终止</p> ");
        }


        //时间清空
        clearTimeout(timer);
        timer = null;
        $("#" + selects.$countDown).val("00:00");
        viewUtil.autoBottom($("#" + selects.$gameArea));


    },
    showSort:function (message) {
        var list = JSON.parse(message.object)
        var names = [];
        for (var l in list) {
            var player = playerService.getPlayer(list[l]);
            names.push(player.name)
        }
        wolfView.showContentForGameArea(burgModel.hint.sort(JSON.stringify(names)))


    }


}


var wolfRightView = {
    branchRight:function (right) {
        switch (right) {
            case "dispatch":
                // wolfRightView.dispatch(right);
                wolfRightView.commandRight(right);
                break;
            default :
                wolfRightView.commandRight(right);

        }

    },
    dispatch:function (right) {

        rightView.showCommandRight(right, burgModel.rightName[right]);
        $("#" + selects.$sayButton).prop("disabled", false);


    },

    commandRight:function (right) {
        rightView.showCommandRight(right, burgModel.rightName[right]);
        $("#" + selects.$sayButton).prop("disabled", false);
    },
    sayRight:function (right) {
        $("#" + selects.$sayButton).prop("disabled", false);

    },
    commandFilter:function (right, playerList) {


        switch (right) {
            case "dispatch":
                controlView.filterMultiObject("living", playerList);
                break;

            case "dismissal":
                controlView.filterDIYObject(burgModel.dismissalObject)
                break;

            case "action":
                controlView.filterDIYObject(burgModel.actionObject)
                break;
            default :
                var objectStr = "<li data-default=''><a href='#'>对象</a></li> <li class='divider'></li>";
                $("#object").empty().append(objectStr);

                break;
        }


    }



}

var wolfSettingView = {
    timeSetting:["dispatchTime", "dismissalTime", "actionTime"],

    initSetting:function () {

        for (var index in wolfSettingView.timeSetting) {
            var dom = $("#" + wolfSettingView.timeSetting[index]);
            dom.val(dom.val() / 60000);
            $("<span>分</span>").insertAfter(dom);
        }
    },

    getSettingParameter:function () {
        for (var index in wolfSettingView.timeSetting) {
            var dom = $("#" + wolfSettingView.timeSetting[index]);
            dom.val(dom.val() * 60000);
        }
        var params = jQuery("#setting").serialize();
        return params;
    },


    autoSettingShow:function (auto) {

    }

}


var gameView = {
    switchArea:function (message) {
        switch (message.predict) {
            case "die":
                var selfID = globalView.getCurrentID();
                if (selfID == message.subject) {
                    var p = playerService.getPlayer(message.subject)
                    gameView.showSecondArea(p);
                }
                break;
        }

    },
    startEmpty:[selects.$gameArea, selects.$killerArea, selects.$killerArea, selects.$dieArea, selects.$playerRole, selects.$gamePhase],
    hideEmpty:[selects.$startButton, selects.$submitSetting, selects.$multiObjectGroup],
    start:function () {

        //1.hide
        for (var index in gameView.hideEmpty) {
            $("#" + gameView.hideEmpty[index]).hide();
        }
        //2.empty
        for (var index in gameView.startEmpty) {
            $("#" + gameView.startEmpty[index]).empty();
        }

        $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏开始了~狼人和水民们开始狂欢吧</p>");

        playerListView.sortPlayer();
        playerListView.clearPlayerNameClass();

        gameView.hideDieArea();
        var p = playerService.getPlayer(globalView.getCurrentID());
        gameView.showSecondArea(p);
        notifyUtil.sendNotify("各位大神", "前方发现狼堡,速度归队", "");

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


        wolfView.showOver(recordID, obj);
        wolfView.showConentForGamePhase(burgModel.phase["over"]);
        wolfView.clearHeadArea();
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
        if (playerStatus.die == p.status || playerStatus.unready == p.status || playerStatus.king == p.status) {
            gameView.showDieArea();
        } else {
            gameView.hideDieArea();
        }
    },
    clearDescription:function () {
        $("#" + selects.$description).empty();
    }

}

var ghostSimpleService = {
    parseDetail:function (data) {
        roomService.parsePerson(data.person);
        ghostSimpleService.parseGame(data.game);
        roomService.parseRight(data.right);
        ghostSimpleService.parseCount(data.votes);
        ghostSimpleService.parseRole(data.role);
        ghostSimpleService.parseGroup(data.group);
        ghostSimpleService.parseKing(data.king);
        ghostSimpleService.parseBurg(data.burg);
    },
    parseKing:function (king) {

        if (king == null) {
            return;
        }
        burgPlayerView.playerHeight(king.id);
    },

    parseBurg:function (burg) {
        if (burg == null) {
            return;
        }
        burgModel.memberCount = burg["memberCount"];
    },
    parseCount:function (counts) {
        for (var key in counts) {
            var c = counts[key];
            playerListView.setVote(c.id, c.voters.length)
        }

    },
    parseCard:function (data) {
        if (data == null) {
            return;
        }

        wolfView.displayCard(data.card);
    },

    parseGroup:function (group) {
        var p = playerService.getPlayer(globalView.getCurrentID());
        if ("water" == p.role) {

        } else {
            var names = playerService.getGroupNames(group);
            var hint = burgModel.roleHint.wolf(names);
            $("#" + selects.$playerRole).removeClass().addClass("text-error").empty().html(hint);


        }
    },
    parseRole:function (data) {
        if (data == null) {
            return;
        }

        var p = playerService.getPlayer(data.id)
        p.role = data.role;
        playerService.updatePlayer(p);
        wolfView.displayRole(burgModel.roleName[data.role]);


    },
    parseGame:function (data) {
        if (data == null) {
            return;
        }

        globalView.setGameStatusHint(burgModel.phase[data.status]);

        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var uid = globalView.getCurrentID();
        var p = playerService.getPlayer(uid);
        gameView.showSecondArea(p);


    }
}

versionFunction = {
    //处理权限的展示
    "rightView":wolfRightView.branchRight,
    //处理权限对应的数据
    "rightContent":burgModel.rightName,
    //初始化设置
    "initSetting":wolfSettingView.initSetting,
    //获取初始化参数
    "getSettingParameter":wolfSettingView.getSettingParameter,
    "autoSettingShow":wolfSettingView.autoSettingShow,
    //解析消息
    "parseMessage":burgController.parseMessage,
    //解析房间Detail,用于页面刷新及进入房间
    "parseDetail":ghostSimpleService.parseDetail,
    //设置参数
    "settingPostParameter":burgModel.settingPostParameter,
    //游戏中发言
    "say":burgController.say,
    //游戏中开始游戏的限制
    "readyCount":4,
    //playercount -1
    "readyMaxCount":4,
    //Command Hint
    "commandHint":wolfView.getCommandHint,
    commandCheck:burgController.commandCheck,
    commandFilter:wolfRightView.commandFilter,
    contentID:burgContentView.getContentID,
    content:wolfView.content,
    systemContent:wolfView.systemContent

}




