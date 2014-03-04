/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */


var timer = null;

var ghostQuestionModel = {
    topicHint:"格式不正确,第一个词为水民卡,第二个词为幽灵卡,中间以逗号隔开",
    playerStatus:{
        die:"die",
        living:"living",
        king:"king"

    },
    role:{
        water:"water",
        ghost:"ghost",
        king:"king"
    },
    hint:{
        topic:"【系统消息】国王发现自己的王冠被盗,非常的生气!所以英明的国王打算用一个神奇的办法找出幽灵.他将写出来两种卡片,水民卡和幽灵卡,通过神秘星术的力量,幽灵拿到的只会是幽灵卡",
        day:"【系统消息】 国王在上,感谢您给了你的子民们又一次找出幽灵的机会,我们一定不负重望~",
        question:"【系统消息】提问时间到了~国王还是决定表现一下自己的仁慈,如果幽灵可以猜出国王发的水民卡是什么,那么就可以放你一条生路和~幽灵提出一定数量的问题后,国王用是和不是来回答。",
        description:"【系统消息】生存吧我的子民们,暴怒的国王已经把你们全部浸在了水里,只有说出来自己卡牌才能浮上来~否则的话,就要被淹死了~~~~",
        assignTopic:"【系统消息】国王分给您的卡片是: ",

        dayCount:function (count) {
            return  "【系统消息】幽灵还剩下[" + count + "]天就可获胜,并会成功盗走皇冠~";
        },
        questionCount:function (count) {
            return "【系统消息】幽灵可以向国王提出[" + count + "]个问题~";
        },
        sort:function (content) {
            return "【系统消息】可以按以下顺序描述自己的卡牌,[" + content + "]~,或由国王直接指定~~"
        }
    },
    commandHint:{
        vote:"向国王效忠的时候到了",
        kick:"你好,再见"

    },

    phase:{
        topic:"【当前状态】国王出题",
        day:"【当前状态】白天",
        over:"【当前状态】游戏结束 ",
        question:"【当前状态】提问时间 "


    },

    roleName:{
        water:"水民",
        ghost:"幽灵",
        king:"国王"
    },

    rightContent:{
        vote:"指证",
        topic:"出题",
        answer:"回答",
        description:"描述"
    },
    settingPostParameter:function (rid, version, ghostCount, dayTime, topicTime, questionTime, descriptionTime) {
        return{
            rid:rid,
            version:version,
            setting:[
                {"ghostCount":ghostCount},
                {"dayTime":dayTime},
                {"topicTime":topicTime},
                {"questionTime":questionTime},
                {"descriptionTime":descriptionTime}
            ]
        }
    }




}


