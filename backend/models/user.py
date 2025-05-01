from pydantic import BaseModel
import mysql.connector

class User(BaseModel):
    username: str
    password: str
    
    def connect_database(self):
        conn = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "password", #for antonio mysql : csit115 #grace
            database = "csit314"
        )
        
        return conn
    
    def login(self):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)
        
        prepared_statement = "SELECT * FROM users WHERE Username = %s AND password = %s AND status = 'active' AND role IS NOT NULL"
        values = (self.username, self.password)
        
        cursor.execute(prepared_statement, values)
        result = cursor.fetchone()
        
        conn.close()
        
        if result:
            return True
        else:
            return False