import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/Header.jsx'
import Works from './pages/Works.jsx'
import NotFound from './pages/404.jsx'
import Journal from './pages/Journal.jsx'
import Entry from './pages/Entry.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<App />} />
      <Route path='/works' element={<Works />} />
      <Route path='*' element={<NotFound />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/:slug" element={<Entry />} />
    </Routes>
  </BrowserRouter>,
)
