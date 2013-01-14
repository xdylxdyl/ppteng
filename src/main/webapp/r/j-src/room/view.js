/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-12-13
 * Time: 下午2:48
 * To change this template use File | Settings | File Templates.
 */


var settingPostParameter = function(rid, version, killCount, dayTime, nightTime, lastwordTime) {
    return{
        rid:rid,
        version:version,
        setting:[
            {"杀手人数":killCount},
            {"白天时间":dayTime},
            {"夜晚时间":nightTime},
            {"遗言时间":lastwordTime}
        ]
    }


}


/**
 * 游戏区域
 */
var killGameAreaView = {


    Hint:{
        vote:"人生就是这样,何必挣扎说自己不是杀手呢",
        kill:"杀谁都一样,你只是太闪亮了",
        night:"【系统消息】 月黑风高杀人夜，大家各自保重！",
        day:"【系统消息】 天光大亮，大家集中精力找出凶手！",
        killerList:"【系统消息】 绝密杀手名单： ",
        kick:"你好,再见"
    },

    Phase:{
        night:"【当前状态】晚上 ",
        day:"【当前状态】白天 ",
        lastword:"【当前状态】遗言 "
    },


    say:function(id, name, content, exp, color, subject, subjectName) {
        var express = controlView.showExpression(exp);
        var obj;
        if (subjectName != null) {
            obj = " 对 [" + subjectName + " ]";
        } else {
            obj = "";
        }
        //say出现的位置 这个.话说.原来死人说的话是JS控制的么
        //1、死人（dead_area）——a、游戏结束后；b、游戏未结束时。 2、活人——a、白天； b、遗言时； c、晚上（killer_area）。
        var player = playerService.getPlayer(id);
        var place = "normal";
        if (playerStatus.die == player.status) {
            if ($("#time").val() == "over") {

            } else {
                //没有结束
                place = "deadArea";


            }
        } else {
            switch ($("#time").val()) {
                case "night":
                    if (playerStatus.living == player.status) {
                        //是杀手才能说话
                        if ("killer" == player.role) {
                            place = "killArea";
                        } else {
                            place = "discard";
                        }
                    }
                    ;
                    break;
                case "lastword":
                    break;
                default:
                    break;
            }

        }
        switch (place) {
            case "normal":
                $("section article").append("<p style='color:" + color + "'>[" + name + "] " + express + obj + " 说：" + content + "</p>");
                viewUtil.autoBottom("section article");
                break;
            case "deadArea":
                $("section .dead_area").append("<p style='color:" + color + "'>[" + name + "] " + express + obj + " 说：" + content + "</p>");
                viewUtil.autoBottom("section .dead_area");
                break;
            case "killArea":
                $("section .killer_area").append("<p style='color:" + color + "'>[" + name + "] " + express + obj + " 说：" + content + "</p>");
                viewUtil.autoBottom("section .killer_area");
                break;
            default:
        }


    },
    vote:function(subjectName, objectName, color, exp, content) {


        color = "#F00";
        $("section article").append("<p style='color:" + color + "'>[" + subjectName + "] " + controlView.showExpression(exp) + " 指证 [" + objectName + "] 说 : " + content + " </p>");
        viewUtil.autoBottom("section article");
    },

    die:function(id, name, action) {
        $("#" + id).children("a").removeClass().addClass("die");
        if (action == "vote") {
            $("section article").append("<p style='color:#F00;'>【系统消息】 积毁销骨，众口铄金，[" + name + "]你就认命吧！</p>");
        } else if (action == "kill") {
            $("section article").append("<p style='color:#F00;'>【系统消息】 [" + name + "] 被杀了。</p>");
        }
        if ($("#uid").val() == id) {
            this.swithTopArea("deadArea");
        }
    },
    kill:function(killerName, objName, exp, content) {

        $("section .killer_area").show().append("<p style='color:#F00;'>" + killerName + " " + controlView.showExpression(exp) + "杀了 [" + objName + "] 说 : " + content + " </p>");
        viewUtil.autoBottom("section .killer_area");
    },
    swithTopArea:function(area) {
        if ("deadArea" == area) {
            $("section .killer_area").hide();
            $("section .dead_area").show();
        } else {
            $("section .killer_area").show();
            $("section .dead_area").hide();
        }
    },
    showContentForRoleArea:function(content) {
        $("#role_area").append("<span style='color: #F00'>" + content + "</span>");
    },
    showContentForGameArea:function(content) {
        if (content == "" || content == undefined) {

        } else {
            $("section article").append("<p><span style='color: #F00'>" + content + "</span></p>");
        }

    },
    showConentForGamePhase:function(content) {
        $("#phase_area").html(content);
    },
    clearStatusArea:function() {
        $("#phase_area").empty();
    },
    clearGameArea:function() {
        $("#section article").empty();
    },
    clearRoleArea:function() {
        $("#role_area").empty();
    },
    showOver:function(recordID, obj) {

        var recordLink = "<a href='/record/enter.do?recordID=" + recordID + "' target='_blank'>回放战例</a>";
        var shareLink = "http://42.121.113.70/record/enter.do?recordID=" + recordID;
        var share;
        switch (obj) {
            case "killer win" :
                $("section article").append("<p style='color:#F00'>【系统消息】 游戏结束，杀手胜利！感谢大家参与测试,每个玩家可获取2000金币</p> " + recordLink);
                share = "这局杀人游戏[简化]中,杀手又赢了~,抢走了2000金币~点此链接回放场景,重现杀人现场: " + shareLink + ";";
                break;
            case "water win" :
                $("section article").append("<p style='color:#F00'>【系统消息】 游戏结束，水民胜利！感谢大家参与测试,每个玩家可获取2000金币</p> " + recordLink);
                share = "这局杀人游戏[简化]中,水民又赢了~,赢回了2000金币~点此链接回放场景,重现水民分析实况:" + shareLink + ";";
                break;
            default :
                $("section article").append("<p style='color:#F00'>" + obj + "</p>");
        }

        //楼上展示位重置
        $("section .killer_area, section .dead_area").hide();
        //时间清空
        clearTimeout(timer);
        timer = null;
        $(".nobg").val("00:00");
        viewUtil.autoBottom("section article");


        jiathis_config.title = share;


    }

}


