package com.gemantic.labs.killer.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

	import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.service.RecordService;

	

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

@Controller
public class LabsKillerController {

	private static final Log log = LogFactory.getLog(LabsKillerController.class);
	
	@Autowired
	      private  RecordService recordService;
		
	
			@RequestMapping(value = "/record/")
		public String getRecord (HttpServletRequest request, HttpServletResponse response,
			ModelMap model, String xss) throws Exception {
		log.info("getRecord :" +xss);
		
		List<Records> record = new ArrayList();		
		model.addAttribute("molds", record);
		return "/record/list";
	}
		

		
	
	
}

