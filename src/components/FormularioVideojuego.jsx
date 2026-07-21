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
  const [errores, setErrores] = useState({})

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

  //# VALIDACIONES DE FORMULARIO
  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio"
    }
    const numCalificacion = Number(calificacion)
    if (!calificacion || isNaN(numCalificacion) || numCalificacion < 1 || numCalificacion > 100) {
      nuevosErrores.calificacion = "La calificación debe ser un número estrictamente entre 1 y 100.";
    }
    if (sinopsis.trim().length < 10) {
      nuevosErrores.sinopsis = "La sinopsis debe tener al menos 10 caracteres."
    }
    if (!genero.trim()) {
      nuevosErrores.genero = "El género es obligatorio.";
    }
    if (!lanzamiento) {
      nuevosErrores.lanzamiento = "La fecha de lanzamiento es obligatoria.";
    } else if (lanzamiento > hoy) {
      nuevosErrores.lanzamiento = "La fecha no puede ser futura.";
    }
    const numPrecio = Number(precio);
    if (precio === "" || isNaN(numPrecio) || numPrecio < 0) {
      nuevosErrores.precio = "El precio debe ser un número válido mayor o igual a 0.";
    }
    const numProgreso = Number(progreso);
    if (progreso === "" || isNaN(numProgreso) || numProgreso < 0 || numProgreso > 100) {
      nuevosErrores.progreso = "El progreso debe ser un porcentaje entre 0 y 100.";
    }


    return nuevosErrores
  }
  

  //# MANEJAR GUARDAR
  const manejarGuardar = (e) => {
    e.preventDefault()
    
    const erroresActivos = validarFormulario()

    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos)
      return
    }

    setErrores({})
    
    const videojuego = {
      id: videojuegoRecuperado?.id ? videojuegoRecuperado.id : Date.now(),
      titulo: titulo.trim(),
      genero: genero.trim(),
      plataforma: plataforma,
      lanzamiento: lanzamiento,
      precio: Number(precio),
      disponible: disponible,
      progreso: Number(progreso),
      sinopsis: sinopsis.trim(),
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
    <form className="form-container" onSubmit={manejarGuardar}>
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
        {errores.titulo && <span className="error-mensaje">{ errores.titulo }</span>}
      </div>

      <div className="form-group">
        <label>Género</label>
        <input
          type="text"
          className="form-control"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        {errores.genero && <span className="error-mensaje">{errores.genero}</span>}
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
        {errores.lanzamiento && <span className="error-mensaje">{errores.lanzamiento}</span>}
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
        {errores.sinopsis && <span className="error-mensaje">{ errores.sinopsis}</span>}
      </div>

      <div className="form-group">
        <label>Calificación (1 - 100)</label>
        <input
          type="number"
          className="form-control"
          min={1}
          max={100}
          placeholder="Ej: 85"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        />
        {errores.calificacion && <span className="error-mensaje">{ errores.calificacion}</span>}
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
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
        {errores.progreso && <span className="error-mensaje">{errores.progreso}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-save" >Guardar</button>
        <button type="button" className="btn btn-cancel" onClick={manejarCancelar}>Cancelar</button>
      </div>
    </form>
  )
}