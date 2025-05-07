import mysql.connector
from backend.models.user import User

class PlatformManagement(User):
    
    def create_service_category(self, new_category, new_description):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        try:
            prepared_statement = "INSERT INTO servicecategories (category, description) VALUES (%s, %s)"
            values = (new_category, new_description)
            
            cursor.execute(prepared_statement, values)
            conn.commit()
            
            return cursor.rowcount == 1
        except mysql.connector.Error as err:
            print("Error creating service category:", err) # for debugging remove once done 
            return False
        finally:
            cursor.close()
            conn.close()
            
    def view_all_service_categories(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM servicecategories"
        cursor.execute(prepared_statement)
        service_categories = cursor.fetchall()
        
        cursor.close()
        conn.close()
        return service_categories
    
    def update_service_category(self, target_category, updated_category, updated_description):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "UPDATE servicecategories SET category = %s, description = %s WHERE category = %s"
        values = (updated_category, updated_description, target_category)
        
        cursor.execute(prepared_statement, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        if cursor.rowcount == 1:
            return True
        else:
            print(f"Error updating category of '{target_category}'")
            return False
    
    def suspend_service_category(self, target_category):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "UPDATE servicecategories SET status = %s WHERE category = %s"
        values = ('suspended', target_category)
        
        cursor.execute(prepared_statement, values)
        conn.commit()
        
        cursor.close()
        conn.close()
        
        if cursor.rowcount == 1:
            return True
        else:
            print(f"No category found with name '{target_category}'.")
            return False
    
    def search_service_category(self, target_category):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM servicecategories WHERE category LIKE %s"
        values = ("%" + target_category + "%",)
        
        try:
            cursor.execute(prepared_statement, values)
            service_categories = cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error searching account: {err}")
            service_categories = []
        finally:
            cursor.close()
            conn.close()

        return service_categories
    
    def generate_daily_report(self):
        pass
    
    def generate_weekly_report(self):
        pass
    
    def generate_monthlt_report(self):
        pass
    