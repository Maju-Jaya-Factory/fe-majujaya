import { useAuthStore } from '~/stores/auth'
import type { LoginPayload, LoginResponse } from '~/types/auth'

export const useAuth = () => {
  const api = useApi()
  const authStore = useAuthStore()

  const login = async (payload: LoginPayload): Promise<void> => {
    const response = await api.post<LoginResponse>('/auth/login', payload)

    if (response.success) {
      authStore.setAuth(response.data.token, response.data.pegawai)
    }
  }

  return { login }
}
