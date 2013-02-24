package com.gemantic.killer.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.gemantic.killer.util.UserUtil;

@Entity
@Table(name = "users")
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
	private Integer score = 0;

	/**
	 * 钱
	 */
	private Integer money = 0;

	/**
	 * 打卡
	 */
	private String punch = "";

	/**
	 * 上次打卡时间
	 */
	private Long punchAt;

	/**
	 * 成就
	 * 
	 * @return
	 */
	private List<String> achievement = new ArrayList();

	/**
	 * 荣誉
	 * 
	 * @return
	 */

	private Map<String, Integer> honour = new HashMap();

	/**
	 * 头像
	 */
	private String icon = "/r/img/person/default-person-icon.jpg";
	/**
	 * 自定义表情
	 */
	private List<String> expression = new ArrayList();

	private String expressionContent;
	
	
	private Map<String,List<String>> stageShowList;
	
	private String stageShow;
	
	
	

	/**
	 * 签名
	 * 
	 * @return
	 */
	private String sign = "么有签名么有签名真心么有签名";

	/**
	 * musice
	 */
	private String music = "";

	private String openID;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "punch")
	public String getPunch() {
		return punch;
	}

	public void setPunch(String punch) {
		this.punch = punch;
	}

	@Column(name = "score")
	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	@Column(name = "icon")
	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@Column(name = "music")
	public String getMusic() {
		return music;
	}

	@Column(name = "expression")
	public String getExpressionContent() {
		return expressionContent;
	}

	public void setExpressionContent(String expressionContent) {
		this.expressionContent = expressionContent;
	}

	public void setMusic(String music) {
		this.music = music;
	}

	@Column(name = "money")
	public Integer getMoney() {
		return money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	@Column(name = "login_at")
	public Long getLoginAt() {
		return loginAt;
	}

	public void setLoginAt(Long loginAt) {
		this.loginAt = loginAt;
	}

	@Column(name = "punch_at")
	public Long getPunchAt() {
		return punchAt;
	}

	public void setPunchAt(Long punchAt) {
		this.punchAt = punchAt;
	}

	@Column(name = "open_id")
	public String getOpenID() {
		return openID;
	}

	public void setOpenID(String openID) {
		this.openID = openID;
	}

	@Column(name = "update_at")
	public Long getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Long updateAt) {
		this.updateAt = updateAt;
	}

	@Column(name = "create_at")
	public Long getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Long createAt) {
		this.createAt = createAt;
	}

	@Transient
	public List<String> getAchievement() {
		return achievement;
	}

	public void setAchievement(List<String> achievement) {
		this.achievement = achievement;
	}

	@Transient
	public Map<String, Integer> getHonour() {
		return honour;
	}

	public void setHonour(Map<String, Integer> honour) {
		this.honour = honour;
	}

	@Transient
	public List<String> getExpression() {

		if (this.expression == null) {
			this.expression = UserUtil.json2Expression(this.expressionContent);
		}

		return expression;
	}

	public void setExpression(List<String> expression) {
		this.expression = expression;
		this.expressionContent = UserUtil.expression2Json(expression);
	}
	
	
	
	
	@Transient
	public Map<String, List<String>> getStageShowList() {
		
		if (this.stageShowList == null) {
			this.stageShowList = UserUtil.json2StageShow(this.stageShow);
		}

		return stageShowList;
	}

	public void setStageShowList(Map<String, List<String>> stageShowList) {
		this.stageShowList = stageShowList;
		this.stageShow = UserUtil.stageShow2Json(stageShowList);
	}
	
	
	
	
	@Column(name = "stage_show")	
	public String getStageShow() {
		return stageShow;
	}

	public void setStageShow(String stageShow) {
		this.stageShow = stageShow;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}

}
