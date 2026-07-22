import "./TablaVideojuegos.css"
import { BarraProgreso } from "./BarraProgreso"
import { useNavigate } from "react-router-dom"

export const TablaVideojuegos = ({ videojuegos, onEliminar }) => {
  
  const navigate = useNavigate();
  const manejarEditar = (vid) => {
    navigate("/editar-juego",{state: {videojuego : vid}})
  }
  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Insert Coin</h1>
        <div className="game-subtitle">
          <h2>Tus clásicos favoritos, en un solo lugar.</h2>
        </div>
      </div>

      {/* Grid de Tarjetas */}
      <div className="game-cards-grid">
        {videojuegos.map((vid) => (
          <div className="game-card" key={vid.id}>

            {/* Encabezado de la Tarjeta */}
            <div className="card-header">
              <span className="badge platform">{vid.plataforma}</span>
              <span className={`status ${vid.disponible ? 'in-stock' : 'out-of-stock'}`}>
                {vid.disponible ? 'Disponible' : 'Agotado'}
              </span>
            </div>

            {/* Contenido Principal */}
            <div className="card-body">
              <h3 className="game-title">{vid.titulo}</h3>
              <p className="game-genre">🎮 {vid.genero}</p>
              <p className="game-synopsis">{vid.sinopsis}</p>
            </div>

            {/* Detalles (Lanzamiento, Precio y Calificación) */}
            <div className="card-details">
              <div className="detail-item">
                <span className="detail-label">Lanzamiento</span>
                <span className="detail-value">{vid.lanzamiento}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Calificación</span>
                <span className="detail-value score">⭐ {vid.calificacion}/100</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Precio</span>
                <span className="detail-value game-price">${vid.precio}</span>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="card-progress">
              <span className="detail-label">Progreso del Juego</span>
              <BarraProgreso porcentaje={vid.progreso} />
            </div>

            {/* Acciones */}
            <div className="card-actions">
              <button
                className="btn-action btn-edit"
                onClick={() => manejarEditar(vid)}
              >
                🕹️ Editar
              </button>
              <button
                className="btn-action btn-delete"
                onClick={() => onEliminar(vid.id)}
              >
                💥 Eliminar
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}