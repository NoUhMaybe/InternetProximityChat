chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "openChat") {
    chrome.windows.create({
      url: `http://192.168.1.238:5000/chat/${encodeURIComponent(msg.domain)}`,
      type: "popup",
      width: 400,
      height: 600
    });
  }
});
