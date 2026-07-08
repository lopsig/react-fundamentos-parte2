import "./BarraProgreso.css"

export const BarraProgreso = ({ porcentaje }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
      <span className="progress-text">{porcentaje}%</span>
    </div>
  )
}