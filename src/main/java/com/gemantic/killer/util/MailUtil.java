package com.gemantic.killer.util;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailUtil {
	private static final Log log = LogFactory.getLog(MailUtil.class);
	
	public static void send(JavaMailSender sender,String email,String content) throws MessagingException {

		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
		MimeMessage mailMessage = senderImpl.createMimeMessage();
		// 设置utf-8或GBK编码，否则邮件会有乱码
		MimeMessageHelper messageHelper = new MimeMessageHelper(mailMessage, true, "utf-8");
		try {
			messageHelper.setTo(email);// 接受者
			messageHelper.setFrom("pttgame@163.com");// 发送者
			messageHelper.setSubject("葡萄藤轻游戏密码找回");// 主题		
			messageHelper.setText(content);
			
			sender.send(mailMessage);
			log.info(email +" send success "+content);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
