package com.wordpython.dao;

import java.util.List;

import com.wordpython.po.User;
import com.wordpython.po.Users;

public interface LoginDao {
	//查找用户名，密码
	public User selectUser(User user);
	//注册查询
	public User selectByUsername(String username);
	//查询全部用户
	public List<User> selectAllUser(int number);
	//查询部分用户
	public List<Users> selectPartUser(User user);
	//查询用户总数
	public int selectUserCount();
	//添加
	public int insertUser(User user);
	//删除
//	public int deleteByUsername()
}
