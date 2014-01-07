/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-14
 * Time: 下午5:09
 * To change this template use File | Settings | File Templates.
 */
/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */

/**
 * @directions  初始化房间
 * @author Jqhan <jqhan@gemantic.cn>
 */





String.prototype.template = function () {
    var msg = arguments[0];

    return this.replace(/\{(native|name|hint)_([^\}]*)\}/g, function (m, pre, parameter) {
        var result;
        console.log(m);
        console.log(pre);
        console.log(parameter);
        switch (pre) {
            case "native":
                result = msg[parameter];
                break;
            case "name":
                result = playerService.getNamesByIds(msg[parameter], ",");
                break;
            case "hint":

                result = versionFunction.templateConfig[msg.predict].hint[msg[parameter]];
                break;
        }
        return result;
    });
}

var expression = {

    "1":"温柔的",
    "2":"笑着",
    "3":"同情的",
    "4":"依依不舍的",
    "5":"神秘兮兮的",
    "6":"幸灾乐祸的",
    "7":"泪流满面的",
    "8":"傻乎乎的",
    "9":"很无辜的",
    "10":"很受伤的",
    "11":"无精打采的",
    "12":"严肃的",
    "13":"像臭臭般英俊的",
    "14":"面无表情的",
    "15":"站在天桥上",
    "16":"躺在马路边",
    "17":"浮在太空里",
    "18":"骑在月亮上"
};

var ptitle = {
    1:"一贫如洗",
    2:"衣衫褴褛",
    3:"家徒四壁",
    4:"小有积蓄",
    5:"锦衣玉食",
    6:"穿金戴银",
    7:"家财万贯",
    8:"一掷千金",
    9:"富可敌国",
    10:"天下无双"


}

var colorConfig = {
    "system":"#F00"

}

var contentTemplate = {
    generateUserContent:function (content) {
        return   "<p style='font-weight:bold;color:" + content.color + "'>[" + content.subject + "] " + content.expression + " " + content.firstAction + " [" + content.object + "] " + content.secondAction + " : " + content.content + " </p>"
    },
    generateSystemContent:function (content, message) {
        var str = "";
        if (content == null || content.template == null) {
            str = "";
        } else {

            str = "<p style='color:" + content.color + ";'>" + content.template.template(message) + "</p>";
        }


        return str;

    },
    convertMessage2Content:function (message) {
        var cid = selects.$gameArea;
        var config = burgModel.templateConfig[message.predict];
        var t = "";
        if (config) {
            if (config.contentID) {
                cid = config.contentID;
            }
            var color = message.color;
            if (config.color) {
                color = config.color;
            }
            if (burgModel.templateConfig[message.predict]) {
                if (burgModel.templateConfig[message.predict].template) {
                    t = burgModel.templateConfig[message.predict].template;

                }
            }
        }

        return  {
            color:color,
            expression:controlView.showExpression(message.expression),
            template:t,
            contentID:cid
        }
    },
    showContent:function (message) {
        var c = contentTemplate.convertMessage2Content(message);
        var str = contentTemplate.generateSystemContent(c, message);
        gameAreaView.showContent(c.contentID, str);
    },
    updateAngularModel:function (message) {
        console.log("will update angularjs " + message);
        var ms = [];
        if (burgModel.templateConfig[message.predict]) {
            if (burgModel.templateConfig[message.predict].updateAngularModel) {
                ms = burgModel.templateConfig[message.predict].updateAngularModel;
                console.log(ms);
                $.each(ms, function (i, val) {
                    var m = ms[i];
                    angularUtil.updateModel(m.id, m.key, m["template"].template(message));
                });

            }


        }
    }



}

var action = {
    say:"说"

}

var hint = {
    kick:"你好,再见"
}

var commandCommonSetting = {
    kick:"果断一脚"
}

var gameGlobalStatus = {
    over:"over",
    run:"run"

}

var userExpression = {
};


