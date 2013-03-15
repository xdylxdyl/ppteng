<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

 <div class="span3">
            <div class="well sidebar-nav">
                <ul class="nav nav-list">
                    <li class="nav-header">个人资料</li>
                    <li id="leftNav_basic"><a href="/player/detail.do">基本信息</a></li>
                    <!-- <li id="leftNav_stageShow"><a href="/player/regedit.do?type=edit">修改密码</a></li>
                    <li id="leftNav_basic"><a href="/player/detail.do">出场秀</a></li> -->
                    <li class="nav-header">打卡统计</li>
                    <li id="leftNav_punch"><a href="/player/punchlist.do">曲线图</a></li>
                 <!--   <li class="nav-header">杀人游戏</li>
                    <li id="simple"><a href="/about.do?type=simple">简化</a></li>
                    
                    <li class="nav-header">扫雷</li>
                    <li><a href="#">多人扫雷</a></li>
                    <li class="nav-header">在一起</li>
                    <li><a href="#">一起看电影</a></li>
                    <li><a href="#">一起听音乐</a></li> -->
                </ul>
            </div>
            <!--/.well -->
        </div>
        <!--/span-->
<script src="/r/j-src/commons/left.js"></script>