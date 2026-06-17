import { defineStore } from 'pinia'

export interface Pegawai {
  id_pegawai: number
  nama: string
  gelar: string
  id_jabatan: number
  nama_jabatan: string
  gaji_pokok: number
  username: string
  role: string
  created_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const pegawai = ref<Pegawai | null>(null)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => pegawai.value?.role === 'admin')
  const isUser = computed(() => pegawai.value?.role === 'user')

  function setAuth(newToken: string, newPegawai: Pegawai) {
    token.value = newToken
    pegawai.value = newPegawai
    if (import.meta.client) {
      localStorage.setItem('token', newToken)
      localStorage.setItem('pegawai', JSON.stringify(newPegawai))
    }
  }

  function loadFromStorage() {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('token')
      const storedPegawai = localStorage.getItem('pegawai')
      if (storedToken && storedPegawai) {
        token.value = storedToken
        pegawai.value = JSON.parse(storedPegawai) as Pegawai
      }
    }
  }

  function logout() {
    token.value = null
    pegawai.value = null
    if (import.meta.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('pegawai')
    }
  }

  return {
    token,
    pegawai,
    isLoggedIn,
    isAdmin,
    isUser,
    setAuth,
    loadFromStorage,
    logout
  }
})
