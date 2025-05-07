from backend.models.user import User
from backend.utility.role import Role

class LoginController:
    def __init__(self):
        pass
    
    def login_user(self, username: str, password: str, role: str) -> bool:
        user = User(username=username, password=password)
        return user.login(role)

class LoginProfileController:

    def get_all_roles(self):
        roles = Role()
        return roles.get_all_roles()
    
    