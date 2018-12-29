package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import com.example.demo.entity.Payments;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;




@Mapper
public interface PaymentsDAO {
	
	
	@Select("select * from payments limit #{param1},#{param2}")
	List<Payments> query(Integer page, Integer rows);

	@Select("select * from payments")
	List<Payments> query1();
	
	@Select("select * from payments")
	List<Map<String, Object>> querys();
	
	@Select("select count(*) from payments")
	Long queryCount();
}
