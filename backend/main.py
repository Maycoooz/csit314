import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from backend.schemas.login_schema import LoginRequest, LoginProfiles
from backend.schemas.utility_schemas import AvailableCategories, ActiveUsersOut
from backend.schemas.admin_schemas import CreateAccountRequest, UserOut, SuspendAccountRequest, UpdateAccountRequest
from backend.schemas.admin_schemas import CreateUserProfileRequest, UserProfileOut, SuspendUserProfileRequest, UpdateUserProfileRequest, UpdateUserRoleRequest
from backend.schemas.platform_mangement_schemas import CreateServiceCategoryRequest, ServiceCategoryOut, UpdateServiceCategoryRequest, SuspendServiceCategoryRequest
from backend.schemas.cleaner_schemas import CreateServiceRequest, ServicesOut, UpdateServiceRequest, SuspendServiceRequest, CleanerTransactionsOut
from backend.schemas.home_owner_schemas import ShortlistCleanerRequest, ShowShortlistedCleaners, HomeOwnerTransactionsOut

from backend.controllers.login_controller import LoginController, LoginProfileController
from backend.controllers.utility_controllers import ServiceCategoriesController, ActiveUsersController
from backend.controllers.admin_controllers import CreateAccountController, ViewAllAccountsController, SearchAccountController, SuspendAccountController, UpdateAccountController, UpdateUserRoleController
from backend.controllers.admin_controllers import CreateUserProfileController, ViewAllUserProfilesController, SearchUserProfileController, SuspendUserProfileController, UpdateUserProfileController, ViewAllUsersWithSpecifiedRoleController
from backend.controllers.platform_management_controllers import CreateServiceCategoryController, ViewAllServiceCategoryController, UpdateServiceCategoryController, SuspendServiceCategoryController, SearchServiceCategoryController, GetDailyReportController, GetWeeklyReportController, GetMonthlyReportController
from backend.controllers.cleaner_controllers import CreateServiceController, ViewAllServicesController, SearchServiceController, UpdateServiceController, SuspendServiceController, ViewNumViewsController, ViewShortlistCountController, ViewPastTransactionsCleanerController, SearchPastTransactionsController
from backend.controllers.home_owner_controllers import FilterCleanersController, ViewCleanerProfileController, ShortlistCleanerController, ViewShortlistedCleanersController, FilterShortlistedCleanersController, ViewPastTransactionsHOController, FilterPastTransactionsHOController

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home_page():
    return {"message": "hello api working"}

# returns a boolean
@app.post("/login")
def login(data: LoginRequest) -> bool:
    controller = LoginController()
    success = controller.login_user(data.username, data.password, data.role)
    return success

# gives login page all current roles in database for user to choose before logging in
@app.get("/login", response_model=List[LoginProfiles])
def get_profiles():
    controller = LoginProfileController()
    login_profiles = controller.get_all_profiles()
    return login_profiles

@app.get("/admin/allUsers", response_model=List[ActiveUsersOut])
def get_all_active_users():
    controller = ActiveUsersController()
    users = controller.get_all_active_users()
    return users

@app.get("/admin/allProfiles", response_model=List[LoginProfiles])
def get_all_profiles():
    controller = LoginProfileController()
    profiles = controller.get_all_profiles()
    return profiles

# Admin user accounts ----------------------------------------------------------------------------------------------------------------------------
    
@app.post("/admin/createAccount")
def create_account(data: CreateAccountRequest):
    controller = CreateAccountController()
    success = controller.create_account(data.new_username, data.new_password)
    return success
    
@app.get("/admin/viewAllAccounts", response_model=List[UserOut])
def view_all_accounts():
    controller = ViewAllAccountsController()
    users = controller.view_all_accounts()
    return users

@app.get("/admin/searchAccount", response_model=List[UserOut])
def search_account(username: str):
    controller = SearchAccountController()
    users = controller.search_account(username)
    return users

@app.post("/admin/suspendAccount")
def suspend_account(data: SuspendAccountRequest) -> bool:
    controller = SuspendAccountController()
    success = controller.suspend_account(data.username)
    return success

@app.post("/admin/updateAccount")
def update_account(data: UpdateAccountRequest) -> bool:
    controller = UpdateAccountController()
    success = controller.update_account(data.target_username, data.updated_username, data.updated_password)
    return success

# Admin User Profiles ----------------------------------------------------------------------------------------------------------------------------

@app.post("/admin/createUserProfile")
def create_userprofile(data: CreateUserProfileRequest) -> bool:
    controller = CreateUserProfileController()
    success = controller.create_userprofile(data.new_role, data.new_description)
    return success

