import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import LeagueOverview from "./pages/LeagueOverview";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/"> Home </Link>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/leagueOverview/:leagueId" Component={LeagueOverview} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
