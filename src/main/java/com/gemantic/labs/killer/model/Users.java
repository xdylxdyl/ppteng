package com.gemantic.labs.killer.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

@Entity
@Table(name = "users")
public class Users implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6945044222622832640L;

	private Long id;

	private String name;

	private String password;

	private String email;

	private String punch;

	private Integer score;

	private String icon;

	private String expression;

	private String music;

	private Integer money;

	private Long loginAt;

	private Long punchAt;

	private String openID;

	private Long updateAt;

	private Long createAt;

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

	@Column(name = "expression")
	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	@Column(name = "music")
	public String getMusic() {
		return music;
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

	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}

}
