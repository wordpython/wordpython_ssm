package com.wordpython.service;

import java.util.List;

import com.wordpython.po.User;
import com.wordpython.po.Users;

public interface LoginService {
	//查找用户名，密码
	public User selectUser(User user);
	//查询全部用户
	public List<User> selectAllUser(int number);
	//查询部分用户
	public List<Users> selectPartUser(User user);
	//查询用户总数
	public int selectUserCount();
	//注册
	public User selectByUsername(String username);
	//添加
	public int insertUser(User user);
}
