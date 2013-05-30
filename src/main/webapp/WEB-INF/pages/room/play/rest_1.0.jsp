<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

    <link rel="stylesheet" href="/r/css/bootstrap.css">
    <link rel="stylesheet" href="/r/css/room/style.css">

<title>${room.name}-休息室-葡萄藤轻游戏</title>

<input type="hidden" id="uid" value="${uid}">
<!-- 玩家ID -->
<input type="hidden" id="rid" value="${room.id}">
<!-- 房间ID -->
<input type="hidden" id="version" value="${room.version}">
<input type="hidden" id="assign" value="">
<!-- 玩家角色 -->
<input type="hidden" id="time" value="over">
<!-- 游戏时间白天黑夜 -->
<input type="hidden" id="createrID" value="${room.createrID}">
<input type="hidden" id="type" value="${type}">
<input type="hidden" id="recordID" value="${record.id}">
<input type="hidden" id="recordTime" value="${record.time}">
<input type="hidden" id="first" value="${first}">
<div id="stageShow" class="hide">${stageShow}</div>
<div id="contents" class="hide">${contents}</div>
<div id="escape" class="hide"></div>


<div class="navbar">
    <div class="navbar-inner">
    
        <span class="brand">
            <small><a href="/player/detail?uid=${room.createrID}" id="createName"></a></small>
        </span>
         <span class="brand">
            <small id="gamePhase"></small>
        </span>
        <span class="brand">
            <small id="playerRole"></small>
        </span>
        <ul class="nav pull-right">           
            <li><a href="#" id="exitButton" rel="tooltip" title="点此离开房间" data-original-title="点此离开房间" data-placement="bottom">退出房间 <i class="icon-off"></i></a></li>
        </ul>
    </div>
</div>

<!--left list-->
<div class="sidebar-nav" id="sidebar-nav">
    <ul class="nav nav-list" id="playerList">


    </ul>
    
     <div class="sidebar-toggle" id="sidebar-toggle">
    -
    </div>
</div>

<!--main-->

<div class="content" id="content">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span7">
            
            <div class="tabbable">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#rest_public" data-toggle="tab">精选</a></li>
                    <li><a href="#rest_private" data-toggle="tab">偏爱</a></li>
                    <li><a href="#music_area" data-toggle="tab">音乐</a></li>          
                    <li><a href="#setting_area" data-toggle="tab">设置</a></li>
                      <li><a href="#help_area" data-toggle="tab">帮助</a></li>
                   
                 
                </ul>
                <div class="tab-content">
                   
                    <!--<button ng-click="refresh()">刷新</button>-->
                    <div class="tab-pane active" id="rest_public" ng-controller="publicCtrl">

                                <blockquote>
                                    <div class="pull-right">
                                        <button ng-click="refresh()" class="btn">刷新</button>
                                    </div> 
                                    <p>茶座休息室</p>
                                    <small>葡萄藤精选的内容</small>

                                </blockquote>


                                <div class="" id="news_public">

                                        <div class="span12">

              <div ng-repeat="pfeed in publicFeed">

                        <h4>
                            <a href="{{pfeed.link}}" target="_blank">{{pfeed.title}}</a>
                        </h4>
                        <blockquote>
                       
                        <small> {{pfeed.pubDate|timeConvert}}</small> 
                        </blockquote>



            </div>
            
        
    


        </div>
                                
                                
                                
                                </div>

                    </div>
                    <div class="tab-pane" id="rest_private">
                      
                            <div class="">
                                <blockquote>
                                    <p>茶座休息室</p>
                                    <small>房主偏爱的内容</small>
                                 
                                </blockquote>
                                <div id="news_private">
                                
                                    <p>正在开发中~敬请期待~</p>
                                
                                  </div>
                            </div>
                           
                    </div>
                    <div class="tab-pane" id="setting_area">
                       
                    </div>                    
                     <div class="tab-pane" id="music_area">
                       <tiles:insertDefinition name="musicList" />
                        
                       
                        
                    </div>
                    
                      <div class="tab-pane" id="help_area">
                         <div class="hero-unit">
     
          <p></p>     
    <p><a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=2007" class="text-warning" target="_blank">1.订阅说明 &raquo;</a></p>
    
       
       
            </div>
                        
                       
                       
                    </div>
                    
                      <!-- advertise -->
                     
                    
                    
                    
                    <!-- end of tab-content -->
                    
                    
                </div>
            </div>
           </div>
           
             <div  class="span5">
             
                <div class="tabbable death">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#game_area" data-toggle="tab">茶馆闲聊</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="game_area">
                       
                        </div>
                    </div>
                </div>
          
             </div>
        </div>
    </div>
</div>

	
	
	
<tiles:insertDefinition name="commonJSImport" />
<script type="text/javascript" src="/r/j-src/framework/audio/audio.min.js"></script>
 <script src="/r/j-src/framework/angular/angular.min.js"></script>

	<script
	src="<%=request.getContextPath() %>/r/j-src/web/music/music.js?v=${frontVersion}"></script>

<script src="/r/j-src/game/rest/1.0/rest_1.0.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/model.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/service.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/base.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/action.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/view.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/comet.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/timeUtil.js?v=${frontVersion}"></script>

<script
	src="<%=request.getContextPath() %>/r/j-src/web/foot/foot.js?v=${frontVersion}"></script>

	

	
