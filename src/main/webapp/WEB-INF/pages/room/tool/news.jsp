<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<title>新闻-工具-葡萄藤轻游戏</title>

<html ng-app="myApp">



<div class="span9" ng-controller="publicCtrl">

	<div class="pull-right">
		<button ng-click="refresh()" class="btn">刷新</button>
	</div>


	<div ng-repeat="pfeed in publicFeed">

		<h4>
			<a href="{{pfeed.link}}" target="_blank">{{pfeed.title}}</a>
		</h4>
		<blockquote>

			<small> {{pfeed.pubDate|timeConvert}}</small>
		</blockquote>


	</div>











</div>
</html>
<script src="/r/j-src/framework/angular/angular.min.js"></script>
<script src="/r/j-src/util/newsUtil.js?v=${frontVersion}"></script>
<script src="/r/j-src/web/tool/news.js?v=${frontVersion}"></script>
