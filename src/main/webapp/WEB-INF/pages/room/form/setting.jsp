<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!--room setting div-->
<div class="help-block">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">×</a>
        <h3>设置</h3>
    </div>
    <div class="modal-body">
    
    <form:form modelAttribute="setting"  class="form-horizontal">	
		<spring:bind path="setting.version">
			<input name="version" value="${setting.version}" type="hidden"
				readonly />
		</spring:bind>
		<spring:bind path="setting.rid">
			<input name="rid" value="${setting.rid}" type="hidden" readonly />
		</spring:bind>

		<c:forEach items="${setting.setting}" var="entry">
			<c:choose>
				<c:when test="${empty settingDisplay[entry.key]}">
            <label class="control-label" for="">${entry.key}:</label>
     </c:when>
				<c:otherwise>
    
      <label class="control-label" for="">${settingDisplay[entry.key]}:</label>
    
    </c:otherwise>
			</c:choose>  :
        <spring:bind path="setting.setting[${entry.key}]">
				<input id="${entry.key}" name="setting[${entry.key}]"
					value="${entry.value}" lass="input-xlarge" type="text" />
			
                        
			</spring:bind>
		</c:forEach>
		<input id="submitSetting" class="submit" type="button" value="提交设置" />
		
	</form:form>
    </div>
    
</div>

