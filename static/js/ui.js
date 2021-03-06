﻿//*******************************************//
// 김기현 : kimkee@naver.com    
// url : http://kimkee.github.io/
// update : 2021-04-01
//*******************************************//

var ui = { //
	init:function(){ // 초기구동
		this.cm.init();
		this.skip.init();
		this.gnb.init();
		this.lnb.init();
		this.tree.init();
		this.ly.init();
		this.form.init();
		this.sort.init();
		this.dropmenu.init();
		this.location.init();
		this.accd.init();
		this.tog.init();
		this.tab.init();
		this.tooltips.init();
		this.mcscroll.init();
		// this.dropDown.init();
		this.popLayer.init();
		this.popFrame.init();
		this.popsel.init();
		this.popSelect.init();
		this.popSelMul.init();
		this.popWin.init();
		this.slides.init();
		this.datepick.init();
		this.timepick.init();
		this.daypick.init();
		this.listLoad.init();
		this.getSafe.init();
		this.movePage.init();
		this.elip.init();
	},
	update:function(){ // 페이지 동적으로 뿌린 후 업데이트 ui.update();
		this.popsel.set();
		this.popSelect.set();
		this.popSelMul.set();
		this.datepick.set();
		this.timepick.set();
		this.daypick.set();
		this.form.input.set();
		this.form.intdel.set();
		this.form.commas.set();
		this.form.prcset.set();
		this.form.spinner.set();
		this.form.spined.set();
		this.form.inthgt.set();
		this.accd.set();
		this.tab.set();
		this.tree.set();
		this.skip.set();
		this.elip.set();
	},
	transitionend:"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
	skip:{ // 본문으로 스킵
		init:function() {
			this.set();
			this.evt();
		},
		els:'<div id="skipNav"></div>',
		evt:function(){
			$(document).on("click","#skipNav a[data-href='#gnb']",function(e){
				ui.gnb.using("open");
				$("#gnb").attr("tabindex","-1").focus();
				e.preventDefault();
			});
			$(document).on("click","#skipNav a[data-href='#contain']",function(e){
				$("#contain").attr("tabindex","-1").focus();
				$(window).scrollTop(0);
				e.preventDefault();
			});
		},
		set:function(){
			if(!$("#skipNav").length ) {
				$(".body:not(.ui)").prepend(this.els);
			}
			if( $("#contain").length && !$("#skipNav a[data-href='#contain']").length ) {
				$("#skipNav").append('<a href="javascript:;" data-href="#contain"><span>본문 바로가기</span></a>');
			}
			if( $("nav.gnb").length && !$("#skipNav a[data-href='#gnb']").length ) {
				$("#skipNav").prepend('<a href="javascript:;" data-href="#gnb"><span>메뉴 바로가기</span></a>');
			}
		}
	},
	cm:{ // 공통
		init:function(){
			
		}
	},
	html:{ // Html 인클루드
		incCom:false,
		load:function(paramCallback){
			if (paramCallback) {
				this.loadCallback = paramCallback;
			}
		},
		include:function(){
			var _this = this;
			var $inc_html = $("[data-include-html]");
			var incAmt = 0;
			if ($inc_html.length) {
				$inc_html.each(function(idx){
					var inc = $(this).data("include-html");
					var head_title = $(this).data("ui-title");
					var head_logo = $(this).data("ui-logo");
					var head_alim = $(this).data("ui-alim");
					var head_mems = $(this).data("ui-mems");
					var head_docs = $(this).data("ui-docs");
					var incNums = $inc_html.length ;
					$(this).before('<!-- data-include-html="'+inc+'"-->');
					$(this).load( inc ,function(response, status, xhr){
						// console.log( inc, idx+1 , incNums,  status, xhr);
						$(this).find(">*").unwrap();
						incAmt ++;
						if( status == "success" ){
							console.log(incAmt , inc );
						}else if( status == "error"){
							_this.incCom = false ;
							console.log("include 실패" , inc );
						}
						if( incAmt == incNums ) {
							_this.incCom = true ;
							if ( typeof _this.loadCallback == "function") _this.loadCallback();
						}
	
						if( head_title ){
							// console.log("ttt");
							$(".header .stitle").html(head_title).show();
						}
						// console.log(head_logo);
						if (head_logo == true) {
							$(".header .logo").show();
						}
						// console.log(head_alim);
						if (head_alim == true) {
							$(".header .tmenu>li.alim").show();
						}
						// console.log(head_mems);
						if (head_mems == true) {
							$(".header .tmenu>li.mems").show();
						}
						// console.log(head_docs);
						if (head_docs == true) {
							$(".header .tmenu>li.docs").show();
						}
					});
				});
			}else{
				_this.incCom = true ;
				if ( typeof _this.loadCallback == "function") _this.loadCallback();
			}
			//console.log("완료" + _this.incCom);
		}
	},
	movePage:{ // 스와이프로 이동할 페이지
		init:function(){
			$("#contain").hammer().on("swipeleft swiperight", function(e) {
				// console.log( e.type );
				if (e.type=="swiperight" && ui.movePage.prev) {
					ui.movePage.prev(e.type);
				}
				if (e.type=="swipeleft" && ui.movePage.next ) {
					ui.movePage.next(e.type);
				}
			});
		},
		prev:function(e){
			console.log("<< 이전 페이지 가기 ]] "+e);
		},
		next:function(e){
			console.log("[[ 다음 페이지 가기 >>"+e);
		}
	},
	isUA:function(t){ // 디바이스 구분
		t = t.split(" ");
		for (var i = 0; i < t.length; i++) {
			result = navigator.userAgent.indexOf(t[i]) > -1 ? true : false ;
			if (!result) {
				return result ;
			}
		}
		return result ;
	},
	getSafe:{ // 아이폰X 여백값
		init:function(){
			var _this = this;
			var computed, div = document.createElement('div');
			div.style.padding = 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
			document.body.appendChild(div);
			computed = getComputedStyle(div);
			_this.top= parseInt(computed.paddingTop) || 0;
			_this.right= parseInt(computed.paddingRight) || 0;
			_this.bottom= parseInt(computed.paddingBottom) || 0;
			_this.left= parseInt(computed.paddingLeft) || 0;
			document.body.removeChild(div);
		}
	},
	param:(function(a) { // URL에서 파라미터 읽어오기  ui.param.***
			if (a == "") return {};
			var b = {};
			for (var i = 0; i < a.length; i++){
				var p=a[i].split('=');
				if (p.length != 2) continue;
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		})(window.location.search.substr(1).split('&')),
	refresh:{ // PULL Refresh 
		init:function(callback){
			if( typeof callback == "function" ){
				this.pullCallback = callback;	
			}else{
				this.pullCallback = function(){};
			}
			if( $("#contain").length )  this.using();
			$("#contain").prepend( this.icon );
		},
		icon:
			'<div class="pull-to-refresh-material2__control">' +
				'<svg class="pull-to-refresh-material2__icon" fill="#666666" width="30" height="30" viewBox="0 0 24 24">' +
					'<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />'+
					'<path d="M0 0h24v24H0z" fill="none" />'+
				'</svg>'+
				'<svg class="pull-to-refresh-material2__spinner" width="24" height="24" viewBox="25 25 50 50">'+
					'<circle class="pull-to-refresh-material2__path" cx="50" cy="50" r="20" fill="none" stroke="#666666" stroke-width="4" stroke-miterlimit="10" />'+
				'</svg>'+
			'</div>',
		using:function(){
			var _this = this;
			pullToRefresh({
				container: document.querySelector('#contain'),
				animates: ptrAnimatesMaterial2,
				refresh: function() {
					return new Promise( function(resolve){
						setTimeout(resolve, 1500);
						setTimeout(function(){
							_this.pullCallback();
						}, 1500);
					});
				}
			});
		}
	},
	gnb: { // GNB 
		init: function() {
			//ui.gnb.using("open");
			var _this = this;
			$(document).on("click", ".btnGnb", function() {
				if ($("body").hasClass("gnbOn")) {
					_this.using("close");
				} else {
					_this.using("open");
				}
			});
			$(document).on("click", ".gnbScreen , nav.gnb .bt.close", function() {
				_this.using("close");
			});
		},
		using: function(opt) {
			if (opt === "open") {
				ui.lock.using(true);
				$("nav.gnb").after('<div class="gnbScreen" tabindex="-1"></div>');
				$("nav.gnb").show().animate({"left": 0}, 300,function(){
					$(".btnClose .bt.close").attr("tabindex","-1").focus();
				});
				$("body").addClass("gnbOn");
				$(".gnbScreen").show();
			}
			if (opt === "close") {
				$("body").removeClass("gnbOn");
				$("nav.gnb").animate({"left": "-100%"}, 300,function(){
					$(".gnbScreen").hide().remove();
					$("nav.gnb").hide();
					$(".btnGnb").attr("tabindex","0").focus();
				});
				ui.lock.using(false);
			}
		}
	},
	lnb:{ // LNB
		init:function(){
			if( $("nav.lnb").length )  this.using();
			$("nav.lnb .menu>li").each(function(){
				if( !$(this).find(">.bt").next("ul").length  ){
					$(this).find(">.bt").addClass("link");
				}else{
					// $(this).removeClass("active");
				}
			});
		},
		act:function(dep1,dep2,dep3){ // LNB 활성화
			dep1 = dep1 || 0;
			dep2 = dep2 || 0;
			dep3 = dep3 || 0;
			if (typeof dep1 ==  "string") { // 1뎁스
				$("nav.lnb .menu>li").each(function(){
					if( $(this).find(">.bt").text() == dep1 ){
						$(this).addClass("active").siblings("li").removeClass("active");
					}
				});
			}else{
				$("nav.lnb .menu>li:nth-child("+dep1+")").addClass("active").siblings("li").removeClass("active");
			}

			if (typeof dep2 ==  "string") { // 2뎁스
				$("nav.lnb .menu>li>ul>li").each(function(){
					if( $(this).find(">.bt").text() == dep2 ){
						$(this).addClass("active").siblings("li").removeClass("active");
					}
				});
			}else{
				$("nav.lnb .menu>li.active>ul>li:nth-child("+dep2+") ").addClass("active").siblings("li").removeClass("active");
			}

		},
		using:function(){
			$(document).on("click","nav.lnb .menu>li>.bt:not(.link)",function(e){
				$(this).closest(".menu").find("ul").slideUp(200,function(){
					$(this).closest("li").removeClass("active");
				});
				if ( $(this).next("ul").find("li").length ){
					if( $(this).closest("li").hasClass("active") ){
						// $(this).next("ul").slideUp(200,function(){
						// 	$(this).closest("li").removeClass("active");
						// });
					}else{
						$(this).next("ul").slideDown(200,function(){
							$(this).closest("li").addClass("active");
						});

					}
				}
			});
		}
	},
	tree:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			$(document).on("click",".uiTree li>.tog",function(e){
				var $li = $(this).closest("li");
				if( $li.hasClass("open") ) {
					$li.find(">ul").slideUp(100,function(){
						$li.removeClass("open");
					});
				}else{
					$li.find(">ul").slideDown(100,function(){
						$li.addClass("open");
					});
				}
			});
		},
		set:function(){
			$(".uiTree li").each(function(){
				var bt = '<button type="button" class="tog">+</button>';
				if( $(this).find(">ul").length ){
					$(this).addClass("dep");
				}
				if( !$(this).find(".tog").length ){
					$(this).prepend(bt);
				}
			});
		}
	},
	ly:{ // 레이아웃
		init:function(){
			if ( $("#contain").length ) {
				var cls = $("#contain").attr("class").replace("contain","");
				$("body").addClass(cls);
			}
			$(window).on("load resize scroll", this.resize );
			
			$.fn.scrollStopped = function(callback) { // 스크롤 스톱 scroll stop event  
				$(this).scroll(function(){
					var self = this, $this = $(self);
					if($this.data('scrollTimeout')) {
						clearTimeout($this.data('scrollTimeout'));
					}
					$this.data('scrollTimeout', setTimeout(callback,250,self));
				});
			};
			
			this.floating.init();
			if( $("#menubar").length ) this.botNav.init();
			this.kpad.init();
			// this.kpad2.init();
		},
		kpad:{ // input textarea 에 포커스시  하단 버튼 컨트롤
			init:function(){
				this.evt();
			},
			els:".input input, .textarea textarea",
			evt:function(){
				var _this = this;
				$(document).on("focusin click",this.els,function(e){
					$("html.isKpad").removeClass("isKpad");
					$("html").addClass("isKfocus");
					setTimeout(function(){
						_this.show();
					},200);
				});
				$(document).on("blur",this.els,function(e){		
					$("html").removeClass("isKfocus");	
					setTimeout(function(){
						if ($("html").is(".isKpad")) {
							_this.hide();
						}
					},200);
				});
				$(window).on("resize",function(){
					if( $("html").is(".isKpad") ) {
						_this.hide();
					}
					if( $("html").is(".isKfocus") ) {
						$("html").removeClass("isKfocus");
					}
				});

			},
			show:function(){
				$("html").addClass("isKpad");
				ui.popLayer.resize();
			},
			hide:function(){
				$("html.isKpad").removeClass("isKpad");
				$("html.isKfocus").removeClass("isKfocus");
				ui.popLayer.resize();
			}
		},
		kpad2:{ // input textarea 에 포커스시  하단 버튼 컨트롤  개선 버전...
			init:function(){
				this.evt();
			},
			els:".input input, .textarea textarea",
			evt:function(){
				var _this = this;

				$(document).on("focus click",this.els,function(e){
					$("html.isKpad").removeClass("isKpad");
					$("html").addClass("isKfocus");
					if ( _this.kset ){
						clearInterval(_this.kset);
					}
					_this.kset = setInterval( function(){
						if ( $(_this.els).is(":focus") ) {
							// console.log("foucs");
							_this.show();
						}else{
							_this.hide();
						}
					}, 200);
				
				});
				$(document).on("blur",this.els,function(e){		
					$("html").removeClass("isKfocus");	
					setTimeout(function(){
						if ($("html").is(".isKpad")) {
							clearInterval(_this.kset);
							_this.hide();
						}
					},200);
				});

				$(window).on("resize",function(){
					if( $("html").is(".isKpad") ) {
						clearInterval(_this.kset);
						_this.hide();
					}
					if( $("html").is(".isKfocus") ) {
						$("html").removeClass("isKfocus");
					}					
				});

			},
			show:function(){
				$("html").addClass("isKpad");
				ui.popLayer.resize();
				ui.popLayer.refresh();
			},
			hide:function(){
				$("html.isKpad").removeClass("isKpad");
				$("html.isKfocus").removeClass("isKfocus");
				setTimeout(() => {
					ui.popLayer.resize();
					ui.popLayer.refresh();
					
				}, 200);
			}
		},
		floating:{
			init:function(){
				this.event();
			},
			event:function(){
				var _this = this;
				$(document).on("click", ".floatNav button.top",function(){
					_this.using();
				});
				$(document).on("click", ".floatNav button.refresh", function(){
					location.reload();
				} );
				$(window).on("scroll load", function(){
					_this.top();
				});
			},
			using:function(){
				var els = $(this);
				if (els.hasClass("disabled")) return false;
				$("body,html").animate({ scrollTop: 0 }, 300, function() {
					els.removeClass("disabled");
				});
				els.addClass("disabled");
			},
			top:function(){
				var scr = $(window).scrollTop();
				if( $("html").is(".lock") ) {
					return false;
				}
				if (scr > 200) {
					$(".floatNav").addClass("active");
				} else {
					$(".floatNav").removeClass("active");
				}
				if (ui.isUA("NAVER") || ui.isUA("DaumApps")) {
					$(".floatNav").removeClass("active");
				}
			}
		},
		botNav:{
			show:function(){
				$("#menubar").removeClass("hide");
				$(".floatNav").removeClass("hide");
			},
			hide:function(){
				$("#menubar").addClass("hide");
				$(".floatNav").addClass("hide");
			},
			init:function(){
				var _this = this;
				var prevPosition = 0;
				var dnVar = 0;
				var upVar = 0;
				var scrStopEvent = null;
			
				$(window).on("pageshow scroll", function(e){  // 스크롤 내리는 중 OR 올리는중 
					if( $("html").is(".lock") ) {
						return false;
					}
					var initPosition = $(this).scrollTop();
					if(initPosition > prevPosition){
						dnVar ++ ;
						// console.log("dn");
						_this.hide();
						//스크롤다운중;
						upVar = 0;
						$(window).scrollStopped(function(){
							// console.log("scroll 스톱");
							// console.log(scrStopEvent);

							clearTimeout(scrStopEvent);
							scrStopEvent = window.setTimeout(function(){
								_this.show();
								clearTimeout(scrStopEvent);
							},800);
						});

					}else {
						upVar ++ ;
						// console.log("up");
						//스크롤 업중;
						dnVar = 0;
						_this.show();
					}
					prevPosition = initPosition ;

					

				});

				$(window).on("pageshow scroll", function(e){ // 스크롤 맨 밑에 일때
					if( $("html").is(".lock") ) {
						return false;
					}
					var docH = $(document).height();
					var scr = $(window).scrollTop() + $(window).height() + $("#menubar").outerHeight() + 30;
					// console.log(docH,scr);
					if(docH <= scr + 0 ){				
						// console.log("바닥");						
						_this.show();
						// return false;
					}else{
						// _this.hide();
						// return false;
					}
				});


			}
		},
		resize:function(){
			/*
			var fixBot = $(".wrap>nav.nav").outerHeight();
			var pageHd = $(".contain .pageHd").outerHeight();
			if( fixBot){
				$("body").addClass("isBotNav");
			}else{
				$("body").removeClass("isBotNav");
			}
			if( pageHd){
				$("body").addClass("isPageHd");
			}else{
				$("body").removeClass("isPageHd");
			}
			*/
		},
		contHeight:function(){
			/*
			var $contain = $(".wrap>.contain");
			var winH = $(window).height();
			var headH = $(".wrap>.head").outerHeight();
			var footH = $(".wrap>.foot").outerHeight();
			var navH = $(".wrap>.nav").outerHeight();
			$contain.css("min-height", winH - headH - footH - navH);
			*/
		}
	},
	elip:{ // 5줄이상 내용더보기 
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			$(document).on("click", "[data-ui='elips'] .btnTog", function() {
				if ($(this).closest("[data-ui='elips']").hasClass("open")) {
					$(this).closest("[data-ui='elips']").removeClass("open");
					$(this).text("내용더보기");
				} else {
					$(this).closest("[data-ui='elips']").addClass("open");
					$(this).text("내용닫기");
				}
			});
		},
		set:function(){
			$("[data-ui='elips']").each(function(){
				var txtH = $(this).find(".txt");
				// console.log(txtH.height());
				if(txtH.height()>124){
					txtH.closest("[data-ui='elips']").addClass("elips");
				}else{
					txtH.closest("[data-ui='elips']").removeClass("elips");
				}
			});
		}
	},
	sort:{ // 리스트 정렬 메뉴
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click","nav.uisort .bt.st",function(e){
				_this.pos(this);
			});
			$(document).on("click", function(e) {
				if(!$(e.target).closest("nav.uisort").length ) {
					$("nav.uisort").removeClass("open");
				}
			});
			$(document).on("click", "nav.uisort .menu>li>.bt", function(e) {
				$(this).closest("nav.uisort").removeClass("open");
			});


			$(document).on("click",".uisort .menu>li>.bt",function(e){
				$(this).closest("li").addClass("active").siblings("li").removeClass("active");
				_this.set();
			});
		},
		set:function(){
			$("nav.uisort").each(function(){
				var $li = $(this).find(".menu>li");
				var txt = $li.filter(".active").find(".bt").text();
				if( $(this).find(".menu>li.active").length == 0 ) {
					txt = $(this).find(".menu>li:first-child").find(".bt").text();
					$(this).find(".menu>li:first-child").addClass("active");
				}
				$li.closest(".uisort").find(".bt.st").html(txt);
				var val = $(this).find(".menu>li.active .bt").attr("value");
				$li.closest(".uisort").find(".bt.st").attr("value",val);				
			});
		},
		pos:function(els){
			var $myui = $(els).closest("nav.uisort");
			if( $myui.is(".open") ) {
				$myui.removeClass("open");
			}else{
				$("nav.uisort").removeClass("open");
				$myui.addClass("open");
			}
			// 메뉴 포지션		
			// console.log(els);
			var isPop = $(els).closest(".poptents").length;
			var ltp = $(els).offset().top;
			var cht = $(".popLayer.a:visible .pct").height()*0.5 || $(window).height()*0.5 ;
			var sct = $(".popLayer.a:visible .pct").scrollTop() || $(window).scrollTop() ;
			if( isPop )  ltp = ltp + sct ; 
			// console.log(ltp , sct ,cht , ltp - sct );
			if( cht > ltp - sct + 30 ) {
				$(els).closest("nav.uisort").removeClass("bot"); // console.log("상");
			}else{
				$(els).closest("nav.uisort").addClass("bot"); // console.log("하");
			}
		}
	},
	dropmenu:{
		init:function(){
			this.evt();
			// this.set();
		},
		evt:function() {
			var _this = this;
			$(document).on("click",".uidropmu .bt.st",function(e){
				_this.set(this);
				_this.pos(this);
			});

			$(document).on("click", function(e) {
				if(!$(e.target).closest(".uidropmu").length ) {
					$(".uidropmu").removeClass("open");
				}
			});

			$(document).on("click", ".uidropmu .menu>li>.bt", function(e) {
				$(this).closest(".uidropmu").removeClass("open");
			});

		},
		set:function(els) {
			var $myui = $(els).closest(".uidropmu");
			if( $myui.is(".open") ) {
				$myui.removeClass("open");
			}else{
				$(".uidropmu").removeClass("open");
				$myui.addClass("open");
			}
			
		},
		pos:function(els){
			
			// 메뉴 포지션		
			// console.log(els);
			var isPop = $(els).closest(".poptents").length;
			var ltp = $(els).offset().top;
			var cht = $(".popLayer.a:visible .pct").height()*0.5 || $(window).height()*0.5 ;
			var sct = $(".popLayer.a:visible .pct").scrollTop() || $(window).scrollTop() ;
			if( isPop )  ltp = ltp + sct ; 
			// console.log(ltp , sct ,cht , ltp - sct );
			if( cht > ltp - sct + 30 ) {
				$(els).closest(".uidropmu").removeClass("bot"); // console.log("상");
			}else{
				$(els).closest(".uidropmu").addClass("bot"); // console.log("하");
			}
		}
	},
	location:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click","nav.location .loc>li>.bt.st",function(e){
				var $myui = $(this).closest(".loc>li");
				if( $myui.is(".open") ) {
					$myui.removeClass("open");
				}else{
					$("nav.location .loc>li").removeClass("open");
					$myui.addClass("open");
				}
			}).on("click", function(e) {
				if(!$(e.target).closest(".loc>li").length ) {
					$(".loc>li").removeClass("open");
				}
			}).on("click", "nav.location .menu>li>.bt", function(e) {
				$(this).closest("nav.location .loc>li").removeClass("open");
			});

			$(document).on("click",".location .menu>li>.bt",function(e){
				$(this).closest("li").addClass("active").siblings("li").removeClass("active");
				_this.set();
			});
		},
		set:function(){
			$("nav.location .loc>li").each(function(){
				var $li = $(this).find(".menu>li");
				var txt = $li.filter(".active").find(".bt").text();
				if( $(this).find(".menu>li.active").length == 0 ) {
					txt = $(this).find(".menu>li:first-child").find(".bt").text();
					$(this).find(".menu>li:first-child").addClass("active");
				}
				$li.closest(".loc>li").find(".bt.st").html(txt);
				var val = $(this).find(".menu>li.active .bt").attr("value");
				$li.closest(".loc>li").find(".bt.st").attr("value",val);
				if( $(this).find(">ul").length == 0 ){
					$(this).find(">.bt").addClass("tt").removeClass("bt");
				}
			});
		}
	},
	form:{  //  폼요소
		init:function(){
			this.attach();
			this.select();
			this.chkall();
			this.input.init();
			this.intdel.init();
			this.inthgt.init();
			this.commas.init();
			this.prcset.init();
			this.spinner.init();
			this.spined.init();
			this.star.init();
		},
		select:function(){
			$(".select.jqui>select").each(function(i) {				
				var thisCls = $(this).closest(".select").attr("class").replace("select","");
				var thisCls2 = $(this).attr("class")+" "+thisCls;
				$(this).selectmenu({
					classes: {
						"ui-selectmenu-menu": thisCls2
					}
				});
			});
		},
		input:{
			init:function(){
				this.evt();
				this.set();
			},
			set:function(){
				$(".input input, .textarea textarea").each(function(){
					if( $(this).val() == "" ){
						$(this).closest(".input , .textarea").removeClass("coms");
					}else{
						$(this).closest(".input , .textarea").addClass("coms");
					}
					if( $(this).attr("readonly") || $(this).attr("disabled") ){
						// console.log(		$(this).val() );
						$(this).closest(".input , .textarea").addClass("disabled");
					}else{
						// console.log(		$(this).val() );
						$(this).closest(".input , .textarea").removeClass("disabled");
					}
				});
			},
			evt:function(){
				$(document).on("click",".input .label, .textarea .label",function(e){
					$(this).closest(".input , .textarea").find("input, textarea").focus();
				});
				$(document).on("focus",".input input, .textarea textarea",function(e){
					$(this).closest(".input , .textarea").addClass("focus");
				});
				$(document).on("blur input",".input input, .textarea textarea",function(e){
					$(this).closest(".input , .textarea").removeClass("focus");
					// console.log( $(this).val() );
					if( $(this).val() == "" ){
						$(this).closest(".input , .textarea").removeClass("coms");
					}else{
						$(this).closest(".input , .textarea").addClass("coms");
					}
				});
			}
		},
		intdel:{ // .input.del 박스에 글자 삭제
			init:function(){
				this.evt();
				this.set();
			},
			set:function(){
				$(".input:not(.notdel)>input:not([disabled],[readonly]) , [data-ui='autoheight']").each(function(){
					// $(this).trigger("input");
				});
			},
			evt:function(){
				var _this = this;
				$(document).on("input focus",".input:not(.notdel)>input:not([disabled],[readonly]), [data-ui='autoheight']",function(e){
					var els = this;
					if( $(els).val() == "" ) {
						_this.xhide(els);
					}else{
						_this.xshow(els);
					}
				});
				$(document).on("blur",".input:not(.notdel)>input:not([disabled],[readonly]) , [data-ui='autoheight']",function(e){
					var els = this;
					setTimeout( function(){
						_this.xhide(els);
					},300);
				});
				$(document).on("click",".input .btdel",function(e){
					var els = this;
					var myDel = $(this);
					myDel.closest(".input").find("input,textarea").val("").focus().trigger('input');
					_this.xhide(els);
				});
			},
			xshow:function(els){
				var _this = this;
				var myInput = $(els);
				if( myInput.val() != ""  && myInput.closest(".input").find(".btdel").length == 0  ) {
					myInput.closest(".input").addClass("del").append('<button type="button" class="btdel" tabindex="-1">삭ss제</button>');

					var rpost = myInput.closest(".input").is(".b") ? 0 : 7 || 0 ;
					var $ibts = myInput.closest(".input").find(".ibts");
					var btpos = $ibts.length ? $ibts.width()+17+ rpost : $ibts.width()+ rpost;

					myInput.closest(".input:not(.ui-priceset) input").css({ "padding-right":btpos + 25 });
					myInput.closest(".input").find(".btdel").css({ "right":btpos });
				}
			},
			xhide:function(els){
				var myInput = $(els);
				myInput.closest(".input").removeClass("del").find(".btdel").remove();
				myInput.closest(".input input").css({ "padding-right":"" });
			},
			xdele:function(els){

			}
		},
		commas:{ // .input.commas 3자리마다 콤마찍기 
			init:function(){
				this.evt();
				this.set();
			},
			els:".input.commas input , .ui-priceset input.amt",
			evt:function(){
				var _this = this;
				$(document).on("input focus",_this.els,function(e){
					_this.set();
				});
			},
			set:function(){
				var _this = this;
				function addCommas(x) {
					return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}
				function delCommas(strNum){
					return parseInt(strNum.replace(/,/g , ''));
				}
				$(_this.els).each(function(){
					var $input = $(this);
					var value = $input.val();
					$input.attr("pattern","\\d*");
					if( value == 0 ) {
						// console.log(value );
						$input.val("");
					}
					if( value != "" ) {
						value = addCommas( $input.val().replace(/[^0-9]/g,"") );
						$input.val(value);
					}
					var org = +delCommas( $input.val() ) || "";
					$input.attr( "data-val" , org ).attr("value",value).data("val",org);
					$input.closest(".input").find(".hideamt").val(  org );
					// console.log( $input.data("val") , $input.val() );
				});
			}
		},
		prcset:{ // 가격입력  "원"글자가 입력시마다 이동
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("input",".ui-priceset input.amt",function(e){
					_this.set();
				});
				$(document).on("click",".ui-priceset.coms:not(.focus):not(.del)",function(e){
					$(this).find("input.amt").focus();
				});
			},
			set:function(){
				$(".ui-priceset input.amt").each(function(){
					var uipriceset = $(this).closest(".ui-priceset");
					uipriceset.find(".amt").css("width","1px");
					var val = $(this).val();
					var wid = $(this).prop('scrollWidth');
					// console.log(val , wid);
				
					uipriceset.find(".amt").css("width",wid);
					if( val != "" ) {
						uipriceset.addClass("won");
					}else{
						uipriceset.removeClass("won");
						uipriceset.find(".amt").css("width","");
					}
					// var isNUMS = isNaN(delCommas(val));
					// console.log(val , isNUMS);
					
					if( val == 0 ){
						uipriceset.removeClass("won");
						uipriceset.find(".amt").css("width","").val("");
					}
				});
			}
		},
		inthgt:{
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("input","[data-ui='autoheight']",function(e){
					// console.log( $(this).val().indexOf("\n")  );
					if( $(this).val().indexOf("\n") > -1 && $(this).is(".inline") ) {
						var newval = $(this).val().replace(/\n/gi, '');
						console.log("엔터치지마");
						$(this).val(newval);
						return false;
					}
					_this.set();
				});
			},
			set:function(els){
				$("[data-ui='autoheight']").each(function(){
					var $els = $(this);
					var tboxH = $els.outerHeight();
					var tboxS;
					$els.css("height","1px");
					tboxS = $els.prop('scrollHeight') + parseInt( $els.css("border-bottom") ) + parseInt( $els.css("border-top") )   ;
					// console.log( tboxH , tboxS);
					$els.css({"height":tboxS});
				});
			}
		},
		attach:function(){

			$("img").on("error",function(){
				$(this).attr("src","../../img/temp/sss.png");
			});
			$(document).on("change", "[data-ui='attach'] .fileButton .fileInput", function() {
				var els = $(this).closest("[data-ui='attach']");
				var lcEls;
				var fUrl = (this.value).split("\\"),
					fName = fUrl[fUrl.length - 1];
				var locVar = els.find(".file").length;
				if (!locVar) {
					// console.log("132132");
					if( els.hasClass("ui-add-pic") ) {
						lcEls = 
						'<span class="file">'+
						'    <img class="img" src="" alt="" onerror="this.src=\'../../img/common/blank.png\'" >'+
						'    <button type="button" class="delete">삭제</button>'+
						'</span>';
					}else{
						lcEls = 
						'<span class="file">'+
						'    <span class="loc"></span>'+
						'    <button type="button" class="delete">삭제</button>'+
						'</span>';
					}
					els.append( lcEls );
				}
				
				els.addClass("on");
				els.find(".file .loc").text(fName);
				els.find(".file .img").attr("src",this.value);
			});
			$(document).on("click", "[data-ui='attach'] .file .delete", function() {
				var els = $(this).closest("[data-ui='attach']");
				els.find(".fileButton .fileInput").val("");
				els.find(".file").remove();
				els.find(".file .loc").text("");
				els.removeClass("on");
			});


		},
		chkall: function() { // 전체 첵크 ui 
			$(document).on("change", "[data-check='check']", function() {
				var thisId = $(this).data("checkId");
				var thisNum = $("[data-check='check'][data-check-id='" + thisId + "']").length;
				var thisChkNum = $("[data-check='check'][data-check-id='" + thisId + "']:checked").length;
				//console.log(thisId,thisNum,thisChkNum);
				if (thisChkNum >= thisNum) {
					$("[data-check='all'][data-check-id='" + thisId + "']").prop("checked", true);
				} else {
					$("[data-check='all'][data-check-id='" + thisId + "']").prop("checked", false);
				}
			});
			$(document).on("change", "[data-check='all']", function() {
				var thisId = $(this).data("checkId");
				var thisCheck = $("[data-check='check'][data-check-id='" + thisId + "']");
				//console.log(thisId , thisCheck);
				if ($(this).is(":checked")) {
					thisCheck.prop("checked", true);
				} else {
					thisCheck.prop("checked", false);
				}
			});
		},
		spinner:{
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("click",".uispiner .bt",function(){
					var els = $(this).closest(".uispiner");
					var n = els.find(".amt");
					var nv = parseInt( els.find(".amt").val() );
					var bt = $(this);
					// console.log( nv);
					if( bt.hasClass("plus") ){
						n.val( nv + 1 ) ;
					}
					if( bt.hasClass("minus") ){
						n.val( nv - 1 ) ;
					}
					_this.set();
				});
			},
			set:function(){
				$(".uispiner").each(function(){
					var els = $(this).closest(".uispiner");
					var nv 	= els.find(".amt").val();
					var max = parseInt(  els.data("max") ) || 9999;
					var min = parseInt(  els.data("min") ) || 1;
					// console.log(nv , max);
					// console.log(els.data("disabled"));
					if( els.data("disabled") == true) {
						els.find(".bt , .amt").attr("disabled",true);
						return;
					}else{
						els.find(".bt , .amt").attr("disabled",false);
					}
					if( nv <= min){
						els.find(".minus").attr("disabled",true);
					}
					if( nv > min){
						els.find(".minus").attr("disabled",false);
					}
					if( nv >= max){
						els.find(".plus").attr("disabled",true);
					}
					if( nv < max){
						els.find(".plus").attr("disabled",false);
					}
					if(nv == 0){
						els.find(".minus").attr("disabled",true);
						els.find(".plus").attr("disabled",true);
					}
				});
			}
		},
		spined:{ // 장바구니 수량 변경
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("click",".uispined .bt.mod",function(e){
					_this.using(this,"inp");
				});
				$(document).on("change",".uispined select.slt",function(e){
					_this.using(this,"slt");
				});
				$(document).on("input",".uispined .amt",function(e){
					// _this.using(this,"inp");
				});
				$(document).on("focus",".uispined .amt",function(e){
					$(this).closest(".uispined").addClass("bt");
				});
				$(document).on("blur",".uispined .amt",function(e){
					$(this).closest(".uispined").removeClass("bt");
					_this.using(this,"inp");
				});
			},
			using:function(els,mod){
				var ubx = $(els).closest(".uispined");
				var val ;
				if( mod == "slt" ){
					val = ubx.find(".slt").val();
					ubx.find(".amt").val(val).attr("value",val);			
					if( val > 9 ){
						ubx.addClass("bt");
						setTimeout(function(){
							ubx.find(".amt").focus();
						});
					}
				}
				if( mod == "inp" ){
					val = ubx.find(".amt").val();
					if( ubx.find(".amt").val() < 1 ){
						ubx.find(".amt").val(1);
					}
					var max = ubx.data("max");
					ubx.find(".amt").val(val).attr("value",val);
					ubx.find(".slt").val(val).prop("selected",true);				
					if( ubx.find(".amt").val() > max ){
						ubx.find(".amt").val(max).attr("value",max);
					}
					ubx.removeClass("bt");
				}
				val = ubx.find(".amt").val();
				console.log(val);
				this.set();
			},
			set:function(){
				var html = 
				'<div class="bx sel">'+
				'	<select class="val slt" title="수량선택"></select>'+
				'</div>'+
				'<div class="bx num">'+
				'	<button type="button" class="bt mod">변경</button>'+
				'</div>';
	
				$(".uispined").each(function(){
					var ubx = $(this);
					var val = ubx.find(".amt").val();
					var max = ubx.data("max") || 1;
					var oplist = "";
					var m = "";
					for( var i = 1; i < max+1 ; i++ ){
						if( i >= 10){
							m = "+";
						}
						if( i <= 10){
							oplist += '<option type="button" value="'+i+'">'+m+i+'</option>';
						}
					}
					if(!ubx.is(".load") ) {
						ubx.append(html);
						ubx.find(".slt").append(oplist);
						ubx.find(".slt").val(val).prop("selected",true);
					}
					if( val > 9) {
						ubx.addClass("nm").removeClass("st");
						ubx.find(".amt").val(val);
					}else{
						ubx.addClass("st").removeClass("nm");
					}
					if( ubx.find(".amt").val() < 1 ){
						ubx.find(".amt").val(1);
					}
					if( ubx.find(".amt").is(":disabled") ) {
						ubx.find(".slt").prop("disabled",true);
					}else{
						ubx.find(".slt").prop("disabled",false);
					}
					ubx.addClass("load");
					ubx.find(".amt").attr("title","수량입력");
					// console.log( $(this).find(".val:visible").val());
				});
			}
		},
		star:{
			init:function(){
				var _this =  this;
				if( $(".uiStar").length ) this.using();
				$(document).on("click",".uiStar ul>li>button.st",function(){
					var myVar =  $(this).closest("li").index()+1;
					//console.log(myVar);
					$(this).closest(".uiStar").data("star",myVar);
					$(this).closest(".uiStar").attr("data-star",myVar);

					// console.log( myVar , $(this).closest(".uiStar").data("star")  );
					_this.using();

				});
			},
			using:function(){
				$(".uiStar").each(function(){
					$(this).find("ul>li").removeClass();
					//$(this).find("ul>li").removeClass("f");
					var v = $(this).attr("data-star");
					//v = v;
					vt = Math.floor(v/1);
					//vt = v.replace(/0/gi, '^');
					vp = (v%1);
					$(this).find(".p").html(v);
					//console.log(v,vt,vp);
					for (var i = 0; i <= vt; i++) {
						$(this).find("ul>li:nth-child("+i+")").addClass("f");
						
						if(vp){
							if(vt == 0 ){
								$(this).find("ul>li:nth-child(1)").addClass("h");
								//return false;
							}
							$(this).find("ul>li:nth-child("+vt+")").next("li").addClass("h");
							
						}
					}
				});
			}
		}
	},
	loading:{ // 로딩중..
		show: function () {
			if( !$(".loadingPage").length ) {
				var els = '<div class="loadingPage"><em></em></div>';
				$("body").prepend(els);
			}
		},
		hide: function () {
			$(".loadingPage").remove();
		}
	},
	mcscroll:{ // 커스텀 스크롤
		init:function(){
			if ( $(".ui-mcscroll").length ) this.using();
		},
		opt:{
			axis:"y" ,
			scrollInertia:100, 
			mouseWheel:{ 
				scrollAmount:800,
				preventDefault:true
			},
			callbacks:{
				onTotalScroll:function(){ 
					// console.log(this.mcs.top);
				}
			}
		},
		using:function() {
			var _this = this;
			$(".ui-mcscroll").each(function(){
				_this.opt.axis = $(this).hasClass("x") ? "x" : "y" ;
				// console.log(_this.opt.axis);
				if( $(this).find(">*").length >= 1 ){
					$(this).mCustomScrollbar(_this.opt);
				}
			});
			// $(".ui-mcscroll").mCustomScrollbar("update");
			// $(".ui-mcscroll").mCustomScrollbar("destroy");
			// $(".ui-mcscroll").mCustomScrollbar("disable",true);
		}
	},
	accd:{ // 아코디언 UI
		init: function() {
			this.using();
			this.tbl();
			this.set();
		},
		set:function(){
			$(".uiAccd>li>.cBox").hide();
			$(".uiAccd>li.open>.cBox").show();
			$(".uiAccd>li.except>.cBox").show();

			$(".uiAccdTbl>.cBox").hide();
			$(".uiAccdTbl>.cBox.open").show();
		},
		using: function() {
			$(document).on("click", ".uiAccd>li:not(.except)>.hBox>.btnTog", function() {
				var type = $(this).closest(".uiAccd").attr("data-accd");
				var $pnt = $(this).closest("li");
				//console.log(type);
				if( type === "tog") {
					if( $pnt.find(">.cBox").is(":hidden") ) {
						$pnt.find(">.cBox").slideDown(200,function(){
							$pnt.addClass("open");
						});
					}else{
						$pnt.find(">.cBox").slideUp(200,function(){
							$pnt.removeClass("open");
						});
					}
				}
				if( type === "accd") {
					$(this).closest(".uiAccd").find(">li.open").not("li.except").find(">.cBox").slideUp(200,function(){
						$(this).closest(".uiAccd").find(">li.open").removeClass("open");
					});
					if( $pnt.find(">.cBox").is(":hidden")) {
						$pnt.find(">.cBox").slideDown(200,function(){
							$pnt.addClass("open");
						});
					}
				}

			});
		},
		tbl: function() {
			$(".uiAccdTbl>.cBox.open").prev(".hBox").addClass("open");

			$(document).on("click", ".uiAccdTbl>.hBox .btnTog", function() {
				// console.log("d");
				var type = $(this).closest(".uiAccdTbl").attr("data-accd");
				var $hBox = $(this).closest(".hBox");
				var $cBox = $(this).closest(".hBox").next(".cBox");
				// console.log(type);
				if (type === "tog") {
					if ($cBox.is(":visible")) {
						$cBox.hide();
						$hBox.removeClass("open");
						$cBox.removeClass("open");
					} else {
						$hBox.addClass("open");
						$cBox.addClass("open").show();
					}
				}
				if (type === "accd") {
					if ($cBox.is(":hidden")) {
						$cBox.prev(".hBox").addClass("open").siblings(".hBox").removeClass("open");
						$cBox.addClass("open").show().siblings(".cBox").removeClass("open").hide();
					} else {
						$cBox.prev(".hBox").removeClass("open");
						$cBox.removeClass("open").hide();
					}
				}
			});
		}
	},
	timepick:{ // 타입 픽커
		init:function () {
			this.set();
		},
		set:function(){
			var _this = this;
			$(".uiTimePicker").each(function(i){
				// console.log(i);
				var id = "picker_id_"+i ;
				if( $(this).attr("id") ){
					id = $(this).attr("id");
					els = document.getElementById(id);
					// console.log(id);
				}else{
					els = this;
					// console.log(els);
				}
				if( _this.pick[id] ) {
					_this.pick[id].destroy();
					_this.pick[id] = undefined;
					// console.log(_this.pick[id]);
				}
				$(els).prop("readonly",true);
				_this.pick[id] = new Picker( els , {
					format: 'HH:mm',
					rows:3,
					headers: true,
					increment: {
						hour: 1,
						minute: 10,
					  },
					text: {
						title: '시간 선택',
						confirm: '완료',
						cancel: '취소',
					},
					shown:function(e){
						// console.log("쇼 shown");
					},
					hidden:function(){
						// console.log("히든 hidden");
					},
					pick:function(){
						// console.log("픽 pick");
						// console.log( _this.pick[id].date );
					}
				});	
			});
		},
		pick:{}
	},
	daypick:{ // 날짜 픽커
		init:function () {
			this.set();
			$(document).on("keydown mousedown",".uiDate .datepicker", function (event) {
				if ( event.keyCode == 13 ) {
					$(event.target).trigger("click");
				}
			});
		},
		set:function(){
			var _this = this;
			$(".uiDate .datepicker:not(:disabled)").each(function(i){
				// console.log(i);
				var id = "picker_id_"+i ;
				if( $(this).attr("id") ){
					id = $(this).attr("id");
					els = document.getElementById(id);
					// console.log(id);
				}else{
					els = this;
					// console.log(els);
				}
				if( _this.pick[id] ) {
					_this.pick[id].destroy();
					_this.pick[id] = undefined;
					// console.log(_this.pick[id]);
				}
				_this.pick[id] = new Picker( els , {
					format: 'YYYY.MM.DD',
					rows:3,
					headers: true,
					increment: {
						year: 1,
						month: 1,
						day: 1
					},
					text: {
						title: '날짜 선택',
						confirm: '완료',
						cancel: '취소',
					},
					shown:function(e){
						// console.log("쇼 shown");
						$(".picker-opened .picker-dialog").attr("tabindex","-1").focus();
						_this.pick[id].update();
					},
					hidden:function(){
						// console.log("히든 hidden");
						$(this).focus();
					},
					pick:function(els){
						// $(this).trigger("change");
						// console.log("픽 pick");
						// console.log( _this.pick[id].date );
					}
				});	
			});
		},
		pick:{}
	},
	datepick:{ // 달력피커 jQuery-ui
		init:function(){
			
				
			$("input.datepicker").on("click",function(){
				// $(this).next(".ui-datepicker-trigger").trigger("click");
			});
			$("input.datepicker").on("focus",function(){
				// $(this).blur();
				$(this).prop("readonly",true);
				// $(this).attr("tabindex","-1");
				// $(this).next(".ui-datepicker-trigger").focus();
			});
			if( $("input.datepicker_month").length ) this.month();

			$(document).on("click",".ui-datepicker-next",function(e){
				e.preventDefault();
				setTimeout(function(){			
					$(".ui-datepicker-next").attr({"tabindex":"0","href":"javascript:;"}).focus();
				});
			});
			$(document).on("click",".ui-datepicker-prev",function(e){
				e.preventDefault();
				setTimeout(function(){
					$(".ui-datepicker-prev").attr({"tabindex":"0","href":"javascript:;"}).focus();
				});
			});
			
			this.set();
		},
		set:function(params){
			this.opts = $.extend({
				id:"",
				// minDate: '-3M',
	  			// maxDate: '+28D',
				showOn: "button",
				showButtonPanel: true,
				changeYear:true ,
				changeMonth:true,
				buttonText: "달력",
				showMonthAfterYear: true,
				dateFormat:"yy.mm.dd",
				yearRange: 'c-100:c+10',
				dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNames : [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				beforeShow: function(els) {
					ui.lock.using(true);
					$(".ui-datepicker").wrap('<div class="uiDatePickWrap"></div>');
					setTimeout(function(){
						$(".ui-datepicker-next , .ui-datepicker-prev").attr({"tabindex":"0","href":"#"});
						$("#ui-datepicker-div").attr("tabindex","-1").focus();
					});
					var sted = $(els).closest(".uiDate").attr("class").replace(" ","").replace("uiDate","");
					$("#ui-datepicker-div").removeClass("week").addClass(sted);
					window.setTimeout(ui.datepick.wkThis);
				},
				onSelect :function(date,els){
					// console.log(date,els);
					$(this).trigger("change");
					$(this).focus();
					var id = $(this).attr("id");
					if( ui.daypick.pick[id] ) {
						ui.daypick.pick[id].update();
					}
				},
				onChangeMonthYear  :function(ddd){
					setTimeout(function(){
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"#"});
					});
					setTimeout(function(){
						$("#ui-datepicker-div").attr("tabindex","-1").focus();
					});
					window.setTimeout(ui.datepick.wkThis);
				},
				onClose:function(date,els){
					// console.log(date,els);
					ui.lock.using(false);
					$("#"+els.id).focus();
					$(".ui-datepicker").unwrap(".uiDatePickWrap");
				}
			}, params); 
			if( this.opts.id ) {
				// console.log("ddddd");
				$("#"+this.opts.id+":not(:disabled)").datepicker(this.opts);
			}else{
				// console.log("eeeeeee");
				$("input:not(:disabled).datepicker").datepicker(this.opts);
			}
		},
		wkThis:function(){  // 일주일 단위선택 용 하이라이트
			var idx = $(".ui-datepicker").find(".ui-datepicker-current-day").index();
			var $td = $(".ui-datepicker").find(".ui-datepicker-current-day");
			if ( idx >= 1 ) { // 월화수목금토 선택시
				console.log(idx);
				$td.closest("tr").find("td:not(:first-child)").addClass("activeDays");
				$td.closest("tr").next("tr").find("td:first-child").addClass("activeDays");
			}else{ // 일요일 선택시
				// console.log(idx);
				$td.addClass("activeDays");
				$td.closest("tr").prev("tr").find("td:not(:first-child)").addClass("activeDays");
			}
		},
		month:function(){
			
			$('input.datepicker_month').datepicker({
				showMonthAfterYear: true,
				dateFormat: "yy-mm",
				monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true,
				closeText: "선택",
				currentText: "이달",
				onClose: function(dateText, inst) {
					inst.dpDiv.hide();
					inst.dpDiv.removeClass('month_year_datepicker');
					function isDonePressed(){
						return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
					}
					if (isDonePressed()){
						var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
						var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
						$(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
						
						$('input.datepicker_month').focusout(); //Added to remove focus from datepicker input box on selecting date
					}
					
					// console.log(date,els);
					ui.lock.using(false);
					// $("#"+els.id).focus();
					$(".ui-datepicker").unwrap(".uiDatePickWrap");
					
				},
				beforeShow : function(datestr, inst) {
					ui.lock.using(true);
					$(".ui-datepicker").wrap('<div class="uiDatePickWrap"></div>');
					var sted = $(datestr).closest(".uiDate").attr("class").replace(" ","").replace("uiDate","");
					inst.dpDiv.addClass('month_year_datepicker');

					if ((datestr = $(this).val()).length > 0) {
						// console.log(datestr);
						// console.log(datestr.substring(0, 4));
						// console.log(datestr.substring(5, 7) );
						year = datestr.substring(0, 4);
						month = datestr.substring(5, 7);
						$(this).datepicker('option', 'defaultDate', new Date(year,month-1,  1));
						$(this).datepicker('setDate', new Date(year, month-1, 1));
						$(".ui-datepicker-calendar").hide();
					}
					
				},
				onChangeMonthYear:function(ddd){
					
				}
			});
		   
		}
	},
	tooltips:{ // 툴팁레이어
		init:function(){
			var els = "[data-ui-tooltip='btn']";
			var _this = this;
			$(document).on("click",".ui-tooltips .btnPopClose",function(e){
				var els = $(this).closest(".ui-tooltips").data("tooltip-cont");
				console.log(els);
				var bt = $("[data-ui-tooltip='btn'][data-ui-tooltip-cont="+els+"]");
				_this.close(bt);
			});
			$(document).on({
			    "mouseenter": function(e) {
					_this.open(this);
			    },
			    "mouseleave": function(e) {
					_this.close(this);
			    },
			    "click": function(e) {
					e.preventDefault();
			    }
			}, els);
		},
		open:function(els){
			var chl_id = $(els).data("ui-tooltip-cont");
			var chl = $(".ui-tooltips[data-tooltip-cont='"+chl_id+"']") ;
			$(chl).hide();
			$(chl).css({ "position": "fixed" }).show();
			var scY = $(window).scrollTop() || 0;
			var scX = $(window).scrollLeft() || 0;
			var winWf = $(window).width() * 0.5  || 0;
			var winHf = $(window).height() * 0.5  || 0;
			var ulayH = $(chl).outerHeight()  || 0;
			var ulayW = $(chl).outerWidth()  || 0;
			var elH = $(els).outerHeight()  || 0;
			var elW = $(els).outerWidth()  || 0;
			var l = $(els).offset().left  || 0;
			var t = $(els).offset().top  || 0;
			console.log(l,t);
			if (t >= winHf + scY) { // console.log("top-오버");
			    t = t - scY - ulayH;
			} else { // console.log("top-하프");
			    t = t - scY + elH;
			}
			if (l >= winWf + scX) { // console.log("left-오버");
			    l = l - scX - ulayW;
			} else { // console.log("left-하프");
			    l = l - scX + elW;
			}
			// console.log(l,t);
			$(chl).css({ "top": t, "left": l });
		},
		close:function(els){
			var  chl_id = $(els).data("ui-tooltip-cont");
			var  chl = $(".ui-tooltips[data-tooltip-cont='"+chl_id+"']") ;
			$(chl).hide();			
		}
	},
	tog:{ // 토글 UI
		init: function() {
			this.using();
			// this.set();
			if( ui.param.tog ) this.set( ui.param.tog );
		},
		set:function(id){
			$("[data-ui-tog='ctn']").hide();
			$("[data-ui-tog='ctn'].open").show();
			var _this = this;
			var togid = id.split(",");
			$("[data-ui-tog='btn']").each(function(idx){
				// console.log(idx,togid[idx] );
				// $("[data-ui-tog='btn'][href='#"+togid[idx]+"']").trigger("click");
				_this.open(togid[idx]);
			});
		},
		open:function(id){
			$("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").addClass("open");
			$("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideDown(100,function(){
				$(this).addClass("open");
			});
		},
		close:function(id){
			$("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").removeClass("open");
			$("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideUp(100,function(){
				$(this).removeClass("open");
			});
		},
		using:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tog='btn']", function(e) {
				var id = $(this).data("ui-tog-val");
				var bt = $(this);
				console.log(id);
				if( bt.hasClass("open") ) {				
					_this.close(id);
				}else{
					_this.open(id);
				}
				e.preventDefault();
			});
		}
	},
	tab:{ // 탭 UI
		init: function() {
			var _this = this;
			this.evt();
			if( ui.param.tab ) this.set( ui.param.tab );
			$(window).on("pageshow",function(){
				_this.set();
			});
		},
		set:function(id){
			if( id ) var tabid = id.split(",");
			$("[data-ui-tab-btn][data-ui-tab-val]").each(function(idx){
				// console.log(idx,tabid );
				if( tabid ) {
					$("[data-ui-tab-btn][data-ui-tab-val='"+tabid[idx]+"']").prop("checked",true).trigger("click");
				}
				$("[data-ui-tab-btn][data-ui-tab-val]:checked").trigger("click");
			});
		},
		evt:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tab-btn]", function(e){
				_this.using(this);
			});
		},
		using:function(els){
			var btn = $(els).data("ui-tab-val");
			var ctn = $(els).data("ui-tab-btn");
			$("[data-ui-tab-btn="+ctn+"]").removeClass("active").closest("li").removeClass("active");
			$(els).addClass("active").closest("li").addClass("active");
			$("[data-ui-tab-ctn="+ctn+"]").removeClass("active");
			$("[data-ui-tab-ctn]#"+btn).addClass("active");
			$("[data-ui-tab-ctn][data-ui-tab-val='"+btn+"']").addClass("active");
		}
	},
	lock:{ // 스크롤 막기,풀기
		sct:0,
		stat:false,
		els:".popLayer:visible  , .popConfirm:visible , .popAlert:visible",
		set:function(){
			if(	$(this.els).length <= 0 ){
				this.using(false);
			}
		},
		using:function(opt){
			
			var lockDiv = ".popLayer  , .popConfirm , .popAlert" ;

			if(opt === true && this.stat === false ){
				this.stat = true;
				ui.lock.sct = $(window).scrollTop();
				$("body , html").addClass("lock");
				$("html").css({"top":""+(-ui.lock.sct)+"px"});
				$(lockDiv).bind("touchmove scroll", function(e){ e.preventDefault(); });
			}
			if( opt === false && $(this.els).length <= 0 ){
				this.stat = false;
				$("body , html").removeClass("lock");
				$("html").css({"top":""});
				$(window).scrollTop( ui.lock.sct );
				$(lockDiv).unbind("touchmove scroll");
			}
		}
	},
	slides:{ // 스와이프 슬라이드
		init:function(){
			if( $(this.sample1.els +" ul.slide" ).length ) this.sample1.using();
			if( $(this.sample2.els +" ul.slide" ).length ) this.sample2.using();
		},
		sample1:{  //  static/html/mn/main.jsp
			els: ".slideSample1 .swiper-container",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: true
			},
			using: function() {
				if ( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				this.slide = new Swiper(this.els, this.opt);
			}
		},
		sample2:{ // 추천상품 슬라이드 공통
			els: ".slideSample2 .swiper-container",
			opt: {
				slidesPerView: 2.2,
				freeMode: true,
				observer: true,
				observeParents: true,
				spaceBetween:2,
				watchOverflow:true,
				loop: false
			},
			using: function() {
				if ( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				this.slide = new Swiper(this.els, this.opt);
			}
		}
	},
	alert:function(msg,params){ // 커스텀 알럿

		var opt = $.extend({
			msg:msg,
			tit:"",
			ycb:"",
			ybt:"확인"
		}, params);

		if( $(".popAlert").length ) return;
		
		ui.lock.using(true);
		// console.log(opt.tit);

		var lyAlert =
		'<article class="popAlert" tabindex="0">'+
		'	<div class="pbd">'+
		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
		'		<div class="pct">'+opt.msg+'</div>'+
		'		<div class="pbt">'+						
		'			<button type="button" class="btn btnConfirm">'+ opt.ybt +'</button>'+
		'		</div>'+
		'		<button type="button" class="btnClose">닫기</button>'+
		'	</div>'+
		'</article>';
		$("body").append(lyAlert);
		if (opt.tit) {
			$(".popAlert>.pbd>.phd").addClass("isTit");
		}
		$(".popAlert:visible").focus();

		$(".popAlert").find(".btnConfirm").on("click",function(){
			window.setTimeout(opt.ycb);
		});
		$(".popAlert").find(".btnClose , .btnConfirm").on("click",alertClose);

		function alertClose(){
			$(".popAlert").remove();
			if( $(".popLayer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}
	},
	confirm:function(msg,params){ // 커스텀 컨펌

		var opt = $.extend({
			msg:msg,
			tit:"",
			ycb:"",
			ybt:"확인",
			ncb:"",
			nbt:"취소"
		}, params);

		if( $(".popConfirm").length ) return;
		
		ui.lock.using(true);

		var lyConfirm =
		'<article class="popConfirm" tabindex="0">'+
		'	<div class="pbd">'+
		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
		'		<div class="pct">'+opt.msg+'</div>'+
		'		<div class="pbt">'+
		'			<button type="button" class="btn btnCancel">'+ opt.nbt +'</button>'+
		'			<button type="button" class="btn btnConfirm">'+ opt.ybt +'</button>'+
		'		</div>'+
		'		<button type="button" class="btnClose">닫기</button>'+
		'	</div>'+
		'</article>';
		$("body").append(lyConfirm);
		if (opt.tit) {
			$(".popConfirm>.pbd>.phd").addClass("isTit");
		}
		$(".popConfirm:visible").focus();

		$(".popConfirm").find(".btnConfirm").on("click",function(){
			window.setTimeout(opt.ycb);
		});

		$(".popConfirm").find(".btnCancel").on("click",function(){
			window.setTimeout(opt.ncb);
		});

		$(".popConfirm").find(".btnConfirm, .btnClose , .btnCancel").on("click",confirmClose);

		function confirmClose(){
			$(".popConfirm").remove();
			if( $(".popLayer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}
	},
	toast:function(msg,params){ // 토스트창 

		var opt = $.extend({
			msg:msg,
			cls:"",
			sec:2000,
			bot:74
		}, params);

		if ( $(".popToast:visible").length ) { return; }

		var lyToast =
		'<article class="popToast ' + opt.cls + '">' +
		'	<div class="pbd">' +
		'		<div class="pct">' + opt.msg + '</div>' +
		'	</div>' +
		'</article>';

		$("body").append(lyToast);
		window.setTimeout(function() {
			$(".popToast:visible").addClass("on").css({"padding-bottom" : opt.bot});
		});
		
		window.setTimeout(function() {
			$(".popToast:visible").removeClass("on").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){
				// console.log("fsd");
				$(".popToast").remove();
			});
		}, opt.sec);
	
		
	},
	popsel:{ // 셀렉트 스와이프
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;

			$(document).on("click",".pop-select",function(e) {
				// console.log(e.target);
				if ( !$(e.target).closest(".pop-select .pbd").length ) {
					_this.close();
				}
			});

			$(document).on("click",".select-pop .btsel:not(.open)",function(){
				var $pop = $(this).closest(".select-pop");
				var name = $pop.find(".slist").attr("name");
				var tit =  $pop.find(".slist").data("select-title") || "선택해주세요.";
				var sel =  $pop.find(".slist").val();
				var list = [];
				
				// console.log(name,tit,list,sel);
				_this.open(name,tit,list,sel);
				$(".uisort").removeClass("open");
			});

			$(document).on("click",".pop-select .btsbot .btcom",function(e){
				var sel = $(this).closest(".pop-select").find(".swiper-slide-active button").attr("value");
				var txt = $(this).closest(".pop-select").find(".swiper-slide-active button").text();
				var name =  $(this).closest(".pop-select").data("selt-pop");
				var tit = $("select[name='"+name+"']").data("select-title");
				// console.log(name,sel);
				$("select[name='"+name+"']>option[value='"+sel+"']").prop("selected",true);
				$("select[name='"+name+"']").val(sel).prop("selected",true);
				$("select[name='"+name+"']").closest(".select-pop").find(".btsel").html('<i class="txt">'+txt+'</i>').removeClass("is-tit");
				$("select[name='"+name+"']").trigger("change");
				_this.close();
			});




			$(document).on("click",".pop-select .btn-sel-Close",function(){
				_this.close();
			});
		},
		sld:{ // 추천상품 슬라이드 공통
			els: ".pop-select .swiper-container",
			opt: {
				freeMode: true,
				freeModeSticky:true,
				centeredSlides:true,
				direction:"vertical",
				slidesPerView: 3,
				// mousewheel: {
				// 	invert: false,
				// 	sensitivity: 0.2,
				// },
				speed: 100,  // 300
				freeModeMomentumRatio: 0.2,  // 1
				observer: true,
				observeParents: true,
				spaceBetween:0,
				watchOverflow:true,
				loop: false
			},
			using: function() {
				if ( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				this.slide = new Swiper(this.els, this.opt);
			}
		},
		set:function(update){
			$(".select-pop").each(function(){
				if( !$(this).find(".btsel").length ) {
					$(this).prepend('<button class="btsel" type="button"></button>');
				}
				if( !$(this).is(".set").length ) {
					$(this).addClass("set");
				}
				var $btsel = $(this).find(".btsel");
				$btsel.addClass("is-tit");			
				var txt = $(this).find(".slist option:selected").text() ;
				var dis = $(this).find(".slist").prop("disabled");
				var list = [];
				$(this).find(".slist option").each(function(){
					var isDis = $(this).prop("disabled");
					list.push( { v:$(this).val() ,t:$(this).text() ,d:isDis } );
				});
				// console.log(list ,txt ,dis);
				if (update == "update") {
					tit = $(this).find(".slist>option:selected").text();
				}else{
					tit = $(this).find(".slist").data("select-title")|| $(this).find(".slist>option:selected").text();
				}
				$btsel.html('<i class="txt">'+txt+'</i>');

				if( dis == true ) {
					$btsel.prop("disabled",true);
				}else{
					$btsel.prop("disabled",false);
				}
			});
		},
		open:function(name,tit,list,sel){
			// console.log(name,tit,list,sel);
			$(".pop-select.on").remove();
			if ( $(".pop-select:visible").length ) { return; }

			$("[name='"+name+"']").find("option").each(function(){
				var isDis = $(this).prop("disabled");
				list.push( { v:$(this).val() ,t:$(this).text() ,d:isDis } );
			});
			// console.log(list);

			var blist="";
			for(var i in list) {
				// console.log(list[i].d);
				var dis;
				if (list[i].d == true) {
					dis = "disabled";
				}else{
					dis = "";
				}
				blist += '<li class="swiper-slide '+ dis +'"><button type="button" '+ dis +' value="'+list[i].v+'">'+list[i].t+'</button></li>';
			}
			var lyPop =
			'<article class="pop-select" data-selt-pop="'+name+'">' +
			'	<div class="pbd">' +
			//'		<div class="phd"><h3 class="ptit">'+tit+'</h3></div>' +
			'		<button type="button" class="btn-sel-Close">닫기</button>' +
			'		<div class="pct">' +
			'			<main class="poptents">' +
			'				<div class="swiper-container slide">' +
			'					<ul class="swiper-wrapper list">'+blist+'</ul>' +
			'				</div>' +
			'				<div class="btsbot btn-set">' +
			'					<button type="button" class="btn a lg btcom">완료</button>' +
			'				</div>' +
			'			</main>' +
			'		</div>' +
			'	</div>' +
			'</article>';
			$("body").append(lyPop);
			this.sld.using();
			$("[name='"+name+"']").closest(".select-pop").find(".btsel").addClass("open");
			var _this = this;
			$(".pop-select").fadeIn(100,function(){	
				$(this).addClass("on").attr("tabindex","0").focus();
				 // console.log(name, sel);
				$("[data-selt-pop='"+name+"'] .list button[value='"+sel+"']").addClass("active").closest("li").addClass("active");
				var activeIdx = $("[data-selt-pop='"+name+"'] .list>li.active").index();
				// console.log(   activeIdx  );
				_this.sld.slide.slideTo(activeIdx);
			});
			_this.sld.slide.on("init slideChangeTransitionEnd",function(){
				var isActDis = $("[data-selt-pop='"+name+"'] .list>li.swiper-slide-active").is(".disabled");
				// console.log("END" , isActDis);
				if (isActDis == true) {
					$("[data-selt-pop='"+name+"'] .btcom").prop("disabled",true);
				}else{
					$("[data-selt-pop='"+name+"'] .btcom").prop("disabled",false);
				}
			});
			ui.lock.using(true);
			$("body").addClass("is-popselt");
		},
		close:function(){
			var id = $(".pop-select:visible").data("selt-pop");
			$(".pop-select").removeClass("on").fadeOut(100,function(){
				$(this).remove();
				ui.lock.using(false);
			});
			$("select[name="+id+"]").closest(".select-pop").find(".btsel").removeClass("open");
			$("body").removeClass("is-popselt");
			console.log( "select[name="+id+"] 값 = " ,  $("select[name="+id+"]").val() );
		}
	},
	popSelect:{ // 셀렉트 메뉴 팝업
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;

			$(document).on("click", ".popSelect", function(e) {
				$(this).find(".btnPopClose").trigger("click");
			}).on("click", ".popSelect>.pbd", function(e) {
				e.stopPropagation();
			});


			$(document).on("click",".selectPop .btSel",function(){
				var $pop = $(this).closest(".selectPop");
				var name = $pop.find(".sList").attr("name");
				var tit =  $pop.find(".sList").data("select-title") || "옵션선택";
				var sel =  $pop.find(".sList").val();
				var list = [];
				$pop.find(".sList option").each(function(){
					list.push( { v:$(this).val() ,t:$(this).text() } );
				});
				// console.log(name,tit,list,sel);
				_this.open(name,tit,list,sel);
			});


			$(document).on("click",".popSelect .list>li button",function(e){
				var sel = $(this).attr("value");
				var txt = $(this).text();
				var name =  $(this).closest(".popSelect").data("select-pop");
				console.log(name,sel);
				$("select[name='"+name+"']>option[value='"+sel+"']").prop("selected",true);
				$("select[name='"+name+"']").val(sel).prop("selected",true);
				$("select[name='"+name+"']").closest(".selectPop").find(".btSel").text(txt) ;
				$("select[name='"+name+"']").trigger("change");
				_this.close();
			});

			$(document).on("click",".popSelect .btnPopClose",function(){
				_this.close();
			});
		},
		set:function(){
			$(".selectPop").each(function(){
				if( !$(this).find(".btSel").length ) {
					$(this).prepend('<button class="btSel" type="button"></button>');
				}
				var $btSel = $(this).find(".btSel");
				var tit = $(this).find(".sList").data("select-title") || "옵션선택";
				var sel = $(this).find(".sList").val();
				var txt = $(this).find(".sList option:selected").text() || tit;
				var dis = $(this).find(".sList").prop("disabled");
				var list = [];
				$(this).find(".sList option").each(function(){
					list.push( { v:$(this).val() ,t:$(this).text() } );
				});
				// console.log(list ,sel ,txt ,dis);
				$btSel.text(txt);
				if( dis==true ) {
					$btSel.prop("disabled",true);
				}else{
					$btSel.prop("disabled",false);
				}
			});
		},
		open:function(name,tit,list,sel){
			console.log(name,tit,list,sel);
			if ( $(".popSelect:visible").length ) { return; }
			var blist="";
			for(var i in list) {
				blist += '<li><button type="button" value="'+list[i].v+'">'+list[i].t+'</button></li>';
			}
			var lyPop =
			'<article class="popSelect" data-select-pop="'+name+'">' +
				'<div class="pbd">' +
					'<div class="phd"><h3 class="tit">'+tit+'</h3></div>' +
					'<button type="button" class="btnPopClose">닫기</button>' +
					'<div class="pct">' +
						'<main class="poptents">' +
							'<ul class="list">'+blist+'</ul>' +
						'</main>' +
					'</div>' +
				'</div>' +
			'</article>';
			$("body").append(lyPop);

			$(".popSelect").fadeIn(100,function(){	
				$(this).addClass("on");
				 // console.log(name, sel);

				$("[data-select-pop='"+name+"'] .list button[value='"+sel+"']").addClass("active");
			}).attr("tabindex","0").focus();
			ui.lock.using(true);
		},
		close:function(){
			var id = $(".popSelect:visible").data("select-pop");
			$(".popSelect").removeClass("on").fadeOut(100,function(){
				$(".popSelect").remove();
				ui.lock.using(false);
			});
			$("select[name="+id+"]").closest(".selectPop").find(".btSel").attr("tabindex","0").focus();
		}
	},
	popSelMul:{ // 다중선택 팝업
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;

			$(document).on("click", ".popSelectMul", function(e) {
				$(this).find(".btnPopClose").trigger("click");
			}).on("click", ".popSelectMul>.pbd", function(e) {
				e.stopPropagation();
			});

			$(document).on("click",".select-mul .btSel",function(){
				var name = $(this).closest(".select-mul").data("select-name");
				var tit =  $(this).closest(".select-mul").data("select-title") || "옵션선택";
				var list = [];
				$(this).closest(".select-mul").find(".sList input").each(function(){
					list.push( { v:$(this).is(":checked") ,t:$(this).closest("li").find(".txt").text(), a:$(this).is(".chkAll") } );
				});
				// console.log(list);
				_this.open(name,tit,list);
			});
			
			$(document).on("click",".popSelectMul .btnPopClose",function(){
				var $pop = $(this).closest(".popSelectMul");
				var id   = $pop.data("select-pop");
				var sel  = $pop.find("input:checked").val();
				var txt  = $pop.find("input:checked").next(".txt").text();
				var tit  = $pop.find(".phd .tit").text();
				_this.close(id,sel,txt,tit);
			});
			$(document).on("click",".popSelectMul .btnCom",function(){
				var $pop = $(this).closest(".popSelectMul");
				var id   = $pop.data("select-pop");
				var sel  = $pop.find("input:checked").val();
				var txt  = $pop.find("input:checked").next(".txt").text();
				_this.com(id,sel,txt);
			});

			$(document).on("click",".popSelectMul .list button",function(){

				var $pop = $(this).closest(".popSelectMul");
				var $lst = $(this).closest(".list");
				var $li  = $(this).closest("li");

				if( $li.is(".active") ) {
					$li.removeClass("active");
				}else{
					$li.addClass("active");
				}

				var chkall = $lst.find("li.chkAll").length;
				var chklis = $lst.find("li:not('.chkAll')").length;
				var chkeds = $lst.find("li.active:not('.chkAll')").length;
				// var chkeds2 = $lst.find("li.active").length;

				if ( chkall ) { // 전체선택 있는경우
					// console.log(chkeds , chklis);
					if( $li.is(".chkAll") ) {
						if( $li.is(".active") ){
							$lst.find("li.active:not('.chkAll')").removeClass("active");
							$pop.find(".btnCom").prop("disabled",false);
							return;
						}else{
							$lst.find("li.active:not('.chkAll')").addClass("active");
							// console.log("전체 비활");
							$pop.find(".btnCom").prop("disabled",true);
						}
					}else{
						if( chkeds == 0 ) {
							$pop.find(".btnCom").prop("disabled",true);
						}else{
							$pop.find(".btnCom").prop("disabled",false);
						}
					}

					if (chkeds == chklis ) {
						$lst.find("li.chkAll").addClass("active");
						$lst.find("li.active:not('.chkAll')").removeClass("active");
					}else{
						$lst.find("li.chkAll").removeClass("active");
					}

				}else{ // 전체선택 없는경우
					// console.log("일반" , chkeds);
					if( chkeds == 0 ) {
						$pop.find(".btnCom").prop("disabled",true);
					}else{
						$pop.find(".btnCom").prop("disabled",false);
					}
				}
				// console.log("dd" , chkeds);
			});

		},
		set:function(){
			$(".select-mul").each(function(){
				// var _this = this;
				if( !$(this).find(".btSel").length ) {
					$(this).prepend('<button class="btSel" type="button"></button>');
				}
				var $btSel = $(this).find(".btSel");
				var tit = $(this).data("select-title") || "옵션선택";
				var ttt = "";
				var dis = $(this).data("select-disabled");
				$(this).find("input:checked").each(function(){
					var tt = $(this).next(".txt").text();
					// console.log(tt);
					ttt += '<span>'+tt+'</span>';
				});
				if( !$(this).find("input:checked").length ) {
					$btSel.html(tit);
				}else{
					$btSel.html(ttt);
				}
				if (dis==true) {
					$btSel.prop("disabled",true);
				}else{
					$btSel.prop("disabled",false);
				}
			});
		},
		com:function(id){
			var ttt = "";
			$("[data-select-pop="+id+"] .list li").each(function(i){
				i++;
				// console.log(	i,	$(this).prop("checked")  );
				var chk = $(this).is(".active");
				var $ckbox = $("[data-select-name="+id+"] .sList li:nth-child("+i+") input");
				$ckbox.prop("checked",chk);

				if( $ckbox.prop("checked") ) {
					$ckbox.trigger("click");
					$ckbox.trigger("click");
				}

				if( $(this).is(".active") ){
					var tt = $(this).find("button").text();
					// console.log(tt);
					ttt += '<span>'+tt+'</span>';
				}
				// console.log( $ckbox.attr("name") , $ckbox.prop("checked")  );
			});
			$("[data-select-name="+id+"]").find(".btSel").html(ttt).attr("tabindex","0").focus();

			$("[data-select-name="+id+"] .btSel").trigger("click");	
			this.close(id);
		},
		open:function(name,tit,list){
			if( $(".popSelectMul:visible").length ) { return; }
			var blist = "";
			var cls,all;
			for(var i in list) {
				list[i].v ? cls = "active"  : cls = "";
				list[i].a ? all = " chkAll" : all = "";
				blist += '<li class="'+cls+all+'"><button type="button">'+list[i].t+'</button></li>';
			}
			var lyPop =
			'<article class="popSelectMul" data-select-pop="'+name+'">' +
				'<div class="pbd">' +
					'<div class="phd"><h3 class="tit">'+tit+'</h3></div>' +
					'<button type="button" class="btnPopClose">닫기</button>' +
					'<div class="pct">' +
					'<main class="poptents">' +
						'<ul class="list">'+blist+'</ul>' +
					'</main>' +
					'</div>' +
					'<button type="button" class="btn a sm btnCom">완료</button>' +
				'</div>' +
			'</article>';
			$("body").append(lyPop);

			$(".popSelectMul").fadeIn(100,function(){																			
				$(this).addClass("on");
				// console.log("오픈");
				if( $("[data-select-pop="+name+"] .list li.active").length == 0 ){
					$("[data-select-pop="+name+"] .btnCom").prop("disabled",true);
				}
			}).attr("tabindex","-1").focus();
			ui.lock.using(true);
		},
		close:function(id) {
			$(".popSelectMul").removeClass("on").fadeOut(100,function(){
				$(this).remove();
			});
			$("[data-select-name="+id+"] .btSel").attr("tabindex","0").focus();
			ui.lock.using(false);
		}
	},
	popLayer:{ // 레이어팝업
		init: function() {
			var _this = this;
			$(document).on("click", ".popLayer:not(.win) .btnPopClose", function() {
				var id = $(this).closest(".popLayer").attr("id");
				// console.log(id);
				if (_this.callbacks[id].hash) {
					window.history.back();
				}else{
					_this.close(id);
				}
			});

			$(document).on("click", ".popLayer", function(e) {
				// $(this).find(".btnPopClose").trigger("click");
				var id = $(this).closest(".popLayer").attr("id");
				if ( $(e.target).is(".popLayer") ) {
					_this.close(id);
				}
			});

			// $(document).on("click", ".popLayer>.pbd , .btnPopClose", function(e) {
			// 	e.stopPropagation();
			// });

			if( $(".popLayer.win").length ) {
				var id = $(".popLayer.win").attr("id");
				_this.open(id);
			}
			// $(window).on("load resize",this.resize);
			visualViewport.onresize = function(){
				_this.resize();
				console.log("visualViewport.onresize");
			};
			$(window).on("hashchange",function(){
				// _this.history(true);
			});
			window.onpopstate = history.onpushstate = function(e) {
				_this.history(true);
			};

			// 레이어팝업내에서 입력시 스크롤 조정
			var elsInput =  ".popLayer:visible input:not(input:radio, input:checkbox) ,"+
							".popLayer:visible textarea ,"+
							".popLayer:visible .iscPosit";
			$(document).on("click", elsInput  , function(e) {
				var els = $(this);
				var id = $(this).closest(".popLayer").attr("id");
				window.setTimeout(function(){
					var myTop = els.offset().top - $("#"+id+" .phd").outerHeight() - $(window).scrollTop() -  _this.scroll[id].y - $("#"+id+">.pbd").position().top - 10;
					var myMax = Math.abs( _this.scroll[id].maxScrollY );
					console.log(myTop , myMax , _this.scroll[id].y , $("#"+id+" .phd").position().top );
					if ( myTop >= myMax ) { myTop = myMax ; }
					_this.scroll[id].scrollTo(0,-myTop,10);
					ui.popLayer.resize();
					ui.popLayer.refresh();
				},1);
			});

		},
		history:function(){
			var _this = this;
			var h_prev = _this.openPop ; 
			_this.openPop = location.hash.replace("#pop=","").split(",");
			if ( _this.openPop == "" ) { _this.openPop = [];	}
			var h_now = _this.openPop ;		
			console.log( h_prev , h_now );
			if( h_prev > h_now ){
				result = h_prev.filter(function (a) {
 					return h_now.indexOf(a) === -1;
				});
				// console.log("뒤로옴" , result[0] ,h_prev , h_now  );
				_this.close(result[0],{set:true});
			}else{
				// console.log("앞으로");
			}
		},
		openPop:[],
		callbacks:{},
		open: function(id,params) {
			// console.log(id,params);
			var _this = this;

			if ( $("#" + id).length  <= 0  ) return ;   // id 호출팝업이 없으면 리턴

			_this.opt = $.extend({
				ocb: null ,
				ccb: null,
				direct: "none",
				zIndex: "",
				hash: false, // true  //  뒤로가기 버튼으로 팝업닫기 옵션
			}, params); 

			_this.callbacks[id] = {} ;
			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;
			_this.callbacks[id].hash = _this.opt.hash;
			// console.log(_this.callbacks[id].hash);
			if (_this.callbacks[id].hash) {

				if ( $(".popLayer:visible").length <= 0 &&  location.href.split("#")[1] != undefined && location.href.split("#pop=")[1] != undefined ) {  //
					_this.openPop = [];
					window.history.pushState({}, 'pop', '#' );
				}

				_this.openPop.push(id);
				window.history.pushState({}, 'pop', '#pop='+_this.openPop );
			}

			ui.lock.using(true);
			$("body").addClass("is-pop "+ "is-"+id);
			if( $("#" + id).find(".pbt").length ) {
				$("body").addClass("is-pop-pbt");
			}

			$("#" + id).addClass(_this.opt.direct).css({ zIndex: _this.opt.zIndex }).fadeIn(10,function(){
				if(_this.callbacks[id].open)  _this.callbacks[id].open();
				$(this).addClass("on").attr("tabindex","0").focus(); 
				_this.resize();
			});
			
			window.setTimeout(function(){
				_this.resize(id);
				_this.lyScroll(id);
			});

		},
		close: function(id,params) {
			var _this = this;
			_this.opts = $.extend({
				ccb: null,
				set: null
			}, params);
			// console.log(_this.callbacks[id].hash , _this.opt.set);	
		
			// console.log(  _this.callbacks[id].hash , $("#"+id+":visible").length  );
			if( _this.callbacks[id].hash && _this.callbacks[id].hash != true && $("#"+id+":visible").length  ) {  // 해쉬 
				console.log("back");
				window.history.back();
				return;
			}
			
			delete _this.scroll[id];
			// console.log( _this.scroll[id] + " close end"); // 팝업 닫을때 스크롤객체 지움;

			$("#"+id).removeClass("on").on(ui.transitionend,function(){
				_this.resize();
				$(this).hide().removeClass(_this.opt.direct);

				// if( typeof _this.callbacks[id].close == "function" ){ _this.callbacks[id].close(); }
				try{ _this.callbacks[id].close(); }catch(error){}
				// if( typeof _this.closOpt.ccb == "function") { _this.closOpt.ccb(); }
				try{ _this.closOpt.ccb(); }catch(error){}

				if( !$(".popLayer:visible").length ){ 
					ui.lock.using(false);
					$("body").removeClass("is-pop").removeClass("is-"+id);
					$("body").removeClass("is-pop-pbt");
				}
				$(this).off(ui.transitionend);

			}).css({"z-index":""});
		},
		resize:function(id){
 			$(".popLayer:not(.win):visible").each(function(){
				var $pop = $(this);
				var pctnH =  $pop.outerHeight();
				var pbtnH =  $pop.find(".pbt:visible").outerHeight() || 0 ;
				pctnH = pctnH - ( $pop.find(".phd").outerHeight() || 0 );
				if( $pop.is(".a") ){ $pop.find("div.pct").css({"height": pctnH - pbtnH  }); }
				if( $pop.is(".b") ){ $pop.find("div.pct").css({"max-height": pctnH - pbtnH - 140 });}
				if( $pop.is(".c") ){ $pop.find("div.pct").css({"max-height": pctnH - 20 });}
			 });
		},
		scroll:{},
		lyScroll: function(id) {
			
			bounce = ui.isUA("Mac OS") ?  true : false;

			if( this.scroll[id] == undefined ) {
				this.scroll[id] = new IScroll('#'+id+'>.pbd>.pct', {
					// click:true,
					mouseWheel: true,
					probeType: 3,
					preventDefaultException: {tagName:/.*/},
					bounce:true,
					// bounceTime: 600,
					// scrollbars: true,
					// interactiveScrollbars: true,
					// shrinkScrollbars: 'scale',
					//fadeScrollbars: true
				});
				//  ui.popLayer.scroll.popLayerSample1.scrollTo(0, ui.popLayer.scroll.popLayerSample1.maxScrollY, 400);
				this.scroll[id].on('scrollEnd', function () {
					if( this.maxScrollY == this.y ){						
						// console.log("끝",this.maxScrollY , this.y);
						// $('#'+id+'>.pbd>.pct .poptents').append('<p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p><p>내용</p>')
						// ui.popLayer.refresh(id);
					}
				});
			}
		},
		refresh:function(){
			var iscr = Object.keys(this.scroll);
			for (var key in iscr) {
				var idx = iscr[key];
				console.log(idx, iscr);
				this.scroll[idx].refresh(); 
			}
		}
	},
	popFrame:{ // 팝프레임
		init:function(){
			var _this = this;
			$(document).on("click", ".popFrame .btnPopClose", function() {
				var id = $(this).closest(".popFrame").attr("id");
				
				_this.close(id);
				
			});
		},
		sct:0,
		callbacks:{},
		open:function(id,params){
			_this = this;

			if ( $("#" + id).length  <= 0  ) return ;   // id 호출팝업이 없으면 리턴

			_this.opt = $.extend({
				ocb: null ,
				ccb: null,
				zIndex: "",
			}, params); 

			_this.callbacks[id] = {} ;
			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;		


			this.sct = $(window).scrollTop();
			$(window).scrollTop( 0 );
			console.log(this.sct);
			// ui.lock.using(true);
			$("#" + id).css({ zIndex: _this.opt.zIndex });
			$("#" + id).show(0,function(){
				if(_this.callbacks[id].open)  _this.callbacks[id].open();			
				$(this).addClass("on");
			});
			$("body").addClass("isFrame");
		},
		close:function(id){
			$("body").removeClass("isFrame");
			$("#" + id).hide(0,function(){
				if( !$(".popFrame:visible").length ) ui.lock.using(false);
				try { 
					_this.callbacks[id].close(); 
				} catch (error) { }
			});
			console.log(this.sct);
			$(window).scrollTop( this.sct );
		}
	},
	popWin:{ // 윈도우팝업
		init:function(){
			var els = "[data-ui='pop-window']";
			$(document).on("click",els,function(e){
				e.preventDefault();
				var $this = $(this);
				var _href = $this.attr("href");
				var _width = $this.data("width");
				var _height = $this.data("height");
				var _left = $this.data("left");
				var _top = $this.data("top");
				var _scroll = $this.data("scroll");
				ui.popWin.open(_href, _width, _height, _scroll ,_left, _top );
			});
			$(els).attr("target","_blank");
		},
		open:function(_href, _width, _height, _scroll, _left, _top){
			if (_scroll==false){ _scroll="no"; }
			if (_scroll==true ){ _scroll = "yes";}
			if (_scroll==undefined ) { _scroll = "yes";}
			if (_left==undefined) { _left = parseInt((screen.width - _width) *0.5, 10); }
			if (_top==undefined) { _top = parseInt((screen.height - _height) *0.5, 10); }
			var _name = "popup" + _href;
			var modalWin =  window.open(_href, _name, "top="+ _top +", left="+ _left +", width="+ _width +", height="+ _height +", scrollbars="+ _scroll +", toolbar=no, menubar=no, location=no, resizable=yes, status=no");
			modalWin.focus();
		}
	},
	listMore:{ // 더 불러오기 
		active: false,
		init: function(paramCallback) {
			this.active = true;
			this.moreCallback = paramCallback;
			this.using();
			this.loading = $(".uiLoadMore");
			this.moreCallback();
		},
		using: function() {
			// 페이지 하단 도착
			$(window).on("scroll load", function() {
				var sct = Math.ceil( $(window).scrollTop() + $(window).outerHeight() + $(".uiLoadMore:visible").outerHeight() + 30 );
				var cnt = $(document).outerHeight() ;
				// console.log(cnt,sct);
				$("#debug").html(cnt +"/"+ sct  );
				if (cnt <= sct ) {
					$("#debug").html(cnt +"/"+ sct +"/ 바닥" );
					ui.listMore.moreCallback();
				}
			});
		},
		removeEvent: function() {
			$(window).off("scroll");
			this.loading.hide();
		}
	},
	listLoad:{ // 더 불러오기 
		init: function() {
			this.loading = $(".uiLoadMore");
		},
		attach: function() {
			this.loading.removeClass("error");
			this.loading.addClass("active");
		},
		detach: function() {
			this.loading.removeClass("active");
		},
		error: function() {
			this.loading.addClass("error");
			$(window).off("scroll");
			this.detach();
			ui.listMore.active = true;
		}
	},
	cookie:{ // 쿠키 설정
		set:function(cname, cvalue, exdays){
			var d = new Date();
			d.setTime( d.getTime() + (exdays * 60 * 60 * 1000) );
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		get:function(cname){
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		del:function(cname){
			document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
		}
	}
};


// ui.init(); 구동시점은 html include 완료시 
$(document).ready(function(){
	if ( typeof uiHtml  == "undefined" ) {
		ui.init();
		console.log("ui.init();");
	}else{
		ui.html.include();
		ui.times = setInterval(function(){ // console.log("uiHtml" ,  incNums , uiHtml.incCom);
			if (ui.html.incCom) {
				clearInterval(ui.times);
				ui.init();
				console.log("ui.init();");
			}
		});
	}
});




// function css_browser_selector(u) {
// 	var ua = u.toLowerCase(),
// 		is = function(t) {
// 			return ua.indexOf(t) > -1;
// 		},
// 		g = 'gecko',
// 		w = 'webkit',
// 		s = 'safari',
// 		c = 'chrome',
// 		o = 'opr',
// 		m = 'mobile',
// 		v = 0,
// 		r = window.devicePixelRatio ? (window.devicePixelRatio + '').replace('.', '_') : '1';
// 	var res = [
// 		/* IE */
// 		(!(/opera|webtv/.test(ua)) && /msie\s(\d+)/.test(ua) && (v = RegExp.$1 * 1)) ?
// 			('ie ie' + v + ((v == 6 || v == 7) ?
// 				' ie67 ie678 ie6789' : (v == 8) ?
// 				' ie678 ie6789' : (v == 9) ?
// 				' ie6789 ie9m' : (v > 9 ) ?
// 				' ie9m' : '')) :
// 			/* EDGE */
// 			(/edge\/(\d+)\.(\d+)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
// 			'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m edge' :
// 				/* IE 11 */
// 				(/trident\/\d+.*?;\s*rv:(\d+)\.(\d+)\)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
// 					'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m' :
// 					/* FF */
// 					(/firefox\/(\d+)\.(\d+)/.test(ua) && (re = RegExp)) ?
// 						g + ' ff ff' + re.$1 + ' ff' + re.$1 + '_' + re.$2 :
// 						is('gecko/') ? g :
// 							/* Opera */
// 							is(o) ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 :
// 								(/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) :
// 								/* K */
// 								is('konqueror') ? 'konqueror' :
// 									/* Black Berry */
// 									is('blackberry') ? m + ' blackberry' :
// 										/* Chrome */
// 										(is(c) || is('crios')) ? w + ' ' + c :
// 											/* Iron */
// 											is('iron') ? w + ' iron' :
// 												/* Safari */
// 												!is('cpu os') && is('applewebkit/') ? w + ' ' + s :
// 													/* Mozilla */
// 													is('mozilla/') ? g : '',
// 		/* Android */
// 		is('android') ? m + ' android' : '',
// 		/* Tablet */
// 		is('tablet') ? 'tablet' : '',
// 		/* Machine */
// 		is('j2me') ? m + ' j2me' :
// 			is('ipad; u; cpu os') ? m + ' chrome android tablet' :
// 				is('ipad;u;cpu os') ? m + ' chromedef android tablet' :
// 					is('iphone') ? m + ' ios iphone' :
// 						is('ipod') ? m + ' ios ipod' :
// 							is('ipad') ? m + ' ios ipad tablet' :
// 								is('mac') ? 'mac' :
// 									is('darwin') ? 'mac' :
// 										is('webtv') ? 'webtv' :
// 											is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') :
// 												is('freebsd') ? 'freebsd' :
// 													(is('x11') || is('linux')) ? 'linux' : '',
// 		/* Ratio (Retina) */
// 		(r != '1') ? ' retina ratio' + r : '',
// 		'js portrait'].join(' ');
// 	if(window.jQuery && !window.jQuery.browser) {
// 		window.jQuery.browser = v ? {msie: 1, version: v} : {};
// 	}
// 	return res;
// }
// (function(d, w) {
// 	var _c = css_browser_selector(navigator.userAgent);
// 	var h = d.documentElement;
// 	h.className += ' ' + _c;
// 	var _d = _c.replace(/^\s*|\s*$/g, '').split(/ +/);
// 	w.CSSBS = 1;
// 	for(var i = 0; i < _d.length; i++) {
// 		w['CSSBS_' + _d[i]] = 1;
// 	}
// 	var _de = function(v) {
// 		return d.documentElement[v] || d.body[v];
// 	};
// 	if(w.jQuery) {
// 		(function($) {
// 			var p = 'portrait', l = 'landscape';
// 			var m = 'smartnarrow', mw = 'smartwide', t = 'tabletnarrow', tw = 'tabletwide', ac = m + ' ' + mw + ' ' + t + ' ' + tw + ' pc';
// 			var $h = $(h);
// 			var to = 0, cw = 0;

// 			/* ie7 cpu 100% fix */
// 			function CSSSelectorUpdateSize() {
// 				if(to != 0) return;
// 				try {
// 					var _cw = _de('clientWidth'), _ch = _de('clientHeight');
// 					if(_cw > _ch) {
// 						$h.removeClass(p).addClass(l);
// 					} else {
// 						$h.removeClass(l).addClass(p);
// 					}
// 					if(_cw == cw) return;
// 					cw = _cw;
// 					//clearTimeout(to);
// 				} catch(e) {
// 				}
// 				to = setTimeout(CSSSelectorUpdateSize_, 100);
// 			}

// 			function CSSSelectorUpdateSize_() {
// 				try {
// 					$h.removeClass(ac);
// 					$h.addClass(
// 						(cw <= 360) ? m :
// 							(cw <= 640) ? mw :
// 								(cw <= 768) ? t :
// 									(cw <= 1024) ? tw : 'pc'
// 					);
// 				} catch(e) {
// 				}
// 				to = 0;
// 			}

// 			if(w.CSSBS_ie) {
// 				setInterval(CSSSelectorUpdateSize, 1000);
// 			} else {
// 				$(w).on('resize orientationchange', CSSSelectorUpdateSize).trigger('resize');
// 			}
// 			$(w).on("load",function(){
// 				CSSSelectorUpdateSize();
// 			});
// 		})(w.jQuery);
// 	}
// })(document, window);


// if(window.CSSBS_ios) {
// 	//console.log(window.CSSBS_ios);
// }
