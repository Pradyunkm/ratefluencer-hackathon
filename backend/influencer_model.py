"""
ML Model for Influencer Scoring
"""
import pandas as pd
import numpy as np

class InfluencerIntelligenceEngine:
    def calculate_engagement_rate(self, likes, comments, shares, saves, followers):
        total_engagement = likes + comments + shares + saves
        return (total_engagement / followers) * 100 if followers > 0 else 0
    
    def detect_fake_followers(self, followers, following, engagement_rate, growth_rate):
        score = 100
        warnings = []
        ratio = followers / max(following, 1)
        if ratio > 100:
            score -= 25
            warnings.append("Suspicious follower/following ratio")
        if engagement_rate < 0.5:
            score -= 30
            warnings.append("Extremely low engagement rate")
        elif engagement_rate < 1.0:
            score -= 15
            warnings.append("Low engagement rate")
        if growth_rate > 500:
            score -= 25
            warnings.append("Suspicious sudden growth spike")
        return max(0, score), warnings
    
    def calculate_ratefluencer_score(self, data):
        followers = data.get('followers', 0)
        following = data.get('following', 0)
        likes = data.get('avg_likes', 0)
        comments = data.get('avg_comments', 0)
        shares = data.get('avg_shares', 0)
        saves = data.get('avg_saves', 0)
        growth_rate = data.get('monthly_growth_percent', 5)
        
        engagement_rate = self.calculate_engagement_rate(likes, comments, shares, saves, followers)
        authenticity_score, warnings = self.detect_fake_followers(followers, following, engagement_rate, growth_rate)
        
        growth_potential = min(100, growth_rate * 2)
        consistency_score = min(100, (data.get('posts_per_week', 3) / 7) * 100)
        
        final_score = (authenticity_score * 0.4 + engagement_rate * 0.3 + growth_potential * 0.2 + consistency_score * 0.1)
        
        return {
            'ratefluencer_score': round(final_score, 1),
            'authenticity_score': round(authenticity_score, 1),
            'engagement_rate': round(engagement_rate, 2),
            'growth_potential': round(growth_potential, 1),
            'consistency_score': round(consistency_score, 1),
            'warnings': warnings,
            'recommendation': '⭐ Strong Creator' if final_score > 70 else '📈 Growing Creator' if final_score > 50 else '⚠️ Needs Review'
        }

def get_sample_influencer():
    return {
        'followers': 250000, 'following': 1200, 'avg_likes': 12500,
        'avg_comments': 450, 'avg_shares': 3200, 'avg_saves': 8900,
        'posts_per_week': 5, 'monthly_growth_percent': 12
    }
