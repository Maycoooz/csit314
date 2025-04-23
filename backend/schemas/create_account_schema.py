from pydantic import BaseModel

class CreateAccountRequest(BaseModel):
    admin_username: str
    new_username: str
    new_password: str

