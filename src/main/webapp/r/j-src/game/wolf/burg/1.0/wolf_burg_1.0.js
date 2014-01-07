/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */


var timer = null;


var burgModel = {
    clz:{
        "agree":"text-success",
        "disagree":"text-error",
        "bomb":"text-success",
        "unbomb":"text-error"
    },
    bombBurgCount:0,
    unbombBurgCount:0,
    burgIndex:1,
    attemptCount:1,
    memberCount:2,
    templateConfig:{
        "assignKing":{"template":" 【系统消息】第({native_object}/3)次尝试,{name_subject} 被指定为村长,认真挑选行动小组名单吧~",
            "color":colorConfig.system},
        "assign":{
            updateAngularModel:[
                {id:"navbar-inner",
                    key:"detail.role",
                    value:"",
                    template:"{native_subject}"
                }
            ]
        },
        "dispatch":{"template":" 【系统消息】{name_subject}指定 [{name_object}] 做为今天晚上炸狼堡的名单~~",
            "color":colorConfig.system
        },
        "dismissal":{"template":" 【系统消息】{name_subject} [{hint_object}]了村长给出的小组名单~~ ",
            "color":colorConfig.system,
            "hint":{"agree":"通过",
                "disagree":"否决"}
        },
        "dismissalResult":{"template":" 【系统消息】{name_subject} 在大家的一致表决里,{hint_object} 村长被[{hint_object}]了~~",
            "color":colorConfig.system,
            "hint":{"agree":"通过",
                "disagree":"罢免"}},
        "burgDetail":{"template":" 【系统消息】{native_subject}号狼堡的小组人员数目是[{native_object}]名",
            "color":colorConfig.system
        },
        "die":{"template":" 【系统消息】{name_subject}已经离开房间,宣告死亡", "color":colorConfig.system},
        "action":{"template":"[密] 【系统消息】{name_subject}你对本次狼堡采取的行动是 [{hint_object}] ",
            "color":colorConfig.system,
            "hint":{  "agree":"炸毁",
                "disagree":"不炸"}
        },
        "bombResult":{"template":" 【系统消息】{native_subject}号城堡的结果是 [{hint_object}]",
            "color":colorConfig.system,
            "hint":{"bomb":"成功炸毁",
                "unbomb":"未炸毁"}
        },
        "decryption":{"template":" 【系统消息】{name_subject}的身份是 [{hint_object}]",
            "color":colorConfig.system,
            "hint":{"water":"水民",
                "wolf":"狼人"}
        },
        "time":{"template":"【系统消息】{hint_subject}",
            "color":colorConfig.system,
            "hint":{
                "dispatch":"选人阶段,村长要担负起选择行动小组成员名单的重任了~~",
                "dismissal":"大家要认真审核村长提出的名单~通过投票来决定是否通过~",
                "action":"行动时间到了~~GoGoGo(如果是七人以上,四号狼堡需要至少两个人选择不炸才能保卫成功)",
                "assignKing":"被指定为村长,认真挑选行动小组名单吧~"
            },
            phase:{
                dispatch:"【当前状态】选人",
                dismissal:"【当前状态】审核",
                over:"【当前状态】结束",
                action:"【当前状态】行动"

            },
            updateAngularModel:[
                {id:"navbar-inner",
                    key:"detail.phase",
                    value:"",
                    template:"{native_subject}"
                }
            ]
        },
        "over":{"template":"【系统消息】游戏结束，{hint_object}胜利！~~",
            "color":colorConfig.system,
            "hint":{
                "wolf win":"狼人",
                "water win":"水民"

            }
        },

        "start":{"template":"【系统消息】游戏开始了~狼人和水民们开始狂欢吧~~",
            "color":colorConfig.system

        },
        "say":{    updateAngularModel:[
            {id:"navbar-inner",
                key:"detail.phase",
                value:"",
                template:"{native_subject}"
            }
        ]

        },
        "right":{    updateAngularModel:[
            {id:"footController",
                key:"rights",
                value:"",
                template:"{native_object}",
                update_type:"",
                type:"array",
                filter:"dispatch|dismissal|action",
                box:{
                    dispatch:{
                        title:"选择小组人员名单",
                        content:"村长请指定{model_memberCount}人,做为晚上炸狼堡的人员名单",
                        "source":{method:playerService.getFilterMultiObject, param:"living"},
                        "type":"dialog",
                        "sourceType":"multiSelect",
                        "target":"multiObject",
                        "successCallback":{method:boxUtil.checkMultiCount, param:"{model_memberCount}"},
                        "cancelCallback":"",
                        "predict":"dispatch"
                    },
                    dismissal:{ title:"审核名单",
                        content:"村民们请对村长给出的人员名单给出自己的意见",
                        "source":{method:roomService.getRadioHint, param:"dismissal"},
                        "type":"dialog",
                        "sourceType":"confirm",
                        "target":"object",
                        "successCallback":{method:"", param:"", label:"通过", value:"agree"},
                        "cancelCallback":{method:"", param:"", label:"拒绝", value:"disagree"},
                        "predict":"dismissal"
                    },
                    action:{title:"炸狼堡",
                        content:"是否要炸毁狼堡呢",
                        "source":{method:roomService.getRadioHint, param:"action"},
                        "type":"dialog",
                        "sourceType":"confirm",
                        "target":"object",
                        "successCallback":{method:"", param:"", label:"炸毁", value:"agree"},
                        "cancelCallback":{method:"", param:"", label:"不炸", value:"disagree"},
                        "predict":"action"

                    }

                }
            }
        ]

        }



    },
    dismissalObject:[
        { id:"agree", name:"通过"
        },
        {
            id:"disagree", name:"否决"
        }

    ],
    dismissalResultHint:{
        "agree":"村长给出的名单通过了~",
        "disagree":"村长被罢免了~"

    },
    dismissalActionHint:{
        "agree":"通过",
        "disagree":"否决"

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

    rightContent:{
        dispatch:"指派",
        dismissal:"审核",
        action:"行动"

    }


}

var contentID = {
    dispatch:selects.$gameArea

}
//控制内容区域的显示,包括内容和显示区域
var burgContentView = {



    contentID:function (action) {
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
var burgDetailView = {
    updateDetailTitle:function () {

        $("#detail_process").empty().html("当前进度" + burgModel.burgIndex + "号城堡第" + burgModel.attemptCount + "次尝试,已炸毁狼堡" + burgModel.bombBurgCount + "次,已成功保卫狼堡" + burgModel.unbombBurgCount + "次");

    },
    showDetail:function (burgIndex, attemptCount, suffix, content, clz) {
        var id = "detail_" + burgIndex + "_" + attemptCount + "_" + suffix;
        if (attemptCount == null) {
            id = "detail_" + burgIndex + "_" + suffix;
        } else {

        }
        if (clz == "") {
            clz = "text-warning";
        }
        $("#" + id).empty().removeClass().addClass(clz).html(content);
    }

};

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
        contentTemplate.showContent(message);
        contentTemplate.updateAngularModel(message);
        switch (message.predict) {
            case "assignKing" :
                var p = playerService.getPlayer(message.subject);
                burgPlayerView.changePlayerStatus(message);
                burgModel.attemptCount = parseInt(message.object);
                burgDetailView.showDetail(burgModel.burgIndex, burgModel.attemptCount, "king", p.name, "");
                burgDetailView.updateDetailTitle();
                break;
            case "dispatch" :
                burgDetailView.showDetail(burgModel.burgIndex, burgModel.attemptCount, "member", playerService.getNamesByIds(message.object, ","), "");
                break;
            case "dismissal" :
                break;
            case "dismissalResult" :
                burgDetailView.showDetail(burgModel.burgIndex, burgModel.attemptCount, "dismissal", burgModel.dismissalResultHint[message.object], burgModel.clz[message.object]);
                break;
            case  "burgDetail":
                burgModel.memberCount = parseInt(message.object);
                burgModel.burgIndex = parseInt(message.subject);
                break;
            case "time" :

                /* updateAngularModel:{id:"navbar-inner",
                 key:"detail.phase",
                 value:"",
                 template:"{native_subject}"
                 var m = burgModel.templateConfig[message.predict].updateAngularModel;*/

                //angularUtil.updateModel("navbar-inner","detail.phase", message.subject);

                /* var m = burgModel.templateConfig.time.updateAngularModel;
                 var value = m["template"].template(message);
                 console.log(value);
                 angularUtil.updateModel(m.id, m.key, value);*/

                var status = message.subject;
                globalView.setGameStatus(status);
                controlView.clearCountDownTime();
                controlView.setCountDownTime(message.object);
                break;
            case "die" :
                playerService.die(message)
                gameView.switchArea(message);
                break;
            case "assign" :
                //本地存入自己身份
                playerService.assign(message);
                // burgView.assignRole(message);
                break;
            case "action" :
                break;
            case "bombResult":
                burgDetailView.showDetail(burgModel.burgIndex, burgModel.attemptCount, "action", burgModel.actionResultHint[message.object], burgModel.clz[message.object]);
                burgDetailView.showDetail(burgModel.burgIndex, null, "result", burgModel.actionResultHint[message.object], burgModel.clz[message.object]);
                if ("bomb" == message.object) {
                    burgModel.bombBurgCount++;
                } else {
                    burgModel.unbombBurgCount++;
                }
                burgDetailView.updateDetailTitle();
                break;
            case "decryption" :
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

            default :
                console.log("未写到的动作：" + message.predict);
        }

    },


    say:function (message) {
        var p = playerService.getPlayer(message.subject);
        burgView.say(message.subject, p.name, message.content, message.expression, message.color, message.object, "");

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
var burgView = {
    assignRole:function (message) {
        var player = playerService.getPlayer(message.object);
        var hint = $("#" + selects.$playerRole).text();
        if (hint == "") {
            hint = burgModel.roleHint[message.subject](player.name);
        } else {
            hint = hint + "," + player.name;
        }
        $("#" + selects.$playerRole).removeClass().addClass("text-error").empty().html(hint);
    },
    clearHeadArea:function () {

        burgView.emptyRole();
    },
    emptyRole:function (card) {

        $("#" + selects.$playerRole).empty();

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
        //say出现的位置 这个.话说.原来死人说的话是JS控制的么
        //1、死人（dead_area）——a、游戏结束后；b、游戏未结束时。 2、活人——a、白天； b、遗言时； css、晚上（killer_area）。
        var player = playerService.getPlayer(id);
        var place = "normal";
        switch (player.status) {
            case burgModel.playerStatus.die:
                if ($("#time").val() == "over") {
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

                if ("game" != globalView.getRoomType()) {
                    place = "deadArea";
                }
                break;

            default :


        }
        var str = "<p style='color:" + color + "'>[" + name + "] " + express + obj + " 说：" + content + "</p>";
        var cid = selects.$gameArea;

        switch (place) {
            case "normal":
                break;
            case "deadArea":

                cid = selects.$dieArea;
                break;
            default:
        }
        gameAreaView.showContent(cid, str);

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
        //时间清空
        clearTimeout(timer);
        timer = null;
        $("#" + selects.$countDown).val("00:00");

    },
    displayRole:function (role) {

        var hint = "【角色】" + role;
        $("#" + selects.$playerRole).removeClass().addClass("text-error").empty().html(hint);
    }


}

var burgRightView = {
    rightView:function (right) {
        var message = {};
        message.predict = "right";
        message.object = right;
        contentTemplate.updateAngularModel(message);
    },

    commandRight:function (right) {
        rightView.showCommandRight(right, burgModel.rightContent[right]);
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

        burgModel.burgIndex = 1;
        burgModel.bombBurgCount = 0;
        burgModel.unbombBurgCount = 0;
        burgModel.attemptCount = 1;


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


        burgView.showOver(recordID, obj);
        burgView.showConentForGamePhase(burgModel.phase["over"]);
        burgView.clearHeadArea();
        gameView.showDieArea();
    },
    showDieArea:function () {
        $("#" + selects.$secondArea).show();
        $("#" + selects.$secondArea).removeClass("hide").addClass("col-md-3");
        $("#" + selects.$mainArea).removeClass("col-md-10").addClass("col-md-7");
    },
    hideDieArea:function () {
        $("#" + selects.$secondArea).hide();
        $("#" + selects.$mainArea).removeClass("col-md-7").addClass("col-md-10");
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

var burgService = {

    parseDetail:function (data) {
        roomService.parsePerson(data.person);
        burgService.parseGame(data.game);
        roomService.parseRight(data.right);
        burgService.parseCount(data.votes);
        burgService.parseRole(data.role);
        burgService.parseGroup(data.group);
        burgService.parseKing(data.king);
        burgService.parseBurgs(data.burgs);
    },
    parseKing:function (king) {

        if (king == null) {
            return;
        }
        burgPlayerView.playerHeight(king.id);
    },

    parseBurgs:function (burgs) {
        if (burgs == null) {
            return;
        }
        burgModel.memberCount = burgs[burgModel.burgIndex]["memberCount"];
        burgModel.attemptCount = burgs[burgModel.burgIndex]["attemptCount"];


        $.each(burgs, function (k, v) {
            var burgIndex = k;
            var burg = v;
            $.each(v.actionDetails, function (kt, vt) {
                var nameString = playerService.getNamesByIdLists(vt.members, ",");
                burgDetailView.showDetail(burgIndex, kt, "king", playerService.getPlayer(vt.king).name, "");
                burgDetailView.showDetail(burgIndex, kt, "member", nameString, "");
                burgDetailView.showDetail(burgIndex, kt, "dismissal", burgModel.dismissalResultHint[vt.dismissal], "");
                burgDetailView.showDetail(burgIndex, kt, "action", burgModel.actionResultHint[burg.result], "");
                if ("unkknown" != burg.result) {
                    burgDetailView.showDetail(burgIndex, null, "result", burgModel.actionResultHint[burg.result], burgModel.clz[burg.result]);

                }


            });
        });

        burgDetailView.updateDetailTitle();


    },
    parseCount:function (counts) {
        for (var key in counts) {
            var c = counts[key];
            playerListView.setVote(c.id, c.voters.length)
        }

    },
    parseGroup:function (group) {
        if (group == null) {
            return;
        }
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


        var message = {subject:data.role, predict:"assign"};
        contentTemplate.updateAngularModel(message);


    },
    parseGame:function (data) {
        if (data == null) {
            return;
        }

        //ontentTemplate.updateAngularModel({object:data.status,predict:"time"});


        var message = {subject:data.status, predict:"time"};
        contentTemplate.updateAngularModel(message);


        // globalView.setGameStatusHint(burgModel.phase[data.status]);
        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var uid = globalView.getCurrentID();
        var p = playerService.getPlayer(uid);
        gameView.showSecondArea(p);
        burgModel.burgIndex = data.currentBurg;
        burgModel.bombBurgCount = data.bombBurgCount;
        burgModel.unbombBurgCount = data.unbombBurgCount;

    }
}

versionFunction = {
    //解析消息
    "parseMessage":burgController.parseMessage,
    //解析房间Detail,用于页面刷新及进入房间
    "parseDetail":burgService.parseDetail,
    //游戏中发言
    "say":burgController.say,
    //检查游戏中的指令是否合法
    commandCheck:burgController.commandCheck,
    //指令中的过滤器
    commandFilter:burgRightView.commandFilter,
    //==================我是愤怒的分割线=====以上是逻辑和代码====以下是配置=========//
    //游戏中开始游戏的限制
    "readyCount":4,
    //游戏中开始游戏最大人数的限制
    "readyMaxCount":9,
    //选择命令后的提示
    "commandHint":burgView.getCommandHint,
    //处理权限对应的数据
    "rightContent":burgModel.rightContent,

    "templateConfig":burgModel.templateConfig,
    //角色名字
    "roleName":burgModel.roleName,
    //process right
    rightMessage:true,

    model:burgModel

}

