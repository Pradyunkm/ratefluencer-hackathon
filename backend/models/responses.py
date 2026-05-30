from pydantic import BaseModel
from typing import Optional, Any

class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None

class TrendItem(BaseModel):
    trend: str
    trend_score: float
    growth_rate: str
    category: str
    related_topics: list[str]

class ViralityBreakdown(BaseModel):
    virality_score: float
    hook_strength: float
    emotional_trigger_score: float
    cta_effectiveness: float
    hashtag_quality: float
    trend_alignment: float
    engagement_probability: str
    ai_reasoning: str

class GeneratedContent(BaseModel):
    hook: str
    script: str
    caption: str
    hashtags: list[str]
    cta: str
    posting_time: str
    virality: ViralityBreakdown
    trends_used: list[str]
    optimization_reasoning: str

class InfluencerReport(BaseModel):
    ratefluencer_score: float
    authenticity_score: float
    engagement_rate: float
    growth_potential: float
    consistency_score: float
    warnings: list[str]
    recommendation: str
