from pydantic import BaseModel

class ShortlistCleanerRequest(BaseModel):
    homeowner_username: str
    service_id: int
      
class ShowShortlistedCleaners(BaseModel):
    cleaner_username: str
    service_id: int
    category: str
    service: str
    price: float
