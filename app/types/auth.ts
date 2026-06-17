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

export interface LoginPayload extends Record<string, unknown> {
  username: string
  password: string
}

export interface LoginResponse {
  data: {
    token: string
    pegawai: Pegawai
  }
  success: boolean
}
