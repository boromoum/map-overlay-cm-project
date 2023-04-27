<script setup lang="ts">

import { reactive, ref } from 'vue';
import Modal from '@/components/Modal.vue';

const zoom = ref(2)
const rotation = ref(0)
const strokeWidth = ref(2)
const strokeColor = ref('red')

const width = 3000
const height = 1687
const size = ref([width, height])
const center = ref([size.value[0] / 2, size.value[1] / 3])

const extent = ref([0, 0, ...size.value])
const projection = reactive({
  code: 'custom-image',
  units: 'pixels',
  extent: extent,
});
const imgUrl = ref('https://i.ibb.co/QmSYp0V/resort.jpg');
const modalActive = ref(false);
const onToggleModal = (id: number) => {
  modalActive.value = !modalActive.value;
  focusedItem.value = id;
}

const focusedItem = ref(0);

const positions = [
  {
    id: 1,
    x: 200,
    y: 350,
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


const areas = [
  {
    id: 1,
    name: "Signature Apartment",
    cord: [[1196, 1687 - 1051], [1451, 1687 - 1141], [1527, 1687 - 1082], [1620, 1687 - 1048], [1647, 1687 - 992], [1554, 1687 - 955], [1583, 1687 - 892], [1159, 1687 - 950]],
    type: "single-poly",
    url: "https://via.placeholder.com/1000x200.png",
    point: [1250, 1687 - 1000]
  },
  {
    id: 2,
    name: "Clubhouse",
    cord: [[1792, 1687 - 934], [1922, 1687 - 1019], [1975, 1687 - 1003], [1843, 1687 - 892]],
    type: "single-poly",
    url: "https://via.placeholder.com/1000x200.png",
    point: [1850, 1687 - 934]
  },
  {
    id: 3,
    name: "Hotel",
    cord: [[2330, 1687 - 1199], [2407, 1687 - 1199], [2439, 1687 - 1241], [2532, 1687 - 1318], [2580, 1687 - 1347], [2619, 1687 - 1413], [2442, 1687 - 1427]],
    type: "single-poly",
    url: "https://via.placeholder.com/1000x200.png",
    point: [2380, 1687 - 1250]
  }
]

const calculatCord = (cords: number[][]) => {
  let y = ref(0)
  let new_y = ref(0)
  for (let i = 0; i < cords.length; i++) {
    y.value = cords[i][1]
    console.log(y.value)
    if (y.value < height) {
      new_y.value = height - y.value
      cords[i][1] = new_y.value
    } else {
      new_y.value = y.value - height
      cords[i][1] = new_y.value
    }
  }

}



</script>
<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:800px;">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
    <ol-zoom-control />
    <ol-attribution-control />
    <ol-image-layer>
      <ol-source-image-static :url="imgUrl" :imageSize="size" :imageExtent="extent"
        :projection="projection"></ol-source-image-static>
    </ol-image-layer>

    <!-- <div v-for="(p, index) in positions" :key="p.id">
                                        <ol-overlay :position="[p.x, p.y]">
        <template v-slot="slotProps">
          <div class="bg-gray-500 bg-opacity-80 p-4 hover:bg-opacity-100 cursor-pointer" @click="onToggleModal(index)">
            <h1 class="text-white">{{ p.name }}</h1>
          </div>
        </template>
      </ol-overlay>
    </div> -->

    <div v-for="(a, index) in areas" :key="a.id">
      <div>
        <button @click="calculatCord(a.cord)">get cords</button>
      </div>
      <template>
        <div @click="onToggleModal(index)">
          <ol-vector-layer>
            <ol-source-vector>
              <ol-feature>
                <ol-geom-point :coordinates="a.point"></ol-geom-point>
                <ol-style>
                  <ol-style-circle :radius="10">
                    <ol-style-fill :color="'white'"></ol-style-fill>
                    <ol-style-stroke :color="'white'" :width="2"></ol-style-stroke>
                  </ol-style-circle>
                </ol-style>
              </ol-feature>

            </ol-source-vector>

          </ol-vector-layer>
        </div>
      </template>
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-multi-polygon :coordinates="[[a.cord]]"></ol-geom-multi-polygon>
            <ol-style>
              <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
            </ol-style>
          </ol-feature>

        </ol-source-vector>
      </ol-vector-layer>
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
