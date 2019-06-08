<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>登录页面</title>
</head>
<body>
${msg}
<form action="${pageContext.request.contextPath }/login.html" method="post">
	用户名：<input type="text" name="username">
	密码:<input type="password" name="password">
	<input type="submit" value="登录">
</form>
<a href="${pageContext.request.contextPath }/register.html">注册</a>
</body>
</html>