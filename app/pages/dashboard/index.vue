<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
        Selamat datang, {{ authStore.pegawai?.nama }} 👋
      </h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
        {{ authStore.isAdmin ? 'Administrator — kelola seluruh data pegawai' : 'Dashboard pegawai — data milik kamu' }}
      </p>
    </div>

    <!-- Admin view -->
    <template v-if="authStore.isAdmin">
      <DashboardStatCard />
      <DashboardRekapTable />
      <JabatanSection />
      <PegawaiSection />
      <PresensiSection />
      <LaporanSection />
    </template>

    <!-- User view -->
    <template v-else>
      <DashboardStatCard />
      <PresensiSection />
      <DashboardRekapTable />
    </template>
  </div>
</template>
