<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>





<!--footer-->
<div class="foot">
    <div class="row-fluid">
        <div class="inner-space">
            <!--act-->
            <ul class="toolbar">
                <li class="dropup">
                    <a href="#" id="select_expression" data-default="" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>神态</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="expression">                        
                    </ul>
                </li>
                <li class="dropup">
                    <a href="#" id="select_color" data-default="#000" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>color</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="color">
                       
                    </ul>
                </li>
                <li class="dropup">
                    <a href="#" id="select_command" data-default="" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>指令</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="command">
                        
                    </ul>
                </li>
                <li class="dropup">
                    <a href="#" id="select_object" data-default="" class="btn dropdown-toggle btn-small" data-toggle="dropdown">
                        &nbsp;
                        <span>对象</span>
                        &nbsp;
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" id="object">
                     
                    </ul>
                </li>
                <li>
                    <label for="scroll" class="checkbox">
                        <input type="checkbox" checked="checked" value="scroll" id="scroll">
                        滚屏
                    </label>
                </li>
                <li>
                    <span class="help-inline" id="countDown">04:00</span>
                </li>
                 <li class="pull-right">
                    <button class="btn btn-info" id="readyButton">准备</button>
                </li>
                 <li class="pull-right">
                    <button class="btn btn-info" id="startButton">开始游戏</button>
                </li>
                 <li class="pull-right">
                    <button class="btn btn-info" id="recordButton">播放战例</button>
                </li>
                <li class="pull-right">
                    <span class="help-inline" id="netSpeedHint">延迟：0 毫秒</span>
                </li>
            </ul>
            <!--input-->
            <form action="" class="form-horizontal">
                <div class="control-group">
                    <label for="" class="control-label">说:</label>
                    <div class="controls">
                        <div class="row-fluid">
                            <div class="span10"><input type="text" class="span12" id="sayInput"></div>
                            <div class="span2">
                                <a href="#" class="btn medium btn-primary" id="sayButton">发送</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>





