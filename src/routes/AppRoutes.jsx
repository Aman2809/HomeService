import { Routes, Route } from 'react-router-dom'
import ComingSoon from '../pages/ComingSoon.jsx'
import Services from '../pages/Services.jsx'
import ServiceDetails from '../pages/ServiceDetails.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon title="Home" />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/book" element={<ComingSoon title="Book a Service" />} />
      <Route path="/about" element={<ComingSoon title="About" />} />
      <Route path="/areas" element={<ComingSoon title="Areas We Serve" />} />
      <Route path="/contact" element={<ComingSoon title="Contact" />} />
      <Route path="/login" element={<ComingSoon title="Login" />} />
      <Route path="/signup" element={<ComingSoon title="Sign Up" />} />
      <Route path="/account" element={<ComingSoon title="My Account" />} />
      <Route path="/account/bookings" element={<ComingSoon title="My Bookings" />} />
      <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
      <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />
      <Route path="*" element={<ComingSoon title="404 — Page Not Found" />} />
    </Routes>
  )
}