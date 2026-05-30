const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function apiCall(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  generateContent: (body: { topic: string; platform: string; tone: string }) =>
    apiCall("/api/generate-content", { method: "POST", body: JSON.stringify(body) }),

  getTrends: (topic?: string) =>
    apiCall(`/api/trends${topic ? `?topic=${encodeURIComponent(topic)}` : ""}`),

  predictVirality: (body: { caption: string; hashtags: string; platform: string }) =>
    apiCall("/api/predict-virality", { method: "POST", body: JSON.stringify(body) }),

  getAnalytics: () => apiCall("/api/analytics"),

  health: () => apiCall("/health"),
};
