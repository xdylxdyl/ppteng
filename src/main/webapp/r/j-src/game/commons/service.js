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
            if(role==player.role){
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

    getName:function (id) {


        var p = id_name[id];
        if (p == null) {

            return  ajaxJson("/player/detail/show?", "get", {"uid":id}, playerService.parseDetail, 5000, "json");
        } else {
            return p.name;
        }


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
            var p = new player(name[j].id, name[j].name, data[j].status, data[j].count == null ? 0 : data[j].count);
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
        if(!webSocketUtil.isConnect()){
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
            var name;
            if (message.object != -500) {
                name = playerService.getPlayer(message.object).name;
            }
            gameAreaView.say(message.subject, playerService.getPlayer(message.subject).name, message.content, message.expression,
                message.color, message.object, name,message.time);
        } else {

            versionFunction["say"](message);


        }


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
                    async : false,
                    success:function (data) {
                        console.log(data);
                        var name = data.infos[0].name;
                        var p = new player(id, name, playerStatus.unready, 0);
                        playerService.addPlayer(p.id, p);
                        gameAreaView.login(p, message);
                        playerListView.login(p);

                    },
                    error:function (data) {
                        console.log("此人名字获取失败");
                    }
                })
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
