<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

    <link rel="stylesheet" href="/r/css/bootstrap.css">
    <link rel="stylesheet" href="/r/css/room/style.css">

<title>${room.name}-虚拟电影院-葡萄藤轻游戏</title>

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
                    <li class="active"><a href="#video_area" data-toggle="tab">电影</a></li>
                               
                    <li><a href="#setting_area" data-toggle="tab">设置</a></li>
                 
                </ul>
                <div class="tab-content">
                   
                    
                    <div class="tab-pane active" id="video_area">
                        <!--新添视频部分-->
                            <div class="video">
                                <blockquote>
                                    <p>葡萄藤虚拟电影院</p>
                                    <small>这样的一个夜晚.有你有我.</small>
                                 
                                </blockquote>
                                <div class="video-player" id="outer">
                                    <!--从网页中找到的部分-->
                                    <embed src="http://player.youku.com/player.php/sid/XNTI2NjI3MTY4/v.swf" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
                                </div>
                            </div>
                            <!--新添视频部分结束-->
                    </div>
                    <div class="tab-pane" id="setting_area">
                       
                    </div>                    
                   
                    
                    
                </div>
            </div>
           </div>
           
             <div  class="span5">
             
                <div class="tabbable death">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#game_area" data-toggle="tab">小树林</a></li>
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
	
	
	
	
	
<script type="text/javascript" src="/r/j-src/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-dropdown.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-tab.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-modal.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/bootstrap-tooltip.js"></script>
<script type="text/javascript" src="/r/j-src/kibo/kibo.js"></script><!--侦测键盘-->
<script type="text/javascript" src="/r/j-src/music/audio.min.js"></script>

<script src="/r/j-src/video/video.js?v=${frontVersion}"></script>

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


	
