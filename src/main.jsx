import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

/*
  HashRouter uses the URL hash (#) for routing — e.g. /#/day/2026-06-01
  This is critical for GitHub Pages because it only serves index.html.
  Think of it like a single "endpoint" that reads the hash to decide what to render.
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
