<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>    
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">




</head>
<body>



<div id="container">
    <div class="clearfix">
        <nav>
            <tiles:insertAttribute name="header" />
        </nav>

        <section>
            <tiles:insertAttribute name="body" />
        </section>
    </div>

    <footer>
        <tiles:insertAttribute name="footer" />
    </footer>
</div>
</body>
</html>