var color = {

    "#000000":"高级黑",
    "#F65581":"脑残粉",
    //"#FAD807":"土豪金",
    "#EACA07":"土豪金",
    "#3AB328":"茶婊绿",
    "#643B89":"滚犊紫",
    "#26BDDA":"武藤蓝",
    // "#E6E9F8":"东北银",
    "#BABABA":"东北银",

    "#FF1493":"深粉红",
    "#FF00FF":"紫红色",
    "#9d2932":"胭脂",
    "#b36d61":"檀",
    "#d98175":"绾",
    "#FA8072":"鲜肉色",
    "#BC8F8F":"褐玫瑰",
    "#E065BB":"粉玫瑰",
    "#8B008B":"暗洋红",
    "#0000FF":"蓝色",
    "#8A2BE2":"紫罗兰",
    "#5F9EA0":"军蓝色",
    "#6495ED":"菊蓝色",
    "#008B8B":"暗青色",
    "#00BFFF":"深天蓝",
    "#1E90FF":"闪蓝色",
    "#ADD8E6":"亮蓝色",
    "#20B2AA":"亮海蓝",
    "#87CEFA":"亮天蓝",
    "#B0C4DE":"亮钢蓝",
    "#9ACD32":"黄绿色",
    "#008B8B":"暗青色",
    "#789262":"竹青",
    "#a3e2c5":"艾青",
    "#177cb0":"靛青",
    "#006400":"暗绿色",
    "#2F4F4F":"墨绿色",
    "#556B2F":"暗橄榄",
    "#DEB887":"实木色",
    "#FF8C00":"暗桔黄",
    "#b9b612":"秋香",
    "#76664d":"黎",
    "#DAA520":"金麒麟",
    "#808080":"灰色",
    "#D2B48C":"茶色"


}


var PlayerAction = {
    "/kiss":"轻轻亲吻了一下自己的手,就好像在亲许久不见的朋友",
    "/sit":"盘腿坐在木头房顶上,闭上眼睛开始念经",
    "/out":"团成一团飞快的滚向远方,瞬间消失不见了",
    "/laugh":"一楞.突然反应过来.然后实在忍不住了,一口水直接喷出十多米远",
    "/think":"歪着头想了很久,一动也不动.就这样一年多过去了....",
    "/cry":"对着空气就大声哭起来,泪水落在地上哗哗的",
    "/miss":"实在太想念臭臭了,就双手紧紧抱着自己,好像是在抱着臭臭,又像是臭臭在抱着自己",
    "/walk":"叹了口气.还是决定继续走下去,背个包一个人出门而已,有什么好怕的",
    "/run":"飞快的冲着公交车跑过去,气都喘不上来了还是喘着气想要追上公交车上的她,怕错过",
    "/angry":"悲从心来,怒吼一声,双手握拳,仰天长啸,小宇宙直接以2^8次方燃烧起来,众人无法承受这种灼热的温度,无奈的散开了去",
    "/eat":"直接抓起馒头大的包子塞到嘴里,水都来不及喝,就这么直接咽了下去",
    "/hungry":"忽然觉得前胸贴后背,肚子咕咕叫,顿时什么兴致都没有了,一脚踹开还在呻吟的另一位,光着身子就奔厨房去了",
    "/sleep":"看了看XD在自己的身边,于是就拉着他的手沉沉睡去了,还梦到了自己和XD一起在一个一望无际的草原中看星星",
    "/jump":"轻轻一跃,就到了最高的摘星塔尖上,众人顿时吸了一口气,这塔可是高达几万米啊"

}


var player = function (id, name, status, count, role, money) {
    return{
        id:id,
        name:name,
        status:status,
        count:count,
        role:(role == null) ? "water" : role,
        money:money
    };

}

var Content = {
    color:"",
    expression:"",
    subject:"",
    firstAction:"",
    object:"",
    secondAction:"",
    content:""
}

var playerStatus = {
    unready:"unready",
    living:"living",
    die:"die",
    ready:"ready",
    lastword:"lastword",
    king:"king"

}

var defaultShareTitle = "我在[葡萄藤]玩杀人游戏[简化版]~~来跟我一起玩吧~~~";


var id_name = {};


