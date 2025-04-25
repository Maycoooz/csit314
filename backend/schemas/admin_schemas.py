from pydantic import BaseModel, Field

class CreateAccountRequest(BaseModel):
    new_username: str
    new_password: str

# For admin view all accounts
class UserOut(BaseModel):
    username: str 
    password: str 
    status: str 
    role: str 


