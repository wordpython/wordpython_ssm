package com.wordpython.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.wordpython.po.User;
import com.wordpython.po.Users;
import com.wordpython.service.LoginService;


@Controller
public class AllUserController {
	@Autowired
	private LoginService loginService;
	@RequestMapping(value="/allUser",method=RequestMethod.GET)
	public String allUser() {
		return "allUser";
	}
	@RequestMapping(value="/first",method=RequestMethod.POST)
	@ResponseBody
	public List<Users> first(@RequestBody User user) {
		List<Users> userList=loginService.selectPartUser(user);
		System.out.println(userList);
		return userList;
	}
	@RequestMapping(value="/userCount",method=RequestMethod.POST)
	@ResponseBody
	public int userCount() {
		System.out.println("11aaaaaaaaaa");
		int count=loginService.selectUserCount();
		System.out.println(count);
		return count;
	}
	
}
