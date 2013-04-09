var expression = {
    "0":"神态",
    "1":"温柔的",
    "2":"笑着",
    "3":"同情的",
    "4":"依依不舍的",
    "5":"神秘兮兮的",
    "6":"幸灾乐祸的",
    "7":"泪流满面的",
    "8":"傻乎乎的",
    "9":"很无辜的",
    "10":"慢条斯理的",
    "11":"无精打采的",
    "12":"严肃的",
    "13":"像XD般英俊的",
    "14":" 面无表情的",
    "15":"站在天桥上",
    "16":"躺在马路边",
    "17":"浮在太空里",
    "18":"骑在月亮上"
};

var hint = {
    kick:"你好,再见"
}

var commandCommonSetting = {
    kick:"果断一脚"
}


var userExpression = {
};


var color = {

    "#000000":"黑色",

    /* "#F5F5F5" :"烟白色",
     "#FAEBD7" :"古董色",
     "#FFEBCD" :"白杏色",
     "#FFFAF0" :"花白色",
     "#F8F8FF" :"幽灵白",
     "#F5F5DC" :"米色",*/

    /*  "#DC143C" :"暗深红",*/
    /* "#8B0000" :"暗红色",*/
    "#FF1493":"深粉红",
    "#FF00FF":"紫红色",
    "#9d2932":"胭脂",
    "#b36d61":"檀",
    "#d98175":"绾",
    "#FA8072":"鲜肉色",
    "#BC8F8F":"褐玫瑰",
    "#E065BB":"粉玫瑰",


    "#8B008B":"暗洋红",
    /* "#B22222" :"火砖色",*/
    /*  "#FFB6C1" :"亮粉红",*/
    /* "#FFF0F5" :"淡紫红",*/




    /*  "#FFE4E1" :"浅玫瑰",*/

    "#0000FF":"蓝色",
    /*    "#00008B" :"暗蓝色",*/

    "#8A2BE2":"紫罗兰",
    /* "#415065" :"黛蓝",*/
    "#5F9EA0":"军蓝色",
    "#6495ED":"菊蓝色",

    "#008B8B":"暗青色",
    "#00BFFF":"深天蓝",
    "#1E90FF":"闪蓝色",
    "#ADD8E6":"亮蓝色",
    "#20B2AA":"亮海蓝",
    "#87CEFA":"亮天蓝",
    "#B0C4DE":"亮钢蓝",
    /*"#008000" :"绿色",*/
    "#9ACD32":"黄绿色",
    /* "#00FFFF" :"浅绿色",*/
    /*"#d4f2e8" :"水绿",*/
    "#008B8B":"暗青色",
    "#789262":"竹青",
    "#a3e2c5":"艾青",
    "#177cb0":"靛青",
    /* "#424b50" :"鸦青",*/
    /* "#d7ecf1" :"月白",*/
    /*   "#00FFFF" :"青色",*/
    "#006400":"暗绿色",
    "#2F4F4F":"墨绿色",
    "#556B2F":"暗橄榄",
    /* "#FFFF00" :"黄色",*/
    "#DEB887":"实木色",
    "#FF8C00":"暗桔黄",
    "#b9b612":"秋香",
    "#76664d":"黎",
    /* "#FFD700" :"金色",*/
    /*   "#F0E68C" :"黄褐色",*/
    "#DAA520":"金麒麟",
    "#808080":"灰色",

    /*    "#F0FFF0" :"蜜色",
     "#FFFFF0" :"象牙色",*/
    /* "#FFA500" :"橙色",*/
    /*    "#494166" :"黛",*/
    "#D2B48C":"茶色"


}


var player = function (id, name, status, count, role) {
    return{
        id:id,
        name:name,
        status:status,
        count:count,
        role:(role == null) ? "water" : role
    };

}

var playerStatus = {
    unready:"unready",
    living:"living",
    die:"die",
    ready:"ready",
    lastword:"lastword"

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

var userInfo = function (id, name, icon, sign) {
    return {
        id:id,
        name:name,
        icon:icon,
        sign:sign

    }
}


var recordFirstTime = null;
var recordSecondTime = null;
var msg_interval = null;
var recordReplayStartAt = null;
var record_timer = null;
var lastMessageSendAt=null;

var selects={
    $gameArea:"game_area",
    $dieArea:"die_area",
    $killerArea:"killer_area",
    $settingArea:"setting_area",
    $playerList:"playerList",
    $game_nav:"game_nav",
    $die_nav:"die_nav",
    $killer_nav:"killer_nav",
    $setting_nav:"setting_nav",
    $music_nav:"music_nav",
    $submitSetting:"submitSetting",
    $sayInput:"sayInput",
    $sayButton:"sayButton",
    $readyButton:"readyButton",
    $startButton:"startButton",
    $replayButton:"replayButton",
    $exitButton:"exitButton",
    $command:"command",
    $expression:"expression",
    $color:"color",
    $netSpeedHint:"netSpeedHint",
    $countDown:"countDown",
    $createName:"createName",
    $gamePhase:"gamePhase",
    $playerRole:"playerRole",
    $checkBox:"checkBox",
    $countDown:"countDown"

}