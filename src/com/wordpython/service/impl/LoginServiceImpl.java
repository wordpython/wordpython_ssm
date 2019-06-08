package com.wordpython.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.wordpython.dao.LoginDao;
import com.wordpython.po.User;
import com.wordpython.po.Users;
import com.wordpython.service.LoginService;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginDao loginDao;
	
	public User selectUser(User user) {
		return this.loginDao.selectUser(user);
	}

	public int insertUser(User user) {
		return this.loginDao.insertUser(user);
	}

	@Override
	public User selectByUsername(String username) {
		return this.loginDao.selectByUsername(username);
	}

	@Override
	public List<User> selectAllUser(int number) {
		return null;
	}

	@Override
	public List<Users> selectPartUser(User user) {
		return this.loginDao.selectPartUser(user);
	}

	@Override
	public int selectUserCount() {
		return this.loginDao.selectUserCount();
	}

}
