package com.wordpython.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception arg3)
			throws Exception {
		System.out.println("........afterCompletion");
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView arg3)
			throws Exception {
		System.out.println("........postHandle");
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//		String url = request.getRequestURI();
//		if(url.indexOf("/login")>=0||url.indexOf("/register")>=0) {
//			return true;
//		}
//		HttpSession session=request.getSession();
//		User user=(User)session.getAttribute("USER_SESSION");
//		if(user!=null) {
//			return true;
//		}
//		request.setAttribute("msg", "您还没登录，请先登录");
//		request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
//		return false;
		return true;
	}

}
