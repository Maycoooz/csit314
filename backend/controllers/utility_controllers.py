from backend.utility.service_categories import ServiceCategories
from backend.utility.active_users import ActiveUsers

class ServiceCategoriesController:
    
    def get_all_available_service_categories(self):
        categories = ServiceCategories()
        return categories.get_all_available_service_categories()
    
class ActiveUsersController:
    
    def get_all_active_users(self):
        active_users = ActiveUsers()
        return active_users.get_all_active_users()