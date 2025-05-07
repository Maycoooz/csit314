import mysql.connector
from backend.models.user import User

class HomeOwner(User):
    
    def search_cleaner(self):
        pass
    
    # increment num_views for cleaner
    def view_cleaner(self):
        pass
    
    def shortlist_cleaner(self):
        pass
    
    def search_shortlist(self):
        pass
    
    
    def view_past_transactions(self):
        pass
    
    # filter by service, date period
    def search_past_transactions(self):
        pass