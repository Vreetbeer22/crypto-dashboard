import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./Home.jsx";
import Favorites from "./Favorites.jsx";
import CoinDetail from "./functions/CoinDetail.jsx";
 
function App() {
  return (
    <>
      <header className="header">
        <span className="header-title">CoinDesk</span>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
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