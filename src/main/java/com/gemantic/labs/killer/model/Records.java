package com.gemantic.labs.killer.model;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.gemantic.killer.model.Room;
import com.gemantic.killer.util.RoomUtil;
import com.gemantic.killer.util.UserUtil;

@Entity
@Table(name = "records")
public class Records implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8366058758984288256L;

	private Long id;

	private String path;

	private String version;

	private Long time;

	private String snapshot;

	private Long updateAt;

	private Long createAt;

	private Room room;
	
	private String names;
	
	private Map<Long,String> uid_names;

	@Id
	@Column(name = "id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "path")
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	@Column(name = "version")
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name = "time")
	public Long getTime() {
		return time;
	}

	public void setTime(Long time) {
		this.time = time;
	}
	
	
	
	
	@Column(name = "names")
	public String getNames() {
		return names;
	}

	public void setNames(String names) {
		this.names = names;
		this.uid_names=UserUtil.json2userMap(this.names);
	}
	
	@Transient
	public Map<Long, String> getUid_names() {
		if (this.uid_names == null) {			
			this.uid_names = UserUtil.json2userMap(this.names);
		}
	
		return uid_names;
	}

	public void setUid_names(Map<Long, String> uid_names) {
		this.uid_names = uid_names;
		this.names=UserUtil.userMap2Json(this.uid_names);
	}

	@Transient
	public Room getRoom() {

		if (this.room == null) {
			this.room = RoomUtil.json2Room(this.snapshot);
		}

		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
		
		this.snapshot = RoomUtil.room2Json(room);
	}

	@Column(name = "snapshot")
	public String getSnapshot() {
		return snapshot;
	}

	public void setSnapshot(String snapshot) {
		this.snapshot = snapshot;
		
		this.room= RoomUtil.json2Room(this.snapshot);
		
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
