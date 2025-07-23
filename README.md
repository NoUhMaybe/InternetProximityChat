# Internet Proximity Chat

A Chrome extension and Python backend that enables users visiting the same domain to join a shared chatroom. The backend dynamically handles chatroom creation and teardown, ensuring secure communication without storing chat history.

---

## Project Structure

```
InternetProximityChat-main/
├── server/
│   ├── venv/
│   │   └── [your virtual enviornment files]
│   ├── __pycache__/
│   │   └── [your python cache files]
│   ├── static/
│   │   └── chat.js
│   ├── template/
│   │   └── chat.html
│   ├── app.py
│   ├── message_router.py
│   ├── user_tracker.py
│   ├── encryption_utils.py
│   ├── room_manager.py
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── background.js
└── README.md
```

---

## Requirements

- Python 3.9+
- Google Chrome
- Chrome Extension Manifest V3-compatible
- Flask
- Flask-SocketIO
- Eventlet

---

## Setup Instructions

### 1. Clone or download the project:
```
git clone https://github.com/yourusername/InternetProximityChat.git
cd InternetProximityChat-main
```

### 2. Create and activate virtual environment (Windows):
```powershell
python -m venv venv
.venv\Scripts\activate
(If prompted to allow venv virtual environment you have to agree in order for program to run)
```

### 3. Install Python dependencies:
```bash
pip install flask flask-socketio eventlet
```

---

## Run the Backend

```bash
python app.py
```

This will start the Flask-SocketIO server at `http://0.0.0.0:5000`. Make sure this port is accessible by all clients on your network.

---

## Load the Chrome Extension

1. Change the IP's in 'popup.js' and 'background.js' to reflect the IP of the server or computer you are running the server side on
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked** and select the `/extension` folder
5. Ensure `manifest.json` and all necessary files are inside the folder

---

## Using the Chat

- When two users visit the same domain (e.g., `www.google.com`) and have the extension active, they will join the same chatroom.
- The extension displays a live chat embedded as an iframe pointing to `http://<host_ip>:5000/chat?domain=<domain>`.

---

## Notes on Security & Storage

- Messages are **not persisted** or logged by the server.
- Communications occur over socket connections using **Flask-SocketIO**.
- Consider HTTPS and public-key encryption for production deployment.

---

## References

- Flask: https://flask.palletsprojects.com/
- Flask-SocketIO: https://flask-socketio.readthedocs.io/
- Socket.IO: https://socket.io/
- Python `venv`: https://docs.python.org/3/library/venv.html

---

## Licenses

### Python `venv`:
- Built-in to Python. Licensed under the [Python Software Foundation License](https://docs.python.org/3/license.html).

### Flask and Flask-SocketIO:
- Flask: [BSD-3-Clause](https://github.com/pallets/flask/blob/main/LICENSE.rst)
- Flask-SocketIO: [MIT License](https://github.com/miguelgrinberg/Flask-SocketIO/blob/main/LICENSE)

### Socket.IO Client:
- `socket.io.min.js` is used under the [MIT License](https://github.com/socketio/socket.io-client/blob/main/LICENSE)