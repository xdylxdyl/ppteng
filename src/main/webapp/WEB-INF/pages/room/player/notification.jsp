<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>





<!-- container start  -->
<div class="span9">
	<div class="well ">
		<div class="row">
			<div class="span5">
				<h2>通知设置</h2>
				
				<p id="hint" class="text-error">允许葡萄藤向您发送桌面通知后。房间游戏开始时，即便您不在当前页面，也会收到一条消息～再不用别人QQ上喊你了～</p>
				<p id="hint" class="text-error">点击设置按钮。浏览器顶部会出现提示框，点击允许～</p>
				<p id="hint" class="text-error">因为浏览器防骚扰的设置，所以必须你亲自点击才可以～同一台电脑的同一个浏览器～只要设置一次就行～</p>
				<div class="row-fluid align-right">
					<button class="btn btn-primary pull-left" id="settingButton">设置</button>

				</div>


			</div>
			
		</div>
	</div>

</div>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script src="/r/j-src/web/person/notification.js"></script>
	<script src="/r/j-src/util/notify.js"></script>