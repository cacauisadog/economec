import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-2xl text-green-200">Economec</h1>
      <button onClick={() => setCount(prev => prev + 1)}>Clicked {count} times</button>
    </>
  )
}

export default App
