<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>


<title>${room.name}-猜词-捉鬼-葡萄藤轻游戏</title>

<div class='col-sm-12 main_area' id="game_area"></div>

<script
	src="<%=request.getContextPath() %>/r/j-src/game/ghost/question/2.0/ghost_question_2.0.js?v=${frontVersion}"></script>
