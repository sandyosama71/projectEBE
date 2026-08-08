import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "./theme/ThemeContext";
createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
 </ThemeProvider>

)
