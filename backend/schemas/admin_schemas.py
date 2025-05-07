from pydantic import BaseModel
from typing import Optional

class CreateAccountRequest(BaseModel):
    new_username: str
    new_password: str

# response model to return users
class UserOut(BaseModel):
    username: str 
    password: str 
    status: str 
    role: Optional[str] # so that can be null or string value

class SearchAccountRequest(BaseModel):
    username: str 
    
class SuspendAccountRequest(BaseModel):
    username: str
    
class UpdateAccountRequest(BaseModel):
    target_username: str
    updated_username: str
    updated_password: str
    
class CreateUserProfileRequest(BaseModel):
    new_role: str
    new_description: str
    
class UserProfileOut(BaseModel):
    role: str
    description: str
    status: str
    
class SearchUserProfileRequest(BaseModel):
    role: str
    
class SuspendUserProfileRequest(BaseModel):
    role: str
    
class UpdateUserProfileRequest(BaseModel):
    target_role: str
    updated_role: str
    updated_description: str
    
class UpdateUserRoleRequest(BaseModel):
    target_username: str
    updated_role: str
    
class ViewAllUserWithSpecifiedRoleRequest(BaseModel):
    role: str
