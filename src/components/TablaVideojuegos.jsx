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

      <div className="game-table-wrapper">
        <table className="game-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Lanzamiento</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Progreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              videojuegos.map((vid) => (
                <tr key={vid.id}>
                  <td data-label="Título" className="game-title">{vid.titulo}</td>
                  <td data-label="Género">{vid.genero}</td>
                  <td data-label="Plataforma"><span className="badge platform">{vid.plataforma}</span></td>
                  <td data-label="Lanzamiento">{vid.lanzamiento}</td>
                  <td data-label="Precio" className="game-price">${vid.precio}</td>
                  <td data-label="Disponibilidad">
                    <span className={`status ${vid.disponible ? 'in-stock' : 'out-of-stock'}`}>
                      {vid.disponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                  <td data-label="Progreso">
                    <BarraProgreso porcentaje={vid.progreso} />
                  </td>
                  <td data-label="Acciones">
                    <div className="action-buttons">
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
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
