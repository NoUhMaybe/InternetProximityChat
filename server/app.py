from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room, emit
from flask import Flask, render_template, request
from message_router import MessageRouter
from room_manager import RoomManager
from user_tracker import UserTracker

app = Flask(__name__, static_folder="static", template_folder="templates")
socketio = SocketIO(app, cors_allowed_origins="*")

room_manager = RoomManager()
router = MessageRouter(room_manager)

user_tracker = UserTracker()

@app.route("/")
def index():
    return "InternetProximityChat backend is running."

@app.route("/chat/<path:domain>")
def serve_chat(domain):
    return render_template("chat.html", domain=domain)

@socketio.on("set_name")
def handle_set_name(data):
    name = data.get("name")
    room = data.get("room")
    sid = request.sid
    if user_tracker.name_exists_in_room(name, room):
        emit("name_status", {"success": False, "message": "Name already in use"})
    else:
        user_tracker.register(sid, name, room)
        join_room(room)
        room_manager.join_room(room, sid)
        emit("name_status", {"success": True})
        print(f"[{sid}] joined {room} as {name}")

@socketio.on("connect")
def handle_connect():
    print(f"New connection: {request.sid}")

@socketio.on("join")
def handle_join(data):
    domain = data.get("room")
    sid = request.sid
    print(f"[JOIN] {sid} joining {domain}")
    if domain:
        join_room(domain)
        room_manager.join_room(domain, sid)
        socketio.emit("user_count", {
            "room": domain,
            "count": room_manager.get_user_count(domain)
        }, to=domain)

@socketio.on("message")
def handle_message(data):
    domain = data.get("room")
    payload = data.get("payload")
    if domain and payload:
        router.handle_message(domain, payload, request.sid, socketio)

@socketio.on("disconnect")
def handle_disconnect():
    sid = request.sid
    user_rooms = [room for room, sids in room_manager.rooms.items() if sid in sids]

    print(f"[DISCONNECT] {sid}")

    # Unregister user name
    user_tracker.unregister(sid)

    # Leave all rooms and update counts
    room_manager.leave_all_rooms(sid)
    for room in user_rooms:
        socketio.emit("user_count", {
            "room": room,
            "count": room_manager.get_user_count(room)
        }, to=room)

@socketio.on("leave_room")
def handle_leave(data):
    room = data.get("room")
    sid = request.sid
    print(f"[LEAVE] {sid} leaving {room}")
    if room:
        room_manager.leave_room(room, sid)
        leave_room(room)
        socketio.emit("user_count", {
            "room": room,
            "count": room_manager.get_user_count(room)
        }, to=room)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
