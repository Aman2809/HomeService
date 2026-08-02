import { useSyncExternalStore, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { faqs } from '../data/faqs.js'
import { testimonials } from '../data/testimonials.js'

const bySortOrder = (a, b) => a.sort_order - b.sort_order

/**
 * Module-level shared catalogue store.
 *
 * Categories / services / service_options / service_areas are fetched
 * once from Supabase and shared across every component that calls
 * useServiceCatalogue() via useSyncExternalStore — no CatalogueContext,
 * no per-component fetch.
 *
 * The Supabase queries themselves now apply `active = true` and
 * `ORDER BY sort_order` server-side, so the rows landing in the store
 * are already the "active, sorted" set — no client-side re-filter/sort
 * needed on top, mirroring what the old useMemo derivation used to do
 * by hand.
 */
let store = {
  categories: [],
  services: [],
  serviceOptions: [],
  serviceAreas: [],
  loading: true,
  error: null,
}

const listeners = new Set()

// Guards against multiple components each triggering their own fetch.
// null = not started, a Promise = in flight/completed.
let fetchPromise = null

function setStore(partial) {
  // New object reference required — useSyncExternalStore compares
  // getSnapshot() output by reference to decide whether to re-render.
  store = { ...store, ...partial }
  listeners.forEach((listener) => listener())
}

function subscribe(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getSnapshot() {
  return store
}

function fetchCatalogueOnce() {
  if (fetchPromise) return fetchPromise

  fetchPromise = (async () => {
    try {
      const [categoriesRes, servicesRes, serviceOptionsRes, serviceAreasRes] =
        await Promise.all([
          supabase
            .from('service_categories')
            .select('*')
            .eq('active', true)
            .order('sort_order'),
          supabase
            .from('services')
            .select('*')
            .eq('active', true)
            .order('sort_order'),
          // service_options is intentionally NOT filtered to active-only
          // server-side here in the same fetch — see note below.
          supabase
            .from('service_options')
            .select('*')
            .eq('active', true)
            .order('sort_order'),
          supabase
            .from('service_areas')
            .select('*')
            .eq('active', true)
            .order('sort_order'),
        ])

      // Supabase JS v2 does not throw on query errors — it returns
      // { data, error } — so each response must be checked explicitly.
      const firstError =
        categoriesRes.error ||
        servicesRes.error ||
        serviceOptionsRes.error ||
        serviceAreasRes.error

      if (firstError) {
        throw firstError
      }

      setStore({
        categories: categoriesRes.data ?? [],
        services: servicesRes.data ?? [],
        serviceOptions: serviceOptionsRes.data ?? [],
        serviceAreas: serviceAreasRes.data ?? [],
        loading: false,
        error: null,
      })
    } catch (err) {
      setStore({
        loading: false,
        error: err,
      })
    }
  })()

  return fetchPromise
}

/**
 * Single access point for catalogue data (categories, services, options,
 * service areas, FAQs, testimonials).
 *
 * Categories / services / options / areas: fetched once from Supabase
 * (active-only, sort_order-ordered, server-side) and shared across all
 * callers via a module-level store.
 *
 * FAQs / testimonials: intentionally NOT part of this migration, still
 * read from local static data.
 *
 * Public return shape is unchanged from the pre-Supabase version so no
 * consuming component needs to change.
 */
export function useServiceCatalogue() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)

  // Side effect (network fetch) belongs in an effect, not during render.
  // fetchCatalogueOnce()'s internal fetchPromise guard means this is
  // still exactly one network round-trip per table no matter how many
  // components mount and run this effect.
  useEffect(() => {
    fetchCatalogueOnce()
  }, [])

  // FAQs/testimonials are local and small — filtering here on every
  // render is cheap and keeps this hook's internals simple; no memo
  // needed for correctness, matching how trivial this computation is.
  const activeFaqs = faqs.filter((f) => f.active).sort(bySortOrder)
  const activeTestimonials = testimonials.filter((t) => t.active)

  function getCategoryBySlug(slug) {
    return snapshot.categories.find((c) => c.slug === slug) ?? null
  }

  function getServicesByCategory(categorySlug) {
    const category = getCategoryBySlug(categorySlug)
    if (!category) return []
    return snapshot.services.filter((s) => s.category_id === category.id)
  }

  function getServiceBySlug(slug) {
    return snapshot.services.find((s) => s.slug === slug) ?? null
  }

  function getOptionsForService(serviceId) {
    return snapshot.serviceOptions.filter((opt) => opt.service_id === serviceId)
  }

  function getAreaBySlug(slug) {
    return snapshot.serviceAreas.find((a) => a.slug === slug) ?? null
  }

  function isAreaSupported(slug) {
    return snapshot.serviceAreas.some((a) => a.slug === slug)
  }

  function getFeaturedServices() {
    return snapshot.services.filter((s) => s.homepage_featured)
  }

  return {
    categories: snapshot.categories,
    services: snapshot.services,
    serviceAreas: snapshot.serviceAreas,
    faqs: activeFaqs,
    testimonials: activeTestimonials,

    getCategoryBySlug,
    getServicesByCategory,
    getServiceBySlug,
    getOptionsForService,
    getAreaBySlug,
    isAreaSupported,
    getFeaturedServices,

    loading: snapshot.loading,
    error: snapshot.error,
  }
}