from pydantic import BaseModel
import mysql.connector

class ConnectDB(BaseModel):
    
    def connect_database(self):
        conn = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "password", #for antonio mysql : csit115 #grace
        database = "csit314"
        )
        
        return conn
        