chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "openChat") {
      chrome.windows.create({
        url: `chat.html?room=${encodeURIComponent(msg.domain)}`,
        type: "popup",
        width: 400,
        height: 600
      });
    }
  });
  