var settingGetParameter = function (rid, version) {
    return{
        rid:rid,
        version:version
    }

}


var expressionParameter = function (rid, exp) {
    return{
        rid:rid,
        express:exp
    }
}


var recordFirstTime = null;
var recordSecondTime = null;
var msg_interval = null;
var recordReplayStartAt = null;
var record_timer = null;
var lastMessageSendAt = null;

var selects = {
    $gameArea:"game_area",
    $dieArea:"die_area",
    $description:"description_area",
    $killerArea:"killer_area",
    $settingArea:"setting_area",
    $playerList:"playerList",
    $game_nav:"game_nav",
    $die_nav:"die_nav",
    $killer_nav:"killer_nav",
    $setting_nav:"setting_nav",
    $music_nav:"music_nav",
    $submitSetting:"submitSetting",
    $sayLabel:"sayLabel",
    $sayInput:"sayInput",
    $sayButton:"sayButton",
    $readyButton:"readyButton",
    $startButton:"startButton",
    $replayButton:"replayButton",
    $exitButton:"exitButton",
    $command:"command",
    $object:"object",
    $expression:"expression",
    $color:"color",
    $netSpeedHint:"netSpeedHint",
    $countDown:"countDown",
    $createName:"createName",
    $gamePhase:"gamePhase",
    $playerRole:"playerRole",
    $playerCard:"playerCard",
    $checkBox:"checkBox", //auto roll
    $privateSay:"privateSay", //privateSay
    $displayRole:"displayRole",
    $countDown:"countDown",
    $select_command:"select_command",
    $select_expression:"select_expression",
    $select_object:"select_object",
    $select_color:"select_color",
    $mainArea:"mainArea",
    $secondArea:"secondArea",
    $content:"content",
    $sidebarNav:"sidebar-nav",
    $multiObjectGroup:"multiObjectGroup"



}


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


    //1.hide
    for (var index in controlView.hideGameEmpty) {
        $("#" + controlView.hideGameEmpty[index]).hide();
    }


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
    /*    var player = playerService.getPlayer(uid);
     var message = {};
     message.content = globalView.getLoginShow();
     var first = globalView.getFirst();
     gameAreaView.login(player, message, first);*/


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

    //1.hide
    for (var index in controlView.hideEmpty) {
        $("#" + controlView.hideEmpty[index]).hide();
    }

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
var recordService = {

    showRecord:function (messages, speed) {

        var mq = [];
        for (var index in messages) {
            var ms = messages[index];


            var msgLength = ms.length;


            for (var i = msgLength - 1; i >= 0; i--) {
                var message = ms[i];

                mq.push(message);


            }

        }
        recordService.showMessage(0, mq, speed)
    },

    showMessage:function (index, messages, speed) {

        if (index >= messages.length) {
            return;
        }
        var message = messages[index];
        roomParseService.branch(message);

        if (index == message.length - 1) {
            //最后一个,无法获取下一条消息的间隔期


        } else {
            var nextMessage = messages[index + 1];
            if (nextMessage == null) {

            } else {
                recordFirstTime = message.time;
                recordSecondTime = nextMessage.time;
                //间隔期
                msg_interval = (recordSecondTime - recordFirstTime) * speed;
            }


        }
        index++;
        //  console.log("next message will run after " + msg_interval);
        setTimeout(recordService.showMessage, msg_interval, index, messages, speed);

    }

}

