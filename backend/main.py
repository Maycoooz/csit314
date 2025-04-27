import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.schemas.login_schema import LoginRequest
from backend.schemas.admin_schemas import CreateAccountRequest, UserOut, SearchAccountRequest, SuspendAccountRequest
from backend.controllers.login_controller import LoginController
from backend.controllers.admin_controller import CreateAccountController, ViewAllAccountsController, SearchAccountController, SuspendAccountController

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

@app.post("/login")
def login(data: LoginRequest):
    controller = LoginController()
    success = controller.login_user(data.username, data.password)
    
    if success:
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid username or password"}
    
# Admin create account, do we need log which admin created the account?
@app.post("/createAccount")
def create_account(data: CreateAccountRequest):
    controller = CreateAccountController()
    success = controller.create_account(data.new_username, data.new_password)
    
    if success:
        return {"message": "Account successfully created"}
    else:
        return {"message": "Account creation failed"}
    
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
    users = controller.search_account(data)
    
    return users

@app.post("/suspendAccount")
def suspend_account(data: SuspendAccountRequest):
    controller = SuspendAccountController()
    success = controller.suspend_account(data.username)
    
    if success:
        return {"message": "Account suspended"}
    else:
        return {"message": "Error suspending account"}