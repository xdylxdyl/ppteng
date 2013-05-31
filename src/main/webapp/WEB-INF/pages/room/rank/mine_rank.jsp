<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

<input type="hidden" id="version" value="${smallVersion}"></input>
 <div class="span9">
<div class="container" >
	<c:forEach items="${mines}" var="mine" begin="0" step="1"
		varStatus="status">
	<c:set var="record" value="${records[mine.rid]}"></c:set>	
		
	 <c:set var="version" value="${record.room.version}"></c:set>
    <div class="row"  style="margin-top:1em;margin-bottom:1em">
        <div class="span2">
            <img src="http://www.ptteng.com${users[mine.uid].icon}" alt="${users[record.room.createrID].name}" class="img-polaroid" style="max-width:8em;height:8em" >
        </div>
        <div class="span10">
            <h3 class="text-error"><a href="/record/enter?recordID=${record.id}"> ${(page-1)*size+status.index+1}.${record.room.name}</a></h2>
            <blockquote>
                <p>纪元：
						<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
								value="${record.createAt}"></date:date>
				玩家：<a href="/player/detail?uid=${mine.uid}"
								target="_blank">${users[mine.uid].name}</a>
				</p>
                <small> 

						
							版本[<span style="color: #4B0082"><%@ include
									file="../../room/version/show.jsp"%></span>] ,
							用时[ <span style="color: #4B0082"><fmt:formatNumber pattern="0.000"
								value='${record.time/1000}'></fmt:formatNumber>秒
							</span>]
			</small>
            </blockquote>           
            
        </div>
    </div>
    </c:forEach>
</div>

<div class="pagination pagination-centered">
  <ul>
    <li><a href="/mine/statistics/${smallVersion}?page=${page-1}&size=${size}&uid=${uid}" id="pagePrev">Prev</a></li>   
      <li class="active"><a href="/mine/statistics/${smallVersion}?page=${page}&size=${size}&uid=${uid}">${page}</a></li>
    <li><a href="/mine/statistics/${smallVersion}?page=${page+1}&size=${size}&uid=${uid}" id="pageNext">Next</a></li>
  </ul>
</div>
</div>
	
	<input type="hidden" id="uid" value="${uid}" />

<script src="/r/j-src/web/rank/mine.js"></script>
