/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-8
 * Time: 下午4:41
 * To change this template use File | Settings | File Templates.
 */


var settingView = {

    displaySetting:function() {
        if (globalView.getCurrentID() == globalView.getCreaterId()) {
            if ("over" == globalView.getGameStatus()) {//游戏结束后才能看到设置按钮
                $("#submitSetting").show();
                $("#defineExp").show();
            } else {
                $("#submitSetting").hide();
                $("#defineExp").hide();
            }
        } else {
            $("#submitSetting").hide();
            $("#defineExp").hide();
        }
        $("#expContainer").hide();
    },


    showSetting:function(info) {
        $("nav article").html(info);
        //管理员才能看到设置按钮

        if (globalView.getCurrentID() == globalView.getCreaterId()) {
            if ("over" == globalView.getGameStatus()) {//游戏结束后才能看到设置按钮
                $("#submitSetting").show();
                $("#defineExp").show();
            } else {
                $("#submitSetting").hide();
                $("#defineExp").hide();
            }
        } else {
            $("#submitSetting").hide();
            $("#defineExp").hide();
        }
        $("#expContainer").hide();


       versionFunction["initSetting"]();
        


        $("#submitSetting").bind("click", function() {
            var s = versionFunction["getSettingParameter"]();
            var settingHtml = settingService.saveSetting(s);
            alert("你和洛洛一样聪明~都会更改设置了~~");
            settingView.showSetting(settingHtml);
        });


        $("#defineExp").bind("click", function() {

            var width = $("body").width();
            var layerWidth = $("#expContainer").width();
            var exp = settingService.getExpress(globalView.getRoomID());
            $("#expContent").val(JSON.stringify(exp));
            $("#expContainer").removeClass().addClass("expCenter");
            $("#expContainer").show();

            return false;

        });

        $("#expCommit").bind("click", function() {

            var v = $("#expContent").val();

            var expArray;
            try {
                expArray = eval(v);
                if (expArray.length > 5) {
                    alert("亲,说好的五个呢,想多定义表情不用花钱啊");
                    return false;
                }
            } catch(err) {
                alert("会不会看格式啊亲,敢不敢靠谱一点儿");
                return false;
            }

            settingService.saveExpress(new expressionParameter(globalView.getRoomID(), expArray));
            $("#expContainer").hide();
            return false;

        });
        $("#expCancel").bind("click", function() {
            $("#expContainer").hide();
            return false;

        });


    },

    hideSettingButton:function() {
        $("#submitSetting").hide();
        $("#defineExp").hide();
    },
    showSettingButton:function() {
        $("#submitSetting").show();
        $("#defineExp").show();
    },
    getSettingParameter:function(fun) {
        return fun;
    }

}


var globalView = {

    getGameStatus:function() {
        return   $("#time").val();
    },
    setGameStatusHint:function(status) {
        $("#time").val(status);
    },
    isStop:function() {
        if ($("#time").val() == "over") {
            return true;
        } else {
            return false;
        }
    },
    getCurrentID:function() {
        return $("#uid").val();
    },
    getRoomID:function() {
        return $("#rid").val();
    },
    getVersion:function() {
        return  $("#version").val();
    },
    getCreaterId:function() {
        return $("#createrID").val();
    },
    getRoomType:function() {
        return $("#type").val();
    },
    getRecordId:function() {
        return $("#recordID").val();
    },
    getRecordTime:function() {
        return $("#recordTime").val();
    }



}


/**
 * 玩家列表区域
 */

