from backend.models.homeowner import HomeOwner
from backend.models.cleaner import Cleaner
from typing import Optional

class BaseHomeOwnerController:
    
    def home_owner(self):
        return HomeOwner(username="", password="")
    

class FilterCleanersController(BaseHomeOwnerController):
    
    def filter_cleaners(self, service: Optional[str] = None):
        
        ho = self.home_owner()
        return ho.filter_cleaners(service)
    
    
class ViewCleanerProfileController(BaseHomeOwnerController):
    
    def view_cleaner_profile(self, homeowner_username: str, cleaner_username: str):
        
        ho = self.home_owner()
        ho.view_cleaner_profile(homeowner_username, cleaner_username)
        
        cleaner = Cleaner(username="", password="")
        services = cleaner.view_active_services(cleaner_username)
        
        return services

