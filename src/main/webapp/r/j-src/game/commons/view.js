/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-8
 * Time: 下午4:41
 * To change this template use File | Settings | File Templates.
 */



var commandText = {
    kick:"果断一脚",
    vote:"投他一票",
    kill:"杀人灭口",
    check:"查证身份"

};


var sayHint = {
    empty:"不能为空啊",
    select:"先选个人啊"
}

var defaultHint = {
    command:"<li data-default='say'><a href='#'>指令</a></li><li class='divider'></li>",
    object:"<li data-default='-500'><a href='#'>对象</a></li><li class='divider'></li>"
}

var settingView = {

    displaySetting:function () {
        if (globalView.getCurrentID() == globalView.getCreaterId()) {
            if (gameGlobalStatus.over == globalView.getGameStatus()) {//游戏结束后才能看到设置按钮
                $("#" + selects.$submitSetting).show();

            } else {
                $("#" + selects.$submitSetting).hide();

            }
        } else {
            $("#" + selects.$submitSetting).hide();

        }

    },
    resetTime:function () {
        $(".settingConfig").each(function () {
            var id = $(this).attr("id");
            if (id.indexOf("Time") >= 0) {
                $(this).val($(this).val() / 60000);
                $("<span>分</span>").insertAfter($(this));
            } else {

            }

        });
    },
    getDefaultSettingParameter:function () {
        $(".settingConfig").each(function () {
            var id = $(this).attr("id");
            if (id.index("Time") >= 0) {
                $(this).val($(this).val() * 60000);
            } else {

            }

        });

        var params = jQuery("#setting").serialize();
        return params;

    },

    showSetting:function (info) {
        $("#" + selects.$settingArea).html(info);
        //管理员才能看到设置按钮

        if (globalView.getCurrentID() == globalView.getCreaterId()) {
            if (gameGlobalStatus.over == globalView.getGameStatus()) {//游戏结束后才能看到设置按钮
                $("#" + selects.$submitSetting).show();

            } else {
                $("#" + selects.$submitSetting).hide();

            }
        } else {
            $("#" + selects.$submitSetting).hide();

        }

        settingView.showAutoSetting();
        if (versionFunction["initSetting"]) {
            versionFunction["initSetting"]()
        } else {
            settingView.resetTime();


        }

        $("#autoSettingCheckBox").on("click", function () {

            if (settingView.getAutoSetting()) {
                settingView.autoSetting(true);


            } else {
                settingView.autoSetting(false);

            }
            ;


        });


        $("#" + selects.$submitSetting).bind("click", function () {
            var s;
            if (versionFunction["getSettingParameter"]) {
                s = versionFunction["getSettingParameter"]();
            } else {
                s = settingView.getDefaultSettingParameter();
            }

            var settingHtml = settingService.saveSetting(s);
            alert("设置已更改~~");

            if (versionFunction["settingCallback"]) {
                versionFunction["settingCallback"]();
            }
            settingView.showSetting(settingHtml);

        });


    },
    existAutoSetting:function () {
        if ($("#autoSetting").length != 0) {
            return true;
        } else {
            return false;
        }
    },
    showAutoSetting:function () {

        if (settingView.existAutoSetting()) {
            if (settingView.getDefaultAutoSetting()) {
                var html = "<label for='autoSettingCheckBox' class='checkbox'><input type='checkbox' checked='checked' id='autoSettingCheckBox'>自动设置</label>"
                $("#" + selects.$settingArea).prepend(html);
                settingView.autoSetting(true);
            } else {
                var html = "<label for='autoSettingCheckBox' class='checkbox'><input type='checkbox' id='autoSettingCheckBox'>自动设置</label>"
                $("#" + selects.$settingArea).prepend(html);
                settingView.autoSetting(false);
            }
        } else {

        }

    },

    hideSettingButton:function () {
        $("#" + selects.$submitSetting).hide();

    },
    showSettingButton:function () {
        $("#" + selects.$submitSetting).show();
    },
    getSettingParameter:function (fun) {
        return fun;
    },
    autoSetting:function (auto) {
        if (auto) {
            //autosetting
            $("#ghostCountGroup").hide();
            $("#autoSettingGroup").hide();

            ;
            $("#autoSetting").val("true");

        } else {
            $("#ghostCountGroup").show();
            // $("#autoSettingGroup").show();
            $("#autoSettingGroup").hide();
            $("#autoSetting").val("false");

        }
        if (versionFunction["autoSettingShow"]) {
            versionFunction["autoSettingShow"](auto);
        }


    },
    getAutoSetting:function () {

        return $("#autoSettingCheckBox").prop("checked");
    },
    getDefaultAutoSetting:function () {
        if ($("#autoSetting").val() == "true") {
            return true;
        } else {
            return false;
        }
        ;
    }

}


