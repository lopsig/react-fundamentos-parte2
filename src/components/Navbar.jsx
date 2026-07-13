import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to = "/">VideoJuegos</Link>
        <Link to = "/registrar-juego">Nuevo VideoJuego</Link>
      </div>
    </nav>
  )
}