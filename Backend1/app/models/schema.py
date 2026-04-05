from pydantic import BaseModel

class QueryInput(BaseModel):
    userQuery: str
    filters: dict