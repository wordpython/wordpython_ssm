package com.wordpython.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.wordpython.po.User;
import com.wordpython.service.LoginService;

@Controller
public class RegisterController {
	
	@Autowired
	private LoginService register;
	
	@RequestMapping(value="/register",method=RequestMethod.GET)
	public String toregister() {
		return "register";
	}
	
	@RequestMapping(value="/register",method=RequestMethod.POST)
	public String register(User user,HttpSession session,Model model) {
		try {
			if(register.selectByUsername(user.getUsername())==null) {
				int rows=register.insertUser(user);
				if(rows>0) {
					System.out.println("注册成功");
					return "redirect:login.html";
				}
			}
		} catch (Exception e) {
			System.out.println("添加用户出错");
		}
		model.addAttribute("msg","用户已存在");
		return "register";
	}
}
