<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

 <div class="span3">
            <div class="well sidebar-nav">
                <ul class="nav nav-list">
                    <li class="nav-header">玩家榜单</li>
                    <li id="leftNav_money"><a href="/rank/list.do?type=money">炫富榜</a></li>
                      <li id="leftNav_punch"><a href="/rank/list.do?type=punch">勤奋打卡榜</a></li>
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
<script src="/r/j-src/rank/left.js"></script>