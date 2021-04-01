import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import UserDashboard from "./components/UserDashboard";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  toast.configure();

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route exact path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/user/:id">
              <UserDashboard />
            </Route>
            <Route>
              <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem" }}>
                Page Not Found
            </div>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
