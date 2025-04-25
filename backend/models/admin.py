from pydantic import BaseModel
import mysql.connector
from backend.models.user import User

class Admin(User):

    # CRUDS for user accounts
    def create_account(self, new_username, new_password):
        conn = self.connect_database()
        cursor = conn.cursor()
        
        try:
            prepared_statement = "INSERT INTO users (username, password) VALUES (%s, %s)"
            values = (new_username, new_password)
            
            cursor.execute(prepared_statement, values)
            conn.commit()
            
            return cursor.rowcount == 1
        except mysql.connector.Error as err:
            print("Error creating account:", err) # for debugging remove once done 
            return False
        finally:
            cursor.close()
            conn.close()
    
    def view_all_accounts(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM users"
        cursor.execute(prepared_statement)
        users = cursor.fetchall()
        
        cursor.close()
        conn.close()
        return users
    
        # structure of users (list of dictionaries)
        # [
        #     { "username": "admin1", "password": "123", "status": "active", "role": "none" },
        #     { "username": "admin2", "password": "123", "status": "active", "role": "none" }
        # ]


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
    
    
