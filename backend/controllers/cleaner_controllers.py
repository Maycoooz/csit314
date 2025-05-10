from backend.models.cleaner import Cleaner

class BaseCleanerController:
    
    def cleaner(self):
        return Cleaner(username="", password="")
    
class CreateServiceController(BaseCleanerController):
    
    def create_service(self, cleaner_username, selected_category, new_service, new_price):
        cleaner = self.cleaner()
        return cleaner.create_service(cleaner_username, selected_category, new_service, new_price)

class ViewAllServicesController(BaseCleanerController):
    
    def view_all_services(self, cleaner_username):
        cleaner = self.cleaner()
        return cleaner.view_all_services_include_suspended(cleaner_username)
    
class ViewActiveServicesController(BaseCleanerController):
    
    def view_active_services(self, cleaner_username):
        cleaner = self.cleaner()
        return cleaner.view_active_services(cleaner_username)
    
class SearchServiceController(BaseCleanerController):
    
    def search_service(self, cleaner_username, filter_service):
        cleaner = self.cleaner()
        return cleaner.search_service(cleaner_username, filter_service)
    
class UpdateServiceController(BaseCleanerController):
    
    def update_service(self, service_id, updated_category, updated_service, updated_price):
        cleaner = self.cleaner()
        return cleaner.update_service(service_id, updated_category, updated_service, updated_price)

class SuspendServiceController(BaseCleanerController):
    
    def suspend_service(self, service_id):
        cleaner = self.cleaner()
        return cleaner.suspend_service(service_id)
    
class ViewShortlistCountController(BaseCleanerController):

    def view_shortlist_count(self, cleaner_username):
        cleaner = self.cleaner()
        return cleaner.view_shortlist_count(cleaner_username)
    
class ViewNumViewsController(BaseCleanerController):
    
    def view_num_views(self, cleaner_username):
        cleaner = self.cleaner()
        return cleaner.view_num_views(cleaner_username)
    
class ViewPastTransactionsCleanerController(BaseCleanerController):

    def view_past_transactions(self, cleaner_username):
        cleaner = self.cleaner()
        return cleaner.view_past_transaction(cleaner_username)
    
class SearchPastTransactionsController(BaseCleanerController):

    def search_past_transactions(self, cleaner_username, filtered_service):
        cleaner = self.cleaner()
        return cleaner.search_past_transactions(cleaner_username, filtered_service)
