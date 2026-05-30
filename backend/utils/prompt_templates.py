SCRIPT_GENERATION_TEMPLATE = """You are an elite viral content strategist and scriptwriter for {platform}.

Topic: {topic}
Tone: {tone}
Platform: {platform}
Trending Context: {trends_context}

Generate a high-converting short-form content script. Return ONLY valid JSON, no markdown, no extra text:

{{
  "hook": "The first 3 seconds — make it irresistible. Use curiosity, shock, or bold claim.",
  "script": "The full 30-60 second script body. Use storytelling, contrast, and momentum.",
  "cta": "The closing call-to-action. Drive saves, shares, or comments.",
  "engagement_triggers": ["trigger1", "trigger2", "trigger3"]
}}

Rules:
- Hook must stop the scroll in under 3 seconds
- Use conversational language for {platform}
- Include pattern interrupts and emotional spikes
- CTA must feel natural, not forced
- Script must build to a satisfying payoff"""

CONTENT_OPTIMIZATION_TEMPLATE = """You are a senior social media growth hacker optimizing content for {platform}.

Original Topic: {topic}
Tone: {tone}
Hook: {hook}
Script: {script}

Generate an optimized caption and hashtag strategy. Return ONLY valid JSON:

{{
  "optimized_caption": "Platform-native caption with emojis, line breaks, and engagement hook. 150-300 chars for Instagram, professional tone for LinkedIn.",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"],
  "posting_time": "Best posting time recommendation, e.g. 'Tuesday 7-9 PM EST'",
  "optimization_reasoning": "2-3 sentences explaining WHY these choices maximize engagement on {platform}."
}}

Rules:
- Mix niche-specific, mid-range, and broad hashtags
- Caption must start with the strongest line
- Posting time based on {platform} peak engagement data"""

VIRALITY_REASONING_TEMPLATE = """You are an AI content psychologist and virality analyst.

Content Hook: {hook}
Caption: {caption}
Platform: {platform}
Virality Score: {virality_score}/100

Analyze why this content will or won't go viral. Return ONLY valid JSON:

{{
  "ai_reasoning": "3-4 sentences explaining the virality prediction. Reference specific psychological principles, audience psychology, and platform algorithm behavior.",
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "audience_psychology": "1-2 sentences on the emotional triggers at play.",
  "improvement_tips": ["tip1", "tip2"]
}}"""
