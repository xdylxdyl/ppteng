/**
 * @directions  初始化房间
 * @author Jqhan <jqhan@gemantic.cn>
 */









/*
 * /room/detail?	房间信息接口
 * uid, rid			Param参数
 * 
 * /player/info?	用户名接口地址
 * uids, rid			Param参数
 * 
 * */


var initGame = function () {

    //1.判断是房间还是记录,这个功能是放在哪里呢.是合到Service里,还是在Controller里控制
    var type = globalView.getRoomType();
    var uid = globalView.getCurrentID();
    var rid = globalView.getRoomID();
    var createrID = globalView.getCreaterId();
    var settingHtml;
    var exp;


    //1.init expression
    exp = settingService.getExpress(globalView.getRoomID());
    controlView.initExpression(exp);
    //2.init color
    controlView.initColor();



    //2.init game status every has self setting.expect playlist etc
    var param = {
        uid:uid,
        rid:rid
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
    //4 init setting
    settingHtml = settingService.getSetting(new settingGetParameter(globalView.getRoomID(), globalView.getVersion()))
    settingView.showSetting(settingHtml);


    //5 start comet
    webSocketUtil.connect(uid);

    //cometService.comet(uid,cometService.messageQ)


    //6.initControllview
    controlView.initButtonOfGame();

    //7 init room creater

    var creater = playerService.getPlayer(createrID);
    playerListView.displayCreater(creater);

    //7.set staging show
    var player = playerService.getPlayer(uid);
    var message = {};
    message.content = globalView.getLoginShow();
    var first = globalView.getFirst();
    gameAreaView.login(player, message, first);




    //8 version self dependency
    if (versionFunction["init"]) {
        versionFunction["init"]();
    }

    //9
    controlView.initObject();

}


var initRecord = function () {

    //1.判断是房间还是记录,这个功能是放在哪里呢.是合到Service里,还是在Controller里控制

    var uid = globalView.getCurrentID();
    var rid = globalView.getRoomID();
    var createrID = globalView.getCreaterId();
    var version = globalView.getVersion();
    var settingHtml;
    var exp;


    //record

    //默认隐藏
    $("#" + selects.$playerRole).hide();

    gameView.hideDieArea();


    $("#displayRoleGroup").show();
    controlView.hideButton("select_expression");
    controlView.hideButton("select_color");
    controlView.hideButton("select_command");
    controlView.hideButton("select_object");
    controlView.hideButton("sayButton");
    controlView.hideButton("sayInput");
    controlView.hideButton("sayLabel");

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

    if (versionFunction["init"]) {
        versionFunction["init"]();
    }

    var text = $("#contents").text();
    var messages = eval(text);
    //应该是倒序
    recordService.showRecord(messages, 0);
    viewUtil.autoBottom($("#" + selects.$gameArea));


}
$(document).ready(function () {
    $.ajaxSettings.traditional = true;
    //初始化，获取房间所有信息,有可能是玩的房间,有可能是战例播放

    if ("game" != globalView.getRoomType()) {
        initRecord();

    } else {
        initGame();
    }

    jiathis_config = {
        title:defaultShareTitle
    }


});