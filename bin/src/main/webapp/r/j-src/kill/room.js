


//初始化，获取房间所有信息
var roomInfo = {};
roomInfo._ajax = function(url ,data, dataType, success, error) {
	$.ajax({
		async : false,
		type : "POST",
		dataType : dataType,
		url : url,
		data : data,
		success : function(info) {
			success(info);
		},
		error : function(info) {
			error(info);
		}
	})
}
roomInfo.success = function(info) {
	
	//打出初始化后返回的响应消息
	console.log(info);
	
	//如果确认是该房间的消息，则开始处理;否则则打出一条提示消息。
	if (info.id == $("#rid").val()) {
		var list = info.info;
		
		//保存游戏版本
		$("#version").val(info.version);
		
		//遍历list,取出每条的ID和name，加载入左边列表
		for(var i = 0; i < list.length; i++) {
			var uid = list[i].id;
			var uname = list[i].name;
			$(".listitem ul").append("<li id='"+ uid +"'>"+ uname +"</li>");
			
			//若ID为自己，则处理权限
			if(uid == $("#uid").val()) {
				var rightSelf = list[i].right;
				for(var i = 0; i < rightSelf.length; i++) {
					console.log(rightSelf[i])
					handle(rightSelf[i]);
				}
			}
		}
	} else {
		console.log("This message is not for this room. Pass it.");
	}
	
/*	var list = info.info;
	$("#rights").data("info",list);
	//载入状态函数
	var writeState = function(uid, state, identity) {
		$(".listitem li[id="+ uid +"]").append("<span class='"+ state +"'></span><span class='"+ identity +"'></span>")
	}
	
	//载入玩家列表
	for (var i = 0; i < list.length; i++) {
		var uid = list[i].id;
		$(".listitem ul").append("<li id='"+ list[i].id +"'>"+ list[i].name +"</li>");
		//载入玩家状态和身份
		var state = "";
		var identity = "";
		if (list[i].ready) {
			state = "ready";
			writeState(uid, state, identity);
			//玩家名字加入select列表
			$("#vote, #kill").append("<option value='"+ list[i].id +"'>"+list[i].name+"</option>");
			if (list[i].id == $("#uid").val()) {
				$("#ready").hide();
				$("#ready").next().text("已准备就绪");	
			}
		} else if (list[i].dead) {
			state = "dead";
			writeState(uid, state, identity);
		} else if (list[i].waiting) {
			state = "waiting";
			writeState(uid, state, identity);
		} else if (list[i].killer) {
			identity = "killer";
			writeState(uid, state, identity);
		} else if (list[i].killed) {
			identity = "killed";
			writeState(uid, state, identity);
		} else {
			writeState(uid, state, identity);
		}
		//本玩家资源
		if (list[i].id == $("#uid").val()) {
			var rights = list[i].right;
			var strLength = rights.length;
			for (var j = 0; j < strLength; j++) {
				decideRights.toSwitch(rights[j]);
			}
			$("#rights").data("right",rights);
			$("#version").data("version",info.version);
		}
	}*/
}
roomInfo.error = function(info) {
	console.log("载入失败.");
}
//处理权限
var handle = function(right) {
	switch (right) {
	case "say" : (function() {$("#say, #sendSay").prop("disabled", false);})();
	break;
	case "ready" : (function() {$("#ready").show();})();
	break;
	case "kick" : (function() {$("#command").append("<option value='kick'>踢人</option>");})();
	break;
	case "start" : (function() {$("#start").show();})();
	break;
	case "over" : (function() {$("#command").append("<option value='over'>结束</option>");})();
	break;
	case "vote" : (function() {$("#command").append("<option value='vote'>投票</option>");})();
	break;
	case "kill" : (function() {$("#command").append("<option value='kill'>杀人</option>");})();
	break;
	case "answer" : (function() {$("#command").append("<option value='answer'>回答</option>");})();
	break;
//	case "" : (function() {})();
//	break;
	}
}

//恢复页面
var recoverPage = function() {
	$("#say, #sendSay").prop("disabled", true);
	$("#command option:gt(0)").remove();
	$("#object option:gt(0)").remove();
	$("#ready").hide();
	$("#start").hide();
}
$(document).ready(function(){
	 console.log("document ready");
	//初始化，获取房间所有信息
	var data = {'uid' : $("#uid").val() , 'rid' : $("#rid").val()};
	var url = "/room/detail.do?";
	var dataType = 'json';
	roomInfo._ajax(url, data, dataType, roomInfo.success, roomInfo.error);
	
	
	//点击玩家名字，改变对象
	$(".listitem h4").click(function() {
		$("#obj").val("-500").text("");
	})
	$(".listitem li").click(function() {
		var id = $(this).attr("id");
		var name = $(this).text();
		$("#obj").val(id).text("对" + name);
	})
	
	//展开关闭右边面板
	$(".detail").click(function() {
		$("#details").slideToggle("slow");
	})



})
