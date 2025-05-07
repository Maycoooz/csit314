from backend.utility.connect_to_db import ConnectDB

class ServiceCategories(ConnectDB):

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