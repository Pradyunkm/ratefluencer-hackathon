from backend.services.groq_service import groq_service
from backend.utils.prompt_templates import SCRIPT_GENERATION_TEMPLATE

class ScriptGenerationAgent:
    """Generates hooks, scripts, and CTAs using Groq Llama 3.3 70B."""

    PLATFORM_FORMATS = {
        "instagram": "Instagram Reels (30-60 sec, visual storytelling, trending audio-friendly)",
        "tiktok": "TikTok (15-30 sec, fast paced, trend-driven, Gen-Z tone)",
        "youtube": "YouTube Shorts (60 sec max, educational hook, subscribe CTA)",
        "linkedin": "LinkedIn (thought leadership, professional insight, value-first)",
    }

    async def generate(self, topic: str, platform: str, tone: str, trends_context: list[str]) -> dict:
        platform_info = self.PLATFORM_FORMATS.get(platform.lower(), self.PLATFORM_FORMATS["instagram"])
        trends_str = ", ".join(trends_context[:3]) if trends_context else topic

        prompt = SCRIPT_GENERATION_TEMPLATE.format(
            topic=topic,
            platform=platform_info,
            tone=tone,
            trends_context=trends_str
        )

        try:
            result = await groq_service.generate_json(prompt, temperature=0.85)
            return {
                "hook": result.get("hook", f"Stop scrolling — this {topic} secret changes everything."),
                "script": result.get("script", f"Here's what nobody tells you about {topic}..."),
                "cta": result.get("cta", "Save this and share with someone who needs to see it!"),
                "engagement_triggers": result.get("engagement_triggers", ["curiosity", "urgency", "social proof"]),
            }
        except Exception as e:
            return self._fallback(topic, platform, tone)

    def _fallback(self, topic: str, platform: str, tone: str) -> dict:
        return {
            "hook": f"Nobody talks about this {topic} strategy — and it's costing creators millions.",
            "script": f"Here's the truth about {topic} that top creators don't want you to know. I spent 6 months testing this, and the results were shocking. The secret is consistency + authenticity. Not the fake kind — the kind that makes people feel seen. When you apply this to your content, your engagement triples.",
            "cta": "Save this right now. Come back in 30 days and tell me your results.",
            "engagement_triggers": ["curiosity gap", "social proof", "urgency", "relatability"],
        }

script_agent = ScriptGenerationAgent()
