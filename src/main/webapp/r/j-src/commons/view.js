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
    kill:"杀人灭口"
};


var sayHint = {
    empty:"不能为空啊",
    select:"先选个人啊"
}

var defaultHint={
    command:"<li data-default=''><a href=''#'>指令</a></li><li class='divider'></li>",
   object:"<li data-default=''><a href=''#'>对象</a></li><li class='divider'></li>"
}

var settingView = {

    displaySetting:function () {
        if (globalView.getCurrentID() == globalView.getCreaterId()) {
            if ("over" == globalView.getGameStatus()) {//游戏结束后才能看到设置按钮
                $("#"+selects.$submitSetting).show();

            } else {
                $("#"+selects.$submitSetting).hide();

            }
        } else {
            $("#"+selects.$submitSetting).hide();

        }

    },

    showSetting:function (info) {
       $("#"+ selects.$settingArea).html(info);
        //管理员才能看到设置按钮

        if (globalView.getCurrentID() == globalView.getCreaterId()) {
            if ("over" == globalView.getGameStatus()) {//游戏结束后才能看到设置按钮
                $("#"+ selects.$submitSetting).show();

            } else {
                $("#"+ selects.$submitSetting).hide();

            }
        } else {
            $("#"+ selects.$submitSetting).hide();

        }

        if (versionFunction["initSetting"]) {
            versionFunction["initSetting"]()
        }


        $("#"+ selects.$submitSetting).bind("click", function () {
            var s = versionFunction["getSettingParameter"]();
            var settingHtml = settingService.saveSetting(s);
            alert("设置已更改~~");

            if (versionFunction["settingCallback"]) {
                versionFunction["settingCallback"]();
            }
            settingView.showSetting(settingHtml);

        });


    },

    hideSettingButton:function () {
        $("#"+selects.$submitSetting).hide();

    },
    showSettingButton:function () {
        $("#"+selects.$submitSetting).show();
    },
    getSettingParameter:function (fun) {
        return fun;
    }

}


var globalView = {

    getGameStatus:function () {
        return   $("#time").val();
    },
    setGameStatus:function(status){
        $("#time").val(status);
    },
    setGameStatusHint:function (status) {
        $("#"+selects.$gamePhase).empty().html(status);

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
    showPlayerList: function(elem) {
        $(elem).text('-');
        $('#' + selects.$sidebarNav).animate({left: 0});
        $('#' + selects.$content).animate({marginLeft: 200});
    },
    hidePlayerList: function(elem) {
        $(elem).text('+');
        $('#' + selects.$sidebarNav).animate({left: -180});
        $('#' + selects.$content).animate({marginLeft: 20});
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
            $("#" + id+"_vote").text("");

        } else {
            $("#" + id+"_vote").text(" +" + count);
        }
    },
    displayCreater:function (player) {

        $("#" + selects.$createName).empty().html("管理员:"+player.name);

    },

    displayRole:function (role) {

     $("#" + selects.$playerRole).empty().html(role);


    },

    sortPlayer:function () {

        var sortPlayers = playerService.getAll();

        $("#"+selects.$playerList).empty();
        //清空列表

        for (var index in sortPlayers) {
            var player = playerService.getPlayer(sortPlayers[index]);
            this.appendPlayerItem(player);

        }

    },
    appendPlayerItem:function (player) {
        var voteID=player.id+"_vote";
        if (player.count == 0) {

            var item = "<li id='" + player.id + "'><a href='/player/detail.do?uid=" + player.id + "' target='_blank'><i class='icon-" + player.status + "'></i><span>" + player.name + "</span><span class='vote' id='"+voteID+"'></span></a></li>";
            $("#"+selects.$playerList).append(item);
        } else {
            var item = "<li id='" + player.id + "'><a href='/player/detail.do?uid=" + player.id + "' target='_blank'><i class='icon-" + player.status + "'></i><span>" + player.name + "<span class='vote' id='"+voteID+"'>+" + player.count + "</span></a></span></a></li>";
            $("#"+selects.$playerList).append(item);


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
                }
        }


    },
