from backend.models.admin import Admin
from backend.schemas.admin_schemas import SearchAccountRequest
from typing import List

class AdminController:
    def __init__(self):
        pass
    
    def create_account(self, new_username: str, new_password: str) -> bool:
        admin = Admin(username="", password="")
        return admin.create_account(new_username, new_password)
    
    def view_all_accounts(self):
        admin = Admin(username="", password="")
        return admin.view_all_accounts() 
    
    def search_account(self, target_username: str) -> List[dict]:
        admin = Admin(username="", password="")
        return admin.search_account(target_username)
    
    def suspend_account(self, target_username: str) -> bool:
        admin = Admin(username="", password="")
        return admin.suspend_account(target_username)

    def update_account(self, target_username: str, updated_username: str, updated_password: str) -> bool:
        admin = Admin(username="", password="")
        return admin.update_account(target_username, updated_username, updated_password)
    
    def create_userprofile(self, new_role, new_description):
        admin = Admin(username="", password="")
        return admin.create_userprofile(new_role, new_description)
    
    def view_all_userprofiles(self):
        admin = Admin(username="", password="")
        return admin.view_all_userprofiles()
    
    def search_userprofile(self, target_role):
        admin = Admin(username="", password="")
        return admin.search_userprofile(target_role)
    
    def suspend_userprofile(self, target_role):
        admin = Admin(username="", password="")
        return admin.suspend_userprofile(target_role)
    
    def update_userprofile(self, target_role, updated_role, updated_description):
        admin = Admin(username="", password="")
        return admin.update_userprofile(target_role, updated_role, updated_description)
    
    def update_user_role(self, target_username, updated_role):
        admin = Admin(username="", password="")
        return admin.update_user_role(target_username, updated_role)
    
    def view_all_users_with_specified_role(self, target_role):
        admin = Admin(username="", password="")
        return admin.view_all_user_with_specified_role(target_role)
        

