from fastapi import APIRouter
from app.models.schema import QueryInput
from app.services.ai_services import generate_ai_response

router = APIRouter()

@router.post("/api/search")
async def ai_search(body: QueryInput):

    # Convert to text inside backend
    query = f"""
Looking for {", ".join(body.filters.get("configuration", []))}
{", ".join(body.filters.get("propertyType", []))}
in {body.userQuery}
with {", ".join(body.filters.get("features", []))}
within budget {", ".join(body.filters.get("budget", []))}
"""

    result = await generate_ai_response(query)
    return result