import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/", label: "Mohalla", ico: "🗺️", end: true },
  { to: "/learn", label: "Learn", ico: "📖" },
  { to: "/flashcards", label: "Cards", ico: "🃏" },
  { to: "/random", label: "Practice", ico: "⚡" },
  { to: "/progress", label: "Progress", ico: "📊" },
];

export default function BottomTabs() {
  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end}>
          <span className="ico">{t.ico}</span>
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
