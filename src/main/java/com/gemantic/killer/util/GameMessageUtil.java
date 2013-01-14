package com.gemantic.killer.util;

import com.gemantic.killer.model.GameMessage;

public class GameMessageUtil {

	
	/**
	 * 
	 * 
	 * @param action
	 * @param content
	 * @return 
	 */
	public static GameMessage parse(String action, String content) {
		String[] actions = action.split(",");

		Long object = new Long(actions[0]);
		int predict = new Integer(actions[1]);
		Long subject = new Long(actions[2]);
		String color = actions[3];
		int expression = new Integer(actions[4]);
		Long where = new Long(actions[5]);
		GameMessage gm = new GameMessage(object, predict, subject, content, color, expression, where);
		return gm;
	}

	public static GameMessage createNight(Long rid) {
		Long object = new Long(GameMessage.Role_System);
		int predict = new Integer(GameMessage.Predict_Night);
		Long subject = new Long(GameMessage.Role_All);
		Long where = rid;
		GameMessage gm = new GameMessage(object, predict, subject, "晚上了,赶紧把脖子缩起来.", where);
		
		return gm;
	}

	public static GameMessage createLastWords(Long rid) {
		Long object = new Long(GameMessage.Role_System);
		int predict = new Integer(GameMessage.Predict_Night);
		Long subject = new Long(GameMessage.Role_All);
		Long where = rid;
		GameMessage gm = new GameMessage(object, predict, subject, "你挂了.说两句.", where);
		gm.setTime(System.currentTimeMillis() + 1 * 60 * 1000);
		return gm;
	}

	public static GameMessage createDay(Long rid) {
		Long object = new Long(GameMessage.Role_System);
		int predict = new Integer(GameMessage.Predict_Night);
		Long subject = new Long(GameMessage.Role_All);
		Long where = rid;
		GameMessage gm = new GameMessage(object, predict, subject, "又是一个白天,没睡醒的快睁眼.", where);
		gm.setTime(System.currentTimeMillis() + 4 * 60 * 1000);

		return gm;
	}
	public static void main(String[] args) {
		
		GameMessage gm=GameMessageUtil.parse("4322870776601975808,4,5,5,5,5,", "");
		System.out.print(gm);
		
	}
}
