package com.example.demo.entity;

import java.io.Serializable;
import java.util.Date;

import com.example.demo.util.DateSerializable;
import org.springframework.format.annotation.DateTimeFormat;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 *
 * payments 实体类
 * @author sn 
 * @version V0.01 
 *
 */

public class Payments implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer customerNumber;
	private String checkNumber;
	
	// date转成字符串,后台返回前台数据
	@JsonSerialize(using = DateSerializable.class)
	// 前台传递一个字符串,后台接收日期类型
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date paymentDate;
	private Long amount;

	public void setCustomerNumber(Integer customerNumber) {
		this.customerNumber = customerNumber;
	}

	public Integer getCustomerNumber(){
		return customerNumber;
	}

	public void setCheckNumber(String checkNumber) {
		this.checkNumber = checkNumber;
	}

	public String getCheckNumber(){
		return checkNumber;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Date getPaymentDate(){
		return paymentDate;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public Long getAmount(){
		return amount;
	}

	@Override
	public String toString() {
		return "Payments [customerNumber=" + customerNumber + ", checkNumber="
				+ checkNumber + ", paymentDate=" + paymentDate + ", amount="
				+ amount + "]";
	}
	    
}

