from fastapi import APIRouter, HTTPException
from backend.models.requests import ViralityRequest
from backend.agents.virality_engine import virality_agent

router = APIRouter(prefix="/api", tags=["Virality"])

@router.post("/predict-virality")
async def predict_virality(req: ViralityRequest):
    try:
        result = await virality_agent.predict(
            hook=req.caption[:100],
            caption=req.caption,
            hashtags=req.hashtags,
            platform=req.platform,
            trend_score=60.0
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
