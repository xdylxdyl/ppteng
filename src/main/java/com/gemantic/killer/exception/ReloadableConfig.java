package com.gemantic.killer.exception;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.ResourceUtils;

import com.gemantic.killer.util.PropertiesUtils;

/**
 * 
 * 可重新加载的配置.
 * 
 * @author huwei
 * 
 */
public class ReloadableConfig implements FactoryBean, InitializingBean {
	private static final Log LOG = LogFactory.getLog(ReloadableConfig.class);

	private String location;

	public void setLocation(String location) {
		this.location = location;
	}

	private Map<String, String> map = null;

	/**
	 * 返回为字符串类型.
	 * 
	 * @param key
	 *            键值
	 * @return 返回结果
	 */
	public String get(String key) {
		return this.map.get(key);
	}

	/**
	 * 返回为int类型.
	 * 
	 * @param key
	 *            键值
	 * @return 返回结果
	 */
	public int getInt(String key) {
		String value = this.map.get(key);
		return Integer.parseInt(value);
	}

	/**
	 * 保存键值名称对.
	 * 
	 * @param key
	 *            key
	 * @param value
	 *            名称
	 * @return 返回key
	 */
	public String put(String key, String value) {
		return this.map.put(key, value);
	}

	/**
	 * 重新加载.
	 * 
	 * @return 加载成功返回true
	 * @throws IOException
	 */
	public boolean reload() throws IOException {
		return this.load();
	}

	/**
	 * 删除key
	 * 
	 * @param key
	 *            删除key
	 * @return 返回
	 */
	public String remove(String key) {
		return this.map.remove(key);
	}

	public boolean save() {
		return saveToFile();
	}

	/**
	 * 将map中的数据保存到文件中.
	 * 
	 * @return true表示保存成功
	 */
	private synchronized boolean saveToFile() {
		boolean ret = false;
		Properties properties = new Properties();
		properties.putAll(this.map);
		FileOutputStream out = null;
		try {
			out = new FileOutputStream(ResourceUtils.getFile(this.location));
			properties.store(out, "Saved at " + new java.util.Date());
			ret = true;
		} catch (Exception e) {
			if (LOG.isErrorEnabled()) {
				LOG.error("Save to " + this.location + " fail.", e);
			}
		} finally {
			try {
				out.close();
			} catch (IOException e) {
			}
		}
		return ret;
	}

	/**
	 * 从配置文件path指定的路径中加载数据.
	 * 
	 * @return 读取成功
	 * @throws IOException
	 */
	private synchronized boolean load() throws IOException {
    	
		Properties properties = null; 
    	InputStream is = null; 
    	
    	 Map<String, String> m=new HashMap();
    	
    	

    	
     
        try {
        	is = getClass().getResourceAsStream(this.location); 
        	properties = PropertiesUtils.readUtf8Properties(is); 
           
            Set pset = properties.entrySet();
            Iterator ir = pset.iterator();
            for (Map.Entry entry : properties.entrySet()) {
                Map.Entry<String, String> ety = (Map.Entry<String, String>)entry; 
                m.put(ety.getKey(), ety.getValue());
            }
            this.map = m;
            return true;
        } catch (Throwable te) {
            if (LOG.isErrorEnabled()) {
                LOG.error("Load properties from " + this.location, te);
            }
        } finally {
            if (is != null) {
                try {
                	is.close();
                } catch (Exception e) {
                }
            }
        }
        return false;
    }

	@Override
	public Object getObject() throws Exception {
		return this;
	}

	@Override
	public Class getObjectType() {
		return ReloadableConfig.class;
	}

	@Override
	public boolean isSingleton() {
		return true;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		this.load();
	}

}
