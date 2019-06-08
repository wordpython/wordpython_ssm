<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>注册</title>
</head>
<body>
${msg}
<form action="${pageContext.request.contextPath }/register.html" method="post">
	账号：<input type="text" name="account">
	用户名：<input type="text" name="username">
	密码:<input type="password" name="password">
	电话：<input type="password" name="phone">
	<input type="submit" value="登录">
</form>
<a href="${pageContext.request.contextPath }/login.html">登录</a>
</body>
</html>