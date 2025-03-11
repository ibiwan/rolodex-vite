import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AddUrl } from './AddUrl.jsx'
import { getCardNames } from '../services/api'


function App() {
  const [count, setCount] = useState(0)
  const [cardNames, setCardNames] = useState([]);

  const refreshNames = async () => {
    console.log('getting names...');
    const response = await getCardNames();
    console.log({ response })
    setCardNames(response);
  }
  
  useEffect(() => {
    refreshNames();
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <AddUrl refreshNames={refreshNames} />
      {cardNames.map(({ name, _id }) => {
        return <div id={_id}>{name}</div>
      })}
    </>
  )
}

export default App
