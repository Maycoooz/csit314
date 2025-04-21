from pydantic import BaseModel
import mysql.connector
from backend.models.user import User

class Admin(User):

    # CRUDS for user accounts
    def create_account(self, new_username, new_password):
        pass
    
    def view_all_accounts(self):
        pass
    
    def search_account(self, target_username):
        pass
    
    def suspend_account(self, target_username):
        pass
    
    def update_account(self, updated_username, updated_password):
        pass
    
    # CRUDS for user profile
    def create_profile(self, target_username, new_profile):
        pass
    
    def view_all_profiles(self):
        pass
    
    def search_profile(self, target_profile):
        pass
    
    def suspend_profile(self, target_profile):
        pass
    
    def update_profile(self, updated_profile, new_description):
        pass
    
    
