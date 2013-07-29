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

						<li data-default="#000000">
							<div class="color-block" style="background: #000000"></div> <a
							href="#" class="color-font">高级黑</a>
						</li>
					</ul></li>
				<li class="dropup"><a href="#" id="select_command"
					data-default="" class="btn dropdown-toggle btn-small"
					data-toggle="dropdown"> &nbsp; <span>指令</span> &nbsp; <b
						class="caret"></b>
				</a>
					<ul class="dropdown-menu" id="command">

					</ul></li>
				<li class="dropup"><a href="#" id="select_object"
					data-default="" class="btn dropdown-toggle btn-small"
					data-toggle="dropdown"> &nbsp; <span>对象</span> &nbsp; <b
						class="caret"></b>
				</a>
					<ul class="dropdown-menu" id="object">

					</ul></li>


				<li id="displayRoleGroup" class="hide"><label for="displayRole"
					class="checkbox"> <input type="checkbox" checked="checked"
						value="scroll" id="displayRole"> 隐藏角色
				</label></li>
				<li>
					<button class="btn btn-info" id="readyButton">准备</button>
				</li>
				<li>
					<button class="btn btn-info" id="startButton">开始游戏</button>
				</li>
				<li>
					<button class="btn btn-info" id="replayButton">播放战例</button>
				</li>

				<li><label for="checkBox" class="checkbox"> <input
						type="checkbox" checked="checked" value="scroll" id="checkBox">
						滚屏
				</label></li>
				<li id="privateSayGroup" class="hide"><label for="privateSay"
					class="checkbox"> <input type="checkbox" value="scroll"
						id="privateSay"> 私聊
				</label></li>
				<li><span class="help-inline pull-right" id="countDown">04:00</span></li>


				<li class="pull-right"><span class="help-inline"
					id="netSpeedHint">延迟：0 毫秒</span></li>
			</ul>
			<!--input-->
			<div class="form-horizontal">
				<div class="control-group">
					<div>
						<span id="playerName"></span>说:<a href="#"
							class="btn medium btn-primary pull-right" id="sayButton">发送</a>
					</div>

					<div class="controls">
						<div class="row-fluid">
							<div>
								<input type="text" class="span12" id="sayInput">
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


