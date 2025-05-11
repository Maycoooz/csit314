from backend.models.platformmanagement import PlatformManagement

class BasePlatformManagementController:
    
    def platform_management(self):
        return PlatformManagement(username="", password="")
    
class CreateServiceCategoryController(BasePlatformManagementController):
    
    def create_service_category(self, new_category, new_description) -> bool:
        pm = self.platform_management()
        return pm.create_service_category(new_category, new_description)
        
class ViewAllServiceCategoryController(BasePlatformManagementController):
    
    def view_all_service_categories(self):
        pm = self.platform_management()
        return pm.view_all_service_categories()
    
class UpdateServiceCategoryController(BasePlatformManagementController):
    
    def update_service_category(self, target_category, updated_category, updated_description):
        pm = self.platform_management()
        return pm.update_service_category(target_category, updated_category, updated_description)
    
class SuspendServiceCategoryController(BasePlatformManagementController):
    
    def suspend_service_category(self, target_category):
        pm = self.platform_management()
        return pm.suspend_service_category(target_category)
    
class SearchServiceCategoryController(BasePlatformManagementController):
    
    def search_service_category(self, target_category):
        pm = self.platform_management()
        return pm.search_service_category(target_category)
    
class GetDailyReportController(BasePlatformManagementController):
    
    def get_daily_report(self, date):
        pm = self.platform_management()
        return pm.get_daily_report(date)
    
class GetWeeklyReportController(BasePlatformManagementController):
    
    def get_weekly_report(self, start_date, end_date):
        pm = self.platform_management()
        return pm.get_weekly_report(start_date, end_date)

    
class GetMonthlyReportController(BasePlatformManagementController):
    
    def get_monthly_report(self, year, month):
        pm = self.platform_management()
        return pm.get_monthly_report(year, month)

    
    