<template>
  <UContainer class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">
        Dashboard HR
      </h1>
      <p class="text-gray-500">
        Ringkasan data pegawai & presensi
      </p>
    </div>

    <DashboardStatCards />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <UCard class="lg:col-span-2">
        <template #header>
          <h3 class="font-semibold">
            Rekap Gaji Bulanan
          </h3>
        </template>
      </UCard>

      <DashboardQuickPanel />
    </div>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
