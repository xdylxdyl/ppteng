<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!doctype html>
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="/r/css/bootstrap.css" rel="stylesheet">
<link href="/r/css/bootstrap-responsive.css" rel="stylesheet">
<link rel="stylesheet" href="/r/css/room/mstyle.css">



</head>
<body>




	<!-- first row -->


	<tiles:insertAttribute name="header" />


	<!-- first row -->
	<!-- second row -->

	<div class="content">
		<div class="container-fluid">
			<div class="row-fluid">
				<tiles:insertAttribute name="body" />
			</div>
		</div>
	</div>

	<!-- second row -->

	<!-- three row -->
	
		<tiles:insertAttribute name="footer" />
	
	<!-- three row -->



</body>
</html>