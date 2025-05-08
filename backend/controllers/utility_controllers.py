from backend.utility.service_categories import ServiceCategories
from backend.utility.active_users import ActiveUsers
from backend.utility.cleaners_with_services import CleanersWithServices
from backend.utility.cleaner_view_counter import CleanerViewCounter


class ServiceCategoriesController:
    
    def get_all_available_service_categories(self):
        categories = ServiceCategories()
        return categories.get_all_available_service_categories()
    
class ActiveUsersController:
    
    def get_all_active_users(self):
        active_users = ActiveUsers()
        return active_users.get_all_active_users()
    
class ActiveCleanersWithServicesController:

    def get_active_cleaners_with_services(self):
        cleaners = CleanersWithServices()
        return cleaners.get_active_cleaners_with_services()

class CleanerViewCounterController:

    def increment_view(self, homeowner_username, cleaner_username):
        counter = CleanerViewCounter()
        counter.increment_view_if_first_time(homeowner_username, cleaner_username)