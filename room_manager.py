class RoomManager:
    def __init__(self):
        self.rooms = {}  # domain -> set of sid

    def join_room(self, domain, sid):
        self.rooms.setdefault(domain, set()).add(sid)

    def leave_room(self, domain, sid):
        if domain in self.rooms:
            self.rooms[domain].discard(sid)
            if not self.rooms[domain]:
                del self.rooms[domain]

    def leave_all_rooms(self, sid):
        for domain in list(self.rooms):
            self.leave_room(domain, sid)

    def get_users(self, domain):
        return self.rooms.get(domain, set())
