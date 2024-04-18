<script setup lang="ts">
const colorMode = useColorMode();
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
};

const toast = useToast()

const schema = z.object({
  url: z.string().url('Invalid URL.'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  url: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault()
  console.log(event.data)
  const url = event.data.url
  if (!url) {
    toast.add({ title: "error", description: 'URL is required.' })
  };
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        Social Media Downloaders
      </h3>
      <UButton square variant="ghost" color="black"
        :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" @click="toggleColorMode" />
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UInput color="black" variant="outline" placeholder="URL" v-model="state.url" type="text" />

      <UButton square color="black" class="w-fit" type="submit">Download</UButton>
    </UForm>
    <hr class="dark:border-gray-700">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Powered By <a target="_blank" class="text-primary-500" href="https://lexica.qewertyy.dev">LexicaAPI</a>
    </p>
  </UCard>
</template>
