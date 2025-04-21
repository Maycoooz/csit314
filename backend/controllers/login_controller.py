from backend.models.user import User

class LoginController:
    def __init__(self):
        pass
    
    def login_user(self, username: str, password: str) -> bool:
        user = User(username=username, password=password)
        return user.login()
    
    