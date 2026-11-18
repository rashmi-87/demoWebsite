import { Routes, Route } from "react-router-dom";
import BottomTabs from "./components/BottomTabs.jsx";
import MapScreen from "./screens/MapScreen.jsx";
import LearnScreen from "./screens/LearnScreen.jsx";
import TopicScreen from "./screens/TopicScreen.jsx";
import PatternScreen from "./screens/PatternScreen.jsx";
import QuestionScreen from "./screens/QuestionScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import RandomScreen from "./screens/RandomScreen.jsx";
import ReviseScreen from "./screens/ReviseScreen.jsx";
import FlashcardsScreen from "./screens/FlashcardsScreen.jsx";
import ProgressScreen from "./screens/ProgressScreen.jsx";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MapScreen />} />
        <Route path="/learn" element={<LearnScreen />} />
        <Route path="/topic/:slug" element={<TopicScreen />} />
        <Route path="/pattern/:slug" element={<PatternScreen />} />
        <Route path="/question/:slug" element={<QuestionScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/random" element={<RandomScreen />} />
        <Route path="/revise" element={<ReviseScreen />} />
        <Route path="/flashcards" element={<FlashcardsScreen />} />
        <Route path="/progress" element={<ProgressScreen />} />
      </Routes>
      <BottomTabs />
    </div>
  );
}
