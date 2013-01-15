/**
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

        default :
            console.log("未写到的动作：" + message.predict);
    }

}
killController.say = function(message) {


    var status = globalView.getGameStatus();
    if ("run" == status) {
        var name;
        if (message.object != -500) {
            name = playerService.getPlayer(message.object).name;
        }
        gameAreaView.say(message.subject, playerService.getPlayer(message.subject).name, message.content, message.expression,
            message.color, message.object, name);
    } else {

    }


};

killController.living = function(message) {
    $("#" + message.subject).children("a").removeClass().addClass("living");
};
killController.status = function(message) {
    var name = idFindName(message.subject);
    if (message.object == "lastword") {

        $("section article").append("<p style='color:#F00;'>【系统消息】 [" + name + "]  被杀了么,我了个去,遗言时间，赶紧静下来聆听 [" + name + "] 的最后一句话。</p>");
    }
    playerService.setStatus(message.subject, message.object);
    playerListView.setStatus(message.subject, message.object);

};
killController.kill = function(message) {

    playerListView.kill(message.subject);
    gameAreaView.kill(playerService.getPlayer(message.subject).name, playerService.getPlayer(message.object).name, message.expression, message.content);
};
killController.die = function(message) {

    playerService.setStatus(message.subject, playerStatus.die)
    playerListView.die();
    gameAreaView.die(message.subject, playerService.getPlayer(message.subject).name, message.object);

};

killController.vote = function(message) {

    gameAreaView.vote(playerService.getPlayer(message.subject).name,
        playerService.getPlayer(message.object).name, message.color, message.expression, message.content);

};
killController.setVote = function(message) {

    playerListView.setVote(message.subject, message.object);

};
killController.clearVote = function() {
    $("nav li i").text("");
};

killController.assign = function(message) {
    //本地存入自己身份
    //杀手栏展示杀手名单
    $("#assign").val(message.subject);
    if (message.subject == "killer") {
        var p = playerService.getPlayer(message.object);
        var name=p.name;
        p.role="killer";
        playerService.updatePlayer(p);
        killGameAreaView.showContentForRoleArea(killGameAreaView.Hint.killerList + name);


    }
};

//ID转为名字
function idGetName(num, returnName) {
    var rid = $("#rid").val();
    var name;
    $.ajax({
        type : "GET",
        dataType : 'json',
        url : "/player/info.do?rid=" + rid + "&uids=" + num,
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






