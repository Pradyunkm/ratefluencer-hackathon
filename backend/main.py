"""
CreatorOS AI — FastAPI Backend
AI Operating System for Creators
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(".env")
load_dotenv("../.env")

from backend.routers import content, trends, virality, analytics

app = FastAPI(
    title="CreatorOS AI",
    description="AI Operating System for Creators — Multi-Agent Content Intelligence Platform",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(content.router)
app.include_router(trends.router)
app.include_router(virality.router)
app.include_router(analytics.router)

# Serve Next.js frontend (after build) or fallback
FRONTEND_OUT = Path(__file__).parent / "frontend_dist"
if FRONTEND_OUT.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_OUT), html=True), name="static")

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "CreatorOS AI",
        "version": "2.0.0",
        "agents": ["TrendDiscovery", "ViralityEngine", "ScriptGenerator", "ContentOptimizer"],
    }

if __name__ == "__main__":
    import uvicorn
    print("CreatorOS AI Backend Starting...")
    print("API docs: http://localhost:8000/docs")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
