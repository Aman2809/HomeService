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

// Personal/location/schedule data — NEVER persisted to localStorage.
// Only `items` (the basket) is persisted, unchanged from Step 4.
const DEFAULT_LOCATION = { areaId: null, address: '', landmark: '' }
const DEFAULT_CUSTOMER_DETAILS = { fullName: '', phone: '', email: '', description: '' }
const DEFAULT_SCHEDULE = { preferredDate: '', timeSlotId: null }
const DEFAULT_SUBMISSION = { status: 'idle', error: null, result: null }

const initialState = {
  items: loadPersistedItems(),
  location: { ...DEFAULT_LOCATION },
  customerDetails: { ...DEFAULT_CUSTOMER_DETAILS },
  schedule: { ...DEFAULT_SCHEDULE },
  currentStep: 'services',
  submission: { ...DEFAULT_SUBMISSION },
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

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.itemId !== action.payload.itemId) }

    case 'CLEAR_BASKET':
      return { ...state, items: [] }

    case 'SET_LOCATION':
      return { ...state, location: { ...state.location, ...action.payload } }

    case 'SET_CUSTOMER_DETAILS':
      return { ...state, customerDetails: { ...state.customerDetails, ...action.payload } }

    case 'SET_SCHEDULE':
      return { ...state, schedule: { ...state.schedule, ...action.payload } }

    case 'SET_STEP':
      return { ...state, currentStep: action.payload.step }

    case 'SUBMIT_START':
      return { ...state, submission: { status: 'submitting', error: null, result: null } }

    // Success clears the active booking data in the same atomic
    // transition — the submitted result lives only in `submission`,
    // so clearing items/location/customerDetails/schedule here cannot
    // affect what the success screen renders.
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        items: [],
        location: { ...DEFAULT_LOCATION },
        customerDetails: { ...DEFAULT_CUSTOMER_DETAILS },
        schedule: { ...DEFAULT_SCHEDULE },
        currentStep: 'services',
        submission: { status: 'success', error: null, result: action.payload.result },
      }

    case 'SUBMIT_ERROR':
      return { ...state, submission: { status: 'error', error: action.payload.error, result: null } }

    case 'SUBMIT_RESET':
      return { ...state, submission: { ...DEFAULT_SUBMISSION } }

    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  // Only `items` is written to localStorage — this also fires (and
  // correctly clears the stored basket) whenever SUBMIT_SUCCESS empties
  // `items`, satisfying "clear persisted basket after submission".
  useEffect(() => {
    try {
      window.localStorage.setItem(
        BASKET_STORAGE_KEY,
        JSON.stringify({ version: BASKET_STORAGE_VERSION, items: state.items }),
      )
    } catch {
      // localStorage may be unavailable — basket still works in-memory.
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
      location: state.location,
      customerDetails: state.customerDetails,
      schedule: state.schedule,
      currentStep: state.currentStep,
      submission: state.submission,

      addItem: (payload) => dispatch({ type: 'ADD_ITEM', payload }),
      updateQuantity: (itemId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } }),
      updateItemConfig: (payload) => dispatch({ type: 'UPDATE_ITEM_CONFIG', payload }),
      removeItem: (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: { itemId } }),
      clearBasket: () => dispatch({ type: 'CLEAR_BASKET' }),

      setLocation: (payload) => dispatch({ type: 'SET_LOCATION', payload }),
      setCustomerDetails: (payload) => dispatch({ type: 'SET_CUSTOMER_DETAILS', payload }),
      setSchedule: (payload) => dispatch({ type: 'SET_SCHEDULE', payload }),
      setStep: (step) => dispatch({ type: 'SET_STEP', payload: { step } }),

      submitStart: () => dispatch({ type: 'SUBMIT_START' }),
      submitSuccess: (result) => dispatch({ type: 'SUBMIT_SUCCESS', payload: { result } }),
      submitError: (error) => dispatch({ type: 'SUBMIT_ERROR', payload: { error } }),
      submitReset: () => dispatch({ type: 'SUBMIT_RESET' }),
    }),
    [state, itemCount],
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