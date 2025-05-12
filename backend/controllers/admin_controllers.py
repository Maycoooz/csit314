from backend.models.admin import Admin
from typing import List

class CreateAccountController():
    
    def create_account(self, new_username: str, new_password: str) -> bool:
        admin = Admin()
        return admin.create_account(new_username, new_password)

class ViewAllAccountsController():

    def view_all_accounts(self):
        admin = Admin()
        return admin.view_all_accounts() 
    
class SearchAccountController():

    def search_account(self, target_username: str) -> List[dict]:
        admin = Admin()
        return admin.search_account(target_username)
    
class SuspendAccountController():

    def suspend_account(self, target_username: str) -> bool:
        admin = Admin()
        return admin.suspend_account(target_username)

class UpdateAccountController():

    def update_account(self, target_username: str, updated_username: str, updated_password: str) -> bool:
        admin = Admin()
        return admin.update_account(target_username, updated_username, updated_password)

class CreateUserProfileController():

    def create_userprofile(self, new_role, new_description):
        admin = Admin()
        return admin.create_userprofile(new_role, new_description)

class ViewAllUserProfilesController():

    def view_all_userprofiles(self):
        admin = Admin()
        return admin.view_all_userprofiles()

class SearchUserProfileController():

    def search_userprofile(self, target_role):
        admin = Admin()
        return admin.search_userprofile(target_role)

class SuspendUserProfileController():

    def suspend_userprofile(self, target_role):
        admin = Admin()
        return admin.suspend_userprofile(target_role)

class UpdateUserProfileController():

    def update_userprofile(self, target_role, updated_role, updated_description):
        admin = Admin()
        return admin.update_userprofile(target_role, updated_role, updated_description)
    
class UpdateUserRoleController():

    def update_user_role(self, target_username, updated_role):
        admin = Admin()
        return admin.update_user_role(target_username, updated_role)
    
class ViewAllUsersWithSpecifiedRoleController():

    def view_all_users_with_specified_role(self, target_role):
        admin = Admin()
        return admin.view_all_user_with_specified_role(target_role)
        

