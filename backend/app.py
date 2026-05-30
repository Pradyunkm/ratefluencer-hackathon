"""
Flask Backend for Ratefluencer AI
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

load_dotenv()

from influencer_model import InfluencerIntelligenceEngine, get_sample_influencer
from virality_predictor import ViralityPredictor

FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'frontend')

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path='')
CORS(app)

influencer_engine = InfluencerIntelligenceEngine()
virality_engine = ViralityPredictor()

GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route('/')
def serve_frontend():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Ratefluencer AI API is running'})

@app.route('/api/analyze-influencer', methods=['POST'])
def analyze_influencer():
    try:
        data = request.get_json()
        if not data:
            data = get_sample_influencer()
        result = influencer_engine.calculate_ratefluencer_score(data)
        return jsonify({'success': True, 'data': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/predict-virality', methods=['POST'])
def predict_virality():
    try:
        data = request.get_json()
        caption = data.get('caption', '')
        hashtags = data.get('hashtags', '')
        platform = data.get('platform', 'instagram')
        
        if not caption:
            return jsonify({'success': False, 'error': 'Caption required'}), 400
        
        result = virality_engine.predict_virality(caption, hashtags, platform)
        return jsonify({'success': True, 'data': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/generate-content', methods=['POST'])
def generate_content():
    try:
        data = request.get_json()
        topic = data.get('topic', '')
        tone = data.get('tone', 'casual')
        platform = data.get('platform', 'instagram')
        
        if not topic:
            return jsonify({'success': False, 'error': 'Topic required'}), 400
        
        # Demo response (since Groq key might not be set)
        demo_captions = {
            'fitness': f"💪 {topic.upper()} tip that changed everything! Try this tomorrow morning! 🔥 What's your favorite exercise? 👇",
            'tech': f"📱 Hidden {topic} feature you're not using (but should!) ⚡ Which one surprised you?",
            'food': f"🍝 Quick {topic} recipe that tastes like restaurant quality! Save this for later! 👨‍🍳",
        }
        
        caption = demo_captions.get(topic.lower(), f"✨ Amazing {topic} content! 🔥 What do you think about this? 👇")
        hashtags = f"#{topic} #{topic}tips #viral #trending #contentcreator"
        
        thumbnail = f"https://picsum.photos/id/100/1280/720"
        virality = virality_engine.predict_virality(caption, hashtags, platform)
        
        return jsonify({
            'success': True,
            'data': {
                'caption': caption,
                'hashtags': hashtags,
                'thumbnail': thumbnail,
                'virality_score': virality['virality_score'],
                'virality_prediction': virality['breakdown']
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/compare-influencers', methods=['POST'])
def compare_influencers():
    try:
        data = request.get_json()
        influencers = data.get('influencers', [])
        
        results = []
        for idx, inf in enumerate(influencers):
            score_result = influencer_engine.calculate_ratefluencer_score(inf)
            results.append({
                'id': idx + 1,
                'score': score_result['ratefluencer_score'],
                'authenticity': score_result['authenticity_score'],
                'recommendation': score_result['recommendation']
            })
        
        results.sort(key=lambda x: x['score'], reverse=True)
        return jsonify({'success': True, 'data': {'rankings': results}})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("Ratefluencer AI Backend Starting...")
    print("Running on http://localhost:5000")
    app.run(debug=True, port=5000)
