import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { AuthProvider } from './providers/AuthProvider' // Import your provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap App here */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)