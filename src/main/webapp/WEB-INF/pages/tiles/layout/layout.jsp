<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>    
<!doctype html>
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<input type="hidden" id="bootstrapVersion" value="2">
<input type="hidden" id="switchFrom" value="${switchFrom}">



</head>
<body ng-app="myApp">

 <tiles:insertAttribute name="header" />

       
   <tiles:insertAttribute name="body" />
       


   <tiles:insertAttribute name="footer" />

</body>
</html>