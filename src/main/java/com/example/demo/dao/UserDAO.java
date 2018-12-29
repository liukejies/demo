package com.example.demo.dao;

import com.example.demo.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;



@Mapper
public interface UserDAO {

	@Select("select * from user where uname=#{param1} and pwd=#{param2}")
	User queryfind(String uname, String pwd);
}
