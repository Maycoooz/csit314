from pydantic import BaseModel
import mysql.connector
import bcrypt

class User(BaseModel):
    username: str
    password: str
    
    def connect_database(self):
        conn = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "csit115", #for antonio mysql : csit115 
            database = "csit314"
        )
        
        return conn
    
    def login(self, role):
        conn = self.connect_database()
        cursor = conn.cursor(dictionary=True)

        # Fetch user row based on username and role
        prepared_statement = "SELECT * FROM users WHERE Username = %s AND role = %s AND status = 'active'"
        values = (self.username, role)
        cursor.execute(prepared_statement, values)
        result = cursor.fetchone()

        conn.close()

        if result:
            stored_hash = result['password'].encode('utf-8')
            if bcrypt.checkpw(self.password.encode('utf-8'), stored_hash):
                return True 
        return False