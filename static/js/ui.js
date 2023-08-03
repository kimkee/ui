//*******************************************//
// 김기현 : kimkee@naver.com    
// url : http://kimkee.github.io/
// update : 2021-04-01
//*******************************************//

var ui = { //
    init:function(){ // 초기구동

        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", vh+"px");


        this.cm.init();
        this.skip.init();
        this.gnb.init();
        this.lnb.init();
        this.tree.init();
        this.ly.init();
        this.form.init();
        this.keypad.init();
        this.sort.init();
        this.dropmenu.init();
        this.location.init();
        this.range.init();
        this.accd.init();
        this.tog.init();
        this.tab.init();
        this.tooltips.init();
        this.mcscroll.init();
        // this.popLayer.init();
        this.popup.init();
        this.popframe.init();
        this.popsel.init();
        this.popselt.init();
        this.popseltm.init();
        this.popWin.init();
        this.slides.init();
        this.datepick.init();
        this.timepick.init();
        // this.daypick.init();
        this.listLoad.init();
        this.iosx.init();
        this.movePage.init();
        this.elip.init();
        this.htgrade.init();				// 하트그래프 circle-progress.js  미사용
        this.htgage.init();					// 하트지수
    },
    update:function(){ // 페이지 동적으로 뿌린 후 업데이트 ui.update();
        this.popsel.set();
        this.popselt.set();
        this.popseltm.set();
        this.datepick.set();
        this.timepick.set();
        // this.daypick.set();
        this.form.input.set();
        this.form.intdel.set();
        this.form.commas.set();
        this.form.prcset.set();
        this.form.amts.set();
        this.form.amtd.set();
        this.form.inthgt.set();
        this.form.star.set();
        this.range.set();
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
        els:'<div id="skip-nav"></div>',
        evt:function(){
            $(document).on("click","#skip-nav a[data-href='#gnb']",function(e){
                ui.gnb.using("open");
                $("#gnb").attr("tabindex","-1").focus();
                e.preventDefault();
            });
            $(document).on("click","#skip-nav a[data-href='#contain']",function(e){
                $("#contain").attr("tabindex","-1").focus();
                $(window).scrollTop(0);
                e.preventDefault();
            });
        },
        set:function(){
            if(!$("#skip-nav").length ) {
                $(".body:not(.ui)").prepend(this.els);
            }
            if( $("#contain").length && !$("#skip-nav a[data-href='#contain']").length ) {
                $("#skip-nav").append('<a href="javascript:;" data-href="#contain"><span>본문 바로가기</span></a>');
            }
            if( $("nav.gnb").length && !$("#skip-nav a[data-href='#gnb']").length ) {
                $("#skip-nav").prepend('<a href="javascript:;" data-href="#gnb"><span>메뉴 바로가기</span></a>');
            }
        }
    },
    debug:{
        init:function(){
            this.evt();
            this.set();
        },
        evt:function(){
            var _this = this;
            $(window).on("scroll resize load", function() {
                _this.set();
            });
        },
        set:function(){
            var dhtml = '<div id="debug"></div>';
            !$("#debug").length && $("body").prepend(dhtml);
            var wHt = ui.viewport.height();
            var docH= ui.viewport.docHeight();
            var scr = ui.viewport.scrollTop() + wHt + 0; 
            var sct = ui.viewport.scrollTop(); 
            $("#debug").html('SCT : '+ sct + ' ,SCR : '+ scr + ' , DOCH : ' +docH + " , visualViewport : "+ wHt+"  , iosX - top:"+ ui.iosx.top() +" bottom: "+ ui.iosx.bottom() );
        }
    },
    viewport:{
        height:function(){
            return parseInt( window.visualViewport ? visualViewport.height : window.innerHeight );
        },
        width:function(){
            return parseInt( window.visualViewport ? visualViewport.width : window.innerWidth );
        },
        docHeight:function(){
            return parseInt( document.documentElement.scrollHeight || document.body.clientHeight );
        },
        scrollTop:function(){
            return parseInt( document.documentElement.scrollTop );
        }
    },
    keypad:{ // 키패드 올라왔는지 내려갔는지 추측해보자
        init:function(){
            this.set();
            this.evt();
        },
        viewh:null,
        set:function(){
            this.viewh = ui.viewport.height();
            // console.log( this.viewh );
            var testElement = document.createElement('p');
            testElement.style.position = 'fixed';

            function isKeyboardVisible() {
                testElement.style.top = 0;
                return !!testElement.offsetTop;
            }

            setTimeout(function() {
                // console.log(  isKeyboardVisible() ? 'Keyboard is visible' : 'Keyboard is not visisble');
                if( isKeyboardVisible() ){
                    $("body").addClass("is-keypad");
                    $("body.ui .keystat").html('<b>KeyShow</b>');
                }else{
                    $("body").removeClass("is-keypad");
                    $("body.ui .keystat").html('');
                }
            }, 500);
        },
        evt:function(){
            var _this = this;
            $(document).on({
                "focus":function(e){
                    //$("body").addClass("is-keypad");
                },
                "blur":function(e){
                    //$("body").removeClass("is-keypad");
                }
            },"input:not([type=radio] , [type=checkbox] , [type=file]),textarea");
            $(window).on("resize", function(){
                var viewh_now = ui.viewport.height();
                if (viewh_now < _this.viewh - 100 ) {
                    $("body").addClass("is-keypad");
                    $("body.ui .keystat").html('<b>KeyShow</b>');
                }else{
                    $("body").removeClass("is-keypad");
                    $("body.ui .keystat").html('');
                }
            });
        }
    },
    cm:{ // 공통
        init:function(){
            
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
/*     getSafe:{ // 아이폰X 여백값
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
    }, */
    iosx:{ // 아이폰X 여백값
        init:function(){
            
        },
        top: function(){
            return parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-top").replace(/[^0-9]/g, "")) || 0;
        },
        bottom: function(){
            return parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom").replace(/[^0-9]/g, "")) || 0;
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
        init:function(){

        },
        set:function(callback){
            $("body").addClass("is-pulldown");
            if( typeof callback == "function" ){
                this.pullCallback = callback;	
            }else{
                this.pullCallback = function(){};
            }
            if( $(".is-pulldown #container").length ){
                this.using();
            }
            if(!$(".pull-to-refresh-material__control").length ){
                $(".is-pulldown #container").prepend( this.icon );
            }
        },
        icon:
            '<div class="pull-to-refresh-material__control">' +
            '	<svg class="pull-to-refresh-material__icon" fill="#669aff" width="30" height="30" viewBox="0 0 24 24">' +
            '		<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />'+
            '		<path d="M0 0h24v24H0z" fill="none" />'+
            '	</svg>'+
            '	<svg class="pull-to-refresh-material__spinner" width="24" height="24" viewBox="25 25 50 50">'+
            '		<circle class="pull-to-refresh-material__path" cx="50" cy="50" r="20" fill="none" stroke="#669aff" stroke-width="5" stroke-miterlimit="10" />'+
            '	</svg>'+
            '</div>',
        sec:1200,
        using:function(){
            var _this = this;
            pullToRefresh({
                container: document.querySelector('#container'),
                animates: ptrAnimatesMaterial,
                refresh: function() {
                    return new Promise( function(resolve){
                        setTimeout(resolve, _this.sec);
                        setTimeout(function(){
                            _this.pullCallback();
                        }, _this.sec);
                    });
                }
            });
        }
    },
    gnb: { // GNB 
        init: function() {
            //ui.gnb.using("open");
            var _this = this;
            $(document).on("click", ".btn-gnb", function() {
                if ($("body").hasClass("is-gnb")) {
                    _this.using("close");
                } else {
                    _this.using("open");
                }
            });
            $(document).on("click", ".gnb-screen , nav.gnb .bt.close", function() {
                _this.using("close");
            });
        },
        using: function(opt) {
            if (opt === "open") {
                ui.lock.using(true);
                $("nav.gnb").after('<div class="gnb-screen" tabindex="-1"></div>');
                $("nav.gnb").show().animate({"left": 0}, 300,function(){
                    $("nav.gnb .bts .bt.close").attr("tabindex","-1").focus();
                });
                $("body").addClass("is-gnb");
                $(".gnb-screen").show();
            }
            if (opt === "close") {
                $("nav.gnb").animate({"left": "-100%"}, 300,function(){
                    $("body").removeClass("is-gnb");
                    $(".gnb-screen").hide().remove();
                    $("nav.gnb").hide();
                    $(".btn-gnb").attr("tabindex","0").focus();
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
    ly:{ // 레이아웃
        init:function(){
            this.floating.init();
            this.botnav.init();
            this.height();
            this.set();
        },
        height:function(){
            var $container = $(".wrap .container:visible");
            var winH = $(window).height();
            var menebarH = $(".wrap .menubar>.inr:visible").outerHeight() || 0;
            var headH = $(".wrap .header>.inr:visible").outerHeight() || 0;
            var pageH = $(".wrap .pagehead:not(.hauto)>.inr:visible").outerHeight() || 0;
            var floatbtH = $(".wrap .floatbots>.inr:visible").outerHeight() || 0;
            var footH = $(".wrap .footer>.inr:visible").outerHeight() || 0;
            //console.log(winH , headH , footH );
            $container.css("min-height", parseInt( winH - headH - footH - menebarH - pageH - floatbtH) );
            $container.find(".contents.h100p").css("height", parseInt( winH - headH - footH - menebarH - pageH - floatbtH) );
        },
        set:function(){
            if( $("#container:visible").length ){
                var cls = $("#container:visible").attr("class").replace(/container|page/g,"");
                $("body").addClass(cls);
            }
            var menubar = $(".wrap nav.menubar:visible").length;
            var header  = $(".wrap .header>.inr:visible").length;
            var floatbt = $(".wrap .floatbots>.inr:visible").length;
            var footer  = $(".wrap .footer:visible").length;

            if( menubar ){
                $("body").addClass("is-menubar");
            }else{
                $("body").removeClass("is-menubar");
            }
            if( header ){
                $("body").addClass("is-header");
            }else{
                $("body").removeClass("is-header");
            }
            if( floatbt ){
                $("body").addClass("is-floatbots");
            }else{
                $("body").removeClass("is-floatbots");
            }
            if( footer ){
                $("body").addClass("is-footer");
            }else{
                $("body").removeClass("is-footer");
            }
        },
        floating:{ // 우하단 고정되있는 버튼들
            init:function(){
                this.evt();
                this.ptreg.init();
            },
            evt:function(){
                var _this = this;
                $(document).on("click", ".floatnav .bt.top",  function(){
                    _this.gotop();
                });

                $(window).on("scroll load", function(e){
                    if( $("html").is(".is-lock") ) {
                        e.preventDefault();
                        return false;
                    }
                    _this.istop();
                });
            },
            ptreg:{ // + 등록버튼
                init:function(){
                    this.evt();
                },
                btreg:".floatnav .bt.reg",
                btbox:".floatnav .rgbox",
                evt:function(){
                    var _this = this;
                    $(document).on("click", _this.btreg+":not(.ing)", function(){
                        if( $("body").is(".is-regopen") ) {
                            _this.close();
                        }else{
                            $(_this.btreg).addClass("ing");
                            _this.open();
                        }
                    });
                    $(document).on("click", _this.btbox+" .menu>li .btd", function(){
                        _this.close();
                    });
                    
                    $(window).on("pageshow", function(event) { 
                        if( event.persisted || (window.performance && window.performance.navigation.type == 2) ){ 
                            _this.close();
                            console.log("PAGESHOW");
                            setTimeout(function(){
                                _this.close();
                            }, 500);
                            $(_this.btbox).hide().removeClass("show anim");
                            $(_this.btreg).removeClass("ing anim");
                            $("body").removeClass("is-regopen");
                            $("#debug").append("뒤로옴..");
                        } 
                    });
                    // console.log(document.referrer);
                },
                open:function(){
                    var _this = this;
                    $("body").addClass("is-regopen");
                    $(_this.btreg).addClass("anim");
                    $(_this.btbox).off(ui.transitionend);
                    $(_this.btbox).addClass("show").show(0,function(){
                        $(_this.btbox).addClass("anim");
                    });
                    $(_this.btbox).on(ui.transitionend,function(){
                        $(_this.btreg).removeClass("ing");
                    });
                    ui.lock.using(true);
                },
                close:function(){
                    var _this = this;
                    ui.lock.using(false);
                    $(_this.btreg).removeClass("anim");
                    $(_this.btbox).off(ui.transitionend);
                    $(_this.btbox).removeClass("anim").on(ui.transitionend,function(){
                        $(_this.btbox).off(ui.transitionend);
                        $(_this.btbox).hide().removeClass("show");
                        $(_this.btreg).removeClass("ing");
                        $("body").removeClass("is-regopen");
                    });
                }
            },
            gotop:function(){  // 탑버튼 누르면  페이지 위로 스르륵
                var els = $(this);
                if (els.hasClass("disabled")) return false;
                $("body,html").animate({ scrollTop: 0 }, 200, function() {
                    els.removeClass("disabled");
                });
                els.addClass("disabled");
            },
            istop:function(){  // 스크롤 내릴때 탑버튼 보였다 안보였다
                var scr = $(window).scrollTop();
                if (scr > 1) {
                    $(".floatnav").addClass("is-top");
                } else {
                    $(".floatnav").removeClass("is-top");
                }
                if( ui.isUA("NAVER") || ui.isUA("Whale") || ui.isUA("DaumApps")) {
                    $(".floatnav").removeClass("is-top");
                }
            }
        },
        botnav:{  // 하단 메뉴 
            show:function(){
                $("body").removeClass("is-menubar-hide");
                $(".menubar").removeClass("hide");
                $(".floatnav").removeClass("hide");
            },
            hide:function(){
                $("body").addClass("is-menubar-hide");
                $(".menubar").addClass("hide");
                $(".floatnav").addClass("hide");
            },
            init:function(){
                /* 스크롤 멈춤 이벤트 pure js */
                var timer = null;
                window.addEventListener('scroll', function() {
                    if(timer !== null) {
                        clearTimeout(timer);        
                    }
                    timer = setTimeout(function() {
                        console.log("scrollStoped");
                    }, 1000);
                }, false);


                $.fn.scrollStopped = function(callback) { // 스크롤 스톱 scroll stop event  
                    $(this).scroll(function(){
                        var self = this, $this = $(self);
                        if( $this.data('scrollTimeout') ){
                            clearTimeout($this.data('scrollTimeout'));
                        }
                        $this.data('scrollTimeout', setTimeout(callback,250,self));
                    });
                };
                var _this = this;
                var prevPosition = 0;
                var dnVar = 0;
                var upVar = 0;
                var scrStopEvent = null;
            
                $(window).on("load pageshow scroll", function(e){  // 스크롤 내리는 중 OR 올리는중 
                    if( $("html").is(".is-lock") ) {
                        e.preventDefault();
                        return false;
                    }
                    var initPosition = $(this).scrollTop();
                    // console.log(initPosition , prevPosition);
                    // console.log(dnVar - upVar);
                    if( initPosition > prevPosition ){
                        dnVar ++ ;
                        // console.log("dn");
                        //스크롤다운중;
                        upVar = 0;
                        $("body").addClass("is-scroll-down").removeClass("is-scroll-up");
                        // console.log(dnVar,upVar , upVar-dnVar);
                        if( upVar-dnVar < -5 ) {
                            $(".menubar:visible").length && _this.hide();
                        }
                        $(window).scrollStopped(function(){
                            // console.log("scroll 스톱");
                            clearTimeout(scrStopEvent);
                            scrStopEvent = window.setTimeout(function(){
                                // _this.show();
                                clearTimeout(scrStopEvent);
                            },800);
                        });
                    }else {
                        upVar ++ ;
                        // console.log("up");
                        //스크롤 업중;
                        $("body").addClass("is-scroll-up").removeClass("is-scroll-down");
                        dnVar = 0;
                        if ( dnVar-upVar < -5 ) {
                            $(".menubar:visible").length && _this.show();
                        }
                    }
                    prevPosition = initPosition ;
                });

                $(window).on("pageshow scroll", function(e){ // 스크롤 맨 밑에 일때
                    if( $("html").is(".is-lock") ) {
                        return false;
                    }
                    var docH = $(document).height();
                    var scr = $(window).scrollTop() + $(window).height() + $("#menubar").outerHeight() + 30;
                    // console.log(docH,scr);
                    if(docH <= scr + 0 ){				
                        // console.log("바닥");						
                        _this.show();
                    }else{
                        // _this.hide();
                    }
                });


            }
        }
    },
    tree:{ // 트리구조 메뉴
        init:function(){
            this.evt();
            this.set();
        },
        evt:function(){
            $(document).on("click",".ui-tree li>.tog",function(e){
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
            $(".ui-tree li").each(function(){
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
    elip:{ // 5줄이상 내용더보기 
        init:function(){
            this.evt();
            this.set();
        },
        evt:function(){
            $(document).on("click", "[data-ui='elips'] .btn-tog", function() {
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
                if(txtH.height()>105){
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
            $(document).on("click","nav.ui-sorts .bt.st",function(e){
                _this.pos(this);
            });
            $(document).on("click", function(e) {
                if(!$(e.target).closest("nav.ui-sorts").length ) {
                    $("nav.ui-sorts").removeClass("open");
                }
            });
            $(document).on("click", "nav.ui-sorts .menu>li>.bt", function(e) {
                $(this).closest("nav.ui-sorts").removeClass("open");
            });


            $(document).on("click",".ui-sorts .menu>li>.bt",function(e){
                $(this).closest("li").addClass("active").siblings("li").removeClass("active");
                _this.set();
            });
        },
        set:function(){
            $("nav.ui-sorts").each(function(){
                var $li = $(this).find(".menu>li");
                var txt = $li.filter(".active").find(".bt").text();
                if( $(this).find(".menu>li.active").length == 0 ) {
                    txt = $(this).find(".menu>li:first-child").find(".bt").text();
                    $(this).find(".menu>li:first-child").addClass("active");
                }
                $li.closest(".ui-sorts").find(".bt.st").html(txt);
                var val = $(this).find(".menu>li.active .bt").attr("value");
                $li.closest(".ui-sorts").find(".bt.st").attr("value",val);				
            });
        },
        pos:function(els){
            var $myui = $(els).closest("nav.ui-sorts");
            if( $myui.is(".open") ) {
                $myui.removeClass("open");
            }else{
                $("nav.ui-sorts").removeClass("open");
                $myui.addClass("open");
            }
            // 메뉴 포지션		
            // console.log(els);
            var isPop = $(els).closest(".poptents").length;
            var ltp = $(els).offset().top;
            var cht = $(".pop-layer.a:visible .pct").height()*0.5 || $(window).height()*0.5 ;
            var sct = $(".pop-layer.a:visible .pct").scrollTop() || $(window).scrollTop() ;
            if( isPop )  ltp = ltp + sct ; 
            // console.log(ltp , sct ,cht , ltp - sct );
            if( cht > ltp - sct + 30 ) {
                $(els).closest("nav.ui-sorts").removeClass("bot"); // console.log("상");
            }else{
                $(els).closest("nav.ui-sorts").addClass("bot"); // console.log("하");
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
            $(document).on("click",".ui-dropm .bt.st",function(e){
                _this.set(this);
                _this.pos(this);
            });

            $(document).on("click", function(e) {
                if(!$(e.target).closest(".ui-dropm").length ) {
                    $(".ui-dropm").removeClass("open");
                }
            });

            $(document).on("click", ".ui-dropm .menu>li>.bt", function(e) {
                $(this).closest(".ui-dropm").removeClass("open");
            });

        },
        set:function(els) {
            var $myui = $(els).closest(".ui-dropm");
            if( $myui.is(".open") ) {
                $myui.removeClass("open");
            }else{
                $(".ui-dropm").removeClass("open");
                $myui.addClass("open");
            }
            
        },
        pos:function(els){
            
            // 메뉴 포지션		
            // console.log(els);
            var isPop = $(els).closest(".poptents").length;
            var ltp = $(els).offset().top;
            var cht = $(".pop-layer.a:visible .pct").height()*0.5 || $(window).height()*0.5 ;
            var sct = $(".pop-layer.a:visible .pct").scrollTop() || $(window).scrollTop() ;
            if( isPop )  ltp = ltp + sct ; 
            // console.log(ltp , sct ,cht , ltp - sct );
            if( cht > ltp - sct + 30 ) {
                $(els).closest(".ui-dropm").removeClass("bot"); // console.log("상");
            }else{
                $(els).closest(".ui-dropm").addClass("bot"); // console.log("하");
            }
        }
    },
    htgrade:{ // 하트지수
        init:function(){
            $(".ui-htgrade").length && this.set();
        },
        set:function(){
            
            var gcolor = [
                '{"color":"#aeb0be"}',
                '{"color":"#ffd800"}',
                '{"color":"#ffb100"}',
                '{"color":"#ff8900"}',
                '{"color":"#ff6652"}',
                '{"color":"#f1344d"}'
            ];
            $(".ui-htgrade").each(function(){
                var level = $(this).data("level");
                var point = $(this).data("point");
                 $(this).attr("data-fill", gcolor[level] );
                // console.log( level, gcolor[0] );
                var value = ( point - 100 * ( level-1) ) * 0.01 ;
                if( level <= 0 ) {
                    value = 0;
                }
                // value <= 0 ? value = 1 : null ;
                // console.log(value);
                $(this).attr("data-value",value);
                $(this).find('.pnt .s').remove();
            });


            $(".ui-htgrade").circleProgress({
                arcCoef: 0.7,
                size:"45",
                animationStartValue:"0.0",
                startAngle : 1.61 ,// * Math.PI,
                // fill: { "color": "#f1344d" } ,
                thickness:"3.5",
                emptyFill:"rgba(174, 174, 174,1.0)",
                // value: 0.5,
                // fill: {"image": "http://i.imgur.com/pT0i89v.png"},
                // fill: {gradient: [['#000', .1], ['#444', .8]], gradientAngle: Math.PI / 4},
            }).on("circle-animation-progress", function(event, progress, stepValue) {
                // $(this).find('strong').text(stepValue.toFixed(2).substr(1));				
                
                var level = $(this).data("level");
                var point = $(this).data("point");
                var lv = ( level * 100 ) - 100;
                var mmm;
                // stepValue == 1 ? mmm = 1 : mmm = 0;
                var htpont;
                var minus = $(this).data("minus");
                // console.log(datagaps);
                if( level == 0 ) {
                    $(this).find(".pnt .s").hide();
                    // console.log(progress);
                    htpont = 0 ;
                }else{
                    // htpont = Math.floor( 100 * stepValue );
                    htpont = Math.floor( 100 * stepValue + ( lv )   ) ;
                }
                if( level < 0 ) {
                    $(this).find(".pnt .s").hide();
                    htpont = Math.floor( 100 * stepValue + point   ) ;
                }
                // console.log(stepValue);
                
                $(this).find(".pnt .p").html(  htpont );
                
                if (point >= 500 && stepValue >= 1) {
                    $(this).addClass("crown");
                }
                if (point >= 1000 && stepValue >= 1) {
                    $(this).find(".pnt").html('<i class="p">999</i><i class="s">+</i>');
                    // $(this).find('.pnt .p').html("999");
                }

            }).on("circle-animation-end", function (event, progress) {
                // var lv = $(this).data("level");
                // console.log("완료",lv);
                // $(this).find("canvas").css({"opacity":"0"});
            });
        }
    },
    htgage:{ // 하트지수
        init:function(){
            $(".ui-htgage").length && this.set();
        },
        set:function(){
            $(".ui-htgage").each(function(){
                var level = $(this).data("level");
                var point = $(this).data("point");
                var value = ( point - 100 * ( level-1) ) ;
                if( level <= 0 ) {
                    // value = 0;
                }
                if( level == 0 ) {
                    value = -value + 100;
                }
                if( point < -50 ) {
                    $(this).addClass("lvZ");
                }
                if (point >= 500 ) {
                    $(this).addClass("crown");
                }
                if( value > 100 ) {
                    value = 100;	
                }
                // value <= 0 ? value = 1 : null ;
                // console.log(value);
                $(this).attr("data-value",value);
                $(this).find(".pnt .p").css("width",value+"%");
                $(this).find(".pnt .s").remove();
            });
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
    range:{
        init:function(){
            this.set();
        },
        set:function(){
            $(".ut-barslide.a .barslide").each(function(){
                var $this  = $(this);
                var hantxt = $this.find(".hantxt");
                var bardis = $this.find("em.bar");
                var amt    = $this.find("input.amt");
                var step   = parseInt( $this.find("input.step").val() );
                var val    = parseInt( $this.find("input.amt").val() );
                var min    = parseInt( $this.find("input.min").val() );
                var max    = parseInt( $this.find("input.max").val() );
                
                setHandle(val,min,max);
                function setHandle(val,min,max){
                    var wid = (val-min) / (max-min) * 100;
                    // console.log(val);
                    bardis.css("width", wid  + "%");
                    hantxt.html( ui.commas.add(val) + '<i class="w">원</i>');
                    amt.val(val);
                }
                $this.slider({
                    value: val,
                    min: min,
                    max: max,
                    step: step,
                    create:function( event, ui ){
                        setHandle(val,min,max);
                    },
                    slide:function( event, ui ){
                        var val = ui.value;
                        setHandle(val,min,max);
                    },
                    stop: function( event, ui ){
                        var val = ui.value;
                        amt.trigger("change");
                    }
                });
            });

            $(".ut-barslide.b .barslide").each(function(){
                var $this  = $(this);
                var hantxt = $this.find(".hantxt");
                var bardis = $this.find("em.bar");
                var amt0   = $this.find("input.amt0");
                var amt1   = $this.find("input.amt1");
                var step   = parseInt( $this.find("input.step").val() );
                var val0   = parseInt( $this.find("input.amt0").val() );
                var val1   = parseInt( $this.find("input.amt1").val() );
                var min    = parseInt( $this.find("input.min").val() );
                var max    = parseInt( $this.find("input.max").val() );
                setHandle(val0,val1,min,max);
                function setHandle(val0,val1,min,max){
                    hantxt.html( ui.commas.add(val0) + '<i class="w">원</i> ~ '+ ui.commas.add(val1) + '<i class="w">원</i>'  );
                    // console.log(val0,val1);
                    amt0.val(val0);
                    amt1.val(val1);
                }
                $this.slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [ val0, val1 ],
                    step: step,
                    create:function( event, ui ){
                        setHandle(val0,val1,min,max);
                    },
                    slide: function( event, ui ) {
                        var val0 = ui.values[0];
                        var val1 = ui.values[1];
                        setHandle(val0,val1,min,max);
                    },
                    stop: function( event, ui ){
                        var val0 = ui.values[0];
                        var val1 = ui.values[1];
                        amt0.trigger("change");
                        amt1.trigger("change");
                    }
                });
                
            });

        }
    },
    commas:{
        add:function(str){
            return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        del:function(str){
            return parseInt(str.replace(/,/g , ''));
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
            this.amts.init();
            this.amtd.init();
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
                $(this.inpEls).each(function(){
                    // $(this).trigger("input");
                });
            },
            inpEls:".input:not(.notdel)>input:not([disabled],[readonly]), [data-ui='autoheight']",
            evt:function(){
                var _this = this;
                $(document).on("input focus",this.inpEls,function(e){
                    var els = this;
                    if( $(els).val() == "" ) {
                        _this.xhide(els);
                    }else{
                        _this.xshow(els);
                    }
                });
                $(document).on("focusout",this.inpEls,function(e){
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
                $(this.inpEls).closest(".input").removeClass("del").find(".btdel").remove();
                var _this = this;
                var myInput = $(els);
                // console.log(myInput.val());
                if( myInput.val() != ""  && myInput.closest(".input").find(".btdel").length == 0  ) {
                    myInput.closest(".input").addClass("del").append('<button type="button" class="btdel" tabindex="-1">삭제</button>');
                }
                myInput.closest(".input:not(.ui-prcset) input").css({ "padding-right":this.posit(els) });
                myInput.closest(".input").find(".btdel").css({ "right":this.posit(els) });
            },
            xhide:function(els){
                var myInput = $(els);
                myInput.closest(".input").removeClass("del").find(".btdel").remove();
                myInput.closest(".input:not(.ui-prcset) input").css({ "padding-right":this.posit(els) });
            },
            posit:function(els){
                var myInput = $(els);
                var rpost = myInput.closest(".input").is(".b") ? 0 : 0 || 0 ;
                var ibts  = myInput.closest(".input").find(".ibts");
                var btpos = ibts.length ? ibts.width()+5+ rpost : "";
                return btpos;
            }
        },
        commas:{ // .input.commas 3자리마다 콤마찍기 
            init:function(){
                this.evt();
                this.set();
            },
            els:".input.commas input , .ui-prcset input.amt",
            evt:function(){
                var _this = this;
                $(document).on("input focus",_this.els,function(e){
                    _this.set();
                });
            },
            set:function(){
                var _this = this;
                $(_this.els).each(function(){
                    var $input = $(this);
                    var value = $input.val();
                    $input.attr("pattern","\\d*");
                    if( value == 0 ) {
                        $input.val("");
                    }
                    if( value != "" ) {
                        value = ui.commas.add( ui.commas.del( $input.val() ) || "" );
                        $input.val(value);
                    }
                    var org = +ui.commas.del( $input.val() ) || "";
                    $input.attr( "data-val" , org ).attr("value",value).data("val",org);
                    $input.closest(".input").find(".hideamt").val(  org );
                    // console.log( $input.data("val") , $input.val() );
                    if( $input.val() == "" ) {
                        $input.closest(".input").removeClass("del").find(".btdel").remove();
                    }
                    // console.log( $input.closest(".input").is(".ui-prcset") );
                    if( $input.closest(".input").is(".ui-prcset") ){
                        ui.form.prcset.set();
                    }
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
                $(document).on("input",".ui-prcset input.amt",function(e){
                    _this.set();
                });
                $(document).on("click",".ui-prcset.coms:not(.focus):not(.del)",function(e){
                    $(this).find("input.amt").focus();
                });
            },
            set:function(){
                $(".ui-prcset input.amt").each(function(){
                    var uipriceset = $(this).closest(".ui-prcset");
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
        amts:{
            init:function(){
                this.evt();
                this.set();
            },
            evt:function(){
                var _this = this;
                $(document).on("click",".ui-amts .bt",function(){
                    var els = $(this).closest(".ui-amts");
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
                $(".ui-amts").each(function(){
                    var els = $(this).closest(".ui-amts");
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
        amtd:{ // 장바구니 수량 변경
            init:function(){
                this.evt();
                this.set();
            },
            evt:function(){
                var _this = this;
                $(document).on("click",".ui-amtd .bt.mod",function(e){
                    _this.using(this,"inp");
                });
                $(document).on("change",".ui-amtd select.slt",function(e){
                    _this.using(this,"slt");
                });
                $(document).on("input",".ui-amtd .amt",function(e){
                    // _this.using(this,"inp");
                });
                $(document).on("focus",".ui-amtd .amt",function(e){
                    $(this).closest(".ui-amtd").addClass("bt");
                });
                $(document).on("blur",".ui-amtd .amt",function(e){
                    $(this).closest(".ui-amtd").removeClass("bt");
                    _this.using(this,"inp");
                });
            },
            using:function(els,mod){
                var ubx = $(els).closest(".ui-amtd");
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
    
                $(".ui-amtd").each(function(){
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
        star:{ // 별점 주기
            init:function(){
                this.set();
                this.evt();
            },
            evt:function(){
                var _this =  this;
                $(document).on("click",".ui-star ul>li>button.st",function(e){
                    var myVar =  $(this).closest("li").index()+1;
                    let $star = $(this).closest("ul").children();
                    let half = ($(this).innerWidth() / 2) + $(this).position().left;
                    let ind = $(this).parent().index();
                    //console.log(myVar);
                    $(this).closest(".uiStar").data("star",myVar);
                    $(this).closest(".uiStar").attr("data-star",myVar);
                    var v;
                    if(half <= e.pageX){
                        v = myVar+0;
                        console.log(v);
                        $(this).parent().addClass("f").removeClass("h");
                    }else{
                        v = myVar-0.5;
                        console.log(v);
                        $(this).parent().addClass("h").removeClass("f");
                    }
                    $star.each(function(i,n){
                        if(i == ind){
                            return;
                        }else if(i < ind){
                            $(n).addClass("f");
                        }else{
                            $(n).removeClass("f h");
                        }
                    });
                    $(this).closest(".ui-star").find(".amt").val(myVar);
                    $(this).closest(".ui-star").find(".p").html(v);
                    
                });
            },
            set:function(){
                $(".ui-star").each(function(){
                    $(this).find("ul>li").removeClass();
                    //$(this).find("ul>li").removeClass("f");
                    // var v = $(this).attr("data-star");
                    var v = $(this).find(".amt").val();
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
                    if( $(this).is(".ht") ) {
                        var stdata = $(this).data("satis");						
                        $(this).find(".p").removeClass("dis");
                        if (v == 0) {
                            $(this).find(".p").addClass("dis");
                        }
                        // console.log(stdata[v]);
                        $(this).find(".p").html(stdata[v]);
                    }
                });
            }
        }
    },
    loading:{ // 로딩중..
        show: function () {
            if( !$(".ui-loading").length ) {
                // var els = '<div class="ui-loading"><em></em></div>';
                var els = '<div class="ui-loading">'+
                                '<div class="box">'+
                                    '<em class="rtt">'+
                                        '<i class="rot l"></i>'+
                                        '<i class="rot r"></i>'+
                                    '</em>'+
                                '</div>'+
                            '</div>';
                $("body").prepend(els).addClass("is-loading");
            }
        },
        hide: function () {
            $(".ui-loading").remove();
            $("body").removeClass("is-loading");
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
                // _this.opt.axis = $(this).hasClass("x") ? "x" : "y" ;
                // console.log(_this.opt.axis);
                // if( $(this).find(">*").length >= 1 ){
                    // $(this).mCustomScrollbar(_this.opt);
                // }

                _this = new PerfectScrollbar(this, {
                    wheelSpeed: 0.3,
                    wheelPropagation: false,
                    minScrollbarLength: 10,
                    scrollingThreshold :1000,
                    useBothWheelAxes:true
                });

            });
            // $(".ui-mcscroll").mCustomScrollbar("update");
            // $(".ui-mcscroll").mCustomScrollbar("destroy");
            // $(".ui-mcscroll").mCustomScrollbar("disable",true);
        }
    },
    accd:{ // 아코디언 UI
        init: function() {
            this.using();
            this.set();
        },
        set:function(){
            $(".ui-accd>li>.cbox").hide();
            $(".ui-accd>li.open>.cbox").show();
            $(".ui-accd>li.expt>.cbox").show();
            $(".ui-accd>li>.hbox .btn-tog").each(function(){
                if( !$(this).find(".btxt").length ){ $(this).append('<span class="btxt"></span>'); }

                if( $(this).closest("li").is(".open") ){
                    $(this).find(".btxt").text("닫기");
                }else{
                    $(this).find(".btxt").text("열기");
                }
            });
        },
        using: function() {
            $(document).on("click", ".ui-accd>li:not(.expt)>.hbox .btn-tog", function() {
                var type =  $(this).closest(".ui-accd").attr("data-accd");
                var $li =   $(this).closest("li");
                var $cbox = $li.find(">.cbox");
                // console.log(type);
                if( type == "tog" ){
                    if( $cbox.is(":hidden") ){
                        $cbox.slideDown(100,function(){
                            $li.addClass("open").find(".btn-tog>.btxt").text("닫기");
                        });
                    }else{
                        $cbox.slideUp(100,function(){
                            $li.removeClass("open").find(".btn-tog>.btxt").text("열기");
                        });
                    }
                }
                if( type == "accd" ){
                    $(this).closest(".ui-accd").find(">li.open").not("li.expt").find(">.cbox").slideUp(100,function(){
                        $(this).closest(".ui-accd").find(">li.open").removeClass("open").find(".btn-tog>.btxt").text("열기");
                    });
                    if( $cbox.is(":hidden") ){
                        $cbox.slideDown(100,function(){
                            $li.addClass("open").find(".btn-tog>.btxt").text("닫기");
                        });
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
            $(".timepicker").each(function(i){
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
                var ptit = $(els).attr("title") || "시간선택";
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
                        title: ptit,
                        confirm: '완료',
                        cancel: '취소',
                    },
                    translate:function(type, text) {
                        var suffixes = {
                            year: '년',
                            month: '월',
                            day: '일',
                            hour: '시',
                            minute: '분',
                        };
                        return Number(text) + suffixes[type];
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
    datepick:{ // 달력피커 jQuery-ui
        init:function(){
            
                
            $("input.datepicker").on("click",function(){
                $(this).next(".ui-datepicker-trigger").trigger("click");
            });
            $("input.datepicker").on("focus",function(){
                // $(this).blur();
                $(this).prop("readonly",true);
                // $(this).attr("tabindex","-1");
                // $(this).next(".ui-datepicker-trigger").focus();
            });

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

            $(document).on("click",".ui-datepicker-header .btsy .bt.prev",function(e){
                e.preventDefault();
                for (var i = 0; i < 12; i++) {
                    $(".ui-datepicker-prev").trigger("click");
                }
                setTimeout(function(){
                    $(".ui-datepicker-header .btsy .bt.prev").focus();
                });
            });
            $(document).on("click",".ui-datepicker-header .btsy .bt.next",function(e){
                e.preventDefault();
                for (var i = 0; i < 12; i++) {
                    $(".ui-datepicker-next").trigger("click");
                }
                setTimeout(function(){
                    $(".ui-datepicker-header .btsy .bt.next").focus();
                });
            });
            
            this.set();
        },
        set:function(params){
            var _this = this;
            this.opts = $.extend({
                id:"",
                // minDate: '-3M',
                  // maxDate: '+28D',
                showOn: "button",
                showButtonPanel: true,
                // changeYear:true ,
                // changeMonth:true,
                buttonText: "달력",
                showMonthAfterYear: true,
                dateFormat:"yy-mm-dd",
                yearRange: 'c-100:c+10',
                yearSuffix: "년",
                dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
                monthNames : [ "1","2","3","4","5","6","7","8","9","10","11","12"],
                monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
                beforeShow: function(els,id) {
                    // ui.lock.using(true);

                    console.log($(this).attr("id"));
                    $(".ui-datepicker").wrap('<div class="ui-datepickwrap"></div>');
                    setTimeout(function(){
                        $(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
                        // $("#ui-datepicker-div").attr("tabindex","-1").focus();
                        $("#ui-datepicker-div .ui-state-active").attr({"title":"선택됨"});
                        $("#ui-datepicker-div .ui-state-highlight").attr({"title":"오늘날짜"});
                        

                        _this.setYY(els,id);


                        $(".ui-datepickwrap").addClass("open");
                        ui.lock.using(true);
                    });
                },
                onSelect :function(date,els){
                    // console.log(date,els);
                    $(this).trigger("change");
                    // $(this).focus();
                    $(this).removeClass("init");
                },
                onChangeMonthYear  :function(els,id){

                    setTimeout(function(){
                        $(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"#"});
                        $("#ui-datepicker-div").attr("tabindex","-1").focus();
                        _this.setYY(els,id);
                    });
                    window.setTimeout(ui.datepick.wkThis);
                },
                onClose:function(date,els){
                    // console.log(date,els);
                    // ui.lock.using(false);
                    // $("#"+els.id).focus();
                    $(".ui-datepickwrap").removeClass("open");
                    setTimeout(function(){
                        $(".ui-datepicker").unwrap(".ui-datepickwrap");
                        ui.lock.using(false);
                    },200);
                }
            }, params); 
            if( this.opts.id ) {
                $("#"+this.opts.id+":not(:disabled)").datepicker(this.opts).addClass("datepicker");
            }else{
                $("input:not(:disabled).datepicker").datepicker(this.opts);
            }
            $("input:not(:disabled).datepicker").prop("readonly",true);
        },
        setYY:function(els,id){
            var dtit = $(els).attr("title") || "날짜선택";
            // console.log(dtit);
            if( !$(".ui-datepicker .dtit").length ) $(".ui-datepicker").prepend('<h4 class="dtit">'+dtit+'</h4>');
            var btsy = '<div class="btsy">'+
                            '<button class="bt prev" type="button">이전</button>'+
                            '<button class="bt next" type="button">다음</button>'+
                        '</div>';
            if( !$(".ui-datepicker-header .btsy").length ) $(".ui-datepicker-header").prepend(btsy);
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
    },
    tooltips:{ // 툴팁레이어
        init:function(){
            var els = "[data-ui-tooltip='btn']";
            var _this = this;
            $(document).on("click",".ui-tooltips .btn-pop-close",function(e){
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
            this.set();
            if( ui.param.tog ) this.set( ui.param.tog );
        },
        set:function(id){
            $("[data-ui-tog='ctn']").hide();
            $("[data-ui-tog='ctn'].open").show();
            var _this = this;
            // var togid = id.split(",");
            $("[data-ui-tog='btn']").each(function(idx){
                // console.log(idx,togid[idx] );
                // $("[data-ui-tog='btn'][href='#"+togid[idx]+"']").trigger("click");
                // _this.open(togid[idx]);

                if( !$(this).find(".btxt").length ){ $(this).append('<span class="btxt"></span>'); }
    
                if( $(this).is(".open") ){
                    $(this).find(".btxt").text("닫기");
                }else{
                    $(this).find(".btxt").text("열기");
                }
            });
        },
        open:function(id){
            $("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").addClass("open").find(".btxt").text("닫기");
            $("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideDown(100,function(){
                $(this).addClass("open");
            });
        },
        close:function(id){
            $("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").removeClass("open").find(".btxt").text("열기");
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
        els:".pop-layer:visible  , .ui-confrim:visible , .ui-alert:visible",
        set:function(){
            if(	$(this.els).length <= 0 ){
                this.using(false);
            }
        },
        using:function(opt){

            if( opt === true && this.stat === false ){
                this.stat = true;
                ui.lock.sct = $(window).scrollTop();
                $("body , html").addClass("is-lock is-lock-end");
                $("html").css({"top":""+(-ui.lock.sct)+"px"});
                $(this.els).bind("touchmove scroll", function(e){ e.preventDefault(); });
            }
            if( opt === false && $(this.els).length <= 0 && $("body").is(".is-lock") ){
                this.stat = false;
                $("body , html").removeClass("is-lock");
                $("html").css({"top":""});
                $(window).scrollTop( ui.lock.sct );
                $(this.els).unbind("touchmove scroll");
                setTimeout(function(){
                    $("body , html").removeClass("is-lock-end");
                },50);
            }
        }
    },
    slides:{ // 스와이프 슬라이드
        init:function(){
            $(this.sample1.els +" ul.slide" ).length && this.sample1.using();
            $(this.sample2.els +" ul.slide" ).length && this.sample2.using();
        },
        sample1:{  //  static/html/mn/main.jsp
            els: ".slide-sample1 .swiper-container",
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
            els: ".slide-sample2 .swiper-container",
            opt: {
                slidesPerView: 2.2,
                freeMode: true,
                observer: true,
                observeParents: true,
                spaceBetween:10,
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
            cls:"",
            ycb:"",
            ybt:"확인"
        }, params);

        if( $(".ui-alert").length ) return;
        
        ui.lock.using(true);
        // console.log(opt.tit);

        var lyAlert =
        '<article class="ui-alert ' + opt.cls + '" tabindex="0">' +
        '	<div class="pbd">'+
        '		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
        '		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
        '		<div class="pbt">'+						
        '			<button type="button" class="btn btn-confirm">'+ opt.ybt +'</button>'+
        '		</div>'+
        '		<button type="button" class="btn-close">닫기</button>'+
        '	</div>'+
        '</article>';
        $("body").append(lyAlert).addClass("is-alert");
        if (opt.tit) {
            $(".ui-alert>.pbd>.phd").addClass("is-tit");
        }
        $(".ui-alert:visible").focus();

        $(".ui-alert").find(".btn-confirm").on("click",function(){
            window.setTimeout(opt.ycb);
        });
        $(".ui-alert").find(".btn-close , .btn-confirm").on("click",alertClose);

        function alertClose(){
            $(".ui-alert").remove();
            $("body").removeClass("is-alert");
            if( $(".pop-layer:visible").length < 1 ){
                ui.lock.using(false);
            }
        }
    },
    confirm:function(msg,params){ // 커스텀 컨펌

        var opt = $.extend({
            msg:msg,
            tit:"",
            cls:"",
            ycb:"",
            ybt:"확인",
            ncb:"",
            nbt:"취소"
        }, params);

        if( $(".ui-confrim").length ) return;
        
        ui.lock.using(true);

        var lyConfirm =
        '<article class="ui-confrim ' + opt.cls + '" tabindex="0">' +
        '	<div class="pbd">'+
        '		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
        '		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
        '		<div class="pbt">'+
        '			<button type="button" class="btn btn-cancel">'+ opt.nbt +'</button>'+
        '			<button type="button" class="btn btn-confirm">'+ opt.ybt +'</button>'+
        '		</div>'+
        '		<button type="button" class="btn-close">닫기</button>'+
        '	</div>'+
        '</article>';
        $("body").append(lyConfirm).addClass("is-confrim");
        if (opt.tit) {
            $(".ui-confrim>.pbd>.phd").addClass("is-tit");
        }
        $(".ui-confrim:visible").focus();

        $(".ui-confrim").find(".btn-confirm").on("click",function(){
            window.setTimeout(opt.ycb);
        });

        $(".ui-confrim").find(".btn-cancel").on("click",function(){
            window.setTimeout(opt.ncb);
        });

        $(".ui-confrim").find(".btn-confirm, .btn-close , .btn-cancel").on("click",confirmClose);

        function confirmClose(){
            $(".ui-confrim").remove();
            $("body").removeClass("is-confrim");
            if( $(".pop-layer:visible").length < 1 ){
                ui.lock.using(false);
            }
        }
    },
    toast:function(msg,params){ // 토스트창 
        var _this = this;
        _this.opt = $.extend({
            msg:msg,	
            cls:"",
            sec:2000,
            bot:"",
            ccb: null,
            zIndex:1000,
            setTime:true 
        }, params);

        if ( $(".pop-toast:visible").length ) { return; }

        var lyToast =
        '<article role="alert" aria-live="assertive" class="pop-toast ' + _this.opt.cls + '">' +
        '	<div class="pbd">' +
        '		<div class="pct">' + _this.opt.msg + '</div>' +
        '		<button type="button" class="btn-close""></button>' +
        '	</div>' +
        '</article>';

        $("body").append(lyToast).addClass("is-toast");

        $(".pop-toast").find(".btn-close").on("click",function(){
            toastClose("close");
        });

        window.setTimeout(function() {
            $(".pop-toast:visible").addClass("on").css({"padding-bottom" : _this.opt.bot , "z-index" : _this.opt.zIndex});
        });
        
        if(_this.opt.setTime){
            toastClose();
        }
        function toastClose(sec){
            if(sec == "close"){
                _this.opt.sec = 0;
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(function() {
                $(".pop-toast:visible").removeClass("on").on(ui.transitionend,function(){
                    // console.log("fsd");
                    $(".pop-toast").remove();
                    $("body").removeClass("is-toast");
                    if( typeof _this.opt.ccb == "function" ){
                        _this.opt.ccb();
                    }
                });
            }, _this.opt.sec);
        }
    
        
    },
    popup:{ // 레이어팝업
        init: function() {
            var _this = this;
            $(document).on("click", ".pop-layer .btn-pop-close:not('.non')", function() {
                var id = $(this).closest(".pop-layer").attr("id");
                _this.close(id);
            });

            $(document).on("click", ".pop-layer", function(e) {
                var id = $(this).closest(".pop-layer").attr("id");
                // console.log(e.target);
                if ( $(e.target).is(".pop-layer") ) {
                    _this.close(id);
                }
            });
            _this.resize();
            $(window).on("load resize",function(){
                _this.resize();
            });
            // 레이어팝업내에서 입력시 스크롤 조정
            // var elsInput =  ".pop-layer:visible .input input ,"+
            // 				".pop-layer:visible .textarea textarea";
            // $(document).on("click focus", elsInput  , function(e) {
            // 	var els = $(this).closest(".input , .textarea") ;
            // 	var id = $(this).closest(".pop-layer").attr("id");
            // 	window.setTimeout(function(){
            // 		var myTop = els.offset().top + $("#"+id+" .pct").scrollTop() - $(window).scrollTop() - $("#"+id+">.pbd").position().top  ;
            // 		var myMax = $("#"+id+" .poptents").outerHeight() * 0.5  ;
            // 		var phdH = $("#"+id+" .phd:visible").outerHeight() + 20 || 0 ;
            // 		//console.log(myTop , $("#"+id+" .phd").position().top );
            // 		$("#"+id+" .pct").scrollTop(myTop - phdH);
            // 		if ( myTop >= myMax ) {
            // 			//console.log("fsd");
            // 		}
            // 		//console.log( $("#"+id+" .pct").scrollTop() ,  $("#"+id+" .pbt:visible").outerHeight() || 0 );
            // 		_this.resize();
            // 	},600);
            // });

            this.drag.init();
        },
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
            }, params);

            _this.callbacks[id] = {} ;
            _this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
            _this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;

            ui.lock.using(true);

            $("body").addClass("is-pop "+ "is-"+id);
            if( $("#" + id).find(".pbt").length ) {
                $("body").addClass("is-pop-pbt");
            }
        
            $("#" + id).addClass(_this.opt.direct).css({ zIndex: _this.opt.zIndex }).fadeIn(10,function(){
                $(this).addClass("on").attr("tabindex","0").focus(); 
                _this.resize();
                $(this).find(">.pbd").on(ui.transitionend,function(){
                    if(_this.callbacks[id].open)  _this.callbacks[id].open();
                    $(this).off(ui.transitionend);
                });
            });
            
            window.setTimeout(function(){
                _this.resize();
            });

            /* 웹접근선 팝업안에서 탭키이동 */
            var pbd = $("#" + id).find(".pbd");
            var pls = pbd.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
            var peF = pls && pls.first();
            var peL = pls && pls.last();

            pls.length ? peF.focus().on("keydown", function(event) { 
                // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
                if (event.shiftKey && (event.keyCode || event.which) === 9) {
                    // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
                    event.preventDefault();
                    peL.focus();
                }
            }) : pbd.attr("tabindex", "0").focus().on("keydown", function(event){
                tabDisable = true;
                if ((event.keyCode || event.which) === 9) event.preventDefault();
                // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
            });

            peL.on("keydown", function(event) {
                if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                    // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
                    event.preventDefault();
                    peF.focus();
                }
            });


        },
        close: function(id,params) {
            var _this = this;
            _this.closOpt = $.extend({
                ccb: null,
            }, params);

            $("#"+id).removeClass("on").on(ui.transitionend,function(){
                _this.resize();
                $(this).hide().removeClass(_this.opt.direct);
                // if( typeof _this.callbacks[id].close == "function" ){ _this.callbacks[id].close(); }
                try{ _this.callbacks[id].close(); }catch(error){}
                // if( typeof _this.closOpt.ccb == "function") { _this.closOpt.ccb(); }
                try{ _this.closOpt.ccb(); }catch(error){}

                if( !$(".pop-layer:visible").length ){ 
                    ui.lock.using(false);
                    $("body").removeClass("is-pop").removeClass("is-"+id);
                    $("body").removeClass("is-pop-pbt");
                }
                $(this).off(ui.transitionend);
            }).css({"z-index":""});
        },
        resize:function(){
             $(".pop-layer:visible").each(function(){
                var $pop = $(this);
                var pctnH =  $pop.outerHeight();
                var pbtnH =  $pop.find(".pbt:visible").outerHeight() || 0 ;
                pctnH = pctnH - ( $pop.find(".phd").outerHeight() || 0 );
                if( $pop.is(".a") ){ $pop.find(".pbd>div.pct").css({"height": pctnH - pbtnH  }); }
                if( $pop.is(".b") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - pbtnH - 40 });}
                if( $pop.is(".c") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - 20 });}
             });
        },
        drag:{
            init:function(){
                this.evt();
                this.set();
            },
            evt:function(){

            },
            set:function(){
                $(document).on({
                    "touchstart":function(e){
                        console.log("touchstart");
                        s(e,this);
                    },
                    "touchmove":function(e){
                        // console.log("touchmove");
                        m(e,this);
                    },
                    "touchend":function(e){
                        console.log("touchend");
                        ee(e,this);
                    },
                    "mousedown":function(e){
                        // console.log("mousedown");
                    },
                    "click":function(e){
                        e.stopPropagation();
                    }
                },".pop-layer.c .phd");
                function s(e,el){
                    var y = (e.pageY !== undefined)?e.pageY:e.originalEvent.touches[0].screenY;
                    var ph = ( $(el).closest(".pbd").find(".pct").height()  );
                    $(el).data({"data-h":ph,"data-sy":y});
                    console.log( y);
                }
                function m(e,el){
                    e.stopPropagation();
                    e.preventDefault();
                    var y = (e.pageY !== undefined)?e.pageY:e.originalEvent.touches[0].screenY;
                    
                    var diff = $(el).data("data-sy") - y;
                    var wih = window.innerHeight;
                    var wsh = window.screen.availHeight;
                    var sh = window.screen.height;
                    var hDiff = ((wsh - wih) == 63)?63:0;
                    var p = parseInt(diff - hDiff) / ($(window).height() );
                    var ah = parseInt($(el).data("data-h") + p);
                    console.log(y,hDiff,diff,$(el));
                    $(el).closest(".pbd").find(".pct").css("height",diff+ah);
                    console.log(  $(el).data() );
                }
                function ee(e,el){
                    // var y = (e.pageY !== undefined)?e.pageY:e.originalEvent.touches[0].screenY;
                    
                    var diff = $(el).data("data-sy") - $(el).data("ah");
                    var wih = window.innerHeight;
                    var wsh = window.screen.availHeight;
                    var sh = window.screen.height;
                    var hDiff = ((wsh - wih) == 63)?63:0;

                    var p = (diff - hDiff) / ($(window).height() );
                    var pctH = $(el).closest(".pbd").find(".pct").outerHeight();
                    console.log( $(el).data("data-h") , pctH );
                    $(el).removeData("data-h");
                    $(el).removeData("ah");
                }
            }
        },
        scroll:{

        }
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
                $(".ui-sorts").removeClass("open");
            });

            $(document).on("click",".pop-select .btsbot .btcom",function(e){
                var sel = $(this).closest(".pop-select").find(".swiper-slide-active .bt").attr("value");
                var txt = $(this).closest(".pop-select").find(".swiper-slide-active .bt").text();
                var name =  $(this).closest(".pop-select").data("selt-pop");
                var tit = $("select[name='"+name+"']").data("select-title");
                // console.log(name,sel);
                $("select[name='"+name+"']>option[value='"+sel+"']").prop("selected",true);
                $("select[name='"+name+"']").val(sel).prop("selected",true);
                $("select[name='"+name+"']").closest(".select-pop").find(".btsel").html('<i class="txt">'+txt+'</i>').removeClass("is-tit");
                $("select[name='"+name+"']").trigger("change");
                _this.close();
            });

            $(document).on("click",".pop-select .btn-sel-close",function(){
                _this.close();
            });
        },
        sld:{ // 
            els:".pop-select .swiper-container",
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
                if( $(this.els).find(".swiper-slide").length <= 1 ) {
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
                blist += '<li class="swiper-slide '+ dis +'"><span class="bt '+ dis +'" '+ dis +' value="'+list[i].v+'">'+list[i].t+'</span></li>';
            }
            var lyPop =
            '<article class="pop-select" data-selt-pop="'+name+'">' +
            '	<div class="pbd">' +
            '		<div class="phd"><h3 class="ptit">'+tit+'</h3></div>' +
            '		<button type="button" class="btn-sel-close">닫기</button>' +
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
                $("[data-selt-pop='"+name+"'] .list .bt[value='"+sel+"']").addClass("active").closest("li").addClass("active");
                var activeIdx = $("[data-selt-pop='"+name+"'] .list>li.active").index();
                // console.log(   activeIdx  );
                _this.sld.slide.slideTo(activeIdx);
            });
            _this.sld.slide.on("init slideChangeTransitionEnd sliderMove",function(){
                var isActDis = $("[data-selt-pop='"+name+"'] .list>li.swiper-slide-active").is(".disabled");
                // console.log("END" , isActDis);
                if (isActDis == true) {
                    $("[data-selt-pop='"+name+"'] .btcom").prop("disabled",true);
                }else{
                    $("[data-selt-pop='"+name+"'] .btcom").prop("disabled",false);
                }
            });
            ui.lock.using(true);
            $("body").addClass("is-pop-select");
        },
        close:function(){
            var id = $(".pop-select:visible").data("selt-pop");
            $(".pop-select").removeClass("on").fadeOut(100,function(){
                $(this).remove();
                ui.lock.using(false);
            });
            $("select[name="+id+"]").closest(".select-pop").find(".btsel").removeClass("open").focus();
            $("body").removeClass("is-pop-select");
            console.log( "select[name="+id+"] 값 = " ,  $("select[name="+id+"]").val() );
        }
    },
    popselt:{ // 셀렉트 메뉴 팝업
        init:function(){
            this.evt();
            this.set();
        },
        evt:function(){
            var _this = this;

            $(document).on("click", ".pop-selt", function(e) {
                $(this).find(".btn-pop-close").trigger("click");
            }).on("click", ".pop-selt>.pbd", function(e) {
                e.stopPropagation();
            });


            $(document).on("click",".select-popd .btsel",function(){
                var $pop = $(this).closest(".select-popd");
                var name = $pop.find(".slist").attr("name");
                var tit =  $pop.find(".slist").data("select-title") || "옵션선택";
                var sel =  $pop.find(".slist").val();
                var list = [];
                $pop.find(".slist option").each(function(){
                    list.push( { v:$(this).val() ,t:$(this).text() } );
                });
                // console.log(name,tit,list,sel);
                _this.open(name,tit,list,sel);
            });


            $(document).on("click",".pop-selt .list>li button",function(e){
                var sel = $(this).attr("value");
                var txt = $(this).text();
                var name =  $(this).closest(".pop-selt").data("select-pop");
                console.log(name,sel);
                $("select[name='"+name+"']>option[value='"+sel+"']").prop("selected",true);
                $("select[name='"+name+"']").val(sel).prop("selected",true);
                $("select[name='"+name+"']").closest(".select-popd").find(".btsel").text(txt) ;
                $("select[name='"+name+"']").trigger("change");
                _this.close();
            });

            $(document).on("click",".pop-selt .btn-pop-close",function(){
                _this.close();
            });
        },
        set:function(){
            $(".select-popd").each(function(){
                if( !$(this).find(".btsel").length ) {
                    $(this).prepend('<button class="btsel" type="button"></button>');
                }
                if( !$(this).is(".set").length ) {
                    $(this).addClass("set");
                }
                var $btSel = $(this).find(".btsel");
                var tit = $(this).find(".slist").data("select-title") || "옵션선택";
                var sel = $(this).find(".slist").val();
                var txt = $(this).find(".slist option:selected").text() || tit;
                var dis = $(this).find(".slist").prop("disabled");
                var list = [];
                $(this).find(".slist option").each(function(){
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
            if ( $(".pop-selt:visible").length ) { return; }
            var blist="";
            for(var i in list) {
                blist += '<li><button type="button" class="bt" value="'+list[i].v+'">'+list[i].t+'</button></li>';
            }
            var lyPop =
            '<article class="pop-selt" data-select-pop="'+name+'">' +
                '<div class="pbd">' +
                    '<div class="phd"><h3 class="tit">'+tit+'</h3></div>' +
                    '<button type="button" class="btn-pop-close">닫기</button>' +
                    '<div class="pct">' +
                        '<main class="poptents">' +
                            '<ul class="list">'+blist+'</ul>' +
                        '</main>' +
                    '</div>' +
                '</div>' +
            '</article>';
            $("body").append(lyPop);

            $(".pop-selt").fadeIn(100,function(){	
                $(this).addClass("on");
                 // console.log(name, sel);

                $("[data-select-pop='"+name+"'] .list button[value='"+sel+"']").addClass("active");
            }).attr("tabindex","0").focus();
            ui.lock.using(true);
        },
        close:function(){
            var id = $(".pop-selt:visible").data("select-pop");
            $(".pop-selt").removeClass("on").fadeOut(100,function(){
                $(".pop-selt").remove();
                ui.lock.using(false);
            });
            $("select[name="+id+"]").closest(".select-popd").find(".btsel").attr("tabindex","0").focus();
        }
    },
    popseltm:{ // 다중선택 팝업
        init:function(){
            this.evt();
            this.set();
        },
        evt:function(){
            var _this = this;

            $(document).on("click", ".pop-select-mul", function(e) {
                $(this).find(".btn-pop-close").trigger("click");
            }).on("click", ".pop-select-mul>.pbd", function(e) {
                e.stopPropagation();
            });

            $(document).on("click",".select-mul .btsel",function(){
                var name = $(this).closest(".select-mul").data("select-name");
                var tit =  $(this).closest(".select-mul").data("select-title") || "옵션선택";
                var list = [];
                $(this).closest(".select-mul").find(".slist input").each(function(){
                    list.push( { v:$(this).is(":checked") ,t:$(this).closest("li").find(".txt").text(), a:$(this).is(".chkAll") } );
                });
                // console.log(list);
                _this.open(name,tit,list);
            });
            
            $(document).on("click",".pop-select-mul .btn-pop-close",function(){
                var $pop = $(this).closest(".pop-select-mul");
                var id   = $pop.data("select-pop");
                var sel  = $pop.find("input:checked").val();
                var txt  = $pop.find("input:checked").next(".txt").text();
                var tit  = $pop.find(".phd .tit").text();
                _this.close(id,sel,txt,tit);
            });
            $(document).on("click",".pop-select-mul .btn-com",function(){
                var $pop = $(this).closest(".pop-select-mul");
                var id   = $pop.data("select-pop");
                var sel  = $pop.find("input:checked").val();
                var txt  = $pop.find("input:checked").next(".txt").text();
                _this.com(id,sel,txt);
            });

            $(document).on("click",".pop-select-mul .list button",function(){

                var $pop = $(this).closest(".pop-select-mul");
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
                            $pop.find(".btn-com").prop("disabled",false);
                            return;
                        }else{
                            $lst.find("li.active:not('.chkAll')").addClass("active");
                            // console.log("전체 비활");
                            $pop.find(".btn-com").prop("disabled",true);
                        }
                    }else{
                        if( chkeds == 0 ) {
                            $pop.find(".btn-com").prop("disabled",true);
                        }else{
                            $pop.find(".btn-com").prop("disabled",false);
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
                        $pop.find(".btn-com").prop("disabled",true);
                    }else{
                        $pop.find(".btn-com").prop("disabled",false);
                    }
                }
                // console.log("dd" , chkeds);
            });

        },
        set:function(){
            $(".select-mul").each(function(){
                // var _this = this;
                if( !$(this).find(".btsel").length ) {
                    $(this).prepend('<button class="btsel" type="button"></button>');
                }
                if( !$(this).is(".set").length ) {
                    $(this).addClass("set");
                }
                var $btSel = $(this).find(".btsel");
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
                var $ckbox = $("[data-select-name="+id+"] .slist li:nth-child("+i+") input");
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
            $("[data-select-name="+id+"]").find(".btsel").html(ttt).attr("tabindex","0").focus();

            $("[data-select-name="+id+"] .btsel").trigger("click");	
            this.close(id);
        },
        open:function(name,tit,list){
            if( $(".pop-select-mul:visible").length ) { return; }
            var blist = "";
            var cls,all;
            for(var i in list) {
                list[i].v ? cls = "active"  : cls = "";
                list[i].a ? all = " chkAll" : all = "";
                blist += '<li class="'+cls+all+'"><button class="bt" type="button">'+list[i].t+'</button></li>';
            }
            var lyPop =
            '<article class="pop-select-mul" data-select-pop="'+name+'">' +
                '<div class="pbd">' +
                    '<div class="phd"><h3 class="tit">'+tit+'</h3></div>' +
                    '<button type="button" class="btn-pop-close">닫기</button>' +
                    '<div class="pct">' +
                    '<main class="poptents">' +
                        '<ul class="list">'+blist+'</ul>' +
                    '</main>' +
                    '</div>' +
                    '<button type="button" class="btn a sm btn-com">완료</button>' +
                '</div>' +
            '</article>';
            $("body").append(lyPop);

            $(".pop-select-mul").fadeIn(100,function(){																			
                $(this).addClass("on");
                // console.log("오픈");
                if( $("[data-select-pop="+name+"] .list li.active").length == 0 ){
                    $("[data-select-pop="+name+"] .btn-com").prop("disabled",true);
                }
            }).attr("tabindex","-1").focus();
            ui.lock.using(true);
        },
        close:function(id) {
            $(".pop-select-mul").removeClass("on").fadeOut(100,function(){
                $(this).remove();
            });
            $("[data-select-name="+id+"] .btsel").attr("tabindex","0").focus();
            ui.lock.using(false);
        }
    },
    popLayer:{ // 레이어팝업
        init: function() {
            var _this = this;
            $(document).on("click", ".popLayer:not(.win) .btn-pop-close", function() {
                var id = $(this).closest(".popLayer").attr("id");
                // console.log(id);
                if (_this.callbacks[id].hash) {
                    window.history.back();
                }else{
                    _this.close(id);
                }
            });

            $(document).on("click", ".popLayer", function(e) {
                // $(this).find(".btn-pop-close").trigger("click");
                var id = $(this).closest(".popLayer").attr("id");
                if ( $(e.target).is(".popLayer") ) {
                    _this.close(id);
                }
            });

            // $(document).on("click", ".popLayer>.pbd , .btn-pop-close", function(e) {
            // 	e.stopPropagation();
            // });

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
    popframe:{ // 팝프레임
        init:function(){
            var _this = this;
            $(document).on("click", ".pop-frame .btn-pop-close", function() {
                var id = $(this).closest(".pop-frame").attr("id");
                
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
            $("body").addClass("is-pop-frame");
        },
        close:function(id){
            $("body").removeClass("is-pop-frame");
            $("#" + id).hide(0,function(){
                if( !$(".pop-frame:visible").length ) ui.lock.using(false);
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
            this.loading = $(".ui-loadmore");
            this.moreCallback();
        },
        using: function() {
            // 페이지 하단 도착
            $(window).on("scroll load", function() {
                var sct = Math.ceil( $(window).scrollTop() + $(window).outerHeight() + $(".ui-loadmore:visible").outerHeight() + 30 );
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
            this.loading = $(".ui-loadmore");
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
    },
    data:{ // localStorage Set Get
        set:function(name,obj){
            var orgs = JSON.parse( localStorage.getItem(name) ) || {};
            var news = obj;
            // news[key] = val;
            if (typeof obj == "object") {
                news = $.extend(orgs,news);
                // news = Object.assign(orgs,news);
            }
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
                    console.log(inc);
                    var incopt = $(this).data("include-opt");				
                    var incNums = $inchtml.length ;
                    $(this).load( inc ,function(response, status, xhr){
                        // console.log( inc, idx+1 , incNums,  status, xhr);
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
    }
};

// ui.init();
$(document).ready(function(){
    // console.log(typeof ui.html.set);
    if ( typeof ui.html.set  == "undefined" ) {
        ui.init();
        console.log("ui.init();");
    }else{
        ui.html.include();
        ui.html.times = setInterval(function(){ // console.log("ui.html" ,  ui.html.incCom);
            if (ui.html.incCom) {
                clearInterval(ui.html.times);
                ui.init();
                console.log("ui.init();");
            }
        });
    }
});




ui.history = {
    add : function(key, val) {
        var h 		= "";
        var isAdd  	= true;
        var data 	= location.hash.replace(/^#/, "").split("&");
        
        if (location.hash == "") {
            location.hash = "#loactionHash";
            this.add(key, val);
        } else {
            for (var i in data) {
                var tmp = data[i].split("=");
                if (tmp[0] == key) {
                    data[i] = key + "=" + val;
                    isAdd = false;
                    break;
                }
            }
            
            if (isAdd) {
                data.push(key + "=" + val);
            }
            
            h += "loactionHash";
            
            for (var j in data) {
                if(data[j] != "loactionHash"){
                    h += "&" + data[j];
                }
            }
            
            var locationJ = $(location)[0];
            var pathnameSearch = locationJ.pathname + locationJ.search + '#';
            
            history.replaceState(null, null, pathnameSearch+h);
        }
        
    },
    /* 	
    addArray : function(arr) {
        
        var h 		= "";
        var data 	= location.hash.replace(/^#/, "").split("&");
        
        if (typeof arr == "undefined" || arr == null || arr.length == 0) {
            return;
        }
        
        if (location.hash == "") {
            for (var i in arr) {
                if (i > 0) h += "&";
                h += arr[i];
            }
            document.location.hash = h;
        } else {
            for (var i in data) {
                var tmp = data[i].split("=");
                for (var j in arr) {
                    var tmp2 = arr[j].split("=");
                    if (tmp[0] == tmp2[0]) {
                        data[i] = arr[j];
                        arr.splice(j, 1);
                    }
                }
            }
            
            if (arr != null && arr.length > 0) {
                for (var i in arr) {
                    data.push(arr[i]);
                }
            }
            
            for (var i in data) {
                if (i > 0) h += "&";
                h += data[i];
            }
            
            document.location.hash = h;
        }
    },
    */
    remove : function(key) {
        if (location.hash.length > 0) {
            var arr = location.hash.replace(/^#/, "").split("&");
            var idx = -1;
            var str = "";
            
            if (arr.length == 1) {
                idx = 0;
                str = arr.toString().split("=")[0];
            } else {
                for (var i in arr) {
                    if (arr[i].indexOf(key + "=") > -1) {
                        idx = i;
                        str = arr[i].toString().split("=")[0];
                        break;
                    }
                }
            }
            
            if (str == key) {
                arr.splice(idx,1);
            }
            
            var h = "";
            
            h += "loactionHash";
            
            for (var j in arr) {
                if(arr[j] != "loactionHash"){
                    h += "&" + arr[j];
                }
            }
            
            var locationJ = $(location)[0];
            var pathnameSearch = locationJ.pathname + locationJ.search + '#';
            
            history.replaceState(null, null, pathnameSearch+h);
        }
    },
    get : function(arg) {
        var hashData = "";
        if (location.hash.length > 0) {
            var data = location.hash.replace(/^#/, "").split("&");
            for (var i in data) {
                if (data[i].indexOf(arg + "=") > -1) {
                    hashData = data[i].split("=")[1];
                    break;
                }
            }
        }
        return hashData;
    }
};
