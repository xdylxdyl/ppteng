/**
 * @directions  初始化房间
 * @author Jqhan <jqhan@gemantic.cn>
 */






function messageQ(msgObj) {
    $(document).queue("messages", parseMessage(msgObj.message));

}

function parseMessage(message) {

    var msgLength = message.length; //msg数组长度
    for (var i = msgLength - 1; i >= 0; i--) {
        resolvePredict.branch(message[i]);
    }
    $(document).dequeue("messages");
    //if something happend in the night.this will be still run autobottom.
    viewUtil.autoBottom("section article");

}


var resolvePredict = {};
resolvePredict.branch = function(message) {
    console.log(message.subject + " " + message.predict + " " + message.object + " " + message.content + " " + message.where);
    var rid = globalView.getRoomID();
    var type = globalView.getRoomType();
    if (rid != message.where && "game" == type) {
        console.log(message.where + " not my room messae " + rid);
        return;
    }

    var start = jQuery.now();
    var predict = message.predict;

    switch (predict) {
        case "say" :
            this.say(message);
            break;
        case "ready" :
            this.ready(message);
            break;

        case "login" :
            this.log(message);
            break;
        case "logout" :
            this.log(message);
            break;
        case "kick" :
            this.kick(message);
            break;
        case "expression" :
            this.updateExpression(message);
            break;

        //以下这些内容都是和游戏版本相关的,但是也有公共的部分
        case "right" :
            this.right(message);
            break;
        case "setting" :
            this.setting(message);
            break;

        default:
            console.log("room parse over,start version parse");
            versionFunction["parseMessage"](message);
    }


};


resolvePredict.updateExpression = function(message) {

    var exp = eval(message.object);

    controlView.initExpression(exp);

};


resolvePredict.setting = function(message) {


    if (message.subject != globalView.getCurrentID()) {

              var version=globalView.getVersion();
              var rid=globalView.getRoomID();
              var param= {"version":version,"rid":rid};

        var s = settingService.getSetting(param);
        settingView.showSetting(s);
        versionFunction["settingCallback"]();

    }

};
resolvePredict.say = function(message) {


    var status = globalView.getGameStatus();
    if ("over" == status) {
        var name;
        if (message.object != -500) {
            name = playerService.getPlayer(message.object).name;
        }
        gameAreaView.say(message.subject, playerService.getPlayer(message.subject).name, message.content, message.expression,
            message.color, message.object, name);
    } else {

        versionFunction["say"](message);


    }


};
resolvePredict.ready = function(message) {


    playerService.setStatus(message.subject, playerStatus.ready)
    controlView.ready(message.subject);
    playerListView.setStatus(message.subject, playerStatus.ready);


};


resolvePredict.start = function(message) {
    //  console.log(message);
    playerService.setStartStatus();
    gameView.start();
};


resolvePredict.log = function(message) {
    //进入退出游戏，1、需要通报全场；2、加减玩家列表响应的玩家信息。
    var id = message.subject;
    if (message.predict == "login") {

        var type = globalView.getRoomType();
        if ("game" == type) {
            var rid = $("#rid").val();
            $.ajax({
                type : "GET",
                dataType : 'json',
                url : "/player/info.do?rid=" + rid + "&uids=" + message.subject,
                success : function(data) {
                    console.log(data);
                    var name = data.infos[0].name;
                    var p = new player(id, name, playerStatus.unready, 0);
                    playerService.addPlayer(p.id, p);
                    gameAreaView.login(p);
                    playerListView.login(p);

                },
                error : function(data) {
                    console.log("此人名字获取失败");
                }
            })
        } else {

            var p = playerService.getPlayer(id);
            gameAreaView.login(p);

        }

    } else {

        console.log(message);
        var p = playerService.getPlayer(id);
        gameAreaView.logout(p);
        playerListView.logout(p.id);
        playerService.deletePlayer(id);


    }

};
resolvePredict.kick = function(message) {
    var kickID=message.object;
    if (globalView.getCreaterId() == kickID) {
        document.location.href = "/m/list.do";
    } else {



        var p = playerService.getPlayer(kickID);
        gameAreaView.kick(p);
        playerListView.logout(p.id);
        playerService.deletePlayer(p.id);


    }
};




resolvePredict.right = function(message) {

    var type = globalView.getRoomType();
    if ("game" == type) {
        // console.log(message.subject + " has right " + message.object);
        var arr = message.object.split(",");
        rightView.noRight();//先禁用所有的权限,再打开.

        $.each(arr, function (i, val) {
            //console.log(("process data " + arr[img]));
            rightView.branch(jQuery.trim(arr[i]));
        });

    } else {
        //record no any right

    }


};


