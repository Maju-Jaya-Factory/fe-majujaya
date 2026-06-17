import { useAuthStore } from '~/stores/auth'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const baseURL = config.public.apiBase as string

  const getHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    ...(authStore.token && { Authorization: `Bearer ${authStore.token}` })
  })

  const get = async <T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: 'GET',
      headers: getHeaders(),
      params
    })
  }

  const post = async <T>(path: string, body?: Record<string, unknown>): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body
    })
  }

  const put = async <T>(path: string, body?: Record<string, unknown>): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body
    })
  }

  const del = async <T>(path: string): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
  }

  return { get, post, put, del }
}
