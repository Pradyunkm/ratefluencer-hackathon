from fastapi import APIRouter, Query, HTTPException
from backend.agents.trend_discovery import trend_agent
from backend.services.cache_service import cache_service
import asyncio

router = APIRouter(prefix="/api", tags=["Trends"])

DEFAULT_TOPICS = ["AI", "fitness", "finance", "mental health", "sustainability", "creator economy", "productivity"]

@router.get("/trends")
async def get_trends(topic: str = Query(default="", description="Topic to search trends for")):
    try:
        if topic:
            result = await trend_agent.discover(topic)
            return {"success": True, "data": [result]}
        else:
            cached = cache_service.get("global_trends")
            if cached:
                return {"success": True, "data": cached}
            tasks = [trend_agent.discover(t) for t in DEFAULT_TOPICS[:5]]
            results = await asyncio.gather(*tasks, return_exceptions=True)
            trends = [r for r in results if isinstance(r, dict)]
            trends.sort(key=lambda x: x.get("trend_score", 0), reverse=True)
            cache_service.set("global_trends", trends)
            return {"success": True, "data": trends}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
