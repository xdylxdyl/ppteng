package com.gemantic.killer.exception;
import org.springframework.beans.factory.annotation.Required;


/**
 * 服务端异常帮助.
 * 用于将服务端异常的编号转换成前端呈现的描述信息.
 * @author huwei
 */
public class ServiceExceptionHelper {

    private static final String UNKNOW_ERROR = "-1";
    private ReloadableConfig reloadableConfig;

    /**
     * 设置配置文件.
     * @param reloadableConfig 配置文件
     */
    @Required
    public void setReloadableConfig(ReloadableConfig reloadableConfig) {
        this.reloadableConfig = reloadableConfig;
    }

    /**
     * 获取信息.
     * @param serviceErrorCode 服务端错误代码
     * @return 前端所要显示的错误信息
     */
    public String getViewMessage(int serviceErrorCode, String message) {
        if (serviceErrorCode == -1) {
            if (message != null) {
                return message;
            } else {
                return reloadableConfig.get("-1");
            }
        } else {
            return reloadableConfig.get(String.valueOf(serviceErrorCode));
        }
    }

    /**
     * 获取信息.
     * @param serviceErrorCode 服务端错误代码
     * @return 前端所要显示的错误信息
     */
    public String getViewMessage(int serviceErrorCode) {
        return reloadableConfig.get(String.valueOf(serviceErrorCode));
    }

    /**
     * 获取信息.
     * @param serviceErrorCode 服务端错误代码
     * @return 前端所要显示的错误信息
     */
    public String getViewMessage(int serviceErrorCode, Object... args) {
        String message = this.reloadableConfig.get(String.valueOf(serviceErrorCode));
        if (args == null)
            return message;
        for (int i = 0; i < args.length; i++) {
            message = message.replace("{" + i + "}", args[i].toString());
        }
        return message;
    }
}
