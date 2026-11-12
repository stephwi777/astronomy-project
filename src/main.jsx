import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/reset.css'
import './styles/theme.css'
import { PlaceProvider } from './place/PlaceContext.jsx'
import App from './App.jsx'



// RENDER

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <PlaceProvider>
      <App />
    </PlaceProvider>
  </BrowserRouter>
)
