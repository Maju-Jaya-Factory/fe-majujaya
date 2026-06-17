<template>
  <div class="flex flex-1 min-h-screen">
    <USidebar
      v-model:open="open"
      collapsible="icon"
      rail
      :ui="{
        container: 'h-full',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        <div class="flex items-center gap-2 px-2 py-1 overflow-hidden">
          <UIcon
            name="i-lucide-building-2"
            class="text-primary shrink-0 size-6"
          />
          <span class="font-bold text-sm truncate">PT Maju Jaya Teknologi</span>
        </div>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
          :key="state"
          :items="navItems"
          orientation="vertical"
          :ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </template>

      <template #footer>
        <UDropdownMenu
          :items="userItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            :label="authStore.pegawai?.nama"
            :avatar="{ alt: authStore.pegawai?.nama ?? '' }"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
            :ui="{ trailingIcon: 'text-dimmed ms-auto' }"
          />
        </UDropdownMenu>
      </template>
    </USidebar>

    <div class="flex-1 flex flex-col">
      <div class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 border-b border-default">
        <div class="flex items-center gap-3">
          <UButton
            icon="i-lucide-panel-left"
            color="neutral"
            variant="ghost"
            aria-label="Toggle sidebar"
            @click="open = !open"
          />
          <span class="font-semibold text-gray-700 dark:text-gray-200">
            PT Maju Jaya Teknologi
          </span>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>
          <UBadge :color="authStore.isAdmin ? 'primary' : 'neutral'">
            {{ authStore.pegawai?.role }}
          </UBadge>
          <UAvatar
            :alt="authStore.pegawai?.nama ?? ''"
            size="sm"
          />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
            {{ authStore.pegawai?.nama }}
          </span>
        </div>
      </div>

      <div class="flex-1 p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth'

const open = ref(true)
const colorMode = useColorMode()
const authStore = useAuthStore()
const router = useRouter()

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dashboard'
  }
])

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: authStore.pegawai?.nama ?? '',
      icon: 'i-lucide-user',
      disabled: true
    },
    {
      label: authStore.pegawai?.nama_jabatan ?? authStore.pegawai?.nama_jabatan ?? '',
      icon: 'i-lucide-briefcase',
      disabled: true
    }
  ],
  [
    {
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox' as const,
          checked: colorMode.value === 'light',
          onUpdateChecked(checked: boolean) {
            if (checked) colorMode.preference = 'light'
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          type: 'checkbox' as const,
          checked: colorMode.value === 'dark',
          onUpdateChecked(checked: boolean) {
            if (checked) colorMode.preference = 'dark'
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        }
      ]
    }
  ],
  [
    {
      label: 'Log out',
      icon: 'i-lucide-log-out',
      onSelect() {
        authStore.logout()
        router.push('/login')
      }
    }
  ]
])
</script>