@app.get("/admin/viewAllUserProfiles", response_model=List[UserProfileOut])
def view_all_userprofiles():
    controller = ViewAllUserProfilesController()
    userprofiles = controller.view_all_userprofiles()
    return userprofiles

@app.get("/admin/searchUserProfile", response_model=List[UserProfileOut])
def search_userprofile(role: str):
    controller = SearchUserProfileController()
    userprofiles = controller.search_userprofile(role)
    return userprofiles

@app.post("/admin/suspendUserProfile")
def suspend_userprofile(data: SuspendUserProfileRequest):
    controller = SuspendUserProfileController()
    success = controller.suspend_userprofile(data.role)
    return success

@app.post("/admin/updateUserProfile")
def update_userprofile(data: UpdateUserProfileRequest):
    controller = UpdateUserProfileController()
    success = controller.update_userprofile(data.target_role, data.updated_role, data.updated_description)
    return success

# Admin ----------------------------------------------------------------------------------------------------------------------------

@app.post("/admin/updateUserRole")
def update_user_role(data: UpdateUserRoleRequest):
    controller = UpdateUserRoleController()
    success = controller.update_user_role(data.target_username, data.updated_role)
    return success

# CHANGED TO GET
@app.get("/admin/viewAllUserWithSpecifiedRole", response_model=List[UserOut])
def view_all_user_with_specified_role(role: str):
    controller = ViewAllUsersWithSpecifiedRoleController()
    users = controller.view_all_users_with_specified_role(role)
    return users

# Platform Management CRUDS ----------------------------------------------------------------------------------------------------------------------------

@app.post("/pm/createServiceCategory")
def create_service_category(data: CreateServiceCategoryRequest):
    controller = CreateServiceCategoryController()
    success = controller.create_service_category(data.new_category, data.new_description)
    return success

# Changed to GET
@app.get("/pm/viewAllServiceCategories", response_model=List[ServiceCategoryOut])
def view_all_service_categories():
    controller = ViewAllServiceCategoryController()
    service_categories = controller.view_all_service_categories()
    return service_categories

@app.post("/pm/updateServiceCategory")
def update_service_category(data: UpdateServiceCategoryRequest):
    controller = UpdateServiceCategoryController()
    success = controller.update_service_category(data.target_category, data.updated_category, data.updated_description)
    return success

@app.post("/pm/suspendServiceCategory")
def suspend_service_category(data: SuspendServiceCategoryRequest):
    controller = SuspendServiceCategoryController()
    success = controller.suspend_service_category(data.target_category)
    return success

# Changed to GET
@app.get("/pm/searchServiceCategory", response_model=List[ServiceCategoryOut])
def search_service_category(category: str):
    controller = SearchServiceCategoryController()
    service_categories = controller.search_service_category(category)
    return service_categories

# Platform Management reports --------------------------------------------------------------------------------------------------------

@app.get("/pm/getDailyReport")
def get_daily_report(date: str): # YYYY-MM-DD 
    controller = GetDailyReportController()
    report = controller.get_daily_report(date)
    return report

@app.get("/pm/getWeeklyReport")
def get_weekly_report(start_date: str, end_date: str): # YYYY-MM-DD 
    controller = GetWeeklyReportController()
    report = controller.get_weekly_report(start_date, end_date)
    return report

@app.get("/pm/getMonthlyReport")
def get_monthly_report(year: int, month: int): # YYYY-MM-DD 
    controller = GetMonthlyReportController()
    report = controller.get_monthly_report(year, month)
    return report



# Cleaner ----------------------------------------------------------------------------------------------------------------------------

# gives all available categories to cleaners to see when creating services
@app.get("/cleaner/createService", response_model=List[AvailableCategories])
def show_available_categories_for_create():
    controller = ServiceCategoriesController()
    available_categories = controller.get_all_available_service_categories()
    return available_categories

# gives all available categories to cleaners to see when updating services
@app.get("/cleaner/updateService", response_model=List[AvailableCategories])
def show_available_categories_for_update():
    controller = ServiceCategoriesController()
    available_categories = controller.get_all_available_service_categories()
    return available_categories

# Cleaner CRUDS ----------------------------------------------------------------------------------------------------------------------------

@app.post("/cleaner/createService")
def create_service(data: CreateServiceRequest):
    controller = CreateServiceController()
    success = controller.create_service(data.cleaner_username, data.selected_category, data.new_service, data.new_price)
    return success

