<template>
  <div class="h-screen overflow-hidden grid lg:grid-cols-2 bg-white">
    <div class="flex items-center justify-center px-8">
      <div class="w-full max-w-sm">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">
            Selamat Datang 👋
          </h1>

          <p class="mt-2 text-gray-500">
            Masuk ke akun PT Maju Jaya
          </p>
        </div>

        <UAlert
          v-if="errorMessage"
          color="error"
          variant="subtle"
          title="Login gagal"
          :description="errorMessage"
          class="mb-4"
        />

        <form
          class="space-y-4"
          @submit.prevent="handleSubmit"
        >
          <UFormField label="Username">
            <UInput
              v-model="form.username"
              variant="none"
              size="lg"
              placeholder="Masukkan username"
              class="w-full"
              :ui="{
                base: `
                  h-11
                  bg-gray-100
                  border
                  border-transparent
                  rounded-xl
                  text-sm
                  focus:border-[#863228]
                  focus:bg-white
                  transition-all
                `
              }"
            >
              <template #leading>
                <div class="flex items-center">
                  <CircleUserRound
                    class="w-4 h-4 text-gray-400"
                  />
                </div>
              </template>
            </UInput>
          </UFormField>

          <UFormField label="Password">
            <UInput
              v-model="form.password"
              type="password"
              variant="none"
              size="lg"
              placeholder="Masukkan password"
              class="w-full"
              :ui="{
                base: `
                  h-11
                  bg-gray-100
                  border
                  border-transparent
                  rounded-xl
                  text-sm
                  focus:border-[#863228]
                  focus:bg-white
                  transition-all
                `
              }"
            >
              <template #leading>
                <div class="flex items-center">
                  <LockKeyhole
                    class="w-4 h-4 text-gray-400"
                  />
                </div>
              </template>
            </UInput>
          </UFormField>

          <UButton
            type="submit"
            block
            :loading="isLoading"
            class="
              cursor-pointer
              h-11
              rounded-xl
              bg-[#863228]
              hover:bg-[#733022]
              active:bg-[#5f271d]
              text-white
              font-medium
            "
          >
            Masuk
          </UButton>
        </form>
      </div>
    </div>

    <div class="hidden lg:block relative">
      <NuxtImg
        src="/images/login-bg.png"
        alt="Login Illustration"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleUserRound, LockKeyhole } from 'lucide-vue-next'
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

const isFetchError = (
  err: unknown
): err is { data?: { message?: string } } => {
  return typeof err === 'object'
    && err !== null
    && 'data' in err
}

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!form.username || !form.password) {
    errorMessage.value = 'Username dan password wajib diisi'
    return
  }

  isLoading.value = true

  try {
    await login(form)
    await router.push('/dashboard')
  } catch (err) {
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
