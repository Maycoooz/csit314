import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.schemas.login_schema import LoginRequest
from backend.controllers.login_controller import LoginController

app = FastAPI()

origins = [
    "http://localhost:3001",
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