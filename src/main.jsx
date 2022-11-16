import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-qrzvkyi8.us.auth0.com"
    clientId="ISrY48656nXRgX0Imjy1xpnOtuCtsIGJ"
    redirectUri={'http://localhost:5173'}
    >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
)
