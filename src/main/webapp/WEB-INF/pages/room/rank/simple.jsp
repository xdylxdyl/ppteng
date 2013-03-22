<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<script src="/r/j-src/about/simple.js"></script>
<html xmlns="http://www.w3.org/1999/xhtml">
<div class="span9">
	<table class="table table-bordered table-striped">
		<caption>排行</caption>
		<thead>
			<tr>
				<th>序号</th>
				<th>姓名</th>
				<th>赢</th>
				<th>输</th>
				<th>总局数</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${statistics}" var="statistic" begin="0" step="1"
				varStatus="status">
				<c:set var="user" value="${id_users[statistics.id]}"></c:set>

				<c:choose>
					<c:when test="${status.index%4==0}">
						<c:set var="trClass" value="success"></c:set>
					</c:when>
					<c:when test="${status.index%4==1}">
						<c:set var="trClass" value="error"></c:set>
					</c:when>
					<c:when test="${status.index%4==2}">
						<c:set var="trClass" value="warning"></c:set>
					</c:when>
					<c:otherwise>
						<c:set var="trClass" value="info"></c:set>
					</c:otherwise>
				</c:choose>


				<tr class="${trClass}">
					<td>${status.index+1}</td>
					<td>${user.name}</td>
					<td>${statistics.win}</td>
					<td>${statistics.lose}</td>
					<td>${statistics.all}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</div>
<!--/row-->