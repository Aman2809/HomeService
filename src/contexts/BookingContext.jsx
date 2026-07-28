import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import { buildBasketItemId } from '../utils/basketItemId.js'
import {
  MIN_ITEM_QUANTITY,
  MAX_ITEM_QUANTITY,
  BASKET_STORAGE_KEY,
  BASKET_STORAGE_VERSION,
} from '../constants/basketConfig.js'

const BookingContext = createContext(null)

function clampQuantity(qty) {
  return Math.min(MAX_ITEM_QUANTITY, Math.max(MIN_ITEM_QUANTITY, qty))
}

function loadPersistedItems() {
  try {
    const raw = window.localStorage.getItem(BASKET_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (parsed?.version !== BASKET_STORAGE_VERSION || !Array.isArray(parsed.items)) {
      return []
    }
    return parsed.items
  } catch {
    return []
  }
}

const initialState = {
  items: loadPersistedItems(),
  // Reserved for later steps — not read/written by anything in Phase 1
  // Step 4, and never persisted to localStorage.
  location: null,
  customerDetails: null,
  schedule: null,
  currentStep: 'services',
}

function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { serviceId, serviceOptionId = null, quantity, snapshot } = action.payload
      const itemId = buildBasketItemId(serviceId, serviceOptionId)
      const existingIndex = state.items.findIndex((item) => item.itemId === itemId)

      if (existingIndex >= 0) {
        const updated = [...state.items]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: clampQuantity(updated[existingIndex].quantity + quantity),
        }
        return { ...state, items: updated }
      }

      return {
        ...state,
        items: [
          ...state.items,
          { itemId, serviceId, serviceOptionId, quantity: clampQuantity(quantity), snapshot },
        ],
      }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === itemId ? { ...item, quantity: clampQuantity(quantity) } : item,
        ),
      }
    }

    case 'UPDATE_ITEM_CONFIG': {
      const { itemId, serviceOptionId = null, quantity, snapshot } = action.payload
      const current = state.items.find((item) => item.itemId === itemId)
      if (!current) return state

      const newItemId = buildBasketItemId(current.serviceId, serviceOptionId)
      const clampedQuantity = clampQuantity(quantity)

      // Option unchanged (or service has no options) — update in place.
      if (newItemId === itemId) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.itemId === itemId
              ? { ...item, serviceOptionId, quantity: clampedQuantity, snapshot }
              : item,
          ),
        }
      }

      const withoutOld = state.items.filter((item) => item.itemId !== itemId)
      const collision = withoutOld.find((item) => item.itemId === newItemId)

      // New option collides with an existing row for that configuration
      // — merge quantities into it rather than keeping two rows.
      if (collision) {
        return {
          ...state,
          items: withoutOld.map((item) =>
            item.itemId === newItemId
              ? { ...item, quantity: clampQuantity(item.quantity + clampedQuantity), snapshot }
              : item,
          ),
        }
      }

      // New option is a genuinely different configuration — rename the row.
      return {
        ...state,
        items: [
          ...withoutOld,
          {
            itemId: newItemId,
            serviceId: current.serviceId,
            serviceOptionId,
            quantity: clampedQuantity,
            snapshot,
          },
        ],
      }
    }

    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter((item) => item.itemId !== action.payload.itemId) }
    }

    case 'CLEAR_BASKET': {
      return { ...state, items: [] }
    }

    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  useEffect(() => {
    try {
      window.localStorage.setItem(
        BASKET_STORAGE_KEY,
        JSON.stringify({ version: BASKET_STORAGE_VERSION, items: state.items }),
      )
    } catch {
      // localStorage may be unavailable (private browsing, quota) —
      // the basket still works fine in-memory for the session.
    }
  }, [state.items])

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  )

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
      updateQuantity: (itemId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } }),
      updateItemConfig: (payload) => dispatch({ type: 'UPDATE_ITEM_CONFIG', payload }),
      removeItem: (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: { itemId } }),
      clearBasket: () => dispatch({ type: 'CLEAR_BASKET' }),
    }),
    [state.items, itemCount],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}