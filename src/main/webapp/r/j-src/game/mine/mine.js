var gameView = {
    hideDieArea:function () {

    }
}

$(document).ready(function () {
    timer = null;
    //左键
    $("#inner").on("click", "div", function () {

        var isSendMessage = mineView.isSendClickMessage();
        if (isSendMessage) {
            var mo = mineView.getMineOperater(this, mouseAction.click);
            var rid = globalView.getRoomID();
            var version = globalView.getVersion();
            mineService.sendMineOperater(mo, rid, version);
        } else {

            if (mineView.isSaveMine()) {
                mineView.showStoreMine.call(this);
                mineView.setSaveMineCheckBox(false);
                return;

            } else {


            }
            return;
        }


    });


    $("#saveMineCheckBox").on("click", function () {
        $("#previewHint").show();
    })

    $("#closePreview").on("click", function () {

        $("#previewHint").hide();

    })


    $("#restart").on("click", function () {
        mineView.initMine();
        return false;
    });


    //左右开弓
    //$("#inner div").bind("")

    var mineSize = {
        width:12,
        height:12,
        border:2
    }

    var mouseAction = {
        click:"click",
        doubleClick:"double click",
        rightClick:"tag"
    };

    var mineOperater = function (action, x, y, value) {
        return {
            id:x + "-" + y,
            action:action,
            x:x,
            y:y,
            value:value
        }
    };

    var settingPostParameter = function (rid, version, row, column, count) {
        return{
            rid:rid,
            version:version,
            setting:[
                {"rowCount":row},
                {"columnCount":column},
                {"mineCount":count}
            ]
        }
    }


    var wrongMine;

    var mineUtil = {
        convertMessage2Mine:function (message) {
            var subject = message.subject;
            var ids = subject.split("-");
            return new mineOperater(message.predict, ids[0], ids[1], message.object);

        },
        convertStr2Mine:function (str) {
            var row = mineView.getSettingRow();
            var column = mineView.getSettingColumn();
            var result = [];
            for (var i = 0; i < str.length; i++) {
                var v = str.substr(i, 1);
                var r = Math.floor(i / column);
                var c = Math.floor(i % column);
                result.push(new mineOperater("", r + 1, c + 1, v))
            }


            return result;
        }



    }

    var bombStr = {

    };

    var mineSettingView = {
        isTrain:function () {
            var level = $("#mineLevel").val();
            if (level == "level6") {
                return true;
            } else {
                return false;
            }
        },
        initSetting:function () {

            var html = "<select id='mineSelect'><option value ='0' id='level0'>初级</option><option value ='1' id='level1'>中级</option><option  id='level2' value ='2'>高级</option><option  id='level3'value='3'>仙级</option><option  id='level4' value='4'>神级</option>" +
                "<option  id='level5' value='5'>自定义</option>" + "<option  id='level6' value='6'>训练模式</option>" +
                "</select> <small class='text-error'>提交生效</small>";
            var nextHtml = "<p class='pull-right' ><a href='#' class='btn' id='nextButton'>下一组雷图</a></p>";
            $("#" + selects.$settingArea).prepend(html + nextHtml);

            var row = parseInt($("#rowCount").val());
            var column = parseInt($("#columnCount").val());
            var mine = parseInt($("#mineCount").val());
            var content = $("#mineContent").val();
            var systemContent = $("#systemContent").val();
            var level = $("#mineLevel").val();
            $("#mineContentGroup").hide();
            $("#systemContentGroup").hide();
            $("#mineLevelGroup").hide();
            $("#nextButton").hide();
            $("#previewHint").hide();
            $("#saveMineArea").hide();
            mineView.updateSetting(row, column, mine, content);
            //default mineSelect is 1.
            mineSettingView.updateSettingParameter(level, row, column, mine, true, content, systemContent);


            $("#nextButton").on("click", function () {

                trainMineIndex++;
                //通过trainMineIndex来控制.这段代码写的不太好
                var mineSetting = mineService.getTrainMine();
                mineSettingView.updateSettingParameter("level6", mineSetting.row, mineSetting.column, mineSetting.mine, true, mineSetting.content, mineSetting.systemContent);
            });


            $("#mineSelect").on("change", function () {
                var level = $(this).children('option:selected').val();
                switch (level) {
                    case "0":
                        mineSettingView.updateSettingParameter("level0", 9, 9, 10, true);
                        break;
                    case "1":
                        mineSettingView.updateSettingParameter("level1", 16, 16, 40, true);
                        break;

                    case "2":
                        mineSettingView.updateSettingParameter("level2", 16, 30, 99, true);
                        break;
                    case "3":
                        mineSettingView.updateSettingParameter("level3", 40, 40, 500, true);
                        break;
                    case "4":
                        mineSettingView.updateSettingParameter("level4", 100, 100, 2000, true);
                        break;
                    case "5":
                        //self
                        mineSettingView.updateSettingParameter("level5", 16, 16, 40, false);
                        break;
                    case "6":
                        //train

                        var mineSetting = mineService.getTrainMine();
                        mineSettingView.updateSettingParameter("level6", mineSetting.row, mineSetting.column, mineSetting.mine, true, mineSetting.content, mineSetting.systemContent);
                        break;
                    default:
                        break;


                }


            });


        },
        updateSettingParameter:function (level, row, column, mine, readOnly, content, systemContent) {
            if (row) {
                $("#rowCount").val(row);

            } else {
                $("#rowCount").attr("old", $("#rowCount").val());
            }
            if (column) {
                $("#columnCount").val(column);


            } else {
                $("#columnCount").attr("old", $("#columnCount").val());
            }
            if (mine) {
                $("#mineCount").val(mine);

            } else {
                $("#mineCount").attr("old", $("#mineCount").val());
            }

            if (level) {
                $("#mineLevel").val(level);
            } else {

                $("#mineLevel").attr("old", $("#mineLevel").val());

            }
            if (content) {
                $("#mineContentGroup").show();

                $("#nextButton").show();
                $("#mineContent").val(content);
            } else {
                $("#mineContentGroup").hide();
                $("#nextButton").hide();
                $("#mineContent").val("");
                $("#mineContent").attr("old", $("#mineContent").val());


            }


            if (systemContent) {
                $("#systemContentGroup").show();


                $("#systemContent").val(systemContent);
            } else {
                $("#systemContentGroup").hide();

                $("#systemContent").val("");
                $("#systemContent").attr("old", $("#systemContent").val());


            }


            $("#rowCount").prop("readOnly", readOnly);
            $("#columnCount").prop("readOnly", readOnly);
            $("#mineCount").prop("readOnly", readOnly);
            $("#mineContent").prop("readOnly", readOnly);
            $("#systemContent").prop("readOnly", readOnly);
            $("#" + level).prop("selected", true);


        },
        getSettingParameter:function () {
            var r = parseInt($("#rowCount").val());
            if (r > 100) {
                $("#rowCount").val(100);
            }
            var c = parseInt($("#columnCount").val());
            if (c > 100) {
                $("#columnCount").val(100);
            }
            var m = parseInt($("#mineCount").val());
            if (m > c * r) {
                m = c * r / 2;
            }
            var level = $("#mineLevel").val();
            if ("level5" == level) {
                if (m < 10) {
                    m = 10;
                }
            }


            $("#mineCount").val(m);
            var params = jQuery("#setting").serialize();
            return params;
        }
    }

    //{1:{row:2,column:3,mine:2,content:"xxxxx"}}
    var trainMineContents = null;

    var trainMineIndex = 0;
    var mineView = {
        isSaveMine:function () {
            return $("#saveMineCheckBox").prop("checked");
        },
        //计算雷图
        showStoreMine:function () {
            //1.获取当前鼠标点击的Div的坐标
            var x = parseInt($(this).attr("x"));
            var y = parseInt($(this).attr("y"));
            console.log(x + "," + y);
            //2.获取截取雷图的坐标范围，雷区选择 9*9

            var divCount = 3;

            var leftTopX = (x - divCount) < 1 ? 1 : x - divCount;

            var leftTopY = (y - divCount) < 1 ? 1 : y - divCount;

            var rightTopX = leftTopX;
            var rightTopY = (y + divCount) > mineView.setting.column ? mineView.setting.column : y + divCount;

            var leftBottomX = (x + divCount) > mineView.setting.row ? mineView.setting.row : x + divCount;
            var leftBottomY = rightTopY;

            var rightBottomX = leftBottomX;
            var rightBottomY = rightTopY;

            var rowCount = leftBottomY - leftTopY;
            var columnCount = rightTopY - leftTopY;
            console.log(leftTopX + "," + leftTopY + "  -   " + rightTopX + "," + rightTopY + "  -   " + leftBottomX + "," + leftBottomY + "  -   " + rightBottomX + "," + rightBottomY);

            var systemContent = "";
            var userContent = "";
            //3.从当前的系统坐标中生成新的字符串//4.从当前的用户坐标中儿取点开的字符串位置

            console.log(bombStr.system);
            var i = 0;
            for (var saveHeight = leftTopX - 1; saveHeight < leftBottomX; saveHeight++) {
                var start = leftTopY + i * mineView.setting.row - 1;
                var end = rightTopY + i * mineView.setting.row;

                if (end >= bombStr.system.length) {
                    break;
                }
                var row = bombStr.system.substring(start, end);
                var userrow = bombStr.user.substring(start, end);
                console.log(start + "," + end + " : " + row + " : " + userrow);
                systemContent = systemContent + row;
                userContent = userContent + userrow;
                i++;
            }
            console.log(systemContent);
            console.log(userContent);


            //5.根据3,4生成保存的雷图，根据雷的数目生成系统雷图。根据用户点开的格子生成最终的雷图
            var content = mineService.getMineContent({row:rowCount + 1, column:columnCount + 1, systemContent:systemContent, userContent:userContent});


            //6.显示出来


        },
        setSaveMineCheckBox:function (isCheck) {
            $("#saveMineCheckBox").prop("checked", isCheck);
        },
        isSendClickMessage:function () {
            var isSendMessage = false;
            if (mineView.isSaveMine()) {
                return false;
            }
            var p = playerService.getPlayer(globalView.getCurrentID());
            if ("living" == p.status || "ready" == p.status) {
                var divClass = $(this).attr("class");
                if (divClass != undefined && divClass != "") {

                } else {

                    isSendMessage = true;

                }


            } else {

            }
            return isSendMessage;
        },

        updateSetting:function (row, column, mine, content) {
            mineView.setting.row = row;
            mineView.setting.column = column;
            mineView.setting.mine = mine;
            if (content) {
                mineView.setting.content = content;
            }
        },
        setting:{
            row:0,
            column:0,
            mine:0,
            content:""

        },
        oldSetting:{
            row:0,
            column:0,
            mine:0,
            content:""

        },

        getMineOperater:function (div, action) {

            var act;
            var x = $(div).attr("x");
            var y = $(div).attr("y");
            var value = $(div).attr("mvalue");
            switch (value) {
                case "flag":
                    act = mouseAction.doubleClick;
                    break;
                default:
                    act = action;
            }

            var mo = new mineOperater(act, x, y, value);
            return mo;

        },
        showPlayerHint:function (message, mine) {
            var place = message.subject;

            var content = message.object;

            var uid = message.content;
            var action;
            if (content == "#") {
                action = "标记";
            } else {
                action = "点击";
            }

            var player = playerService.getPlayer(uid);
            $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 [" + player.name + "] " + action + "了 [" + place + "] </p>");
            viewUtil.autoBottom($("#" + selects.$gameArea));


        },
        showClickCount:function (message) {
            var uid = message.subject;
            var player = playerService.getPlayer(uid);
            var time = parseInt($("#overMessage").attr("time")) / 1000;
            var count = parseInt(message.object);
            $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 [" + player.name + "] 共点击了 [" + message.object + "]次 ,平均每秒 [" + (count / time).toFixed(3) + "] 次</p>");
            var money = parseInt($("#" + uid + "_vote").attr("count")) * 10;
            if ($("#overMessage").attr("result") == "win" && !mineSettingView.isTrain()) {
                $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 [" + player.name + "] 金币  [" + money + "]</p>");
            } else {

            }

            viewUtil.autoBottom($("#" + selects.$gameArea));
        },

        showMineOperater:function (mo, divID) {
            if (divID) {

            } else {
                divID = "inner";
            }
            var x = parseInt(mo.x);
            var y = parseInt(mo.y);
            var id = "#" + divID + "-" + mo.id;
            var value = mo.value;

           // var index = (x - 1) * mineView.setting.column + y - 1;
           // console.log(index + "," + bombStr.user);

          //  var pre = bombStr.user.substring(0, index);
          //  var nex = bombStr.user.substring(index + 1, bombStr.user.length);

            var replaceValue = value;


            switch (value) {
                case "#":
                    $(id).empty();
                    $(id).removeClass().addClass("flag");
                    mineView.clearMine();
                    break;
                case "empty":
                    $(id).empty();
                    $(id).removeClass().addClass("square");
                    replaceValue = 0;
                    break;
                case "bomb":
                    $(id).empty();
                    $(id).removeClass();
                    $(id).addClass("square").addClass("wrong");
                    $(id).text("*");
                    replaceValue = "*";
                    break;
                case "clear":
                    $(id).empty();
                    $(id).removeClass();

                    mineView.tagMine();
                    replaceValue = "n";
                    break;
                case "n":
                    $(id).empty();
                    $(id).removeClass();
                    break;
                case "0":
                    $(id).empty();
                    $(id).removeClass();
                    $(id).addClass("square").addClass("q" + value);
                    break;

                default:
                    $(id).empty();
                    $(id).removeClass();
                    $(id).addClass("square").addClass("q" + value);
                    $(id).text(value);
            }

          //  bombStr.user = pre + replaceValue + nex;
           // console.log(index + "," + pre + "," + nex + "," + bombStr.user);


        },
        showMergeMessage:function (contents) {
            var singles = contents.split(",");
            var result = [];
            $.each(singles, function (n, value) {
                var ids = value.split("-");
                if (ids.length == 3) {
                    var mo = new mineOperater("mine", ids[0], ids[1], ids[2]);
                    mineView.showMineOperater(mo);
                }
            });

        },
        getSettingRow:function () {
            return mineView.setting.row;
        },
        getSettingColumn:function () {
            return mineView.setting.column;
        },
        getSettingMineCount:function () {
            return mineView.setting.mine;
        },

        tagMine:function () {
            var count = parseInt($("#count").text());
            count++;
            $("#count").text(count);

        },
        clearMine:function () {
            var count = parseInt($("#count").text());
            count--;
            $("#count").text(count);
        },
        initMineCount:function (count) {
            $("#count").text(count);
        },
        start:function () {


            controlView.hideButton(selects.$startButton);
            $("#" + selects.$gameArea).empty();
            $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 游戏开始,扫扫扫扫扫扫雷吧~</p>");

            viewUtil.autoBottom($("#" + selects.$gameArea));


            playerListView.sortPlayer();
            settingView.hideSettingButton();

            wrongMine == null;

            mineView.initMine();


            mineView.startCountTime();

            notifyUtil.sendNotify("各位雷神", "游戏已开始，速度带手指头归位", "");

        },
        startCountTime:function () {
            controlView.clearCountDownTime();
            controlView.startCountTime(0);
        },
        showWrong:function (message) {
            var uid = message.subject;
            var place = message.object;
            var player = playerService.getPlayer(uid);
            var money = message.content;

            $("#" + selects.$gameArea).append("<p style='color:#F00'>【系统消息】 哈哈哈哈哈哈哈 [" + player.name + "]同学我早知道你不靠谱了,你在 [" + place + "] 点到雷了，会被扣除" + money + "～心疼不，自断手指吧亲 </p>");
        },
        over:function (message) {

            var obj = message.object;
            var recordID = message.subject;
            var userTime = parseInt(message.content) / 1000;
            //标明游戏结束
            globalView.setGameStatus("over");
            playerService.setUnreadyStatus();
            //只重新显示.不用重新计算
            settingView.displaySetting();
            mineService.parseBomb(bombStr.system, "mine");
            if ("win" == obj) {
                $("#" + selects.$gameArea).append("<p style='color:#F00' id='overMessage' result='win' time='" + message.content + "''>【系统消息】 居然赢了.~~赶紧的开始下一局,用时 [" + userTime + "]秒</p>");
            } else {
                $("#" + selects.$gameArea).append("<p style='color:#F00'  id='overMessage' result='lose'time='" + message.content + "'>【系统消息】 果然输了,用时 [" + userTime + "]秒~~赶紧的开始下一局</p>");
                mineView.showMineOperater(wrongMine);

            }

            mineView.initMineCount(0);


            //展示错误的地方,以及谁点错的

            controlView.clearCountDownTime();

        },
        initMine:function (id) {

            var row = mineView.getSettingRow();
            var column = mineView.getSettingColumn();
            var maxCount = mineView.getSettingMineCount();
            if (id) {
                row=mineView.oldSetting.row;
                column=mineView.oldSetting.column;


            } else {
                id = "inner";
            }
            $("#" + id).empty();

            mineView.initMineCount(maxCount);

            //12的Div+左右两个2PX+1
            var containerWidth = 16 * parseInt(column);
            /*   console.log("mine width is " + mineSize.width + " border is " + mineSize.border + " column is " + column + " ,so Total" +
             "weith is " + containerWidth);*/
            /*
             var containerHeight = (mineSize.width + mineSize.border) * parseInt(column);
             console.log("mine height is " + mineSize.height + " border is " + mineSize.border + " row is " + row + " ,so Total" +
             "height is " + containerHeight);*/

            $("#" + id).width(containerWidth);


            for (var i = 0; i < row * column; i++) {

                var r = Math.floor(i / column) + 1;
                var c = Math.floor(i % column) + 1;
                var mineHtml = "<div x='" + r + "' y='" + c + "' id='" + id + "-" + r + "-" + c + "'></div>"
                $("#" + id).append(mineHtml);
                //  $("#inner2").append(mineHtml);
            }
            ;

            //右键,似乎必须是要加在这个位置
            $("#inner div").rightClick(function (e) {


                var c = this.prop("class");
                if (c && c != "flag") {
                    return;
                }

                var p = playerService.getPlayer(globalView.getCurrentID())

                if ("living" == p.status || "ready" == p.status) {
                    var mo = mineView.getMineOperater(this, mouseAction.rightClick);
                    var rid = globalView.getRoomID();
                    var version = globalView.getVersion();
                    mineService.sendMineOperater(mo, rid, version);

                } else {
                    return;
                }


            })


        }



    }

    var mineService = {
        getMineContent:function (param) {
            return  ajaxJson("/mine/train/generate?", "get", param, mineService.parseMIneContentt, 5000, "json");

        },
        parseMIneContentt:function (data) {
            console.log(data);
            mineView.oldSetting.row = data.row;
            mineView.oldSetting.column = data.column;
            mineView.oldSetting.mine = data.mine;


            mineView.initMine("innerDemo");
            mineService.parseBomb(data.userContent, false, "innerDemo");
        },
        getTrainMine:function () {


            mineService.getTranMainContents();

            //循环.如果是最后一个.就自动开始第一局
            if (trainMineIndex > trainMineContents.length - 1) {
                trainMineIndex = 0;
            }
            return trainMineContents[trainMineIndex];

        },
        getTranMainContents:function () {
            return  ajaxJson("/mine/train/list?", "get", null, mineService.parseTrainList, 5000, "json");
        },
        parseTrainList:function (data) {
            trainMineContents = {};
            for (var key in data) {

                var mineSetting = {};
                mineSetting.row = data[key].row;
                mineSetting.column = data[key].column;
                mineSetting.mine = data[key].mine;
                mineSetting.content = data[key].content;
                mineSetting.systemContent = data[key].systemContent;
                trainMineContents[key] = mineSetting;

            }

        },

        parseRoom:function (data) {
            var row = data.setting.rowCount;
            var column = data.setting.columnCount;
            var mine = data.setting.mineCount;

            mineView.updateSetting(row, column, mine);

        },
        parseGame:function (data) {

            if (data == null) {
                return;
            }

            globalView.setGameStatus(data.status);

            controlView.clearCountDownTime();
            controlView.startCountTime(jQuery.now() - data.startAt);

        },

        parseCount:function (counts) {
            for (var key in counts) {
                var c = counts[key];
                playerListView.setVote(c.uid, c.count);
            }

        },
        sendMineOperater:function (mo, rid, version) {
            var message = {
                subject:globalView.getCurrentID(),
                predict:mo.action,
                object:mo.id,
                where:rid,
                version:version,
                sendAt:jQuery.now()
            }
            cometService.sendMessage(message);

            // return ajaxJson("/message/accept2?", "post", message, null, 5000, "html")

        },
        parseMessage:function (message) {
            switch (message.predict) {

                case "start" :
                    mineView.start(message);
                    break;
                case "over" :
                    mineView.over(message);
                    break;

                case "mine":
                    //  console.log(message.subject + " " + message.predict + " " + message.object + " " + message.content + " " + message.where);
                    var mine = mineUtil.convertMessage2Mine(message);
                    if (mine.value == "bomb") {
                        wrongMine = mine;
                    } else {
                        mineView.showMineOperater(mine);
                        mineView.showPlayerHint(message, mine);

                    }

                    break;

                case "mergeMine":
                    //console.log(message.subject + " " + message.predict + " " + message.object + " " + message.content + " " + message.where);

                    mineView.showMergeMessage(message.object);


                    break;

                case "init":
                    bombStr.user = message.object;
                    bombStr.system = message.subject;
                    mineService.parseBomb(bombStr.user);
                    // console.log("init is " + bombStr.system);
                    break;
                case "count":
                    playerListView.setVote(message.subject, message.object);
                    break;

                case "clickCount":
                    mineView.showClickCount(message);
                    break;

                case "wrong":
                    mineView.showWrong(message);
                    break;


                default:
                    console.log("not my version process " + message.predict);

            }


        },
        parseDetail:function (data) {
            roomService.parsePerson(data.person);
            mineService.parseRoom(data.room);
            roomService.parseRight(data.right);
            mineService.parseGame(data.game);
            mineService.parseCount(data.votes);

            //  var start=new Date().getTime();
            if ("run" == globalView.getGameStatus()) {
                mineView.initMine();
                mineService.updateBomb(data.bomb);
                mineService.parseBomb(bombStr.user);
            }

            //  mineService.parseBomb(data.bomb.system);
            //  console.log("parse use time "+(new Date().getTime()-start));
        },

        parseBomb:function (str, mine, id) {
            var mines = mineUtil.convertStr2Mine(str);
            for (var key in mines) {
                //是否只显示雷
                if (mine) {
                    if (mines[key].value == "bomb" || mines[key].value == "*") {
                        mineView.showMineOperater(mines[key], id);
                    }
                } else {
                    mineView.showMineOperater(mines[key], id);
                }


            }

        },
        updateBomb:function (bomb) {
            bombStr = bomb;
        }

    }

    defaultShareTitle = "我在[葡萄藤]玩疯狂扫雷[多人版]~~来跟我一起破记录吧~~~";

    versionFunction = {
        //"rightView":simpleRightView.branchRight,
        "initSetting":mineSettingView.initSetting,
        "getSettingParameter":mineSettingView.getSettingParameter,
        "parseMessage":mineService.parseMessage,
        "parseDetail":mineService.parseDetail
        //   "settingPostParameter":settingPostParameter89,,


    }


});


