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
  <div ref="page" class='page-box' style="background:green;" :class="{'drag-view': props.isDragging}" v-if="props.activePage == 'page1' || props.isDragging">
    <div class='page-main' style="background:green;">
      <h1>Title</h1>
    </div>
    <div class="page-contents" v-if="!props.isDragging">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur augue nulla, posuere sed cursus in, gravida porta felis. Vestibulum nec lacinia mi. Cras sollicitudin dolor a orci tristique, id porttitor ligula tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vel placerat turpis. Vestibulum venenatis rutrum bibendum. Aenean vulputate ex ac ornare placerat. Aliquam feugiat nisl sit amet dui dignissim, nec maximus quam tincidunt. Suspendisse blandit felis at mi interdum sodales. Duis sagittis tortor sollicitudin dapibus fringilla. Phasellus molestie leo turpis, et elementum nisl ultrices elementum. Aliquam in lacus quis purus tincidunt finibus quis vitae ex. Proin lacinia ullamcorper arcu, in finibus leo tristique ac. Maecenas et enim in lorem pretium dapibus vitae et tellus. Vestibulum cursus malesuada quam.
          </h2>
          </div>
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