import time
import json
from typing import Any, Optional
from pathlib import Path

class CacheService:
    def __init__(self, ttl_seconds: int = 1800):
        self._cache: dict[str, tuple[Any, float]] = {}
        self.ttl = ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        if key in self._cache:
            value, timestamp = self._cache[key]
            if time.time() - timestamp < self.ttl:
                return value
            del self._cache[key]
        return None

    def set(self, key: str, value: Any) -> None:
        self._cache[key] = (value, time.time())

    def clear(self) -> None:
        self._cache.clear()

cache_service = CacheService(ttl_seconds=1800)