@app.get("/cleaner/viewAllServices", response_model=List[ServicesOut])
def view_all_service(cleaner_username: str):
    controller = ViewAllServicesController()
    services = controller.view_all_services(cleaner_username)
    return services

@app.get("/cleaner/searchService", response_model=List[ServicesOut])
def search_service(cleaner_username: str, filter_service: str):
    controller = SearchServiceController()
    services = controller.search_service(cleaner_username, filter_service)
    return services

@app.post("/cleaner/updateService")
def update_service(data: UpdateServiceRequest):
    controller = UpdateServiceController()
    success = controller.update_service(data.service_id, data.updated_category, data.updated_service, data.updated_price)
    return success

@app.post("/cleaner/suspendService")
def suspend_servie(data: SuspendServiceRequest):
    controller = SuspendServiceController()
    success = controller.suspend_service(data.service_id)
    return success

# Cleaner view num views & num shortlist ------------------------------------------------------------------------------------------------

@app.get("/cleaner/viewNumViews")
def view_num_views(cleaner_username: str):
    controller = ViewNumViewsController()
    num_views = controller.view_num_views(cleaner_username)
    return num_views

@app.get("/cleaner/viewNumShortlisted")
def view_num_shortlisted(cleaner_username: str):
    controller = ViewShortlistCountController()
    shortlist_count = controller.view_shortlist_count(cleaner_username)
    return shortlist_count

# Cleaner view & search past transactions -----------------------------------------------------------------------------------------------

@app.get("/cleaner/viewPastTransactions", response_model=list[CleanerTransactionsOut])
def view_past_cleaner_transactions(cleaner_username: str):
    controller = ViewPastTransactionsCleanerController()
    past_transactions = controller.view_past_transactions(cleaner_username)
    return past_transactions

@app.get("/cleaner/searchPastTransactions", response_model=list[CleanerTransactionsOut])
def search_past_cleaner_transactions(cleaner_username: str, filtered_service: str):
    controller = SearchPastTransactionsController()
    filtered_transactions = controller.search_past_transactions(cleaner_username, filtered_service)

    return filtered_transactions

# Home Owner ----------------------------------------------------------------------------------------------------------------------------

@app.get("/ho/viewCleaners", response_model=List[str])
def view_cleaners(service: Optional[str] = Query(None, description="Service keyword to filter cleaners")):
    controller = FilterCleanersController()
    cleaner_usernames = controller.filter_cleaners(service)
    return cleaner_usernames
    
@app.get("/ho/viewCleanerProfile", response_model=List[ServicesOut])
def view_cleaner_profile(homeowner_username: str, cleaner_username: str):
    # homeowner responsibility to keep track of view of cleaner, but cleaner responsibility to display their services
    controller = ViewCleanerProfileController()
    services = controller.view_cleaner_profile(homeowner_username, cleaner_username)
    return services

@app.post("/ho/viewCleanerProfile/shortlistCleaner")
def shortlist_cleaner(data: ShortlistCleanerRequest):
    controller = ShortlistCleanerController()
    success = controller.shortlist_cleaner(data.homeowner_username, data.service_id)
    return success

@app.get("/ho/viewShortlist", response_model=List[ShowShortlistedCleaners])
def view_shortlisted_cleaners(homeowner_username: str):
    controller = ViewShortlistedCleanersController()
    shortlisted_cleaners_and_services = controller.view_shortlisted_cleaners(homeowner_username)
    return shortlisted_cleaners_and_services

# filtered by service
@app.get("/ho/filteredShortlist", response_model=List[ShowShortlistedCleaners])
def view_filtered_shortlisted_cleaners(homeowner_username: str, service_filter: str):
    controller = FilterShortlistedCleanersController()
    filtered_shortlist = controller.filter_shortlist(homeowner_username, service_filter)
    return filtered_shortlist

# view past transactions
@app.get("/ho/viewPastTransactions", response_model=List[HomeOwnerTransactionsOut])
def view_past_ho_transactions(homeowner_username: str):
    controller = ViewPastTransactionsHOController()
    past_transactions = controller.view_past_transactions(homeowner_username)
    return past_transactions

#filter view past transactions
@app.get("/ho/filterPastTransactions", response_model=List[HomeOwnerTransactionsOut])
def filter_past_ho_transactions(homeowner_username: str, service_filter: str):
    controller = FilterPastTransactionsHOController()
    filtered_transactions = controller.filter_past_transactions(homeowner_username, service_filter)
    return filtered_transactions