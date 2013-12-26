<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
 <div class="well col-md-12" ng-controller="gameDetailController"
	id="navbar-inner">
			<span class="brand"> <a
				href="/player/detail?uid=${room.createrID}" id="createName"
				ng-bind="detail.creater|nameConvert"></a>
			</span> <span class="brand"  id="gamePhase" ng-bind="detail.phase|phaseConvert"> 
			</span> <span class="brand" id="playerRole"
				ng-bind="detail.role|roleConvert"></span> <span class="brand" id="playerCard">
			
			</span> <span class="brand"> <span id="count"></span></span>
	
			<div class="btn-group pull-right">
				<button type="button" class="btn btn-danger dropdown-toggle"
					data-toggle="dropdown">
					退出 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu">

					<li><a
						href="/m/play/enter.do?rid=${room.id}&uid=${uid}&from=${switchFrom}">手机</a></li>
					<li class="divider"></li>
					<li><a href="#" id="exitButton">退出</a></li>
				</ul>
			</div>



</div>
