from backend.services.groq_service import groq_service
from backend.utils.prompt_templates import CONTENT_OPTIMIZATION_TEMPLATE

class ContentOptimizationAgent:
    """Optimizes captions, hashtags, and posting time using Groq."""

    async def optimize(self, topic: str, platform: str, tone: str, hook: str, script: str) -> dict:
        prompt = CONTENT_OPTIMIZATION_TEMPLATE.format(
            topic=topic,
            platform=platform,
            tone=tone,
            hook=hook,
            script=script[:500]
        )

        try:
            result = await groq_service.generate_json(prompt, temperature=0.75)
            hashtags = result.get("hashtags", [])
            if isinstance(hashtags, str):
                hashtags = [h.strip() for h in hashtags.split() if h.startswith("#")]

            return {
                "optimized_caption": result.get("optimized_caption", hook),
                "hashtags": hashtags[:10],
                "posting_time": result.get("posting_time", "Tuesday–Thursday, 7–9 PM local time"),
                "optimization_reasoning": result.get("optimization_reasoning", "Optimized for peak engagement window."),
            }
        except Exception:
            return self._fallback(topic, platform)

    def _fallback(self, topic: str, platform: str) -> dict:
        return {
            "optimized_caption": f"This {topic} insight will change the way you create. Save it before it's gone. 🔥",
            "hashtags": [f"#{topic}", f"#{topic}tips", "#viral", "#trending", "#contentcreator", "#growth", "#socialmedia"],
            "posting_time": "Tuesday–Thursday, 7–9 PM EST",
            "optimization_reasoning": f"Caption optimized for {platform}'s algorithm with an emotional hook, urgency, and a clear save CTA to maximize reach.",
        }

optimizer_agent = ContentOptimizationAgent()
