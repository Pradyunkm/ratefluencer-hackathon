import re
from backend.services.groq_service import groq_service
from backend.utils.prompt_templates import VIRALITY_REASONING_TEMPLATE

class ViralityEngine:
    """Explainable AI virality scoring — rules + Groq reasoning."""

    PLATFORM_MULTIPLIERS = {
        "instagram": 1.0,
        "tiktok": 1.2,
        "youtube": 0.9,
        "linkedin": 0.75,
    }

    def _score_hook_strength(self, hook: str) -> float:
        score = 40.0
        hook_lower = hook.lower()
        if "?" in hook: score += 20
        if any(w in hook_lower for w in ["secret", "nobody", "never", "exposed", "truth", "mistake"]): score += 15
        if any(w in hook_lower for w in ["i", "my", "me", "we"]): score += 10
        if len(hook) <= 80: score += 10
        if hook[0].isupper(): score += 5
        return min(score, 100)

    def _score_emotional_triggers(self, text: str) -> float:
        score = 30.0
        text_lower = text.lower()
        triggers = {
            "fear_of_missing_out": ["before it's gone", "limited", "exclusive", "last chance", "don't miss"],
            "curiosity": ["secret", "hidden", "nobody knows", "what happens", "surprising", "unexpected"],
            "social_proof": ["everyone", "viral", "millions", "trending", "most people"],
            "urgency": ["now", "today", "immediately", "stop", "wait"],
            "aspiration": ["transform", "achieve", "become", "unlock", "master"],
        }
        for _, words in triggers.items():
            if any(w in text_lower for w in words):
                score += 14
        emoji_count = len(re.findall(r'[^\x00-\x7F]', text))
        score += min(emoji_count * 3, 15)
        return min(score, 100)

    def _score_cta(self, text: str) -> float:
        score = 20.0
        text_lower = text.lower()
        ctas = ["comment", "share", "save", "follow", "subscribe", "tag", "dm", "click", "link in bio", "drop"]
        hits = sum(1 for c in ctas if c in text_lower)
        score += hits * 16
        if "?" in text: score += 12
        return min(score, 100)

    def _score_hashtags(self, hashtags: str) -> float:
        tags = [h for h in hashtags.split() if h.startswith("#")]
        count = len(tags)
        if 5 <= count <= 10: return 90.0
        if 3 <= count <= 15: return 70.0
        if count > 0: return 50.0
        return 20.0

    def _score_trend_alignment(self, trend_score: float) -> float:
        return min(trend_score, 100)

    def _compute_virality(self, hook: float, emotional: float, cta: float, hashtags: float, trend: float, platform: str) -> float:
        raw = (hook * 0.30 + emotional * 0.25 + cta * 0.20 + hashtags * 0.10 + trend * 0.15)
        multiplier = self.PLATFORM_MULTIPLIERS.get(platform.lower(), 1.0)
        return round(min(raw * multiplier, 100), 1)

    async def predict(self, hook: str, caption: str, hashtags: str, platform: str, trend_score: float = 60.0) -> dict:
        hook_strength = self._score_hook_strength(hook)
        emotional = self._score_emotional_triggers(hook + " " + caption)
        cta = self._score_cta(caption)
        hashtag_quality = self._score_hashtags(hashtags)
        trend_alignment = self._score_trend_alignment(trend_score)
        virality_score = self._compute_virality(hook_strength, emotional, cta, hashtag_quality, trend_alignment, platform)

        engagement_prob = "Very High" if virality_score >= 80 else "High" if virality_score >= 65 else "Medium" if virality_score >= 45 else "Low"

        try:
            prompt = VIRALITY_REASONING_TEMPLATE.format(
                hook=hook, caption=caption, platform=platform, virality_score=virality_score
            )
            reasoning_data = await groq_service.generate_json(prompt, temperature=0.6)
            ai_reasoning = reasoning_data.get("ai_reasoning", "Strong content with good viral potential.")
        except Exception:
            ai_reasoning = f"This content scores {virality_score}/100 on virality. The hook creates curiosity and the CTA drives engagement. Platform alignment is optimized for {platform}."

        return {
            "virality_score": virality_score,
            "hook_strength": round(hook_strength, 1),
            "emotional_trigger_score": round(emotional, 1),
            "cta_effectiveness": round(cta, 1),
            "hashtag_quality": round(hashtag_quality, 1),
            "trend_alignment": round(trend_alignment, 1),
            "engagement_probability": engagement_prob,
            "ai_reasoning": ai_reasoning,
        }

virality_agent = ViralityEngine()
