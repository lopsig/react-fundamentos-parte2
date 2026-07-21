import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import "./FormularioVideojuego.css"

export const FormularioVideojuego = ({ onGuardar }) => {
  //# CONSTANTES GLOBALES  
  const location = useLocation();
  const navigate = useNavigate();
  const videojuegoRecuperado = location.state?.videojuego || null
  const hoy = new Date().toISOString().split("T")[0]

  //# ESTADOS
  const [titulo, setTitulo] = useState("")
  const [genero, setGenero] = useState("")
  const [plataforma, setPlataforma] = useState("")
  const [lanzamiento, setLanzamiento] = useState("")
  const [precio, setPrecio] = useState("")
  const [disponible, setDisponible] = useState(true)
  const [progreso, setProgreso] = useState(0.0)
  const [sinopsis, setSinopsis] = useState("")
  const [calificacion, setCalificacion] = useState("")

  //# EFECTO
  useEffect(() => {
    if (videojuegoRecuperado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitulo(videojuegoRecuperado.titulo)
      setGenero(videojuegoRecuperado.genero)
      setPlataforma(videojuegoRecuperado.plataforma)
      setLanzamiento(videojuegoRecuperado.lanzamiento)
      setPrecio(videojuegoRecuperado.precio)
      setDisponible(videojuegoRecuperado.disponible)
      setProgreso(videojuegoRecuperado.progreso)
      setSinopsis(videojuegoRecuperado.sinopsis)
      setCalificacion(videojuegoRecuperado.calificacion)
    } else {
      setTitulo("")
      setGenero("")
      setPlataforma("PlayStation")
      setLanzamiento("")
      setPrecio("")
      setDisponible(true)
      setProgreso(0)
      setSinopsis("")
      setCalificacion("")
    }
  
  }, [videojuegoRecuperado])
  

  //# MANEJAR GUARDAR
  const manejarGuardar = () => {
    const videojuego = {
      id: videojuegoRecuperado?.id ? videojuegoRecuperado.id : Date.now(),
      titulo: titulo,
      genero: genero,
      plataforma: plataforma,
      lanzamiento: lanzamiento,
      precio: precio,
      disponible: disponible,
      progreso: progreso,
      sinopsis: sinopsis,
      calificacion : Number(calificacion)
    }

    onGuardar(videojuego)
    navigate("/")
  }
  
  //# MANEJAR CANCELAR
  const manejarCancelar = () => {
    navigate("/")
  }

  return (
    <div className="form-container">
      <h2 className="form-title">
        {videojuegoRecuperado ? "Editar Videojuego" : "Registrar Juego"}
      </h2>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Género</label>
        <input
          type="text"
          className="form-control"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Plataforma</label>
        <select
          className="form-control"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
        >
          <option value="PlayStation">PlayStation</option>
          <option value="PlayStation 2">PlayStation 2</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="Xbox360">Xbox 360</option>
          <option value="PC">PC</option>
        </select>
      </div>

      <div className="form-group">
        <label>Fecha de Lanzamiento</label>
        <input
          type="date"
          className="form-control"
          max={hoy}
          value={lanzamiento}
          onChange={(e) => setLanzamiento(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Sinopsis</label>
        <textarea
          className="form-control"
          minLength={10}
          maxLength={250}
          placeholder="Escribe una breve reseña (10 - 250 caracteres)..."
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
        ></textarea>
      </div>

      <div className="form-group">
        <label>Calificación (1 - 100)</label>
        <input
          type="text"
          className="form-control"
          min={1}
          max={100}
          placeholder="Ej: 85"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
          ¿Disponible en stock?
        </label>
      </div>

      <div className="form-group">
        <label>Progreso (%)</label>
        <input
          type="text"
          className="form-control"
          value={progreso}
          onChange={(e) => setProgreso(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-save" onClick={manejarGuardar}>Guardar</button>
        <button className="btn btn-cancel" onClick={manejarCancelar}>Cancelar</button>
      </div>
    </div>
  )
}