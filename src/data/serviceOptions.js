/**
 * Configurable options per service. Not every service has options —
 * services without options are configured with quantity alone, and the
 * generic ServiceOptionModal (Step 5) will read this data to decide
 * whether an options step is needed at all, rather than special-casing
 * any specific service.
 *
 * `price_adjustment` is left null everywhere (no real pricing finalized
 * yet) but is supported by the shape for later use.
 */
export const serviceOptions = [
  // Switch Board Repair
  { id: 'opt-sbr-1-2', service_id: 'svc-switch-board-repair', name: '1–2 switches', description: null, price_adjustment: null, active: true, sort_order: 1 },
  { id: 'opt-sbr-3-4', service_id: 'svc-switch-board-repair', name: '3–4 switches', description: null, price_adjustment: null, active: true, sort_order: 2 },
  { id: 'opt-sbr-5-6', service_id: 'svc-switch-board-repair', name: '5–6 switches', description: null, price_adjustment: null, active: true, sort_order: 3 },
  { id: 'opt-sbr-7-8', service_id: 'svc-switch-board-repair', name: '7–8 switches', description: null, price_adjustment: null, active: true, sort_order: 4 },
  { id: 'opt-sbr-8-plus', service_id: 'svc-switch-board-repair', name: 'More than 8', description: null, price_adjustment: null, active: true, sort_order: 5 },

  // Switch Board Replacement
  { id: 'opt-sbx-1-2', service_id: 'svc-switch-board-replacement', name: '1–2 switches', description: null, price_adjustment: null, active: true, sort_order: 1 },
  { id: 'opt-sbx-3-4', service_id: 'svc-switch-board-replacement', name: '3–4 switches', description: null, price_adjustment: null, active: true, sort_order: 2 },
  { id: 'opt-sbx-5-6', service_id: 'svc-switch-board-replacement', name: '5–6 switches', description: null, price_adjustment: null, active: true, sort_order: 3 },
  { id: 'opt-sbx-7-8', service_id: 'svc-switch-board-replacement', name: '7–8 switches', description: null, price_adjustment: null, active: true, sort_order: 4 },
  { id: 'opt-sbx-8-plus', service_id: 'svc-switch-board-replacement', name: 'More than 8', description: null, price_adjustment: null, active: true, sort_order: 5 },

  // Fan Repair
  { id: 'opt-fr-ceiling', service_id: 'svc-fan-repair', name: 'Ceiling Fan', description: null, price_adjustment: null, active: true, sort_order: 1 },
  { id: 'opt-fr-wall', service_id: 'svc-fan-repair', name: 'Wall Fan', description: null, price_adjustment: null, active: true, sort_order: 2 },
  { id: 'opt-fr-exhaust', service_id: 'svc-fan-repair', name: 'Exhaust Fan', description: null, price_adjustment: null, active: true, sort_order: 3 },
  { id: 'opt-fr-pedestal', service_id: 'svc-fan-repair', name: 'Pedestal Fan', description: null, price_adjustment: null, active: true, sort_order: 4 },

  // Fan Installation
  { id: 'opt-fi-ceiling', service_id: 'svc-fan-installation', name: 'Ceiling Fan', description: null, price_adjustment: null, active: true, sort_order: 1 },
  { id: 'opt-fi-wall', service_id: 'svc-fan-installation', name: 'Wall Fan', description: null, price_adjustment: null, active: true, sort_order: 2 },
  { id: 'opt-fi-exhaust', service_id: 'svc-fan-installation', name: 'Exhaust Fan', description: null, price_adjustment: null, active: true, sort_order: 3 },
  { id: 'opt-fi-pedestal', service_id: 'svc-fan-installation', name: 'Pedestal Fan', description: null, price_adjustment: null, active: true, sort_order: 4 },
]