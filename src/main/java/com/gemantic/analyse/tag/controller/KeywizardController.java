package com.gemantic.analyse.tag.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.analyse.convert.service.AnalyseConvertService;
import com.gemantic.analyse.tag.model.KeyBoard;
import com.gemantic.analyse.tag.service.AnalyseKeywizardService;
import com.gemantic.common.util.StringUtil;

@Controller
public class KeywizardController {

	private static final Log log = LogFactory.getLog(KeywizardController.class);

	@Autowired
	@Qualifier("keywizardServiceCompositeImpl")
	private AnalyseKeywizardService analyseKeywizardService;

	// 政策主题、发布机构、言论主题搜索提示 prompt/list
	//怎么处理混杂逻辑呢．输入Tag的时候要查询每一个用户自己的Tag,怎么处理这种情况,不可能为事先加载所有用户的数据.完全在JS里实现呢.那就需要提供一个获取这个用户所有Tag的接口
	@RequestMapping(value = "/prompt/list")
	public String getSearchPrompt(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			String query, Integer count, String type, String jsoncallback) throws Exception {

		log.info("get search prompt : " + type + " : " + query + "  " + count);
		List<KeyBoard> prompt_key = new ArrayList<KeyBoard>();
		prompt_key=this.analyseKeywizardService.getKeyBoard(query, count, type);
		model.addAttribute("prompts", prompt_key);
		return "/keywizard/composite/show";

	}

	private String getKeyboardDisplayName(KeyBoard kb) {
		String name = "";

		if (null == kb)
			return name;

		name = kb.getName();
		if (null == kb.getAttributes() || kb.getAttributes().get("code") == null
				|| kb.getAttributes().get("fullName") == null)

			return name;

		String code = (String) kb.getAttributes().get("code");
		if (StringUtil.isEmpty(code) || code.toLowerCase().startsWith("t")) {
			name = (String) kb.getAttributes().get("fullName");
		}

		if (StringUtil.isNotEmpty(code) && !code.toLowerCase().startsWith("t")) {
			name = code + " " + name;
		}

		return name;
	}
}
