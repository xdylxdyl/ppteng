<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

    <link rel="stylesheet" href="/r/css/bootstrap.css">
    <link rel="stylesheet" href="/r/css/room/style.css">



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
<div id="stageShow" class="hide">${stageShow}</div>
<div id="contents" class="hide">${contents}</div>
<div id="escape" class="hide"></div>


<div class="navbar">
    <div class="navbar-inner">
        <a class="brand" id="roomName">房间名:${room.name}</a>
        <span class="brand">
            <small><a href="/player/detail.do?uid=${room.createrID}" id="createName"></a></small>
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
<div class="sidebar-nav">
    <ul class="nav nav-list" id="playerList">


    </ul>
</div>

<!--main-->
<div class="content">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span12" id="mainArea">
            
            <div class="tabbable">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#game_area" data-toggle="tab">游戏</a></li>
                               
                    <li><a href="#setting_area" data-toggle="tab">设置</a></li>
                    <li><a href="#music_area" data-toggle="tab">音乐</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="game_area">

                     </div>
                    
                    <div class="tab-pane" id="killer_area">
                       
                    </div>
                    <div class="tab-pane" id="setting_area">
                       
                    </div>                    
                    <div class="tab-pane" id="music_area">
                        <div id="wrapper">
                            <audio preload></audio>
                            <ol>
                                <li><a href="#" data-src="http://imade.118100.cn/library/music/1307949575730.mp3">你的歌声里</a></li>
                                <li><a href="#" data-src="http://lianzidi.com/COFFdD0xMzY1MDg3MTM3Jmk9MTE4LjExNC4xNzAuMTk5JnU9U29uZ3MvdjEvZmFpbnRRQy9iYi8zMDU5NWUwOWY3MWU2ZWIyNWIyYzFhYjE0ZGZiZmFiYi5tcDMmbT00MTE1Y2MwOWJlMWIwYmFlNDM4NjQ4YjhkZjdjMmNjNiZ2PWxpc3RlbiZuPdChx+m46CUyMG1peCZzPcvVtPLCzCZwPXM=.mp3">小情歌</a></li>
                                <li><a href="#" data-src="http://www.time.ac.cn/timebbs/uploadfile/mp3/hktk.mp3">想你的夜</a></li>
                            </ol>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
           </div>
           
             <div id="secondArea" class="hide">
             
                <div class="tabbable death">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#die_area" data-toggle="tab">亡灵</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="die_area">
                       
                        </div>
                    </div>
                </div>
          
             </div>
        </div>
    </div>
</div>
	
	
	
	
	
<script type="text/javascript" src="/r/j-src/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-dropdown.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-tab.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-modal.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-tooltip.js"></script>
<script type="text/javascript" src="/r/j-src/kibo/kibo.js"></script><!--侦测键盘-->
<script type="text/javascript" src="/r/j-src/music/audio.min.js"></script>

<script
	src="<%=request.getContextPath() %>/r/j-src/commons/model.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/commons/service.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/commons/base.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/commons/action.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/room/accept.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/room/view.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/commons/view.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/comet.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/timeUtil.js?v=${frontVersion}"></script>

<script
	src="<%=request.getContextPath() %>/r/j-src/foot/foot.js?v=${frontVersion}"></script>
	
	<script
	src="<%=request.getContextPath() %>/r/j-src/music/music.js?v=${frontVersion}"></script>


	