(function ($) {
    $.fn.extend({
        "rightClick":function (fn) {
            $(this).bind('contextmenu', function (e) {
                return false;
            });
            $(this).mousedown(function (e) {
                if (3 == e.which) {
                    fn.call($(this), e);
                }
            });
        }
    });

    $.bindLR = function (elem, type, data, fn, intv) {
        var L_BUTTON = $.browser.msie ? 1 : 0;
        var R_BUTTON = $.browser.msie ? 0 : 2;
        var LR_BUTTON = 3; // ie
        var orgType = type.substr(2);
        var L_flag = false;
        var R_flag = false;
        var getTime = function () {
            return +new Date;
        };
        var lrId = getTime();

        // elem节点的$.cache
        elem.data('lrId', lrId);
        var orgFns = [];

        for (var i in $.cache) {
            // 找到原来的绑定功能
            if ($.cache[i]['lrId'] == lrId) {
                var fns = $.cache[i]['events'][orgType];
                for (var j in fns) {
                    orgFns.push(fns[j]);
                    elem.unbind(orgType, fns[j]);
                }
                //移除它
                elem.removeData('lrId');
                break;
            }
        }
        elem.data('lrTempEvents', orgFns);
        var timer = getTime();
        var timeOut;
        var reset = function () {
            L_flag = false;
            R_flag = false;
            clearTimeout(timeOut);
        };
        var orgFnHandle = function (e, data) {
            reset();
            for (var i = 0; i < orgFns.length; i++) {
                orgFns[i].call(elem, e, data);
            }
        };
        var L_event = function (e, data) {
            if (!R_flag) { //等待
                // 如果是LR_BUTTON，就不等了
                // 在IE下LR_BUTTON调用L_BUTTON事件
                if (getTime() - timer > intv) {
                    L_flag = true;
                    timer = getTime();
                    timeOut = setTimeout(
                        function () {
                            orgFnHandle(e, data);
                        },
                        intv + 1
                    );
                }
            } else {
                reset();
                var deltT = getTime() - timer;
                if (deltT <= intv) {
                    fn.call(elem, e, data);
                } else {
                    orgFnHandle(e, data);
                }
            }
        };
        var R_event = function (e, data) {
            if (!L_flag) {
                if (getTime() - timer > intv) {
                    R_flag = true;
                    timer = getTime();
                    timeOut = setTimeout(
                        function () {
                            orgFnHandle(e, data);
                        },
                        intv + 1
                    );
                }
            } else {
                reset();
                var deltT = getTime() - timer;
                if (deltT <= intv) {
                    fn.call(elem, e, data)
                } else {
                    orgFnHandle(e, data);
                }
            }
        };
        var eventHandle = function (e, data) {
            if (L_BUTTON === e.button)
                L_event(e, data);
            else if (R_BUTTON === e.button)
                R_event(e, data);
            else if (LR_BUTTON === e.button) { //ie
                timer = getTime();
                fn.call(elem, e, data);
            }
        };
        //禁止右键菜单功能;
        elem.bind('contextmenu', function () {
            return false;
        });
        //绑定新的
        elem.bind(orgType, data, eventHandle);
    };
    $.unbindLR = function (elem, type) {
        elem.unbind('contextmenu');
        elem.unbind(type);
        var orgType = type.substr(2);
        elem.unbind(orgType);
        var lrId = Math.random();
        elem.data('lrId', lrId);
        for (var i in $.cache) {
            if ($.cache[i]['lrId'] == lrId) {
                var fns = $.cache[i]['lrTempEvents'];
                for (var j in fns) {
                    elem.bind(orgType, function () {
                        fns[j].apply(elem, arguments)
                    });
                }
                //移除它
                elem.removeData('lrId');
                elem.removeData('lrTempEvents');
                break;
            }
        }
    };
    $.fn.bindLR = function (type, data, fn, intv) {
        if ($.isFunction(data)) {
            intv = fn || 500;
            fn = data;
            data = {};
        } else {
            data = data || {};
            fn = fn || {};
            intv = intv || 500;
        }
        // lr 绑到 $(...).trigger()
        this.bind(type, data, fn);
        if (type.substr(0, 2) == 'lr') {
            $.bindLR(this, type, data, fn, intv);
        }
        return this;
    };
    $.fn.unbindLR = function (type) {
        $.unbindLR(this, type);
        return this;
    }
})(jQuery);


