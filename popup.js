document.getElementById("start-chat").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const domain = new URL(tab.url).hostname;
    chrome.runtime.sendMessage({ action: "openChat", domain });
  });
  