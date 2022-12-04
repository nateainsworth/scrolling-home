<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isDragging: Boolean,
  activePage: String,
  pageName:String,
});

const page = ref('');

defineExpose({
 page
})
</script>
<template>
  <div ref="page" class='page-box' style="background:red;" :class="{'drag-view': isDragging}" v-if="activePage == props.pageName || isDragging">
    <h1>Rcadia</h1>
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
    width:90vw;
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