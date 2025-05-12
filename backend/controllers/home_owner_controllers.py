from backend.models.homeowner import HomeOwner
from backend.models.cleaner import Cleaner
from typing import Optional

class FilterCleanersController():
    
    def filter_cleaners(self, service: Optional[str] = None):
        ho = HomeOwner()
        return ho.filter_cleaners(service)
    
class ViewCleanerProfileController():
    
    def view_cleaner_profile(self, homeowner_username: str, cleaner_username: str):
        ho = HomeOwner()
        ho.view_cleaner_profile(homeowner_username, cleaner_username)
        
        cleaner = Cleaner()
        services = cleaner.view_active_services(cleaner_username)
        
        return services

class ShortlistCleanerController():
    
    def shortlist_cleaner(self, homeowner_username: str, service_id: int):
        ho = HomeOwner()
        return ho.shortlist_cleaner(homeowner_username, service_id)
        
        
class ViewShortlistedCleanersController():
    
    def view_shortlisted_cleaners(self, homeowner_username: str):
        ho = HomeOwner()
        return ho.view_shortlisted_cleaners(homeowner_username)
    
class FilterShortlistedCleanersController():
    
    def filter_shortlist(self, homeowner_username: str, service_filter: str):
        ho = HomeOwner()
        return ho.filter_shortlist(homeowner_username, service_filter)
    
class ViewPastTransactionsHOController():

    def view_past_transactions(self, homeowner_username: str):
        ho = HomeOwner()
        return ho.view_past_transactions(homeowner_username)
    
class FilterPastTransactionsHOController():

    def filter_past_transactions(self, homeowner_username: str, service_filter: str):
        ho = HomeOwner()
        return ho.filter_past_transactions(homeowner_username, service_filter)
