<script setup lang="ts">
import { ref , inject} from 'vue'
import Slide from './Slide.vue'

const props = defineProps({
  screenShots: [String],
});

const { page } = inject('refers')

const horizontal = ref('');
const hPosition = ref(0);
const leftposition = ref('0px');

const lock = (num, lower = 0, upper) => {
  return num < lower ? lower : num > upper ? upper : num;
}; 

const scrolling = () =>{
  
  if(page.value.scrollTop > horizontal.value.offsetTop && page.value.scrollTop < (horizontal.value.clientHeight + horizontal.value.offsetTop - window.innerHeight)){

    const percentage =  ( (page.value.scrollTop - horizontal.value.offsetTop) / (horizontal.value.clientHeight - window.innerHeight)) * 100;
    console.log((Math.round(percentage * 10) / 10));
    
    horizontal.value.scrollLeft = horizontal.value.scrollWidth / 100 *  (Math.round(percentage * 10) / 10)
    console.log(horizontal.value.scrollWidth / 100 * percentage );
    leftposition.value = '-' + ((horizontal.value.scrollWidth - window.innerWidth) / 100 * percentage) + 'px';

  }else if(page.value.scrollTop > (horizontal.value.clientHeight + horizontal.value.offsetTop - window.innerHeight)){
    leftposition.value = '-' + ((horizontal.value.scrollWidth - window.innerWidth) / 100 * 100) + 'px';
  }else if(page.value.scrollTop < horizontal.value.offsetTop){
    leftposition.value = '-' + ((horizontal.value.scrollWidth - window.innerWidth) / 100 * 0) + 'px';
  }
}

defineExpose({
  scrolling
})


console.log(props.screenShots);
</script>
<template>
  <div ref="horizontal" class="this-parent-div-is-necessary horizontal-container">
    <div class="div-sticky-class">
      <Slide v-for="(url, index) in props.screenShots" :key="index" :imageURL="url"/>
    </div>
  </div>
</template>

<style scoped>

.div-sticky-class{
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  display: inline-flex;
}

.horizontal-container{
  background-color:green;
  height:300vh;
  min-width:100vw;
  transition: all 0.2s ease-out;
  transform: translate(v-bind('leftposition'), 0px);
}

</style>