import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'

import Works from './pages/Works.jsx'
import NotFound from './pages/404.jsx'
import Journal from './pages/Journal.jsx'
import Entry from './pages/Entry.jsx'
import Review from './pages/Review.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'

function Layout({ children }) {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/journal/') || location.pathname.startsWith('/review/');

  return (
    <div className="app-shell">
      {!hideHeader && <Header />}
      <main className="app-main">{children}</main>
      <MusicPlayer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<App />} />
          <Route path="/works" element={<Works />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<Entry />} />
          <Route path="/review/:slug" element={<Review />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)

