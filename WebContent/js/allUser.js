/**
 * 显示所有用户
 */
var nowData;//当前请求的用户信息量
var allData;//用户信息总量
var sendN=1;//记录当前点击的页数，用于按钮颜色设置
var totalPage;//记录总页数
var firstNumberPlace;//当前请求的数的第一个位置
//入口函数
$(function(){
	//获取总页数
	$.ajax({
	url:"./userCount.html",
	type:"POST",
	dataType:"json",
	success:function(data){
		if(data!=null){}
		showPage(data);
		allData=data;//记录总量
		if (data%10!=0) {// 203%10=3
			totalPage=data/10-data%10/10+1;//记录总页数20.3-0.3+1=21
		}else{
			totalPage=data/10-data%10;//记录总页数20-0=2
		}
	}
	});
	usesMessage(0,50);//初始化时，默认请求50个数据
	$(".input2").click(function(){//跳转页面按钮事件
		var number=$(".input1").val();
		//判断是否为合法数字
		
		page(number);
		$(".input1").val("");
	});
});

//获取一定的用户信息,start=数据起始位置，rows=行数
function usesMessage(start,rows){
	firstNumberPlace=start;
	$.ajax({
		url:"./first.html",
		type:"POST",
		data:JSON.stringify({start:start,rows:rows}),
		contentType:"application/json;charset=UTF-8",
		dataType:"json",
		success:function(data){//为什么6，11，16页请求成功却不进来？不是不进来，有进来，因为请求需要一定时间，所以会先执行后面的代码再执行这里
			if(data!=null){
				addUsers(data,sendN);//默认展示第一页
				nowData=data;
			}
		}
	});
}
//添加页数
function showPage(data){
	var list=[];
	list.push("<tr>");
	list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
	if(data<=10){
		list.push("<td class="+"page "+"id="+"page1"+">");
		list.push(1);
		list.push("</td>");
	}
	if(10<data&&data<=40){
		for(var i=1;i<=5;i++){
			list.push("<td class="+"page "+"id="+"page"+i+">");
			list.push(i);
			list.push("</td>");
		}
	}
	if(data>40){//1,2,3,4,5,6,7,8,9,10,,,,
		for(var i=1;i<=5;i++){
			list.push("<td class="+"page "+"id="+"page"+i+">");
			list.push(i);
			list.push("</td>");
		}
	}
	list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
	$("#tbody").append(list.join(""));
	//设置默认第一页为选中状态
	$("#page1").css("background-color","yellow");
	pageAction();
}
//给页码添加事件
function pageAction(){
	//显示首页数据
	$("#firstPage").click(function(){
		theFirstPageAction();
	});
	//显示尾页数据
	$("#lastPage").click(function(){
		theLastPageAction();
	});
	//显示第n页数据
	$(".page").click(function(){
		page($(this).html());
	});
	//显示上一页
	$("#nest").click(function(){
		nestPage();
	});
	//显示下一页
	$("#last").click(function(){
		lastPage();
	});
}
//点击首页添加页码
function theFirstPageAction(){
	if(sendN==1){
		alert("已是第一页");
	}else{
		clearPage();
		if(totalPage>5){
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=1;i<=5;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		else{
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=1;i<=totalPage;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		page(1);//添加数据
		pageAction();
	}
}
//尾页处理方法
function theLastPageAction(){
	if(sendN==totalPage){
		alert("已是最后一页");
	}else{
		clearPage();
		if(totalPage>5){
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=totalPage-4;i<=totalPage;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		else{
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=1;i<=totalPage;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		page(totalPage);
		pageAction();
	}
}

//根据当前点击的页数或点击了“下一页”，来展示页码
function lastPage(){
	if(sendN<totalPage){
		//先清空原来页码的节点
		clearPage();
		var nowPage=parseInt(sendN)+1;//当前页码
		//如果页码对应位置的数据还没加载，则先加载
		var iii=0;//防止addUsers方法 执行两次
		if(nowPage*10>(firstNumberPlace+50)){
			sendN=nowPage;
			usesMessage(firstNumberPlace+50,50);//这里要改，总数不够50的话呢！！！！
			iii=1
		}
		if(totalPage-nowPage>=2 && nowPage>2){//以nowPage为中间页码展开
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=nowPage-2;i<nowPage+3;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		else if(totalPage>5){
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=1;i<=5;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		else{
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=1;i<=totalPage;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		if(iii==0){
			page(nowPage);//显示数据和相应颜色
		}
		pageAction();//添加事件
	}else{
		alert("已经是最后一页");
	}
}
//上一页
function nestPage(){
	if(sendN==1){
		alert("已是第一页");
	}else{
		clearPage();
		var nowPage=parseInt(sendN)-1;//当前页码
		//如果页码对应位置的数据还没加载，则先加载
//		alert("nowPage="+nowPage+" ;firstNumberPlace="+firstNumberPlace)
		if(nowPage*10<=firstNumberPlace){
			usesMessage(firstNumberPlace-50,50);//这里要改，总数不够50的话呢！！！！
		}
		if(totalPage-nowPage>=2 && nowPage>2){//以nowPage为中间页码展开
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=nowPage-2;i<nowPage+3;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		else if(totalPage>5){
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			if(sendN==totalPage){
				for(var i=totalPage-4;i<=totalPage;i++){
					list.push("<td class="+"page "+"id="+"page"+i+">");
					list.push(i);
					list.push("</td>");
				}
			}else{
				for(var i=1;i<=5;i++){
					list.push("<td class="+"page "+"id="+"page"+i+">");
					list.push(i);
					list.push("</td>");
				}
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		else{
			var list=[];
			list.push("<tr>");
			list.push("<td id="+"firstPage"+">首页</td><td id="+"nest"+">上一页</td>");
			for(var i=1;i<=totalPage;i++){
				list.push("<td class="+"page "+"id="+"page"+i+">");
				list.push(i);
				list.push("</td>");
			}
			list.push("<td id="+"last"+">下一页</td><td id="+"lastPage"+">尾页</td></tr>");
			$("#tbody").append(list.join(""));
		}
		page(nowPage);
		pageAction();
	}
}

//删除原来页码的节点
function clearPage(){
	var father=document.getElementById("tbody");
	var size=father.children.length;
	father.removeChild(father.children[0]);
	$("#tbody").empty();
}

//显示第n页数据
function page(n){
	//数据为加载先加载
	var nowPage=n;//当前页码
	//如果页码对应位置的数据还没加载，则先加载
	var iii=0;//防止addUsers方法 执行两次
	if(n==1){
		$("#page"+sendN).css("background-color","#fff");//清除上一次点击的按钮的颜色
		sendN=nowPage;
		usesMessage(0,50);//这里要改，总数不够50的话呢！！！！
		iii=1
	}
	else if(n==totalPage){
		$("#page"+sendN).css("background-color","#fff");//清除上一次点击的按钮的颜色
		sendN=totalPage;
		if(allData%10!=0){
			usesMessage(allData-allData%10,allData%10);//这里要改，总数不够50的话呢！！！！
		}else{
			usesMessage(allData-10, 10);
		}
		iii=1
	}
	else if(nowPage*10<=firstNumberPlace){
		$("#page"+sendN).css("background-color","#fff");//清除上一次点击的按钮的颜色
		sendN=nowPage;
		usesMessage(firstNumberPlace-50,50);//这里要改，总数不够50的话呢！！！！
		iii=1
	}
	else if(nowPage*10>(firstNumberPlace+50)){
		$("#page"+sendN).css("background-color","#fff");//清除上一次点击的按钮的颜色
		sendN=nowPage;
		usesMessage(firstNumberPlace+50,50);//这里要改，总数不够50的话呢！！！！
		iii=1
	}
	
	//先清空原来数据的节点
	clear();
	//设置页面按钮颜色
	$("#page"+sendN).css("background-color","#fff");//清除上一次点击的按钮的颜色
	$("#page"+n).css("background-color","yellow");
	if(iii==0){
		//显示第n页的数据
		addUsers(nowData,n);
	}
}

//添加数据之前先清空节点
function clear(){
//	方法一：原生js
//	var father=document.getElementById("kbtable_tbody");
//	var size=father.children.length;
//	for(var i=size-1;i>0;i--){
//		father.removeChild(father.children[i]);
//	}
	//方法二.
	$(".tbody_tr").empty();
}

//添加用户信息
function addUsers(data,n){
	//设置页面按钮颜色
	$("#page"+n).css("background-color","yellow");
	clear();
	sendN=n;//记录当前点击的页数
	var list=[];
	var t;//当前数据页展示的数据数
	//如果不是尾页，直接展示10条数据，尾页的话展示余数条
	if(sendN==totalPage && allData%10!=0){
		t=allData%10;//余数
	}else{
		t=10;
	}
//	alert("firstNumberPlace="+firstNumberPlace+" ;n="+n+" ;10*(n-1)-firstNumberPlace="+(10*(n-1)-firstNumberPlace)+" ；(10*(n-1)-firstNumberPlace+t)="+(10*(n-1)-firstNumberPlace+t));
	for(var i=10*(n-1)-firstNumberPlace;i<(10*(n-1)-firstNumberPlace+t);i++){
		list.push("<tr class="+"tbody_tr"+">");
		list.push("<th>");
		list.push(i+firstNumberPlace+1);
		list.push("</th>");
		for(var key in data[i]){
			list.push("<td>");
			list.push(data[i][key]);
			list.push("</td>");
		}
		list.push("<td><button>修改</button>&nbsp<button>删除</button></td>");
		list.push("</tr>");
	}
	$("#kbtable_tbody").append(list.join(""));//将list转换为字符串
}
