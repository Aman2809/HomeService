import { Routes, Route } from 'react-router-dom'
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
import Login from '../pages/Auth/Login.jsx'
import Signup from '../pages/Auth/Signup.jsx'
import ForgotPassword from '../pages/Auth/ForgotPassword.jsx'
import ResetPassword from '../pages/Auth/ResetPassword.jsx'
import Account from '../pages/Account/Account.jsx'
import AccountBookings from '../pages/Account/AccountBookings.jsx'
import ProtectedRoute from '../components/routing/ProtectedRoute.jsx'
import AdminLogin from '../pages/Admin/AdminLogin.jsx'
import AdminDashboard from '../pages/Admin/AdminDashboard.jsx'
import AdminRequests from '../pages/Admin/AdminRequests.jsx'
import AdminRequestDetail from '../pages/Admin/AdminRequestDetail.jsx'
import AdminProtectedRoute from '../components/routing/AdminProtectedRoute.jsx'

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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/bookings"
        element={
          <ProtectedRoute>
            <AccountBookings />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <AdminProtectedRoute>
            <AdminRequests />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/requests/:id"
        element={
          <AdminProtectedRoute>
            <AdminRequestDetail />
          </AdminProtectedRoute>
        }
      />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}