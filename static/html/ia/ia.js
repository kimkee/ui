//*******************************************//
// IA
// 김기현 : kimkee@naver.com    
// update : 2022-05-01 ~
//*******************************************//
var ia = {
	init:function(){
		this.stats();
		this.total.init();
		this.total.cate();
		this.user.init();
		this.menu.init();
		this.fixnav.init();
		this.veiwall.init();
		this.mact();
		this.memo.init();
		this.ly.init();
		this.dev.init();
		document.title = "IA-"+ia.plat().toUpperCase();
	},
	update:function(){
		this.ly.set();
	},
	data:{
		set:function(name,obj){
			var orgs = JSON.parse( localStorage.getItem(name) ) || {};
			var news = obj;
			// news[key] = val;
			if (typeof obj == "object") {
				news = $.extend(orgs,news);
				// news = Object.assign(orgs,news);
			}
			console.log(name);
			localStorage.setItem(name, JSON.stringify(news) );
		},
		get:function(name,key){
			// console.log(key);
			var data = JSON.parse( localStorage.getItem(name) );
			if( key != undefined) {
				try{
					return data[key] ;
				}catch(e){
					return false;
				}
			}else{
				return data;
			}
		}
	},
	plat:function(){
		var path = location.pathname.split("/");
		path = path[path.length - 4];
		return path;
	},
	stats:function(){
		$(".ia-body table tbody tr").each(function (i) {
			var txt = $(this).find("td.stat").text();
			// $(this).find("td.stat").wrapInner('<i></i>');
			var isUsr = !!$(this).find("td.name").text(); 
			// console.log(!isUsr);
			!isUsr && $(this).addClass("none");
			switch (txt){
				case "대기": $(this).addClass("sty"); break;
				case "진행": $(this).addClass("ing"); break;
				case "검수": $(this).addClass("chk"); break;
				case "완료": $(this).addClass("com"); break;
				case "삭제": $(this).addClass("del"); break;
				case "우선": $(this).addClass("wan"); break;
				case "":     $(this).addClass("sty").find("td.stat").html('대기'); break;
				// default:     $(this).closest("tr").addClass("sty").find("td.stat").html('<i>대기</i>');
			}
		});
		$(".ia-body table thead tr").prepend('<th class="no">No</th>');
		$(".ia-body table tbody tr").prepend('<td class="no"></td>');
		$(".ia-body table td.urls a").each(function () {
			// console.log(   $(this).attr('href').indexOf("javascript:") < 0  );
			$(this).attr("target","_blank");
			if( $(this).attr('href').indexOf("javascript:") < 0   ) $(this).text(  $(this).attr('href').replace("../../html",".").replace("../../..",".")  );
		});
		$('.ia-body .list>dt').each(function (idx) {
			// console.log(idx);
			idx = idx +1;
			$(this).addClass("tm"+idx);
		});
		$('.ia-body .list>dd').each(function (idx) {
			// console.log(idx);
			idx = idx +1;
			$(this).addClass("dd"+idx);
		});
		$(document).on("click","tr .urls a", function (e) {
			e.stopPropagation();
			$(this).closest("tr").addClass("active");
		});	
		$(document).on("click","tr", function (e) {
			e.stopPropagation();
			$(this).toggleClass("active");
		});
		
		$(".ia-body table.tbl td.no").attr("data-label","NO");
		$(".ia-body table.tbl td.lev2").attr("data-label","Lv.2");
		$(".ia-body table.tbl td.lev3").attr("data-label","Lv.3");
		$(".ia-body table.tbl td.lev4").attr("data-label","Lv.4");
		$(".ia-body table.tbl td.lev5").attr("data-label","Lv.5");
		$(".ia-body table.tbl td.tits").attr("data-label","화면");
		$(".ia-body table.tbl td.code").attr("data-label","ID");
		$(".ia-body table.tbl td.urls").attr("data-label","파일");
		$(".ia-body table.tbl td.date").attr("data-label","날짜");
		$(".ia-body table.tbl td.stat").attr("data-label","상태");
		$(".ia-body table.tbl td.name").attr("data-label","담당");
		$(".ia-body table.tbl td.memo").attr("data-label","메모");
	},
	ly:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(window).on("load resize scroll",function(){
				_this.set();
			});
		},
		set:function(){
			var hdHeight = $(".ia-head").outerHeight()  || 0;
			var nvHeight = $(".ia-body .navs").outerHeight() || 0;
			$(".ia-wrap").css({"padding-top":hdHeight+"rem"});
			$(".ia-body").css({"padding-top":nvHeight+"rem"});
			$(".fixnav").css({"top":hdHeight+nvHeight+7+"rem"});
			$(".ia-body .navs").css({"top":hdHeight+"rem"});
		}
	},
	fixnav:{
		init:function(){
			!$(".fixnav").length && $(".navs").append(this.els);
			this.evt();
			var theme = ia.data.get("ia","theme"); //
			this.them(theme);
		},
		els:'<nav class="fixnav">'+
				'<button type="button" class="bt viewall">전체보기</button>'+
				'<button type="button" class="bt them">🌚</button>'+
				'<button type="button" class="bt top">▲</button>'+
			'</nav>',
		evt:function(){
			var _this = this;
			$(document).on("click", ".fixnav .bt.top", function(){
				_this.gotop();
			});
			$(document).on("click", ".fixnav .bt.them", function(){
				if( $("body").is(".is-dark") ){
					_this.them("light");
				}else{
					_this.them("dark");
				}
			});
			
		},
		gotop:function(){
			var els = $(this);
			if (els.hasClass("disabled")) return false;
			$("body,html").animate({ scrollTop: 0 }, 200, function() {
				els.removeClass("disabled");
			});
			els.addClass("disabled");
		},
		them:function(type){
			if (type == false) {
				// window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ?  type = "light" :  type = "dark";
				type = "dark";
			}
			if( type == "dark" ){
				$("body").addClass("is-dark");
				$(".fixnav .bt.them").text("🌚");
				$('[name="theme-color"]').prop("content","#212121");
			}
			if( type == "light"){
				$("body").removeClass("is-dark");
				$(".fixnav .bt.them").text("🌞");
				$('[name="theme-color"]').prop("content","#ffffff");
			}
			// console.log(type);
			ia.data.set("ia",{theme:type}); // 
		}
	},
	loading:{ // 로딩중..
		show: function (id) {
			if (id) {
				$("#"+id).prepend('<div class="ia-loading is-pg">'+
				'<div class="box">'+
					'<em class="rt"><i></i><i></i></em>'+
				'</div>'+
			'</div>');


			}else{
				if( $(".ia-loading").length ) return;
				var els = '<div class="ia-loading">'+
				'<div class="box">'+
					'<em class="rt"><i></i><i></i></em>'+
				'</div>'+
			'</div>';
				$("body").prepend(els).addClass("is-loading");
				
			}
		},
		hide: function (id) {
			if (id) {
				$("#"+id+" .ia-loading").remove();
			}else{
				$(".ia-loading").remove();
				$("body").removeClass("is-loading");
			}
		}
	},
	total:{
		init:function(){
			this.set();
			var html = 
			'<ul class="info tot">'+
				'<li>전체 <span class="tot">0</span></li>'+
				'<li>대기 <span class="sty">0</span></li>'+
				'<li>진행 <span class="ing">0</span></li>'+
				'<li>검수 <span class="chk">0</span></li>'+
				'<li>완료 <span class="com">0</span></li>'+
				'<li>삭제 <span class="del">0</span></li>'+
				'<li><em class="graph"><i class="bar"></i></em> <span class="pct">0</span></li>'+
			'</ul>'+
			'<ul class="info usr">'+
				'<li><select class="fillter" title="작업자"><option>작업자</option></select></li>'+
				'<li><select class="statter" title="상태"><option>상태</option></select></li>'+
				'<li><label class="check"><input type="checkbox" name="tot" checked><i>전체<span class="tot">0</span></i></label></li>'+
				'<li><label class="check"><input type="checkbox" name="sty" checked><i>대기<span class="sty">0</span></i></label></li>'+
				'<li><label class="check"><input type="checkbox" name="ing" checked><i>진행<span class="ing">0</span></i></label></li>'+
				'<li><label class="check"><input type="checkbox" name="chk" checked><i>검수<span class="chk">0</span></i></label></li>'+
				'<li><label class="check"><input type="checkbox" name="com" checked><i>완료<span class="com">0</span></i></label></li>'+
				'<li><label class="check"><input type="checkbox" name="del" checked><i>삭제<span class="del">0</span></i></label></li>'+
				'<li><em class="graph"><i class="bar"></i></em> <span class="pct">0</span></li>'+
			'</ul>';
			$(".ia-head .data").html(html);
		},
		set:function(){
			ia.loading.show();
			setTimeout(function(){
				ia.loading.hide();
			}, 400);
			
			var count = {
				tots:{
					tot: 0, sty: 0, ing: 0, chk: 0, com: 0, del: 0, pct: 0
				},
				user:{
					tot: 0, sty: 0, ing: 0, chk: 0, com: 0, del: 0, pct: 0
				}
			};
			$(".ia-body table.tbl tbody tr:not(.nodata)").each(function(){
				var $sts = $(this).find("td.stat");
				var $txt = $sts.text();
				// console.log($sts.is(":visible"));		
				if( $(this).is(":visible") ){
					count.user.tot++;
					switch ($txt) {
						case "대기": count.user.sty++; break;
						case "진행": count.user.ing++; break;
						case "검수": count.user.chk++; break;
						case "우선": count.user.ing++; break;
						case "완료": count.user.com++; break;
						case "삭제": count.user.del++; break;
					}
				}
				count.tots.tot++;
				switch ($txt) {
					case "대기": count.tots.sty++; break;
					case "진행": count.tots.ing++; break;
					case "검수": count.tots.chk++; break;
					case "우선": count.tots.ing++; break;
					case "완료": count.tots.com++; break;
					case "삭제": count.tots.del++; break;
				}
			});


			$(".info.usr .sty").html(count.user.sty);
			$(".info.usr .ing").html(count.user.ing);
			$(".info.usr .chk").html(count.user.chk);
			$(".info.usr .del").html(count.user.del);
			$(".info.usr .com").html(count.user.com);
			$(".info.usr .tot").html(count.user.tot);
			count.user.pct = (count.user.com + count.user.chk + count.user.del) / count.user.tot * 100 || 0;
			$(".info.usr .pct").html( count.user.pct.toFixed(1)+"%");
			$(".info.usr .graph .bar").css("width",count.user.pct.toFixed(1)+"%");
			// console.log(count.user.pct.toFixed(1)+"%");


			$(".info.tot .sty").html(count.tots.sty);
			$(".info.tot .ing").html(count.tots.ing);
			$(".info.tot .chk").html(count.tots.chk);
			$(".info.tot .del").html(count.tots.del);
			$(".info.tot .com").html(count.tots.com);
			$(".info.tot .tot").html(count.tots.tot);
			count.tots.pct = (count.tots.com + count.tots.chk + count.tots.del) / count.tots.tot * 100 || 0;
			$(".info.tot .pct").html( count.tots.pct.toFixed(1)+"%");
			$(".info.tot .graph .bar").css("width",count.tots.pct.toFixed(1)+"%");


			$(".ia-body table tbody tr:visible:not(.nodata)").each(function(i){
				i++;
				$(this).find("td.no").text(i);
			});

			$(".ia-body table.tbl tr.nodata").remove();	
			$(".ia-body table.tbl tbody").each(function(){
				var $tr = $(this).find(">tr:visible");
				// console.log($tr.length);
				if( $tr.length == 0 ){
					$(this).append('<tr class="nodata"><td colspan="12">내역이 없습니다</td></tr>');
				}
			});
			
		},
		cate:function(){
			$(".ia-body dd ").each(function(){
				var trNum = $(this).find("table tbody tr:not(.nodata)").length;
				// console.log(trNum);
				// if( trNum <= 0 ) return;
				$(this).prev("dt").find("a").attr("data-num",trNum);
			});
		}
	},
	user:{
		init:function(){
			this.evt();
			this.set();
			this.load();
		},
		usrs:["김기현","미지정"],
		stts:["대기","진행","검수","완료","삭제","우선"],
		evt:function(){
			var _this = this;
			$(document).on("change",".ia-head .info select",function(e){
				var val1 = $(".fillter").val();
				var val2 = $(".statter").val();
				_this.filt(val1, val2);
				ia.data.set("ia-"+ia.plat(),{user:val1});
				ia.data.set("ia-"+ia.plat(),{stat:val2});
			});
			
			$(document).on("change",".info>li .check input[name='tot']",function(e){
				var els = $(this).attr("name");
				var val = $(this).is(":checked");
				if (val == true) {
					$(".info>li .check input[type='checkbox']").prop("checked",true);
				}else{
					$(".info>li .check input[type='checkbox']").prop("checked",false);
				}
				
			});
			$(document).on("change",".ia-head .info>li .check input[type='checkbox']",function(e){
				var els = $(this).attr("name");
				var val = $(this).is(":checked");
				var chkNum = $(".info>li .check input[type='checkbox']:not([name='tot']):checked").length;
				if (chkNum>=5) {
					$(".info>li .check input[name='tot']").prop("checked",true);
				}else{
					$(".info>li .check input[name='tot']").prop("checked",false);
				}
				if (chkNum == 0) {
					// $(".ia-head .info>li .check input[type='checkbox']").prop("checked",true);
				}
				_this.check(els,val);			
			});
		},
		check:function(els,val){
			console.log(els,val);
			
		},
		set:function(){
			var _this = this;
			for(var count = 0; count < _this.usrs.length; count++){                
				var option = $("<option value="+_this.usrs[count]+">"+_this.usrs[count]+"</option>");
				$(".fillter").append(option);
			}
			for(var countB = 0; countB < _this.stts.length; countB++){                
				var optionB = $("<option value="+_this.stts[countB]+">"+_this.stts[countB]+"</option>");
				$(".statter").append(optionB);
			}
		},
		load:function(){
			var usract1 = ia.data.get("ia-"+ia.plat(),"user") || "작업자" ;
			var usract2 = ia.data.get("ia-"+ia.plat(),"stat") || "상태";
			this.filt(usract1,usract2);
			$(".fillter option[value="+usract1+"] ").prop("selected",true);
			$(".statter option[value="+usract2+"] ").prop("selected",true);
		},
		filt:function(val1,val2){
			// console.log( val1,val2 );
			
			
			$(".ia-body table.tbl tbody tr").hide();
			$(".ia-body table.tbl tbody tr").each(function(i){
				var name = $(this).find("td.name").text();
				var stat = $(this).find("td.stat").text();
				if (name == "") {
					$(this).find("td.name").html("미지정");
					name = "미지정";
					// console.log(name);
				}

				if( val1 == "담당자" ) {
					val1 = "작업자" ;
				}
				
				if( val1 == name && val2 == stat ){
					$(this).show();
				}else{
					$(this).hide();
				}
				if( val1 == "작업자" && val2 == stat ){
					$(this).show();
				}
				if( val1 == name && val2 == "상태" ){
					$(this).show();
				}
				if( val1 == "작업자" && val2 == "상태" ){
					$(this).show();
				}
				// console.log( val1,name,stat );
			});
			ia.total.set();		
		},
		stat:function(val){
			$(".ia-body table.tbl tr td.stat").each(function(i){
				var txt = $(this).text();
				if (txt == "") {
					// $(this).text("대기");
					txt = "대기";
					// console.log(txt);
				}
			});
		}
	},
	memo:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			$(document).on("click","table.tbl td.memo .bt.more",function(e){
				if( $(this).closest("td").is(".open") ){
					$(this).closest("td").removeClass("open");
				}else{
					$(this).closest("td").addClass("open");
				}
			});
			$(document).on("click","table.tbl th.memo .bt.more",function(e){
				if( $("table.tbl").is(".open") ){
					$("table.tbl").removeClass("open");
					$("table.tbl td.memo").removeClass("open");

				}else{
					$("table.tbl").addClass("open");
					$("table.tbl td.memo").addClass("open");
				}
			});
		},
		set:function(){
			$(".ia-body table.tbl .memo").each(function(){
				$(this).wrapInner('<div class="msgs"></div>');
				var msg = $(this).find(".msgs>p");
				// console.log(msg.length);
				if (msg.length >= 2) {
					$(this).addClass("more");
					!$(this).find(".bt.more").length && $(this).prepend('<button class="bt more" type="button">+</button>');
				}else{
					$(this).removeClass("more");
				}
			});
			$(".ia-body table.tbl th.memo").each(function(){
				$(".ia-body table.tbl").addClass("close more");
				!$(this).find(".bt.more").length && $(this).prepend('<button class="bt more" type="button">+</button>');
			});
		}
	},
	mact:function(num){
		// num = JSON.parse( localStorage.getItem("iaMenuSet") )  ;
		var path = location.pathname.split("/");
		path = path[path.length - 4];
		var active = {"static":"static", "mo":"mo", "pc":"pc", "admin":"admin"};
		// console.log(path ,active , active[path]);
		$(".ia-head .link>li."+active[path]).addClass("active");
		ia.data.set("ia-"+ia.plat(),{plat:active[path]});
		$("body").addClass(active[path]);
		
		
		num = ia.data.get("ia-"+ia.plat(),"menu") ;
		// console.log(num);
		if( num == 0 ) {
			ia.veiwall.set("open");
		} else {
			if( !num ) {num = 1;} 
			$("body."+active[path]+" .ia-body .list>dt.tm"+num+" a").trigger("click");
			$("body."+active[path]+" .navs .menu>li:nth-child("+num+") a").trigger("click");
		}

	},
	veiwall:{
		init:function(){
			this.evt();
			
		},
		evt:function(){
			var _this = this;
			$(document).on("click",".fixnav .bt.viewall",function() {
				if( $(".ia-body").is(".all") ){
					_this.set("close");
				}else{
					_this.set("open");
				}
			});
		},
		set:function(opt){
			if(opt=="open"){
				$(".ia-body").addClass("all");
				$(".fixnav .bt.viewall").text("메뉴닫기");
				// localStorage.setItem("iaMenuSet",0);
				ia.data.set("ia-"+ia.plat(),{menu:0});
			}else{				
				$(".ia-body").removeClass("all");
				$(".fixnav .bt.viewall").text("전체보기");
				$(".navs .menu>li:nth-child(1) a").trigger("click");
			}
			ia.total.set();
			ia.update();
		}
	},
	menu:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click",".ia-body .list>dt a",function () {
				var idx = parseInt( $(this).closest("dt").attr("class").replace("tm","") );
				ia.veiwall.set("close");
				$(".navs .menu>li:nth-child("+idx+") a").trigger("click");
			});
			$(document).on("click",".navs .menu>li a",function () {
							
				var idx = parseInt( $(this).closest("li").index()+1 );
				_this.act(idx);
			});
			$(document).on("change",".navs .selt",function () {
				var idx = $(this).val();
				_this.act(idx);
			});
		},
		act:function(idx){
			// console.log(idx);
			$(".ia-body").removeClass("all");
			$(".navs .menu li:nth-child("+idx+")").addClass("active").siblings("li").removeClass("active");	
			$(".navs .selt option[value="+idx+"] ").prop("selected",true);
			// console.log(idx);
			$(".ia-body .list .tm"+idx+"").addClass("active").siblings("dt").removeClass("active");
			$(".ia-body .list .dd"+idx+"").addClass("active").siblings("dd").removeClass("active");

			// localStorage.setItem("iaMenuSet",idx);
			ia.data.set("ia-"+ia.plat(),{menu:idx});
			ia.total.set();
		},
		set:function(){
			var menu = "";
			var selt = "";
			$(".ia-body .list>dt").each(function(idx){
				idx++;
				var count = $(this).find("a[data-num]").attr("data-num");
				count > 0 ? count = ' ['+count+']' : count = '';
				menu += '<li>'+$(this).html()+'</li>';
				selt += '<option value="'+idx+'">'+$(this).find("a").text()+''+count+'</option>';
			});
			// console.log(selt);
			// console.log(menu);
			var navsHtml = '<ul class="menu">'+menu+'</ul><select class="selt" title="카테고리선택">'+selt+'</select>';
			$(".ia-body .navs").append(navsHtml);
		}
	},
	html:{ // Html 인클루드
		incCom:false,
		load:function( paramCallback ){
			if( paramCallback ){
				this.loadCallback = paramCallback;
			}
		},
		include:function(){
			var _this = this;
			var $inchtml = $("include");
			var incAmt = 0;
			if ($inchtml.length) {
				$inchtml.each(function(idx){
					var inc = $(this).attr("src");
					// console.log(inc);
					var incopt = $(this).data("include-opt");				
					var incNums = $inchtml.length ;
					$(this).load( inc ,function(response, status, xhr){
						// console.log( inc, idx+1 , incNums,  status, xhr);
						// console.log($(this));
						$(this).closest("dd").prev("dt").find(">a").attr("title",inc);
						// console.log(incopt);
						if( incopt && incopt.class ){
							// console.log(inc ,incopt);
							$(this).find(">*").addClass(incopt.class);
						}
						$(this).find(">*").unwrap();
						incAmt ++;
						if( status == "success" ){
							
						}else if( status == "error"){
							_this.incCom = false ;
							console.log("include 실패" , inc );
						}						
						if( incAmt == incNums ) {
							_this.incCom = true ;
							if( typeof _this.loadCallback == "function") _this.loadCallback();
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
	dev:{
		init:function(){
			this.evt();
		},
		evt:function(){
			var keyF4 = this.togDev;
			var keyF2 = this.togUrl;
			$(document).on("keydown mousedown", function (e) {
				
				if( e.keyCode == 77 && $("body:not('.link')").length ) { keyM();	} // M 키 이벤트
				if( e.keyCode == 113 ) { keyF2(); } //F2 키 이벤트
				if( e.keyCode == 118 ) { keyF7(); } //F7 키 이벤트
				if( e.keyCode == 115 ) { keyF4(); } //F4 키 이벤트
				if( e.keyCode == 8   ) { keyBack(); } //Back 키 이벤트
			
			}).on("mousedown", function () {
				$(".link-html").remove();
			});

			$(document).on("keydown mousedown", function (e) {
				if( e.altKey ){
					console.log( e.keyCode  ,e.altKey);
					if( e.keyCode == 48 ) { location.href = "../guide/ia.html"; }
					if( e.keyCode == 49 ) { location.href = "../guide/ui1.html"; }
					if( e.keyCode == 50 ) { location.href = "../guide/ui2.html"; }
				}
			});
			
			$(document).on("keydown",".ia-body table.tbl td a:focus", function (e) {
				var _this = this;
				if( e.keyCode == 32 ) {
					var url = $(_this).attr("href");
					// console.log(url);
					$(_this).closest("tr").addClass("active");
					window.open(url);
					return false;
				}
			});
			
		},
		togUrl:function(){ // F2 키
	
			var tUrl = window.location.href;
			var tPort = window.location.port;
			var tHost = window.location.host;
			var tName = window.location.hostname;
			var tOrg = window.location.origin;
			var tIp = window.location.hostname;
			// console.log(tPort, tUrl , tName);
			if(tPort == "9084" ||tPort == "9085" || tName == "localhost" || tName == "127.0.0.1"){
				console.log(tUrl.replace(tHost,"tca.kyobo.co.kr"));
				location.href = tUrl.replace(tHost,"tca.kyobo.co.kr").replace("/static/","/ui/");
			}
			if(tOrg == 'http://tca.kyobo.co.kr' || tOrg == 'http://10.27.225.22:9085'){
				location.href = tUrl.replace(tOrg,"http://localhost:9085").replace("/ui/","/static/");
			}
		},
		togDev:function(){ // F4 키
			var tUrl = window.location.href;
			var tPort = window.location.port;
			var tHost = window.location.host;
			var tName = window.location.hostname;
			var tOrg = window.location.origin;
			var tIp = window.location.hostname;
			// console.log(tPort, tUrl , tName);
			if(tPort == "9085" ||tPort == "9084" || tName == "localhost" || tName == "127.0.0.1"){
				console.log(tUrl.replace(tHost,"kyobo.devtree.co.kr"));
				location.href = tUrl.replace(tHost,"kyobo.devtree.co.kr");
			}
			if(tOrg == 'http://kyobo.devtree.co.kr' || tOrg == 'http://10.27.225.22:9084'){
				location.href = tUrl.replace(tOrg,"http://localhost:9085");
			}
		}
	}
};
$(document).ready(function(){
	ia.loading.show();
	ia.html.include();
	ia.html.times = setInterval(function(){ // console.log("ia.html" ,  ia.html.incCom);
		if( ia.html.incCom ){
			clearInterval(ia.html.times);
			ia.init();
			console.log("ia.init();");
		}
	});
});




	//Created By: Brij Mohan
	//Website: http://techbrij.com
	// function groupTable($rows, startIndex, total) {
	// 	if (total === 0) {
	// 		return;
	// 	}
	// 	var i, currentIndex = startIndex,
	// 		count = 1,
	// 		lst = [];
	// 	var tds = $rows.find('td:eq(' + currentIndex + ')');
	// 	var ctrl = $(tds[0]);
	// 	lst.push($rows[0]);
	// 	for (i = 1; i <= tds.length; i++) {
	// 		if ( $.trim( ctrl.text() )== $.trim( $(tds[i]).text() ) && $.trim( ctrl.text() ) !== '' ) {
	// 			count++;
	// 			$(tds[i]).addClass('deleted');
	// 			lst.push($rows[i]);
	// 		} else {
	// 			if (count > 1) {
	// 				ctrl.attr('rowspan', count);
	// 				groupTable($(lst), startIndex + 1, total - 1);
	// 			}
	// 			count = 1;
	// 			lst = [];
	// 			ctrl = $(tds[i]);
	// 			lst.push($rows[i]);
	// 		}
	// 	}
	// }

	// $('table').each(function (i) {
	// 	groupTable($(this).find('tr:has(td)'), 0, 3);

	// });
	// $('table .deleted').remove();





