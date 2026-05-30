from pydantic import BaseModel
from typing import Optional

class ContentRequest(BaseModel):
    topic: str
    platform: str = "instagram"
    tone: str = "casual"

class ViralityRequest(BaseModel):
    caption: str
    hashtags: str = ""
    platform: str = "instagram"

class ScriptRequest(BaseModel):
    topic: str
    platform: str = "instagram"
    tone: str = "casual"
    hook_style: str = "question"

class InfluencerRequest(BaseModel):
    followers: int = 0
    following: int = 0
    avg_likes: int = 0
    avg_comments: int = 0
    avg_shares: int = 0
    avg_saves: int = 0
    posts_per_week: float = 3
    monthly_growth_percent: float = 5
