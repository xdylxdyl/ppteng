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

var colorConfig={
    "system":"#F00"

}

var contentTemplate = {
    generateUserContent:function (content) {
        return   "<p style='font-weight:bold;color:" + content.color + "'>[" + content.subject + "] " + content.expression + " " + content.firstAction + " [" + content.object + "] " + content.secondAction + " : " + content.content + " </p>"
    },
    generateSystemContent:function(content){

        if(content.subject==""){
            return "<p style='color:#F00;'> 【系统消息】"+content.firstAction + content.content  + "</p>";
        }else{
            return "<p style='color:#F00;'> 【系统消息】 " + content.subject + " "+content.firstAction + content.content  + "</p>";
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
