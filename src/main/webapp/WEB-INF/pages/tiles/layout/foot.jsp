<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>





<!--footer-->
<div class="col-md-12 ">
	<div class="panel panel-default" ng-controller="footController"
		id="footController">



		<div class="panel-body">
			<!--act-->

			<div class="btn-group dropup">
				<button type="button" data-default="" id="select_expression"
					class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					神态 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" id="expression" role="menu"
					aria-labelledby="dLabel">

				</ul>
			</div>


			<div class="btn-group dropup">
				<button type="button" data-default="" id="select_color"
					data-default="#000" class="btn btn-default dropdown-toggle"
					data-toggle="dropdown">
					颜色 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" id="color">

				</ul>
			</div>

			<div class="btn-group dropup">
				<button type="button" data-default="" id="select_command"
					data-default="#000" class="btn btn-default dropdown-toggle"
					data-toggle="dropdown">
					指令 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" id="command">

					<li data-default="#000"><a href="#">颜色</a></li>
					<li class="divider"></li>
					<li data-default="#000000">
				</ul>
			</div>


			<div class="btn-group dropup" id="objectGroup">
				<button type="button" data-default="" id="select_object"
					data-default="#000" class="btn btn-default dropdown-toggle"
					data-toggle="dropdown">
					对象 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" id="object">

				</ul>
			</div>
			<div class="btn-group dropup" id="multiObjectGroup" class="hide">

				<select class="multiselect" multiple="multiple" id="multiObject">
				</select>
			</div>
			<div class="btn-group dropup">

				<label for="checkBox" class="checkbox"> <input
					type="checkbox" checked="checked" value="scroll" id="checkBox">
					滚屏
				</label>
			</div>

			<div class="btn-group dropup" id="displayRoleGroup" class="hide">
				<label for="displayRole" class="checkbox"> <input
					type="checkbox" checked="checked" value="scroll" id="displayRole">
					隐藏角色
				</label>
			</div>


			<div class="btn-group dropup">
				<span class="help-inline" id="countDown">04:00</span>
			</div>

			<div class="btn-group dropup" id="" class="">
				<button type="button" class="btn btn-primary" id="readyButton">准备</button>



			</div>


			<div class="btn-group dropup" id="" class="">
				<button type="button" class="btn btn-primary" id="startButton">开始</button>
			</div>




			<div ng-repeat="right in rights">
				<button class="btn btn-info" right="{{right}}"
					ng-click="processRight(right)" ng-bind="right|rightConvert"></button>
			</div>


			<div class="btn-group dropup" id="" class="">
				<button class="btn btn-info" id="replayButton">播放战例</button>
			</div>

			<div class="btn-group dropup pull-right" id="">
				<span class="text-success help-inline" id="netSpeedHint"
					title="此处用于展示当前网络和服务器之间的延迟,数字越小网速越好,正常情况下应在100MS以下,1秒=1000MS.如果看不到自己说话,先刷新,如果仍然看不到说话,检查自己是否打开了多个聊天窗口">延迟：0
					毫秒</span>
			</div>
		</div>


		<div class="panel-foot">
			<div class="input-group" id="">
				<span class="input-group-addon" id="playerName"></span> <input
					type="text" class="form-control" placeholder="说点什么" id="sayInput">
				<a href="#" class="btn medium btn-primary input-group-addon"
					id="sayButton">发送</a>



			</div>
		</div>
	</div>
</div>




<script
	src="<%=request.getContextPath() %>/r/j-src/web/foot/foot.js?v=${frontVersion}"></script>
<script src="/r/j-src/framework/bootstrap/box/bootbox.min.js"></script>





