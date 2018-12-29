package com.example.demo.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.example.demo.dao.PaymentsDAO;
import com.example.demo.entity.Pagination;
import com.example.demo.entity.Payments;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentsService {

	@Resource
	PaymentsDAO payments;
	
	public Pagination query(Integer page, Integer rows){
		List<Payments> query = payments.query(page,rows);
		Long total = payments.queryCount();
		return new Pagination(total,query);
	}

	public List<Payments> query1(){
		List<Payments> query = payments.query1();
		return query;
	}
	
	public List<Map<String, Object>> querys(){
		List<Map<String, Object>> querys = payments.querys();
		return querys;
	}
}