var globalView = {
    showSelf:function (player) {
        $("#playerName").empty().text(player.name);
    },

    getGameStatus:function () {
        return   $("#time").val();
    },
    getFirst:function () {
        return $("#first").val();
    },
    setGameStatus:function (status) {
        $("#time").val(status);
    },
    setGameStatusHint:function (status) {
        $("#" + selects.$gamePhase).empty().html(status);

    },
    isStop:function () {
        if ($("#time").val() == "over") {
            return true;
        } else {
            return false;
        }
    },
    getCurrentID:function () {
        return $("#uid").val();
    },
    getRoomID:function () {
        return $("#rid").val();
    },
    getVersion:function () {
        return  $("#version").val();
    },
    getCreaterId:function () {
        return $("#createrID").val();
    },
    getRoomType:function () {
        return $("#type").val();
    },
    getRecordId:function () {
        return $("#recordID").val();
    },
    getRecordTime:function () {
        return $("#recordTime").val();
    },
    getLoginShow:function () {
        return $("#stageShow").text();
    },
    showPlayerList:function (elem) {
        $(elem).text('-');
        $('#' + selects.$sidebarNav).animate({left:0});
        $('#' + selects.$content).animate({marginLeft:200});
    },
    hidePlayerList:function (elem) {
        $(elem).text('+');
        $('#' + selects.$sidebarNav).animate({left:-180});
        $('#' + selects.$content).animate({marginLeft:20});
    }


}


/**
 * 玩家列表区域
 */

