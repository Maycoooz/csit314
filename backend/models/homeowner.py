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

    def view_cleaner_profile(self, homeowner_username: str, cleaner_username: str):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            # Check if homeowner has already viewed this cleaner before
            check_statement = """
            SELECT 1 FROM CleanerViewTracker
            WHERE homeowner_username = %s AND cleaner_username = %s
            """
            cursor.execute(check_statement, (homeowner_username, cleaner_username))
            result = cursor.fetchone()

            if not result:
                # First time viewing, insert into cleanerviewtracker table in db
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

    def shortlist_cleaner(self, homeowner_username: str, service_id: int):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        try:
            prepared_statement = """
            INSERT INTO shortlist
            VALUES (%s, %s)
            """
            values = (homeowner_username, service_id)
            cursor.execute(prepared_statement, values)
            conn.commit()
            success = True
        except mysql.connector.Error as e:
            print(f"Error saving {service_id} to shortlist")
            success = False
        finally:
            cursor.close()
            conn.close()
            return success        
        
    def view_shortlisted_cleaners(self, homeowner_username: str):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            prepared_statement = """
            SELECT 
                s.cleaner_username,
                s.service_id,
                s.category,
                s.service,
                s.price
            FROM
                Shortlist sl
            INNER JOIN
                Services s ON sl.service_id = s.service_id
            WHERE 
                sl.homeowner_username = %s
            """    
            values = (homeowner_username, )
            cursor.execute(prepared_statement, values)
            shortlisted_cleaners_and_services = cursor.fetchall()

            return shortlisted_cleaners_and_services or []

        except Exception as e:
            print(f"Error while fetching shortlist: {e}")
            return []  

        finally:
            cursor.close()
            conn.close()

        
        
    # filter shortlist by service
    def filter_shortlist(self, homeowner_username: str, service_filter: str):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        try:
            prepared_statement = """
            SELECT 
                s.cleaner_username,
                s.service_id,
                s.category,
                s.service,
                s.price
            FROM
                Shortlist sl
            INNER JOIN
                Services s ON sl.service_id = s.service_id
            WHERE 
                sl.homeowner_username = %s
            AND
                s.service LIKE %s
            """    
            values = (homeowner_username, f"%{service_filter}%")
            cursor.execute(prepared_statement, values)
            shortlisted_cleaners_and_services = cursor.fetchall()

            return shortlisted_cleaners_and_services or []

        except Exception as e:
            print(f"Error while filtering shortlist: {e}")
            return []  

        finally:
            cursor.close()
            conn.close()


    def view_past_transactions(self, homeowner_username):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        result = []

        try:
            prepared_statement = """
            SELECT 
                t.cleaner_username, 
                s.category,
                s.service,
                s.price,
                t.date
            FROM 
                Transactions t
            JOIN 
                Services s ON t.service_id = s.service_id
            WHERE 
                t.homeowner_username = %s
            ORDER BY 
                t.date DESC
            """

            values = (homeowner_username, )
            cursor.execute(prepared_statement, values)
            result = cursor.fetchall()

        except mysql.connector.Error as e:
            print(f"Error viewing past transactions of {homeowner_username}: {e}")
        finally:
            cursor.close()
            conn.close()

        return result

    def filter_past_transactions(self, homeowner_username, service_filter):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        result = []

        try:
            prepared_statement = """
            SELECT 
                t.cleaner_username, 
                s.category,
                s.service,
                s.price,
                t.date
            FROM 
                Transactions t
            JOIN 
                Services s ON t.service_id = s.service_id
            WHERE 
                t.homeowner_username = %s 
            AND
                s.service LIKE %s
            ORDER BY 
                t.date DESC
            """

            values = (homeowner_username, f"%{service_filter}%")
            cursor.execute(prepared_statement, values)
            result = cursor.fetchall()

        except mysql.connector.Error as e:
            print(f"Error viewing past transactions of {homeowner_username}: {e}")
        finally:
            cursor.close()
            conn.close()

        return result
