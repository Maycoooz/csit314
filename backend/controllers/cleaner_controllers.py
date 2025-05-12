from backend.models.cleaner import Cleaner

class CreateServiceController():
    
    def create_service(self, cleaner_username, selected_category, new_service, new_price):
        cleaner = Cleaner()
        return cleaner.create_service(cleaner_username, selected_category, new_service, new_price)

class ViewAllServicesController():
    
    def view_all_services(self, cleaner_username):
        cleaner = Cleaner()
        return cleaner.view_all_services_include_suspended(cleaner_username)
    
class ViewActiveServicesController():
    
    def view_active_services(self, cleaner_username):
        cleaner = Cleaner()
        return cleaner.view_active_services(cleaner_username)
    
class SearchServiceController():
    
    def search_service(self, cleaner_username, filter_service):
        cleaner = Cleaner()
        return cleaner.search_service(cleaner_username, filter_service)
    
class UpdateServiceController():
    
    def update_service(self, service_id, updated_category, updated_service, updated_price):
        cleaner = Cleaner()
        return cleaner.update_service(service_id, updated_category, updated_service, updated_price)

class SuspendServiceController():
    
    def suspend_service(self, service_id):
        cleaner = Cleaner()
        return cleaner.suspend_service(service_id)
    
class ViewShortlistCountController():

    def view_shortlist_count(self, cleaner_username):
        cleaner = Cleaner()
        return cleaner.view_shortlist_count(cleaner_username)
    
class ViewNumViewsController():
    
    def view_num_views(self, cleaner_username):
        cleaner = Cleaner()
        return cleaner.view_num_views(cleaner_username)
    
class ViewPastTransactionsCleanerController():

    def view_past_transactions(self, cleaner_username):
        cleaner = Cleaner()
        return cleaner.view_past_transaction(cleaner_username)
    
class SearchPastTransactionsController():

    def search_past_transactions(self, cleaner_username, filtered_service):
        cleaner = Cleaner()
        return cleaner.search_past_transactions(cleaner_username, filtered_service)
