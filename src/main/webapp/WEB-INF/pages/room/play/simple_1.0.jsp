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
<div id="stageShow" class="hidden">${stageShow}</div>
<div id="contents" class="hidden">${contents}</div>



<div class="navbar">
    <div class="navbar-inner">
        <a href="#" class="brand">${room.name}</a>
        <ul class="nav pull-right">           
            <li><a href="#" id="exitRoom" rel="tooltip" title="点此离开房间" data-original-title="点此离开房间" data-placement="bottom">退出房间 <i class="icon-off"></i></a></li>
        </ul>
    </div>
</div>

<!--room setting div over-->

<!--left list-->
<div class="sidebar-nav">
    <ul class="nav nav-list" id="playerList">


    </ul>
</div>

<!--main-->
<div class="content">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="tabbable">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="game_nav" data-toggle="tab">游戏</a></li>
                    <li><a href="die_nav" data-toggle="tab">亡灵</a></li>
                    <li><a href="killer_nav" data-toggle="tab">杀手</a></li>
                    <li><a href="setting_nav" data-toggle="tab">设置</a></li>
                    <li><a href="music_nav" data-toggle="tab">音乐</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="game_area">
                     </div>
                    <div class="tab-pane" id="die_area">
                       
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



<script>
    /*音乐播放器*/
    $(function() {
        // Setup the player to autoplay the next track
        var a = audiojs.createAll({
            trackEnded: function() {
                var next = $('ol li.playing').next();
                if (!next.length) next = $('ol li').first();
                next.addClass('playing').siblings().removeClass('playing');
                audio.load($('a', next).attr('data-src'));
                audio.play();
            }
        });

        // Load in the first track
        var audio = a[0];
        first = $('ol a').attr('data-src');
        $('ol li').first().addClass('playing');
        audio.load(first);

        // Load in a track on click
        $('ol li').click(function(e) {
            e.preventDefault();
            $(this).addClass('playing').siblings().removeClass('playing');
            audio.load($('a', this).attr('data-src'));
            audio.play();
        });
    });
</script>

<script type="text/javascript">
    /*小提示*/
    $('#closeRoom').tooltip();
    $('#setRoom').tooltip();
    /*键盘快捷控制，还未想好如何设置*/
    var key = new Kibo();
    $('#inputText').focus(function() {
        key.down(['alt 1'], function() {
            $("#selectExpression").click();
        })
    });
    /*宽度min-width: 600px时页面高度控制*/
    function controlHeight() {
        var winH = $(window).height();
        var headH = $('.navbar').outerHeight();
        var footH = $('.foot').outerHeight();
        var mainH = winH - headH - footH - 20;
        var contentH = mainH - $('ul.nav-tabs').outerHeight();
        $('.sidebar-nav').css({
            maxHeight: mainH,
            minHeight: mainH
        });
        $('.tab-pane').css({
            maxHeight: contentH,
            minHeight: contentH
        });

    }
    controlHeight();
    $(window).resize(controlHeight);


    /*
    * 动作栏下拉框
    * @elem 传入选择器ID
    * 选择器的文本变为所选项文本
    * 选择器的data-default属性变为所选项data-default属性
    * 所选项如果为color，则选择器文本颜色也改为相应颜色*/
    function selectors(elem) {
        var $elem = $('#' + elem);
        var $menu = $elem.siblings('ul.dropdown-menu');
        $menu.children('li').click(function() {
            var txt = $(this).text();
            var val = $(this).attr('data-default');
            $elem.find('span').text(txt);
            $elem.attr('data-default', val);
            if (val.indexOf('#') == '0') {
                $elem.find('span').css({
                    color: val
                })
            }
        })
    }
    selectors('selectExpression');
    selectors('selectColor');
    selectors('selectOrder');
    selectors('selectObject');

</script>
	
