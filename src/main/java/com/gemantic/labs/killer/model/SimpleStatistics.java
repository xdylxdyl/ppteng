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
import org.apache.commons.lang3.StringUtils;

import com.gemantic.killer.util.RoleUtil;

@Entity
@Table(name = "simple_statistics")
public class SimpleStatistics implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2287371999502748672L;

	private Long id;

	private Integer win = 0;

	private Integer lose = 0;

	private Integer all = 0;

	private Integer waterWin = 0;

	private Integer waterLose = 0;

	private Integer water = 0;

	private Integer killer = 0;

	private Integer killerWin = 0;

	private Integer killerLose = 0;

	private Integer third = 0;

	private Integer killerThirdWin = 0;

	private Integer thirdWin = 0;

	private Integer waterThirdWin = 0;

	private Integer waterThird = 0;

	private Integer killerThird = 0;
	
	private Integer maxWater=0;
	
	private Integer maxKiller=0;
	
	private String role="";
	
    private String unZipRole="";
	
	private Long updateAt;

	private Long createAt;

	public SimpleStatistics(Long id) {
		this.id = id;
	}

	public SimpleStatistics() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@Column(name = "id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "win")
	public Integer getWin() {
		return win;
	}

	public void setWin(Integer win) {
		this.win = win;
	}

	@Column(name = "lose")
	public Integer getLose() {
		return lose;
	}

	public void setLose(Integer lose) {
		this.lose = lose;
	}

	@Column(name = "all_count")
	public Integer getAll() {
		return all;
	}

	public void setAll(Integer all) {
		this.all = all;
	}

	@Column(name = "water_win")
	public Integer getWaterWin() {
		return waterWin;
	}

	public void setWaterWin(Integer waterWin) {
		this.waterWin = waterWin;
	}

	@Column(name = "water_lose")
	public Integer getWaterLose() {
		return waterLose;
	}

	public void setWaterLose(Integer waterLose) {
		this.waterLose = waterLose;
	}

	@Column(name = "water")
	public Integer getWater() {
		return water;
	}

	public void setWater(Integer water) {
		this.water = water;
	}

	@Column(name = "killer")
	public Integer getKiller() {
		return killer;
	}

	public void setKiller(Integer killer) {
		this.killer = killer;
	}

	@Column(name = "killer_win")
	public Integer getKillerWin() {
		return killerWin;
	}

	public void setKillerWin(Integer killerWin) {
		this.killerWin = killerWin;
	}

	@Column(name = "killer_lose")
	public Integer getKillerLose() {
		return killerLose;
	}

	public void setKillerLose(Integer killerLose) {
		this.killerLose = killerLose;
	}

	@Column(name = "third")
	public Integer getThird() {
		return third;
	}

	public void setThird(Integer third) {
		this.third = third;
	}

	@Column(name = "killer_third_win")
	public Integer getKillerThirdWin() {
		return killerThirdWin;
	}

	public void setKillerThirdWin(Integer killerThirdWin) {
		this.killerThirdWin = killerThirdWin;
	}

	@Column(name = "third_win")
	public Integer getThirdWin() {
		return thirdWin;
	}

	public void setThirdWin(Integer thirdWin) {
		this.thirdWin = thirdWin;
	}

	@Column(name = "water_third_win")
	public Integer getWaterThirdWin() {
		return waterThirdWin;
	}

	public void setWaterThirdWin(Integer waterThirdWin) {
		this.waterThirdWin = waterThirdWin;
	}

	@Column(name = "water_third")
	public Integer getWaterThird() {
		return waterThird;
	}

	public void setWaterThird(Integer waterThird) {
		this.waterThird = waterThird;
	}

	@Column(name = "killer_third")
	public Integer getKillerThird() {
		return killerThird;
	}

	public void setKillerThird(Integer killerThird) {
		this.killerThird = killerThird;
	}
	
	
	
	
	@Column(name = "max_water")
	public Integer getMaxWater() {
		return maxWater;
	}

	public void setMaxWater(Integer maxWater) {
		this.maxWater = maxWater;
	}
	
	
	
	
	@Column(name = "max_killer")
	public Integer getMaxKiller() {
		return maxKiller;
	}

	public void setMaxKiller(Integer maxKiller) {
		this.maxKiller = maxKiller;
	}

	@Column(name = "role")
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
	
	
	
	

	@Transient
	public String getUnZipRole() {
		if(StringUtils.isBlank(unZipRole)){
			if(StringUtils.isBlank(role)){
				
			}else{
				return RoleUtil.decodeRole(role);
			}
		}
		return unZipRole;
	}

	public void setUnZipRole(String unZipRole) {
		this.unZipRole = unZipRole;
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
