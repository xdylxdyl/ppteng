 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%> 

<div class="tab-pane" id="roomCreate active" ng-controller="VersionConfigCtrl">
   
   <div class="row-fluid" ng-repeat="config in versionConfig">
     
    
     <div class="span4">
        <img class="img-polaroid" ng-src="{{config.img}}">
        <h2>{{config.title}}</h2>
          <c:if test="${empty my_room}">
                <a href="" class="btn btn-primary" id="createRoom" version="{{config.version}}">创建房间</a>
         </c:if> 
     </div> 
       
     
    
   </div>   
   
</div>                   