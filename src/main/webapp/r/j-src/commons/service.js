var playerService = {

    updatePlayer:function(p) {
        id_name[p.id] = p;
    },
    deletePlayer:function(id) {
        delete id_name[id];
    },
    addPlayer:function(id, player) {
        id_name[id] = player;
    },
    getPlayer:function(id) {
        var p = id_name[id];
        if (p == null) {
            p = new player("", "", "", "");
        }
        return p;
    },
    setStatus:function(id, status) {
        id_name[id].status = status;
    },
    setName:function(id, name) {
        id_name[id].name = name;
    },
    setCount:function(id, count) {
        id_name[id].count = name;
    },
    getAll:function() {
        var living = playerStatus.living;
        var die = playerStatus.die;
        var unready = playerStatus.unready;
        var sortList = {
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
    setStartStatus:function() {
        //只有已准备的玩家才是活着的
        for (var key in id_name) {
            var p = this.getPlayer(key);
            if (playerStatus.ready == p.status) {
                this.setStatus(key, playerStatus.living);
            }

        }

    },
    setUnreadyStatus:function() {
        for (var key in id_name) {
            this.setStatus(key, playerStatus.unready);
        }

    },
    updateUserInfo:function(userInfo) {
        return ajaxJson("/player/update.do?", "post", userInfo, null, 5000, "html");

    },
    getRoomOfPerson: function (uid) {
        var room = {}
        var data = ajaxJson("/player/info.do?", "post", {uids:uid}, null, 5000, "json")
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
    getSetting:function(parameter) {
        return ajaxJson("/m/form/setting.do?", "get", parameter, null, 5000, "html")

    },

    saveSetting:function(s) {


        return ajaxJson("/m/form/setting.do?", "post", s, null, 5000, "html");
    },
    saveExpress:function(exp) {
        return ajaxJson("/m/expression/update.do?", "post", exp, null, 5000, "html");
    },
    getExpress:function(rid) {

        return ajaxJson("/m/expression/show.do?", "get", {rid:rid}, this.parseExpress, 5000, "json");
    },
    parseExpress:function(data) {
        return data.expression;
    },
    getExpressFromRecord:function(recordID) {
        return ajaxJson("/record/expression/show.do?", "get", {recordID:recordID}, this.parseExpress, 5000, "json");
    },

    getSettingFromRecord:function(recordID) {
        return ajaxJson("/record/setting.do?", "get", {recordID:recordID}, null, 5000, "html")
    }

}

var roomService = {

    getRoomDetail:function(baseParam) {


        return  ajaxJson("/room/detail.do?", "POST", baseParam, null, 5000, "json");


    },
    getRecordDetail:function(param) {

        return  ajaxJson("/record/detail.do?", "get", param, null, 5000, "json");
    },

    parseCount:function (counts) {
        for (var key in counts) {
            var c = counts[key];
            playerListView.setVote(c.id, c.voters.length);
        }

    },



    parsePerson:function(data) {

     var rid=globalView.getRoomID();
        //每个person下的信息有：id，name，status

        var uids = [];
        for (var key in data) {
            var id = data[key].id;
            uids.push(id);
        }

        //由nameID获取真正name
        var name = this.getPerson(rid, uids);
        for (var j = 0; j < name.length; j++) {
            console.log(name[j].id + " : " + name[j].name + " : " + data[j].status);
            var p = new player(name[j].id, name[j].name, data[j].status, data[j].count == null ? 0 : data[j].count);
            playerService.addPlayer(p.id, p);
            playerListView.login(p);

        }

        playerListView.sortPlayer();
    },





    parseRole:function(data) {
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

    },
    parseGame:function(data) {
        if (data == null) {
            return;
        }

        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var player = playerService.getPlayer(globalView.getCurrentID());
        if (playerStatus.die == player.status) {
            gameAreaView.swithTopArea("deadArea");
        } else {

        }
    },
    parseRoom:function(data) {
        var creater = data.creater;
        playerListView.displayCreater(creater);
    },
    parseRight:function( data) {
         var uid = globalView.getCurrentID();
        //每个right下的信息有：id，isNotify, right[]

        if (data!=null&&data.isNotify && data.id == uid) {
            for (var i = 0; i < data.right.length; i++) {
                var right = data.right[i];
                // console.log("process right " + right);
                rightView.branch(right);
            }
        }

    },

    getPerson:function(rid, uids) {
        var param;
        if (rid == null) {
            param = {uids:uids};
        } else {
            param = {rid:rid,uids:uids};
        }
        return ajaxJson("/player/info.do", "GET", param, this.parsePersonDetail, 5000, "json");

    },
    parsePersonDetail:function(data) {
        return  data.infos;
    }


};

roomService.info = function() {
    var option = $.extend({}, doms, {
        uid: $(doms.uid).val(),
        rid: $(doms.rid).val()
    });
    var baseParam = {
        uid : option.uid,
        rid : option.rid
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

        globalView.setGameStatus(data.status);
        controlView.setCountDownTime(data.remainTime);
        var player = playerService.getPlayer(globalView.getCurrentID());
        if (playerStatus.die == player.status) {
            gameAreaView.swithTopArea("deadArea");
        } else {

        }


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
            console.log(name[j].id + " : " + name[j].name + " : " + data[j].status);
            var p = new player(name[j].id, name[j].name, data[j].status, data[j].count == null ? 0 : data[j].count);
            playerService.addPlayer(p.id, p);
            playerListView.login(p);

        }

        playerListView.sortPlayer();

    }

    function getPersonName(uids) {
        var names;
        $.ajax({
            type : "GET",
            dataType: "json",
            async : false,
            url: "/player/info.do?rid=" + option.rid + uids,
            success: function(data) {
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
    comet: function (id, parse) {
        var url = "http://42.121.113.70:8000/channel/" + id;
        cometUtil.polling(url, parse);
    }
}
