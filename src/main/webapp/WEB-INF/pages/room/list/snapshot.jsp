 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%> 
 <h4 class="text-error">${versionTitle}</h4>
 
  <hr>  
 
 <c:if test="${fn:length(rooms[version])==0}">
 
             <div class="row" style="margin-bottom: 30px;">

               

                    <div class="span2">
                    <img src="/r/img/room/wait.jpg" alt="暂无房间" class="img-polaroid">
                    </div>
                    <div class="span7">
                        <h4>
                                                                                  暂无房间,创建一个么
                        </h4>                      
                    </div>


            </div>
 
 
 </c:if>
  
  
 <c:forEach items="${rooms[version]}" var="room" begin="0" step="1" varStatus="status">
            <div class="row" style="margin-bottom: 30px;">


                    <div class="span2">
                    <img src="http://www.ptteng.com${users[room.createrID].icon}" alt="${users[room.createrID].name}" class="img-polaroid">
                    </div>
                    <div class="span7">
                        <h4>
                        <small>房间名:</small> ${status.index+1}.<a href="" rid="${room.id}" uid="${uid}">${room.name}[进入房间]</a>
                        </h4>
                        <blockquote>
                        <small> 纪元： <date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 " value="${room.createAt}"></date:date>
                        房主：<a href="/player/detail?uid=${room.createrID}"
                        target="_blank">${users[room.createrID].name}</a>
                        </small> <small> 版本[<span style="color: #4B0082"><%@ include
                            file="../version/show.jsp"%></span>],有玩家 [<span
                        style="color: #4B0082">${room_count[room.id]}</span>] 人 <c:if
                        test="${my_room.id==room.id}">,你在这里</c:if>
                        </small>
                        </blockquote>
                        <p class="text-success">签名: ${users[room.createrID].sign}</p>
                    </div>


            </div>
    </c:forEach>