/*======================================*/

var s = {
    width:30,
    height:16,
    squares:[],
    wrapper:'#inner',
    sqrClass:'square',
    mineNum:99,
    numClasses:['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'],
    maskClass:'mask',
    errorClass:'error',
    wrongClass:'wrong',
    uMineClass:'umine',
    unsureClass:'unsure',
    L_BUTTON:0,
    R_BUTTON:2,
    firstClick:true,
    totalButton:'#total',
    resetButton:'#reset',
    timerButton:'#timer',
    timing:function () {
    },
    gameOver:function () {
    },
    knownNum:0
};
var Msweeping = function (level) {
    this.mask$ = $('<div>')
        .css({
            'opacity':0.6,
            'background-color':'#fff',
            'display':'block',
            'position':'absolute',
            'top':($(s.wrapper).offset().top + parseInt($(s.wrapper).css('border-top-width'))) + 'px',
            'left':($(s.wrapper).offset().left + parseInt($(s.wrapper).css('border-left-width'))) + 'px',
            'width':$(s.wrapper).width() + 'px',
            'height':$(s.wrapper).height() + 'px',
            'z-index':'999',
            'text-align':'center',
            'vertical-align':'middle'
        });
    this.timeout = null;
    var tmpSqr = [];
    var square$;
    for (var i = 0; i < s.width * s.height; i++) {
        square$ = $("<span>")
            .addClass(s.sqrClass)
            .appendTo(s.wrapper);
        tmpSqr.push(new Square(parseInt(i / s.width), i % s.width, square$));
        if ((i + 1) % s.width == 0) {
            s.squares.push(tmpSqr);
            tmpSqr = [];
        }
    }
    var t = this;
    var resetMask = function () {
        t.mask$.css({
            'top':(
                $(s.wrapper).offset().top +
                    parseInt($(s.wrapper).css('border-top-width'))
                ) + 'px',
            'left':(
                $(s.wrapper).offset().left +
                    parseInt($(s.wrapper).css('border-left-width'))
                ) + 'px'
        });
    };
    $(window)
        .resize(resetMask)
        .load(resetMask);
    $(document)
        .bind("selectstart", function () {
            return false;
        })
        .bind("contextmenu", function () {
            return false;
        });
    $(s.resetButton).click(function () {
        t.reset();
    });
    s.timing = function () {
        $(s.timerButton).val(parseInt($(s.timerButton).val()) + 1);
        t.timeout = setTimeout(s.timing, 1000);
    };
    var showAllMines = function () {
        for (var i = 0; i < s.height; i++) {
            for (var j = 0; j < s.width; j++) {
                var sqr = s.squares[i][j];
                sqr.jq.unbind();
                if (sqr.type == 2)
                    sqr.unCover(true);
            }
        }
    };
    s.gameOver = function (f) {
        showAllMines();
        clearTimeout(t.timeout);
        s.knownNum = 0;
        if (f) {
            t.msg('Congratulations! ');
        } else {
            t.msg('Game over!');
        }
    };
    this.reset();
};
Msweeping.prototype = {
    /**
     *
     * Generate random number to put mines.
     * @param:
     * @return: ret, an array of integers
     *
     **/
    getRandom:function (t) {
        t = t || [];
        var ret = t;
        for (var i = 0; i < s.width * s.height; i++) {
            if (Math.random() < s.mineNum / (s.width * s.height) && $.inArray(i, ret) == -1) {
                ret.push(i);
                if (ret.length == s.mineNum)
                    break;
            }
        }
        if (ret.length < s.mineNum)
            return this.getRandom(ret);
        return ret;
    },
    /**
     *
     * Reset Mine Sweeping, ready to run
     * @param:
     *
     **/
    reset:function () {
        var nums = this.getRandom();
        $(s.totalButton).val(nums.length);
        $(s.timerButton).val(0);
        clearTimeout(this.timeout);
        s.firstClick = true;
        s.knownNum = 0;
        this.removeMsg();
        for (var i = 0; i < s.height; i++) {
            for (var j = 0; j < s.width; j++) {
                s.squares[i][j].setStat(0);
            }
        }
        for (var i = 0; i < nums.length; i++) {
            var sqr = s.squares[ parseInt(nums[i] / s.width) ][ nums[i] % s.width ];
            sqr.setStat(5);
        }
        for (var i = 0; i < s.height; i++) {
            for (var j = 0; j < s.width; j++) {
                s.squares[i][j].init();
                s.squares[i][j].bindMousedown();
                s.squares[i][j].bindClick();
            }
        }
    },
    /**
     *
     * Show messages
     * @param: str, string to show
     *
     **/
    msg:function (str) {
        this.mask$.html('<div style="padding-top:80px;">' + str + '</div>').appendTo('body');
    },
    /**
     *
     * remove the showing message.
     * @param:
     *
     **/
    removeMsg:function () {
        this.mask$.remove();
    }
};
/**
 *
 * class Square
 * Control action of every square
 * jq is its jQuery Object.
 *
 **/
