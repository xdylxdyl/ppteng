<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<html ng-app="roomList">
<head>
<meta charset=utf-8">
<title>LogIn</title>
<link href="/r/css/all2.css" rel="stylesheet" type="text/css" />
 <script src="/r/j-src/angular/angular.js"></script>


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
        
          <!-- start of tabbale-->
         <div class="tabbable">
                    <ul class="nav nav-tabs">
                        <li><a href="#roomList" data-toggle="tab">房间列表</a></li>
                        <li class="active" ><a href="#roomCreate" data-toggle="tab">创建房间</a></li>
                      
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane" id="roomList">                             
                            
                        </div>
                       <div class="tab-pane active" id="roomCreate" ng-controller="VersionConfigCtrl">
   
                    <div class="row-fluid span9">
     
    
                   <div class="span4" ng-repeat="config in versionConfig">
                    <a href="" class=".createCategory"  version="{{config.version}}"> <img class="marketing-img" ng-src="{{config.img}}"></a>
                     
                     
                           <h4><a href="" class=".createCategory" version="{{config.version}}">{{config.title}}</a></h4>
                        
                      
                      </div> 
       
     
    
                  </div>   
   
              </div>       
                 
   
                    
                  </div>
       
       
        </div>
        
         <!-- end of tabbale-->
        
        
    
    
    </div>

	<input type="hidden" id="uid" value="${uid}" />
	</div>
    </div>
</body>
</html>

<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>



<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-dropdown.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-tab.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-modal.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-tooltip.js"></script>


<script src="/r/j-src/listall/all.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath()%>/r/j-src/commons/service.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/r/j-src/punch/punch.js?version=${frontVersion}"></script>
