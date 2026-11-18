import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { api } from "../api.js";

export default function QuizScreen() {
  const loc = useLocation();
  const passed = loc.state;
  const [items, setItems] = useState(passed ? passed.items : null);
  const [title] = useState(passed ? passed.title : "Recall quiz");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (!passed) {
      api.recall().then((d) => {
        if (!d.items || d.items.length === 0) setEmpty(true);
        else setItems(d.items);
      }).catch(() => setEmpty(true));
    }
  }, []);

  const finish = (score, total) => {
    setDone(true);
    const payload = { correct: score, total };
    if (passed && passed.slug) payload.slug = passed.slug;
    if (passed && passed.patternSlug) payload.patternSlug = passed.patternSlug;
    api.quizResult(payload).catch(() => {});
  };

  const choose = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === items[i].answer) setCorrect((c) => c + 1);
  };
  const next = () => {
    if (i + 1 >= items.length) finish(correct, items.length);
    else { setI(i + 1); setPicked(null); }
  };

  return (
    <>
      <TopBar title={title} back />
      <div className="screen">
        {empty && (
          <div className="card center">
            <p>Solve a few questions first 🙂</p>
            <p className="muted" style={{ fontSize: 13 }}>The recall quiz is built only from questions you have solved.</p>
          </div>
        )}
        {!items && !empty && <p className="loading">Loading quiz…</p>}

        {items && !done && (
          <>
            <p className="sub mb">Question {i + 1} of {items.length}</p>
            <h2 style={{ marginBottom: 14 }}>{items[i].q}</h2>
            {items[i].options.map((opt, idx) => {
              let cls = "quiz-opt";
              if (picked !== null) {
                if (idx === items[i].answer) cls += " correct";
                else if (idx === picked) cls += " wrong";
              }
              return <div key={idx} className={cls} onClick={() => choose(idx)}>{opt}</div>;
            })}
            {picked !== null && (
              <>
                <div className="card-soft mt">
                  <p style={{ margin: 0, fontSize: 13 }}>
                    <b>{picked === items[i].answer ? "Correct! " : "Not quite. "}</b>{items[i].explain}
                  </p>
                </div>
                <button className="btn btn-primary mt" onClick={next}>
                  {i + 1 >= items.length ? "See score" : "Next →"}
                </button>
              </>
            )}
          </>
        )}

        {done && (
          <div className="card center">
            <h1>{correct} / {items.length}</h1>
            <p className="muted">
              {correct === items.length ? "Perfect! This pattern is solid. 🎯" :
               correct >= items.length / 2 ? "Good work — revise a little more." :
               "No worries — review it and try again."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
