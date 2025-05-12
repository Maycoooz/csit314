from backend.models.platformmanagement import PlatformManagement


class CreateServiceCategoryController():
    
    def create_service_category(self, new_category, new_description) -> bool:
        pm = PlatformManagement()
        return pm.create_service_category(new_category, new_description)
        
class ViewAllServiceCategoryController():
    
    def view_all_service_categories(self):
        pm = PlatformManagement()
        return pm.view_all_service_categories()
    
class UpdateServiceCategoryController():
    
    def update_service_category(self, target_category, updated_category, updated_description):
        pm = PlatformManagement()
        return pm.update_service_category(target_category, updated_category, updated_description)
    
class SuspendServiceCategoryController():
    
    def suspend_service_category(self, target_category):
        pm = PlatformManagement()
        return pm.suspend_service_category(target_category)
    
class SearchServiceCategoryController():
    
    def search_service_category(self, target_category):
        pm = PlatformManagement()
        return pm.search_service_category(target_category)
    
class GetDailyReportController():
    
    def get_daily_report(self, date):
        pm = PlatformManagement()
        return pm.get_daily_report(date)
    
class GetWeeklyReportController():
    
    def get_weekly_report(self, start_date, end_date):
        pm = PlatformManagement()
        return pm.get_weekly_report(start_date, end_date)

    
class GetMonthlyReportController():
    
    def get_monthly_report(self, year, month):
        pm = PlatformManagement()
        return pm.get_monthly_report(year, month)

    
    