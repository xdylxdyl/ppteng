package com.gemantic.analyse.tag.controller;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gemantic.analyse.tag.model.TStock;
import com.gemantic.analyse.tag.model.Tag;
import com.gemantic.analyse.tag.model.TagUserStock;
import com.gemantic.analyse.tag.service.TStockService;
import com.gemantic.analyse.tag.service.TagService;
import com.gemantic.analyse.tag.service.TagUserStockService;
import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.killer.exception.ServiceErrorCode;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class TagController {
	private static final Log log = LogFactory.getLog(TagController.class);

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private TagService tagService;

	@Autowired
	private TagUserStockService tagUserStockService;

	@Autowired
	private TStockService tstockService;

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/tag/add")
	public String createQuestion(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			@RequestParam String name, @RequestParam String symbol) throws Exception {
		log.debug("start get room list ");

		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {

			return "redirect:/";
		}
		Tag tag = null;
		Long tid = this.tagService.getIDByName(name);
		if (tid == null) {
			// 看看是否是新的Tag
			tag = new Tag(name);
			tid = this.tagService.add(tag);
		} else {

		}
		TagUserStock tagUserStock = new TagUserStock(uid, tid, symbol);
		tagUserStockService.insert(tagUserStock);
		model.addAttribute("code", 0);
		return "/tag/operate/show";
	}

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/tag/remove")
	public String removeTag(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			@RequestParam String name, @RequestParam String symbol) throws Exception {
		log.debug("start get room list ");

		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {

			return "redirect:/";
		}
		Tag tag = null;
		Long tid = this.tagService.getIDByName(name);
		if (tid == null) {

		} else {

		}
		Long tripleid = this.tagUserStockService.getTagUserStockIdBySymbolAndTagIdAndUserId(symbol, tid, uid);
		if (tripleid != null) {
			this.tagUserStockService.delete(tripleid);
		}
		model.addAttribute("code", 0);
		return "/tag/operate/show";
	}

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/tag/update")
	public String removeTag(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			@RequestParam Long tid, @RequestParam String name) throws Exception {
		log.debug("start get room list ");

		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {

			return "redirect:/";
		}
		Tag tag = this.tagService.getTagByID(tid);
		if (tag == null) {

			model.addAttribute("code", ServiceErrorCode.Tag_Not_Exist);
		} else {
			tag.setName(name);
			this.tagService.update(tag);
			model.addAttribute("code", 0);
		}

		return "/tag/operate/show";
	}

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/stock/list")
	public String getStockList(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			Long[] tids) throws Exception {
		log.debug("start get room list ");

		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {

			return "redirect:/";
		}
		
		Map<Long,List<String>> tid_symbols=new HashMap();
		List<String> symbols=new ArrayList();
		Map<String, TStock> symbol_stocks=new HashMap();
		if(tids==null){
			//只在获取全部数据的时候去拿Name?还是任意一个Tag的请求我都去拿呢.感觉获取全部的Stock列表和获取单个Tag的列表放在一起不合适啊
		
			
			List<TStock> tstocks=this.tstockService.getAll();
			log.info("get all stock "+tstocks.size());
			Field symbolField = TStock.class.getDeclaredField("symbol");	
			symbols=MyListUtil.getList(symbolField, tstocks);
			symbol_stocks = MyListUtil.convert2Map(symbolField, tstocks);
			tid_symbols.put(-1L, symbols);
			
		}else{
			Set<String> set=new HashSet();
			for(Long tid:tids){
				
				List<Long> tripleIds = this.tagUserStockService.getTagUserStockIdsByTagId(tid, 0, Integer.MAX_VALUE);
				List<TagUserStock> triples = this.tagUserStockService.getObjectsByIds(tripleIds);				
				Field field = TagUserStock.class.getDeclaredField("symbol");
				List ls=MyListUtil.getList(field, triples);			
				set.addAll(ls);
				tid_symbols.put(tid, ls);
				log.info(tid+" get symbols "+ls.size());
			}
			symbols=new ArrayList(set);
			log.info(" all tag symbols size "+symbols.size());
		}
		model.addAttribute("tagMap", tid_symbols);	
		model.addAttribute("symbolMap", symbol_stocks);	
		// stock 怎么办
		return "/tag/stock/list";
	}
	
	
	
	

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/stock/detail")
	public String getStockDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			String[] symbols) throws Exception {
		log.debug("start get room list ");

		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {

			return "redirect:/";
		}
		
		List<String> results=new ArrayList();
		List<TStock> tstocks=this.tstockService.getAll();
		Field symbolField = TStock.class.getDeclaredField("symbol");
		Map<String, TStock> symbol_stocks = MyListUtil.convert2Map(symbolField, tstocks);		
		log.info("get all stock "+tstocks.size());	
		
		if(symbols==null||symbols.length==0){
			//只在获取全部数据的时候去拿Name?还是任意一个Tag的请求我都去拿呢.感觉获取全部的Stock列表和获取单个Tag的列表放在一起不合适啊			
			results=MyListUtil.getList(symbolField, tstocks);
			
		}else{
			
			results=Arrays.asList(symbols);
			
		}
		model.addAttribute("symbols", results);	
		model.addAttribute("symbolMap", symbol_stocks);	
		// stock 怎么办
		return "/stock/get/detail";
	}
	

	

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/tag/list")
	public String getTagList(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			String symbol,String format) throws Exception {
		log.debug("start get room list ");

		if(StringUtils.isBlank(format)){
			//默认Jsp
			format="jsp";
		}else{
			
			
		}
		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {
			return "redirect:/";
		}
		List<Long> tripleIds = null;
		List<TagUserStock> triples = null;
		if (StringUtils.isBlank(symbol)) {
			tripleIds = this.tagUserStockService.getTagUserStockIdsByUserId(uid, 0, Integer.MAX_VALUE);

		} else {
			tripleIds = this.tagUserStockService.getTagUserStockIdsBySymbolAndUserId(symbol, uid, 0, Integer.MAX_VALUE);

		}
		triples = this.tagUserStockService.getObjectsByIds(tripleIds);
		Field field = TagUserStock.class.getDeclaredField("tagId");
		List<Long> ids = MyListUtil.getDistinctList(field, triples);
		List<Tag> tags = this.tagService.getTags(ids);
		model.addAttribute("tags", tags);
		model.addAttribute("symbol", symbol);
		
		if("json".equals(format)){
			return "/tag/tag/list_json";
		}else{
			return "/tag/tag/list";
		}
		
		
	}

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/tag/index")
	public String index(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer page,
			Integer size, Long tagID) throws Exception {
		log.info("tag index " + page + " size " + size);
		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {
			return "redirect:/";
		}
		if (page == null) {
			page = 1;
		}
		if (size == null) {
			size = 10;
		}

		if (tagID == null) {
			log.info(" not id ,get default data ");
			String name = "自";
			tagID = this.tagService.getIDByName(name);
			log.info(" default " + tagID);

		} else {
			// 取默认的自选股.默认的自选股的标记不可删除?

		}
		List<TStock> tstocks = null;

		if (tagID == null) {
			tstocks = new ArrayList();
			log.info(tagID + " no data");
		} else {
			List<Long> stockIDS = this.tagUserStockService.getTagUserStockIdsByTagIdAndUserId(tagID, uid, page, size);
			List<TagUserStock> triples = this.tagUserStockService.getObjectsByIds(stockIDS);
			Field field = TagUserStock.class.getDeclaredField("symbol");
			List<String> symbols = MyListUtil.getList(field, triples);
			tstocks = this.tstockService.getTags(symbols);
			log.info("get all size " + tstocks.size());
		}

		model.addAttribute("stocks", tstocks);

		return "/tag/index/composite";
	}
	
	

}
