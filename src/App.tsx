import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Economec</h1>
      <button onClick={() => setCount(prev => prev + 1)}>Clicked {count} times</button>
    </>
  )
}

export default App
