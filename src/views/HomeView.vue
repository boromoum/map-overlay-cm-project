<script setup lang="ts">

import { computed, reactive, ref, watch } from 'vue';
import Modal from '@/components/Modal.vue';

const zoom = ref(2)
const rotation = ref(0)
const strokeWidth = ref(2)
const strokeColor = ref('transparent')
const fillColor = ref('rgba(255,0,0,0.3)')
const show = ref(-1)

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
  console.log("==== clicked")
  modalActive.value = !modalActive.value;
  focusedItem.value = id;
}



// const onMouseHoverArea = () => {
//   console.log("on mouse hover")
//   overlayClass.value = "overlay-black"
//   isHover.value = true
// }

// const onMouseLeaveArea = () => {
//   console.log("on mouse leave")
//   overlayClass.value = "overlay-transparent"
// }


const focusedItem = ref(0);

const areas = [
  {
    id: 1,
    name: "Signature Apartment",
    cord: [[1196, 1051], [1451, 1141], [1527, 1082], [1620, 1048], [1647, 992], [1554, 955], [1583, 892], [1159, 950]],
    type: "single-poly",
    url: "https://via.placeholder.com/1000x200.png",
    point: [1250, 1687 - 1000],
    fillColor: 'rgba(255, 255, 255, 0.2)',
    strokeColor: 'rgba(255, 255, 255, 0.2)'

  },
  {
    id: 2,
    name: "Clubhouse",
    cord: [[1792, 934], [1922, 1019], [1975, 1003], [1843, 892]],
    type: "single-poly",
    url: "https://via.placeholder.com/1000x200.png",
    point: [1850, 1687 - 934],
    fillColor: 'rgba(255, 255, 255, 0.2)',
    strokeColor: 'rgba(255, 255, 255, 0.2)'
  },
  {
    id: 3,
    name: "Hotel",
    cord: [[2330, 1199], [2407, 1199], [2439, 1241], [2532, 1318], [2580, 1347], [2619, 1413], [2442, 1427]],
    type: "single-poly",
    url: "https://via.placeholder.com/1000x200.png",
    point: [2380, 1687 - 1250],
    fillColor: 'rgba(255, 255, 255, 0.2)',
    strokeColor: 'rgba(255, 255, 255, 0.2)'
  }
]

const calculatCord = (cords: number[][]) => {

  for (let i = 0; i < cords.length; i++) {

    var cord = cords[i]
    for (let j = 0; j < cord.length; j++) {
      if (j == 1) {
        console.log(cord[j])
        if (cord[j] < height) {
          cord[j] = height - cord[j]
        } else if (cord[j] > height) {
          cord[j] = cord[j] - height
        } else {
        }
      } else {

      }
    }
  }

  return cords

}



watch(show, (newShow, prevShow) => {
  // console.log("This is new value =============== ")
  if (newShow != -1) {
    console.log("when on hover")
    show.value = newShow
    let upd_obj = areas.findIndex((obj => obj.id == newShow + 1));
    areas[upd_obj].cord = calculatCord(areas[upd_obj].cord)

  }
  else {
    console.log("when leave")
    let upd_obj = areas.findIndex((obj => obj.id == prevShow + 1));
    console.log(upd_obj)
    areas[upd_obj].cord = calculatCord(areas[upd_obj].cord)
  }
})



</script>
<template>
  <div></div>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:800px;">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
    <ol-zoom-control />
    <ol-attribution-control />
    <ol-image-layer>
      <ol-source-image-static :url="imgUrl" :imageSize="size" :imageExtent="extent"
        :projection="projection"></ol-source-image-static>
    </ol-image-layer>
    <!-- <template>
      <ol-overlay :position="[0, 1687]">
        <div :class="overlayClass"></div>
      </ol-overlay>
    </template> -->
    <!-- <ol-overlay :position="[0, 1687]">
      <div :class="overlayClass"></div>
    </ol-overlay> -->
    <div v-for="(a, index) in areas" :key="a.id" style="z-index: 10;">
      <div v-if="show === index">
        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-multi-polygon :coordinates="[[a.cord]]"></ol-geom-multi-polygon>
              <ol-style>
                <ol-style-stroke :color="a.strokeColor" :width="strokeWidth"></ol-style-stroke>
                <ol-style-fill :color="a.fillColor"></ol-style-fill>
              </ol-style>
            </ol-feature>

          </ol-source-vector>
        </ol-vector-layer>
      </div>
      <template>
        <ol-overlay :position="a.point">
          <div class='pulseLoader'></div>
          <div class="overlay-content" @click="onToggleModal(index)" @mouseover="show = index" @mouseleave="show = -1">
          </div>
        </ol-overlay>
      </template>
    </div>

  </ol-map>
  <Modal :modal-active="modalActive" @close-modal="onToggleModal(0)" :name="areas[focusedItem].name"
    :url="areas[focusedItem].url" />
</template>
<style>
.overlay-content {
  background: white;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 40%;
  left: 40%;
  z-index: 10;
  visibility: visible;
}

.overlay-black {
  background: black;
  width: 1025px;
  height: 578px;
  opacity: 0.4;
  transition: 0.7s;
  position: absolute;
  z-index: 1;
  visibility: visible;
}

.overlay-transparent {
  background: transparent !important;
  width: 1025px;
  height: 578px;
  transition: 0.7s;
  position: absolute;
  z-index: 1;
  visibility: visible;
}

.pulseLoader {

  width: 3em;
  height: 3em;
  border-radius: 3em;
  background-color: white;
  outline: 1px solid transparent;
  animation: pulseanim 1.2s ease-in-out infinite;
}

@keyframes pulseanim {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