var ghostQuestionController = {

    commandCheck:function () {
        var result = {};
        result.code = 0;
        var command = controlView.getCommandValue();
        switch (command) {
            case "topic":

                var content = $("#sayInput").val();
                content = DBC2SBC(content);
                var contents = content.split(",");
                if (contents.length < 2) {
                    result.code = -1;
                    result.message = ghostQuestionModel.topicHint;
                } else {
                    $("#sayInput").val(content);
                }

                break;
            default:
                break;

        }
        return result;
    },
    parseMessage:function (message) {
        switch (message.predict) {
            case "vote" :
                ghostQuestionController.vote(message);
                break;
            case "answer" :
                ghostQuestionController.answer(message);
                break;

            case "set vote" :
                ghostQuestionController.setVote(message);
                break;
            case "clear vote" :
                ghostQuestionController.clearVote(message);
                break;
            case "time" :
                ghostQuestionController.timeChange(message);
                break;
            case "die" :
                ghostQuestionController.die(message);
                break;
            case "assign" :
                ghostQuestionController.assign(message);
                break;
            case "topic assign" :
                ghostQuestionController.topicAssign(message);
                break;
            case "topic" :
                message.object = "-500";
                ghostQuestionController.say(message);
                break;
            case "description" :
                ghostQuestionController.description(message);
                break;
            case "decryption" :
                ghostQuestionController.decryption(message);
                break;
            case "decryption waterCard" :
                ghostQuestionController.decryptionWaterCard(message);
                break;
            case "decryption ghostCard" :
                ghostQuestionController.decryptionGhostCard(message);
                break;
            case "wrong topic":
                ghostQuestionController.wrongTopic(message);
                break;
            case "status" :
                ghostQuestionController.status(message);
                break;
            case "start" :
                gameView.start(message);
                break;

            case "over" :
                gameView.over(message);
                break;
            case "say":
                ghostQuestionController.say(message);
                break;


            case "sort" :
                ghostView.showSort(message);
                break;

            default :
                console.log("未写到的动作：" + message.predict);
        }

    },


    wrongTopic:function (message) {

        $("#" + selects.$gameArea).append("<p style='color:#F00;'> 【系统消息】 [" + message.content + "]不符合规范,第一个词是水民卡,第二个词是幽灵卡,中间以逗号隔开</p>");


    },

    description:function (message) {


        playerListView.setClass(message.subject, "text-error");

        var p = playerService.getPlayer(message.subject);
        ghostView.say(message.subject, p.name, message.content, message.expression, message.color, message.object, "", ghostQuestionModel.rightContent.description);




    },


    decryption:function (message) {

        var role = message.object;
        if (ghostQuestionModel.role.water == role || ghostQuestionModel.role.king == role) {
            return;
        } else {
            var name = playerService.getName(message.subject);
            $("#" + selects.$gameArea).append("<p style='color:#F00;'> 【系统消息】 [" + name + "] 是" + ghostQuestionModel.roleName[message.object] + "</p>");

        }


    },
    decryptionWaterCard:function (message) {
        var name = message.object;

        $("#" + selects.$gameArea).append("<p style='color:#F00;'> 【系统消息】 [水民卡] 是" + name + "</p>");


    },

    decryptionGhostCard:function (message) {
        var name = message.object;

        $("#" + selects.$gameArea).append("<p style='color:#F00;'> 【系统消息】 [幽灵卡] 是" + name + "</p>");


    },


    assign:function (message) {
        //本地存入自己身份
        //杀手栏展示杀手名单
        var p = playerService.getPlayer(message.object);
        p.role = message.subject;
        playerService.updatePlayer(p);
        ghostView.displayRole(ghostQuestionModel.roleName[message.subject]);
        gameView.showSecondArea(p);


    },
    topicAssign:function (message) {

        ghostView.displayCard(message.subject);
        ghostView.showContentForGameArea(ghostQuestionModel.hint.assignTopic + message.subject);

    },


    timeChange:function (message) {

        var status = message.subject;

        globalView.setGameStatus(status);

        var status = message.subject;
        var p = playerService.getPlayer(globalView.getCurrentID());

        ghostView.showContentForGameArea(ghostQuestionModel.hint[status]);


        switch (status) {
            case "day":
                ghostView.showContentForGameArea(ghostQuestionModel.hint.dayCount(message.content));
                break;
            case "question":
                ghostView.showContentForGameArea(ghostQuestionModel.hint.questionCount(message.content));
                break;
            default:
                break;

        }


        ghostView.showConentForGamePhase(ghostQuestionModel.phase[status]);
        viewUtil.autoBottom($("#" + selects.$gameArea));
        controlView.clearCountDownTime();
        controlView.setCountDownTime(message.object);


    },

    say:function (message) {

        //1.get content from message

        //2.get place from message

        //3.show content at place

        var p = playerService.getPlayer(message.subject);
        ghostView.say(message.subject, p.name, message.content, message.expression, message.color, message.object, "");


    },


    status:function (message) {
        var id = message.subject;
        var player = playerService.getPlayer(id);
        var name = player.name;
        playerService.setStatus(message.subject, message.object);
        playerListView.setStatus(message.subject, message.object);


    },

    die:function (message) {

        playerService.setStatus(message.subject, playerStatus.die)
        playerListView.die();
        ghostView.die(message.subject, playerService.getPlayer(message.subject).name, message.object);

        var selfID = globalView.getCurrentID();
        if (selfID == message.subject) {
            var p = playerService.getPlayer(message.subject)
            gameView.showSecondArea(p);
        }


    },
    vote:function (message) {

        if ("day" == globalView.getGameStatus()) {
            ghostView.vote(playerService.getPlayer(message.subject).name,
                playerService.getPlayer(message.object).name, message.color, message.expression, message.content);

        }

    },
    answer:function (message) {


        ghostView.answer(playerService.getPlayer(message.subject).name,
            playerService.getPlayer(message.object).name, message.color, message.expression, message.content);


    },


    setVote:function (message) {

        playerListView.setVote(message.subject, message.object);

    },
    clearVote:function () {
        $("nav li img").text("");
    }



};


function comet(id, parse) {
    var url = "http://42.121.113.70:8000/channel/" + id;
    try {
        cometUtil.polling(url, parse);
    } catch (e) {
        console.log("comet error ,retry " + e);
        cometUtil.polling(url, parse);
    }

}


/**
 * 游戏区域
 */
var ghostView = {
    clearHeadArea:function () {

        ghostView.emptyCard();
        ghostView.emptyRole();
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
        return ghostQuestionModel.commandHint[command];
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
            case ghostQuestionModel.playerStatus.die:
                if ($("#time").val() == "over" || $("#time").val() == "question") {

                } else {
                    //没有结束

                    place = "deadArea";

                }
                break;
            case ghostQuestionModel.playerStatus.king:

                break;
            case ghostQuestionModel.playerStatus.living:
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

        if(ghostQuestionModel.rightContent.description==command){
            $("#" + selects.$description).append("<p style='color:" + color + "'>[" + name + "] " + express + obj + command + " 说：" + content + "</p>");
            viewUtil.autoBottom($("#" + selects.$description));
        }


    },
    description:function(message ,p){

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
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏结束，幽灵胜利！成功盗取皇冠~卖出后可获得2000金币~</p> ");
                share = "这局杀人游戏[简化]中,杀手又赢了~,抢走了2000金币~点此链接回放场景,重现杀人现场: " + shareLink + ";";
                break;
            case "water win" :
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏结束，水民胜利！保卫皇冠成功,将获得国王400金币的奖励~</p> ");
                share = "这局杀人游戏[简化]中,水民又赢了~,赢回了2000金币~点此链接回放场景,重现水民分析实况:" + shareLink + ";";
                break;
            default :
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏终止，国王弃权</p> ");
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
        ghostView.showContentForGameArea(ghostQuestionModel.hint.sort(JSON.stringify(names)))


    }


}


