from pydantic import BaseModel

class CreateServiceCategoryRequest(BaseModel):
    new_category: str
    new_description: str
    
class ServiceCategoryOut(BaseModel):
    category: str
    description: str
    status: str
    
class UpdateServiceCategoryRequest(BaseModel):
    target_category: str
    updated_category: str
    updated_description: str
    
class SuspendServiceCategoryRequest(BaseModel):
    target_category: str
    