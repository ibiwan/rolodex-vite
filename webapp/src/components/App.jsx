import { useEffect, useState } from 'react'

import { getCardNames } from '../services/api.js'

import { AddUrl } from './AddUrl.jsx'
import { AddImage } from './AddImage.jsx'
import { Box } from './Box.jsx'
import { Card } from './Card.jsx'

import './App.css'

function App() {
  const [cardNames, setCardNames] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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
      <Box>
        <AddImage refreshNames={refreshNames} />
      </Box>

      <Box>
        <AddUrl refreshNames={refreshNames} />
      </Box>

      <Box>
        <Card _id={selectedId} />
      </Box>

      <Box>
        {cardNames.map(({ name, _id }) => {
          return <div id={_id} onClick={() => setSelectedId(_id)}>{name}</div>
        })}
      </Box>
    </>
  )
}

export default App
