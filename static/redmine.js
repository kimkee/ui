
var redmine = {
	init:function(){
		this.using();
	},
	resize:function(){
		// $(".popLayerImg").css({
		// 	"height" : $(window).height(),
		// 	"line-height" : $(window).height()+"px"
		// });
		
		$("body #content").css("min-height", $(window).height() - $("#top-menu").outerHeight() - $("#header").outerHeight() - $("#footer").outerHeight() - 42 );
	},
	scroll:function(){
		if( $(window).scrollTop() >= 67 ){
			$("body #header").addClass("fixed");
			$("body #sidebar").addClass("fixed");
			$("body #main").addClass("fixed");
			$("body .btnTopScroll").fadeIn();
		}else{
			$("body #header").removeClass("fixed");
			$("body #sidebar").removeClass("fixed");
			$("body #main").removeClass("fixed");
			$("body .btnTopScroll").fadeOut();
		}
	},
	using:function(){

		$(".attachments .icon-attachment").each(function(i){
			$(this).attr("data-url","img-url-"+i);
		});

		$fileSrc = $("div.attachments .icon-attachment");
		$fileSrc.each(function() {
	
			$(this).attr("target","_blank");
			
			var imgExt = $(this).text();
			var imgTrue = ["jpg","jpeg","gif","bmp","png"];
			imgExt = imgExt.slice(imgExt.lastIndexOf(".") + 1).toLowerCase();
	
			for(i=0 ; i < imgTrue.length ; i++){
				if( imgExt == imgTrue[i] ){
					var src = $(this).attr("href");
					$(this).parent().append('<span class="fileAdd"><a href="javascript:;"><img src="'+src+'" class="addImg"></a></span>');
				}
			}
			
			$(this).parent().addClass("box");
	
		});
		
		$(document).on("click","div.attachments .fileAdd a",function(e){
			e.preventDefault();
			var index = $(this).closest(".box").index();
			var imgsrc = $("[data-url=img-url-"+index+"]").attr("href");
			var imgObj = $(this).find("img");
			console.log(index);
			$("body").append('<div class="popLayerImg"><img src="'+imgsrc+'" class="img"></div>');
		});

		setInterval(redmine.resize,1000);

		$(window).on("load resize",function(){
			redmine.resize();
		});
		
		$(document).on("click",".popLayerImg",function(){
			$(this).remove();
		});

		$(window).on("load scroll",function(){
			redmine.scroll();
		});
	
		$("#content div.wiki a.external[href*='http']").attr("target","_blank").attr("title","  갹");

		$("body").append('<a class="btnTopScroll" href="javascript:;">TOP</a>');
		
		$(document).on("click","body .btnTopScroll",function(){
			$("body,html").animate({scrollTop:0}, 1000 ,"easeOutExpo");
		});
		
		$("body table.list.issues td.status , table.attributes td.status").each(function(index, el) { //   em
			$(this).wrapInner('<em></em>');
		});

		$("body table.list.issues td.tracker").each(function(index, el) { //   em
			$(this).wrapInner('<em></em>');
			if( $(this).text() == "결함" ){
				$(this).addClass("defect");
			}
			if( $(this).text() == "개선" ){
				$(this).addClass("impro");
			}
			if( $(this).text() == "결함아님" ){
				$(this).addClass("ndefect");
			}
		});
		$("body table.list.issues td.status em").each(function(index, el) { //   em
			var str = {
				"담당자배정":"배정",
				"결함해결":"해결",
				"결함아님":"아님",
				"Not a Defect":"Not",
				"Resolved":"해결",
				"Opened":"배정",
			};
			for(const key in str) {
				if( key == $(this).text() ) {
					$(this).text(str[key]);
				}
			}
		});

		$("body table.list.issues td a.user.active").each(function(index, el) { //   em
			$(this).text(   $(this).text().replace(/신규플랫폼셀|중고거래|플랫폼|신규|셀|QC|온라인IT팀| /g,"")   );
		});
		

		$("fieldset#filters>div").hide();


	}
};

$(document).ready(redmine.init());