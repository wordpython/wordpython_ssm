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
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public String toLogin() {
		return "login";
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(User user,Model model,HttpSession session) {
		System.out.println(user);
//		int rows=loginService.selectUser(user);
		loginService.selectUser(user);
		if(loginService.selectUser(user)!=null) {
			session.setAttribute("USER_SESSION", user);
			return "redirect:success.html";
		}
		model.addAttribute("msg","用户名或密码错误,请重新输入");
		return "login";
	}
	
	@RequestMapping(value="/success")
	public String toMain() {
		return "success";
	}
}
