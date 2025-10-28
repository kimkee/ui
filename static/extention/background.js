chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['content.js']
	});
});
console.log("bacground.js");


function reddenPage() {
	document.body.style.backgroundColor = 'red';
}

// 페이지 빨갛게 변경 기능 테스트용
chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes("chrome://")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: reddenPage
		});
	}
});

// 탭 닫기 기능
chrome.runtime.onMessage.addListener((message, sender) => {
	if (message.action === "close_tab" && sender.tab?.id) {
		chrome.tabs.remove(sender.tab.id);
	}
});

// 캐쉬 없이 리로드
chrome.runtime.onMessage.addListener((message, sender) => {
	if (message.action === "hard_reload" && sender.tab) {
		chrome.tabs.reload(sender.tab.id, { bypassCache: true });
	}
});

// 창 최대화/최소화 토글 기능
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "maximize_window") {
		chrome.windows.getCurrent({ populate: false }, (win) => {
			if (win.state === "maximized") {
				chrome.windows.update(win.id, { state: "normal" });
			} else {
				chrome.windows.update(win.id, { state: "maximized" });
			}
		});
	}
});

// 창 최소화 기능
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "minimize_window") {
		chrome.windows.getCurrent({}, (win) => {
			chrome.windows.update(win.id, { state: "minimized" });
		});
	}
});

// 전체화면 토글 기능
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "toggle_fullscreen") {
		chrome.windows.getCurrent({}, (win) => {
			const newState = win.state === "fullscreen" ? "normal" : "fullscreen";
			chrome.windows.update(win.id, { state: newState });
		});
	}
});



