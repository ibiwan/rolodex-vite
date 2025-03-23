import { Box } from '../Box.jsx'
import { Card } from '../Card.jsx'
import { AddCard } from '../add-card/AddCard.jsx'

import './App.css'
import { useApp } from './AppHook.js'

export function App() {
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

  const handleCardSelectClick = (evt) => {
    setSelectedId(hoveredCardId);
    evt.stopPropagation();
  }

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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cardNames.map(({ name, _id }) => {
              return <div
                key={_id} id={_id}
                onMouseOver={() => setHoveredCardId(_id)}
                onClick={handleCardSelectClick}
              >{name}</div>
            })}
          </div>

          {hoveredThumbUrl &&
            <img
              onClick={handleCardSelectClick}
              src={hoveredThumbUrl} alt="" />
          }
        </div>
      </Box >
    </>
  )
}
