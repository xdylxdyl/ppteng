/**
 * test webstorm
 * @directions  处理长链接
 * @author Jqhan <jqhan@gemantic.cn>
 */
var timer = null;


var killController = {};

killController.parseMessage = function(message) {
    switch (message.predict) {
        case "vote" :
            killController.vote(message);
            break;
        case "set vote" :
            killController.setVote(message);
            break;
        case "clear vote" :
            killController.clearVote(message);
            break;
        case "time" :
            killController.timeChange(message);
            break;
        case "kill" :
            killController.kill(message);
            break;
        case "die" :
            killController.die(message);
            break;
        case "assign" :
            killController.assign(message);
            break;
        case "living" :
            killController.living(message);
            break;
        case "lastword" :
            killController.say(message);
            break;
        case "role" :
            killController.role(message);
            break;
        case "decryption" :
            killController.decryption(message);
            break;
        case "status" :
            killController.status(message);
            break;
        case "start" :
            gameView.start(message);
            break;
        case "over" :
            gameView.over(message);
            break;
        case "say":
              killController.say(message);
            break;

        default :
            console.log("未写到的动作：" + message.predict);
    }

}



killController.role = function(message) {


    var name = idFindName(message.subject);
    var role = "";
    if ("killer" == message.object) {
        role = "杀手";
    } else {
        role = "水民";
    }


    $("#"+selects.$playerRole).empty().html("身份:" + role );


};

killController.decryption = function(message) {
    var name = playerService.getName(message.subject);
    if ("killer" == message.object) {

        $("#"+selects.$gameArea).append("<p style='color:#F00;'> 【系统消息】 [" + name + "] 是杀手</p>");
    }else{
        $("#"+selects.$gameArea).append("<p style='color:#F00;'> 【系统消息】 [" + name + "] 是水民</p>");
    }

};


killController.assign = function(message) {
    //本地存入自己身份
    //杀手栏展示杀手名单
    var p = playerService.getPlayer(message.object);
    p.role=message.subject;
    playerService.updatePlayer(p);
    playerListView.displayRole(killGameAreaView.Role[p.role]);
};


killController.timeChange = function(message) {

    var status=message.subject;

    globalView.setGameStatus(status);
    killGameAreaView.showConentForGamePhase(killGameAreaView.Phase[status]);

    var status = message.subject;
    var p = playerService.getPlayer(globalView.getCurrentID());

    killGameAreaView.showContentForGameArea(killGameAreaView.Hint[status]);
    killGameAreaView.showConentForGamePhase(killGameAreaView.Phase[status]);
    viewUtil.autoBottom( $("#"+selects.$gameArea));
    controlView.clearCountDownTime();
    controlView.setCountDownTime(message.object);


};

killController.say = function(message) {

    var p=playerService.getPlayer(message.subject);
    killGameAreaView.say(message.subject,p.name,message.content,message.expression,message.color,message.object,"");


};

killController.living = function(message) {
     playerService.setStatus(message.subject, playerStatus.living);
    $("#" + message.subject).children("a").removeClass().addClass("living");
};
killController.status = function(message) {
    var name = idFindName(message.subject);
    if (message.object == "lastword") {

        $("#"+selects.$gameArea).append("<p style='color:#F00;'>【系统消息】 [" + name + "]  被杀了,遗言时间，静下来聆听 [" + name + "] 的最后一句话。</p>");
    }
    playerService.setStatus(message.subject, message.object);
    playerListView.setStatus(message.subject, message.object);


};
killController.kill = function(message) {

    playerListView.kill(message.subject);
    killGameAreaView.kill(playerService.getPlayer(message.subject).name, playerService.getPlayer(message.object).name, message.expression, message.content);
};
killController.die = function(message) {

    playerService.setStatus(message.subject, playerStatus.die)
    playerListView.die();
    killGameAreaView.die(message.subject, playerService.getPlayer(message.subject).name, message.object);

    var selfID=globalView.getCurrentID();
    if(selfID==message.subject){
        var p=playerService.getPlayer(message.subject)
        gameView.showSecondArea(p);
    }


};

killController.vote = function(message) {

    if("day"==globalView.getGameStatus()){
        killGameAreaView.vote(playerService.getPlayer(message.subject).name,
        playerService.getPlayer(message.object).name, message.color, message.expression, message.content);

    }

};
killController.setVote = function(message) {

    playerListView.setVote(message.subject, message.object);

};
killController.clearVote = function() {
    $("nav li img").text("");
};



//ID转为名字
function idGetName(num, returnName) {
    var rid = $("#rid").val();
    var name;
    $.ajax({
        type : "GET",
        dataType : 'json',
        url : "/player/info?rid=" + rid + "&uids=" + num,
        success : function(data) {
            name = data.infos.name;
        },
        error : function(data) {
            console.log("此人名字获取失败");
        }
    });
    return returnName();
}
function idFindName(id, pre) {
    var name = playerService.getPlayer(id).name;
    if (pre) {
        return pre + name;
    } else {
        return name;
    }
}
//倒计时


function comet(id, parse) {
    var url = "http://42.121.113.70:8000/channel/" + id;
    try {
        cometUtil.polling(url, parse);
    } catch  (e) {
        console.log("comet error ,retry " + e);
        cometUtil.polling(url, parse);
    }

}







