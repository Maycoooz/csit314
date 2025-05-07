from pydantic import BaseModel

# to send to frontend so that cleaner can see available(not suspended) categories to create/update services from/to    
class AvailableCategories(BaseModel):
    category: str
    description: str
    status: str
    
class ActiveUsersOut(BaseModel):
    username: str
    role: str