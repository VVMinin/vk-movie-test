import axios from 'axios'
import { env } from '@/shared/config/env'
import type { ApiError } from './types'

export const apiClient = axios.create({
  baseURL: env.apiRootUrl,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const baseParams =
    config.params && typeof config.params === 'object' ? (config.params as Record<string, unknown>) : {}

  config.params = {
    ...baseParams,
    token: env.apiKey,
  }

  return config
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
