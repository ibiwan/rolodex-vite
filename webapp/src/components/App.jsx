import { Box } from './Box.jsx'
import { Card } from './Card.jsx'
import { AddCard } from './AddCard.jsx'

import './App.css'
import { useApp } from './AppHook.js'

function App() {
  const {
    cardNames,
    hoveredCardId,
    hoveredThumbUrl,
    selectedId,

    refreshNames,
    setHoveredCardId,
    clearHoveredCardId,
    setSelectedId,
  } = useApp();

  return (
    <>
      <Box>
        <AddCard refreshNames={refreshNames} />
      </Box>

      {selectedId &&
        <Box> <Card /> </Box>
      }

      <Box onMouseLeave={() => clearHoveredCardId()} >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          {cardNames.map(({ name, _id }) => {
            return <div
              key={_id} id={_id}
              onMouseOver={() => setHoveredCardId(_id)}
              onClick={() => setSelectedId(_id)}
            >{name}</div>
          })}

          {hoveredThumbUrl &&
            <img
              onClick={() => setSelectedId(hoveredCardId)}
              src={hoveredThumbUrl} alt="" />
          }
        </div>
      </Box >
    </>
  )
}

export default App
