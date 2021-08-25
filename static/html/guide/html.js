ui.html.set = {
	init:function () {
		this.tit();
		this.menu.init();
		this.uimenu.init();
		this.bar();
		console.log("ui.html.init();");
	},
	tit:function(){
		var tit = window.location.pathname.split("/");
		if ( !$("#container").hasClass("ui") ) {
			document.title = "/" + tit[tit.length - 2] + "/" + tit[tit.length - 1];
		}
	},
	bar:function(){
		$(window).on("load scroll",function(e){
			if( $("html").is(".is-lock") ) {
				e.preventDefault();
				return false;
			}
			var winH = ui.viewport.height();
			var docH = ui.viewport.docHeight();
			var scrT = ui.viewport.scrollTop();
			var pct =  scrT / ( docH - winH ) * 100 ;
			// console.log( winH , docH , scrT ,  pct );
			$("#bar-ht>i").css({"width":pct+"%"});
		});
	},
	uimenu:{ // uimenu 
		init: function() {
			//ui.gnb.using("open");
			this.evt();
			this.list();
		},
		evt:function(){
			var _this = this;
			$(document).on("click", ".btn-ui:not(.ing)", function() {
				if ($("body").hasClass("is-uimenu-on")) {
					_this.using("close");
				} else {
					_this.using("open");
				}
			});
			$(document).on("click", ".uiscreen , nav.uimenu>.close", function() {
				_this.using("close");
			});

			$(document).on("click","nav.uimenu .menu .list>li>a",function(e){
				var $this = $(this);
				if ($("body").hasClass("is-lock")) {
					_this.using("close");
				}
				setTimeout(function(){
					var sc_msid = $this.data("btn-sid");
					var sc_msid_top = $("[data-sid="+sc_msid+"]").offset().top - 10 - $("#header").outerHeight() || 0 ;
					// console.log(sc_msid,sc_msid_top);

					$("body,html").animate({ scrollTop: sc_msid_top }, 100, function() {
						// els.removeClass("disabled");
					});
				},50);
			});	
		},
		using: function(opt) {
			if (opt === "open") {
				ui.lock.using(true);
				$(".btn-ui").addClass("ing");
				$("nav.uimenu").after('<div class="uiscreen" tabindex="-1"></div>');
				$("nav.uimenu").show().animate({"left": 0}, 300,function(){
					$(".btn-ui").removeClass("ing");
					//$("nav.uimenu").attr("tabindex","-1").focus();
				});
				$("body").addClass("is-uimenu-on");
				$(".uiscreen").show();
			}
			if (opt === "close") {
				$(".btn-ui").addClass("ing");
				$("nav.uimenu").animate({"left": "-100%"}, 300,function(){
					$("body").removeClass("is-uimenu-on");
					$(".uiscreen").hide().remove();
					$("nav.uimenu").hide();
					$(".btn-ui").removeClass("ing");
					//$(".header .gnb .btn-gnb").attr("tabindex","0").focus();
				});
				ui.lock.using(false);
			}
		},
		list:function(){
			var _this = this;
			$(".page.ui .sect:visible h3.hdt").each(function(idx){
				// console.log( $(this).text() );
				var mtxt = $(this).text();
				var msid = $(this).closest(".sect").data("sid");
				$("nav.uimenu .menu .list").append('<li><a data-btn-sid="'+msid+'" href="javascript:;">'+mtxt+'</a></li>');
			});
		}
	},
	menu:{
		init: function () {
			this.addEvent();
		},
		addEvent: function () {
			var _this = this;
			var keyM = this.togMenu;
			var keyF2 = this.togUrl;
			var keyF7 = this.togMobile;
			var keyF4 = this.togDev;
			var keyBack = this.keyBack;
			var fStat = true;
			$(document).on({
				focus: function () {
					fStat = false;
					// console.log("f");
				},
				blur: function () {
					fStat = true;
					// console.log("t");
				}
			}, "textarea , input:not([type=radio],[type=checkbox])");

			$(document).ready(function(){
				$("body").append('<a class="btn-link-html" href="javascript:;">링크열기</a>');
			});


			$(document).on("click", ".btn-link-html", this.togMenu);

			$(document).on("keydown mousedown", function (e) {
				if( fStat === true ){
					if( e.keyCode == 77 && $("body:not('.link')").length ) { keyM();	} // M 키 이벤트
					if( e.keyCode == 113 ) { keyF2(); } //F2 키 이벤트
					if( e.keyCode == 118 ) { keyF7(); } //F7 키 이벤트
					if( e.keyCode == 115 ) { keyF4(); } //F4 키 이벤트
					if( e.keyCode == 8   ) { keyBack(); } //Back 키 이벤트
				}
			}).on("mousedown", function () {
				$(".temp-link").remove();
			});


			
			$(document).on("click", ".link-html .cont>ul>li>h3>a", function () {
				_this.linkSet(this);
			});
				

			if ( !window.localStorage.getItem("linkMenu") ) {
			}
				

		},
		linkSet:function(my){
			var ckidObj = {};
			var els = $(my).closest("li");

			//var linkData = $.cookie("linkMenu");
			var linkData = window.localStorage.getItem("linkMenu");
			if (linkData) {
				ckidObj = JSON.parse(linkData);
			}
			var ckid = els.attr("id").replace("linkID", "");

			// ckidObj["linkID" + ckid] = true;

			if (els.hasClass("open")) {
				els.find("ul").slideUp(200,function(){
					els.removeClass("open");
				});
				JSON.parse(linkData);
				ckidObj["linkID" + ckid] = false;
				//console.log(ckidObj["linkID"+ckid])
			} else {
				els.find("ul").slideDown(200,function(){
					els.addClass("open");
				});
				ckidObj["linkID" + ckid] = true;
				//console.log(  "linkID"+ckid ,  ckidObj["linkID"+ckid]);
			}
			ckidObj = JSON.stringify(ckidObj);
			window.localStorage.setItem("linkMenu", ckidObj);			
		},
		linkStat: function () {
			$(".link-html .cont>ul>li:not(.open)").addClass("open");
			$(".link-html .cont>ul>li").each(function (i) {
				$(this).attr("id", "linkID" + i);
			});

			var linkData = window.localStorage.getItem("linkMenu");
			if (linkData) {
				var linkObj = JSON.parse(linkData); //console.log( linkObj );
				for (var key in linkObj) { //console.log( key );
					if (linkObj[key]) {
						$("#" + key).addClass("open").find(">ul").show();
					}else{
						$("#" + key).removeClass("open").find(">ul").hide();
					}
				}
			}
			var thisPg = window.location.pathname.replace("/ui/static/","../../");
			console.log(thisPg);
			$(".link-html .cont ul ul>li").each(function () {
				var text = $(this).find("em").text();
				$(this).find("em").addClass(text);
				//if (text == "ing") {
				//$(this).wrapInner('<span></span>' );
				//}else{
				var link = $(this).find(">mark").text();
				if (link) {
					$(this).find(">mark").wrapInner('<a href="' + link + '"></a>');
					var lk = link.replace("../../", "./");
					$(this).find("mark>a").text(lk);
				} else {
					$(this).wrapInner('<a href="javascript:;"></a>');
				}
				//}
				$(this).find("em").wrapInner('<a href="' + link + '" target="_blank"></a>');
				console.log(link);
				if ( link == thisPg ) {
					$(this).closest("li").addClass("active");
					$(this).closest("li").closest("ul").show();
					$(this).closest("li").closest("ul").closest("li:not(.open)").find("h3 a").trigger("click");
				}

			});

			$(".link-html .cont").on("scroll",function(){
				linkScr = $(".link-html .cont").scrollTop();
				window.localStorage.setItem("linkScr", linkScr);
			});
			setTimeout(function(){
				
				var $active = $(".link-html .cont>ul>li>ul>li.active");
				if ( $active.length ) {
					var linkTxtTop = $active.offset().top - $(window).height()*0.5;
					$(".link-html .cont").scrollTop(linkTxtTop );
				}else{
					var linkScr = window.localStorage.getItem("linkScr");
					$(".link-html .cont").scrollTop(linkScr);
				}
				// console.log(linkTxtTop,linkScr);

			},10);

		},
		keyBack: function () {
			console.log("뒤로");
			// window.history.back();
		},
		togMenu: function () {
			var _this = this;
			if ($(".temp-link").length) {
				$(".temp-link").remove();
			} else {
				var list =
					'<article class="temp-link">' +
						'<div class="pan"></div>' +
					'</article>';
				$("body").append(list);

				$(".temp-link>.pan").load("../../html/guide/ia.html .link-html", function () {
					ui.html.set.menu.linkStat();
				});

				$(".temp-link , .btn-link-html").on("mousedown", function (e) {
					e.stopPropagation();
				});
			}

		},
		togUrl: function () { // F2 키

		},
		togMobile: function () { // F7 키

		},
		togDev: function () { // F4 키
			var tUrl = window.location.href;
			var tPort = window.location.port;
			var tHost = window.location.host;
			var tOrg = window.location.origin;
			var tIp = window.location.hostname;
			//console.log(tPort, tUrl);
			if(tPort == "8082"){
				location.href = tUrl.replace(tHost,"kimkee.github.io");
			}
			if(tOrg == "https://kimkee.gitlab.io" || tOrg == "https://kimkee.github.io"){
				location.href = tUrl.replace(tOrg,"http://localhost:8082");
			}

		}
	}
};

$(document).ready(function(){
	ui.html.set.init();
});

