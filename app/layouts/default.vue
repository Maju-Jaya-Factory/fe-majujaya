<template>
  <UApp>
    <div class="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-lg font-bold text-gray-800 dark:text-white">
            Maju Jaya Factory
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ authStore.pegawai?.nama }}
          </p>
          <UBadge
            :color="authStore.isAdmin ? 'primary' : 'neutral'"
            class="mt-1"
          >
            {{ authStore.pegawai?.role }}
          </UBadge>
        </div>

        <nav class="flex-1 p-4 space-y-2">
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            active-class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-semibold"
          >
            <UIcon name="i-heroicons-home" />
            Dashboard
          </NuxtLink>
        </nav>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <UButton
            color="error"
            variant="soft"
            block
            icon="i-heroicons-arrow-right-on-rectangle"
            @click="handleLogout"
          >
            Logout
          </UButton>
        </div>
      </aside>

      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
