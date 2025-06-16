class UserTracker:
    def __init__(self):
        self.user_map = {}  # sid -> user info

    def register(self, sid, user_info):
        self.user_map[sid] = user_info

    def unregister(self, sid):
        self.user_map.pop(sid, None)

    def get_user(self, sid):
        return self.user_map.get(sid)
