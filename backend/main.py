import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.schemas.login_schema import LoginRequest
from backend.schemas.admin_schemas import CreateAccountRequest, UserOut, SearchAccountRequest, SuspendAccountRequest, UpdateAccountRequest
from backend.schemas.admin_schemas import CreateUserProfileRequest, UserProfileOut, SearchUserProfileRequest, SuspendUserProfileRequest, UpdateUserProfileRequest, UpdateUserRoleRequest, ViewAllUserWithSpecifiedRoleRequest
from backend.controllers.login_controller import LoginController
from backend.controllers.admin_controllers import CreateAccountController, ViewAllAccountsController, SearchAccountController, SuspendAccountController, UpdateAccountController, UpdateUserRoleController
from backend.controllers.admin_controllers import CreateUserProfileController, ViewAllUserProfilesController, SearchUserProfileController, SuspendUserProfileController, UpdateUserProfileController, ViewAllUsersWithSpecifiedRoleController

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
    success = controller.login_user(data.username, data.password)
    
    return success
    
# Admin create account, do we need log which admin created the account?
# returns a boolean
@app.post("/createAccount")
def create_account(data: CreateAccountRequest):
    controller = CreateAccountController()
    success = controller.create_account(data.new_username, data.new_password)
    
    return success
    
# Admin view all accounts 
# response_model ensures that what we return is actually what is specified
@app.post("/viewAllAccounts", response_model=List[UserOut])
def view_all_accounts():
    controller = ViewAllAccountsController()
    users = controller.view_all_accounts()
    
    return users

# Admin search accounts by a keyword
# response_model ensures that what we return matches the specified schema
@app.post("/searchAccount", response_model=List[UserOut])
def search_account(data: SearchAccountRequest):
    controller = SearchAccountController()
    users = controller.search_account(data.username)
    
    return users

# Admin suspend account (change status from active to suspended in db)
@app.post("/suspendAccount")
def suspend_account(data: SuspendAccountRequest) -> bool:
    controller = SuspendAccountController()
    success = controller.suspend_account(data.username)
    
    return success

@app.post("/updateAccount")
def update_account(data: UpdateAccountRequest) -> bool:
    controller = UpdateAccountController()
    success = controller.update_account(data.target_username, data.updated_username, data.updated_password)
    
    return success

@app.post("/createUserProfile")
def create_userprofile(data: CreateUserProfileRequest) -> bool:
    controller = CreateUserProfileController()
    success = controller.create_userprofile(data.new_role, data.new_description)
    
    return success

@app.post("/viewAllUserProfiles", response_model=List[UserProfileOut])
def view_all_userprofiles():
    controller = ViewAllUserProfilesController()
    userprofiles = controller.view_all_userprofiles()
    
    return userprofiles

@app.post("/searchUserProfile", response_model=List[UserProfileOut])
def search_userprofile(data: SearchUserProfileRequest):
    controller = SearchUserProfileController()
    userprofiles = controller.search_userprofile(data.role)
    
    return userprofiles

@app.post("/suspendUserProfile")
def suspend_userprofile(data: SuspendUserProfileRequest):
    controller = SuspendUserProfileController()
    success = controller.suspend_userprofile(data.role)
    
    return success

@app.post("/updateUserProfile")
def update_userprofile(data: UpdateUserProfileRequest):
    controller = UpdateUserProfileController()
    success = controller.update_userprofile(data.target_role, data.updated_role, data.updated_description)
    
    return success

@app.post("/updateUserRole")
def update_user_role(data: UpdateUserRoleRequest):
    controller = UpdateUserRoleController()
    success = controller.update_user_role(data.target_username, data.updated_role)
    
    return success

@app.post("/viewAllUserWithSpecifiedRole", response_model=List[UserOut])
def view_all_user_with_specified_role(data: ViewAllUserWithSpecifiedRoleRequest):
    controller = ViewAllUsersWithSpecifiedRoleController()
    users = controller.view_all_users_with_specified_role(data.role)
    
    return users