var playerService = {
    assign:function (message) {
        var p = playerService.getPlayer(message.object);
        p.role = message.subject;
        playerService.updatePlayer(p);
    },
    die:function (message) {
        playerService.setStatus(message.subject, playerStatus.die)
        playerListView.sortPlayer();
    },
    clearCount:function (status) {
        if ("night" == status || "lastword" == status) {
            for (var key in id_name) {
                var player = this.getPlayer(key);
                player.count = 0;


            }
        }

    },

    getGroupNames:function (group) {
        var result = [];

        for (var key in group) {
            var player = this.getPlayer(group[key]);
            result.push(player.name);
        }
        return result;
    },

    getRoleGroupNames:function (role) {
        var result = [];

        for (var key in id_name) {
            var player = this.getPlayer(id_name[key]);
            if (role == player.role) {
                result.push(player.name);
            }

        }
        return result;
    },


    updatePlayer:function (p) {
        id_name[p.id] = p;
    },
    deletePlayer:function (id) {
        delete id_name[id];
    },
    addPlayer:function (id, player) {
        id_name[id] = player;
    },
    getPlayer:function (id) {
        var p = id_name[id];
        if (p == null) {
            p = new player("", "", "", "");
        }
        return p;
    },

    getName:function (idContent) {

        var ids = idContent.split(","); //字符分割
        var names = [];
        for (var id in ids) {
            var p = id_name[ids[id]];
            var name = "";
            if (p == null) {

                name = ajaxJson("/player/detail/show?", "get", {"uid":id}, playerService.parseDetail, 5000, "json");
            } else {
                name = p.name;
            }
            names.push(name);

        }

        return array2splitString(names, ",");


    },
    parseDetail:function (data) {
        return data.user.name;
    },
    setStatus:function (id, status) {
        if (id_name[id]) {
            id_name[id].status = status;
        }

    },
    setName:function (id, name) {
        id_name[id].name = name;
    },
    setCount:function (id, count) {
        id_name[id].count = name;
    },
    getAllPlayer:function () {
        var result = [];
        for (var key in id_name) {
            var player = this.getPlayer(key);
            result.push(player);

        }
        return result;
    },
    getAll:function () {
        var living = playerStatus.living;
        var die = playerStatus.die;
        var unready = playerStatus.unready;
        var sortList = {
            king:[],
            ready:[],
            living:[],
            die:[],
            unready:[],
            other:[]
        }

        for (var key in id_name) {
            var player = this.getPlayer(key);
            var status = player.status;
            switch (status) {
                case playerStatus.king :
                    sortList.king.push(key);
                    break;
                case playerStatus.living :
                    sortList.living.push(key);
                    break;
                case playerStatus.die :
                    sortList.die.push(key);
                    break;
                case playerStatus.ready :
                    sortList.ready.push(key);
                    break;
                case playerStatus.unready :
                    sortList.unready.push(key);
                    break;
                default :
                    sortList.other.push(key);
            }

        }

        var result = [];
        for (var status in sortList) {
            var list = sortList[status];
            for (var uid in list) {
                result.push(list[uid])
            }
        }


        return result;
    },
    setStartStatus:function () {
        //只有已准备的玩家才是活着的
        for (var key in id_name) {
            var p = this.getPlayer(key);
            if (playerStatus.ready == p.status) {
                this.setStatus(key, playerStatus.living);
            }

        }

    },
    statusCount:function (status, c) {
        var count = 0;
        for (var key in id_name) {
            var player = this.getPlayer(key);

            if (status == player.status) {
                count++;
            }
        }
        if (count > c) {
            return true;
        } else {
            return false;
        }

    },

    setUnreadyStatus:function () {
        for (var key in id_name) {
            this.setStatus(key, playerStatus.unready);
        }

    },
    updateUserInfo:function (userInfo) {
        return ajaxJson("/player/update?", "post", userInfo, null, 5000, "html");

    },

    updateShow:function (show) {
        return  ajaxJson("/player/update/stage?", "post", {"show":show}, null, 5000, "json");
    },
    getRoomOfPerson:function (uid) {
        var room = {}
        var data = ajaxJson("/player/info?", "post", {uids:uid}, null, 5000, "json")
        var users = data.infos;
        for (var key in users) {
            var u = users[key];
            if (u.id == uid && u.rid != "") {
                room.id = u.rid;
                room.name = u.rname;
                return room;

            }
        }
        return null;
    },
    getNamesByIds:function (idsring, split) {
        if (split == "") {
            split == ",";
        }
        var ids = splitString2Array(idsring, split);
        var names = [];
        for (var index in ids) {
            var name = playerService.getPlayer(ids[index]).name
            names.push(name);
        }

        return array2splitString(names, split);

    },
    getNamesByIdLists:function (ids, split) {

        var names = [];
        for (var index in ids) {
            var name = playerService.getPlayer(ids[index]).name
            names.push(name);
        }

        return array2splitString(names, split);

    }




}


