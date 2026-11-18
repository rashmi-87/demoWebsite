import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

export default function TopicScreen() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => { api.topic(slug).then(setData).catch(() => {}); }, [slug]);

  return (
    <>
      <TopBar title={data ? data.name : "Topic"} back />
      <div className="screen">
        {!data && <p className="loading">Loading…</p>}
        {data && (
          <>
            <p className="sub mb">Pick a pattern. Each one opens with a story, then its questions.</p>
            {data.patterns.map((p) => (
              <div key={p.slug} className="card mb" role="button" onClick={() => nav("/pattern/" + p.slug)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b style={{ flex: 1, fontSize: 14 }}>{p.name}</b>
                  <span className="chip chip-pattern">{p.solved}/{p.total}</span>
                </div>
                <p className="sub" style={{ marginTop: 5 }}>{p.strategy}</p>
                <div className="bar" style={{ marginTop: 8 }}>
                  <span style={{ width: (p.total ? (p.solved / p.total) * 100 : 0) + "%" }} />
                </div>
              </div>
            ))}
            {data.patterns.length === 0 && (
              <div className="card center">
                <p className="muted">Patterns for this topic are coming soon. 🙌</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