var Square = function (i, j, jq) {
    this.x = i;
    this.y = j;
    this.jq = jq;
    this.type = 0; //0:null, 1:num, 2:mine
    this.num = 0;
    this.neighbors = [];
    this.ustat = '';
    this.cover = true;
};
Square.prototype = {
    init:function () {
//get neighbors
        if (this.x - 1 >= 0) {
            this.neighbors.push(s.squares[ this.x - 1 ][ this.y ]);
            if (this.y - 1 >= 0) {
                this.neighbors.push(s.squares[ this.x - 1 ][ this.y - 1 ]);
                this.neighbors.push(s.squares[ this.x ][ this.y - 1 ]);
            }
            if (this.y + 1 < s.width) {
                this.neighbors.push(s.squares[ this.x - 1 ][ this.y + 1 ]);
                this.neighbors.push(s.squares[ this.x ][ this.y + 1 ]);
            }
        }
        if (this.x + 1 < s.height) {
            this.neighbors.push(s.squares[ this.x + 1 ][ this.y ]);
            if (this.y - 1 >= 0) {
                this.neighbors.push(s.squares[ this.x + 1 ][ this.y - 1 ]);
                if ($.inArray(s.squares[ this.x ][ this.y - 1 ], this.neighbors) == -1)
                    this.neighbors.push(s.squares[ this.x ][ this.y - 1 ]);
            }
            if (this.y + 1 < s.width) {
                this.neighbors.push(s.squares[ this.x + 1 ][ this.y + 1 ]);
                if ($.inArray(s.squares[ this.x ][ this.y + 1 ], this.neighbors) == -1)
                    this.neighbors.push(s.squares[ this.x ][ this.y + 1 ]);
            }
        }
//get num
        if (this.num < 9) {
            for (var i = 0; i < this.neighbors.length; i++) {
                if (this.neighbors[i].num == 9)
                    this.num++;
            }
        }
//get type
        if (this.num == 0)
            this.type = 0;
        else if (this.num == 9)
            this.type = 2;
        else
            this.type = 1;
        this.jq.removeClass().addClass(s.sqrClass);
        this.jq.text('');
        this.setMasked();
    },
    bindMousedown:function () {
        var t = this;
        this.jq.mousedown(function (e) {
            if (e.button == s.R_BUTTON) {
                if (t.ustat == '') {
                    t.setStat(2);
                    $(s.totalButton).val(parseInt($(s.totalButton).val()) - 1);
                    s.knownNum++;
                    if (s.knownNum == s.width * s.height)
                        s.gameOver(true);
                } else if (t.ustat == '!') {
                    t.setStat(3);
                    $(s.totalButton).val(parseInt($(s.totalButton).val()) + 1);
                    s.knownNum--;
                } else if (t.ustat == '?') {
                    t.setStat(1);
                }
            }
        });
    },
    bindClick:function () {
        var t = this;
        this.jq.click(function () {
            if (s.firstClick) {
                s.timing();
                s.firstClick = false;
            }
            if (t.cover && t.ustat != '!') {
                if (t.type == 2) {
                    t.unCover(true);
                    s.gameOver();
                } else
                    t.open(true);
            }
        });
    },
    bindLRDown:function () {
        var t = this;
        this.jq.bindLR('lrmousedown', function () {
            for (var i = 0; i < t.neighbors.length; i++) {
                if (t.neighbors[i].ustat != '!')
                    t.neighbors[i].setUnMasked();
            }
        });
    },
    bindLRUp:function () {
        var t = this;
        this.jq.bindLR('lrmouseup', function () {
            t.jq.trigger('mouseleave');
            if (t.cover) return;
            var count = 0;
            for (var i = 0; i < t.neighbors.length; i++) {
                if (t.neighbors[i].ustat == '!') count++;
            }
            if (count > t.num) {
                for (var i = 0; i < t.neighbors.length; i++) {
                    t.neighbors[i].unCover(true);
                }
                s.gameOver();
            } else if (t.num == count) {
                var hasMine = false;
                for (var i = 0; i < t.neighbors.length; i++) {
                    if (t.neighbors[i].cover) {
                        if (t.neighbors[i].ustat != '!') {
                            if (t.neighbors[i].type == 2) {
                                hasMine = true;
                            } else {
                                t.neighbors[i].open(true);
                            }
                        }
                    }
                }
                if (hasMine) {
                    for (var i = 0; i < t.neighbors.length; i++) {
                        if (t.neighbors[i].cover && (
                            t.neighbors[i].ustat != '!' ||
                                t.neighbors[i].isWrongMarked()
                            )) {
                            t.neighbors[i].unCover(true);
                        }
                    }
                    s.gameOver();
                }
            }
        });
    },
    bindMouseleave:function () {
        var t = this;
        this.jq.bind('mouseleave', function () {
            for (var i = 0; i < t.neighbors.length; i++) {
                if (t.neighbors[i].cover)
                    t.neighbors[i].setMasked();
            }
        });
    },
    bindMouseup:function () {
        var t = this;
        this.jq.bind('mouseup', function () {
            t.jq.trigger('lrmouseup');
        });
    },
    open:function (f) {
        if (this.cover) {
            this.unCover(f);
            if (this.type == 0) {
                for (var i = 0; i < this.neighbors.length; i++) {
                    if (this.neighbors[i].cover && this.neighbors[i].type < 2)
                        this.neighbors[i].open(f);
                }
            }
        } else {
            for (var i = 0; i < this.neighbors.length; i++) {
                if (this.neighbors[i].type == 0)
                    this.neighbors[i].open(f);
                else if (this.neighbors[i].cover)
                    this.neighbors[i].unCover(f);
            }
        }
    },
    setMasked:function () {
        this.jq.addClass(s.maskClass);
    },
    setUnMasked:function () {
        this.jq.removeClass(s.maskClass);
    },
    setStat:function (stat) {
        switch (stat) {
            case 0:
                this.type = 0; //0:null, 1:num, 2:mine
                this.num = 0;
                this.neighbors = [];
                this.ustat = '';
                this.cover = true;
                break;
            case 1:
                this.ustat = '';
                this.jq.removeClass(s.unsureClass);
                this.jq.removeClass(s.uMineClass);
                this.jq.empty();
                break;
            case 2:
                this.ustat = '!';
                this.jq.removeClass(s.unsureClass);
                this.jq.addClass(s.uMineClass);
                this.jq.text('!');
                break;
            case 3:
                this.ustat = '?';
                this.jq.removeClass(s.uMineClass);
                this.jq.addClass(s.unsureClass);
                this.jq.text('?');
                break;
            case 4:
                this.cover = false;
                this.stat = '';
                break;
            case 5:
                this.num = 9;
                break;
            default:
                break;
        }
    },
    isRightMarked:function () {
        return this.ustat == '!' && this.type == 2;
    },
    isWrongMarked:function () {
        return this.ustat == '!' && this.type < 2;
    },
    /**
     *
     * Set the square to the uncover state
     * @param:
     *
     **/
    unCover:function (f) {
        if (this.isRightMarked()) return;
        this.setStat(4);
        this.jq.removeClass(s.maskClass);
        this.jq.unbind('click');
        this.jq.unbind('mousedown');
        this.bindMouseleave();
        this.bindMouseup();
        this.bindLRDown();
        this.bindLRUp();
        if (this.type == 2) {
            if (f) {
                this.jq.addClass(s.errorClass);
                this.jq.text('*');
            }
        } else if (this.type == 1) {
            if (this.isWrongMarked()) {
                this.jq.addClass(s.wrongClass);
            } else {
                this.jq.addClass(s.numClasses[this.num - 1]);
                this.jq.text(this.num);
            }
        } else if (this.isWrongMarked()) {
            this.jq.addClass(s.wrongClass);
        }
        s.knownNum++;
        if (s.knownNum == s.width * s.height)
            s.gameOver(true);
    }
};
//http://pwwang.com/tools/mine-sweeping.html


