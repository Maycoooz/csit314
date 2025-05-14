from backend.utility.connect_to_db import ConnectDB

class LoginProfiles(ConnectDB):

    def get_all_profiles(self):

        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = "SELECT role, description FROM UserProfiles"
        cursor.execute(prepared_statement)

        roles = cursor.fetchall()

        cursor.close()
        conn.close()

        return roles