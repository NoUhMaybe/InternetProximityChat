import hashlib

def derive_shared_key(domain, salt="v1-chat"):
    return hashlib.sha256((domain + salt).encode()).hexdigest()
