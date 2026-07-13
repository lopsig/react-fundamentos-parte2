
import { useState } from 'react'
import './App.css'
import { TablaVideojuegos } from './components/TablaVideojuegos.jsx'
import { data } from './data/videojuegos.js'
import { FormularioVideojuego } from './components/FormularioVideojuego.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { PaginaNoEncontrada} from './components/PaginaNoEncontrada.jsx'

function App() {
  const [videojuegos, setVideojuegos] = useState(data)
  
  //# FUNCION NUEVO VIDEOJUEGO
  const agregarVideojuego = (nuevoVideojuego) => {
    setVideojuegos([...videojuegos, nuevoVideojuego])
  }

  //# FUNCION ELIMINAR VIDEOJUEGO
  const eliminarVideojuego = (id) => {
    const videojuegosFiltrados = videojuegos.filter((vid) => vid.id !== id)
    setVideojuegos(videojuegosFiltrados)
  }

  //# FUNCION EDITAR VIDEOJUEGO
  const editarVideojuego = (videojuegoEditado) => {
    const videojuegoActual = videojuegos.map((vid) => {
      if (vid.id === videojuegoEditado.id) {
        return videojuegoEditado
      } else {
        return vid
      }
    })
    setVideojuegos(videojuegoActual)
  }

  //# FUNCION GUARDAR
  const manejarGuardar = (videojuego) => {
    const exist = videojuegos.find((vid) => vid.id === videojuego.id)
    
    if (exist) {
      editarVideojuego(videojuego)
    } else {
      agregarVideojuego(videojuego)
    }
  } 

  //! REVISAR PORQUE SE LLAMA AQUI AL FORMULARIO
  <FormularioVideojuego />



  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <TablaVideojuegos
              videojuegos={videojuegos}
              onEliminar={eliminarVideojuego}
            />
          }
        />
        <Route
          path='/registrar-juego'
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />
        <Route
          path='/editar-juego'
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />
        <Route
          path='/*'
          element={
            <PaginaNoEncontrada/>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App


