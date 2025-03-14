const extention = {
	init: function(){
		this.bgs.init();
		
		if(typeof window !== 'undefined') setTimeout(() => { this.iosx.init(); },50); 
		this.apppush.init();
		document.querySelector("head")?.insertAdjacentHTML("beforeend",`<style>a,button,input { user-select: auto; touch-action: auto; -webkit-tap-highlight-color: initial; } button{cursor: pointer;} </style>`);
	},
	iosx:{
		init: function(){
			this.evt();	
		},
		evt: function(){
			document.addEventListener("keydown", e => e.code == "KeyQ" && e.altKey ? this.set(true) : null )	;
			// extention.param['iosx'] == "true" ? this.set(true) : this.set(false);
			// console.log(  extention.param['iosx']  );
			localStorage.getItem("isIOSX") == 'true' ? this.set(true) : this.set(false)
		},
		top: ()=>    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-top").replace(/[^0-9]/g, "")) || 0 ,
		bottom: ()=> parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom").replace(/[^0-9]/g, "")) || 0,
		set: function(opt){
			// console.log(opt);
			const html = document.querySelector("html");
			if ( opt && !html.classList.contains("iosx") ) {
				console.log(opt);
				document.querySelector("head")?.insertAdjacentHTML("beforeend", `<style class="iosx"> :root{ --safe-top: 26px !important; --safe-bottom: 26px !important; }</style>`);
				document.querySelector("body")?.insertAdjacentHTML("afterbegin", `<div class="nochi"><div class="rbox"></div><span class="inf"><b></b><i></i></span></div>`);
				html.classList.add("iosx");
				const time =() => {
					const date = new Date();
					const digt = n => n < 10 ? "0"+n : n ;
					const hh = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() ;
					const mm = date.getMinutes();				
					const time =  `${digt(hh) > 12 ? "오후" : "오전"} ${digt(hh)}:${digt(mm)}`;
					document.querySelector(".nochi .inf b").innerHTML = time;
				};
				this.clock = setInterval( time , 1000);
				time();
				localStorage.setItem('isIOSX',true);
			}else{
				clearInterval(this.clock);
				if(document.querySelector("html")){
					html.classList.remove("iosx");
					document.querySelector("style.iosx")?.remove();
					document.querySelector("body>.nochi")?.remove();
				}
				localStorage.setItem('isIOSX',false);
			}
		}
	},
	bgs:{
		init: function(){
			const isImgUrl = location.pathname.split('.').pop().includes('png','jpg','gif');
			if( !isImgUrl ) { return } console.log('img');
			const bgSrc = chrome.runtime.getURL("/img/bg.png");
			document.body.style.backgroundImage = `url('${bgSrc}')`;
			const isImg = document.querySelector("body>img");
			if( !isImg ) { return }
			isImg.style.backgroundColor = "transparent";
		}
	},
	apppush:{
		init: function(){
			location.pathname.includes('/webapp/mobile/images/push/') ? this.evt() : null;
		},
		evt: function(){
			document.addEventListener("keydown", e =>  this.set(e) );	
		},
		set: function(e){
			const path = location.pathname;
			const extn = path.split('.').pop();
			const ppp = path.split(`.${extn}`)[0].slice(0,-2);
			let num = parseInt( path.split(`.${extn}`)[0].slice(-2) );
			const dgit = t => t < 10 ? "0"+t : t;
			const gourl = url => location.href = location.href.replace(location.host, `${url}`);
			const goimg = eee => location.href = `https://${location.host + ppp + dgit(num)}.${extn}`
			switch (e.code) {
				case 'ArrowUp' : gourl('image.lottecard.co.kr'); break;
				case 'ArrowDown' : gourl('dimage.lottecard.co.kr'); break;
				case 'ArrowRight' : goimg(num++); break;
				case 'ArrowLeft' : goimg(num--); break;
			}
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
};
document.addEventListener("DOMContentLoaded", extention.init() );