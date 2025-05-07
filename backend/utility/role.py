from backend.utility.connect_to_db import ConnectDB

class Role(ConnectDB):

    def get_all_roles(self):

        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = "SELECT role FROM UserProfiles"
        cursor.execute(prepared_statement)

        roles = cursor.fetchall()

        cursor.close()
        conn.close()

        return roles