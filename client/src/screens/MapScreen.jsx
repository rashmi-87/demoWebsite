import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

// Hand-placed positions for the winding lane (percent of map box).
const SPOTS = [
  { x: 18, y: 86 }, { x: 30, y: 60 }, { x: 52, y: 70 },
  { x: 60, y: 40 }, { x: 40, y: 26 }, { x: 78, y: 22 },
];

export default function MapScreen() {
  const nav = useNavigate();
  const [journey, setJourney] = useState(null);
  const [prog, setProg] = useState(null);

  useEffect(() => {
    api.journey().then(setJourney).catch(() => {});
    api.progress().then(setProg).catch(() => {});
  }, []);

  const level = prog ? 1 + Math.floor(prog.totalSolved / 20) : 1;
  const journeyPct = prog ? Math.round((prog.totalSolved / prog.totalProblems) * 100) : 0;
  const nodes = journey ? journey.nodes.slice(0, SPOTS.length) : [];
  const current = journey ? journey.nodes.find((n) => n.status === "current") ||
    journey.nodes.find((n) => n.status === "open") : null;

  return (
    <>
      <TopBar title="DSA" streak={prog ? prog.streak : null} level={level} />
      <div className="screen">
        <div className="card mb">
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
            <span>📍</span>
            <b style={{ fontSize: 13 }}>Interview prep journey</b>
            <b style={{ marginLeft: "auto", fontSize: 13, color: "var(--green-text)" }}>{journeyPct}%</b>
          </div>
          <div className="bar"><span style={{ width: journeyPct + "%" }} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9, color: "var(--muted)" }}>
            <span>Basics</span><span>Core</span><span>Patterns</span><span>Practice</span><span>Ready</span>
          </div>
        </div>

        <div className="map-wrap">
          {nodes.map((n, i) => (
            <div
              key={n.slug}
              className="map-node"
              style={{ left: SPOTS[i].x + "%", top: SPOTS[i].y + "%" }}
              onClick={() => !n.locked && nav("/topic/" + n.slug)}
              role="button"
            >
              <span className={"map-dot " + n.status}>
                {n.status === "done" ? "✓" : n.status === "locked" ? "🔒" : n.status === "current" ? "▶" : "•"}
              </span>
              <span className={"map-label" + (n.status === "current" ? " current" : "")}>{n.name}</span>
            </div>
          ))}
        </div>

        {current && (
          <div className="card mt">
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <span>📌</span>
              <span className="sub">Current area</span>
            </div>
            <h2 style={{ marginBottom: 4 }}>{current.name}</h2>
            <p className="sub mb">{current.solved}/{current.total} solved</p>
            <button className="btn btn-primary" onClick={() => nav("/topic/" + current.slug)}>
              ▶ Continue learning
            </button>
          </div>
        )}

        <div className="row mt">
          <button className="btn" onClick={() => nav("/revise")}>🔁 Revise</button>
          <button className="btn" onClick={() => nav("/quiz")}>❓ Quiz</button>
        </div>

        {!journey && <p className="loading">Loading your mohalla…</p>}
      </div>
    </>
  );
}
