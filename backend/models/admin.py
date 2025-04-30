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
            
# ------------------------- Account CRUDS -------------------------

    def view_all_accounts(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM users"
        cursor.execute(prepared_statement)
        users = cursor.fetchall()
        
        cursor.close()
        conn.close()
        return users

    # Search accounts based on username
    def search_account(self, target_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM users WHERE username LIKE %s"
        values = ("%" + target_username + "%",)
        
        try:
            cursor.execute(prepared_statement, values)
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
        
    # ------------------------- User Profile CRUDS -------------------------
    
    # CRUDS for user profile
    def create_userprofile(self, new_role, new_description):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "INSERT INTO UserProfiles (role, description) VALUES (%s, %s)"
        values = (new_role, new_description)

        try:
            cursor.execute(prepared_statement, values)
            conn.commit()
            success = cursor.rowcount > 0
        except mysql.connector.Error as err:
            print(f"Error creating user profile '{new_role}': {err}")
            success = False
        finally:
            cursor.close()
            conn.close()

        return success

    # view all roles created       
    def view_all_userprofiles(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM UserProfiles"

        try:
            cursor.execute(prepared_statement)
            userprofiles = cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error searching account: {err}")
            userprofiles = []
        finally:
            cursor.close()
            conn.close()

        return userprofiles
    
    # search for a role created
    def search_userprofile(self, target_role):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * from UserProfiles WHERE role LIKE %s"
        values = ("%" + target_role + "%",)
        
        try:
            cursor.execute(prepared_statement, values)
            userprofiles = cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error searching account: {err}")
            userprofiles = []
        finally:
            cursor.close()
            conn.close()

        return userprofiles
    
    # suspend a role and all users with that role
    def suspend_userprofile(self, target_role):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "UPDATE UserProfiles SET status = %s WHERE role = %s"
        values = ('suspended', target_role)
        
        cursor.execute(prepared_statement, values)
        conn.commit()
        
        prepared_statement = "UPDATE Users SET status = %s WHERE role = %s"
        values = ('suspended', target_role)
        
        cursor.execute(prepared_statement, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        if cursor.rowcount > 0:
            return True
        else:
            print(f"Error suspending '{target_role}'")
            return False
    
    # update name of role and description
    def update_userprofile(self, target_role, updated_role, updated_description):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statemet = "UPDATE UserProfiles SET role = %s, description = %s WHERE role = %s"
        values = (updated_role, updated_description, target_role)
        
        cursor.execute(prepared_statemet, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        if cursor.rowcount > 0:
            return True
        else:
            print(f"Error updating userprofile of '{target_role}'")
            return False
            
    
    # update an existing user giving them a role or chaning the role
    def update_user_role(self, target_username, updated_role):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            # Check if the role exists in UserProfiles
            cursor.execute("SELECT 1 FROM UserProfiles WHERE role = %s", (updated_role,))
            if cursor.fetchone() is None:
                print(f"Role '{updated_role}' does not exist.")
                return False

            # Proceed to update users role
            prepared_statement = "UPDATE Users SET role = %s WHERE username = %s"
            values = (updated_role, target_username)
            cursor.execute(prepared_statement, values)
            conn.commit()

            if cursor.rowcount == 0:
                print(f"No user found with username '{target_username}', or role already set.")
                return False

            return True

        except mysql.connector.Error as err:
            print(f"Error updating role of '{target_username}': {err}")
            return False

        finally:
            cursor.close()
            conn.close()

    
    # search all users with specific role
    def view_all_user_with_specified_role(self, target_role):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM users WHERE role = %s"
        values = (target_role,)
        
        try:
            cursor.execute(prepared_statement, values)
            users = cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error searching users with role: '{target_role}': {err}")
            users = []
        finally:
            cursor.close()
            conn.close()

        return users
    