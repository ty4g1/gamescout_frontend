import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import { CookiesProvider } from 'react-cookie';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </CookiesProvider>
  </StrictMode>,
)
