import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

const TINTS = ["#EAF3DE", "#FBEAF0", "#E6F1FB", "#F6E0C2", "#ECEAFB"];
const TINT_TEXT = ["#4F9A2E", "#B14C73", "#2E73B0", "#9A6A1B", "#6B5CC4"];

export default function LearnScreen() {
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => { api.topics().then(setData).catch(() => {}); }, []);

  return (
    <>
      <TopBar title="Learn" />
      <div className="screen">
        {!data && <p className="loading">Loading topics…</p>}
        {data && data.topics.map((t, i) => (
          <div
            key={t.slug}
            className={t.locked ? "card-soft mb" : "card mb"}
            style={{ display: "flex", alignItems: "center", gap: 12, opacity: t.locked ? 0.85 : 1 }}
            onClick={() => !t.locked && nav("/topic/" + t.slug)}
            role="button"
          >
            <div className="icon-badge" style={{ background: TINTS[i % 5], color: TINT_TEXT[i % 5] }}>
              {t.locked ? "🔒" : t.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{i + 1}. {t.name}</div>
              <div className="sub" style={{ margin: "2px 0 5px" }}>
                {t.patternCount || "—"} patterns · {t.problemCount} problems
              </div>
              {!t.locked && (
                <div className="bar"><span style={{ width: (t.problemCount ? (t.solved / t.problemCount) * 100 : 0) + "%" }} /></div>
              )}
              {t.locked && <div className="sub" style={{ color: "#A08C78" }}>Upcoming in your mohalla</div>}
            </div>
            {!t.locked && <span className="sub">{t.solved}/{t.problemCount}</span>}
          </div>
        ))}
      </div>
    </>
  );
}