var playerListView = {
    login:function(player) {
        var name = player.name;
        var id = player.id;
        //判断是否已经存在这个玩家的List了.
        if (this.isExistPlayer(id)) {

        } else {
            this.appendPlayerItem(player);
        }
        //更新值就好了
        $("#" + id).children("span").eq(0).text(name);
    },
    logout:function(id) {
        $("#" + id).remove();
    },

    isExistPlayer:function(id) {
        var id_li = $("#" + id);
        if (id_li.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    setVote:function(id, count) {
        if (count == 0) {
            $("#" + id).children("i").text("");
        } else {
            $("#" + id).children("i").text(" +" + count);
        }
    },
    displayCreater:function(id) {

        var tip = $("<em>(房主)</em>");
        tip.insertAfter("#" + id + " i");

    },
    sortPlayer:function() {

        var sortPlayers = playerService.getAll();

        $("nav ul").empty();
        //清空列表

        for (var index in sortPlayers) {
            var player = playerService.getPlayer(sortPlayers[index]);
            this.appendPlayerItem(player);

        }

    },
    appendPlayerItem:function(player) {
        if (player.count == 0) {
            $("nav ul").append("<li id='" + player.id + "'><a href='/player/detail.do?uid=" + player.id + "' class='" + player.status + "' target='_blank'></a><span>" + player.name + "</span><i></i></li>");
        } else {
            $("nav ul").append("<li id='" + player.id + "'><a href='/player/detail.do?uid=" + player.id + "' class='" + player.status + "' target='_blank'></a><span>" + player.name + "</span><i>" + player.count + "</i></li>");
        }


    },
    die:function() {
        this.sortPlayer();
    },
    setStatus:function(id, status) {
        this.sortPlayer();
    },
    kill:function(id) {

        //this.setStatus(id, playerStatus.die);
    }


}


//处理权限
var rightView = {
    branch : function(right) {
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
    sayRight : function(right) {
        $("#say").prop("disabled", false);
        $("#sendSay").prop("disabled", false);
        $("#say").attr("name", right);//? 这个有什么用处
    },
    readyRight : function() {
        $("#ready").css("display", "inline");
        $("#ready").prop("disabled", false);

    },
    startRight : function() {
        $("#start").css("display", "inline");
    },
    commandRight : function(right) {
        $("#command option:gt(0)").remove();
        var array = [];
        array["kick"] = "果断一脚";
        array["vote"] = "投他一票";
        array["kill"] = "杀人灭口";
        $("#command").append("<option value='" + right + "'>" + array[right] + "</option>");
    },
    noRight: function() {
        $("#say").prop("disabled", true);
        $("#sendSay").prop("disabled", true);
        $("#ready").prop("disabled", true);
        $("#command option:gt(0)").remove();
    },
    getContentByRight:function(right){
        var c=commandCommonSetting[right];
        if(c){
            return c;
        }else{
            return versionFunction["rightContent"][right];
        }
    }
}


var gameAreaView = {


    login:function(player) {

        var name = player.name;
        if (globalView.isStop()) {
            //只有房间是处在结束状态下才在游戏区显示消息
            $("section article").append("<p style='color:#F00'>【系统消息】[" + name + "] 进入了房间。</p>");
            viewUtil.autoBottom("section article");
        } else {
            //不显示

        }

    },
    logout:function(player) {
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
            $("section article").append("<p style='color:#F00'>【系统消息】[" + name + "] 退出了房间。</p>");
            viewUtil.autoBottom("section article");
        }


    },
    kick:function(player) {
        var name = player.name;
        $("section article").append("<p style='color:#F00'>【系统消息】 " + name + "被一脚踢出了房间。</p>");
        viewUtil.autoBottom("section article");
    },
    say:function(id, name, content, exp, color, subject, subjectName) {
        var express = controlView.showExpression(exp);
        var obj;
        if (subjectName != null) {
            obj = " 对 [" + subjectName + " ]";
        } else {
            obj = "";
        }
        var player = playerService.getPlayer(id);


        $("section article").append("<p style='color:" + color + "'>[" + name + "] " + express + obj + " 说：" + content + "</p>");
        viewUtil.autoBottom("section article");


    }





}


var viewUtil = {
    autoBottom:function(dom) {
        var height = $(dom)[0].scrollHeight;
        $(dom).scrollTop(height);
    }

}


var controlView = {

    resetCommand:function() {

        $("#object option:gt(0)").remove();
        $("#command").val("command");

    },
    ready:function(id) {

        if ($("#uid").val() == id) {
            $("#ready").hide();
            $(".nobg").val("已准备就绪");


        }
    },

    setCountDownTime:function(time) {

        var t = Math.floor(time / 1000);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m < 10 ? m = "0" + m : m;
        s < 10 ? s = "0" + s : s;
        var result = m + ":" + s;
        $(".nobg").val(result);
        time = time - 1000;
        if (time >= 0) {
            timer = setTimeout("controlView.setCountDownTime(" + time + ")", 1000);
        }

    },
    clearCountDownTime:function() {
        clearTimeout(timer);
    },
    initExpression:function(exp) {


        var index = 1000;
        userExpression = {};
        for (var key in exp) {
            userExpression[index] = exp[key];
            index++
        }


        var expressionStr = "";

        for (var key in expression) {
            expressionStr += "<option value='" + key + "'>" + expression[key] + "</option>";
        }


        for (var key in userExpression) {
            expressionStr += "<option value='" + key + "'>" + userExpression[key] + "</option>";
        }

        $("#expression").empty().append(expressionStr);
    },


    initColor:function() {


        var colorStr = "";
        var c = "white";
        for (var key in color) {
            colorStr += "<option   style='background-color: " + key + " '; value='" + key + "'>" + color[key] + "</option>";
        }
        $("#color").empty().append(colorStr);
        $("#color option").sort(this.sortColor).appendTo('#color');


    },
    sortColor:function(a, b) {
        var a2 = a.value.substring(1, a.value.length);
        var b2 = b.value.substring(1, b.value.length);
        var a16 = parseInt(a2, 16);
        var b16 = parseInt(b2, 16);
        return a16 > b16 ? 1 : -1;
    } ,
    //表情翻译
    showExpression:function(express) {
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
    initButtonOfGame:function() {
        $("#replay").hide();
        $("#replay_time_hint").hide();
    },
    initButtonOfRecord:function() {
        $("#ready").hide();
        $("#start").hide();
        $("#speed_hint").hide();
        $("#replay").show();
        $("#replay_time_hint").show();
    },
    showRecordAllTime:function(time, all) {
        var timeStr = timeUtil.convertTime2Length(time);
        $("#all_time").empty().append("时长[" + timeStr + "]");
    },
    showRecordCurrentTime:function(time, all) {
        var timeStr = timeUtil.convertTime2Length(time);
        $("#current_time").empty().append("已播放[" + timeStr + "]");
        time = time + 1000;
        if (time <= all) {
            record_timer = setTimeout(controlView.showRecordCurrentTime, 1000, time, all);
        }
    },
    clearSayInput:function() {
        $("#say").val("");
    },
    checkSayNotEmpty:function() {
        if ($("#say").val() == "" || $("#say").val() == undefined) {
            return false;
        } else {
            return true;

        }
    },
    hintSay:function(text) {
        $("#say").val(text);
    },
    sayHint:function() {
        alert("内容不能为空！请输入内容重新发送");
    }




}

