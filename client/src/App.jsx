import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InterviewPage from "./pages/InterviewPage";
import SchedulePage from "./pages/SchedulePage";
import LandingPage from "./pages/LandingPage";
import ResourcesPage from "./pages/ResourcesPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col inter-nice h-dvh w-dvw">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
