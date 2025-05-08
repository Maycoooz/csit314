from backend.utility.connect_to_db import ConnectDB

class CleanersWithServices(ConnectDB):

    def get_active_cleaners_with_services(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = """
        SELECT DISTINCT u.username
        FROM Users u
        JOIN Services s ON u.username = s.cleaner_username
        WHERE u.status = 'active' AND u.role = 'cleaner' AND s.status = 'active'
        """
        
        cursor.execute(prepared_statement)
        results = cursor.fetchall()

        cursor.close()
        conn.close()

        return results
