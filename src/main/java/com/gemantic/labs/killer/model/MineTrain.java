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
@Table(name = "mine_train")
public class MineTrain implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5086616141622580224L;

	private Long id;

	private Integer rowCount;

	private Integer columnCount;

	private Integer mineCount;
	
	private String systemContent;

	private String content;

	private Long updateAt;

	private Long createAt;

	public MineTrain(Integer rowCount, Integer columnCount, Integer mineCount,String content,String systemContent ) {
		
		this.rowCount=rowCount;
		this.columnCount=columnCount;
		this.mineCount=mineCount;
		this.content=content;
		this.systemContent=systemContent;
	}

	public MineTrain() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "row_count")
	public Integer getRowCount() {
		return rowCount;
	}

	public void setRowCount(Integer rowCount) {
		this.rowCount = rowCount;
	}

	@Column(name = "column_count")
	public Integer getColumnCount() {
		return columnCount;
	}

	public void setColumnCount(Integer columnCount) {
		this.columnCount = columnCount;
	}

	@Column(name = "mine_count")
	public Integer getMineCount() {
		return mineCount;
	}

	public void setMineCount(Integer mineCount) {
		this.mineCount = mineCount;
	}

	@Column(name = "content")
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	
	
	@Column(name = "system_content")
	public String getSystemContent() {
		return systemContent;
	}

	public void setSystemContent(String systemContent) {
		this.systemContent = systemContent;
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
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.MULTI_LINE_STYLE);
	}

}
