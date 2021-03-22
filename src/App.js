import { HashRouter as Router, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Points from "./components/Points";
import SoftskillLeaderboard from "./components/SoftskillLeaderboard";
import SoftskillTeams from "./components/SoftskillTeams";
import TeamPage from "./components/TeamPage";

function App() {
  toast.configure();

  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/course_teams">
          <TeamPage />
        </Route>
        <Route exact path="/points">
          <Points />
        </Route>
        <Route exact path="/softskill_teams">
          <SoftskillTeams />
        </Route>
        <Route exact path="/softskill_leaderboard">
          <SoftskillLeaderboard />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
