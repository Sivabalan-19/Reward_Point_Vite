import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="817763532692-mepg5s5h15m5vevuj9369nqtkqgc266f.apps.googleusercontent.com">

  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>,
)
