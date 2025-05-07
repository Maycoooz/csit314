from pydantic import BaseModel
import mysql.connector

class ServiceCategories(BaseModel):

    def connect_database(self):
        conn = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "", #for antonio mysql : csit115 #grace
        database = "csit314"
    )
    
        return conn

    def get_all_available_service_categories(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        prepared_statement = "SELECT * FROM ServiceCategories where status = %s"
        values = ('active',)
        cursor.execute(prepared_statement, values)

        service_categories = cursor.fetchall()

        cursor.close()
        conn.close()

        return service_categories