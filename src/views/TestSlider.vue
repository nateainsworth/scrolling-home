<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Gallery from '../components/Gallery.vue'

const props = defineProps({
  isDragging: Boolean,
  activePage: String,
  pageName:String,
});

const page = ref('');
const horizontal = ref('');
const hPosition = ref(0);

defineExpose({
 page
})

const createWith = [ 'Node.js', 'Vue.js', 'Socket.io', 'Bootstrap', 'Postman', 'Chart.js', 'Cypress', 'Jest','MongoDB','Mongoose','JWT' ];

const leftposition = ref('0px');

onMounted (() =>{
  hPosition.value = horizontal.value.offsetTop;
});

const lock = (num, lower = 0, upper) => {
  return num < lower ? lower : num > upper ? upper : num;
}; 
  


const scrolling = () =>{
  //console.log('scrolling' + page.value.scrollTop + ' : ' + horizontal.value.clientHeight);
  //horizontal.value.offsetTop
  if(page.value.scrollTop > horizontal.value.offsetTop && page.value.scrollTop < (horizontal.value.clientHeight + horizontal.value.offsetTop - window.innerHeight)){
    //console.log('inside' , (page.value.scrollTop - horizontal.value.offsetTop));
     


    const percentage =  ( (page.value.scrollTop - horizontal.value.offsetTop) / (horizontal.value.clientHeight - window.innerHeight)) * 100;
    console.log((Math.round(percentage * 10) / 10));
    
    //const boundaryPos = horizontal.value.getBoundingClientRect();
    //const maxWidth = boundaryPos.width - horizontal.value.clientWidth - window.innerHeight;
    // x :  lock(x - boundaryPos.x, 0, maxWidth), 

    horizontal.value.scrollLeft = horizontal.value.scrollWidth / 100 *  (Math.round(percentage * 10) / 10)
    console.log(horizontal.value.scrollWidth / 100 * percentage );
    leftposition.value = '-' + ((horizontal.value.scrollWidth - window.innerWidth) / 100 * percentage) + 'px';

  }else if(page.value.scrollTop > (horizontal.value.clientHeight + horizontal.value.offsetTop - window.innerHeight)){
    leftposition.value = '-' + ((horizontal.value.scrollWidth - window.innerWidth) / 100 * 100) + 'px';
  }else if(page.value.scrollTop < horizontal.value.offsetTop){
    leftposition.value = '-' + ((horizontal.value.scrollWidth - window.innerWidth) / 100 * 0) + 'px';
  }
}


</script>
<template>
 <div ref="page" class='page-box' :class="{'drag-view': props.isDragging}" v-if="props.activePage == props.pageName || props.isDragging" @scroll="scrolling">
    <div class='page-main'>
      <div class="title-area">
        <h2>Test Slider</h2>
        <p>Testing Component Page</p>
      </div>
    </div>
    <div class="page-contents" v-if="!props.isDragging">
      <v-container>
        <v-row
            align="center"
            class="pa-2 ma-2"
        >
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <h2>SAAD Attendance</h2>
            <hr/>
          </v-col>
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur augue nulla, posuere sed cursus in, gravida porta felis. Vestibulum nec lacinia mi. Cras sollicitudin dolor a orci tristique, id porttitor ligula tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vel placerat turpis. Vestibulum venenatis rutrum bibendum. Aenean vulputate ex ac ornare placerat. Aliquam feugiat nisl sit amet dui dignissim, nec maximus quam tincidunt. Suspendisse blandit felis at mi interdum sodales. Duis sagittis tortor sollicitudin dapibus fringilla. Phasellus molestie leo turpis, et elementum nisl ultrices elementum. Aliquam in lacus quis purus tincidunt finibus quis vitae ex. Proin lacinia ullamcorper arcu, in finibus leo tristique ac. Maecenas et enim in lorem pretium dapibus vitae et tellus. Vestibulum cursus malesuada quam.
              </p>
          </v-col>
        </v-row>
      </v-container>

      <div ref="horizontal" class="this-parent-div-is-necessary horizontal-container">
        <div class="div-sticky-class">
          <div class="items">
            <p>Text goes here</p>
          </div>
          <div class="items"></div>
          <div class="items"></div>
          <div class="items"></div>
          <div class="items"></div>
        </div>
      </div>
      <v-container>
        <v-row
            align="center"
            class="pa-2 ma-2"
        >
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <h2>SAAD Attendance</h2>
            <hr/>
          </v-col>
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur augue nulla, posuere sed cursus in, gravida porta felis. Vestibulum nec lacinia mi. Cras sollicitudin dolor a orci tristique, id porttitor ligula tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vel placerat turpis. Vestibulum venenatis rutrum bibendum. Aenean vulputate ex ac ornare placerat. Aliquam feugiat nisl sit amet dui dignissim, nec maximus quam tincidunt. Suspendisse blandit felis at mi interdum sodales. Duis sagittis tortor sollicitudin dapibus fringilla. Phasellus molestie leo turpis, et elementum nisl ultrices elementum. Aliquam in lacus quis purus tincidunt finibus quis vitae ex. Proin lacinia ullamcorper arcu, in finibus leo tristique ac. Maecenas et enim in lorem pretium dapibus vitae et tellus. Vestibulum cursus malesuada quam.
              </p>
          </v-col>
        </v-row>
      </v-container>

    </div>
  </div>
</template>
<style>
  .page-box{
    /*aspect-ratio: 16 / 9;*/
    width:100%;
    overflow-y:auto;
    overflow-x:hidden;
    height: 100%;
    transition: all 0.5s ease-out;
    background-color:#ffffff;
    color: #1e1e1e;
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

.page-main::before{
  content:' ';
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background: url('https://github.com/nateainsworth/scrolling-home/blob/main/src/assets/Saad%20Analytics.png?raw=true') left;
  background-size: cover;

  z-index:10;
  filter: brightness(0.6);
}

  .page-main{
    position:relative;
    z-index:20;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  .title-area{
    text-align:left;
    position: relative;
    z-index: 20;
    color: #ffffff;
  }

.page{
  overflow-y:scroll;
  overflow-x:hidden;
  height:100vh;
  width:100vw;
}

.div-sticky-class{
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  display: flex;
}

.horizontal-container{
  background-color:green;
  height:300vh;
  width:calc(500vw + 25px);
  transition: all 0.2s ease-out;
  transform: translate(v-bind('leftposition'), 0px);
}

.items{
  width:calc(100vw + 8px);
  height:100vh;
}

.items:nth-of-type(1){
  background-color:orange;
}

.items:nth-of-type(2){
  background-color:purple;
}

.items:nth-of-type(3){
  background-color:red;
}

.items:nth-of-type(4){
  background-color:yellow;
}

.items:nth-of-type(5){
  background-color:aqua;
}

</style>