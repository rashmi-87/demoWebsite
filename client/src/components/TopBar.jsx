import { useNavigate } from "react-router-dom";

export default function TopBar({ title, back = false, streak, level }) {
  const nav = useNavigate();
  return (
    <div className="topbar">
      {back && (
        <button className="back" onClick={() => nav(-1)} aria-label="Back">←</button>
      )}
      <span className="title">{title}</span>
      <div className="right">
        {streak != null && <span className="pill pill-streak">🔥 {streak}</span>}
        {level != null && <span className="pill pill-level">Lvl {level}</span>}
      </div>
    </div>
  );
}
