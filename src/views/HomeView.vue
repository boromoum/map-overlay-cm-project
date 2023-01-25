<script setup lang="ts">

import { reactive, ref } from 'vue';
import Modal from '@/components/Modal.vue';

const zoom = ref(2)
const rotation = ref(0)

const size = ref([1024, 968])
const center = ref([size.value[0] / 2, size.value[1] / 2])
const extent = ref([0, 0, ...size.value])
const projection = reactive({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});
const imgUrl = ref('https://imgs.xkcd.com/comics/online_communities.png');
const modalActive = ref(false);
const onToggleModal = (id: number) => {
  console.log("================== id");
  console.log(id);
  modalActive.value = !modalActive.value;
  focusedItem.value = id;
}

const focusedItem = ref(0);

const positions = [
  {
    id: 1,
    x: 200,
    y: 550,
    name: "Facebook Area",
    url: "https://via.placeholder.com/1000x200.png"
  },
  {
    id: 2,
    x: 200,
    y: 750,
    name: "My Space Area",
    url: "https://via.placeholder.com/1000x200.png"
  }
];


</script>
<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:800px">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
    <ol-zoom-control />
    <ol-attribution-control />
    <ol-image-layer>
      <ol-source-image-static :url="imgUrl" :imageSize="size" :imageExtent="extent"
        :projection="projection"></ol-source-image-static>
    </ol-image-layer>
    <div v-for="(p, index) in positions" :key="p.id">
      <ol-overlay :position="[p.x, p.y]">
        <template v-slot="slotProps">
          <div class="bg-gray-500 bg-opacity-80 p-4 hover:bg-opacity-100 cursor-pointer" @click="onToggleModal(index)">
            <h1 class="text-white">{{ p.name }}</h1>
          </div>
        </template>
      </ol-overlay>
    </div>
  </ol-map>
  <Modal :modal-active="modalActive" @close-modal="onToggleModal(0)" :name="positions[focusedItem].name"
    :url="positions[focusedItem].url" />
</template>
<style>
.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
</style>
