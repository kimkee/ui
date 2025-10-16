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

chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes("chrome://")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: reddenPage
		});
	}
});


chrome.runtime.onMessage.addListener((msg, sender) => {
	if (msg.action === "close_tab" && sender.tab?.id) {
		chrome.tabs.remove(sender.tab.id);
	}
});


chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "hard_reload" && sender.tab) {
    chrome.tabs.reload(sender.tab.id, { bypassCache: true });
  }
});

