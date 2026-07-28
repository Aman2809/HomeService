import { useLocation } from 'react-router-dom'
import { BookingProvider } from './contexts/BookingContext.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import StickyMobileCTA from './components/layout/StickyMobileCTA.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

export default function App() {
  const location = useLocation()
  const hideStickyCTA = location.pathname.startsWith('/book')

  return (
    <BookingProvider>
      <div className="flex min-h-screen flex-col">
        <a href="#main-content" className="sr-only-focusable">
          Skip to content
        </a>

        <Navbar />

        <main id="main-content" className={hideStickyCTA ? 'flex-1' : 'flex-1 pb-20 lg:pb-0'}>
          <AppRoutes />
        </main>

        <Footer />
        {!hideStickyCTA && <StickyMobileCTA />}
      </div>
    </BookingProvider>
  )
}