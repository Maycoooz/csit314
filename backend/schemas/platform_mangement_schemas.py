from pydantic import BaseModel

class CreateServiceCategory(BaseModel):
    new_category: str
    new_description: str
    
class ServiceCategoryOut(BaseModel):
    category: str
    description: str
    status: str
    
class UpdateServiceCategory(BaseModel):
    target_category: str
    updated_category: str
    updated_description: str
    
class SuspendServiceCategory(BaseModel):
    target_category: str
    
class SearchServiceCategory(BaseModel):
    target_category: str