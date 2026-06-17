<template>
  <div class="h-screen overflow-hidden grid lg:grid-cols-2 bg-white dark:bg-gray-900">
    <!-- Form Login -->
    <div class="flex items-center justify-center p-6">
      <div class="w-full max-w-md space-y-6">
        <div class="space-y-1">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Selamat Datang 👋
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Masuk ke akun PT Maju Jaya
          </p>
        </div>

        <UAlert
          v-if="errorMessage"
          color="error"
          variant="subtle"
          icon="i-heroicons-exclamation-triangle"
          :title="errorMessage"
        />

        <form
          class="space-y-5"
          @submit.prevent="handleSubmit"
        >
          <UFormField
            label="Username"
            name="username"
          >
            <UInput
              v-model="form.username"
              placeholder="Masukkan username"
              icon="i-heroicons-user"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Password"
            name="password"
          >
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Masukkan password"
              icon="i-heroicons-lock-closed"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            block
            size="lg"
            :loading="isLoading"
          >
            Masuk
          </UButton>
        </form>
      </div>
    </div>

    <div class="hidden lg:block relative h-screen overflow-hidden">
      <NuxtImg
        src="/images/login-bg.png"
        alt="Login Illustration"
        class="absolute inset-0 w-full h-full object-cover"
        format="webp"
        quality="80"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginPayload } from '~/types/auth'

definePageMeta({
  layout: 'auth'
})

const { login } = useAuth()
const router = useRouter()

const form = reactive<LoginPayload>({
  username: '',
  password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const isFetchError = (err: unknown): err is { data?: { message?: string } } => {
  return typeof err === 'object' && err !== null && 'data' in err
}

const handleSubmit = async (): Promise<void> => {
  errorMessage.value = ''

  if (!form.username || !form.password) {
    errorMessage.value = 'Username dan password wajib diisi'
    return
  }

  isLoading.value = true

  try {
    await login(form)
    await router.push('/dashboard')
  } catch (err: unknown) {
    if (isFetchError(err) && err.data?.message) {
      errorMessage.value = err.data.message
    } else {
      errorMessage.value = 'Username atau password salah'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
