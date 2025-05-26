import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pokedex from './components/Pokedex.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pokedex />
  </StrictMode>,
)
