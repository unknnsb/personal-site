import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/Header.jsx'
import Works from './pages/Works.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<App />} />
      <Route path='/works' element={<Works />} />
    </Routes>
  </BrowserRouter>,
)
