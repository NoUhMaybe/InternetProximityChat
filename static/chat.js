const socket = io("http://192.168.1.238:5000");

socket.on("connect", () => {
  console.log("Connected to socket server");
  socket.emit("join", { room });
});

socket.on("message", (msg) => {
  console.log("Received:", msg);
  const li = document.createElement("li");
  li.textContent = msg.payload;
  document.getElementById("messages").appendChild(li);
});

document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("input");
  const msg = input.value;
  socket.emit("message", { room, payload: msg });

  const li = document.createElement("li");
  li.textContent = `You: ${msg}`;
  document.getElementById("messages").appendChild(li);

  input.value = "";
});
