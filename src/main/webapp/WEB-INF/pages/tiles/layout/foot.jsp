<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>





<!--footer-->
<div class="foot">
    <div class="row-fluid">
        <div class="inner-space">
            <!--act-->
            <ul class="toolbar">
                <li class="dropup">
                    <a href="#" id="selectExpression" data-default="" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>神态</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="expression">                        
                    </ul>
                </li>
                <li class="dropup">
                    <a href="#" id="selectColor" data-default="#000" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>color</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="color">
                       
                    </ul>
                </li>
                <li class="dropup">
                    <a href="#" id="selectOrder" data-default="" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>指令</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="commend">
                        
                    </ul>
                </li>
                <li class="dropup">
                    <a href="#" id="selectObject" data-default="" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>对象</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li data-default=""><a href="#">对象</a></li>
                        <li class="divider"></li>
                        <li data-default=""><a href="#">123</a></li>
                        <li data-default=""><a href="#">223</a></li>
                        <li data-default=""><a href="#">323</a></li>
                    </ul>
                </li>
                <li>
                    <label for="scroll" class="checkbox">
                        <input type="checkbox" checked="checked" value="scroll" id="scroll">
                        滚屏选我选我
                    </label>
                </li>
                <li>
                    <span class="help-inline">04:00</span>
                </li>
            </ul>
            <!--input-->
            <form action="" class="form-horizontal">
                <div class="control-group">
                    <label for="" class="control-label">I say:</label>
                    <div class="controls">
                        <div class="row-fluid">
                            <div class="span10"><input type="text" class="span12" id="inputText"></div>
                            <div class="span2">
                                <a href="#" class="btn medium btn-primary">send</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>





