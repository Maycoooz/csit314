from pydantic import BaseModel

class CreateServiceRequest(BaseModel):
    cleaner_username: str
    selected_category: str
    new_service: str
    new_price: float

class ViewAllServicesRequest(BaseModel):
    cleaner_username: str
    
class ServicesOut(BaseModel):
    service_id: int
    cleaner_username: str
    category: str
    service: str
    price: float
    status: str
    
class SearchServiceRequest(BaseModel):
    target_service: str
    
class UpdateServiceRequest(BaseModel):
    service_id: int
    updated_category: str
    updated_service: str
    updated_price: float
    
class SuspendServiceRequest(BaseModel):
    service_id: int