import { useContext } from 'react'
import { CompareContext } from './context'

export const useCompare = () => {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare should be used inside CompareProvider')
  }

  return context
}
