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

# For searching accounts by multiple fields (name, email, role)
class SearchAccountRequest(BaseModel):
    name: str = Field(None, description="Name of the user to search") # column in db is called username not name
    email: str = Field(None, description="Email of the user to search") # there is no column in db for email 
    role: str = Field(None, description="Role of the user to search")
    
class SuspendAccountRequest(BaseModel):
    username: str
