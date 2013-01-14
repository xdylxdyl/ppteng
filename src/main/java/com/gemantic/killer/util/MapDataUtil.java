package com.gemantic.killer.util;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Ｍａｐ 中数据的工具类 *
 * 
 */

public class MapDataUtil {
	private static final Log log = LogFactory.getLog(MapDataUtil.class);
	public static Integer Type_Set = 1;

	/**
	 * 追加数据到Map中对应的Key的Value(Set)中去
	 * 
	 * @param map
	 *            操作的Map
	 * @param key
	 * @param data
	 * 
	 */
	public static void superAdditionValue(Map map, Object key, Integer keyType,
			Object data) {

		switch (keyType) {
		case 1:
			Set values = (Set) map.get(key);
			if (values == null) {
				values = new HashSet<Long>();
			}

			values.add(data);
			map.put(key, values);
			break;
		default:
			values = (Set) map.get(key);
		}

	}

	/**
	 * 通过多个Key获取Map中的批量Value
	 * 
	 * @param map
	 *            操作的Map
	 * @param key
	 * @param data
	 * 
	 */
	public static void getListValue(Map<?, ?> map, List<?> keys, List result) {

		if (keys == null) {
			Set kerSet = map.keySet();
			for (Object key : kerSet) {
				Object value = map.get(key);
				result.add(value);
			}

		} else {
			for (Object key : keys) {
				Object value = map.get(key);
				result.add(value);
			}

		}

	}

	public static void main(String[] args) {
		log.debug("adssssssssssss");
		System.out.print("asdfasdfasdf");
		log.debug("adssssssssssss");

	}

	/**
	 * 删除数据到Map中对应的Key的Value(Set)中去
	 * 
	 * @param map
	 *            操作的Map
	 * @param key
	 * @param data
	 * 
	 */
	public static void superSubtractValue(Map map, Object key, Integer keyType,	Object data) {
		switch (keyType) {
		case 1:
			Set values = (Set) map.get(key);
			if (values == null) {
				return ;
			}else{
				values.remove(data);
			}
			break;

		default:
			 values = (Set) map.get(key);
			if (values == null) {
				return ;
			}else{
				values.remove(data);
			}
		}
	}

	

}
