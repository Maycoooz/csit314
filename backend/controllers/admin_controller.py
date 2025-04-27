from backend.models.admin import Admin
from backend.schemas.admin_schemas import SearchAccountRequest
from typing import List

class CreateAccountController:
    def __init__(self):
        pass
    
    def create_account(self, new_username: str, new_password: str) -> bool:
        admin = Admin(username="", password="")
        return admin.create_account(new_username, new_password)

class ViewAllAccountsController:
    def __init__(self):
        pass
    
    def view_all_accounts(self):
        admin = Admin(username="", password="")
        return admin.view_all_accounts()    
    
class SearchAccountController:
    def __init__(self):
        pass
    
    def search_account(self, search_request: SearchAccountRequest) -> List[dict]:
        admin = Admin(username="", password="")
        
        # Build dynamic search filters based on the request data
        search_filters = {}
        if search_request.name:
            search_filters['name'] = search_request.name
        if search_request.email:
            search_filters['email'] = search_request.email
        if search_request.role:
            search_filters['role'] = search_request.role
        
        # Pass the filters to the Admin model's search method
        return admin.search_account(search_filters)
    
class SuspendAccountController:
    def __init__(self):
        pass
    
    def suspend_account(seld, target_username: str) -> bool:
        admin = Admin(username="", password="")
        return admin.suspend_account(target_username)
    
