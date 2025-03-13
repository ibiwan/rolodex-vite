import { useEffect, useState } from 'react'

import { getCardNames } from '../services/api.js'

import { Box } from './Box.jsx'
import { Card } from './Card.jsx'

import './App.css'
import { AddCard } from './AddCard.jsx'

function App() {
  const [cardNames, setCardNames] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const refreshNames = async () => {
    const response = await getCardNames();
    setCardNames(response);
  }

  useEffect(() => {
    refreshNames();
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.key === 'Escape'){
        setSelectedId(null);
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Box>
        <AddCard refreshNames={refreshNames} />
      </Box>

      <Box>
        <Card _id={selectedId} />
      </Box>

      <Box>
        {cardNames.map(({ name, _id }) => {
          return <div key={_id} id={_id} onClick={() => setSelectedId(_id)}>{name}</div>
        })}
      </Box>
    </>
  )
}

export default App
