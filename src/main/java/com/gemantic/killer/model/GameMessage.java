package com.gemantic.killer.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class GameMessage implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 911644443569357385L;

	public static final Long Role_System = -100L;

	public static final Long Role_All = -500L;

	public static final int Predict_Say = 1;

	public static final int Predict_Kill = 2;

	public static final int Predict_Vote = 3;

	/**
	 * 开始游戏
	 */
	public static final int Predict_Start = 4;

	/**
	 * 游戏结束
	 */
	public static final int Predict_Over = 5;

	/**
	 * 准备游戏
	 */
	public static final int Predict_Ready = 6;

	/**
	 * 进入房间
	 */
	public static final int Predict_Login = 7;

	/**
	 * 离开房间
	 */
	public static final int Predict_Logout = 8;
	

	/**
	 * 白天
	 */
	public static final int Predict_Day = 9;

	/**
	 * 晚上
	 */
	public static final int Predict_Night = 10;

	/**
	 * lastwordTime
	 */
	public static final int Predict_LastWords = 11;
	
	
	/**
	 * 死亡
	 */
	public static final int Predict_Die= 12;
	
	
	
	private Long object=GameMessage.Role_System;
	private int predict=GameMessage.Predict_Say;
	private Long subject=GameMessage.Role_All;
	private String content="";
	private Long time;
	private String color="#000000";
	private int expression=0;
	private Long where;
	
	private List<Long> accepts=new ArrayList();
	
	
	
	
	
	public GameMessage(Long object, int predict, Long subject, String content, String color, int expression,Long where) {
		this.object=object;
		this.predict=predict;
		this.subject=subject;
		this.content=content;
		this.color=color;
		this.expression=expression;
		this.where=where;
		this.time=System.currentTimeMillis();
	}







	public GameMessage(Long object, int predict, Long subject, String content,Long where) {
		this.object=object;
		this.predict=predict;
		this.subject=subject;
		this.content=content;		
		this.where=where;
		this.time=System.currentTimeMillis();
	}







	public Long getObject() {
		return object;
	}







	public void setObject(Long object) {
		this.object = object;
	}







	public int getPredict() {
		return predict;
	}







	public void setPredict(int predict) {
		this.predict = predict;
	}







	public Long getSubject() {
		return subject;
	}







	public void setSubject(Long subject) {
		this.subject = subject;
	}







	public String getContent() {
		return content;
	}







	public void setContent(String content) {
		this.content = content;
	}







	public Long getTime() {
		return time;
	}







	public void setTime(Long time) {
		this.time = time;
	}





	
	





	public String getColor() {
		return color;
	}







	public void setColor(String color) {
		this.color = color;
	}







	public int getExpression() {
		return expression;
	}







	public void setExpression(int expression) {
		this.expression = expression;
	}
	
	
	







	public Long getWhere() {
		return where;
	}







	public void setWhere(Long where) {
		this.where = where;
	}







	public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
	
	
	







	public List<Long> getAccepts() {
		return accepts;
	}







	public void setAccepts(List<Long> accepts) {
		this.accepts = accepts;
	}







	public String toAction() {
		StringBuffer sb=new StringBuffer();
		sb.append(this.object);
		sb.append(",");
		sb.append(this.predict);
		sb.append(",");
		sb.append(this.subject);
		sb.append(",");
		sb.append(this.color);
		sb.append(",");
		sb.append(this.expression);
		sb.append(",");
		sb.append(this.where);
		sb.append(",");
		sb.append(this.content);
		return sb.toString();
	}
}
