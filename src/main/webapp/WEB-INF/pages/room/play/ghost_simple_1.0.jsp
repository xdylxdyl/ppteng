<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<tiles:insertDefinition name="commonCSSImport" />
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
                    <li class="active"><a href="#game_area" data-toggle="tab" auto-bottom>游戏</a></li>
                               
                    <li><a href="#setting_area" data-toggle="tab">设置</a></li>
                    <li><a href="#music_area" data-toggle="tab">音乐</a></li>
                    <li><a href="#help_area" data-toggle="tab">帮助</a></li>
              
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active lined-paper" id="game_area">

                     </div>
                    
                   
                    <div class="tab-pane" id="setting_area">
                       
                    </div>                    
                    <div class="tab-pane" id="music_area">
                        <tiles:insertDefinition name="musicList" />
                        
                       
                        
                    </div>
                    
                     <div class="tab-pane" id="help_area">
                         <div class="hero-unit">
     
          <p></p>     
<p><a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=1931" class="text-warning" target="_blank">1.捉鬼[简化版]术语表 &raquo;</a></p>
  <p><a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=1933" class="text-warning" target="_blank">2.捉鬼[简化版]规则 &raquo;</a></p>
      <p><a href="http://www.wandianba.com/" class="text-warning" target="_blank">3.感谢玩点吧首创捉鬼规则 &raquo;</a></p>   
       
        <p class="text-error">特别提示,游戏还在公测中.如果发现问题,可以先尝试刷新,如果能记录发生问题的情形并反馈给我,会更加感谢</p>  
        
         <p class="text-success">简要帮助:</p>  
         <p class="text-success">1.国王出题需要在指令里选择"出题"</p>  
         <p class="text-success">2.一定天数后未能全部推出幽灵,幽灵获胜</p>  
       
            </div>
                        
              
                       
                       
                    </div>
                    
                      <!-- advertise -->
                     
                    
                    
                    
                    <!-- end of tab-content -->
                    
                    
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
	
	
	

<tiles:insertDefinition name="commonJSImport" />
<script
	src="<%=request.getContextPath() %>/r/j-src/game/ghost/simple/1.0/ghost_simple_1.0.js?v=${frontVersion}"></script>

	