var settingService = {
    getSetting:function (parameter) {
        return ajaxJson("/m/form/setting", "get", parameter, null, 5000, "html")

    },

    saveSetting:function (s) {


        return ajaxJson("/m/form/setting", "post", s, null, 5000, "html");
    },
    saveExpress:function (exp) {
        return ajaxJson("/m/expression/update", "post", exp, null, 5000, "html");
    },
    getExpress:function (rid) {

        return ajaxJson("/m/expression/show", "get", {rid:rid}, this.parseExpress, 5000, "json");
    },
    parseExpress:function (data) {
        return data.expression;
    },
    getExpressFromRecord:function (recordID) {
        return ajaxJson("/record/expression/show", "get", {recordID:recordID}, this.parseExpress, 5000, "json");
    },

    getSettingFromRecord:function (recordID) {
        return ajaxJson("/record/setting", "get", {recordID:recordID}, null, 5000, "html")
    }

}

var roomService = {
    appendContent:function () {
        var content = $(this).text();
        controlView.appendSay(content);
    },

    getRoomDetail:function (baseParam) {


        return  ajaxJson("/room/detail", "POST", baseParam, null, 5000, "json");


    },
    getRecordDetail:function (param) {

        return  ajaxJson("/record/detail", "get", param, null, 5000, "json");
    },

    parseCount:function (counts) {

        var status = globalView.getGameStatus();


        for (var key in counts) {
            var c = counts[key];
            playerListView.setVote(c.id, c.voters.length);

        }


    },


    parsePerson:function (data) {

        var rid = globalView.getRoomID();
        //每个person下的信息有：id，name，status

        var uids = [];
        for (var key in data) {
            var id = data[key].id;
            uids.push(id);
        }

        //由nameID获取真正name
        var name = this.getPerson(rid, uids);
        for (var j = 0; j < name.length; j++) {
            // console.log(name[j].id + " : " + name[j].name + " : " + data[j].status);
            var p = new player(name[j].id, name[j].name, data[j].status, data[j].count == null ? 0 : data[j].count, "", data[j].money);
            playerService.addPlayer(p.id, p);
            // playerListView.login(p);

        }

        playerListView.sortPlayer();
        globalView.showSelf(playerService.getPlayer(globalView.getCurrentID()));
    },

    parseRecord:function (data) {

        var rid = globalView.getRecordId();
        //每个person下的信息有：id，name，status

        var uids = [];
        for (var key in data) {
            var id = data[key].id;
            uids.push(id);
        }

        //由nameID获取真正name
        var name = this.getRecordPerson(rid, uids);
        for (var j = 0; j < name.length; j++) {
            // console.log(name[j].id + " : " + name[j].name + " : " + data[j].status);
            var p = new player(name[j].id, name[j].name, data[j].status, data[j].count == null ? 0 : data[j].count);
            playerService.addPlayer(p.id, p);
            playerListView.login(p);

        }

        playerListView.sortPlayer();
    }, parseRoom:function (data) {

    },
    parseRight:function (data) {
        var uid = globalView.getCurrentID();
        //clear allright
        rightView.noRight();
        //每个right下的信息有：id，isNotify, right[]

        if (data != null && data.id == uid) {
            for (var i = 0; i < data.right.length; i++) {
                var right = data.right[i];
                // console.log("process right " + right);
                rightView.branch(right);
            }
        }

    },

    getPerson:function (rid, uids) {
        var param;
        if (rid == null) {
            param = {uids:uids};
        } else {
            param = {rid:rid, uids:uids};
        }
        return ajaxJson("/player/info", "GET", param, this.parsePersonDetail, 5000, "json");

    },
    getRecordPerson:function (rid, uids) {
        var param;
        if (rid == null) {
            param = {uids:uids};
        } else {
            param = {rid:rid, uids:uids};
        }
        return ajaxJson("/player/record", "GET", param, this.parsePersonDetail, 5000, "json");

    },

    parsePersonDetail:function (data) {
        return  data.infos;
    }


};

