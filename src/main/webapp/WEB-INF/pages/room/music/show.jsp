<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<div id="wrapper" ng-controller="MusicCtrl">
	<audio preload></audio>
	<ol>
		<li ng-repeat="music in musics"><a href="#"
			data-src="{{music.song_file}}">{{music.song_name}}</a></li>



	</ol>
</div>