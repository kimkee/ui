var ui = {
	init:function () {
		console.log("김기현 - kimkee@naver.com , 010-3236-1677");	
		this.common.init();
		// this.slides.init();
		// this.link.init();
		this.ly.init();
		this.data.init();
	},
	data:{
		init:function(){
			$.ajax({
				type: "get",
				url: "./js/data.json",
				dataType: "json",
				success: function(data) {
					ui.data.set(data);
				},
				error:function(error){
					console.log(error);
				}
			});
	
		},
		set:function(data){
			console.log(data);

			function icopackSet(data){ // 기술 아이콘
				var pack = "";
				for(var pk in data.tech) {
					// console.log(data.tech[pk]);
					switch (data.tech[pk]) {
						case "HTML": cls = "html"; break;
						case "CSS": cls = "css"; break;
						case "JS": cls = "js"; break;
						case "Mobile": cls = "mobile"; break;
						case "Respond": cls = "mobile"; break;
						case "Design": cls = "design"; break;
						case "ActionScript": cls = "flash"; break;
					}
					pack += '<em class="icotech '+cls+'">'+data.tech[pk]+'</em> ';
				}
				return pack;
			}

			function htmlPlstSet(cate){
				var html = "";
				data[cate].forEach(function(data,idx){
					html += 
					'<li>'+
					'	<div class="pbox">'+
					'		<div class="pack">'+icopackSet(data)+'</div>'+
					'		<div class="ss"><a href="javascript:;" data-url="'+data.urls+'"><img class="img lazy" data-original="'+data.imgs+'" src="./img/cm/blank.png" alt="SS"></a></div>'+
					'		<div class="name">'+data.tits+'</div>'+
					'		<div class="info">'+
					'			<span class="date">'+data.date+'</span> - <span class="place">'+data.plce+'</span>'+
					'		</div>'+
					'	</div>'+
					'</li>';
				});
				$("#data_"+cate+"").html(html);
				$("img.lazy").show().lazyload();
			}
			htmlPlstSet("puix"); htmlPlstSet("pdeg"); htmlPlstSet("pfla");

			function htmlPtxtSet(cate){
				var html = "";
				data[cate].forEach(function(data,idx){
					html += 
					'<li>'+
					'	<div class="date"><i class="d">'+data.date+'</i><i class="p">'+data.plce+'</i></div>'+
					'	<div class="name">'+data.tits+'</div>'+
					'</li>';
				});
				$("#data_ptxt").html(html);
				$(".ut-scrolls").mCustomScrollbar({
					mouseWheel:{
						scrollAmount:400,
						preventDefault:true
					}	
				});
			}
			htmlPtxtSet("puix");

			function htmlPsldSet(cate){
				var html = "";
				data[cate].forEach(function(data,idx){
					if(idx > 9)  return;
					html +=
					'<li class="swiper-slide pbox">'+
					'	<a href="javascript:;" data-url="'+data.urls+'"><img class="img" src="'+data.imgs+'" alt="SS"></a>'+
					'	<div class="info">'+
					'		<div class="pack">'+icopackSet(data)+'</div>'+
					'		<div class="date"><i class="d">'+data.date+'</i><i class="p">'+data.plce+'</i></div>'+
					'		<div class="name">'+data.tits+'</div>'+
					'		<div class="screen"></div>'+
					'	</div>'+
					'</li>';
				});
				$("#data_psld").html(html);
				
			}
			htmlPsldSet("puix");

			$("#asg_date").html(data.assign);
			$(".header .date").html(data.update);
			if(	data.opened == true){ 
				$(".notice").show();
				$(".salestat").addClass("open");
			}
			
			ui.link.init();
			ui.slides.init();
		}
	},
	ly:{
		init:function () {

			$(document).on( "click", ".notice .box .close", function() {
				$( this ).closest(".notice").slideUp(200);
			});

			$(window).on("load scroll resize",function(){
				var scr = $(window).scrollTop();
				// console.log(scr);
				// $("body").css({
				// 	"background-position-y": (scr - 400) * 0.8 
				// });
				
				if ( scr > 700) {
					$(".topbts").fadeIn(200);
				} else {
					$(".topbts").fadeOut(500);
				}

			});
			var poskit = function(n1,n2){		
				n2 = ( pct * (n2-n1) / 100 )  + n1  ;
				return [n1 , n2] ;
			};
			$(window).on("load scroll resize",function(){
				var winH = $(window).height();
				var docH = $(document).height();
				var scrT = $(window).scrollTop();
				pct = Math.ceil( scrT / ( docH - winH ) * 100 );
				scm = Math.ceil( pct * 0.75 );
				// console.log( winH , docH , scrT ,  pct );
				$("#barH").css({"width":pct+"%"});

				// $(".pic.p1").html(  poskit(3,15) );
				// $(".pic.p2").html( " "+ poskit(5,23) );
				$(".pic.p1").css({
					// left:  poskit(3,15)[1]+"%"
				});
				
				// scmStat.init();
				
			});
		}
	},
	slides:{
		init:function () {
			$(this.main.els+" .pbox").length && this.main.using();
		},
		main:{  //  
			els: "#slides",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: ".pagi",
					clickable: false
				},
				navigation: {
					nextEl: ".navi .nav.next",
					prevEl: ".navi .nav.prev"
				},
				initialSlide: parseInt( Math.random()*10 ),
				loop: true,
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
			},
			using: function() {
				if( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				this.slide = new Swiper(this.els, this.opt);
				console.log(parseInt( Math.random()*10 ));
			}
		}

	},
	common:{
		init:function(){

			// $("#scrollbar1").mCustomScrollbar({
			// 	mouseWheel:{
			// 		scrollAmount:400,
			// 		preventDefault:true
			// 	}	
			// });


			$("img.lazy").lazyload({
				event : "fadeIn"
			});
			$("img.lazy").show().lazyload();

			// 스크롤 TOP버튼
			$(document).on("click",".topbts .bt",function(e){
				var toScr ;
				if( $(this).hasClass("down") ) {
					toScr = $(document).height();
				}else{
					toScr = 0;
				}
				$("body,html").animate({
					scrollTop: toScr
				}, 300);
			});
		}

	},
	link:{
		init:function(){
			var _this = this;
			$(document).on("keydown",function(e){ // M 키 이벤트
				if( e.keyCode == 77 && !_this.stat ){
					_this.using(true);
				}else{
					_this.using(false);
				}
			});	
		},
		stat:false,
		using:function(st){
			var els = ".plists .list li .pbox .ss a  ,  .visuals .mnslide .slides .pbox a" ;
			if (st === true) {
				this.stat = true;
				$(els).each(function() {
					var linkAmt = $(this).attr("data-url");
					if (linkAmt) {
						$(this).attr("href",linkAmt).css("cursor","pointer").attr("target","_blank");
					}
				});
				// console.log("링크가 활성화 됐습니다.");
			}else{
				this.stat = false;
				$(els).each(function() {
					var linkAmt = $(this).attr("href");
					$(this).attr("href","javascript:;").css("cursor","default").removeAttr("target");
					$(this).attr("data-url",linkAmt);
				});
				// console.log("링크가 비활성화 됐습니다.");
			}
		}
	}
};


ui.init();
