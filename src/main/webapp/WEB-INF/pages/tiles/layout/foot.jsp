<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>





<!--footer-->
<div class="foot">
	<div class="row-fluid">
		<div class="inner-space">
			<!--act-->
			<ul class="toolbar">
				<li class="dropup"><a href="#" id="select_expression"
					data-default="" class="btn dropdown-toggle btn-small"
					data-toggle="dropdown"> &nbsp; <span>神态</span> &nbsp; <b
						class="caret"></b>
				</a>
					<ul class="dropdown-menu" id="expression">
					</ul></li>
				<li class="dropup"><a href="#" id="select_color"
					data-default="#000" class="btn dropdown-toggle btn-small"
					data-toggle="dropdown"> &nbsp; <span>颜色</span> &nbsp; <b
						class="caret"></b>
				</a>
					<ul class="dropdown-menu" id="color">


					</ul></li>
				<li class="dropup"><a href="#" id="select_command"
					data-default="" class="btn dropdown-toggle btn-small"
					data-toggle="dropdown"> &nbsp; <span>指令</span> &nbsp; <b
						class="caret"></b>
				</a>
					<ul class="dropdown-menu" id="command">

					</ul></li>
				<li class="dropup" id="objectGroup"><a href="#" id="select_object"
					data-default="" class="btn dropdown-toggle btn-small"
					data-toggle="dropdown"> &nbsp; <span>对象</span> &nbsp; <b
						class="caret"></b>
				</a>
					<ul class="dropdown-menu" id="object">

					</ul></li>


				<li id="multiObjectGroup" class="hide"><select class="multiselect" multiple="multiple" id="multiObject">						
				</select></li>

				<li><label for="checkBox" class="checkbox"> <input
						type="checkbox" checked="checked" value="scroll" id="checkBox">
						滚屏
				</label></li>

				<li id="displayRoleGroup" class="hide"><label for="displayRole"
					class="checkbox"> <input type="checkbox" checked="checked"
						value="scroll" id="displayRole"> 隐藏角色
				</label></li>
				<li><span class="help-inline" id="countDown">04:00</span></li>

				<li>
					<button class="btn btn-info" id="readyButton">准备</button>
				</li>
				<li>
					<button class="btn btn-info" id="startButton">开始游戏</button>
				</li>
				<li>
					<button class="btn btn-info" id="replayButton">播放战例</button>
				</li>
				<li class="pull-right" id="netSpeedHintLI"><span class="text-success help-inline"
					id="netSpeedHint"
					title="此处用于展示当前网络和服务器之间的延迟,数字越小网速越好,正常情况下应在100MS以下,1秒=1000MS.如果看不到自己说话,先刷新,如果仍然看不到说话,检查自己是否打开了多个聊天窗口">延迟：0
						毫秒</span></li>
			</ul>
			<!--input-->
			<div class="form-horizontal">
				<div class="control-group">
					<label for="" class="control-label" id="sayLabel"><span
						id="playerName"></span>说:</label>
					<div class="controls">
						<div class="row-fluid">
							<div class="span10">
								<input type="text" class="span12" id="sayInput">
							</div>
							<div class="span2">
								<a href="#" class="btn medium btn-primary" id="sayButton">发送</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<script
	src="<%=request.getContextPath() %>/r/j-src/web/foot/foot.js?v=${frontVersion}"></script> 





