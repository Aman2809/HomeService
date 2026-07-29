import { Award, Building2, MapPin, Users } from 'lucide-react'
import { businessConfig } from '../../constants/businessConfig.js'

const INDICATORS = [
  { icon: Award, label: `${businessConfig.experienceYears}+ Years Experience` },
  { icon: Building2, label: 'Residential & Commercial' },
  { icon: MapPin, label: `${businessConfig.serviceRegion} Service` },
  { icon: Users, label: 'Trusted Technician Network' },
]

export default function TrustIndicators() {
  return (
    <section className="border-b border-navy-950/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INDICATORS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-medium text-navy-900">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}