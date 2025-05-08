from pydantic import BaseModel
import mysql.connector
from backend.models.user import User

class Cleaner(User):

    # CRUDS for services
    def create_service(self, cleaner_username, selected_category, new_service, new_price):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        if new_price <= 0:
            print("Error price cannot be less than 0")
            return False
        
        try:
            prepared_statement = "INSERT INTO services (cleaner_username, category, service, price) VALUES (%s, %s, %s, %s)"
            values = (cleaner_username, selected_category, new_service, new_price)
            
            cursor.execute(prepared_statement, values)
            conn.commit()
            
            success = cursor.rowcount == 1
        except mysql.connector.Error as err:
            print("Error creating service:", err) 
            success = False
        finally:
            cursor.close()
            conn.close()
        
        return success
             
    def view_all_services_include_suspended(self, cleaner_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM services WHERE cleaner_username = %s"
        values = (cleaner_username,)
        
        cursor.execute(prepared_statement, values)
        services = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return services
    
    def view_active_services(self, cleaner_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM services WHERE cleaner_username = %s AND status = 'active'"
        values = (cleaner_username,)
        
        cursor.execute(prepared_statement, values)
        services = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return services
        
    def search_service(self, target_service):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM services WHERE service LIKE %s"
        values = ("%" + target_service + "%",)
        
        try:
            cursor.execute(prepared_statement, values)
            services = cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error searching services: {err}")
            services = []
        finally:
            cursor.close()
            conn.close()

        return services
        
    def update_service(self, service_id, updated_category, updated_service, updated_price):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        try:
            prepared_statement = """
                UPDATE services 
                SET category = %s, service = %s, price = %s 
                WHERE service_id = %s
            """
            values = (updated_category, updated_service, updated_price, service_id)
            
            cursor.execute(prepared_statement, values)
            conn.commit()

            success = cursor.rowcount == 1  
        except mysql.connector.Error as err:
            print(f"Error updating service: {err}")
            success = False
        finally:
            cursor.close()
            conn.close()
            
        return success
    
    def suspend_service(self, service_id):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        try: 
            prepared_statement = """
                UPDATE services
                SET status = %s
                WHERE service_id = %s
            """
        
            values = ('suspended', service_id)
            cursor.execute(prepared_statement, values)
            conn.commit()
            
            success = cursor.rowcount == 1
        except mysql.connector.Error as err:
            print(f"Error suspending service: {err}")
            success = False
        finally:
            cursor.close()
            conn.close()
            
        return success
        
    
    
    # view shortlists and number of views
    def view_num_shortlist(self):
        pass
    
    def view_num_views(self, cleaner_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = """
        SELECT views FROM CleanerViews
        WHERE username = %s
        """
        values = (cleaner_username,)

        cursor.execute(prepared_statement, values)
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        return result
    
    
    # view and search past transactions
    
    def view_past_matches(self):
        pass
    
    def search_past_matches(self):
        pass
        
    
