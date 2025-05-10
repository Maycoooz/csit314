from pydantic import BaseModel
from datetime import date

class ShortlistCleanerRequest(BaseModel):
    homeowner_username: str
    service_id: int
      
class ShowShortlistedCleaners(BaseModel):
    cleaner_username: str
    service_id: int
    category: str
    service: str
    price: float

class HomeOwnerTransactionsOut(BaseModel):
    cleaner_username: str
    category: str
    service: str
    price: float
    date: date
