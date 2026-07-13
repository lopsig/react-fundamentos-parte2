import { Link } from "react-router-dom";
import "./PaginaNoEncontrada.css";

export const PaginaNoEncontrada = () => {
  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">PÁGINA NO ENCONTRADA</h2>
        <p className="error-message">
          ¡UPGRADE REQUERIDO! El nivel que estás intentando cargar no existe o ha sido eliminado.
        </p>
        <div className="error-actions">
          <Link to="/" className="btn-home">
            🕹️ Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}