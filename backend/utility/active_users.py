from backend.utility.connect_to_db import ConnectDB

class ActiveUsers(ConnectDB):

    def get_all_active_users(self):

        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = "SELECT username, role FROM users WHERE status = %s AND role IS NOT NULL"
        values = ("active",)
        cursor.execute(prepared_statement, values)

        roles = cursor.fetchall()

        cursor.close()
        conn.close()

        return roles