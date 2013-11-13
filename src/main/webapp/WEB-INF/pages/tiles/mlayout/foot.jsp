<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>


		<div class='col-sm-12 tool clickHide well' id="pcontroller">


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


		</div>


		<div class="input-group col-sm-12 foot" id="foot">

			<input type="text" class="form-control" placeholder="说点什么"
				id="sayInput"> <a href="#"
				class="btn medium btn-primary input-group-addon" id="sayButton">发送</a>


		</div>

<script
	src="<%=request.getContextPath() %>/r/j-src/web/foot/foot.js?v=${frontVersion}"></script>


