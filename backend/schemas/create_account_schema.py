from pydantic import BaseModel

class CreateAccountRequest(BaseModel):
    new_username: str
    new_password: str

