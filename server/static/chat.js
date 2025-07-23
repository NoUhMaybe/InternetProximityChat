const socket = io("http://23.115.9.201:5000");
let room = normalizeRoomPath(ROOM_NAME);
let name = "";
let currentRoom = room;

document.getElementById("name-btn").addEventListener("click", () => {
  name = document.getElementById("name-input").value.trim();
  if (name) {
    socket.emit("set_name", { name, room });
  }
});

socket.on("name_status", (data) => {
  if (data.success) {
    document.getElementById("name-prompt").style.display = "none";
    document.getElementById("input-area").style.display = "flex";
    socket.emit("join", { room });
    renderRoomSelector(room);
  } else {
    alert(data.message);
  }
});

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg.payload;
  document.getElementById("messages").appendChild(li);
});

document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("input");
  const msg = input.value;
  if (msg.trim() === "") return;

  socket.emit("message", { room: currentRoom, payload: `${name}: ${msg}` });

  const li = document.createElement("li");
  li.textContent = `You: ${msg}`;
  document.getElementById("messages").appendChild(li);
  input.value = "";
});

socket.on("user_count", (data) => {
  if (data.room === currentRoom) {
    const countDisplay = document.getElementById("user-count");
    countDisplay.textContent = `Users in room: ${data.count}`;
  }
});

function normalizeRoomPath(path) {
  if (!path.endsWith("/")) path += "/";
  return path;
}

function generateRoomHierarchy(fullRoom) {
  const parts = fullRoom.split('/');
  const rooms = [];
  for (let i = 0; i < parts.length - 1; i++) {
    const subPath = parts.slice(0, i + 1).join('/') + '/';
    rooms.push(subPath);
  }
  return rooms.reverse();
}

function renderRoomSelector(current) {
  const container = document.getElementById("room-selector");
  container.innerHTML = "<label><b>Switch Room:</b></label><br>";

  const select = document.createElement("select");
  select.style.padding = "5px";

  const roomList = generateRoomHierarchy(current);
  if (roomList.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No parent rooms";
    select.disabled = true;
    select.appendChild(option);
  } else {
    roomList.forEach(r => {
      const option = document.createElement("option");
      option.value = r;
      option.textContent = r;
      if (r === current) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      switchRoom(normalizeRoomPath(select.value));
    });
  }

  container.appendChild(select);
}

function switchRoom(newRoom) {
  if (newRoom === currentRoom) return;

  console.log("Switching from", currentRoom, "to", newRoom);
  socket.emit("leave_room", { room: currentRoom });

  setTimeout(() => {
    currentRoom = newRoom;
    room = newRoom;

    document.getElementById("messages").innerHTML = "";
    document.getElementById("user-count").textContent = "Switching rooms...";

    socket.emit("join", { room: newRoom });
    renderRoomSelector(newRoom);

    const li = document.createElement("li");
    li.textContent = `You joined room: ${newRoom}`;
    li.style.fontStyle = "italic";
    document.getElementById("messages").appendChild(li);
  }, 100); // give backend 100ms to process leave
}

