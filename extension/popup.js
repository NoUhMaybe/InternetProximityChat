function normalizeRoomPath(path) {
  // Ensure trailing slash
  if (!path.endsWith("/")) path += "/";
  return path;
}

document.getElementById("start-chat").addEventListener("click", async () => {
  // Step 1: Get the active tab URL
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);

  // Step 2: Create room string: hostname + pathname (e.g., www.youtube.com/feed/subscriptions/)
  const fullRoom = normalizeRoomPath(url.hostname + url.pathname);

  // Step 3: Prevent opening multiple chat windows for this extension
  chrome.windows.getAll({ populate: true }, (windows) => {
    const chatAlreadyOpen = windows.some(win =>
      win.tabs && win.tabs.some(tab =>
        tab.url && tab.url.includes("192.168.1.1:5000/chat") //FIXME: Change to server address where server software is being hosted
      )
    );

    if (chatAlreadyOpen) {
      alert("A chatroom is already open.");
      return;
    }

    // Step 4: Open the chat popup
    chrome.windows.create({
      url: `http://192.168.1.1/chat/${encodeURIComponent(fullRoom)}`, //FIXME: Change to server address where server software is being hosted
      type: "popup",
      width: 400,
      height: 600
    });
  });
});


