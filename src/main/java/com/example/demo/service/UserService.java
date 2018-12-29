package com.example.demo.service;

import javax.annotation.Resource;

import com.example.demo.dao.UserDAO;
import com.example.demo.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

	
	@Resource
	UserDAO userdao;
	
	public User queryfind(String uname,String pwd){
		User queryfind = userdao.queryfind(uname, pwd);
		return queryfind;
	}
}
