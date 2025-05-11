import mysql.connector
from backend.models.user import User
import calendar
from datetime import date

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
    
    def get_daily_report(self, date):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            # All transaction details
            cursor.execute("""
                SELECT
                    t.transaction_id,
                    t.date,
                    t.homeowner_username,
                    t.cleaner_username,
                    s.service,
                    s.category,
                    s.price
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                JOIN Users c ON t.cleaner_username = c.username
                JOIN UserProfiles up ON c.role = up.role
                WHERE t.date = %s;
            """, (date,))
            transaction_details = cursor.fetchall()

            # Services bought count per cleaner & service
            cursor.execute("""
                SELECT 
                    t.cleaner_username,
                    s.service,
                    s.category,
                    COUNT(*) AS services_bought
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                WHERE t.date = %s
                GROUP BY t.cleaner_username, s.service, s.category
                ORDER BY services_bought DESC;
            """, (date,))
            usage_stats = cursor.fetchall()

            # Revenue & average price per category
            cursor.execute("""
                SELECT 
                    s.category,
                    SUM(s.price) AS total_revenue,
                    AVG(s.price) AS average_price,
                    COUNT(*) AS times_used
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                WHERE t.date = %s
                GROUP BY s.category
                ORDER BY total_revenue DESC;
            """, (date,))
            category_summary = cursor.fetchall()

            return {
                "transactions": transaction_details,
                "usage_stats": usage_stats,
                "category_summary": category_summary
            }

        except Exception as e:
            print("Error:", e)
            return {"error": str(e)}
        finally:
            conn.close()

    
    def get_weekly_report(self, start_date, end_date):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            # Transactions in the week
            cursor.execute("""
                SELECT
                    t.transaction_id,
                    t.date,
                    t.homeowner_username,
                    t.cleaner_username,
                    s.service,
                    s.category,
                    s.price
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                JOIN Users c ON t.cleaner_username = c.username
                JOIN UserProfiles up ON c.role = up.role
                WHERE t.date BETWEEN %s AND %s;
            """, (start_date, end_date))
            transactions = cursor.fetchall()

            # Service usage in the week
            cursor.execute("""
                SELECT 
                    t.cleaner_username,
                    s.service,
                    s.category,
                    COUNT(*) AS services_bought
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                WHERE t.date BETWEEN %s AND %s
                GROUP BY t.cleaner_username, s.service, s.category
                ORDER BY services_bought DESC;
            """, (start_date, end_date))
            usage_stats = cursor.fetchall()

            # Revenue summary per category
            cursor.execute("""
                SELECT 
                    s.category,
                    SUM(s.price) AS total_revenue,
                    AVG(s.price) AS average_price,
                    COUNT(*) AS times_used
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                WHERE t.date BETWEEN %s AND %s
                GROUP BY s.category
                ORDER BY total_revenue DESC;
            """, (start_date, end_date))
            category_summary = cursor.fetchall()

            return {
                "start_date": str(start_date),
                "end_date": str(end_date),
                "transactions": transactions,
                "usage_stats": usage_stats,
                "category_summary": category_summary
            }

        except Exception as e:
            return {"error": str(e)}
        finally:
            conn.close()


    def get_monthly_report(self, year: int, month: int):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        # Calculate start and end of the month
        start_date = date(year, month, 1)
        last_day = calendar.monthrange(year, month)[1]
        end_date = date(year, month, last_day)

        try:
            cursor.execute("""
                SELECT
                    t.transaction_id,
                    t.date,
                    t.homeowner_username,
                    t.cleaner_username,
                    s.service,
                    s.category,
                    s.price
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                JOIN Users c ON t.cleaner_username = c.username
                JOIN UserProfiles up ON c.role = up.role
                WHERE t.date BETWEEN %s AND %s;
            """, (start_date, end_date))
            transactions = cursor.fetchall()

            cursor.execute("""
                SELECT 
                    t.cleaner_username,
                    s.service,
                    s.category,
                    COUNT(*) AS services_bought
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                WHERE t.date BETWEEN %s AND %s
                GROUP BY t.cleaner_username, s.service, s.category
                ORDER BY services_bought DESC;
            """, (start_date, end_date))
            usage_stats = cursor.fetchall()

            cursor.execute("""
                SELECT 
                    s.category,
                    SUM(s.price) AS total_revenue,
                    AVG(s.price) AS average_price,
                    COUNT(*) AS times_used
                FROM Transactions t
                JOIN Services s ON t.service_id = s.service_id
                WHERE t.date BETWEEN %s AND %s
                GROUP BY s.category
                ORDER BY total_revenue DESC;
            """, (start_date, end_date))
            category_summary = cursor.fetchall()

            return {
                "start_date": str(start_date),
                "end_date": str(end_date),
                "transactions": transactions,
                "usage_stats": usage_stats,
                "category_summary": category_summary
            }

        except Exception as e:
            return {"error": str(e)}
        finally:
            conn.close()

