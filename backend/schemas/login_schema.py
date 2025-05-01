# backend/schemas/login_schema.py
from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginProfiles(BaseModel):
    role: str