var playerListView = {
    login:function (player) {
        var name = player.name;
        var id = player.id;
        //判断是否已经存在这个玩家的List了.
        if (this.isExistPlayer(id)) {

        } else {
            this.appendPlayerItem(player);
        }

    },
    logout:function (id) {
        $("#" + id).remove();
    },

    isExistPlayer:function (id) {
        var id_li = $("#" + id);
        if (id_li.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    setVote:function (id, count) {
        if (count == 0) {
            $("#" + id + "_vote").text("");
            $("#" + id + "_vote").attr("count", 0);

        } else {
            $("#" + id + "_vote").text(" +" + count);
            $("#" + id + "_vote").attr("count", count);
        }
    },
    displayCreater:function (player) {

        $("#" + selects.$createName).empty().html("管理员:" + player.name);

    },

    displayRole:function (role, group) {
        var hint = "";
        switch (role) {
            case killGameAreaView.Role.water:
                break;
            case killGameAreaView.Role.killer:
                var names = playerService.getGroupNames(group);
                hint = killGameAreaView.RoleHint.killer(names);
                break;
            case killGameAreaView.Role.police:
                var names = playerService.getGroupNames(group);
                hint = killGameAreaView.RoleHint.police(names);
                break;
            default:
                break;
        }


        $("#" + selects.$playerRole).removeClass().empty().html(hint);
        if (killGameAreaView.Role.killer == role || killGameAreaView.Role.police == role) {
            $("#" + selects.$playerRole).addClass("text-error");
        }


    },
    appendRole:function (player) {
        var role = player.role;
        var hint = $("#" + selects.$playerRole).text();
        switch (role) {
            case killGameAreaView.Role.water:
                hint = killGameAreaView.RoleHint.water;
                break;
            case killGameAreaView.Role.killer:
                if (hint == "") {
                    hint = killGameAreaView.RoleHint.appendKiller(player.name);
                } else {
                    hint = hint + "," + player.name;
                }

                break;
            case killGameAreaView.Role.police:
                if (hint == "") {
                    hint = killGameAreaView.RoleHint.appendPolice(player.name);
                } else {
                    hint = hint + "," + player.name;
                }
                break;

            default:
                break;
        }


        $("#" + selects.$playerRole).removeClass().empty().html(hint);
        if (killGameAreaView.Role.killer == role || killGameAreaView.Role.police == role) {
            $("#" + selects.$playerRole).addClass("text-error");
        }


    },
    sortPlayer:function () {

        var sortPlayers = playerService.getAll();

        $("#" + selects.$playerList).empty();
        //清空列表

        for (var index in sortPlayers) {
            var player = playerService.getPlayer(sortPlayers[index]);
            this.appendPlayerItem(player);

        }

    },
    appendPlayerItem:function (player) {
        var voteID = player.id + "_vote";
        var nameID = player.id + "_name";
        if (player.count == 0) {

            var item = "<li id='" + player.id + "'><a href='/player/detail?uid=" + player.id + "' target='_blank'><i class='icon-" + player.status + "'></i><span id='" + nameID + "'>" + player.name + "</span><span class='vote' id='" + voteID + "'></span></a></li>";
            $("#" + selects.$playerList).append(item);
        } else {
            var item = "<li id='" + player.id + "'><a href='/player/detail?uid=" + player.id + "' target='_blank'><i class='icon-" + player.status + "'></i><span id='" + nameID + "'>" + player.name + "<span class='vote' id='" + voteID + "'>+" + player.count + "</span></a></span></a></li>";
            $("#" + selects.$playerList).append(item);


        }


    },
    die:function () {
        this.sortPlayer();
    },
    setStatus:function (id, status) {
        this.sortPlayer();
    },
    kill:function (id) {

        //this.setStatus(id, playerStatus.die);
    },
    living:function () {
        this.sortPlayer();
    },
    setClass:function (id, clasz) {
        var nameId = id + "_name";
        $("#" + nameId).removeClass().addClass(clasz);

    },
    clearPlayerNameClass:function () {
        for (var key in id_name) {
            this.setClass(key, "");


        }
    }



}


//处理权限
var rightView = {
    branch:function (right) {
        switch (right) {
            case "say" :
                this.sayRight(right);
                break;
            case "ready" :
                this.readyRight();
                break;
            case "start" :
                this.startRight();
                break;
            case "kick" :
                this.commandRight(right);
                break;
            case "" :
                this.noRight();
                break;
            default :
                console.log("Commons view not process right: " + right + " start version view ");
                if (versionFunction["rightView"]) {
                    versionFunction["rightView"](right);
                } else {
                    if (versionFunction["rightContent"]) {
                        rightView.showCommandRight(right, versionFunction["rightContent"][right]);
                    } else {

                    }

                }
        }


    },
//各种权利
    sayRight:function (right) {
        $("#" + selects.$sayButton).prop("disabled", false);
    },
    readyRight:function () {
        $("#" + selects.$readyButton).show();


    },
    startRight:function () {
        $("#" + selects.$startButton).show();
    },
    commandRight:function (right) {
        ;

        $("#command").append("<li data-default='" + right + "'><a href='#'>" + commandText[right] + "</a></li>");
    },
    showCommandRight:function (right, name) {


        $("#command").append("<li data-default='" + right + "'><a href='#'>" + name + "</a></li>");
    },

    noRight:function () {

        $("#" + selects.$sayButton).prop("disabled", true);
        $("#" + selects.$readyButton).hide();
        $("#" + selects.$startButton).hide();
        controlView.resetCommand();
        controlView.emptyCommand();
        controlView.resetObject();
        controlView.emptyObject();


    },
    getContentByRight:function (right) {
        var c = commandCommonSetting[right];
        if (c) {
            return c;
        } else {
            return versionFunction["rightContent"][right];
        }
    }
}


var gameAreaView = {
/*    showMessageContent:function (message, type) {
        var content = "";
        switch (type) {
            case "system":
                content = viewUtil.message2SystemContent(message);
                break;
            case "user":
                content = viewUtil.message2UserContent(message);

                break;
            default :
                content = viewUtil.message2UserContent(message);
                break;
        }

        var contentID =selects.$gameArea;
        if(versionFunction["contentID"]){
            var contentID = versionFunction["contentID"](message.predict);
        }else{

        }

        gameAreaView.showContent(contentID, content);

    },*/

    updateRubbishText:function () {

        var countStr = $("#rubbish").attr("count");
        if (countStr == undefined || countStr == "") {
            countStr = 0;
        }
        var count = parseInt(countStr) + 1;
        $("#" + selects.$gameArea).empty().append("<p style='color:#F00'id='rubbish' count='" + count + "'>" +
            "【系统消息】您曾在上一个房间里挂过尸,目前正在为您处理第[" + count + "]条过期消息,请耐心等待,上个房间挂尸期间较长,处理过期消息时间就越长" +
            "</p>");

    },
    completeRubbishText:function () {
        var countStr = $("#rubbish").attr("count");
        if (countStr == undefined || countStr == "") {
            return;
        } else {
            var count = parseInt(countStr);
            $("#" + selects.$gameArea).empty().append("<p style='color:#F00'id='rubbish'>" +
                "【系统消息】共" + count + "条过期消息处理完成,您现在可以正常游戏,如果不想接收上个房间的过期消息,离开房间时请点右上角[退出]>按钮,正常离开房间~~" +
                "</p>");
        }
    },
    login:function (player, message, first) {

        var action;
        if (message == null || message.content == "") {
            action = "";
        } else {
            action = message.content;
        }


        var name = player.name;
        var isDisplay = gameAreaView.isDisplayStage(player, first);
        var ptitle = gameAreaView.getPlayerTitle(player);
        ptitle = "[" + ptitle + "]的";
        var animal = "animated flip";
        if (isDisplay) {
            //只有房间是处在结束状态下才在游戏区显示消息
            $("#" + selects.$gameArea).append("<p style='color:#F00' class='" + animal + "'>【系统消息】" + ptitle + "[" + name + "]" + action + "进入了房间</p>");
            viewUtil.autoBottom($("#" + selects.$gameArea));
        } else {
            //不显示

        }

    },
    getPlayerTitle:function (player) {
        var money = player.money;
        var level = gameAreaView.getPlayerLever(money);
        return ptitle[level];

    },
    getPlayerLever:function (money) {


        var unit = 10000;
        //2万
        if (money < 2 * unit) {
            return 1;
        }
        //10万
        if (money < 10 * unit) {
            return 2;
        }
        //50万
        if (money < 50 * unit) {
            return 3;
        }
        //100万
        if (money < 100 * unit) {
            return 4;
        }
        //200万
        if (money < 200 * unit) {
            return 5;
        }//500万
        if (money < 500 * unit) {
            return 6;
        }
        //1000万
        if (money < 1000 * unit) {
            return 7;
        }
        //5000万
        if (money < 5000 * unit) {
            return 8;
        }
        //一个亿
        if (money < 10000 * unit) {
            return 9;
        }

        return 10


    },
    isDisplayStage:function (player, first) {
        if (globalView.isStop()) {
            // game must stop
            var sid = globalView.getCurrentID();
            if (player.id != sid) {
                // if not self .display
                return true;
            } else {

                if ("notFirst" == first || first == undefined || first == "") {
                    //not first ,means refresh.not display.or come from login message
                    return false;

                } else {
                    // is self,if first ,display
                    return true;
                }
            }

        } else {
            return false;
        }
    },
    logout:function (player) {
        var name = player.name;
        var isDisplay = false;
        if (globalView.isStop()) {
            //游戏不运行时.都应该展示
            isDisplay = true;
        } else {
            if (playerStatus.living == player.status) {
                //判断只有存活状态的玩家才应该显示
                isDisplay = true;
            } else {
                //不显示
            }
        }
        if (isDisplay) {
            $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】[" + name + "] 坚决的退出了房间。</p>");
            viewUtil.autoBottom($("#" + selects.$gameArea));
        }


    },
    kick:function (player) {
        var name = player.name;
        $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 " + name + "被一脚踢出了房间。</p>");
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },
    say:function (id, name, content, exp, color, object, objectName, time, privateContent, playAction) {
        var express = controlView.showExpression(exp);
        var obj = "";

        if (object != "-500") {
            obj = "对[" + objectName + "]";
        }
        var preStr = "";
        if ("true" == privateContent) {
            preStr = "[密]";
        }

        var action = " 说：";

        if (playAction == "say") {

        } else {
            action = " ";
        }

        $("#" + selects.$gameArea).append("<p  title='" + timeUtil.time2String(time) + "' style='color:" + color + "'>" + preStr + "[" + name + "] " + express + obj + action + content + "</p>");
        viewUtil.autoBottom($("#" + selects.$gameArea));


    },
    systemMessage:function (content) {
        $("#" + selects.$gameArea).append("<p style='color:#F00'>" + content + "</p>");
        viewUtil.autoBottom($("#" + selects.$gameArea));
    },
    appendContent:function () {

        alert("click me");
        return  $(this).html();

    },
    playAction:function (message) {
        if (PlayerAction[message.content]) {
            message.content = PlayerAction[message.content];
        }
    },
    showContent:function (id, content) {
        $("#" + id).append(content);
        viewUtil.autoBottom($("#" + id));

    }





}


var viewUtil = {
    autoBottom:function (dom) {

        var isAuto = controlView.getAutoRoll();
        console.log("dom is " + dom);
        if (isAuto) {
            var height = $(dom)[0].scrollHeight;
            $(dom).scrollTop(height);
        }

    },
    message2SystemContent:function (message) {
        var first = controlView.getAction(message);
        var c = controlView.getContent(message);


        return contentTemplate.generateSystemContent(c);
    },
    message2UserContent:function (message, firstAction, secondAction) {

        var first = controlView.getAction(firstAction);
        var second = controlView.getAction(secondAction);
        var c = controlView.getActionContent(message);
        var object = playerService.getName(message.object);
        var content = {
            color:message.color,
            expression:controlView.showExpression(message.expression),
            subject:playerService.getPlayer(message.subject).name,
            firstAction:first,
            object:object,
            secondAction:second,
            content:c
        }
        return contentTemplate.generateUserContent(content);

    }

}


var controlView = {

    hideRecordEmpty:[selects.$select_expression, selects.$select_color, selects.$select_command, selects.$select_object, selects.$sayButton, selects.$sayInput, selects.$sayLabel, selects.$multiObjectGroup],
    hideGameEmpty:[selects.$multiObjectGroup],


    getContent:function (message) {
        if (versionFunction["systemContent"]) {
            return versionFunction["systemContent"](message);
        }

    },

    getActionContent:function (message) {
        var actionContent = "";
        if (actionContent = "") {
            return message.content;
        }

    },
    getAction:function (action) {
        return "";
    },
    isMute:function () {
        var right=  $("#sayButton").prop("disabled");
        if(right&&'say'==controlView.getCommandValue()){
            return true;
        }else{
            return false;
        }
    },
    showDelay:function (message) {
        if (message.sendAt) {

            var t = jQuery.now() - message.sendAt;
            if (message.subject == globalView.getCurrentID()) {

                var h = "网速很给力";
                if (t < 50) {

                } else {
                    if (t < 100) {
                        h = "网速正常"
                    } else {
                        if (t < 300) {
                            h = "网速有一点卡"
                        } else {
                            h = "网速不给力啊"
                        }

                    }
                }
                $("#netSpeedHint").text(h + " 延迟:" + (t) + "毫秒");
            }
        }


    },
    getMessage:function () {

        var content = controlView.getSayInput();
        content = controlView.escape(content);
        var object = controlView.getObjectValue();


        var message = {
            subject:$("#uid").val(),
            predict:controlView.getCommandValue(),
            object:object,
            where:$("#rid").val(),
            color:controlView.getColorValue(),
            expression:controlView.getExpressionValue(),
            "content":content,
            "isDrools":"true",
            "version":$("#version").val(),
            "sendAt":jQuery.now(),
            "accepts":[],
            "privateContent":"false"
        };
        switch (message.predict) {
            case "topic":
                //只发给自己
                message.object = message.subject;
            case "say":
                if ("-500" != message.object) {
                    if (controlView.getPrivateSay()) {
                        message.accepts.push(message.object);
                        if (message.object == message.subject) {

                        } else {
                            message.accepts.push(message.subject);
                        }
                        message.privateContent = "true";
                    }

                }

                break;
            default :

        }


        return message;
    },
    escape:function (content) {
        return  $("#escape").empty().text(content).html();
    },
    checkFormat:function () {
        var result = {};
        var command = controlView.getCommandValue();
        switch (command) {
            case "say":
                var sayNotEmpty = controlView.checkSayNotEmpty();
                if (sayNotEmpty) {
                    result.code = 0;
                } else {
                    result.code = -1;
                    result.message = sayHint.empty;
                }
                break;
            case "announce":

                result.code = 0;
                break;
            case "topic":
                var sayNotEmpty = controlView.checkSayNotEmpty();
                if (sayNotEmpty) {
                    result.code = 0;
                } else {
                    result.code = -1;
                    result.message = sayHint.empty;
                }
                break;

            case "description":
                var sayNotEmpty = controlView.checkSayNotEmpty();
                if (sayNotEmpty) {
                    result.code = 0;
                } else {
                    result.code = -1;
                    result.message = sayHint.empty;
                }
                break;
            case "answer":
                var sayNotEmpty = controlView.checkSayNotEmpty();
                if (sayNotEmpty) {
                    result.code = 0;
                } else {
                    result.code = -1;
                    result.message = sayHint.empty;
                }
                break;


            default:
                //other command such as ,kick ,vote,kill,must have object
                var object = controlView.getObjectValue();
                if (object == null || object == "" || object == -500) {
                    result.code = -2;
                    result.message = sayHint.select;
                } else {
                    result.code = 0;
                }
                break;

        }

        if (result.code == 0) {
            if (versionFunction["commandCheck"])
                return versionFunction["commandCheck"]();
        } else {

            return result;
        }


        return result;

    },
    getColorValue:function () {
        var color = $("#color").attr("data-default");
        return  color == "" || color == undefined ? color = "" : color;
    },
    getExpressionValue:function () {
        var expression = $("#expression").attr("data-default");
        return  expression == "" || expression == undefined ? expression = 0 : expression;
    },
    getObjectValue:function () {
        if (controlView.objectType == "single") {
            var object = $("#object").attr("data-default");
            return  object == "" || object == undefined ? object = -500 : object;
        } else {

            return controlView.getMultiObject();
        }

    },
    getCommandValue:function () {
        var command = $("#command").attr("data-default");
        return  command == "" || command == undefined ? command = "say" : command;

    },
    resetCommand:function () {

        if ($("#switchFrom").val() == "pc") {
            $("#" + selects.$select_command).html("指令<span class='caret'></span>");
        } else {
            $("#" + selects.$select_command).find('span').text("指令");
        }

        $("#" + selects.$command).attr("data-default", "say");
        controlView.resetObject();
        controlView.switchObject("single");


    },

    resetExpression:function () {
        if ($("#switchFrom").val() == "pc") {
            $("#" + selects.$select_expression).html("神态<span class='caret'></span>");
        } else {
            $("#" + selects.$select_expression).find('span').text("神态");
        }

        $("#" + selects.$expression).attr("data-default", "0");
    },

    emptyCommand:function () {
        $("#" + selects.$command).empty().append(defaultHint.command);
        $("#" + selects.$command).attr("data-default", "");
    },
    resetObject:function () {


        if ($("#switchFrom").val() == "pc") {
            $("#" + selects.$select_object).html("对象<span class='caret'></span>");
        } else {
            $("#" + selects.$select_object).find('span').text("对象");
        }

        $("#" + selects.$object).attr("data-default", "");

    },
    resetMultiObject:function () {
        controlView.multiObject = [];

    },
    emptyObject:function () {
        $("#" + selects.$object).empty().append(defaultHint.object);
        $("#" + selects.$object).attr("data-default", "");
    },
    ready:function (id) {

        if ($("#uid").val() == id) {
            $("#" + selects.$readyButton).hide();
        }
    },

    startCountTime:function (time) {
        var t = Math.floor(time / 1000);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;
        var result = m + ":" + s;
        $("#" + selects.$countDown).empty().html(result);
        time = time + 1000;

        timer = setTimeout("controlView.startCountTime(" + time + ")", 1000);

    },
    setCountDownTime:function (time) {

        var t = Math.floor(time / 1000);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;
        var result = m + ":" + s;
        $("#" + selects.$countDown).empty().html(result);
        time = time - 1000;
        if (time >= 0) {
            timer = setTimeout("controlView.setCountDownTime(" + time + ")", 1000);
        }

    },
    clearCountDownTime:function () {
        clearTimeout(timer);
    },
    initExpression:function (exp) {


        var index = 1000;
        userExpression = {};
        for (var key in exp) {
            userExpression[index] = exp[key];
            index++
        }


        var expressionStr = "  <li data-default='0'><a href='#'>神态</a></li> <li class='divider'></li>";

        for (var key in expression) {
            expressionStr += "<li data-default='" + key + "'><a href='#'>" + expression[key] + "</a></li>";

        }


        for (var key in userExpression) {
            expressionStr += "<li data-default='" + key + "'><a href='#'>" + userExpression[key] + "</a></li>";
        }


        $("#expression").empty().append(expressionStr);
        /*  console.log(selects.$expression);
         selects.$expression.empty().append(expressionStr);*/
    },


    initColor:function () {


        var colorStr = "  <li data-default='#000'><a href='#'>颜色</a></li><li class='divider'></li>";
        for (var key in color) {
            colorStr += "<li data-default='" + key + "'> <div class='color-block' style='background:" + key + "'></div><a href='#' class='color-font'>" + color[key] + "</a></li>";


        }
        $("#color").empty().append(colorStr);


    },
    initObject:function () {
        var playList = playerService.getAllPlayer();
        controlView.filterObject("command", playList);
    },
    sortColor:function (a, b) {
        var a2 = a.value.substring(1, a.value.length);
        var b2 = b.value.substring(1, b.value.length);
        var a16 = parseInt(a2, 16);
        var b16 = parseInt(b2, 16);
        return a16 > b16 ? 1 : -1;
    },
    //表情翻译
    showExpression:function (express) {
        if (express == "0") {
            return "";
        }
        var exp = expression[express];
        if (exp == "" || exp == null) {
            exp = userExpression[express];
            if (exp == "" || exp == null) {
                return expression[-1];
            } else {
                return exp;
            }
        } else {
            return exp;
        }
    },
    initButtonOfGame:function () {
        $("#" + selects.$replayButton).hide();
        $("#displayRoleGroup").hide();

    },
    initButtonOfRecord:function () {
        $("#ready").hide();
        $("#start").hide();
        $("#speed_hint").hide();
        $("#replay").show();
        $("#replay_time_hint").show();
        $("#replay_role").show();
    },
    showRecordAllTime:function (time, all) {
        var timeStr = timeUtil.convertTime2Length(time);
        $("#all_time").empty().append("时长[" + timeStr + "]");
    },
    showRecordCurrentTime:function (time, all) {
        var timeStr = timeUtil.convertTime2Length(time);
        $("#current_time").empty().append("已播放[" + timeStr + "]");
        time = time + 1000;
        if (time <= all) {
            record_timer = setTimeout(controlView.showRecordCurrentTime, 1000, time, all);
        }
    },
    clearSayInput:function () {
        $("#sayInput").val("");
    },
    checkSayNotEmpty:function () {

        if ($("#sayInput").val() == "" || $("#sayInput") == undefined) {
            return false;
        } else {
            return true;

        }
    },
    hintSay:function (text) {
        $("#sayInput").val(text);
    },
    appendSay:function (text) {
        var content = $("#sayInput").val() + text;
        $("#sayInput").val(content);
    },
    sayHint:function () {
        alert("内容不能为空！请输入内容重新发送");
    },
    isShow:function () {
        return $("#displayRole").prop("checked");

    },
    getAutoRoll:function () {
        var result = $("#" + selects.$checkBox).prop("checked");

        return result;
    },
    getPrivateSay:function () {
        return $("#" + selects.$privateSay).prop("checked");

    },
    getSayInput:function () {
        return $("#sayInput").val();
    },
    filterObject:function (command, playerList) {
        switch (command) {


            case "kick" :
                controlView.filterSingleObject("all", playerList);
                break;
            case "kill" :
                controlView.filterSingleObject("living", playerList);
                break;
            case "check" :
                controlView.filterSingleObject("living", playerList);
                break;
            case "vote" :
                controlView.filterSingleObject("living", playerList);
                break;
            case "private" :
                controlView.filterSingleObject("ready", playerList);
                break;

                break;
            default :
                console.log("亲,not have common filter.,start version commandFilter");
                if (versionFunction["commandFilter"]) {
                    versionFunction["commandFilter"](command, playerList);
                }

        }
    },

    filterMultiObject:function (keyword, playerList) {

        controlView.switchObject("multi");
        $('option', $('#multiObject')).each(function (element) {
            $(this).remove();
        });
        switch (keyword) {
            case "none":
                break;
            case "all":

                for (var key in playerList) {
                    controlView.appendMultiObject(playerList[key]);


                }
                break;
            case "living":
                for (var key in playerList) {
                    var player = playerList[key];
                    if ("living" == player.status) {
                        controlView.appendMultiObject(player);
                    }


                }
                break;
            case "ready":
                for (var key in playerList) {
                    var player = playerList[key];
                    if ("unready" != player.status) {
                        controlView.appendMultiObject(player);
                    }


                }
                break;


        }
        $("#multiObject").multiselect("rebuild");


    },

    filterSingleObject:function (keyword, playerList) {
        controlView.switchObject("single");
        var objectStr = "<li data-default='-500'><a href='#'>对象</a></li> <li class='divider'></li>";
        $("#object").empty().append(objectStr);


        switch (keyword) {
            case "none":
                break;
            case "all":
                for (var key in playerList) {
                    controlView.appendObject(playerList[key]);


                }
                break;
            case "living":
                for (var key in playerList) {
                    var player = playerList[key];
                    if ("living" == player.status) {
                        controlView.appendObject(player);
                    }


                }
                break;
            case "ready":
                for (var key in playerList) {
                    var player = playerList[key];
                    if ("unready" != player.status) {
                        controlView.appendObject(player);
                    }


                }
                break;


        }


    },

    filterDIYObject:function (objects) {
        $("#object").empty();
        for (var index in objects) {
            controlView.appendObject(objects[index]);
        }

    },

    appendObject:function (player) {

        var objectStr = " <li data-default='" + player.id + "'><a href='#'>" + player.name + "</a></li>";
        $("#object").append(objectStr);

    },
    appendMultiObject:function (player) {
        var objectStr = "<option value=" + player.id + ">" + player.name + "</option>"
        $("#multiObject").append(objectStr);

    },

    appendObjectContent:function (data, display) {

        var objectStr = " <li data-default='" + data + "'><a href='#'>" + display + "</a></li>";
        $("#object").append(objectStr);


    },
    hideButton:function (id) {
        $("#" + id).hide();
    },

    switchObject:function (type) {
        switch (type) {
            case "multi":
                $("#objectGroup").hide();
                $("#multiObjectGroup").show();
                controlView.objectType = "multi";
                break;
            case "single":
                $("#multiObjectGroup").hide();
                $("#objectGroup").show();
                controlView.objectType = "single";
                break;
            default:
                break;
        }


    },
    objectType:"single",
    multiObject:[],
    getMultiObject:function () {

        return array2splitString(controlView.multiObject, ",");

    }

}

