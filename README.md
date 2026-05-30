# CreatorOS AI 🚀
### *AI Operating System for Creators*

> **Hackathon Project** — AI-powered multi-agent platform for viral content creation, trend intelligence, and explainable influencer scoring.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.121-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-orange)](https://groq.com)
[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)

---

## 📌 Problem Statement

The creator economy is worth **$250 billion** and growing. Yet creators face three critical unsolved problems:

1. **Blind Content Creation** — No data-driven way to know if content will perform *before* publishing
2. **Trend Lag** — Creators discover trends *after* they peak, missing the viral window
3. **Fake Influencer Problem** — Brands waste 30-40% of influencer budgets on accounts with fake followers

**CreatorOS AI** solves all three using a multi-agent AI pipeline.

---

## 🧠 Solution Overview

A **4-agent AI orchestration system** that:

| Agent | Role | Technology |
|---|---|---|
| `TrendDiscoveryAgent` | Discovers live trending topics | Google Trends + pytrends |
| `ViralityPredictionAgent` | Scores content virality across 5 XAI dimensions | Rule-based ML + Groq LLM |
| `ScriptGenerationAgent` | Generates hooks, scripts, CTAs | Groq Llama 3.3 70B |
| `ContentOptimizationAgent` | Optimizes captions, hashtags, posting time | Groq Llama 3.3 70B |

**Pipeline Flow:**
```
Topic Input → Trend Discovery → Virality Prediction → Script Generation → Content Optimization → Unified Dashboard
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js 16)                   │
│  Dashboard │ Trends │ Generator │ Analytics │ AI Reasoning  │
│     TypeScript + Tailwind CSS + Framer Motion + Recharts    │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API (JSON)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│               BACKEND (FastAPI + Python 3.11)               │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │   Routers   │  │    Agents    │  │     Services      │  │
│  │  /trends    │  │  Trend       │  │  GroqService      │  │
│  │  /generate  │  │  Virality    │  │  CacheService     │  │
│  │  /virality  │  │  Script      │  │                   │  │
│  │  /analytics │  │  Optimizer   │  │                   │  │
│  └─────────────┘  └──────────────┘  └───────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Orchestrator (Async Pipeline)           │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────┬───────────────────┬──────────────────────┘
                   │                   │
        ┌──────────▼──────┐  ┌─────────▼──────────┐
        │   Groq API      │  │   Google Trends     │
        │  Llama 3.3 70B  │  │   (pytrends)        │
        └─────────────────┘  └────────────────────┘
```

---

## 🤖 AI Workflow

```
User Input: topic="AI fitness", platform="instagram", tone="casual"
     │
     ▼
[1] TrendDiscoveryAgent
     ├── Queries Google Trends (7-day window)
     ├── Extracts related keywords & momentum
     ├── Scores trend velocity (0-100)
     └── Output: { trend_score: 78, growth_rate: "+34%", related_topics: [...] }
     │
     ▼
[2] ScriptGenerationAgent                [PARALLEL]
     ├── Builds platform-specific prompt                ▼
     ├── Calls Groq Llama 3.3 70B       [2b] ViralityPredictionAgent
     └── Output: { hook, script, cta }       ├── hook_strength (regex + NLP rules)
                                             ├── emotional_trigger_score
                                             ├── cta_effectiveness
                                             ├── hashtag_quality
                                             ├── trend_alignment
                                             └── Groq XAI reasoning
     │                   │
     └────────┬───────────┘
              ▼
[3] ContentOptimizationAgent
     ├── Calls Groq with hook + script context
     ├── Generates platform-native caption
     ├── Selects optimal hashtag mix (niche + broad)
     └── Output: { caption, hashtags[], posting_time }
              │
              ▼
    Unified JSON Response → Frontend Dashboard
```

---

## 📊 Virality Scoring — Explainable AI

The Virality Engine scores content across **5 dimensions**:

| Dimension | Weight | What it measures |
|---|---|---|
| Hook Strength | 30% | Scroll-stopping power, curiosity gap, length |
| Emotional Triggers | 25% | FOMO, curiosity, aspiration, urgency, social proof |
| CTA Effectiveness | 20% | Comment/save/share triggers, question engagement |
| Trend Alignment | 15% | Google Trends score correlation |
| Hashtag Quality | 10% | Count, mix of niche vs broad |

**Formula:**
```
virality_score = (hook×0.30 + emotion×0.25 + cta×0.20 + trend×0.15 + hashtags×0.10) × platform_multiplier
```

**Platform Multipliers:**
- TikTok: 1.2x
- Instagram: 1.0x
- YouTube: 0.9x
- LinkedIn: 0.75x

---

## 🗂️ Project Structure

```
ratefluencer_hackathon/
├── backend/
│   ├── main.py                     # FastAPI entry point (port 8000)
│   ├── config/
│   │   └── settings.py             # Pydantic BaseSettings
│   ├── agents/
│   │   ├── orchestrator.py         # Async master pipeline
│   │   ├── trend_discovery.py      # Google Trends agent
│   │   ├── virality_engine.py      # XAI scoring + Groq reasoning
│   │   ├── script_generator.py     # Groq script generation
│   │   └── content_optimizer.py    # Groq caption optimization
│   ├── routers/
│   │   ├── content.py              # POST /api/generate-content
│   │   ├── trends.py               # GET  /api/trends
│   │   ├── virality.py             # POST /api/predict-virality
│   │   └── analytics.py            # GET  /api/analytics
│   ├── services/
│   │   ├── groq_service.py         # Groq client + retry logic
│   │   └── cache_service.py        # In-memory TTL cache
│   ├── models/
│   │   ├── requests.py             # Pydantic request models
│   │   └── responses.py            # Pydantic response models
│   └── utils/
│       └── prompt_templates.py     # Reusable LLM prompts
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                # Dashboard
│   │   ├── trends/page.tsx         # Trend Explorer
│   │   ├── generate/page.tsx       # Content Generator (main demo)
│   │   ├── analytics/page.tsx      # Analytics Dashboard
│   │   └── reasoning/page.tsx      # AI Reasoning Panel
│   ├── components/
│   │   └── Sidebar.tsx             # Navigation sidebar
│   └── lib/
│       └── api.ts                  # Typed API client
│
├── .env                            # API keys (not committed)
├── requirements.txt
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/Pradyunkm/ratefluencer-hackathon.git
cd ratefluencer-hackathon
```

### 2. Configure Environment
```bash
# Create .env in root directory
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
```

### 3. Install Backend Dependencies
```bash
pip install fastapi uvicorn httpx pydantic-settings pytrends groq python-dotenv scikit-learn numpy pandas
```

### 4. Start the Backend
```bash
python -m uvicorn backend.main:app --port 8000 --reload
```
✅ API running at: http://localhost:8000  
📖 Swagger docs at: http://localhost:8000/docs

### 5. Install & Start Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ UI running at: http://localhost:3000

---

## 🌐 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/generate-content` | Full 4-agent pipeline |
| `GET` | `/api/trends` | Live Google Trends data |
| `POST` | `/api/predict-virality` | XAI virality analysis |
| `GET` | `/api/analytics` | Platform analytics |
| `GET` | `/health` | System health check |
| `GET` | `/docs` | Swagger UI |

### Example: Generate Content
```bash
curl -X POST http://localhost:8000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{"topic": "AI fitness", "platform": "instagram", "tone": "casual"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hook": "Nobody tells you this about AI fitness tracking...",
    "script": "Here's what 6 months of AI-coached workouts taught me...",
    "caption": "This AI fitness secret changed my routine forever 🔥",
    "hashtags": ["#aifitness", "#fittech", "#viral", "#trending"],
    "posting_time": "Tuesday–Thursday, 7–9 PM EST",
    "virality": {
      "virality_score": 84.2,
      "hook_strength": 90.0,
      "emotional_trigger_score": 82.0,
      "cta_effectiveness": 75.0,
      "trend_alignment": 78.0,
      "engagement_probability": "Very High",
      "ai_reasoning": "This hook leverages a powerful curiosity gap..."
    }
  }
}
```

---

## 📈 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Backend Framework | FastAPI |
| Language | Python 3.11 |
| AI/LLM | Groq API — Llama 3.3 70B |
| Trend Data | Google Trends (pytrends) |
| Validation | Pydantic v2 |
| Caching | In-memory TTL cache |

---

## 🔮 Future Enhancements

- [ ] **Supabase PostgreSQL** — persistent storage for content history
- [ ] **Reddit API** — expanded trend discovery from subreddits
- [ ] **XGBoost Model** — trained virality classifier on historical data
- [ ] **Real-time dashboard** — WebSocket-powered live updates
- [ ] **Authentication** — multi-user SaaS with Supabase Auth
- [ ] **Influencer comparison** — side-by-side creator benchmarking
- [ ] **Campaign ROI calculator** — brand partnership value estimation

---

## 👥 Team

Built for hackathon submission — CreatorOS AI.

---

## 📄 License

MIT License — see [LICENSE](LICENSE)
