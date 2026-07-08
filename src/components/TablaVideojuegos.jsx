import "./TablaVideojuegos.css"

export const TablaVideojuegos = ({ videojuegos }) => {
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
                  <td data-label="Progreso">{vid.progreso}%</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