roomService.info = function () {
    var option = $.extend({}, doms, {
        uid:$(doms.uid).val(),
        rid:$(doms.rid).val()
    });
    var baseParam = {
        uid:option.uid,
        rid:option.rid
    };

    function _ajax(baseParam, success, error) {

    }

    function success(info) {


    }

    function role(data) {
        if (data == null) {
            return;
        }

        if ("killer" == data.role) {
            var p = playerService.getPlayer(data.id)
            var str = p.name + " ";
            gameAreaView.showContentForRoleArea(gameAreaView.Hint.killerList + str);
            p.role = "killer";
            playerService.updatePlayer(p);

        }

    }

    ;
    function game(data) {
        if (data == null) {
            return;
        }

        globalView.setGameStatusHint(data.status);
        controlView.setCountDownTime(data.remainTime);
        var player = playerService.getPlayer(globalView.getCurrentID());


    }

    function person(data) {

        //每个person下的信息有：id，name，status

        var uids = "";
        for (var i = 0; i < data.length; i++) {
            /* person += "<li id=" + data[img].id
             + "><a class='" + data[img].status
             + "'></a><span></span></li>";*/
            uids += "&uids=" + data[i].id;
        }

        //由nameID获取真正name
        var name = getPersonName(uids);
        for (var j = 0; j < name.length; j++) {
            //console.log(name[j].id + " : " + name[j].name + " : " + data[j].status);
            var p = new player(name[j].id, name[j].name, data[j].status, data[j].count == null ? 0 : data[j].count);
            playerService.addPlayer(p.id, p);
            playerListView.login(p);

        }

        playerListView.sortPlayer();

    }

    function getPersonName(uids) {
        var names;
        $.ajax({
            type:"GET",
            dataType:"json",
            async:false,
            url:"/player/info?rid=" + option.rid + uids,
            success:function (data) {
                names = data.infos;
            }
        });
        return names;
    }


    function right(data) {

        //每个right下的信息有：id，isNotify, right[]

        if (data.isNotify && data.id == option.uid) {
            for (var i = 0; i < data.right.length; i++) {
                var right = data.right[i];
                // console.log("process right " + right);
                rightView.branch(right);
            }
        }
    }

    function room(data) {

        var creater = data.creater;
        playerListView.displayCreater(creater);


    }

    function error(info) {

    }

    _ajax(baseParam, success, error);


}


var cometService = {
    comet:function (id, parse) {
        var url = "http://42.121.113.70:8000/channel/" + id;
        cometUtil.polling(url, parse);
    },
    sendMessage:function (message) {
        if (!webSocketUtil.isConnect()) {
            webSocketUtil.connect(globalView.getCurrentID());
        }
        lastMessageSendAt = jQuery.now();

        webSocketUtil._send(JSON.stringify(message));


    },
    messageQ:function (msgObj) {
        cometService.parseMessage(msgObj.message);

    },

    parseMessage:function (message) {


        var msgLength = message.length; //msg数组长度

        for (var i = msgLength - 1; i >= 0; i--) {
            roomParseService.branch(message[i]);

        }


    }
}


