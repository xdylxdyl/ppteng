<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!doctype html>
<html>
<head>

<title>${room.name}</title>
<meta charset="utf-8">


</head>

<body>

	<form>
		<fieldset class="choose">
			<select id="expression">
			</select> <select id="color">

			</select> <select id="command">
				<option value="command">-指令-</option>
			</select> <select id="object">
				<option value="object">-对象-</option>
			</select> <input type="text" class="nobg" value="00:00" disabled="true"> <input
				type="button" class="button" id="ready" value="准备游戏"> <input
				type="button" class="button" id="start" value="开始游戏">
				<div id="replay_role"><input type="checkbox" id="replay_role_checkbox" checked><span>隐藏身份</span></div>
				 <input	type="button" class="button" id="replay" value="开始播放">
				
				

		</fieldset>
		<fieldset id="send">
			<span><strong>我</strong>要<b value="-500"></b>说：</span> <input
				type="text" class="hid"> <input type="text" class="text"
				id="say" disabled="disabled"> <input type="button"
				class="submit" value="发送" id="sendSay" disabled="disabled">
			<div class="netspeed" id="speed_hint">
				网络延迟<span id="netspeed"></span>毫秒
			</div>			
			<div class="netspeed" id="replay_time_hint">
				<span id="all_time"></span> <span id="current_time"></span>
			</div>
		</fieldset>
		<div class="quiet" id="logout"></div>
	</form>


<div id="escape"></div>
	<!-- 
		JiaThis Button BEGIN
		<div class="jiathis_style">
			<span class="jiathis_txt">分享到：</span> <a
				class="jiathis_button_tools_1"></a> <a
				class="jiathis_button_tools_2"></a> <a
				class="jiathis_button_tools_3"></a> <a
				class="jiathis_button_tools_4"></a> <a
				href="http://www.jiathis.com/share"
				class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis"
				target="_blank">更多</a> <a class="jiathis_counter_style"></a>
		</div>
		<script type="text/javascript"
			src="http://v3.jiathis.com/code/jia.js?uid=1334627735062752"
			charset="utf-8"></script>
		JiaThis Button END -->







</body>
</html>