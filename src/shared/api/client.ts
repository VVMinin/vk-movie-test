import axios from 'axios'
import { env } from '@/shared/config/env'
import type { ApiError } from './types'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'X-API-KEY': env.apiKey,
  },
  timeout: 10000,
})

export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? null,
      message: error.response?.data?.message || error.message || 'Request failed',
    }
  }

  return {
    status: null,
    message: 'Unknown error',
  }
}
