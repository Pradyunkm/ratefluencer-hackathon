import os
import json
import asyncio
import time
from groq import Groq
from dotenv import load_dotenv

load_dotenv("../.env")
load_dotenv(".env")

class GroqService:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY", "")
        self.client = Groq(api_key=api_key)
        self.model = "llama-3.3-70b-versatile"
        self.max_retries = 3

    async def generate(self, prompt: str, temperature: float = 0.8, max_tokens: int = 1024) -> str:
        """Generate text from Groq with retry logic."""
        for attempt in range(self.max_retries):
            try:
                loop = asyncio.get_event_loop()
                response = await loop.run_in_executor(
                    None,
                    lambda: self.client.chat.completions.create(
                        model=self.model,
                        messages=[{"role": "user", "content": prompt}],
                        temperature=temperature,
                        max_tokens=max_tokens,
                    )
                )
                return response.choices[0].message.content.strip()
            except Exception as e:
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(2 ** attempt)
                else:
                    raise RuntimeError(f"Groq API failed after {self.max_retries} attempts: {e}")

    async def generate_json(self, prompt: str, temperature: float = 0.7) -> dict:
        """Generate and parse JSON from Groq."""
        raw = await self.generate(prompt, temperature=temperature, max_tokens=1500)
        # Strip markdown code fences if present
        raw = raw.strip()
        if raw.startswith("```"):
            lines = raw.split("\n")
            raw = "\n".join(lines[1:-1]) if lines[-1] == "```" else "\n".join(lines[1:])
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            # Try to extract JSON from response
            start = raw.find("{")
            end = raw.rfind("}") + 1
            if start != -1 and end > start:
                return json.loads(raw[start:end])
            raise ValueError(f"Could not parse JSON from Groq response: {raw[:200]}")

groq_service = GroqService()
