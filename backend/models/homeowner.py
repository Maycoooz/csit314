import mysql.connector
from backend.models.user import User
from typing import Optional

class HomeOwner(User):

    # filter by service they provide
    def filter_cleaners(self, service: Optional[str] = None):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            if service:
                # Search cleaners by service keyword
                query = """
                SELECT DISTINCT cleaner_username 
                FROM services
                WHERE service LIKE %s
                """
                values = (f"%{service}%",)
                cursor.execute(query, values)
                results = cursor.fetchall()
                cleaner_usernames = [row['cleaner_username'] for row in results]
            else:
                # Get all active cleaners with at least 1 service offered
                query = """
                SELECT DISTINCT u.username
                FROM users u
                JOIN services s ON u.username = s.cleaner_username
                WHERE u.status = 'active'
                AND u.role = 'cleaner'
                AND s.status = 'active'
                """ 
                cursor.execute(query)
                results = cursor.fetchall()
                cleaner_usernames = [row['username'] for row in results]

            return cleaner_usernames

        except Exception as e:
            print(f"Error filtering cleaners: {e}")
            return []

        finally:
            cursor.close()
            conn.close()

    def view_cleaner_profile(self, homeowner_username, cleaner_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            # Check if homeowner has already viewed this cleaner
            check_statement = """
            SELECT 1 FROM CleanerViewTracker
            WHERE homeowner_username = %s AND cleaner_username = %s
            """
            cursor.execute(check_statement, (homeowner_username, cleaner_username))
            result = cursor.fetchone()

            if not result:
                # First time viewing, insert tracker
                insert_statement = """
                INSERT INTO CleanerViewTracker (homeowner_username, cleaner_username)
                VALUES (%s, %s)
                """
                cursor.execute(insert_statement, (homeowner_username, cleaner_username))

                # Increment cleaner views
                update_statement = """
                UPDATE CleanerViews
                SET views = views + 1
                WHERE username = %s
                """
                cursor.execute(update_statement, (cleaner_username,))

                conn.commit()

        except mysql.connector.Error as e:
            print(f"Error viewing cleaner: {e}")

        finally:
            cursor.close()
            conn.close()

    def shortlist_cleaner(self):
        pass

    def search_shortlist(self):
        pass

    def view_past_transactions(self):
        pass

    def search_past_transactions(self):
        pass
