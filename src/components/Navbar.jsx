import { Link } from "react-router-dom";
import "./Navbar.css" 

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">🎮 Insert Coin</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Videojuegos</Link>
          <Link to="/registrar-juego" className="navbar-link navbar-btn">Nuevo Videojuego</Link>
        </div>
      </div>
    </nav>
  );
};