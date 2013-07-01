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


	<div class="container-fluid">


		<!-- first row -->

		<div class="row-fluid" id="row1">

			<tiles:insertAttribute name="header" />


		</div>
		<!-- first row -->
		<!-- second row -->

		<div class="row-fluid wrap" id="row2">
			<tiles:insertAttribute name="body" />
		</div>

		<!-- second row -->

		<!-- three row -->
		<div class="row-fluid footer" id="row3">
			<tiles:insertAttribute name="footer" />
		</div>
		<!-- three row -->
	

	</div>
</body>
</html>