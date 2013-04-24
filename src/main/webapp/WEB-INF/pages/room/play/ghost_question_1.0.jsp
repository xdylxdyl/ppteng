<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

    <link rel="stylesheet" href="/r/css/bootstrap.css">
    <link rel="stylesheet" href="/r/css/room/style.css">

<title>${room.name}-简化-捉鬼-葡萄藤轻游戏</title>

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
         <span class="brand">
            <small id="playerCard"></small>
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
            <div class="span12" id="mainArea">
            
            <div class="tabbable">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#game_area" data-toggle="tab">游戏</a></li>
                               
                    <li><a href="#setting_area" data-toggle="tab">设置</a></li>
                    <li><a href="#music_area" data-toggle="tab">音乐</a></li>
                    <li><a href="#help_area" data-toggle="tab">帮助</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="game_area">

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
                    
                     <div class="tab-pane" id="help_area">
                         <div class="hero-unit">
     
          <p></p>     
  <p><a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=1931" class="text-warning" target="_blank">1.捉鬼[简化版]术语表 &raquo;</a></p>
  <p><a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=2058&fromuid=4" class="text-warning" target="_blank">2.[捉鬼-猜词版]规则 &raquo;</a></p>
  

  
      <p><a href="http://www.wandianba.com/" class="text-warning" target="_blank">3.感谢玩点吧首创捉鬼规则 &raquo;</a></p>   
       
        <p class="text-error">特别提示,游戏还在公测中.如果发现问题,可以先尝试刷新,如果能记录发生问题的情形并反馈给我,会更加感谢</p>  
        
         <p class="text-success">简要帮助:</p>  
         <p class="text-success">1.国王出题需要在指令里选择"出题"</p>  
         <p class="text-success">2.一定天数后未能全部推出幽灵,幽灵获胜</p>  
         <p class="text-success">3.提问阶段.国王自行判断幽灵提问的个数,系统仅提示幽灵允许提出问题的个数.</p>
         <p class="text-success">4.提问阶段.国王需要宣布游戏的胜负</p>   
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
	src="<%=request.getContextPath() %>/r/j-src/ghost/question/1.0/ghost_question_1.0.js?v=${frontVersion}"></script>
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



	
