import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SingleUserContext } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SingleUserContext>
    <App />
  </SingleUserContext>
  </BrowserRouter>

)
