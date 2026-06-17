export interface Jabatan {
  id_jabatan: number
  nama_jabatan: string
  gaji_pokok: number
}

export interface Presensi {
  id_presensi: number
  id_pegawai: number
  tanggal: string
  status_hadir: string
  jam_masuk: string | null
  jam_keluar: string | null
  jam_masuk_normal: string
  jam_keluar_normal: string
  terlambat_menit: number
  lembur_menit: number
  created_at: string
  updated_at: string
}

export interface RekapGaji {
  id_pegawai: number
  nama: string
  jabatan: string
  gaji_pokok: number
  jumlah_hadir: number
  jumlah_alpa: number
  total_terlambat_menit: number
  total_lembur_menit: number
  potongan_alpa: number
  potongan_terlambat: number
  total_potongan: number
  total_lembur: number
  gaji_bersih: number
  bulan: number
  tahun: number
}