var roomParseService = {


    branch:function (message) {
        // console.log(message.subject + " " + message.predict + " " + message.object + " " + message.content + " " + message.where);
        var rid = globalView.getRoomID();
        var type = globalView.getRoomType();
        if (rid != message.where && "game" == type) {

            gameAreaView.updateRubbishText();

            return;
        } else {
            gameAreaView.completeRubbishText();
        }

        var start = jQuery.now();
        controlView.showDelay(message);
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
                // console.log("room parse over,start version parse");
                versionFunction["parseMessage"](message);
        }


    },


    updateExpression:function (message) {

        var exp = eval(message.object);

        controlView.initExpression(exp);

    },


    setting:function (message) {


        if (message.subject != globalView.getCurrentID()) {

            var version = globalView.getVersion();
            var rid = globalView.getRoomID();
            var param = {"version":version, "rid":rid};

            var s = settingService.getSetting(param);
            settingView.showSetting(s);
            if (versionFunction["settingCallback"]) {
                versionFunction["settingCallback"]();
            }


        }

    },
    say:function (message) {


        var status = globalView.getGameStatus();
        if ("over" == status) {

            var playAction;
            if (PlayerAction[message.content]) {
                playAction = "";
                message.content = PlayerAction[message.content];

            } else {
                playAction = "say"

            }
            var name;
            if (message.object != -500) {
                name = playerService.getPlayer(message.object).name;
            }
            gameAreaView.say(message.subject, playerService.getPlayer(message.subject).name, message.content, message.expression,
                message.color, message.object, name, message.time, message.privateContent, playAction);


        } else {

            versionFunction["say"](message);


        }


        /*   var s = angular.element($("#navbar-inner")).scope();
         s.text="yyyy";

         s.$apply();*/


    },
    ready:function (message) {


        playerService.setStatus(message.subject, playerStatus.ready)
        controlView.ready(message.subject);
        playerListView.setStatus(message.subject, playerStatus.ready);


    },


    start:function (message) {
        //  console.log(message);
        playerService.setStartStatus();
        gameView.start();
    },


    log:function (message) {
        //进入退出游戏，1、需要通报全场；2、加减玩家列表响应的玩家信息。
        var id = message.subject;
        if (message.predict == "login") {

            var type = globalView.getRoomType();
            if ("game" == type) {
                var rid = $("#rid").val();
                $.ajax({
                    type:"GET",
                    dataType:'json',
                    url:"/player/info?rid=" + rid + "&uids=" + message.subject,
                    async:false,
                    success:function (data) {
                        console.log(data);
                        var name = data.infos[0].name;
                        var money = data.infos[0].money;
                        var p = new player(id, name, playerStatus.unready, 0, "", money);
                        playerService.addPlayer(p.id, p);


                        gameAreaView.login(p, message, true);
                        playerListView.login(p);

                    },
                    error:function (data) {
                        console.log("此人名字获取失败");
                    }
                })

                //9
                controlView.initObject();
            } else {

                var p = playerService.getPlayer(id);
                gameAreaView.login(p);

            }

        } else {

            //console.log(message);
            var p = playerService.getPlayer(id);
            gameAreaView.logout(p);
            playerListView.logout(p.id);
            playerService.deletePlayer(id);

            //9
            controlView.initObject();


        }

    },
    kick:function (message) {
        var kickID = message.object;
        if (globalView.getCreaterId() == kickID || globalView.getCurrentID() == kickID) {
            document.location.href = "/m/list";
        } else {


            var p = playerService.getPlayer(kickID);
            gameAreaView.kick(p);
            playerListView.logout(p.id);
            playerService.deletePlayer(p.id);


        }
    },


    right:function (message) {

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


    }


};
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

        var model = {
            detail:{creater:player.id}
        }
        angularUtil.updateModels("navbar-inner", model);


        // $("#" + selects.$createName).empty().html("管理员:" + player.name);

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
            $("#" + selects.$playerRole).addClass("text-danger");
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
            $("#" + selects.$playerRole).addClass("text-danger");
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
        var right = $("#sayButton").prop("disabled");
        if (right && 'say' == controlView.getCommandValue()) {
            return true;
        } else {
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



            $("#" + selects.$select_command).html("指令<span class='caret'></span>");

        $("#" + selects.$command).attr("data-default", "say");
        controlView.resetObject();
        controlView.switchObject("single");


    },

    resetExpression:function () {

            $("#" + selects.$select_expression).html("神态<span class='caret'></span>");


        $("#" + selects.$expression).attr("data-default", "0");
    },

    emptyCommand:function () {
        $("#" + selects.$command).empty().append(defaultHint.command);
        $("#" + selects.$command).attr("data-default", "");
    },
    resetObject:function () {



            $("#" + selects.$select_object).html("对象<span class='caret'></span>");


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


        //玩家动作：say, ready, start, kick, vote, kill
        $("#" + selects.$sayInput).on("keydown", function (event) {

            //发送内容违禁词过滤检查函数
            //TODO
            var key = event.keyCode || event.which;
            //回车就发送消息
            if (key == "13") {
                event.preventDefault();
                if (controlView.isMute()) {
                    alert("嘘.现在不能说话.");
                }
                else {
                    say(event);
                }
            }

        });

        function say(event) {
            var formatResult = controlView.checkFormat();
            if (formatResult.code == 0) {
                //success
                var message = controlView.getMessage();

                //filter lastword ---not commons
                var player = playerService.getPlayer(globalView.getCurrentID());
                if (player.status == playerStatus.lastword && "lastword" == globalView.getGameStatus()) {
                    message.predict = globalView.getGameStatus();
                }
                cometService.sendMessage(message);
                controlView.clearSayInput();
                controlView.resetCommand();
                controlView.resetExpression();
            } else {
                //error
                alert(formatResult.message);
            }

            event.preventDefault();

        }

        $("#" + selects.$sayButton).on("click", function (event) {
            if (controlView.isMute()) {
                alert("嘘.现在不能说话.");
            }
            else {
                say(event);
            }

        });


        $("#" + selects.$startButton).on('click', function () {
            //检查准备人数是否合规则，否则return

            var count = versionFunction["readyCount"];
            if (count) {

            } else {
                count = 0;
            }
            var isReady = playerService.statusCount("ready", count);

            if (isReady) {

                var message = controlView.getMessage();
                message.predict = "start";
                cometService.sendMessage(message);
                $("#" + selects.$startButton).hide();
            } else {
                alert("超过" + count + "人再开游戏好不好啊~~~~~");
            }

        });
        $("#" + selects.$readyButton).on('click', function () {
            //检查准备人数是否合规则，否则return
            var maxCount = versionFunction["readyMaxCount"];
            if (maxCount) {

            } else {
                maxCount = 65539;
            }
            var isMaxReady = playerService.statusCount("ready", maxCount);

            if (isMaxReady) {
                alert("已经超过" + maxCount + "人了.等一局吧亲~~~~~");
            } else {
                var message = controlView.getMessage();
                message.predict = "ready";
                cometService.sendMessage(message);
                $("#" + selects.$readyButton).hide();
            }


        });
        $("#" + selects.$exitButton).click(function () {
            var type = globalView.getRoomType();
            var url;
            var r = confirm("确定退出？");

            if ("game" == type) {
                url = "/m/list";
                if (r == true) {

                    var message = controlView.getMessage();
                    message.predict = "logout";
                    cometService.sendMessage(message);
                    redirect(url);


                }
            } else {
                url = "/record/list";
                redirect(url);
            }


        });

        $("#replayButton").on("click", function () {
            recordFirstTime = null;
            recordSecondTime = null;
            msg_interval = null;
            recordReplayStartAt = new Date().getTime();
            record_timer = null;

            var text = $("#contents").text();
            var messages = eval(text);
            recordService.showRecord(messages, 1);
            $("#" + selects.$replayButton).val("播放中..");
            controlView.showRecordCurrentTime(0, globalView.getRecordTime());


        });


        $("#displayRole").on("click", function () {

            if (controlView.isShow()) {
                $("#" + selects.$playerRole).show();
                gameView.showDieArea();
            }
            else {
                $("#" + selects.$playerRole).hide();
                gameView.hideDieArea();
            }


        });


        $("#" + selects.$gameArea).on("dblclick", "p", function () {

            roomService.appendContent.call(this);
            return false;

        });

        $('#sidebar-toggle').toggle(function () {
            globalView.hidePlayerList('#sidebar-toggle');
        }, function () {
            globalView.showPlayerList('#sidebar-toggle');
        });

        $('[href][auto-bottom]').on("shown", function () {
            var linkID = $(this).attr("href");
            viewUtil.autoBottom($(linkID));
        })


    }

)
;
