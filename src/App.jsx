import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home.jsx";
import Favorites from "./Favorites.jsx";
import CoinDetail from "./CoinDetail.jsx";

function App() {
  return (
    <>
      <header className="header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Favorites">Favorites</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </>
  );
}

export default App;