from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room
from room_manager import RoomManager
from message_router import MessageRouter

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Core logic classes
room_manager = RoomManager()
router = MessageRouter(room_manager)

@app.route("/")
def index():
    return "InternetProximityChat backend is running."

@socketio.on("connect")
def handle_connect():
    print(f"New connection: {request.sid}")

@socketio.on("join")
def handle_join(data):
    domain = data.get("room")
    sid = request.sid

    if not domain:
        print(f"[{sid}] attempted to join without room")
        return

    join_room(domain)
    room_manager.join_room(domain, sid)
    print(f"[{sid}] joined room: {domain}")

@socketio.on("message")
def handle_message(data):
    domain = data.get("room")
    payload = data.get("payload")  # encrypted message object

    if not domain or not payload:
        print(f"[{request.sid}] sent malformed message")
        return

    router.handle_message(domain, payload, request.sid, socketio)

@socketio.on("disconnect")
def handle_disconnect():
    sid = request.sid
    room_manager.leave_all_rooms(sid)
    print(f"Disconnected: {sid}")

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
