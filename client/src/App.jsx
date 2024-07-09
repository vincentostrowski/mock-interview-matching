import DashBoard from "./pages/DashBoard";
import NonMember from "./pages/NonMember";
import Error from "./pages/Error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiscordLogin from "./components/DiscordLogin";
import DiscordCallback from "./components/DiscordRedirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<DiscordLogin />} />
        <Route
          exact
          path="/auth/discord/callback"
          element={<DiscordCallback />}
        />
        <Route path="/protected" element={<DashBoard />} />
        <Route path="/not-member" element={<NonMember />} />
        <Route
          path="/error"
          element={
            <h1>
              <Error />
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
