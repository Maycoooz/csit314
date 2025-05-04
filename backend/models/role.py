from pydantic import BaseModel
import mysql.connector

class Role(BaseModel):

    def connect_database(self):
        conn = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "password", #for antonio mysql : csit115 #grace
        database = "csit314"
    )
    
        return conn

    def get_all_roles(self):

        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = "SELECT role FROM UserProfiles"
        cursor.execute(prepared_statement)

        roles = cursor.fetchall()

        cursor.close()
        conn.close()

        return roles