from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, emit
from flask import Flask, render_template, request
from message_router import MessageRouter
from room_manager import RoomManager

app = Flask(__name__, static_folder="static", template_folder="templates")
socketio = SocketIO(app, cors_allowed_origins="*")

room_manager = RoomManager()
router = MessageRouter(room_manager)

@app.route("/")
def index():
    return "InternetProximityChat backend is running."

@app.route("/chat/<domain>")
def serve_chat(domain):
    return render_template("chat.html", domain=domain)

@socketio.on("connect")
def handle_connect():
    print(f"New connection: {request.sid}")

@socketio.on("join")
def handle_join(data):
    domain = data.get("room")
    sid = request.sid
    if domain:
        join_room(domain)
        room_manager.join_room(domain, sid)
        print(f"[{sid}] joined room: {domain}")

@socketio.on("message")
def handle_message(data):
    domain = data.get("room")
    payload = data.get("payload")
    if domain and payload:
        router.handle_message(domain, payload, request.sid, socketio)

@socketio.on("disconnect")
def handle_disconnect():
    sid = request.sid
    room_manager.leave_all_rooms(sid)
    print(f"Disconnected: {sid}")

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
