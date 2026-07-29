import { Routes, Route } from 'react-router-dom'
import ComingSoon from '../pages/ComingSoon.jsx'
import Home from '../pages/Home.jsx'
import Services from '../pages/Services.jsx'
import ServiceDetails from '../pages/ServiceDetails.jsx'
import Booking from '../pages/Booking.jsx'
import About from '../pages/About.jsx'
import Areas from '../pages/Areas.jsx'
import Contact from '../pages/Contact.jsx'
import Privacy from '../pages/Privacy.jsx'
import Terms from '../pages/Terms.jsx'
import NotFound from '../pages/NotFound.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<ComingSoon title="Login" />} />
      <Route path="/signup" element={<ComingSoon title="Sign Up" />} />
      <Route path="/account" element={<ComingSoon title="My Account" />} />
      <Route path="/account/bookings" element={<ComingSoon title="My Bookings" />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}