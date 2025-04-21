from pydantic import BaseModel
import mysql.connector
from backend.models.user import User

class Cleaner(User):

    # CRUDS for services
    def create_service(self, cleaner_id, description, price):
        pass
    
    def view_all_services(self):
        pass
    
    # search by id? description? 
    def search_service(self, target_description):
        pass
    
    def update_service(self, cleaner_id, service_id, new_description, new_price):
        pass
    
    def delete_service(self, cleaner_id, service_id):
        pass
    
    
    # view shortlists and number of views
    def view_shortlist(self):
        pass
    
    def view_num_views(self):
        pass
        
    