//各种权利
    sayRight:function (right) {
        $("#"+selects.$sayButton).prop("disabled", false);
    },
    readyRight:function () {
        $("#"+selects.$readyButton).show();


    },
    startRight:function () {
        $("#"+selects.$startButton).show();
    },
    commandRight:function (right) {      ;

        $("#command").append("<li data-default='" + right + "'><a href='#'>" + commandText[right] + "</a></li>");
    },
    noRight:function () {

        $("#"+selects.$sayButton).prop("disabled", true);
        $("#"+selects.$readyButton).hide();
        $("#"+selects.$startButton).hide();
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


    login:function (player, message) {

        var action;
        if (message == null || message.content == "") {
            action = "";
        } else {
            action = message.content;
        }

        var sid=globalView.getCurrentID();
        var name = player.name;
        if (globalView.isStop()&&sid!=player.id) {
            //只有房间是处在结束状态下才在游戏区显示消息
            $("#"+selects.$gameArea).append("<p style='color:#F00'>【系统消息】[" + name + "]" + action + "进入了房间</p>");
            viewUtil.autoBottom($("#"+selects.$gameArea));
        } else {
            //不显示

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
            $("#"+selects.$gameArea) .append("<p style='color:#F00'>【系统消息】[" + name + "] 坚决的退出了房间。</p>");
            viewUtil.autoBottom( $("#"+selects.$gameArea));
        }


    },
    kick:function (player) {
        var name = player.name;
        $("#"+selects.$gameArea).append("<p style='color:#F00'>【系统消息】 " + name + "被一脚踢出了房间。</p>");
        viewUtil.autoBottom( $("#"+selects.$gameArea));
    },
    say:function (id, name, content, exp, color, subject, subjectName) {
        var express = controlView.showExpression(exp);
        var obj="";

        var player = playerService.getPlayer(id);


        $("#"+selects.$gameArea).append("<p style='color:" + color + "'>[" + name + "] " + express + obj + " 说：" + content + "</p>");
        viewUtil.autoBottom( $("#"+selects.$gameArea));


    },
    systemMessage:function (content) {
        $("#"+selects.$gameArea).append("<p style='color:#F00'>" + content + "</p>");
        viewUtil.autoBottom( $("#"+selects.$gameArea));
    },
    getContent:function () {

        alert("click me");
        return  $(this).html();

    }





}


var viewUtil = {
    autoBottom:function (dom) {
        var isAuto = controlView.getAutoRoll();
        if (isAuto) {
            var height = $(dom)[0].scrollHeight;
            $(dom).scrollTop(height);
        }

    }

}


var controlView = {
    isMute:function () {
        return  $("#sayButton").prop("disabled");
    },
    showDelay:function () {
        $("#netSpeedHint").text("延迟:" + (jQuery.now() - lastMessageSendAt) + "毫秒");
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
            "version":$("#version").val()
        };



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
            default:
                //other command such as ,kick ,vote,kill,must have object
                var object = controlView.getObjectValue();
                if (object == null || object == "") {
                    result.code = -2;
                    result.message = sayHint.select;
                } else {
                    result.code = 0;
                }
                break;

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
        var object = $("#object").attr("data-default");
        return  object == "" || object == undefined ? object = -500 : object;
    },
    getCommandValue:function () {
        var command = $("#command").attr("data-default");
        return  command == "" || command == undefined ? command = "say" : command;

    },
    resetCommand:function () {

        $("#"+selects.$select_command).find('span').text("指令");

        controlView.resetObject();

    },
    emptyCommand:function(){
      $("#"+selects.$command).empty().append(defaultHint.command);
      $("#"+selects.$command).attr("data-default","");
    },
    resetObject:function(){
        $("#"+selects.$select_object).find('span').text("对象");

    },
    emptyObject:function(){
        $("#"+selects.$object).empty().append(defaultHint.object);
        $("#"+selects.$object).attr("data-default","");
    },
    ready:function (id) {

        if ($("#uid").val() == id) {
            $("#"+selects.$readyButton) .hide();
        }
    },

    startCountTime:function (time) {
        var t = Math.floor(time / 1000);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;
        var result = m + ":" + s;
        $("#"+selects.$countDown).empty().html(result);
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
        $("#"+selects.$countDown).empty().html(result);
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


        var expressionStr = "  <li><a href='#'>神态</a></li> <li class='divider'></li>";

        for (var key in expression) {
            expressionStr += "<li data-default='" + key + "'><a href=''#'>" + expression[key] + "</a></li>";

        }


        for (var key in userExpression) {
            expressionStr += "<li data-default='" + key + "'><a href=''#'>" + userExpression[key] + "</a></li>";
        }


        $("#expression").empty().append(expressionStr);
        /*  console.log(selects.$expression);
         selects.$expression.empty().append(expressionStr);*/
    },


    initColor:function () {


        var colorStr = "  <li data-default='#000'><a href='#'>color</a></li><li class='divider'></li>";
        for (var key in color) {
            colorStr += "<li data-default='" + key + "'> <div class='color-block' style='background:" + key + "'></div><a href='#' class='color-font'>" + color[key] + "</a></li>";


        }
        $("#color").empty().append(colorStr);


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
        $("#"+selects.$replayButton).hide();
    /*    $("#replay_time_hint").hide();
        $("#replay_role").hide();*/
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
    appendSay:function(text){
      var   content=$("#sayInput").val()+text;
        $("#sayInput").val(content);
    },
    sayHint:function () {
        alert("内容不能为空！请输入内容重新发送");
    },
    isShow:function () {
        return $("#displayRole").attr("checked");

    },
    getAutoRoll:function () {
        return $("#"+selects.$checkBox).attr("checked");
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
            case "vote" :
                controlView.filterSingleObject("living", playerList);
                break;
            case "command" :
                controlView.filterSingleObject("none", playerList);
                break;
            default :
                console.log("亲，这个指令你还没写嘛.");
        }
    },
    filterSingleObject:function (keyword, playerList) {
        var objectStr = "<li data-default=''><a href='#'>对象</a></li> <li class='divider'></li>";
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
        }


    },

    appendObject:function (player) {

        var objectStr = " <li data-default='" + player.id + "'><a href='#'>" + player.name + "</a></li>";
        $("#object").append(objectStr);

    },
    hideButton:function(id){
        $("#"+id).hide();
    }



}

