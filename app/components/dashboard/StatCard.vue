<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3 z-10 relative">
      <USelect
        v-model="bulan"
        :options="[
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
        ]"
        value-key="value"
        label-key="label"
        class="w-40"
        @change="fetchStats"
      />
      <UInput
        v-model="tahun"
        type="number"
        class="w-28"
        @change="fetchStats"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard
        v-for="card in cards"
        :key="card.label"
        :ui="{ body: 'flex items-center gap-4' }"
      >
        <div :class="[card.bg, 'p-3 rounded-lg shrink-0']">
          <UIcon
            :name="card.icon"
            :class="[card.color, 'size-6']"
          />
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ card.label }}
          </p>
          <p class="text-xl font-bold text-gray-800 dark:text-white">
            <template v-if="loading">
              <USkeleton class="h-6 w-24" />
            </template>
            <template v-else-if="card.format === 'rupiah'">
              {{ formatRupiah(card.value) }}
            </template>
            <template v-else>
              {{ card.value }}
            </template>
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RekapGaji } from '~/types'

interface DashboardStats {
  jumlah_pegawai: number
  total_lembur: number
  total_potongan: number
}

const api = useApi()
const authStore = useAuthStore()

const bulan = ref(new Date().getMonth() + 1)
const tahun = ref(new Date().getFullYear())

const stats = ref<DashboardStats>({
  jumlah_pegawai: 0,
  total_lembur: 0,
  total_potongan: 0
})

const loading = ref(false)

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const fetchStats = async () => {
  loading.value = true
  try {
    if (authStore.isAdmin) {
      const [pegawaiRes, rekapRes] = await Promise.all([
        api.get<{ data: unknown[] }>('/pegawai'),
        api.get<{ data: RekapGaji[] }>(`/dashboard/rekap-gaji?bulan=${bulan.value}&tahun=${tahun.value}`)
      ])

      stats.value.jumlah_pegawai = pegawaiRes.data.length
      stats.value.total_lembur = rekapRes.data.reduce((acc, r) => acc + r.total_lembur, 0)
      stats.value.total_potongan = rekapRes.data.reduce((acc, r) => acc + r.total_potongan, 0)
    } else {
      const id = authStore.pegawai?.id_pegawai
      const rekapRes = await api.get<{ data: RekapGaji }>(
        `/pegawai/${id}/gaji?bulan=${bulan.value}&tahun=${tahun.value}`
      )
      stats.value.jumlah_pegawai = 1
      stats.value.total_lembur = rekapRes.data.total_lembur
      stats.value.total_potongan = rekapRes.data.total_potongan
    }
  } catch {
    // silent
  } finally {
    loading.value = false
  }
}

const cards = computed(() => [
  {
    label: authStore.isAdmin ? 'Total Pegawai' : 'Pegawai',
    value: stats.value.jumlah_pegawai,
    icon: 'i-lucide-users',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    format: 'number'
  },
  {
    label: 'Total Lembur Bulan Ini',
    value: stats.value.total_lembur,
    icon: 'i-lucide-clock',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    format: 'rupiah'
  },
  {
    label: 'Total Potongan Bulan Ini',
    value: stats.value.total_potongan,
    icon: 'i-lucide-trending-down',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    format: 'rupiah'
  }
])

onMounted(() => fetchStats())
</script>