var simpleRightView = {
    branchRight:function(right) {
        switch (right) {
            case "vote" :
                this.commandRight(right);
                break;
            case "kill" :
                this.commandRight(right);
                break;
            case "lastword" :
                this.sayRight(right);
                break;
            default :
                console.log("version view not process right: " + right);
        }
    }
}

var simpleSettingView = {
    initSetting:function() {

        $("#白天时间").val($("#白天时间").val() / 60000);
        $("#晚上时间").val($("#晚上时间").val() / 60000);
        $("#遗言时间").val($("#遗言时间").val() / 60000);

        $("<span>分</span>").insertAfter("#白天时间");
        $("<span>分</span>").insertAfter("#晚上时间");
        $("<span>分</span>").insertAfter("#遗言时间");
    },
    getSettingParameter:function() {
        $("#白天时间").val($("#白天时间").val() * 60000);
        $("#晚上时间").val($("#晚上时间").val() * 60000);
        $("#遗言时间").val($("#遗言时间").val() * 60000);
        var params = jQuery("#setting").serialize();
        return params;
    }
}


var gameView = {
    start:function() {


        $("#start").hide();
        $(".nobg").val("");
        $("section article, section .killer_area, section .dead_area,#role_area").empty();
        $("section .killer_area, section .dead_area").hide();
        $("section article").append("<p style='color:#F00'>【系统消息】 游戏开始,白天时间~</p>");
        $('section article').scrollTop($('section article')[0].scrollHeight);
        playerListView.sortPlayer();
        killGameAreaView.clearStatusArea();
        settingView.hideSettingButton();

    },
    over:function(message) {
        var obj = message.object;
        var recordID = message.subject;
        //标明游戏结束
        globalView.setGameStatus("over");
        playerService.setUnreadyStatus();
        //只重新显示.不用重新计算
        settingView.displaySetting();


        killGameAreaView.showOver(recordID, obj);
        killGameAreaView.showConentForGamePhase(gameAreaView.Phase[status]);
    }


}

var simpleService={
     parseDetail:function(data) {
            roomService.parsePerson(data.person);
            roomService.parseGame(data.game);
            roomService.parseRoom(data.room);
            roomService.parseRight(data.right);
        }
}

    versionFunction = {
        "rightView":simpleRightView.branchRight,
        "initSetting":simpleSettingView.initSetting,
        "getSettingParameter":simpleSettingView.getSettingParameter,
        "parseMessage":killController.parseMessage,
        "parseDetail":simpleService.parseDetail,
         "settingPostParameter":settingPostParameter
    }




