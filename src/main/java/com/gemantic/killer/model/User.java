package com.gemantic.killer.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 617547135594699203L;

	private Long id;

	private String name;

	private String password;

	private String email;

	private Long updateAt;

	private Long createAt;
	
	private Long loginAt;

	/**
	 * 积分
	 */
	private Integer score=0;

	/**
	 * 钱
	 */
	private Integer money=0;

	/**
	 * 打卡
	 */
	private String punch="";
	
	/**
	 * 上次打卡时间
	 */
	private Long punchAt;

	/**
	 * 成就
	 * @return
	 */
	private List<String> achievement=new ArrayList();
	
	/**
	 * 荣誉
	 * @return
	 */
	
	private Map<String,Integer> honour=new HashMap();
	
	/**
	 * 头像
	 */
	private String icon="";
	/**
	 * 自定义表情
	 */
	private List<String> expression=new ArrayList();
	
	/**
	 * 签名
	 * @return
	 */
	private String sign="";
	
	/**
	 * musice
	 */
	private String music="";

	

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Long updateAt) {
		this.updateAt = updateAt;
	}

	public Long getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Long createAt) {
		this.createAt = createAt;
	}
	
	
	
	
	

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	public String getPunch() {
		return punch;
	}

	public void setPunch(String punch) {
		this.punch = punch;
	}

	public List<String> getAchievement() {
		return achievement;
	}

	public void setAchievement(List<String> achievement) {
		this.achievement = achievement;
	}

	public Map<String, Integer> getHonour() {
		return honour;
	}

	public void setHonour(Map<String, Integer> honour) {
		this.honour = honour;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public List<String> getExpression() {
		return expression;
	}

	public void setExpression(List<String> expression) {
		this.expression = expression;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}
	
	
	

	public Long getPunchAt() {
		return punchAt;
	}

	public void setPunchAt(Long punchAt) {
		this.punchAt = punchAt;
	}
	
	
	


	public Long getLoginAt() {
		return loginAt;
	}

	public void setLoginAt(Long loginAt) {
		this.loginAt = loginAt;
	}
	
	
	

	public String getMusic() {
		return music;
	}

	public void setMusic(String music) {
		this.music = music;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}

}
