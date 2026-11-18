const base = (import.meta.env && import.meta.env.VITE_API_URL) || "/api";

async function get(url) {
  const r = await fetch(base + url);
  if (!r.ok) throw new Error("request failed: " + url);
  return r.json();
}
async function post(url, body) {
  const r = await fetch(base + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  return r.json();
}

export const api = {
  topics: () => get("/topics"),
  topic: (slug) => get("/topics/" + slug),
  pattern: (slug) => get("/patterns/" + slug),
  question: (slug) => get("/questions/" + slug),
  random: (started) => get("/random" + (started ? "?started=1" : "")),
  recall: () => get("/quiz/recall"),
  revise: () => get("/revise"),
  flashcards: (topic, pattern, shuffle) => {
    const params = [];
    if (topic && topic !== "all") params.push("topic=" + encodeURIComponent(topic));
    if (pattern && pattern !== "all") params.push("pattern=" + encodeURIComponent(pattern));
    if (shuffle) params.push("shuffle=1");
    return get("/flashcards" + (params.length ? "?" + params.join("&") : ""));
  },
  progress: () => get("/progress"),
  journey: () => get("/journey"),
  solve: (slug) => post("/progress/solve", { slug }),
  quizResult: (payload) => post("/progress/quiz", payload),
};
