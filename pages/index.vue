<script setup lang="ts">
const colorMode = useColorMode();
import type { FormSubmitEvent } from '#ui/types'
import { identifyPlatform } from '~/server/utils';
import { urlSchema, type MediaSchema, type URLSchema } from '~/types/schema';

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
};

const toast = useToast()

const state = reactive({
  url: undefined,
})

let medias: MediaSchema[] = reactive([]);

async function onSubmit(event: FormSubmitEvent<URLSchema>) {
  const url = event.data.url
  if (!url) {
    toast.add({ title: "Error", description: 'URL is required.' })
    return;
  };
  const platform = identifyPlatform(url);
  if (!platform) {
    toast.add({ title: "Error", description: 'Invalid URL/Not supported yet.' })
    return;
  };
  const res = await fetch(`/api/download?url=${url}&platform=${platform}`, { method: 'POST' });
  if (!res.ok) {
    toast.add({ title: "Error", description: 'Failed to download.' })
    return;
  }
  const data = await res.json();
  console.log(data);
  medias.splice(0, medias.length, ...data['content']['mediaUrls']);
  console.log(medias);
  return medias;
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
    <UForm v-if="medias.length === 0" :schema="urlSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Post URL" name="url">
        <UInput variant="outline" placeholder="URL" v-model="state.url" type="text" />
      </UFormGroup>
      <UButton square color="black" type="submit">Download</UButton>
    </UForm>
    <MediaGallery v-else :medias="medias" />
    <hr class="dark:border-gray-700">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Powered By <a target="_blank" class="text-primary-500" href="https://lexica.qewertyy.dev">LexicaAPI</a>
    </p>
  </UCard>
</template>
