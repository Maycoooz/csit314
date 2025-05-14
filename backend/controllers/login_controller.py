from backend.models.user import User
from backend.utility.LoginProfiles import LoginProfiles

class LoginController:
    def __init__(self):
        pass
    
    def login_user(self, username: str, password: str, role: str) -> bool:
        user = User(username=username, password=password)
        return user.login(role)

class LoginProfileController:

    def get_all_profiles(self):
        login_profiles = LoginProfiles()
        return login_profiles.get_all_profiles()
    
    