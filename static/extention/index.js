const extention = {
	init: function(){
		this.bgs.init();
		this.iosx.init();
	},
	iosx:{
		init: function(){
			this.evt();	
		},
		evt: function(){
			document.addEventListener("keydown", e => e.code == "KeyQ" && e.altKey ? this.set(true) : null )	;
			extention.param['iosx'] == "true" ? this.set(true) : this.set(false);
			console.log(  extention.param['iosx']  );
		},
		set: function(opt){
			console.log(opt);
			const html = document.querySelector("html");
			if ( opt && !html.classList.contains("iosx") ) {
				console.log(opt);
				document.querySelector("head")?.insertAdjacentHTML("beforeend", `<style class="iosx"> :root{ --safe-top: 26px !important; --safe-bottom: 26px !important; }</style>`);
				document.querySelector("body")?.insertAdjacentHTML("afterbegin", `<div class="nochi"><div class="rbox"></div><span class="inf"><b></b><i></i></span></div>`);
				html.classList.add("iosx");
				const time =() => {
					const d = new Date();
					let hh = d.getHours() > 12 ? d.getHours() - 12 : d.getHours() ;
					let min = d.getMinutes();				
					const digt = n => n < 10 ? "0"+n : n ;
					const ttt =  `${digt(hh) > 12 ? "오후" : "오전"} ${digt(hh)}:${digt(min)}`;
					document.querySelector(".nochi .inf b").innerHTML = ttt;
				};
				this.clock = setInterval( time , 1000);
				time();
			}else{
				clearInterval(this.clock);
				html.classList.remove("iosx");
				document.querySelector("style.iosx")?.remove();
				document.querySelector("body>.nochi")?.remove();
			}
		}
	},
	bgs:{
		init: function(){
			 
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