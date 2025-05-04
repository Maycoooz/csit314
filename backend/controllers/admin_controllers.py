from backend.models.admin import Admin
from typing import List

class BaseAdminController:

    def admin(self):
        return Admin(username="", password="")

class CreateAccountController(BaseAdminController):
    
    def create_account(self, new_username: str, new_password: str) -> bool:
        admin = self.admin()
        return admin.create_account(new_username, new_password)

class ViewAllAccountsController(BaseAdminController):

    def view_all_accounts(self):
        admin = self.admin()
        return admin.view_all_accounts() 
    
class SearchAccountController(BaseAdminController):

    def search_account(self, target_username: str) -> List[dict]:
        admin = self.admin()
        return admin.search_account(target_username)
    
class SuspendAccountController(BaseAdminController):

    def suspend_account(self, target_username: str) -> bool:
        admin = self.admin()
        return admin.suspend_account(target_username)

class UpdateAccountController(BaseAdminController):

    def update_account(self, target_username: str, updated_username: str, updated_password: str) -> bool:
        admin = self.admin()
        return admin.update_account(target_username, updated_username, updated_password)

class CreateUserProfileController(BaseAdminController):

    def create_userprofile(self, new_role, new_description):
        admin = self.admin()
        return admin.create_userprofile(new_role, new_description)

class ViewAllUserProfilesController(BaseAdminController):

    def view_all_userprofiles(self):
        admin = self.admin()
        return admin.view_all_userprofiles()

class SearchUserProfileController(BaseAdminController):

    def search_userprofile(self, target_role):
        admin = self.admin()
        return admin.search_userprofile(target_role)

class SuspendUserProfileController(BaseAdminController):

    def suspend_userprofile(self, target_role):
        admin = self.admin()
        return admin.suspend_userprofile(target_role)

class UpdateUserProfileController(BaseAdminController):

    def update_userprofile(self, target_role, updated_role, updated_description):
        admin = self.admin()
        return admin.update_userprofile(target_role, updated_role, updated_description)
    
class UpdateUserRoleController(BaseAdminController):

    def update_user_role(self, target_username, updated_role):
        admin = self.admin()
        return admin.update_user_role(target_username, updated_role)
    
class ViewAllUsersWithSpecifiedRoleController(BaseAdminController):

    def view_all_users_with_specified_role(self, target_role):
        admin = self.admin()
        return admin.view_all_user_with_specified_role(target_role)
        

