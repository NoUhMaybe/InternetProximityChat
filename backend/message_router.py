class MessageRouter:
    def __init__(self, room_manager):
        self.room_manager = room_manager

    def handle_message(self, domain, message, sender_sid, socketio):
        user_sids = self.room_manager.get_users(domain)
        for sid in user_sids:
            if sid != sender_sid:
                socketio.emit("message", {"payload": message}, to=sid)
