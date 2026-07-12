import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export const FormularioVideojuego = ({ onGuardar }) => {
  //# CONSTANTES GLOBALES  
  const location = useLocation();
  const navigate = useNavigate();
  const videojuegoRecuperado = location.state?.videojuego || null

  //# ESTADOS
  const [titulo, setTitulo] = useState("")
  const [genero, setGenero] = useState("")
  const [plataforma, setPlataforma] = useState("")
  const [lanzamiento, setLanzamiento] = useState("")
  const [precio, setPrecio] = useState("")
  const [disponibilidad, setDisponibilidad] = useState(true)
  const [progreso, setProgreso] = useState(0.0)

  //# EFECTO
  useEffect(() => {
    if (videojuegoRecuperado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitulo(videojuegoRecuperado.titulo)
      setGenero(videojuegoRecuperado.genero)
      setPlataforma(videojuegoRecuperado.plataforma)
      setLanzamiento(videojuegoRecuperado.lanzamiento)
      setPrecio(videojuegoRecuperado.precio)
      setDisponibilidad(videojuegoRecuperado.disponibilidad)
      setProgreso(videojuegoRecuperado.progreso)
    } else {
      setTitulo("")
      setGenero("")
      setPlataforma("")
      setLanzamiento("")
      setPrecio("")
      setDisponibilidad("")
      setProgreso("")
    }
  
  }, [videojuegoRecuperado])
  

  //# MANEJAR GUARDAR
  const manejarGuardar = () => {
    const videojuego = {
      id: videojuegoRecuperado !== null && videojuegoRecuperado !== undefined ? videojuegoRecuperado.id : Date.now(),
      titulo: titulo,
      genero: genero,
      plataforma: plataforma,
      lanzamiento: lanzamiento,
      precio: precio,
      disponibilidad: disponibilidad,
      progreso: progreso
    }

    onGuardar(videojuego)
    navigate("/")
  }
  
  //# MANEJAR CANCELAR
  const manejarCancelar = () => {
    navigate("/")
  }

  return (
    <div>
      <label>Titulo</label>
      <input
        type="text"
        value={titulo}
        onChange={(e)=> setTitulo(e.target.value)}
      />
      <label>Género</label>
      <input
        type="text"
        value={genero}
        onChange={(e)=> setGenero(e.target.value)}
      />
      <label>
        Plataforma:
        <select
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
      </label>
      <label>Lanzamiento</label>
      <input
        type="text"
        value={lanzamiento}
        onChange={(e) => setLanzamiento(e.target.value)}
      />
      <label>Precio</label>
      <input
        type="text"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <label>
        Disponible?: <input type="checkbox" checked={disponibilidad} onChange={(e) => setDisponibilidad(e.target.checked)} />
      </label>
      <label>Progreso</label>
      <input
        type="text"
        value={progreso}
        onChange={(e) => setProgreso(e.target.value)}
      />

      <button onClick={manejarGuardar}> Guardar</button>
      <button onClick={manejarCancelar}> Cancelar</button>

    </div>
  )

}