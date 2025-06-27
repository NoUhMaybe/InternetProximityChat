document.getElementById("start-chat").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = new URL(tab.url).hostname;
  chrome.windows.create({
    url: `http://192.168.1.238:5000/chat/${domain}`,
    type: "popup",
    width: 400,
    height: 600
  });
});
