import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import PlayerDetails from "./pages/PlayerDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/"> Home </Link>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/PlayerDetails" element={<PlayerDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
