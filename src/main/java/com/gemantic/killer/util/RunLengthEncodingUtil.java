package com.gemantic.killer.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RunLengthEncodingUtil {

	public static String encode(String source) {
		StringBuffer dest = new StringBuffer();
		int counter = -1;
		for (int i = 0; i < source.length() - 1; i++) {
			if (source.charAt(i) != source.charAt(i + 1)) {
				dest.append(i - counter);
				dest.append(source.charAt(i));
				counter = i;
			}
		}
		dest.append(source.length() - counter - 1);
		dest.append(source.charAt(source.length() - 1));
		return dest.toString();
	}

	public static String decode(String source) {
		StringBuffer dest = new StringBuffer();
		Pattern pattern = Pattern.compile("[0-9]+|[PN]");
		Matcher matcher = pattern.matcher(source);

		while (matcher.find()) {
			int number = Integer.parseInt(matcher.group());
			matcher.find();
			while (number-- != 0) {
				dest.append(matcher.group());
			}
		}
		return dest.toString();
	}

	public static List<String> decode2List(String source) {
		List<String> dest = new ArrayList();
		Pattern pattern = Pattern.compile("[0-9]+|[PN]");
		Matcher matcher = pattern.matcher(source);

		while (matcher.find()) {
			int number = Integer.parseInt(matcher.group());
			matcher.find();
			while (number-- != 0) {
				dest.add(matcher.group());
			}
		}
		return dest;
	}
	
	
	
	public static String decode(String source,String p) {
		StringBuffer dest = new StringBuffer();
		Pattern pattern = Pattern.compile(p);
		Matcher matcher = pattern.matcher(source);

		while (matcher.find()) {
			int number = Integer.parseInt(matcher.group());
			matcher.find();
			while (number-- != 0) {
				dest.append(matcher.group());
			}
		}
		return dest.toString();
	}

	public static List<String> decode2List(String source,String p) {
		List<String> dest = new ArrayList();
		Pattern pattern = Pattern.compile(p);
		Matcher matcher = pattern.matcher(source);

		while (matcher.find()) {
			int number = Integer.parseInt(matcher.group());
			matcher.find();
			while (number-- != 0) {
				dest.add(matcher.group());
			}
		}
		return dest;
	}
	
	public static void main(String[] args) {
             RunLengthEncodingUtil RLE = new RunLengthEncodingUtil();
             String example = "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW";
             System.out.println(RLE.encode(example));
             System.out.println(RLE.decode("2W1B1W1B1W3B1W1B1W1B1W1B1W1B","[0-9]+|[WB]"));
	}
}