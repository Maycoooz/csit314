from pydantic import BaseModel
import mysql.connector
from backend.models.user import User
from typing import Dict

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


    # Search accounts based on dynamic filters
    def search_account(self, filters: Dict[str, str]):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        # Build the query with dynamic filters
        # SELECT * FROM users WHERE username LIKE %s
        prepared_statement = "SELECT * FROM users WHERE 1=1"
        values = []
        
        for field, value in filters.items():
            if value:  # Only add to filter if the field has a value
                prepared_statement += f" AND {field} = %s"
                values.append(value)
        
        try:
            cursor.execute(prepared_statement, tuple(values))
            results = cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error searching account: {err}")
            results = []
        finally:
            cursor.close()
            conn.close()

        return results
    
    def suspend_account(self, target_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "UPDATE users SET status = %s WHERE username = %s"
        values = ('suspended', target_username)
        
        cursor.execute(prepared_statement, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        if cursor.rowcount > 0:
            return True
        else:
            print(f"No account found with username '{target_username}'.")
            return False
            
    
    # Admin update account, update account only columns (username, password) in db with specified fields
    def update_account(self, target_username, updated_username, updated_password):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "UPDATE users SET username = %s, password = %s WHERE username = %s"
        values = (updated_username, updated_password, target_username)
        
        cursor.execute(prepared_statement, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        if cursor.rowcount > 0:
            return True
        else:
            print(f"Error updating account of '{target_username}'")
            return False
    
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
    
    
