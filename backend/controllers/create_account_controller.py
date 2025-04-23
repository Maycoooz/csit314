from backend.models.admin import Admin

class CreateAccountController:
    def __init__(self):
        pass
    
    def create_account(self, new_username: str, new_password: str) -> bool:
        admin = Admin(username="", password="")
        return admin.create_account(new_username, new_password)
    
    