
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<c:if test="${size<=0}">

	<h1>现在么有房间</h1>
	<P>但是你可以创建"简化/多人扫雷/虚拟电影院/休息室/捉鬼"~~</P>
	<P>管理员可以自定义房间背景乐~~</p>
	<P>管理员可以自定义神态~~</p>


</c:if>

<!--杀人游戏-->

<c:set var="categoryTitle" value="杀人游戏" scope="request"></c:set>
<c:set var="categoryDescription" value="一种分析和推理的游戏" scope="request"></c:set>
<tiles:insertDefinition name="versionSnapshot" />
<!--简化-->
<c:set var="versionTitle" value="[杀人游戏]简化版" scope="request"></c:set>
<c:set var="versionDescription" value="杀人游戏中最具分析和推理空间版本" scope="request"></c:set>
<c:set var="version" value="simple_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />
<!--警版-->
<c:set var="versionTitle" value="[杀人游戏]警版" scope="request"></c:set>
<c:set var="versionDescription" value="杀手和警察的较量" scope="request"></c:set>
<c:set var="version" value="killer_police_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />

<!--警版不翻牌-->
<c:set var="versionTitle" value="[杀人游戏]警版不翻牌" scope="request"></c:set>
<c:set var="versionDescription" value="杀手和警察的较量" scope="request"></c:set>
<c:set var="version" value="killer_police_secret_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />


<!--捉鬼游戏-->
<c:set var="categoryTitle" value="捉鬼游戏" scope="request"></c:set>
<c:set var="categoryDescription" value="一种通过词汇寻找幽灵的游戏" scope="request"></c:set>
<tiles:insertDefinition name="versionSnapshot" />
<!--简化版-->
<c:set var="versionTitle" value="[捉鬼游戏 ]简化版" scope="request"></c:set>
<c:set var="versionDescription" value="规则简洁" scope="request"></c:set>
<c:set var="version" value="ghost_simple_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />


<!--猜词版-->
<c:set var="versionTitle" value="[捉鬼游戏]猜词版" scope="request"></c:set>
<c:set var="versionDescription" value="即便幽灵被推出局.也未必没有获胜的机会"
	scope="request"></c:set>
<c:set var="version" value="ghost_question_2.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />
<!--魂版-->
<c:set var="versionTitle" value="[捉鬼游戏]魂版" scope="request"></c:set>
<c:set var="version" value="ghost_soul_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />

<!--魂版-->
<c:set var="versionTitle" value="炸狼堡" scope="request"></c:set>
<c:set var="version" value="wolf_burg_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />


<!--虚拟电影院-->
<c:set var="categoryTitle" value="虚拟电影院" scope="request"></c:set>
<c:set var="categoryDescription" value="和喜欢的人一起看喜欢的电影" scope="request"></c:set>
<tiles:insertDefinition name="versionSnapshot" />
<c:set var="versionTitle" value="电影院" scope="request"></c:set>
<c:set var="version" value="video_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />

<!--扫雷游戏-->
<c:set var="categoryTitle" value="扫雷游戏" scope="request"></c:set>
<c:set var="categoryDescription" value="经典的游戏,新鲜的版本" scope="request"></c:set>
<tiles:insertDefinition name="versionSnapshot" />
<c:set var="versionTitle" value="[扫雷游戏]多人协作版" scope="request"></c:set>
<c:set var="versionDescription" value="一起用更快速度清除更大的雷区" scope="request"></c:set>
<c:set var="version" value="mine_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />

<!--DIY游戏室-->
<c:set var="categoryTitle" value="DIY游戏室" scope="request"></c:set>
<c:set var="categoryDescription" value="自定义桌游" scope="request"></c:set>
<tiles:insertDefinition name="versionSnapshot" />
<c:set var="versionTitle" value="DIY游戏室" scope="request"></c:set>
<c:set var="version" value="labs_diy_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />


<!--休息室-->
<c:set var="categoryTitle" value="休息室" scope="request"></c:set>
<c:set var="categoryDescription" value="看新闻,听音乐,闲聊天" scope="request"></c:set>
<tiles:insertDefinition name="versionSnapshot" />
<c:set var="versionTitle" value="茶座" scope="request"></c:set>
<c:set var="version" value="rest_1.0" scope="request"></c:set>
<tiles:insertDefinition name="roomSnapshot" />