from fastapi import APIRouter, HTTPException
from backend.models.requests import ContentRequest
from backend.agents.orchestrator import orchestrator

router = APIRouter(prefix="/api", tags=["Content"])

@router.post("/generate-content")
async def generate_content(req: ContentRequest):
    try:
        result = await orchestrator.run(
            topic=req.topic,
            platform=req.platform,
            tone=req.tone
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
