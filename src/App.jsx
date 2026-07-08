
import './App.css'
import { TablaVideojuegos } from './components/TablaVideojuegos.jsx'
import { data } from './data/videojuegos.js'

function App() {
  
  return (
    <>
      <TablaVideojuegos videojuegos={data} />
    </>
  )
}

export default App
