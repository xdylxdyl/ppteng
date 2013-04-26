 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%> 



 
  <c:if test="${fn:length(rooms[version])!=0}">

 <h4 class="text-info">${versionTitle}  </h4>

    
  <hr>  
 

 

  
  
 <c:forEach items="${rooms[version]}" var="room" begin="0" step="1" varStatus="status">
            <div class="row" style="margin-bottom: 30px;">


                    <div class="span2">
                    <img src="http://www.ptteng.com${users[room.createrID].icon}" alt="${users[room.createrID].name}" class="img-polaroid">
                    </div>
                    <div class="span7">
                        <h4>
                         ${room.name}<a href="" rid="${room.id}" uid="${uid}" class="enterRoom pull-right ">进入</a>
                        </h4>
                        <blockquote>
                        <small> 
                              <date:date pattern="HH时mm分 " value="${room.createAt}"></date:date>     有玩家 [<span style="color: #4B0082">${room_count[room.id]}</span>] 人                      
                         </small> 
                        
                         <small> 
                           <c:if test="${my_room.id==room.id}">你在这里</c:if> 
                            <c:if test="${room.status==0}">游戏中</c:if>   
                            <c:if test="${room.status==1}">未开始</c:if>             
                        </small>
                         <small> 
                                                                           房主：<a href="/player/detail?uid=${room.createrID}" target="_blank">${users[room.createrID].name}</a>             
                        </small>
                      
                        
     
                        
                        </blockquote>
                        <p class="text-success">签名: ${users[room.createrID].sign}</p>
                    </div>


            </div>
    </c:forEach>
    
  </c:if>
 