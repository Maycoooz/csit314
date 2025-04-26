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
    name: str = Field(None, description="Name of the user to search")
    email: str = Field(None, description="Email of the user to search")
    role: str = Field(None, description="Role of the user to search")
