<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link rel="stylesheet" type="text/css"
	href="/r/j-src/framework/gridster/jquery.gridster.css">
	<link rel="stylesheet" type="text/css" href="/r/css/web/about/film.css">
		<link rel="stylesheet"
			href="/r/j-src/framework/countdown/countdown/jquery.countdown.css" />
<div class="span9">

	<div>
		


		<div>
		
		<p>离下次电影院开映还有~</p>
			
			<h3 id="note" class="text-center"></h3>


		</div>

	</div>
	<section class="demo">

	<div class="gridster ready" ng-controller="FilmConfigCtrl">

		<ul>

			<li data-row="{{f.row}}" data-col="{{f.col}}" data-sizex="{{f.x}}"
				data-sizey="{{f.y}}" class="gs_w" style="position: absolute;"
				ng-repeat="f in film">

				<h3 class="text-center">
					<a href="{{f.link}}" target="_blank">{{f.title}}</a>
				</h3>




			</li>


		</ul>
	</div>

	</section>

</div>
<!--/row-->

<script src="/r/j-src/framework/gridster/jquery.gridster.js"
	type="text/javascript" charset="utf-8"></script>
<script src="/r/j-src/framework/gridster/jquery.coords.js"
	type="text/javascript" charset="utf-8"></script>
<script src="/r/j-src/framework/gridster/jquery.collision.js"
	type="text/javascript" charset="utf-8"></script>
<script src="/r/j-src/framework/gridster/jquery.draggable.js"
	type="text/javascript" charset="utf-8"></script>
<script src="/r/j-src/framework/gridster/utils.js"
	type="text/javascript" charset="utf-8"></script>
<script src="/r/j-src/framework/gridster/jquery.gridster.extras.js"
	type="text/javascript" charset="utf-8"></script>
<script src="/r/j-src/framework/angular/angular.min.js"></script>
<script src="/r/j-src/web/about/film.js"></script>

<script src="/r/j-src/framework/countdown/countdown/jquery.countdown.js"></script>

