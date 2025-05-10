from pydantic import BaseModel
from datetime import date

class CreateServiceRequest(BaseModel):
    cleaner_username: str
    selected_category: str
    new_service: str
    new_price: float
    
class ServicesOut(BaseModel):
    service_id: int
    cleaner_username: str
    category: str
    service: str
    price: float
    status: str
    
class UpdateServiceRequest(BaseModel):
    service_id: int
    updated_category: str
    updated_service: str
    updated_price: float
    
class SuspendServiceRequest(BaseModel):
    service_id: int

class CleanerTransactionsOut(BaseModel):
    homeowner_username: str
    category: str
    service: str
    price: float
    date: date