var uiHtml = {
	init: function () {
		
		this.tit();
		this.layout();
		this.include();
		$(window).on("load scroll",function(){
			var winH = $(window).height();
			var docH = $(document).height();
			var scrT = $(window).scrollTop();
			var pct =  scrT / ( docH - winH ) * 100 ;
			// console.log( winH , docH , scrT ,  pct );
			$("#barH>i").css({"width":pct+"%"});
		});
	},
	tit:function(){
		var tit = window.location.pathname.split("/");
		document.title = "/" + tit[tit.length - 2] + "/" + tit[tit.length - 1];
	},
	incCallbacks:false,
	include:function(){
		html_layers = false;
		var _this = this;
		var $inc_html = $("[data-include-html]");
		var incAmt = 0;
		if ($inc_html.length) {
			$inc_html.each(function(idx){
				var inc = $(this).data("include-html");
				var incNums = $inc_html.length ;
				$(this).load( inc ,function(response, status, xhr){
					// console.log( inc, idx+1 , incNums,  status, xhr);
					$(this).find(">*").unwrap();
					// _this.incCallbacks ++ ;
					// console.log(status);
					if( status == "success"){
						incAmt ++;
						// console.log("include 성공" , inc , _this.incCallbacks);
					}else if( status == "error"){
						// incAmt --;
						_this.incCallbacks = false ;
						// console.log("include 실패" , inc , _this.incCallbacks);
						// return false;
					}
					if (incAmt == incNums) {
						_this.incCallbacks = true ;
					}
					console.log( incAmt , incNums, inc, _this.incCallbacks);
					//$(this).removeAttr("data-include-html");
				});
			});
		}else{
			_this.incCallbacks = true ;
		}
		//console.log("완료" + _this.incCallbacks);

	},
	layout:function(){
		

	},
	param:(function(a) { // URL에서 파라미터 읽어오기
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; i++){
			var p=a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&')),
	menu: {
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
				$("body").append('<a class="btnLinkHtml" href="javascript:;">링크열기</a>');
			});


			$(document).on("click", ".btnLinkHtml", this.togMenu);

			$(document).on("keydown mousedown", function (event) {
				if (fStat === true) {
					if (event.keyCode == 77 && $("body:not('.link')").length) { keyM();	} // M 키 이벤트
					if (event.keyCode == 113) { keyF2(); } //F2 키 이벤트
					if (event.keyCode == 118) { keyF7(); } //F7 키 이벤트
					if (event.keyCode == 115) { keyF4(); } //F4 키 이벤트
					if (event.keyCode == 8  ) { keyBack(); } //Back 키 이벤트
				}
			}).on("mousedown", function () {
				$(".tempLink").remove();
			});


			
			$(document).on("click", ".linkHtml .cont>ul>li>h3>a", function () {
				_this.linkSet(this);
			});
				

			if ( !window.localStorage.getItem("linkMenu") ) {
			}
				
			$(".linkHtml .cont>ul>li:not(.open)").addClass("open");

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
			$(".linkHtml .cont>ul>li:not(.open)").addClass("open");
			$(".linkHtml .cont>ul>li").each(function (i) {
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

			$(".linkHtml .cont ul ul>li").each(function () {
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

				if ( link == thisPg ) {
					$(this).closest("li").addClass("active");
					$(this).closest("li").closest("ul").show();
					$(this).closest("li").closest("ul").closest("li:not(.open)").find("h3 a").trigger("click");
				}

			});

			$(".linkHtml .cont").on("scroll",function(){
				linkScr = $(".linkHtml .cont").scrollTop();
				window.localStorage.setItem("linkScr", linkScr);
			});
			setTimeout(function(){
				
				var $active = $(".linkHtml .cont>ul>li>ul>li.active");
				if ( $active.length ) {
					var linkTxtTop = $active.offset().top - $(window).height()*0.5;
					$(".linkHtml .cont").scrollTop(linkTxtTop );
				}else{
					var linkScr = window.localStorage.getItem("linkScr");
					$(".linkHtml .cont").scrollTop(linkScr);
				}
				// console.log(linkTxtTop,linkScr);

			});

		},
		keyBack: function () {
			console.log("뒤로");
			// window.history.back();
		},
		togMenu: function () {
			if ($(".tempLink").length) {
				$(".tempLink").remove();
			} else {
				var list =
					'<article class="tempLink">' +
						'<div class="pan"></div>' +
					'</article>';
				$("body").append(list);

				$(".tempLink>.pan").load("../../html/guide/link.html .linkHtml", function () {
					uiHtml.menu.linkStat();
				});

				$(".tempLink , .btnLinkHtml").on("mousedown", function (e) {
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

uiHtml.menu.init();
$(document).ready(function(){
	uiHtml.init();
});

