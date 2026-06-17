<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h3 class="font-semibold text-gray-800 dark:text-white">
          Rekap Gaji Bulanan
        </h3>
        <div class="flex items-center gap-2">
          <USelect
            v-model="bulan"
            :options="bulanOptions"
            value-key="value"
            label-key="label"
            class="w-36"
            @change="fetchRekap"
          />
          <UInput
            v-model="tahun"
            type="number"
            class="w-24"
            @change="fetchRekap"
          />
        </div>
      </div>
    </template>

    <UTable
      :data="rekaps"
      :columns="columns"
      :loading="loading"
      :empty-state="{ icon: 'i-lucide-inbox', label: 'Tidak ada data rekap gaji' }"
    >
      <template #gaji_pokok-cell="{ row }">
        {{ formatRupiah(row.original.gaji_pokok) }}
      </template>
      <template #total_potongan-cell="{ row }">
        <span class="text-red-500 font-medium">
          {{ formatRupiah(row.original.total_potongan) }}
        </span>
      </template>
      <template #total_lembur-cell="{ row }">
        <span class="text-green-500 font-medium">
          {{ formatRupiah(row.original.total_lembur) }}
        </span>
      </template>
      <template #gaji_bersih-cell="{ row }">
        <span class="font-bold text-primary">
          {{ formatRupiah(row.original.gaji_bersih) }}
        </span>
      </template>
    </UTable>
  </UCard>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { RekapGaji } from '~/types'

const api = useApi()
const authStore = useAuthStore()

const bulan = ref(new Date().getMonth() + 1)
const tahun = ref(new Date().getFullYear())
const loading = ref(false)
const rekaps = ref<RekapGaji[]>([])

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)

const fetchRekap = async () => {
  loading.value = true
  try {
    if (authStore.isAdmin) {
      const res = await api.get<{ data: RekapGaji[] }>(
        `/dashboard/rekap-gaji?bulan=${bulan.value}&tahun=${tahun.value}`
      )
      rekaps.value = res.data
    } else {
      const id = authStore.pegawai?.id_pegawai
      const res = await api.get<{ data: RekapGaji }>(
        `/pegawai/${id}/gaji?bulan=${bulan.value}&tahun=${tahun.value}`
      )
      rekaps.value = [res.data]
    }
  } catch {
    rekaps.value = []
  } finally {
    loading.value = false
  }
}

const columns: TableColumn<RekapGaji>[] = [
  { accessorKey: 'nama', header: 'Pegawai' },
  { accessorKey: 'jabatan', header: 'Jabatan' },
  { accessorKey: 'gaji_pokok', header: 'Gaji Pokok' },
  { accessorKey: 'total_potongan', header: 'Total Potongan' },
  { accessorKey: 'total_lembur', header: 'Total Lembur' },
  { accessorKey: 'gaji_bersih', header: 'Gaji Bersih' }
]

const bulanOptions = [
  { label: 'Januari', value: 1 },
  { label: 'Februari', value: 2 },
  { label: 'Maret', value: 3 },
  { label: 'April', value: 4 },
  { label: 'Mei', value: 5 },
  { label: 'Juni', value: 6 },
  { label: 'Juli', value: 7 },
  { label: 'Agustus', value: 8 },
  { label: 'September', value: 9 },
  { label: 'Oktober', value: 10 },
  { label: 'November', value: 11 },
  { label: 'Desember', value: 12 }
]

onMounted(() => fetchRekap())
</script>
