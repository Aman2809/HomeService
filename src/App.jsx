import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import StickyMobileCTA from './components/layout/StickyMobileCTA.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only-focusable">
        Skip to content
      </a>

      <Navbar />

      {/* pb-20 reserves space above the sticky mobile CTA bar */}
      <main id="main-content" className="flex-1 pb-20 lg:pb-0">
        <AppRoutes />
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  )
}