<script setup lang="ts">
import type { MediaSchema } from '~/types/schema';

defineProps({
  medias: Array as PropType<MediaSchema[]>,
});

</script>

<template>
  <div>
    <section v-if="medias && medias.length > 0" class="relative gap-[22px] p-4">

      <BottomMenu class="bottom-menu">
        <template #logo>
          <img src="/icon.png" width="29" height="20">
        </template>
      </BottomMenu>

      <div class="w-full" :class="{ 'masonry-container': medias && medias.length }">

        <ul v-if="medias && medias.length" class="grid grid-cols-1 gap-4 lg:block">
          <li v-for="media in medias" ref="mansoryItem" :key="media.url" class="relative w-full group masonry-item">
            <NuxtLink target="_blank" :to="media.url" class="container-image">
              <img v-if="media && media.type === 'image'" width="527" height="430"
                :src="media.url" alt="media" crossorigin="anonymous" class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8]
            hover:brightness-100 will-change-[filter] object-cover"></img>
              <video v-else-if="media && media.type === 'video'" width="527" height="430"
                :src="media.url" alt="media" controls crossorigin="anonymous"
                class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"></video>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
  }

  .container-image {
    background-color: rgba(255, 255, 255, 0.1)
  }

  .container-image:hover {
    background-color: transparent;
  }

  .border-image {
    border-width: 1.15px;
    border-color: rgba(255, 255, 255, 0.1)
  }
}

@media screen and (min-width: 1024px) {
  .masonry-container {
    column-count: 3;
    column-gap: 20px;
    column-fill: balance;
    margin: 20px auto 0;
    padding: 2rem;
  }

  .masonry-item,
  .upload {
    display: inline-block;
    margin: 0 0 20px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    width: 100%;
  }
}
</style>