from backend.utility.service_categories import ServiceCategories

class ServiceCategoriesController:
    
    def get_all_available_service_categories(self):
        categories = ServiceCategories()
        return categories.get_all_available_service_categories()