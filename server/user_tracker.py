class UserTracker:
    def __init__(self):
        self.user_map = {}  # sid -> {"name": ..., "room": ...}

    def register(self, sid, name, room):
        self.user_map[sid] = {"name": name, "room": room}

    def unregister(self, sid):
        self.user_map.pop(sid, None)

    def get_user(self, sid):
        return self.user_map.get(sid)

    def name_exists_in_room(self, name, room):
        return any(user["name"] == name and user["room"] == room for user in self.user_map.values())
