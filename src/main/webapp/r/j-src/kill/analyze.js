/**
 * @directions  发送请求
 * @author Jqhan <jqhan@gemantic.cn>
 */
/*
 * predict
 * 1	say			说
 * 2	kill		杀
 * 3	vote		投票
 * 4	start		游戏开始
 * 5	over		游戏结束
 * 6	ready		玩家准备
 * 7	login		玩家进入房间
 * 8	logout		玩家退出房间
 * 9	day			白天
 * 10	night		晚上
 * 11	lastword	遗言
 * 12	die			死亡
 * role
 * -100			系统管理员
 * -500			所有人
 * */

/////////////////////////////////////////////////////////////////////////////////////////
//构造发送动作指令函数
var infomation = function(act) {
	var subject = $("#uid").val();
	var predict = act;
	var object = $("#obj").val();
	var color = $("#color").val();
	var expression = $("#expression").val(); 
	var where = $("#rid").val();
	if (object == "") {object = "-500"}
	if (color == "") {color = "#000000"}
	if (expression == "") {expression = "-1";}
	this.content = $("#say").val();
	if (this.content == "" && act == "say") {
		alert("内容不能为空");
		return false;
	}
	this.version = $("#version").val();
	this.str = subject + "," + predict + "," + object + "," + color + "," + expression + "," + where;
	this.info = {
		"action" : this.str,
    	"content" : this.content,	//内容
    	"isDrools" : "true",
    	"version" : this.version, //版本号
	};
};
//向服务器发送
var sendServer = function(act) {
	var action = new infomation(act);
	$.ajax({
		type : "POST",
		url : "/message/accept",
		data : action.info
	})
}
//获取玩家列表
var playerList = function(right) {
	switch (right) {
	case "kick" : playerList.stateReady("all");
	break;
	case "kill" : playerList.stateReady("ready");
	break;
	case "vote" : playerList.stateReady("ready");
	break;
	}
}
playerList.stateReady = function(limit) {
	if(limit == "all") {
		for(var i = 0; i < $(".listitem li").length; i++) {
			var id = $(".listitem li").eq(i).attr("id");
			var name = $(".listitem li").eq(i).text();
			if(id != $("#uid")) {
				$("#object").append("<option value='" + id + "'>" + name + "</option>");
			}
		}
	} else if(limit == "ready") {
		var ready = $(".listitem span[class='ready']");
		for(var i = 0; i < ready.length; i++) {
			var id = ready[i].parent().attr("id");
			var name = ready[i].parent().text();
			$("#object").append("<option value='" + id + "'>" + name + "</option>");
		}
	}
}

$(document).ready(function() {
	$("#command").change(function() {
		var right = $("#command").val();
		if(right == "command") {
			$("#object option:gt(0)").remove();
		} else if(right == "over") {
			sendServer("over");
		} else if(right == "answer") {
			//TODO answer question;
		} else {
			playerList(right);
		}
	})
	$("#object").change(function() {
		if ($("#object option:selected").val() == "object") {
			return;
		} else {
			var act = $("#command option:selected").val();
			var obj = $("#object option:selected").val();
			$("#obj").val(obj);
			sendServer(act);
			$("#obj").val("");
			$("#command").val($("#object option").eq(0));
			$("#object option:gt(0)").remove();
		}
	})
	
	$("#ready").click(function() {
		sendServer("ready");
	})
	$("#start").click(function() {
		sendServer("start");
	})
	$("#logout").click(function() {
		var question = confirm("确定退出房间？");
		if(question == true) {
			sendServer("logout");
		}
	})
	$("#sendSay").click(function() {
		if($("#command").val() == "answer") {
			sendServer("answer");
			$("#command").val(1);
			$("#say").val("");
		}else {
			sendServer("say")
			$("#say").val("");
		}
	})	
	$("#say").keypress(function(e) {
		if (e.keyCode == 13) {
			sendServer("say");
			$("#say").val("");
		}
	})
	
	
})












