package com.example.demo.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

/**
 * 接收前台参数转换为date类型
 * 
 * @author Sn
 * 
 */
public class DateConvert implements Converter<String, Date> {

	@Override
	public Date convert(String arg0) {
		Date d = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			d = sdf.parse(arg0);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return d;
	}
}