/*
 * /room/detail.do?	房间信息接口
 * uid, rid			Param参数
 * 
 * /player/info.do?	用户名接口地址
 * uids, rid			Param参数
 * 
 * */


var doms = {
    uid : "#uid",
    rid : "#rid",
    player : "nav ul"
};

function showRecord(messages, speed) {

    var mq = [];
    for (var index in messages) {
        var ms = messages[index];


        var msgLength = ms.length;


        for (var i = msgLength - 1; i >= 0; i--) {
            var message = ms[i];

            mq.push(message);


        }

    }
    showMessage(0, mq, speed)
}

function showMessage(index, messages, speed) {

    if (index >= messages.length) {
        return;
    }
    var message = messages[index];
    resolvePredict.branch(message);

    if (index == message.length - 1) {
        //最后一个,无法获取下一条消息的间隔期


    } else {
        var nextMessage = messages[index + 1];
        recordFirstTime = message.time;
        recordSecondTime = nextMessage.time;
        //间隔期
        msg_interval = (recordSecondTime - recordFirstTime) * speed;

    }
    index++;
    console.log("next message will run after " + msg_interval);
    setTimeout(showMessage, msg_interval, index, messages, speed);

}

function showRecord2(message, speed) {

    var start = jQuery.now();
    var msg_interval = 0;

    var time = message.time;
    if (recordFirstTime == null) {
        recordFirstTime = time;
    } else {

    }
    recordSecondTime = time;
    //间隔期
    msg_interval = (recordSecondTime - recordFirstTime) * speed;
    sleep(msg_interval);
    resolvePredict.branch(message);
    recordFirstTime = time;
    $(document).dequeue("record");


}

function sleep(n) {
    var start = new Date().getTime();
    while (true)  if (new Date().getTime() - start > n) break;
}
var initRoom = function() {

    //1.判断是房间还是记录,这个功能是放在哪里呢.是合到Service里,还是在Controller里控制
    var type = globalView.getRoomType();
    var uid = globalView.getCurrentID();
    var rid = globalView.getRoomID();
    var settingHtml;
    var exp;


    if ("game" == type) {
        //init expression
        exp = settingService.getExpress(globalView.getRoomID());
        settingHtml = settingService.getSetting(new settingGetParameter(globalView.getRoomID(), globalView.getVersion()))


        //init expression

        controlView.initExpression(exp);
        //init color
        controlView.initColor();
        //init setting
        settingView.showSetting(settingHtml);

        //1.init game players/setting
        var param = {
            uid :uid,
            rid : rid
        };
        var data = roomService.getRoomDetail(param);
        if (data == null) {
            console.log("error,not get room detail " + param);
            return;

        }
        if (data.room.id == rid) {
            //检验是否有玩家信息，如果没有玩家信息则应该为空房间，不需要继续处理下去
            if (data.person.length) {
                versionFunction["parseDetail"](data);
            } else {

            }
        } else {

        }


        //start comet
        cometService.comet(uid, messageQ);

        //initControllview
        controlView.initButtonOfGame();

         //判断是否有音乐盒,默认不显示
      //  musicUtil.displayMusic();

        versionFunction["init"];


    } else {

              //默认隐藏
               $("#role_area").hide();
                $("#dead_area").hide();
                 $("#killeer_area").hide();

        //Record
        var recordID = globalView.getRecordId();
        var recordTime = globalView.getRecordTime();


        var param = {recordID:recordID}
        var data = roomService.getRecordDetail(param);
        if (data == null) {
            console.log("error,not get record detail " + param);
            return;

        }
        if (data.person.length) {
            roomService.parseRecord(data.person);
            roomService.parseRoom(data.room);

        } else {

        }


        exp = settingService.getExpressFromRecord(globalView.getRecordId());
        settingHtml = settingService.getSettingFromRecord(globalView.getRecordId());
        controlView.initButtonOfRecord();
        controlView.showRecordAllTime(recordTime);
        rightView.noRight();//先禁用所有的权限,再打开.
        recordReplayStartAt = new Date().getTime();


        //init expression

        controlView.initExpression(exp);
        //init color
        controlView.initColor();
        //init setting
        settingView.showSetting(settingHtml);


    }


    //如果是Game,text应该是空的.如果是历史记录.开始执行.
    if ("game" == type) {

    } else {
        var text = $("#contents").text();
        var messages = eval(text);
        //应该是倒序
        showRecord(messages, 0);
        viewUtil.autoBottom("section article");


    }


}


$(document).ready(function() {
    $.ajaxSettings.traditional = true;
    //初始化，获取房间所有信息,有可能是玩的房间,有可能是战例播放
    initRoom();

    jiathis_config = {
        title:defaultShareTitle
    }


});