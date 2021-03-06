<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>


<title><%@ include
											file="../../room/version/show.jsp"%>-战例-葡萄藤轻游戏</title>

<input type="hidden" id="version" value="${version}"></input>
<c:set var="pversion" value="${version}"></c:set>
<div class="span9">
	<div class="container">
		<c:forEach items="${records}" var="record" begin="0" step="1"
			varStatus="status">
			<c:set var="version" value="${record.room.version}"></c:set>
				<div class="row" style="margin-top: 1em; margin-bottom: 1em">
					<div class="span2">
						<img
							src="http://www.ptteng.com${users[record.room.createrID].icon}"
							alt="${users[record.room.createrID].name}" class="img-polaroid"
							style="max-width: 8em; height: 8em">
					</div>
					<div class="span10">
						<h3 class="text-error">
							<a href="/record/enter?recordID=${record.id}"
								title="${record.room.name}">
								${(page-1)*size+status.index+1}. <c:choose>
									<c:when test="${fn:length(record.room.name) > 50}">
										<c:out value="${fn:substring(record.room.name, 0, 50)}..." />
									</c:when>
									<c:otherwise>
										<c:out value="${record.room.name}" />
									</c:otherwise>
								</c:choose>

							</a>
							</h2>
							<blockquote>
								<p>
									纪元：
									<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
										value="${record.createAt}"></date:date>
									房主：<a href="/player/detail?uid=${record.room.createrID}"
										target="_blank">${users[record.room.createrID].name}</a>
								</p>
								<small> 版本[<span style="color: #4B0082"><%@ include
											file="../../room/version/show.jsp"%></span>]
									, 用时[ <span style="color: #4B0082"> <date:length
											date="${record.time}"></date:length>
								</span>]
								</small>
							</blockquote>
					</div>
				</div>
			<c:remove var="version"/>			
		</c:forEach>
	</div>

	<div class="pagination pagination-centered">
		<ul>
			<li><a
				href="/record/list?page=${page-1}&size=${size}&uid=${uid}&version=${pversion}"
				id="pagePrev">Prev</a></li>
			<li class="active"><a
				href="/record/list?page=${page}&size=${size}&uid=${uid}&version=${pversion}">${page}</a></li>
			<li><a
				href="/record/list?page=${page+1}&size=${size}&uid=${uid}&version=${pversion}"
				id="pageNext">Next</a></li>
		</ul>
	</div>
</div>

<input type="hidden" id="uid" value="${uid}" />

<script src="/r/j-src/web/record/list.js"></script>
