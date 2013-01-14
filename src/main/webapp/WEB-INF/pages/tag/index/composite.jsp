<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=request.getContextPath()%>/r/c/tag/tag.css">



<title>股票-----标记</title>
</head>


<body>



<div class="board">
	<div class="menu">
	    <a href="/tag/index.do">全部</a>
         <div class="menuInputContainer">
            <input class="menuInput" id="stockInput" value="输入股票代码...."><button id="queryStock" class="tagButton" >查询股票</button>
            <div id="dropdown">
                
            </div>
         </div>
        <div class="menuInputContainer"><input class="menuInput" id="tagInput" value="输入Tag...."><button id="queryTag" class="tagButton" >查询Tag</button></div>
		<div class="short_string"></div>
	</div>
    <div>

     <div class="left">
            <div class="pageLayout">
                <button class="page" id="prev" page="0" size="20" disabled="disabled">上一页</button>

            </div>
            <div class="leftBody">
                <ul class="columnUL" id="stockList">

                </ul>
               
            </div>

            <div class="pageLayout">


                <button class="page" id="next" page="2" size="20">下一页</button>

            </div>

        </div>
    <div class="splitLine"></div>
    <div class="rightBody">

           <div>当前股票: <label  id="symbolLabel" symbol="" class="symbolLabel"></label></div>
            <div class="menuList">

                      <ul class="columnUL" id="tagList">
                      </ul>


                </ul>
            </div>
            <div class="addTagDiv">
              <input id="addTag" class="inputAddTag" value="">
              <button id="tagButton" class="tagButton" >追加</button>
            </div>

            <button id="test" class="tagButton" >test</button>


        </div>

    </div>
</div>


</body>
</html>
<script
	src="<%=request.getContextPath()%>/r/j-src/jquery/jquery-1.6.1.js"></script>
	   <script
	src="<%=request.getContextPath()%>/r/j-src/tree/RadixTree.js"></script>
	<script
	src="<%=request.getContextPath()%>/r/j-src/tree/gserializer.js"></script>

	<script
	src="<%=request.getContextPath()%>/r/j-src/tag/tools.js"></script>
	<script
	src="<%=request.getContextPath()%>/r/j-src/tag/store.js"></script>
	<script
	src="<%=request.getContextPath()%>/r/j-src/tag/view.js"></script>
	<script
	src="<%=request.getContextPath()%>/r/j-src/tag/init.js"></script>

