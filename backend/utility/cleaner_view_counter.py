from backend.utility.connect_to_db import ConnectDB

class CleanerViewCounter(ConnectDB):

    def increment_view_if_first_time(self, homeowner_username, cleaner_username):
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
                # First time view: insert into tracker
                insert_statement = """
                INSERT INTO CleanerViewTracker (homeowner_username, cleaner_username)
                VALUES (%s, %s)
                """
                cursor.execute(insert_statement, (homeowner_username, cleaner_username))

                # Increment view count
                update_statement = """
                UPDATE CleanerViews
                SET views = views + 1
                WHERE username = %s
                """
                cursor.execute(update_statement, (cleaner_username,))

                conn.commit()
        except Exception as e:
            print(f"Error updating cleaner view counter: {e}")
        finally:
            cursor.close()
            conn.close()
