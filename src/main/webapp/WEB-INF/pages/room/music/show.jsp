<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

<div ng-controller="MusicCtrl">
	<div class="pull-right">
		<button ng-click="refreshMusic()" class="btn">换一批</button>
	</div>
	<div id="wrapper" >
		<audio preload></audio>

		<ol>
			<li ng-repeat="music in musics"><a href="#"
				data-src="{{music.song_file}}">{{music.song_name}}</a></li>



		</ol>
	</div>
	<div>
	<p><a href="http://www.duole.com/" target="_blank">多乐音乐</a>提供</p>
	</div>
</div>