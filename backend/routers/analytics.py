from fastapi import APIRouter
import random

router = APIRouter(prefix="/api", tags=["Analytics"])

@router.get("/analytics")
async def get_analytics():
    """Returns demo analytics data for the dashboard charts."""
    return {
        "success": True,
        "data": {
            "total_content_generated": random.randint(120, 450),
            "avg_virality_score": round(random.uniform(68, 84), 1),
            "top_platform": "Instagram",
            "weekly_trend": [
                {"day": "Mon", "score": round(random.uniform(60, 90), 1)},
                {"day": "Tue", "score": round(random.uniform(60, 90), 1)},
                {"day": "Wed", "score": round(random.uniform(60, 90), 1)},
                {"day": "Thu", "score": round(random.uniform(60, 90), 1)},
                {"day": "Fri", "score": round(random.uniform(60, 90), 1)},
                {"day": "Sat", "score": round(random.uniform(60, 90), 1)},
                {"day": "Sun", "score": round(random.uniform(60, 90), 1)},
            ],
            "platform_breakdown": [
                {"platform": "Instagram", "count": random.randint(40, 80), "avg_score": round(random.uniform(70, 88), 1)},
                {"platform": "TikTok", "count": random.randint(30, 60), "avg_score": round(random.uniform(72, 92), 1)},
                {"platform": "YouTube", "count": random.randint(15, 35), "avg_score": round(random.uniform(62, 80), 1)},
                {"platform": "LinkedIn", "count": random.randint(10, 25), "avg_score": round(random.uniform(55, 74), 1)},
            ]
        }
    }
