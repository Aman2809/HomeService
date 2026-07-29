import { Link } from 'react-router-dom'
import { businessConfig } from '../../constants/businessConfig.js'

export default function AboutPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <span className="inline-block rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-semibold text-gold-700">
          {businessConfig.experienceYears}+ Years of Hands-On Experience
        </span>
        <h2 className="mt-4 text-2xl font-bold text-navy-950 sm:text-3xl">
          Backed by Real Electrical Experience
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-navy-700">
          Our service is built on {businessConfig.experienceYears}+ years of hands-on experience in
          electrical installation, repair, troubleshooting, and maintenance — across both
          residential and commercial settings.
        </p>
        <Link
          to="/about"
          className="mt-6 inline-block rounded-full border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-950/5"
        >
          Know More About Us
        </Link>
      </div>
    </section>
  )
}