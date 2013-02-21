<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>



<div class="container" >
	<c:forEach items="${records}" var="record">
	 <c:set var="version" value="${record.room.version}"></c:set>
    <div class="row"  style="margin-top:1em;margin-bottom:1em">
        <div class="span2">
            <img src="http://www.ptteng.com/${users[record.room.createrID].icon}" alt="${users[record.room.createrID].name}" class="img-polaroid" style="max-width:8em;height:8em" >
        </div>
        <div class="span10">
            <h3 class="text-error"><a href="/record/enter.do?recordID=${record.id}">${record.room.name}</a></h2>
            <blockquote>
                <p>纪元：
						<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
								value="${record.createAt}"></date:date>
				房主：<a href="/player/detail.do?uid=${record.room.createrID}"
								target="_blank">${users[record.room.createrID].name}</a>
				</p>
                <small> 

						
							版本[<span style="color: #4B0082"><%@ include
									file="../../room/version/show.jsp"%></span>] ,
							用时[ <span style="color: #4B0082"> <date:length
									date="${record.time}"></date:length>
							</span>]
			</small>
            </blockquote>           
            
        </div>
    </div>
    </c:forEach>
</div>


	
	<input type="hidden" id="uid" value="${uid}" />
<script src="/r/j-src/listall/record_list.js"></script>
