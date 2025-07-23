chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "openChat") {
    chrome.windows.create({
      url: `http://192.168.1.1:5000/chat/${encodeURIComponent(msg.domain)}`, //FIXME: Change to server address where server software is being hosted
      type: "popup",
      width: 400,
      height: 600
    });
  }
});
