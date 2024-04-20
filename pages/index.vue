<script setup lang="ts">
const colorMode = useColorMode();
import type { FormSubmitEvent } from '#ui/types'
import { identifyPlatform } from '~/server/utils';
import { urlSchema, type MediaSchema, type URLSchema } from '~/types/schema';

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
};

const loading = ref(false);

const toast = useToast()

const state = reactive({
  url: undefined,
});


let medias: MediaSchema[] = reactive([]);

async function onSubmit(event: FormSubmitEvent<URLSchema>) {
  loading.value = true;
  try {
    const url = event.data.url
    if (!url) {
      loading.value = false;
      toast.add({
        title: "Error", description: 'URL is required.'
      })
      return;
    };
    const platform = identifyPlatform(url);
    if (!platform) {
      loading.value = false;
      toast.add({ title: "Error", description: 'Invalid URL/Not supported yet.' })
      return;
    };
    const res = await fetch(`/api/download?url=${url}&platform=${platform}`, { method: 'POST' });
    const data = await res.json();
    if (res.status !== 200) {
      loading.value = false;
      toast.add({ title: "Error", description: 'message' in data ? data['message'] : 'Failed to download.' });
      return;
    };
    const results = 'mediaUrls' in data['content'] ? data['content']['mediaUrls'] : data['content'];
    medias.splice(0, medias.length, ...results);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Failed to download.", error);
    toast.add({ title: "Error", description: 'Failed to download.' });
  }

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
    <UForm v-if="medias.length === 0" :schema="urlSchema" :state="state" class="space-y-4 flex flex-col items-center"
      @submit="onSubmit">
      <UFormGroup label="Post URL" name="url" class="w-[-webkit-fill-available]">
        <UInput variant="outline" placeholder="URL" v-model="state.url" type="text" />
      </UFormGroup>
      <UButton v-if="!loading" square color="black" type="submit" class="min-w-fit ">Download</UButton>
      <Icon v-else name="eos-icons:loading" size="30px" />
    </UForm>
    <MediaGallery v-else :medias="medias" />
    <hr class="dark:border-gray-700">
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Powered By <a target="_blank" class="text-primary-500" href="https://lexica.qewertyy.dev">LexicaAPI</a>
    </p>
  </UCard>
</template>
