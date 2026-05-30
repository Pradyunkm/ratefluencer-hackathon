# Ratefluencer AI 🚀

**AI-Powered Influencer Intelligence & Viral Content Creation**

Built for hackathon — analyses influencers and predicts content virality using ML scoring.

## Features
- 📊 **Influencer Scoring** — Authenticity, Engagement Rate, Growth Potential, Consistency
- 🧠 **Fake Follower Detection** — ML-based bot and engagement pod detection
- ✨ **Viral Content Generator** — AI captions and hashtags with virality prediction
- 📈 **Platform Support** — Instagram, TikTok, YouTube, LinkedIn

## Tech Stack
- **Backend**: Python Flask + Flask-CORS
- **Frontend**: Vanilla HTML/CSS/JS
- **AI**: Groq Llama 3.3 70B (optional)

## Run Locally

```bash
# Install dependencies
pip install flask flask-cors python-dotenv requests

# Start server
python backend/app.py
```

Open **http://localhost:5000** in your browser.

## Project Structure
```
ratefluencer_hackathon/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── influencer_model.py    # ML scoring engine
│   └── virality_predictor.py  # Virality prediction
├── frontend/
│   └── index.html             # Web UI
└── requirements.txt
```

## Optional: Groq AI Setup
Add your Groq API key to `.env`:
```
GROQ_API_KEY=your_key_here
```
