<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#ffffff">
<link href="/static/img/common/favicon.ico" rel="shrtcut icon">
<link href="/static/img/common/favicon.png" rel="apple-touch-icon-precomposed">

<!-- 개발에서 아래코드 삭제 -->
<%@ page import="java.util.*" %>
<%
Date now = new Date();
String yy = Integer.toString( now.getYear()+1900 ) ;
String mm = Integer.toString( now.getMonth()+1 ) ;
String dd = Integer.toString( now.getDate() ) ;
String hh = Integer.toString( now.getHours() ) ;
String nn = Integer.toString( now.getMinutes() ) ;
String ss = Integer.toString( now.getSeconds() ) ;
String version =  yy  +"-"+ mm +"-"+ dd +"-"+ hh +"-"+ nn +"-"+ ss ;
%>
<link rel="stylesheet" href="/static/css/jquery-ui.css?v=<%=version%>">
<link rel="stylesheet" href="/static/css/swiper.css?v=<%=version%>">
<link rel="stylesheet" href="/static/css/reset.css?v=<%=version%>">
<link rel="stylesheet" href="/static/css/common.css?v=<%=version%>">

<script src="/static/js/jquery-3.4.1.js"></script>
<!-- <script src="/static/js/jquery-2.2.4.js"></script> -->
<script src="/static/js/jquery-ui.js"></script>
<script src="/static/js/jquery.ui.touch-punch.js"></script>


	