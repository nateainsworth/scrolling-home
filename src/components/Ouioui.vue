<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isDragging: Boolean,
  activePage: String
});

const page = ref('');

defineExpose({
 page
})
</script>
<template>
  <div ref="page" class='page-box' style="background:purple;" :class="{'drag-view': isDragging}" v-if="activePage == 'page2' || isDragging">
    <h1>OuiOui</h1>
  </div>
</template>
<style scoped>
  .page-box{
    /*aspect-ratio: 16 / 9;*/
    width:100%;
    overflow-y:auto;
    height: 100%;
    transition: all 0.5s ease-out;
  }

  .page-container{
    height:100vh;
    width:100vw;
    overflow:hidden;
    }

  .drag-view{
    margin-top:10px;
    width:90vw;
    margin-top:10px;
    overflow:hidden;
    margin: 5vw;
    /*margin-top: 5vw;*/
  /* aspect-ratio: 16 / 9 !important;*/
  }

  .page-main{
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>