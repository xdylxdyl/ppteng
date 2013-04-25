<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<html>
<head>
<meta charset=utf-8">
<title>LogIn</title>
<link href="/r/css/all2.css" rel="stylesheet" type="text/css" />
<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/listall/all.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath()%>/r/j-src/commons/service.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/r/j-src/punch/punch.js?version=${frontVersion}"></script>

<input type="hidden" value="${oldRoom}" id="oldRoom">

</head>

<body>


<div class="container">
	<div class="row section">
        <div class="span3 left-box">




            <div class="left-box-in">
                <h4>
                <small>欢迎你</small>,${uname}
                </h4>
                <img src="http://www.ptteng.com${user.icon}" class="portrait"
                id="portrait_img" style="max-width: 16em; height: 8em">
                <br><br>
                <blockquote>
                <small id="money">金币 ${user.money}</small>
                <c:choose>
                <c:when test="${empty punchCount}">
                <div id="punchBox">
                    <div id="punchOver"></div>
                    <span class="btn btn-primary" id="punch">打卡</span>
                </div>
                </c:when>
                <c:otherwise>
                <small>连续打卡${punchCount}天,额外获取金币 ${punchCount}*100</small>
                </c:otherwise>
                </c:choose>
                </blockquote>
                <c:if test="${empty my_room}">
                <a href="" class="btn btn-primary" id="createRoom">创建房间</a>
                </c:if>
            </div>
        </div>



        <div class="span9">
        
       

     <!--杀人游戏-->
     
     <c:set var="categoryTitle" value="杀人游戏" scope="session"></c:set>   
     <c:set var="categoryDescription" value="一种分析和推理的游戏" scope="session"></c:set>  
     <tiles:insertDefinition name="versionSnapshot" />
            <!--简化-->
         <c:set var="versionTitle" value="简化版" scope="session"></c:set>
         <c:set var="versionDescription" value="杀人游戏中最具分析和推理空间版本" scope="session"></c:set>
         <c:set var="version" value="simple_1.0"  scope="session"></c:set>      
         <tiles:insertDefinition name="roomSnapshot" />
         <!--警版-->
         <c:set var="versionTitle" value="警版" scope="session"></c:set>
         <c:set var="versionDescription" value="杀手和警察的较量" scope="session"></c:set>
         <c:set var="version" value="killer_police_1.0" scope="session"></c:set>      
         <tiles:insertDefinition name="roomSnapshot" />
         
           <!--警版不翻牌-->
         <c:set var="versionTitle" value="警版不翻牌" scope="session"></c:set>
         <c:set var="versionDescription" value="杀手和警察的较量" scope="session"></c:set>
         <c:set var="version" value="killer_police_secret_1.0" scope="session"></c:set>      
         <tiles:insertDefinition name="roomSnapshot" />
         
	 
    <!--捉鬼游戏-->
     <c:set var="categoryTitle" value="捉鬼游戏" scope="session"></c:set>
     <c:set var="categoryDescription" value="一种通过词汇寻找幽灵的游戏" scope="session"></c:set>
     <tiles:insertDefinition name="versionSnapshot" />
     <!--简化版-->
     <c:set var="versionTitle" value="简化版" scope="session"></c:set>
     <c:set var="versionDescription" value="规则简洁" scope="session"></c:set>
      <c:set var="version" value="ghost_simple_1.0" scope="session"></c:set>      
       <tiles:insertDefinition name="roomSnapshot" />
        <!--猜词版-->
     <c:set var="versionTitle" value="猜词版" scope="session"></c:set>
     <c:set var="versionDescription" value="即便幽灵被推出局.也未必没有获胜的机会" scope="session"></c:set>
      <c:set var="version" value="ghost_question_1.0" scope="session"></c:set>      
       <tiles:insertDefinition name="roomSnapshot" />
        <!--魂版-->
     <c:set var="versionTitle" value="魂版" scope="session"></c:set>    
      <c:set var="version" value="ghost_soul_1.0" scope="session"></c:set>      
       <tiles:insertDefinition name="roomSnapshot" /> 
    
    <!--虚拟电影院-->
     <c:set var="categoryTitle" value="虚拟电影院" scope="session"></c:set>
     <c:set var="categoryDescription" value="和喜欢的人一起看喜欢的电影" scope="session"></c:set>
     <tiles:insertDefinition name="versionSnapshot" />    
      <c:set var="versionTitle" value="电影院" scope="session"></c:set>
      <c:set var="version" value="video_1.0" scope="session"></c:set>      
       <tiles:insertDefinition name="roomSnapshot" />
 
    <!--扫雷游戏-->
     <c:set var="categoryTitle" value="扫雷游戏" scope="session"></c:set>
     <c:set var="categoryDescription" value="经典的游戏,新鲜的版本" scope="session"></c:set>
     <tiles:insertDefinition name="versionSnapshot" />
     <c:set var="versionTitle" value="多人协作版" scope="session"></c:set>
     <c:set var="versionDescription" value="一起用更快速度清除更大的雷区" scope="session"></c:set>
      <c:set var="version" value="mine_1.0" scope="session"></c:set>      
       <tiles:insertDefinition name="roomSnapshot" />
      
    <!--休息室-->
     <c:set var="categoryTitle" value="休息室" scope="session"></c:set>
     <c:set var="categoryDescription" value="看新闻,听音乐,闲聊天" scope="session"></c:set>
     <tiles:insertDefinition name="versionSnapshot" />
      <c:set var="versionTitle" value="茶座" scope="session"></c:set>
      <c:set var="version" value="rest_1.0" scope="session"></c:set>      
       <tiles:insertDefinition name="roomSnapshot" />
     
     
   

        </div>
    </div>

	<input type="hidden" id="uid" value="${uid}" />
	</div>
    </div>
</body>
</html>
