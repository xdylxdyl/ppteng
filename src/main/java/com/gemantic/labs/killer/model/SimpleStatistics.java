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
@Table(name = "simple_statistics")
public class SimpleStatistics implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2287371999502748672L;

	private Long id;

	private Integer win=0;

	private Integer lose=0;

	private Integer all=0;
	
	
	private Integer waterWin=0;

	private Integer waterLose=0;

	private Integer water=0;
	
	private Integer killer=0;
	
	private Integer killerWin=0;

	private Integer killerLose=0;
	
	

	private Long updateAt;

	private Long createAt;

	public SimpleStatistics(Long id) {
		this.id=id;
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
