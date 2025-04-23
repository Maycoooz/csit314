import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.schemas.login_schema import LoginRequest
from backend.schemas.create_account_schema import CreateAccountRequest
from backend.controllers.login_controller import LoginController
from backend.controllers.create_account_controller import CreateAccountController

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
    
# Admin create account, need log which admin created the account?
@app.post("/createAccount")
def create_account(data: CreateAccountRequest): # need make schema for CreateAccountRequest (admin_username, new_username, new_password)
    controller = CreateAccountController()
    success = controller.create_account(data.admin_username, data.new_username, data.new_password)
    
    if success:
        return {"message": "Account successfully created"}
    else:
        return {"message": "Account creation failed"}