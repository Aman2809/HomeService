/**
 * Service areas. Fully data-driven per requirement #29 — adding a new
 * South Kolkata locality (or a new region later) means adding an entry
 * here, nothing else in the codebase should need to change.
 */
export const serviceAreas = [
  { id: 'area-alipore', name: 'Alipore', slug: 'alipore', active: true, sort_order: 1 },
  { id: 'area-tollygunge', name: 'Tollygunge', slug: 'tollygunge', active: true, sort_order: 2 },
]