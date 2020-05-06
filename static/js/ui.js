//*******************************************//
// 김기현 : kimkee@naver.com    
// url : http://kimkee.myds.me:8000
// update : 2019-06-12
//*******************************************//

var ui = {
	init:function(){
		this.cm.init();
		this.ly.init();
		this.form.init();
		this.accd.init();
		this.tog.init();
		this.tab.init();
		// this.tabs.init();
		this.dropDown.init();
		this.popLayer.init();
		this.slides.init();
		this.datePick.init();
		this.listLoad.init();
	},
	cm:{ // 공통
		init:function(){
			// console.log("ui.mo.js init");
			// $("#contain").hammer().on("swipeleft swiperight", function(e) {
			// 	// console.log( e.type );
			// 	if (e.type=="swiperight" && ui.movePage.prev) {
			// 		ui.movePage.prev(e.type);
			// 	}
			// 	if (e.type=="swipeleft" && ui.movePage.next ) {
			// 		ui.movePage.next(e.type);
			// 	}
			// });
		}
	},
	movePage:{ // 스와이프로 이동할 페이지
		prev:function(e){console.log("<< 이전 페이지 가기 ]] "+e);},
		next:function(e){console.log("[[ 다음 페이지 가기 >>"+e);}
	},
	isUA:function(t){
		t = t.split(" ");
		for (let i = 0; i < t.length; i++) {
			result = navigator.userAgent.indexOf(t[i]) > -1 ? true : false ;
			if (!result) {
				return result ;
			}
		}
		return result ;
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
			$("#contain").length && this.using();
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
			'</div>'
		,
		using:function(){
			var _this = this;
			pullToRefresh({
				container: document.querySelector('#contain'),
				animates: ptrAnimatesMaterial2,
				refresh: function() {
					return new Promise( function(resolve){
						setTimeout(resolve, 1500)
						setTimeout(function(){
							_this.pullCallback();
						}, 1500)
					})
				}
			})
		}
	},
	ly:{ // 레이아웃
		init:function(){
			if ( $("#contain").length ) {
                var cls = $("#contain").attr("class").replace("contain","");
                $("body").addClass(cls);
            }
            $(window).on("load resize", this.resize );
			
			this.floating.init();
        },
		floating:{
			init:function(){
				this.event();
			},
			event:function(){
				$(document).on("click", ".floatNav button.top", this.using );
				$(document).on("click", ".floatNav button.refresh", function(){
					location.reload();
				} );
				$(window).on("scroll load", this.top );
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
	form:{  //  폼요소
		init:function(){
			this.attach();
			this.select();
			this.chkall();
			this.spinner.init();
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
		attach:function(){

			$("img").on("error",function(){
				$(this).attr("src","../../img/temp/sss.png");
			});
			$(document).on("change", "[data-ui='attach'] .fileButton .fileInput", function() {
				var $elsAdd = $(this).closest("[data-ui='attach']");
				var fUrl = (this.value).split("\\"),
					fName = fUrl[fUrl.length - 1];
				var locVar = $elsAdd.find(".file").length;
				if (!locVar) {
					// console.log("132132");
					if( $elsAdd.hasClass("ui-add-pic") ) {
						var lcEls = 
						'<span class="file">'+
						'    <img class="img" src="" alt="" onerror="this.src=\'../../img/common/blank.png\'" >'+
						'    <button type="button" class="delete">삭제</button>'+
						'</span>'
					}else{
						var lcEls = 
						'<span class="file">'+
						'    <span class="loc"></span>'+
						'    <button type="button" class="delete">삭제</button>'+
						'</span>'
					}

					$elsAdd.append( lcEls );
				}
				
				$elsAdd.addClass("on");
				$elsAdd.find(".file .loc").text(fName);
				$elsAdd.find(".file .img").attr("src",this.value);
			});
			$(document).on("click", "[data-ui='attach'] .file .delete", function() {
				var $elsAdd = $(this).closest("[data-ui='attach']");
				$elsAdd.find(".fileButton .fileInput").val("");
				$elsAdd.find(".file").remove();
				$elsAdd.find(".file .loc").text("");
				$elsAdd.removeClass("on");
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
				$(".uiSpinner").length && this.using();
				$(".uiSpinner").length && this.stat();
			},
			using:function(){
				var _this = this;
				$(".uiSpinner button").on("click",function(){
					var els = $(this).closest(".uiSpinner");
					var n = els.find("input");
					var nv = parseInt( els.find("input").val() );
					var bt = $(this).attr("class");
					//console.log(mx , nv);
					if( bt==="p" ){
						n.val( nv + 1 ) ;
					}
					if( bt==="m" ){
						n.val( nv - 1 ) ;
					}
					_this.stat();
				});
			},
			stat:function(){
				$(".uiSpinner").each(function(){
					var els = $(this).closest(".uiSpinner");
					var nv 	= els.find(".n").val();
					var max = parseInt(  els.data("max") );
					//console.log(nv , max);
					if( nv <= 1){
						els.find(".m").attr("disabled",true);
					}
					if( nv > 1){
						els.find(".m").attr("disabled",false);
					}
					if( nv >= max){
						els.find(".p").attr("disabled",true);
					}
					if( nv < max){
						els.find(".p").attr("disabled",false);
					}
					if(nv == 0){
						els.find(".m").attr("disabled",true);
						els.find(".p").attr("disabled",true);
					}
				});
			}
		},
		star:{
			init:function(){
				var _this =  this;
				$(".uiStar").length && this.using();
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
	loading: { // 로딩중..
		show: function () {
			var els = '<div class="loadingPage"><em></em></div>';
			$("body").prepend(els);
		},
		hide: function () {
			$(".loadingPage").remove();
		}
	},
	accd: { // 아코디언 UI
		init: function() {
			$(window).on("load", this.using);
			$(window).on("load", this.tbl);
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
				if (type === "tog") {
					if ($pnt.children(".cBox").is(":visible")) {
						$pnt.children(".cBox").slideUp(100);
						$pnt.removeClass("open");

					} else {
						$pnt.addClass("open").children(".cBox").slideDown(100);
					}
				}
				if (type === "accd") {
					$(this).closest(".uiAccd").find(">li").removeClass("open").not("li.except").children(".cBox").slideUp(100);
					if ($pnt.children(".cBox").is(":hidden")) {
						$pnt.addClass("open").children(".cBox").slideDown(100);
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
	datePick:{ // 달력피커 jQuery-ui
		init:function(){
			$("input.datepicker").length && this.using(); 
				
			$("input.datepicker").on("click",function(){
				$(this).next(".ui-datepicker-trigger").trigger("click");
			});
			$("input.datepicker").on("focus",function(){
				$(this).blur();
			});
		},
		wkThis:function(){  // 일주일 단위선택 용 하이라이트
			var idx = $(".ui-datepicker").find(".ui-datepicker-current-day").index();
			var $td = $(".ui-datepicker").find(".ui-datepicker-current-day");
			if ( idx >= 1 ) { // 월화수목금토 선택시
				// console.log(idx)
				$td.closest("tr").find("td:not(:first-child)").addClass("activeDays");
				$td.closest("tr").next("tr").find("td:first-child").addClass("activeDays");
			}else{ // 일요일 선택시
				// console.log(idx);
				$td.addClass("activeDays");
				$td.closest("tr").prev("tr").find("td:not(:first-child)").addClass("activeDays");
			}
		},
		using:function(){
			$("input.datepicker").datepicker({
				// minDate: '-3M',
      			// maxDate: '+28D',
				showOn: "button",
				changeYear:true ,
				changeMonth:true,
				buttonText: "달력",
				showMonthAfterYear: true,
				dateFormat:"yy-mm-dd",
				yearRange: 'c-100:c+10',
				dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				beforeShow: function(els) {
					ui.lock.using(true);
					$(".ui-datepicker").wrap('<div class="uiDatePickWrap"></div>');
					var sted = $(els).closest(".uiDate").attr("class").replace(" ","").replace("uiDate","");
					$("#ui-datepicker-div").removeClass("week").addClass(sted);
					// console.log(sted);
					window.setTimeout(ui.datePick.wkThis);
				},
				onChangeMonthYear:function(ddd){
					// console.log("달,년  변경");
					window.setTimeout(ui.datePick.wkThis);
				},
				onSelect :function(ddd){

				},
				onClose:function(date,els){
					// console.log(date,els);
					ui.lock.using(false);
					// $("#"+els.id).focus();
					$(".ui-datepicker").unwrap(".uiDatePickWrap");
				}
			});

		}
	},
	tog:{ // 토글 UI
		init: function() {
			this.using();
			// this.set();
			ui.param.tog  && this.set( ui.param.tog );
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
	// tab:{ //탭형식컨텐츠
	// 	init:function(){
	// 		this.using();
	// 		// console.log(  ui.param.tab );
	// 		ui.tab.set( ui.param.tab );
	// 	},
	// 	set:function(id){
	// 		$(".uiTab>li>a[href='#"+id+"']").trigger("click");
	// 	},
	// 	using:function(){
	// 		$(document).on('click',".uiTab:not([data-ui*='link'])>li>a", function(e){
	// 			$(this).closest("li").addClass("active").siblings("li").removeClass("active");
	// 			var thisId = $(this).attr("href");
	// 			//console.log(thisId);
	// 			if (thisId.indexOf("#") > -1 ) {
	// 				$(thisId).addClass("active").siblings(".panel").removeClass("active");
	// 			}
	// 			e.preventDefault();
	// 		});
	// 	}
	// },
	tab:{ // 탭 UI
		init: function() {
			this.evt();
			ui.param.tab  && this.set( ui.param.tab );
		},
		set:function(id){
			var tabid = id.split(",");
			$("[data-ui-tab-btn][data-ui-tab-val]").each(function(idx){
				// console.log(idx,tabid[idx] );
				$("#"+id).closest("li").addClass("active");;
				$("[data-ui-tab-btn][data-ui-tab-val='"+tabid[idx]+"']").trigger("click");
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
			$(els).addClass("active").closest("li").addClass("active");;
			$("[data-ui-tab-ctn="+ctn+"]").removeClass("active");;
			$("[data-ui-tab-ctn]#"+btn).addClass("active");
			$("[data-ui-tab-ctn][data-ui-tab-val='"+btn+"']").addClass("active");
		}
	},
	lock:{ // 스크롤 막기,풀기
		sct:0,
		stat:false,
		using:function(opt){
			
			var lockDiv = ".popLayer  , .popConfirm , .popAlert" ;

			if(opt === true && this.stat === false ){
				this.stat = true;
				// ui.lock.sct = $(window).scrollTop();
				// $("body , html").addClass("lock");
				// $("html").css({"top":""+(-ui.lock.sct)+"px"});
				$(lockDiv).bind("touchmove scroll", function(e){ e.preventDefault() });
			}
			if(opt === false){
				this.stat = false;
				// $("body , html").removeClass("lock");
				// $("html").css({"top":""});
				// $(window).scrollTop( ui.lock.sct );
				$(lockDiv).unbind("touchmove scroll");
			}
		}
	},
    slides:{
        init:function(){
        	$(this.sample1.els +" ul.slide" ).length && this.sample1.using();
        	$(this.sample2.els +" ul.slide" ).length && this.sample2.using();
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
	alert:function(params){ // 커스텀 알럿

		var opt = $.extend({
			msg:"<p>알럿메시지</p>",
			ycb:"",
			ybt:"확인"
		}, params);

		if( !$(".popAlert").length ){
			ui.lock.using(true);

			var lyAlert =
			'<section class="popAlert" tabindex="0">'+
				'<div class="pbd">'+
					'<div class="pct">'+opt.msg+'</div>'+
					'<div class="pbt">'+						
						'<button type="button" class="btn type a btnConfirm">'+ opt.ybt +'</button>'+
					'</div>'+
					'<button type="button" class="btnClose">닫기</button>'+
				'</div>'+
			'</section>';

			$("body").append(lyAlert);


			$(".popAlert").find(".btnConfirm").on("click",function(){
				window.setTimeout(opt.ycb);
			});
			$(".popAlert").find(".btnClose , .btnConfirm").on("click",alertClose);

		}

		function alertClose(){
			$(".popAlert").remove();
			if( $(".popLayer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}
	},
	confirm:function(params){ // 커스텀 컨펌

		var opt = $.extend({
			msg:"<p>컴펌메시지</p>",
			ycb:"",
			ybt:"확인",
			ncb:"",
			nbt:"취소"
		}, params);

		if( !$(".popConfirm").length ){
			ui.lock.using(true);

			var lyConfirm =
			'<article class="popConfirm" tabindex="0">'+
				'<div class="pbd">'+
					'<div class="pct">'+opt.msg+'</div>'+
					'<div class="pbt">'+						
						'<button type="button" class="btn type e btnCancel">'+ opt.nbt +'</button>'+
						'<button type="button" class="btn type a btnConfirm">'+ opt.ybt +'</button>'+
					'</div>'+
					'<button type="button" class="btnClose">닫기</button>'+
				'</div>'+
			'</article>';
			$("body").append(lyConfirm);
			$(".popConfirm:visible").focus();
			$(".popConfirm").find(".btnConfirm").on("click",function(){
				window.setTimeout(opt.ycb);
			});

			$(".popConfirm").find(".btnCancel").on("click",function(){
				window.setTimeout(opt.ncb);
			});

			$(".popConfirm").find(".btnConfirm, .btnClose , .btnCancel").on("click",confirmClose);
		}

		function confirmClose(){
			$(".popConfirm").remove();
			if( $(".popLayer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}
	},
	toast: function(params) { // 토스트창 ui.toast();

		var opt = $.extend({
			msg:"토스트메시지",
			cls:"",
			sec:1500,
			bot:20,
		}, params);

		var toastStat = false ;
		if ( !$(".popToast:visible").length && toastStat == false ) {

			var lyToast =
				'<article class="popToast ' + opt.cls + '">' +
					'<div class="pbd">' +
						'<div class="pct">' + opt.msg + '</div>' +
					'</div>' +
				'</article>';

			$("body").append(lyToast);

			window.setTimeout(function() {
				$(".popToast").addClass("on").css({"padding-bottom" : opt.bot});
			},100);

			this.times = window.setTimeout(function() {
				$(".popToast").removeClass("on").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){
					// console.log("fsd");
					$(".popToast").remove();
					// toastStat = true ;
				});
				// $(".popToast").fadeOut(400, function() {
					
				// });
			}, opt.sec);
		}
	},
	popLayer: { // 레이어팝업
		init: function() {
			var _this = this;
			$(document).on("click", ".popLayer:not(.win) .btnPopClose", function() {
				var id = $(this).closest(".popLayer").attr("id");
				// console.log(id);
				if (_this.opt.hash) {
					window.history.back();
				}else{
					_this.close(id);
				}
			});

			$(document).on("click", ".popLayer", function(e) {
				$(this).find(".btnPopClose").trigger("click");
			});

			$(document).on("click", ".popLayer>.pbd , .btnPopClose", function(e) {
				e.stopPropagation();
			});

			if( $(".popLayer.win").length ) {
				var id = $(".popLayer.win").attr("id");
				_this.open(id);
			}
			$(window).on("load resize",this.resize);
			$(window).on("hashchange",function(){
				// _this.history(true);
			});
			window.onpopstate = history.onpushstate = function(e) {
				_this.history(true);
			}

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
					_this.scroll[id].scrollTo(0,-myTop,300);
				},600);
			});

		},
		history:function(){
			var _this = this;
			var h_prev = _this.openPop ; 
			_this.openPop = location.hash.replace("#pop=","").split(",");
			if ( _this.openPop == "" ) { _this.openPop = []	}
			var h_now = _this.openPop ;		
			// console.log( h_prev , h_now );
			if( h_prev > h_now ){
				result = h_prev.filter(function (a) {
 					return h_now.indexOf(a) === -1;
				});
				// console.log("뒤로옴" , result[0] ,h_prev , h_now  );
				_this.close(result[0],true);
			}else{
				// console.log("앞으로");
			}
		},
		openPop:[],
		callbacks:{},
		open: function(id,params) {
			// console.log(id,params);
			_this = this;

			if ( $("#" + id).length  <= 0  ) return ;   // id 호출팝업이 없으면 리턴

			_this.opt = $.extend({
				ocb: null ,
				ccb: null,
				zIndex: 1000,
				hash: false, // true  //  뒤로가기 버튼으로 팝업닫기 옵션
			}, params); 

			_this.callbacks[id] = {} ;
			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;		

			if (_this.opt.hash) {

				if ( $(".popLayer:visible").length <= 0 &&  location.href.split("#")[1] != undefined && location.href.split("#pop=")[1] != undefined ) {  //
					_this.openPop = [];
					window.history.pushState({}, 'pop', '#' );
				}

				_this.openPop.push(id);
				window.history.pushState({}, 'pop', '#pop='+_this.openPop );
			}

			ui.lock.using(true);

			$("#" + id).css({ zIndex: _this.opt.zindex });
			$("#" + id).fadeIn(100,function(){
				if(_this.callbacks[id].open)  _this.callbacks[id].open();			
				$(this).addClass("on");

			}).attr("tabindex","0").focus();
			
			window.setTimeout(function(){
				_this.resize(id);
				_this.lyScroll(id);
			});

		},
		close: function(id,set) {
			_this = this;

			// console.log(_this.opt.hash , set);	
			if( _this.opt.hash && set != true && $("#"+id+":visible").length  ) {  // 해쉬 
				window.history.back();
			}

			$("#"+id).removeClass("on").fadeOut(150,function(){
				if( !$(".popLayer:visible").length ) ui.lock.using(false);
				try { _this.callbacks[id].close(); } catch (error) { }
			});
		},
		resize:function(id){
			var pctnH =  $(".popLayer:visible").outerHeight() ;		
			pctnH = pctnH - ( $(".popLayer:visible>.pbd>.phd").outerHeight() || 0 ) - (  $(".popLayer:visible>.pbd>.pbt").outerHeight() || 0 );
			
			$(".popLayer.a:visible>.pbd>.pct").css({"height": pctnH });
			$(".popLayer.b:visible>.pbd>.pct").css({"max-height": pctnH - 70 });
			$(".popLayer.c:visible>.pbd>.pct").css({"max-height": pctnH - 30 });
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
					bounce:bounce,
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
	listMore: { // 더 불러오기 
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
	listLoad: { // 더 불러오기 
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
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/html";
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
		}
	},
	dropDown:{	// 드롭다운 메뉴
		init:function(){
			$(".uiDropDown").length && this.using();
			$(".uiDropDown").length && this.update();
		},
		set:function(id,val){ // ui.dropDown.set("아이디","value값");
			$("#"+id).find("li button[value='"+val+"']").closest("li").addClass("active").siblings("li").removeClass().attr("title","");
			this.update();
		},
		update:function(id){
			var $uiDropDown = $(".uiDropDown:not([data-ui*='link'])");

			$uiDropDown.each(function(i){
				

				var actEl = $(this).find(".list>ul>li:first-child").html();
				if( $(this).find(".list>ul>li").hasClass("active") ){
					actEl = $(this).find(".list>ul>li.active").html();
					$(this).find(".list>ul>li.active").siblings("li").attr("title","");
				}

				ui.dropDown.size(this);
				
				if($(this).find(".list li").hasClass("active")){
					// $(this).find(".list li.active a");
					//var actVal = $(this).find(".list li .active").index()+1;
					$(this).find(">button").text(  $(this).find(".list li.active button").text()  );
					$(this).find(">button").attr("value", $(this).find(".list li.active button").attr("value")   );
					$(this).attr("value", $(this).find(".list li.active button").attr("value")   );
				}

				if( !$(this).find(">button").length  ){
					$(this).prepend( actEl ).find(">button").wrapInner("<b></b>");
				}
				if( !$(this).find("button b").length ){
					$(this).find("button").wrapInner("<b></b>");
				}
				$(this).find(">button").addClass("bt").attr("title","메뉴열기").attr("onclick","");
				
			});

			$(".uiDropDown").each(function(){
				var actEl = $(this).find(".list>ul>li:first-child").html();

				ui.dropDown.size(this);

				if( !$(this).find(">a").length  &&  $(this).is("[data-ui='link-sel']")  ){
					
					$(this).prepend( actEl );
					$(this).find(">a").addClass("bt").attr("href","javascript:;").attr("title","메뉴열기");
					
				}


				if( $(this).find(".list li").hasClass("active") ){
					$(this).find(".list li.active").attr("title","현재선택항목");
					$(this).find(">a").text(  $(this).find(".list li.active a").text()  );
				}
			

			});

		},
		show:function(els){
			// console.log($(els));
			//console.log( $(els).next(".list").is(":visible") );
			var elsTop = $(els).closest(".uiDropDown").offset().top - $(window).scrollTop();
			var winH = $(window).height()/2 ;
			// console.log(  elsTop,winH );
			$(".uiDropDown").removeClass("up");
			if( winH < elsTop ){
				// console.log("up");
				$(els).closest(".uiDropDown").addClass("up");
			}

			if( $(els).next(".list").is(":visible") ){
				$(els).next(".list:visible").hide();
				$(els).removeClass("on");
				$(els).parent(".uiDropDown").removeClass("on");
			}else{
				$(els).next(".list").show();
				$(els).addClass("on");
				$(els).parent(".uiDropDown").addClass("on");
			}		
		},
		hide:function(){
			$(".uiDropDown .list").hide();
			$(".uiDropDown").removeClass("on");
			$(".uiDropDown .bt").removeClass("on");
		},
		sel:function(els){
			$(els).closest(".uiDropDown").find(".bt")
				.text( $(els).text() )
				.attr("value", $(els).attr("value") )
				.wrapInner("<b></b>")
				.focus();
			$(els).closest(".uiDropDown").attr("value", $(els).attr("value") );
			$(els).closest(".list").hide();
			$(els).closest("li").addClass("active").siblings('li').removeClass("active");
			$(els).closest(".list").find("button");
			$(els).closest("li");
		},
		using:function(){
			
			$(document).on("click",".uiDropDown:not('.disabled') .bt",function(e){
				ui.dropDown.show(this);
				e.stopPropagation();
			});

			$(document).on("click",".uiDropDown .list li button",function(){
				ui.dropDown.sel(this);
			});

			$(document).on("click",".uiDropDown[data-ui*='link'] .list li a",function(e){
				ui.dropDown.hide(this);
			});

			$(document).on("click",function(e){
				ui.dropDown.hide(this);
			});
			$(document).on("click",".uiDropDown",function(e){
				e.stopPropagation();
			});

			$("*").not(".uiDropDown .list button , .uiDropDown .list a , .uiDropDown .list").on("focus",function(){
				ui.dropDown.hide(this);
			});

			$(document).on("focus",".uiDropDown .bt",function(){
				ui.dropDown.hide(this);
			});

			

		},
		size:function(els){

			$(els).css("width","");
			$(els).find(".list").css("width","");

			if( !$(els).hasClass("noWidth") ){

				var aWid = $(els).find(">.bt").outerWidth()+5;
				var lsWid = $(els).find(".list").outerWidth()+5;
				// console.log(aWid,lsWid);

				if( aWid < lsWid){
					$(els).find(".list").css("width",lsWid);
					$(els).css("min-width", lsWid); 
				}else{
					$(els).css("min-width", aWid); 
					$(els).find(".list").css("width",aWid );
				}
			}

		}
	}
};

$(document).ready( ui.init() );


function css_browser_selector(u) {
    var ua = u.toLowerCase(),
        is = function(t) {
            return ua.indexOf(t) > -1;
        },
        g = 'gecko',
        w = 'webkit',
        s = 'safari',
        c = 'chrome',
        o = 'opr',
        m = 'mobile',
        v = 0,
        r = window.devicePixelRatio ? (window.devicePixelRatio + '').replace('.', '_') : '1';
    var res = [
        /* IE */
        (!(/opera|webtv/.test(ua)) && /msie\s(\d+)/.test(ua) && (v = RegExp.$1 * 1)) ?
            ('ie ie' + v + ((v == 6 || v == 7) ?
                ' ie67 ie678 ie6789' : (v == 8) ?
                ' ie678 ie6789' : (v == 9) ?
                ' ie6789 ie9m' : (v > 9 ) ?
                ' ie9m' : '')) :
            /* EDGE */
            (/edge\/(\d+)\.(\d+)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
            'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m edge' :
                /* IE 11 */
                (/trident\/\d+.*?;\s*rv:(\d+)\.(\d+)\)/.test(ua) && (v = [RegExp.$1, RegExp.$2])) ?
                    'ie ie' + v[0] + ' ie' + v[0] + '_' + v[1] + ' ie9m' :
                    /* FF */
                    (/firefox\/(\d+)\.(\d+)/.test(ua) && (re = RegExp)) ?
                        g + ' ff ff' + re.$1 + ' ff' + re.$1 + '_' + re.$2 :
                        is('gecko/') ? g :
                            /* Opera */
                            is(o) ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 :
                                (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) :
                                /* K */
                                is('konqueror') ? 'konqueror' :
                                    /* Black Berry */
                                    is('blackberry') ? m + ' blackberry' :
                                        /* Chrome */
                                        (is(c) || is('crios')) ? w + ' ' + c :
                                            /* Iron */
                                            is('iron') ? w + ' iron' :
                                                /* Safari */
                                                !is('cpu os') && is('applewebkit/') ? w + ' ' + s :
                                                    /* Mozilla */
                                                    is('mozilla/') ? g : '',
        /* Android */
        is('android') ? m + ' android' : '',
        /* Tablet */
        is('tablet') ? 'tablet' : '',
        /* Machine */
        is('j2me') ? m + ' j2me' :
            is('ipad; u; cpu os') ? m + ' chrome android tablet' :
                is('ipad;u;cpu os') ? m + ' chromedef android tablet' :
                    is('iphone') ? m + ' ios iphone' :
                        is('ipod') ? m + ' ios ipod' :
                            is('ipad') ? m + ' ios ipad tablet' :
                                is('mac') ? 'mac' :
                                    is('darwin') ? 'mac' :
                                        is('webtv') ? 'webtv' :
                                            is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') :
                                                is('freebsd') ? 'freebsd' :
                                                    (is('x11') || is('linux')) ? 'linux' : '',
        /* Ratio (Retina) */
        (r != '1') ? ' retina ratio' + r : '',
        'js portrait'].join(' ');
    if(window.jQuery && !window.jQuery.browser) {
        window.jQuery.browser = v ? {msie: 1, version: v} : {};
    }
    return res;
};
(function(d, w) {
    var _c = css_browser_selector(navigator.userAgent);
    var h = d.documentElement;
    h.className += ' ' + _c;
    var _d = _c.replace(/^\s*|\s*$/g, '').split(/ +/);
    w.CSSBS = 1;
    for(var i = 0; i < _d.length; i++) {
        w['CSSBS_' + _d[i]] = 1;
    }
    var _de = function(v) {
        return d.documentElement[v] || d.body[v];
    };
    if(w.jQuery) {
        (function($) {
            var p = 'portrait', l = 'landscape';
            var m = 'smartnarrow', mw = 'smartwide', t = 'tabletnarrow', tw = 'tabletwide', ac = m + ' ' + mw + ' ' + t + ' ' + tw + ' pc';
            var $h = $(h);
            var to = 0, cw = 0;

            /* ie7 cpu 100% fix */
            function CSSSelectorUpdateSize() {
                if(to != 0) return;
                try {
                    var _cw = _de('clientWidth'), _ch = _de('clientHeight');
                    if(_cw > _ch) {
                        $h.removeClass(p).addClass(l);
                    } else {
                        $h.removeClass(l).addClass(p);
                    }
                    if(_cw == cw) return;
                    cw = _cw;
                    //clearTimeout(to);
                } catch(e) {
                }
                to = setTimeout(CSSSelectorUpdateSize_, 100);
            }

            function CSSSelectorUpdateSize_() {
                try {
                    $h.removeClass(ac);
                    $h.addClass(
                        (cw <= 360) ? m :
                            (cw <= 640) ? mw :
                                (cw <= 768) ? t :
                                    (cw <= 1024) ? tw : 'pc'
                    );
                } catch(e) {
                }
                to = 0;
            }

            if(w.CSSBS_ie) {
                setInterval(CSSSelectorUpdateSize, 1000);
            } else {
                $(w).on('resize orientationchange', CSSSelectorUpdateSize).trigger('resize');
            }
            $(w).on("load",function(){
                CSSSelectorUpdateSize
            });
        })(w.jQuery);
    }
})(document, window);


if(window.CSSBS_ios) {
    //console.log(window.CSSBS_ios);
}