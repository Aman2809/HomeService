import { useEffect } from 'react'
import { businessConfig } from '../constants/businessConfig.js'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${businessConfig.businessName}`
      : businessConfig.businessName
  }, [title])
}