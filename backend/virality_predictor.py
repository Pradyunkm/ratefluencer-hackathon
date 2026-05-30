"""
Virality Prediction Engine
"""
import re

class ViralityPredictor:
    def predict_virality(self, caption, hashtags, platform='instagram'):
        score = 50
        
        # Length scoring
        if 50 <= len(caption) <= 150:
            score += 15
        elif len(caption) < 30:
            score -= 10
        elif len(caption) > 200:
            score -= 15
            
        # Emoji scoring
        emoji_count = len(re.findall(r'[\U0001F600-\U0001F64F]', caption))
        if emoji_count >= 2:
            score += 15
        elif emoji_count >= 1:
            score += 8
            
        # Engagement hooks
        if '?' in caption:
            score += 15
        if '!' in caption:
            score += 5
        if any(word in caption.lower() for word in ['comment', 'share', 'save', 'tag']):
            score += 10
            
        # Hashtags
        hashtag_list = hashtags.split()
        if 5 <= len(hashtag_list) <= 10:
            score += 15
            
        # Platform multiplier
        multipliers = {'instagram': 1.0, 'tiktok': 1.2, 'youtube': 0.9, 'linkedin': 0.7}
        score *= multipliers.get(platform.lower(), 1.0)
        
        final_score = min(100, max(0, score))
        
        return {
            'virality_score': round(final_score, 1),
            'breakdown': {
                'expected_views': '100K-500K' if final_score > 60 else '10K-100K',
                'expected_likes': '10K-50K' if final_score > 60 else '1K-10K',
                'expected_shares': '2K-10K' if final_score > 60 else '200-2K',
                'expected_saves': '5K-20K' if final_score > 60 else '500-5K'
            }
        }
