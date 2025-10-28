const extention = {
	init: function(){
		this.bgs.init();
		this.speedScroll.init();
		this.gesture.init();
		
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
			// const bgSrc = chrome.runtime.getURL("/img/bg.png");
			const bgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBGQzU2Qjg5MjQ2QTExRTk4REJBODk3REE0NzhEQUQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBGQzU2QjhBMjQ2QTExRTk4REJBODk3REE0NzhEQUQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEZDNTZCODcyNDZBMTFFOThEQkE4OTdEQTQ3OERBRDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEZDNTZCODgyNDZBMTFFOThEQkE4OTdEQTQ3OERBRDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kopueAAAAgklEQVR42oxSQQ7AIAgT4k/8/4/0LcyNjDQMcD0Y0RYKSiLSIqy1MNw0ItprbwlcImXvDbcc9ADZlQBJqOfCkqX/ZUl53xOum5YXdn7uwVrXsM85XXV1P8YIE3E4jWLWjNVNmT3/LcA79J0KcNg2+4MlK2LsypIzUFCDCvgRMsElwABTx1bBTttNIwAAAABJRU5ErkJggg==';
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
			const goimg = eee => location.href = `${location.origin + ppp + dgit(num)}.${extn}`;
			switch (e.code) {
				case 'ArrowUp' : gourl('image.lottecard.co.kr'); break;
				case 'ArrowDown' : gourl('dimage.lottecard.co.kr'); break;
				case 'ArrowRight' : goimg(num++); break;
				case 'ArrowLeft' : goimg(num--); break;
			}
		}
	},
	speedScroll:{
		init: function(){
			this.set();
		},
		set: function(){
			let isRightMouseDown = false;
			let isKeyA = false;
			let suppressContextMenu = false;
			window.addEventListener('keydown', (e)=> {  e.code === 'KeyA' ? isKeyA = true : null; });
			window.addEventListener('keyup', (e)=> {  e.code === 'KeyA' ? isKeyA = false : null; });
			window.addEventListener('mousedown', (e)=> { e.button === 2 ? isRightMouseDown = true : null; });
			window.addEventListener('mouseup', (e)=> { e.button === 2 ? isRightMouseDown = false : null; });
			window.addEventListener('contextmenu', (e)=> { 
				isRightMouseDown = false;
				if (!suppressContextMenu) return;
				e.preventDefault(); 
				suppressContextMenu = false;
				isKeyA = false;
			});

			window.addEventListener('wheel', (e)=> { 
				if (!(isKeyA && !e.ctrlKey || isRightMouseDown)) return; // A 키 or Right마우스 가 눌린 상태에서만 작동
				suppressContextMenu = true;
				const scrollFactor = e.shiftKey ? 0.3 : 2.5; // Shift 키가 눌린 경우 스크롤 속도를 줄임
				const deltaY = e.deltaY * scrollFactor;
				const deltaX = e.deltaX * scrollFactor;
				const el = getScrollableElement(e.target);
				if (!el) return; // 스크롤 가능한 요소가 없으면 종료
				e.preventDefault(); // 기본 스크롤 동작 방지
				el.scrollBy({ top: deltaY, left: deltaX, behavior: e.shiftKey ? 'smooth' : 'auto' });
			},
			{ 
				passive: false // 기본 동작을 방지하기 위해 passive 옵션을 false로 설정
			});

			const getScrollableElement = (el) => {
				while (el && el !== document.body) {
					const style = getComputedStyle(el);
					const overflowY = style.overflowY;
					const isScrollable = (overflowY === 'auto' || overflowY === 'scroll');
					if(isScrollable  && el.scrollHeight > el.clientHeight) { 
						return el;
					}
					el = el.parentElement;
				}
				return document.scrollingElement || document.documentElement;
			}
		},
	},
	gesture:{
		init: function(){
			this.set();
		},
		set: function(){
			





			let isRightClick = false;
			let path = [];
			let lastPos = { x: 0, y: 0 };
			let overlay, ctx;
			let suppressContextMenu = false;
			let messageEl = null; // 피드백 표시용

			function createOverlay() {
				overlay = document.createElement("canvas");
				overlay.style.position = "fixed";
				overlay.style.top = "0";
				overlay.style.left = "0";
				overlay.style.width = "100%";
				overlay.style.height = "100%";
				overlay.style.pointerEvents = "none";
				overlay.style.zIndex = "999998";
				overlay.width = window.innerWidth;
				overlay.height = window.innerHeight;
				document.body.appendChild(overlay);

				ctx = overlay.getContext("2d");
				ctx.strokeStyle = "rgba(0, 150, 255, 0.8)";
				ctx.lineWidth = 3;
				ctx.lineJoin = "round";
				ctx.lineCap = "round";
			}

			function showMessage(gesture, text) {
				if (messageEl) messageEl.remove();
				messageEl = document.createElement("div");
				messageEl.innerHTML = `<strong style="font-size: 52px; font-family: 'Consolas'; letter-spacing: 0px; margin: 0 0 0 0px !important;">${gesture}</strong><p style="margin: 0px !important;">${text}</p>`;
				Object.assign(messageEl.style, {
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					background: "rgba(0,0,0,0.6)",
					color: "white",
					padding: "10px 20px",
					borderRadius: "100%",
					width: "150px",
					height: "150px",
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: "10px",
					textAlign: "center",
					fontSize: "18px",
					lineHeight: "1",
					zIndex: "999999",
					pointerEvents: "auto",
				});
				document.body.appendChild(messageEl);
			}

			function removeMessage() {
				if (messageEl) {
					messageEl.remove();
					messageEl = null;
				}
			}

			function removeOverlay() {
				if (overlay) {
					overlay.remove();
					overlay = null;
					ctx = null;
				}
			}

			function temporarilySuppressContextMenu(duration = 500) {
				suppressContextMenu = true;
				setTimeout(() => {
					suppressContextMenu = false;
				}, duration);
			}

			document.addEventListener("contextmenu", (e) => {
				if (suppressContextMenu) {
					e.preventDefault();
					suppressContextMenu = false; // 한번만 막고 자동 복귀
				}
			});

			document.addEventListener("mousedown", (e) => {
				if (e.button === 2) {
					isRightClick = true;
					path = [];
					lastPos = { x: e.clientX, y: e.clientY };
					if (!overlay) {
						createOverlay();
						ctx.beginPath();
						ctx.moveTo(lastPos.x, lastPos.y);
					}
				}
			});

			document.addEventListener("mousemove", (e) => {
				if (!isRightClick || !ctx) return;

				const dx = e.clientX - lastPos.x;
				const dy = e.clientY - lastPos.y;
				const absDx = Math.abs(dx);
				const absDy = Math.abs(dy);

				if (absDx < 10 && absDy < 10) return;

				const dir =
					absDy > absDx ? (dy > 0 ? "↓" : "↑") : dx > 0 ? "→" : "←";

				if (path[path.length - 1] !== dir) {
					path.push(dir);
					const gesture = path.join("");
					console.log("path:", gesture);

					// 매칭되는 제스처만 메시지 표시
					switch (gesture) {
						case "↓→"	: showMessage(gesture, `탭닫기`); break;
						case "↑↓"	: showMessage(gesture, `새로고침`); break;
						case "↑↓↑"	: showMessage(gesture, `강력새로고침`); break;
						case "←"	: showMessage(gesture, `뒤로가기`); break;
						case "→"	: showMessage(gesture, `앞으로가기`); break;
						case "↓"	: showMessage(gesture, `맨아래로`); break;
						case "↑"	: showMessage(gesture, `맨위로`); break;
						case "→↑"	: showMessage(gesture, `창최대화`); break;
						case "→↓"	: showMessage(gesture, `창최소화`); break;
						case "←↑"	: showMessage(gesture, `전체화면`); break;
						default		: removeMessage(); // 매칭 안 되면 메시지 제거 break;
					}
				}


				ctx.lineTo(e.clientX, e.clientY);
				ctx.stroke();
				lastPos = { x: e.clientX, y: e.clientY };
			});

			document.addEventListener("mouseup", (e) => {
				if (e.button === 2 && isRightClick) {
					isRightClick = false;
					const gesture = path.join("");
					console.log("Gesture:", gesture);
					removeOverlay();
					removeMessage();

					if (gesture) {
						handleGesture(gesture);
						suppressContextMenu = true; // 제스처가 있었을 때만 메뉴 막음
					} else {
						suppressContextMenu = false; // 제스처 없으면 메뉴 정상 출력
					}

					path = [];
				}
			});


			function handleGesture(gesture) {
				switch (gesture) {
					case "↓→"	: chrome.runtime.sendMessage({ action: "close_tab" }); break;
					case "←"	: history.back(); break;
					case "→"	: history.forward(); break;
					case "↑↓"	: location.reload(); break;
					case "↑↓↑"	: hardReload(); break;
					case "↑"	: scrollInDirection("up", lastPos.x, lastPos.y); break;
					case "↓"	: scrollInDirection("down", lastPos.x, lastPos.y); break;
					case "→↑"	: chrome.runtime.sendMessage({ action: "maximize_window" }); break;
					case "→↓"	: chrome.runtime.sendMessage({ action: "minimize_window" }); break;
					case "←↑"	: chrome.runtime.sendMessage({ action: "toggle_fullscreen" }); break;
					default		: temporarilySuppressContextMenu(500); break;
				}
			}

			function hardReload() {
				chrome.runtime.sendMessage({ action: "hard_reload" });
			}

			function findScrollableElement(el) {
				while (el) {
					const { overflowY } = getComputedStyle(el);
					const canScroll = (overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight;
					if (canScroll) return el;
					el = el.parentElement;
				}
				return document.scrollingElement || document.documentElement;
			}

			function scrollInDirection(direction, x, y) {
				const target = findScrollableElement(document.elementFromPoint(x, y));
				const isUp = direction === "up"; // true: 위로, false: 아래로
				const scrollTarget = target ===  document.body ? window : target;
				const scrollAmount = scrollTarget.scrollHeight || document.body.scrollHeight;
				console.log(scrollTarget);
				scrollTarget.scrollTo({ top: isUp ? 0 : scrollAmount, behavior: "auto" });
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