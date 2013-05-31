<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>





<!-- container start  -->
<div class="span9">
	<div class="well ">
		<div class="row">
			<div class="span5">
				<h2>不用别人喊你游戏开始了～</h2>
				
				<p id="hint" class="">房间游戏开始时，会收到一条消息～</p>
				<p id="hint" class="">同一台电脑的同一个浏览器～只要设置一次就行～</p>
				<p id="hint" class="">点击设置按钮。浏览器顶部会出现提示框，点击允许～</p>
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