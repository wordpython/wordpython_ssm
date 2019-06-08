<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>所有用户</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/allUser.css">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/allUser.js"></script>
</head>
<body>
<div id="body">
	<div class="title">
		<h2>用户管理</h2>
	</div>
	<div id="find">
		<a href="#">新建</a>
		账号：<input type="text">
		用户名：<input type="text">
		<button>查询</button>
	</div>
	<div id="div_table">
		<table id="kbtable" border="1" width="100%" cellspacing="0" cellpadding="0" class="Nsb_r_list Nsb_table">
			<tbody id="kbtable_tbody">
				<tr class="tbody_th">
					<th width="123" height="28" align="center">编号</th>
					<th width="123" height="28" align="center">账号</th>
					<th width="123" height="28" align="center">用户名</th>
					<th width="123" height="28" align="center">密码</th>
					<th width="123" height="28" align="center">手机</th>
					<th width="124" height="28" align="center">操作</th>
				</tr> 
			</tbody>
		</table>
		<br>
		<table id="kbtable1" border="1" cellspacing="0" cellpadding="0" class="Nsb_r_list Nsb_table">
			<tbody id="tbody">
				<!-- <tr>
					<td id="firstPage">首页</td>
					<td>上一页</td>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>下一页</td>
					<td>尾页</td>
				</tr>  -->
			</tbody>
		</table>
	</div>
	<div id="div_input">
		跳转到: <input class="input1" type="text">
		<input class="input2" type="button" value="确定">
	</div>
</div>
</body>
</html>