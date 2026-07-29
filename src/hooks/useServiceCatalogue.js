import { useMemo } from 'react'
import { categories } from '../data/categories.js'
import { services } from '../data/services.js'
import { serviceOptions } from '../data/serviceOptions.js'
import { serviceAreas } from '../data/serviceAreas.js'
import { faqs } from '../data/faqs.js'
import { testimonials } from '../data/testimonials.js'

const bySortOrder = (a, b) => a.sort_order - b.sort_order

/**
 * Single access point for catalogue data (categories, services, options,
 * service areas, FAQs, testimonials).
 *
 * Phase 1: reads from local arrays in src/data/.
 * Phase 2: this hook's internals will be swapped for Supabase queries
 * (with real loading/error state) — the `loading`/`error` fields are
 * already part of the return shape so consuming components don't need
 * to change when that happens.
 */
export function useServiceCatalogue() {
  const activeCategories = useMemo(
    () => categories.filter((c) => c.active).sort(bySortOrder),
    [],
  )

  const activeServices = useMemo(
    () => services.filter((s) => s.active).sort(bySortOrder),
    [],
  )

  const activeServiceAreas = useMemo(
    () => serviceAreas.filter((a) => a.active).sort(bySortOrder),
    [],
  )

  const activeFaqs = useMemo(
    () => faqs.filter((f) => f.active).sort(bySortOrder),
    [],
  )

  const activeTestimonials = useMemo(
    () => testimonials.filter((t) => t.active),
    [],
  )

  function getCategoryBySlug(slug) {
    return activeCategories.find((c) => c.slug === slug) ?? null
  }

  function getServicesByCategory(categorySlug) {
    const category = getCategoryBySlug(categorySlug)
    if (!category) return []
    return activeServices
      .filter((s) => s.category_id === category.id)
      .sort(bySortOrder)
  }

  function getServiceBySlug(slug) {
    return activeServices.find((s) => s.slug === slug) ?? null
  }

  function getOptionsForService(serviceId) {
    return serviceOptions
      .filter((opt) => opt.service_id === serviceId && opt.active)
      .sort(bySortOrder)
  }

  function getAreaBySlug(slug) {
    return activeServiceAreas.find((a) => a.slug === slug) ?? null
  }

  function isAreaSupported(slug) {
    return activeServiceAreas.some((a) => a.slug === slug)
  }

  function getFeaturedServices() {
  return activeServices.filter((s) => s.homepage_featured)
}

  return {
    categories: activeCategories,
    services: activeServices,
    serviceAreas: activeServiceAreas,
    faqs: activeFaqs,
    testimonials: activeTestimonials,

    getCategoryBySlug,
    getServicesByCategory,
    getServiceBySlug,
    getOptionsForService,
    getAreaBySlug,
    isAreaSupported,
    getFeaturedServices,

    // Placeholder for Phase 2 — always false/null locally, real values
    // once this hook fetches from Supabase.
    loading: false,
    error: null,
  }
}