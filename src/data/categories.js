/**
 * Service categories. Shape mirrors the future Supabase `service_categories`
 * table so this file can be swapped for a Supabase query later without
 * touching consuming components.
 *
 * `icon` is a string key (not a component) so this file stays free of
 * UI/library imports — components map the key to an actual icon.
 */
export const categories = [
  {
    id: 'cat-electrical',
    name: 'Electrical',
    slug: 'electrical',
    description:
      'Repairs, installation, wiring, and maintenance for homes and businesses.',
    icon: 'Zap',
    fulfilled_by: 'in_house',
    active: true,
    sort_order: 1,
  },
  {
    id: 'cat-ac-services',
    name: 'AC Services',
    slug: 'ac-services',
    description:
      'AC servicing, repair, and installation, coordinated through our trusted technician network.',
    icon: 'Wind',
    fulfilled_by: 'trusted_network',
    active: true,
    sort_order: 2,
  },
]