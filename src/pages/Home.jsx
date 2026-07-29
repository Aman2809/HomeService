import Hero from '../components/home/Hero.jsx'
import TrustIndicators from '../components/home/TrustIndicators.jsx'
import ServiceCategories from '../components/home/ServiceCategories.jsx'
import PopularServices from '../components/home/PopularServices.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import AreasServedPreview from '../components/home/AreasServedPreview.jsx'
import AboutPreview from '../components/home/AboutPreview.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import FaqPreview from '../components/home/FaqPreview.jsx'
import FinalCta from '../components/home/FinalCta.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Home() {
  useDocumentTitle(null)
  return (
    <div>
      <Hero />
      <TrustIndicators />
      <ServiceCategories />
      <PopularServices />
      <HowItWorks />
      <WhyChooseUs />
      <AreasServedPreview />
      <AboutPreview />
      <TestimonialsSection />
      <FaqPreview />
      <FinalCta />
    </div>
  )
}