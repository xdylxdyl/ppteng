/**
 * @directions  处理服务器响应
 * @author Jqhan <jqhan@gemantic.cn>
 */



var colorGameResult = "";
function processData(str) {
	console.log(str)
	var log = {};
	var msgObj = JSON.parse(str);//字符串转为对象
	var msgLength = msgObj.message.length; //msg数组长度
	//当返回消息里有权限信息时，更新权限
	for (var i = 0; i < msgLength; i++) {
		if (msgObj.message[i].predict == "right") {
			$("#command option:gt(0)").remove();
		}
	}
	for (var i = 0; i < msgLength; i++) {
		log = msgObj.message[i];
		var pre = log.predict;
		resolveAction(pre, log);
		
		//猜数字成绩汇总
		if(i == msgLength - 1 && colorGameResult != "") {
			
			var name = idToName(log.subject);
			var reveal = "<p style='color:#f00'>" + name + "成绩为——" + colorGameResult + "</p>";
			$(".container").append(reveal);
			colorGameResult = "";
		}
	}
}
function resolveAction(pre, log) {
	switch (pre) 
	{
	case "say" : say(log);
		break;
	case "kill" : kill(log);
		break;
	case "die" : die(log);
		break;
	case "start" : start(log);
		break;
	case "over" : over(log);
		break;
	case "ready" : ready(log);
		break;
	case "login" : login(log);
		break;
	case "logout" : logout(log);
		break;
	case "day" : day(log);
		break;
	case "night" : night(log);
		break;
	case "lastwords" : lastwords(log);
		break;
	case "vote" : vote(log);
		break;
	case "kick" : kick(log);
		break;
	case "right" : right(log);
		break;
	case "assign" : assign(log);
		break;
	case "score" : score(log);
		break;
	case "result" : result(log);
		break;
	case "use_time" : use_time(log);
		break;
	case "answer" : answer(log);
		break;
	default : '';
	}	
}


//表情翻译
function expression(ex) {
	var face = ex;
	switch (face)
	{
	case "0" : return "";
	break;
	case "1" : return "冷酷地";
	break;
	case "2" : return "笑眯眯地";
	break;
	case "3" : return "乐呵呵地";
	break;
	case "4" : return "傻乎乎地";
	break;
	case "5" : return "悄悄地";
	break;
	default : return "";
	}
}
//ID转为名字
function idToName(num) {
	var name = $(".listitem li[id=" + num + "]").text();
	return name;
}

//动作↓
function say(log) {
	var sub = idToName(log.subject);
	if(log.object == -500) {
		obj = "";
	} else {
		var obj = idToName(log.object);
		obj = "对" + obj;
	}
	var press = expression(log.expression);
	var color = log.color;
	var time = log.time;
	var content = log.content;
	var reveal = "<p style='color:"+ color +"'" + "id='"+ time +"'>" + sub + press + obj + "说：" + content + "</p>";
	$(".container").append(reveal);
}
function kill(log) {
	var obj = idToName(log.object);
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>" + obj + "被无情的杀害了</p>";
	$(".container").append(reveal);
	$("li[id=" + log.object + "]").children("span").eq(1).addClass("killed");
}
function die(log) {
	var sub = idToName(log.subject);
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>积毁销骨，众口铄金，" + sub + "你就认命吧！</p>";
	$(".container").append(reveal);
	if($("#uid").val() == log.object) {
		$(".dead_area").css({"display":"block"});
	}
	$("li[id=" + log.object + "]").children("span").eq(0).removeClass();
	$("li[id=" + log.object + "]").children("span").eq(0).addClass("dead");
	
}
function start(log) {
	//recoverPage();
	$(".container").empty();
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>天光大亮，游戏开始，各位保重！</p>";
	$(".container").append(reveal);
	$("#start").hide();
	$("#ready").next().hide();
	if ($("#identity").val() == "killer") {
		$(".killer_area").show();
	}
	
}
function over(log) {
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>游戏结束！</p>";
	$(".container").append(reveal);
	$(".readyModule").show();
	$(".option").hide();
	$(".dead_area").hide().empty();
	$(".killer_area").show();
	$(".comment").html("");
	//全部玩家状态变为waiting
	$(".listitem > span:even").attr("class","waiting");
}
function ready(log) {
	$(".listitem li[id=" + log.subject + "]").children("span").eq(0).removeClass();
	$(".listitem li[id=" + log.subject + "]").children("span").eq(0).addClass("ready");
	var getuid = $("#uid").val();
	if (getuid == log.subject) {
		$("#ready").hide();
		$("#ready").next().text("已准备就绪");	
	}
}
function login(log) {
	$.ajax({
		type : 'POST',
		url : "/player/info.do",
		data : "uids=" + log.subject,
		success : function(data){
			var info =  eval('(' + data + ')');
			var loginName = info.infos[0].name;
			var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>" + loginName + "进入了房间！</p>";
			$(".container").append(reveal);
			$(".listitem ul").append("<li id='"+ log.subject +"'>" + loginName + "<span class='waiting'></span><span></span></li>");
		}
	})
}
function logout(log) {
	var sub = idToName(log.subject);
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>" + sub + "离开了房间！</p>";
	$(".container").append(reveal);
	//$("li[id=" + log.subject + "]").remove();
	$("#" + log.subject).remove();
	var uid = $("#uid").val();
	if (log.subject == uid) {
		window.location.href='http://chat.gemantic.com:9090/m/list.do?uid=' + uid;
	}
}
function day(log) {
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>天光大亮，请水民继续加油找出杀手！</p>";
	$(".container").append(reveal);
	//TODO killer_area频道对水民不可见；
	//if 玩家状态为live，那么：
	$("#speak , #send , .option").removeAttr("disabled");
}
function night(log) {
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>黑夜降临，杀人狂出没，请大家各自保重。</p>";
	$(".container").append(reveal);
	//if 玩家身份为pleb，那么：
	$("#speak , #send , .option").attr("disabled", "disabled");
	//TODO 杀手改为killer_area频道可见并说话；
}
function lastwords(log) {
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>让我们安静下来，听听死者最后的遗言吧！</p>";
	$(".container").append(reveal);
	//if 玩家图标为class=killed，那么：
	$("#speak , #send").removeAttr("disabled");
	$(".killer_area").hide();
}
function kick(log) {
	var obj = idToName(log.object);
	var reveal = "<p style='color:#f00'" + "id='"+ log.time +"'>"+ obj +"被房主一脚踢出了房间！</p>";
	$(".container").append(reveal);
	// 各项列表中去掉该玩家名字
	$(".option option[id="+log.object+"]").remove();
	$(".listitem li[id="+log.object+"]").remove();
	//该玩家退出房间返回上一级页面；
	if (log.object == $("#uid").val()) {
		window.location.href='http://chat.gemantic.com:9090/m/list.do?uid=' + $("#uid").val();
	}
}
function assign(log) {
	var reveal = "<em style='font-size:18px; font-weight:900; background-color:#fff; color:"+ log.color +"'" + "id='"+ log.time +"'>"+ log.content +"  </em>";
	$(".comment").append(reveal);
}
function right(log) {
	var rights = log.content;
	//$("#rights").removeData("right");
	if(log.subject == $("#uid").val()) {
		handle(rights);
	}
	
}
function result(log) {
	colorGameResult = colorGameResult + "答案：" + log.content + "   ";
}
function use_time(log) {
	colorGameResult = colorGameResult + "用时：" + log.content/1000 + "秒   "
}
function score(log) {
	colorGameResult = colorGameResult + "得分：" + log.content + "分   ";
}
function answer(log) {
	say(log);
}














