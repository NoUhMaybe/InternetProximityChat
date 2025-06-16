const params = new URLSearchParams(window.location.search);
const room = params.get("room");
const socket = io("https://yourserver.com"); // Replace with your server

socket.emit("join", { room });

socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messages").appendChild(li);
});

function send() {
  const input = document.getElementById("input");
  socket.emit("message", { room, msg: input.value });
  input.value = "";
}
