
import { useState } from 'react'
import './App.css'
import { TablaVideojuegos } from './components/TablaVideojuegos.jsx'
import { data } from './data/videojuegos.js'

function App() {
  const [videojuegos] = useState (data)
  
  return (
    <>
      <TablaVideojuegos videojuegos={videojuegos} />
    </>
  )
}

export default App


