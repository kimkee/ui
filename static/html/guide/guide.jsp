<!doctype html>
<html lang="ko">
<head>
<%@ include file="../inc/meta.jsp" %>

<link href="../guide/shCore.css" rel="stylesheet">
<script src="../guide/shCore.js"></script>

</head>
<body class="body">
<div class="wrap" id="wrap">
	
		
	<%@ include file="../inc/head.jsp" %>
	
	<!-- 컨텐츠 시작 -->
	<div class="contain ui" id="contain">

		<main class="contents" id="contents">
			
		
			<h2 class="hdt">UI Guide KimKeeHyun</h2>

			<section class="dromDownSample">
				
				<div class="uiDropDown" data-ui="val" id="kkk">
					<div class="list">
						<ul>
							<li><button type="button" value="1">선택메뉴1선택메뉴1선택메뉴1</button></li>
							<li><button type="button" value="2">선택메뉴2</button></li>
							<li><button type="button" value="3">선택메뉴3</button></li>
							<li><button type="button" value="4">선택메뉴4</button></li>
							<li><button type="button" value="5">선택메뉴5</button></li>
							<li><button type="button" value="6">선택메뉴6</button></li>
							<li><button type="button" value="7">선택메뉴7</button></li>
							<li><button type="button" value="8">선택메뉴8</button></li>
							<li><button type="button" value="9">선택메뉴9</button></li>
						</ul>
					</div>
				</div>



				<div class="uiDropDown sm" data-ui="val">
					<div class="list">
						<ul>
							<li><button type="button" value="1">남</button></li>
							<li class="active"><button type="button" value="2">여</button></li>
						</ul>
					</div>
				</div>
				<div class="uiDropDown" data-ui="val">
					<div class="list">
						<ul>
							<li><button type="button" value="1">02</button></li>
							<li><button type="button" value="2">1</button></li>
						</ul>
					</div>
				</div>
			
				<div class="uiDropDown disabled" data-ui="val">
					<div class="list">
						<ul>
							<li><button type="button" value="1">선택메뉴1</button></li>
							<li><button type="button" value="2">선택메뉴2</button></li>
							<li><button type="button" value="3">선택메뉴3</button></li>
						</ul>
					</div>
				</div>

				<div class="uiDropDown" data-ui="val">
					<div class="list">
						<ul>
							<li><button type="button" value="1">선택메뉴1</button></li>
							<li><button type="button" value="2">선택메뉴2</button></li>
							<li><button type="button" value="3">선택메뉴3</button></li>
							<li><button type="button" value="4">선택메뉴444444444444444444</button></li>
						</ul>
					</div>
				</div>


				<div class="uiDropDown noWidth" data-ui="val">
					<div class="list">
						<ul>
							<li><button type="button" value="1">선택메뉴1</button></li>
							<li><button type="button" value="2">선택메뉴2222222</button></li>
							<li><button type="button" value="3">선택메뉴3333333333333</button></li>
							<li><button type="button" value="4">선택메뉴444444444444444444</button></li>
						</ul>
					</div>
				</div>

				<div class="uiDropDown" data-ui="link-sel" id="aaa">
					<div class="list">
						<ul>
							<li><a href="/html/">네이버</a></li>
							<li class="active"><a href="/html/">다음</a></li>
							<li><a href="/html/">구글</a></li>
						</ul>
					</div>
				</div>

				<div class="uiDropDown" data-ui="link">
					<a class="bt" href="javascript:;">링크</a>
					<div class="list">
						<ul>
							<li><a href="javascript:;">네이버eeeeeeeeee</a></li>
							<li><a href="javascript:;">다음</a></li>
							<li><a href="javascript:;">구글</a></li>
						</ul>
					</div>
				</div>

			</section>
			
			<div class="device">
				<h3>User Agent</h3>
				<div id="userAgent"></div>
				<div id="cssStatus"></div>
				<div id="browserStatus"></div>
			</div>
			<div id="barH"></div>
			<p class="gap"></p>
			
			<p class="gap"></p>
			<a href="javascript:;" class="btn xs">버튼</a>
			<a href="javascript:;" class="btn sm">버튼</a>
			<a href="javascript:;" class="btn md">버튼</a>
			<a href="javascript:;" class="btn lg">버튼</a>
			<a href="javascript:;" class="btn xl">버튼</a>
			<a href="javascript:;" class="btn" disabled>버튼</a>
			<button type="button" class="btn" disabled>버튼</button>
			<p class="gap"></p>
			<a href="javascript:;" class="btn type a">버튼</a>
			<a href="javascript:;" class="btn type b">버튼</a>
			<a href="javascript:;" class="btn type c">버튼</a>
			<a href="javascript:;" class="btn type d">버튼</a>
			<a href="javascript:;" class="btn type e">버튼</a>

			<p class="gap"></p>
			<div class="btnSet">
				<a href="javascript:;" class="btn">버튼</a>
			</div>
			<p class="gap"></p>
			<div class="btnSet">
				<a href="javascript:;" class="btn">버튼</a>
				<a href="javascript:;" class="btn">버튼</a>
			</div>
			<p class="gap"></p>
			<div class="btnSet fit">
				<a href="javascript:;" class="btn type a">버튼</a>
				<a href="javascript:;" class="btn type d">버튼</a>
			</div>

			<div class="codeBox">
				<div class="code">
					<pre class="brush: html">
						<a href="javascript:;" class="btn xs">버튼</a>
						<a href="javascript:;" class="btn sm">버튼</a>
						<a href="javascript:;" class="btn md">버튼</a>
						<a href="javascript:;" class="btn lg">버튼</a>
						<a href="javascript:;" class="btn xl">버튼</a>
						<a href="javascript:;" class="btn" disabled>버튼</a>
						<button class="btn" disabled>버튼</button></pre>
				</div>
			</div>
			

			<p class="gap"></p>

			<%@ include file="../inc/paging.jsp" %>


			<section class="codeBox"> 
				<div class="code">
					<div class="bts">
						<a class="btn" href="javascript:samplePop1();">팝레이어1</a>
						<a class="btn" href="javascript:ui.popLayer.open('popSample2');">팝레이어2</a>
					</div>
					<pre class="brush: js">
						ui.popLayer.open('popSample1'); // 팝레이어열기
						ui.popLayer.close('popSample1'); // 팝레이어닫기
						ui.popLayer.refresh('popSample1'); // 팝스크롤새로고침</pre>
				</div>	
			</section>
			<script>
				$(document).ready(function(){
					
					samplePop1 = function(){
						// 레이어팝업 열기 콜백
						ui.popLayer.open('popSample1',{
							ocb:function(){
								console.log("popSample1 열림");
							},
							ccb:function(){
								console.log("popSample1 닫힘");
							}						
						});
					}

				});
			</script>

			<section class="codeBox">
				<div class="code">
					<div class="bts">
						<a class="btn" href="javascript:alert_sample();">알럿</a>
						<a class="btn" href="javascript:confirm_sample();">컨펌</a>
					</div>
					<pre class="brush: js">
					ui.alert({  // 알럿창 띄우기
						msg:'<p>알럿 메시지<br> 입니다.</p>' ,
						ycb:function(){
							console.log('알럿확인결과');
						},
						ybt:'확인'	
					});	

					ui.confirm({ // 컨펌 창 띄우기
						msg:'<p>공통 컨펌창 샘플  <br><u>kimkee@naver.com</u> 님은</p>' +
							'<p>이미 <b>네이버</b> 인증을 통해 회원<br> 가입되었습니다.</p>'+
							'<p>(회원가입 : 2017-08-08)</p>',
						ycb:function(){
							console.log('컨펌확인결과');
						},
						ncb:function(){
							console.log('컨펌취소결과');
						},
						ybt:'로그인하기',
						nbt:'닫기'	
					});</pre>
				</div>	
			</section>

			<section class="codeBox">
				<div class="code">
					<div class="bts">
						<a class="btn" href="javascript:toast_sample1();">토스트1</a>
						<a class="btn" href="javascript:toast_sample2();">토스트2</a>
					</div>
					<pre class="brush: js">
						ui.toast({  // 토스트 창띄우기
							msg:'<p>토스트메시지입니다.</p>', // 메시지(HTML)
							cls:'wish', // null, 'wish' , 'cart'
							sec:1500 // 사라질 시간
						});</pre>
				</div>
			</section>
			<script>
			var confirm_sample = function(){
				ui.confirm({ // 컨펌 창 띄우기
					msg:'<p>공통 컨펌창 샘플  <br><u>kimkee@naver.com</u> 님은</p>' +
						'<p>이미 <b>네이버</b> 인증을 통해 회원<br> 가입되었습니다.</p>'+
						'<p>(회원가입 : 2017-08-08)</p>',
					ycb:function(){
						console.log('컨펌확인결과');
					},
					ncb:function(){
						console.log('컨펌취소결과');
					},
					ybt:'로그인하기',
					nbt:'닫기'	
				});
			}
			var alert_sample = function(){
				ui.alert({  // 알럿창 띄우기
					msg:'<p><b>알럿</b> <u>메시지</u><br> 입니다.</p>' ,
					ycb:function(){
						console.log('알럿확인결과');
					},
					ybt:'확인'	
				});
			}
			var toast_sample1 = function(){
				ui.toast({   // 토스트 창띄우기
					msg:'<p>토스트메시지입니다.</p>',
					cls:'type a',
					sec:1500
				});
			}
			var toast_sample2 = function(){
				ui.toast({   // 토스트 창띄우기
					msg:'<p>토222스트메시지입니다.</p>',
					cls:'type b',
					sec:1500,
					bot:50
				});
			}
			</script>
			


			<p class="gap"></p>
			<input type="text" placeholder="텍스트">
			<p class="gap"></p>
			<input type="text" class="valid" placeholder="텍스트">
			<p class="gap"></p>
			<input type="text" class="valid ok" placeholder="텍스트">
			<p class="gap"></p>
			<input type="text" class="valid no" placeholder="텍스트">
			<p class="gap"></p>
			<input type="password" class="valid" placeholder="비밀번호">
			<p class="gap"></p>
			<input type="text" readonly="readonly" value="readonly">
			<p class="gap"></p>
			<input type="text" disabled="disabled" value="disabled">
			<p class="gap"></p>
			<textarea class="textarea" placeholder="내용"></textarea>
			<p class="gap"></p>
			<select class="select">
				<option>선택</option>
			</select>
			<p class="gap"></p>
			<select class="select" disabled="disabled">
				<option>선택</option>
			</select>
			
			<p class="gap"></p>
			<div class="uiSchIpt">
				<input type="search" placeholder="검색어를 입력하세요">
				<button type="button" class="sch"></button>
			</div>

			<section class="codeBox">
				<div class="code">
					<div class="bts">
						<a class="btn" href="javascript:ui.loading.show();">로딩열기</a>
						<a class="btn loadingClose" href="javascript:ui.loading.hide();">로딩닫기</a>
					</div>
					<pre class="brush: js">
						ui.loading.show(); // 로딩열기
						ui.loading.hide(); // 로딩닫기 </pre>
				</div>
			</section>
			<p class="gap"></p><p class="gap"></p><p class="gap"></p><p class="gap"></p>

			<div class="uiSlider" id="slider">
				<div class="ui-slider-handle"><span id="custom-handle"></span></div>
			</div>
			<script>
			$(document).ready(function(){
				var handle = $( "#custom-handle" );
				$( "#slider" ).slider({
					orientation: "horizontal", // "vertical" , "horizontal"
					value:55,
					min: 0,
					max: 100,
					step: 1,
					create: function() {
						handle.text( $( this ).slider( "value" ) + "%");
					},
					slide: function( event, ui ) {
						handle.text( ui.value + "%");
						console.log(ui.value);	
					}
				});
			});
			</script>

			<p class="gap"></p><p class="gap"></p>
			

			<div id="amount"></div>
			<p class="gap"></p>
			<div class="uiSlider" id="slider-range"></div>
			
			<script>
			$(document).ready(function(){
				$( "#slider-range" ).slider({
					range: true,
					min: 0,
					max: 500,
					values: [ 75, 300 ],
					slide: function( event, ui ) {
						$( "#amount" ).text( ui.values[ 0 ] + "원 - " + ui.values[ 1 ] +"원" );
						console.log(ui.values[0] ,ui.values[1]  );	
					}
				});
				$( "#amount" ).text( $( "#slider-range" ).slider( "values", 0 ) + "원 - " + $( "#slider-range" ).slider( "values", 1 )+"원" );				
			});
			</script>

			
			<p class="gap"></p>
			<p class="gap"></p>
			<div class="uiCircle c1" 
				data-value="0.9"
				data-size="100"
				data-fill= "{ 'color': '#000000' }" 
				data-empty-fill="#ddd"
				data-thickness="5"
				data-animation-start-value="0.0" >
				<strong></strong>
			</div>
			<div class="uiCircle c2" 
				data-value="0.45"
				data-size="100"
				data-fill= '{ "color": "#000000" }' 
				data-empty-fill="rgba(0, 0, 0, .5)"
				data-thickness="50"
				data-animation-start-value="0.0" >
				<strong style="color: #ffffff"></strong>
			</div>
			<div class="uiCircle c3" 
				data-value="0.75"
				data-size="100"
				data-arc-coef= "0.7"
				data-start-angle = "1.6"
				data-empty-fill="rgba(0, 0, 0, .5)"
				data-fill = '{"image": "http://i.imgur.com/pT0i89v.png"}'
				data-thickness="20"
				data-animation-start-value="0.0" >
				<strong></strong>
			</div>
			<script>
			$(document).ready(function(){

				$('.uiCircle').circleProgress({
					// value: 0.75,
					// arcCoef: 1.0,
					// startAngle : 1.5 * Math.PI,
					// fill: {"image": "http://i.imgur.com/pT0i89v.png"},
					// fill: {gradient: [['#000', .1], ['#444', .8]], gradientAngle: Math.PI / 4},
				}).on('circle-animation-progress', function(event, progress, stepValue) {
					//$(this).find('strong').text(stepValue.toFixed(2).substr(1));
					$(this).find('strong').html(Math.round(100 * stepValue) + '<i>%</i>');
				}).on('circle-animation-end', function (event, progress) {
					// console.log("완료");
					// $(this).find("canvas").css({"opacity":"0"});
				});
				circleSmaple = function(c){
					if( c == 1 ) {
						$('.uiCircle').circleProgress('value', 0.22);
					}
					if( c == 2 ) {
						$('.uiCircle').circleProgress('value', 0.93);
					}
					if( c == 3 ) {
						$('.uiCircle').circleProgress('redraw');
					}
				}
			});
			</script>
			<a href="javascript:;" class="btn" onclick="circleSmaple(1);">22%</a>
			<a href="javascript:;" class="btn" onclick="circleSmaple(2);">93%</a>
			<a href="javascript:;" class="btn" onclick="circleSmaple(3);">redraw</a>
			<p class="gap"></p>

			<div class="uiSpinner" data-max="5">
				<input class="n" type="number" value="1" disabled="disabled"> <button type="button" class="m">-</button> <button type="button" class="p">+</button>
			</div>

			<div class="uiSpinner" data-max="3">
				<input class="n" type="number" value="1" disabled="disabled"> <button type="button" class="m">-</button> <button type="button" class="p">+</button>
			</div>

			<p class="gap"></p>
			<div class="uiStar" data-star="3.5">
				<ul>
					<li><em class="st">별</em></li>
					<li><em class="st">별</em></li>
					<li><em class="st">별</em></li>
					<li><em class="st">별</em></li>
					<li><em class="st">별</em></li>
				</ul>
				<i class="p">0.0</i>
			</div>
			
			<p class="gap"></p>
			<div class="uiStar">
				<ul>
					<li><button type="button" class="st">별</button></li>
					<li><button type="button" class="st">별</button></li>
					<li><button type="button" class="st">별</button></li>
					<li><button type="button" class="st">별</button></li>
					<li><button type="button" class="st">별</button></li>
				</ul>
				<i class="p">0</i>
			</div>

			<p class="gap"></p>
			<span class="btnAttach">
				<label class="fileButton">파일등록<input type="file" class="fileInput" accept="image/*"></label>
			</span>
			
			<p class="gap"></p>

			<span class="uiAddFile" data-ui="attach">
				<span class="file">
					<input type="text" class="loc" readonly="readonly" value="" placeholder="첨부파일">
					<button type="button" class="delete">삭제</button>
				</span>
				<span class="btnAttach">
					<label class="fileButton">찾기<input type="file" class="fileInput" accept="*/*"></label>
				</span>
				<ul class="file"></ul>
			</span>

			<p class="gap"></p>

			<span class="uiAttach" data-ui="attach" data-max-size="3">
				<span class="btnAttach">
					<label class="fileButton">사진추가<input type="file" class="fileInput" accept="image/*"></label>
				</span>
				<ul class="file"></ul>
			</span>

			
			<p class="gap"></p>
			
			<label class="checkbox"><input type="checkbox"><span>선택</span></label>

			<label class="checkbox"><input type="checkbox" checked="checked"><span></span></label>
			<label class="checkbox"><input type="checkbox" checked="checked" disabled="disabled"><span></span></label>
			<label class="checkbox"><input type="checkbox" disabled="disabled"><span></span></label>

			<label class="radio"><input type="radio" name="radio1"><span>선택</span></label>
			<label class="radio"><input type="radio" name="radio1" checked="checked"><span>선택</span></label>
			<label class="radio"><input type="radio" name="radio2" checked="checked" disabled="disabled"><span>선택</span></label>
			<label class="radio"><input type="radio" name="radio2" disabled="disabled"><span>선택</span></label>

			<p class="gap"></p>
			<label class="checkbox"><input type="checkbox" data-check="all" data-check-id="checkTest1"><span>전체선택</span></label>
			<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택1</span></label>
			<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택2</span></label>
			<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택3</span></label>
			<p class="gap"></p>
			<div class="uiChk"><input type="checkbox" checked="checked"><em></em></div>
			<div class="uiChk"><input type="checkbox" checked="checked" disabled="disabled"><em></em></div>

			<div class="codeBox">
				<div class="code">
					<pre class="brush: html">
						<label class="checkbox"><input type="checkbox" data-check="all" data-check-id="checkTest1"><span>전체선택</span></label>
						<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택1</span></label>
						<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택2</span></label>
						<label class="checkbox"><input type="checkbox" data-check="check" data-check-id="checkTest1"><span>선택3</span></label></pre>
				</div>
			</div>

			<p class="gap"></p>

			<div class="uiDate"><input type="text"  placeholder="YYYY-MM-DD" class="datepicker" readonly="readonly"></div>
			<p class="gap"></p>

			<div class="date">
				<span class="weeks"><span id="START_DT"></span> ~ <span id="END_DT"></span></span>
				<div class="uiDate week"><input type="text" id="schedWeek" value="2019-04-09" placeholder="YYYY-MM-DD" class="datepicker" readonly="readonly"></div>
			</div>
			<p class="gap"></p>
			<style>
			
			
			</style>
			<script>
			$(document).ready(function(){

				// 달력 주간 선택 moment.js
				setWeeklyDateFnc =  function (date){
					var monday, sunday;
					if(moment(date).day() === 0){
						monday = moment(date).day(-6).format("YYYY-MM-DD");
						sunday = moment(date).day(0).format("YYYY-MM-DD");
					}else{
						monday = moment(date).day(1).format("YYYY-MM-DD");
						sunday = moment(date).day(7).format("YYYY-MM-DD");
					}
					// console.log(monday , sunday);
					$("#START_DT").html(monday);
					$("#END_DT").html(sunday);
				}
				var today = $("#schedWeek").val();
				setWeeklyDateFnc(today);

				$("input#schedWeek").datepicker( "option", "onSelect", function(date,els){
					DD = date.replace(/[-]/gi, "");
					setWeeklyDateFnc(DD);
					console.log(els);
				});

				var now = new Date();
				$("input#schedWeek").datepicker( "option", "minDate", new Date(2018, 1 - 1, 1) );
				$("input#schedWeek").datepicker( "option", "maxDate", new Date( now.getFullYear() , now.getMonth() , now.getDate() ) );


			});
			</script>



			<!--
			<p class="gap"></p>
			<div class="btnList">
				<a href="javascript:;" class="btn">가운데</a>
			</div>

			<div class="btnList">
				<div class="fl"><a href="javascript:;" class="btn">왼쪽</a></div>
				<div class="fr"><a href="javascript:;" class="btn">오른쪽</a></div>
			</div>
			-->
			
			<p class="gap"></p>
			
			<ul class="uiTab type a">
				<li class="active"><a href="javascript:;">탭메뉴1</a></li>
				<li><a href="javascript:;">탭메뉴2</a></li>
			</ul>
			
			<p class="gap"></p>

			<ul class="uiTab type a">
				<li class="active"><a href="#tabPanelA1">탭메뉴1</a></li>
				<li class=""><a href="#tabPanelA2">탭메뉴2</a></li>
			</ul>
			<div class="uiTabPan">
				<div class="panel active" id="tabPanelA1">
					<p><a href="javascript:;">탭내용1</a></p>
				</div>
				<div class="panel" id="tabPanelA2">
					<p><a href="javascript:;">탭내용2</a></p>
				</div>
			</div>

			<div class="codeBox">
				<div class="code">
					<pre class="brush: html">
						<ul class="uiTab type b">
							<li class="active"><a href="#tabPanelB1">탭메뉴1</a></li>
							<li><a href="#tabPanelB2">탭메뉴2</a></li>
						</ul>
						<div class="uiTabPan">
							<div class="panel active" id="tabPanelB1">탭내용1</div>
							<div class="panel" id="tabPanelB2">탭내용2</div>
						</div></pre>
				</div>
			</div>


			<p class="gap"></p>
			<a href="#tog_sample2" data-ui-tog="btn" class="btn">토글버튼2</a>
			<div id="tog_sample2" data-ui-tog="ctn">
				<p>토글내용 토글내용</p>
				<p>토글내용 토글내용</p>
			</div>
			<p class="gap"></p>

			<ul class="uiTabs type a">
				<li class="active"><a href="javascript:;" data-ui-tab-btn="tab_ctn_C" data-ui-tab-val="tab_id_C_1">탭메뉴1</a></li>
				<li class=""><a href="javascript:;" data-ui-tab-btn="tab_ctn_C" data-ui-tab-val="tab_id_C_2">탭메뉴2</a></li>
			</ul>
			<div class="panel active" data-ui-tab-ctn="tab_ctn_C" id="tab_id_C_1">
				<p>탭내용1</p>
			</div>
			<div class="panel" data-ui-tab-ctn="tab_ctn_C" id="tab_id_C_2">
				<p>탭내용2</p>
			</div>
			

			<div class="codeBox">
				<div class="code">
					<pre class="brush: html">
						<ul class="uiTabs type a">
							<li class="active"><a href="javascript:;" data-ui-tab-btn="tab_ctn_C" data-ui-tab-val="tab_id_D_1">탭메뉴1</a></li>
							<li class=""><a href="javascript:;" data-ui-tab-btn="tab_ctn_C" data-ui-tab-val="tab_id_D_2">탭메뉴2</a></li>
						</ul>
						<div class="panel active" data-ui-tab-ctn="tab_ctn_C" id="tab_id_D_1">
							<p>탭내용1</p>
						</div>
						<div class="panel" data-ui-tab-ctn="tab_ctn_C" id="tab_id_D_2">
							<p>탭내용2</p>
						</div></pre>
				</div>
			</div>


			<p class="gap"></p>
			<!-- 아코디언형 -->
			<ul class="uiAccd" data-accd="accd">
				<li class="open">
					<div class="hBox"> 아코디언 UI Accd <button type="button" class="btnTog">버튼</button></div>
					<div class="cBox">내용 내용 내용 <br> 내용</div>
				</li>
				<li>
					<div class="hBox"> 아코디언 UI Accd <button type="button" class="btnTog">버튼</button></div>
					<div class="cBox">내용 내용 내용 <br> 내용</div>
				</li>
				<li class="except">
					<div class="hBox"> 아코디언 UI Accd 제외 <button type="button" class="btnTog">버튼</button></div>
					<div class="cBox">내용 내용 내용 <br> 내용</div>
				</li>
			</ul>
			<p class="gap"></p>
			<!-- 토글형 -->
			<ul class="uiAccd" data-accd="tog">
				<li class="open">
					<div class="hBox"> 아코디언 UI Tog <a class="btnTog" href="javascript:;">버튼</a></div>
					<div class="cBox">내용 내용 내용 <br> 내용</div>
				</li>
				<li>
					<div class="hBox"> 아코디언 UI Tog <a class="btnTog" href="javascript:;">버튼</a></div>
					<div class="cBox">내용 내용 내용 <br> 내용</div>
				</li>
				<li class="except">
					<div class="hBox"> 아코디언 UI Tog 제외 <div class="btnTog" href="javascript:;">버튼</div></div>
					<div class="cBox">내용 내용 내용 <br> 내용</div>
				</li>
			</ul>
			<div class="codeBox">
				<div class="code">
					<pre class="brush: html">
						<ul class="uiAccd" data-accd="accd">
							<li class="open">
								<div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
								<div class="cBox">내용</div>
							</li>
							<li>
								<div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
								<div class="cBox">내용</div>
							</li>
							<li class="except">
								<div class="hBox">타이틀 <button type="button" class="btnTog">버튼</button></div>
								<div class="cBox">내용</div>
							</li>
						</ul></pre>
				</div>
			</div>

			
			<p class="gap"></p>
			
			<table class="table type a" cellpadding="0" cellspacing="0">
				<colgroup>
					<col width="20%">
					<col>
				</colgroup>
				<tbody>
					<tr>
						<th>소재</th>
						<td>레이온72% 면28% 배색-면65% 나일론32% 폴리우레탄3%</td>
					</tr>
					<tr>
						<th>색상</th>
						<td>99(BLACK)</td>
					</tr>
					<tr>
						<th>치수</th>
						<td>85(55),90(66)</td>
					</tr>
				</tbody>
			</table>

			<p class="gap"></p>

			<table class="list a" cellspacing="0" cellpadding="0" >
				<colgroup>
					<col>
					<col>
				</colgroup>
				<thead>
					<tr>
						<th scope="col">주소</th>
						<th scope="col">우편번호</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>서울 강남구 신사동 성도빌딩</td>
						<td>15603</td>
					</tr>
					<tr>
						<td>서울 강남구 신사동 성도빌딩</td>
						<td>15603</td>
					</tr>
				</tbody>
			</table>



			<p class="gap"></p>

			<div class="slideSample1">
				<div class="swiper-container">
					<ul class="swiper-wrapper slide">
						<li class="swiper-slide">
							<div class="item">
								<div class="thumb"><a href="javascript:;"><span class="img"><img src="//placeimg.com/720/720/1" alt=""></span></a></div>
							</div>
						</li>
						<li class="swiper-slide">
							<div class="item">
								<div class="thumb"><a href="javascript:;"><span class="img"><img src="//placeimg.com/720/720/2" alt=""></span></a></div>
							</div>
						</li>
					</ul>
					<div class="pagination"></div>
					<div class="navigation">
						<button type="button" class="nav prev">이전</button>
						<button type="button" class="nav next">다음</button>
					</div>
				</div>
			</div>

			<p class="gap"></p>

			<div class="slideSample2">
				<div class="swiper-container">
					<ul class="swiper-wrapper slide">
						<li class="swiper-slide">
							<div class="item">
								<div class="thumb"><a href="javascript:;"><span class="img"><img src="//placeimg.com/720/720/10" alt=""></span></a></div>
								<div class="info">
									<div class="name">뉴욕양키스 액센트 커브조절캡</div>
									<div class="prc"><em class="p">59,000원</em></div>
								</div>
							</div>
						</li>
						<li class="swiper-slide">
							<div class="item">
								<div class="thumb"><a href="javascript:;"><span class="img"><img src="//placeimg.com/720/720/11" alt=""></span></a></div>
								<div class="info">
									<div class="name">뉴욕양키스 액센트 커브조절캡</div>
									<div class="prc"><em class="p">59,000원</em></div>
								</div>
							</div>
						</li>
						<li class="swiper-slide">
							<div class="item">
								<div class="thumb"><a href="javascript:;"><span class="img"><img src="//placeimg.com/720/720/12" alt=""></span></a></div>
								<div class="info">
									<div class="name">뉴욕양키스 액센트 커브조절캡</div>
									<div class="prc"><em class="p">59,000원</em></div>
								</div>
							</div>
						</li>
						<li class="swiper-slide">
							<div class="item">
								<div class="thumb"><a href="javascript:;"><span class="img"><img src="//placeimg.com/720/720/13" alt=""></span></a></div>
								<div class="info">
									<div class="name">액센트 커브조절캡</div>
									<div class="prc"><em class="p">59,000원</em></div>
								</div>
							</div>
						</li>
					</ul>              
				</div>
			</div>

			<script>
			$(document).ready(function(){
				// http://idangero.us/swiper/api/
				// ui.slides.sample1.slide.on('slideChange', function () {
				// 	console.log('cmRecom slideChange');
				// });
			});
			</script>
			<p class="gap"></p>

			<div style="border:#cccccc solid 1px; padding:10px 15px ;">
				<h4>블릿타입A ul.bullet.type.a</h4>	
				<ul class="bullet type a">
					<li>도로명을 입력하세요.  예) 중앙로, 불정로432번길 도로명을 입력하세요.도로명을 입력하세요.  예) 중앙로, 불정로432번길 도로명을 입력하세요.도로명을 입력하세요.  예) 중앙로, 불정로432번길 도로명을 입력하세요.</li>
					<li>동/읍/면/리 이름을 입력하세요.  예) 역삼동, 화도읍, 장유면</li>
				</ul>
				<h4>블릿타입B ul.bullet.type.b</h4>	
				<ul class="bullet type b">
					<li>사진은 2MB 미만의 JPG, PNG, GIF 형식으로 업로드 가능합니다.</li>
					<li>파일명은 영문과 숫자로 작성해 주시기 바랍니다.</li>
				</ul>
			</div>

			<p class="gap"></p>

			<section class="uiTbList">
				<ul class="list" id="dp_list"></ul>
				<div class="uiLoadMore">
					<em></em>
					<button type="button" class="btnLoad" onclick="itemListAdd()" id="btnListMore">불러오기</button>
				</div>
			</section>
			

		</main>
	
	</div>

	<div class="floatNav">
		<button type="button" class="bt refresh">Refresh</button>
		<button type="button" class="bt top">TOP</button>
	</div>

	<!--// 컨텐츠 끝 -->

	<script>
	$(document).ready(function(){
		ui.listMore.init(itemListAdd);

		ui.refresh.init(function(){
			location.reload();
		});
	});

	var page = 0;
	var itemListAdd = function(){
		ui.listLoad.attach(); // 로딩이미지 Show
		$("#btnListMore").prop("disabled",true);
		if( ui.listMore.active ){
			ui.listMore.active = false;
			ui.listMore.using();
			page ++;
			window.setTimeout(function(){
				$.ajax({
					type: "post",
					url: "../inc/list_more.jsp",
					dataType: "html",
					success: function(html) {
						$("#dp_list").append(html).addClass("load");
						$("#btnListMore").prop("disabled",false);
						ui.listLoad.detach();
						ui.listMore.active = true;
						// console.log("페이징 = " + page);
						$("#debug").html("페이징 = " + page );
						if (page >= 5) {
							// console.log("끝");
							ui.listMore.removeEvent();
						}
					},
					error:function(error){
						page --;
						console.log("페이징 = " + page);
						console.log("에러 = " + error.readyState);
						ui.listLoad.error();
						$("#btnListMore").prop("disabled",false);
					}
				});
			},1000);
		}
	};
	</script>

	<%@ include file="../inc/foot.jsp" %>

</div>

<style>
#debug{ position:fixed; left:10px; bottom: 10px;}
</style>
<div id="debug"></div>

<script>
var html = document.documentElement;
function showInfo() {
	$('#cssStatus').html(html.className);
	$('#browserStatus').html('Client Size : ' + html.clientWidth + 'x' + html.clientHeight + ', Orientation : ' + window.orientation);
}
$(function() {
	$('#userAgent').html(navigator.userAgent);
	showInfo();
	$(document.body).on('orientationchange', showInfo);
	$(window).on('orientationchange', showInfo);
	$(window).on('resize', showInfo);
});
</script>

<%@ include file="../inc/bottom.jsp" %>
<%@ include file="../inc/scripts.jsp" %>
</body>
</html>