var ghostQuestionRightView = {
    rightView:function (right) {
        switch (right) {
            case "vote" :
                ghostQuestionRightView.commandRight(right);
                break;
            case "topic" :
                ghostQuestionRightView.commandRight(right);
                break;
            case "description" :
                ghostQuestionRightView.commandRight(right);
                break;
            case "answer" :
                ghostQuestionRightView.commandRight(right);
                break;

            default :
                console.log("version view not process right: " + right);
        }
    },

    commandRight:function (right) {
        rightView.showCommandRight(right, ghostQuestionModel.rightContent[right]);
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

var ghostQuestionSettingView = {
    initSetting:function () {


        $("#dayTime").val($("#dayTime").val() / 60000);
        $("#topicTime").val($("#topicTime").val() / 60000);
        $("#questionTime").val($("#questionTime").val() / 60000);
        $("#descriptionTime").val($("#descriptionTime").val() / 60000);

        $("<span>分</span>").insertAfter("#dayTime");
        $("<span>分</span>").insertAfter("#topicTime");
        $("<span>分</span>").insertAfter("#questionTime");
        $("<span>分</span>").insertAfter("#descriptionTime");


    },


    getSettingParameter:function () {
        $("#dayTime").val($("#dayTime").val() * 60000);
        $("#topicTime").val($("#topicTime").val() * 60000);
        $("#questionTime").val($("#questionTime").val() * 60000);
        $("#descriptionTime").val($("#descriptionTime").val() * 60000);
        var params = jQuery("#setting").serialize();
        return params;
    },


    autoSettingShow:function (auto) {
        if (auto) {
            //autosetting
            $("#ghostCountGroup").hide();

        } else {
            $("#ghostCountGroup").show();

        }
    }

}


var gameView = {
    start:function () {


        $("#" + selects.$startButton).hide();
        $("#" + selects.$gameArea).empty();
        $("#" + selects.$killerArea).empty();
        $("#" + selects.$dieArea).empty();
        $("#" + selects.$playerRole).empty();

        $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏开始,臣民们请等国王出题</p>");

        playerListView.sortPlayer();
        playerListView.clearPlayerNameClass();
        ghostView.clearStatusArea();
        settingView.hideSettingButton();
        gameView.hideDieArea();
        gameView.clearDescription();
        var p = playerService.getPlayer(globalView.getCurrentID());
        gameView.showSecondArea(p);
        globalView.setGameStatus("run");
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


        ghostView.showOver(recordID, obj);
        ghostView.showConentForGamePhase(ghostQuestionModel.phase["over"]);
        ghostView.clearHeadArea();
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
    clearDescription:function(){
        $("#"+selects.$description).empty();
    }

}

var ghostSimpleService = {
    parseDetail:function (data) {
        roomService.parsePerson(data.person);
        ghostSimpleService.parseGame(data.game);
        roomService.parseRight(data.right);
        ghostSimpleService.parseCount(data.votes);
        ghostSimpleService.parseRole(data.role);
        ghostSimpleService.parseCard(data.role);
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

        ghostView.displayCard(data.card);
    },

    parseRole:function (data) {
        if (data == null) {
            return;
        }

        var p = playerService.getPlayer(data.id)
        p.role = data.role;
        playerService.updatePlayer(p);
        ghostView.displayRole(ghostQuestionModel.roleName[data.role]);


    },
    parseGame:function (data) {
        if (data == null) {
            return;
        }

        globalView.setGameStatusHint(ghostQuestionModel.phase[data.status]);

        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var uid = globalView.getCurrentID();
        var p = playerService.getPlayer(uid);
        gameView.showSecondArea(p);


    }
}

versionFunction = {
    //处理权限的展示
    "rightView":ghostQuestionRightView.rightView,
    //处理权限对应的数据
    "rightContent":ghostQuestionModel.rightContent,
    //初始化设置
    "initSetting":ghostQuestionSettingView.initSetting,
    //获取初始化参数
    "getSettingParameter":ghostQuestionSettingView.getSettingParameter,
    "autoSettingShow":ghostQuestionSettingView.autoSettingShow,
    //解析消息
    "parseMessage":ghostQuestionController.parseMessage,
    //解析房间Detail,用于页面刷新及进入房间
    "parseDetail":ghostSimpleService.parseDetail,
    //设置参数
    "settingPostParameter":ghostQuestionModel.settingPostParameter,
    //游戏中发言
    "say":ghostQuestionController.say,
    //游戏中开始游戏的限制
    "readyCount":3,
    //Command Hint
    "commandHint":ghostView.getCommandHint,
    commandCheck:ghostQuestionController.commandCheck,
    commandFilter:ghostQuestionRightView.commandFilter


}




