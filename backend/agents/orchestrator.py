import asyncio
from backend.agents.trend_discovery import trend_agent
from backend.agents.virality_engine import virality_agent
from backend.agents.script_generator import script_agent
from backend.agents.content_optimizer import optimizer_agent

class CreatorOrchestrator:
    """
    Master async pipeline:
    User Input → Trends → Virality → Script → Optimize → Unified Response
    """

    async def run(self, topic: str, platform: str, tone: str) -> dict:
        # Step 1: Discover trends (async)
        trend_data = await trend_agent.discover(topic)

        # Step 2: Generate script with trend context (async)
        script_data = await script_agent.generate(
            topic=topic,
            platform=platform,
            tone=tone,
            trends_context=trend_data.get("related_topics", [])
        )

        # Step 3: Optimize content + predict virality (parallel async)
        optimization_task = optimizer_agent.optimize(
            topic=topic,
            platform=platform,
            tone=tone,
            hook=script_data["hook"],
            script=script_data["script"]
        )
        virality_task = virality_agent.predict(
            hook=script_data["hook"],
            caption=script_data["script"],
            hashtags=" ".join(trend_data.get("related_topics", [])),
            platform=platform,
            trend_score=trend_data.get("trend_score", 60.0)
        )

        optimization_data, virality_data = await asyncio.gather(optimization_task, virality_task)

        return {
            "topic": topic,
            "platform": platform,
            "hook": script_data["hook"],
            "script": script_data["script"],
            "cta": script_data["cta"],
            "engagement_triggers": script_data.get("engagement_triggers", []),
            "caption": optimization_data["optimized_caption"],
            "hashtags": optimization_data["hashtags"],
            "posting_time": optimization_data["posting_time"],
            "optimization_reasoning": optimization_data["optimization_reasoning"],
            "virality": virality_data,
            "trends": trend_data,
            "trends_used": trend_data.get("related_topics", [])[:3],
            "pipeline_status": {
                "trend_discovery": "complete",
                "script_generation": "complete",
                "content_optimization": "complete",
                "virality_prediction": "complete",
            }
        }

orchestrator = CreatorOrchestrator()
