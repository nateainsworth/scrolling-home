<script setup lang="ts">
import { ref,nextTick, onMounted } from 'vue'
import Home from './components/Home.vue'
import Ouioui from './components/Ouioui.vue'
import Rcadia from './components/Rcadia.vue'

const pageComponents = [Home,Ouioui,Rcadia];

// usage:
class page {
  constructor(pageval) {
    this.pageval = ref(pageval);
  }
}




  const pages = ref([]);
  const titles = ref([]);
  const clamp = (num, lower = 0, upper) => {
    return num < lower ? lower : num > upper ? upper : num;
  }; 
  
  const page1 = ref('');
  const page2 = ref('');
  const page3 = ref('');
  const message =  ref('Hello World');
  const isDragging = ref(false);
  const dragItemTop = ref('0px')
  const dragItemCoords = ref({
        top: 5,
        left:  5,
      });
  const boundary = ref('');
  const draggable = ref('');
  const pagecont = ref('');
  const pageTrigger = ref([]);
  const activePage = ref('page0');
  const lastPercentage = ref(0);
  const scrollHeight = ref(0);

onMounted(() => {
  console.log(pages.value);
  console.log(pages.value[0].page);
})

   const draggablePosition = () => {
        console.log(dragItemCoords.value.top);
console.log( dragItemCoords.value.top + 'px');
        return {
          top:  dragItemCoords.value.top + 'px',
          left:  dragItemCoords.value.left + 'px'
        };
    }

    const clampInsideBoundary = (x:any, y:any)  => {
        const boundaryPos = boundary.value.getBoundingClientRect();
        const maxHeight = boundaryPos.height - draggable.value.clientHeight;

        return {
          x :  0,
          y :  clamp(y - boundaryPos.y, 0, maxHeight), 
        };
    }

    const handleMouseUp = () => {
     if (isDragging.value) {
        let jumpToPage = 0;
        isDragging.value = false;
        let triggers = [];

          for(const page in pages.value){
            console.log(page)
            if(page == 0){
              triggers.push({
                start: 0,
                end: pages.value[( +page + 1)].page.offsetTop - pages.value[( +page + 1)].page.clientHeight /3,//pages.value[1].page.offsetTop/1.5,
              })
            }else if(page == (pages.value.length - 1)){
              triggers.push({
                start: pages.value[page].page.offsetTop - pages.value[page].page.clientHeight /3,
                end: pagecont.value.scrollHeight,
              });
            }else{
              triggers.push({
                start: pages.value[page].page.offsetTop - pages.value[page].page.clientHeight /3,
                end:  pages.value[( +page + 1)].page.offsetTop - pages.value[( +page + 1)].page.clientHeight /3,
              });
            }
          }


          for(const trigger in triggers){
            console.log(trigger);
            console.log(triggers[trigger]);
            if (triggers[trigger].start < pagecont.value.scrollTop && triggers[trigger].end > pagecont.value.scrollTop){
              activePage.value = "page" + trigger;
            
            console.log(activePage.value);
              console.log(pages.value[trigger].page.offsetTop);
              jumpToPage = pages.value[trigger].page.offsetTop;
              nextTick(() => {
                pagecont.value.scrollTop = jumpToPage;
              });
              
            }
          }

        }
      }
    
      const findPositionInsideBound = (e) => {
        const x = e.clientX - (draggable.value.clientWidth/2);
        const y = e.clientY - (draggable.value.clientHeight/2); 
        
        return clampInsideBoundary(x, y);
      }

      const handleMouseDown = async (e) => {
        e.preventDefault();
        if (e.target === draggable.value) {
          isDragging.value = true;  
          
          await nextTick (() =>{
            pagecont.value.scrollTop = lastPercentage.value;
          });
          
        }
      }

      const handleMouseMove = (e) => {
        
        if (isDragging.value) {
          const position = findPositionInsideBound(e);
          
          dragItemCoords.value = {left: position.x, top: position.y };
          dragItemTop.value = position.y + 'px';

          const percentage =  ( position.y / (boundary.value.clientHeight - draggable.value.clientHeight)) * 100;
          pagecont.value.scrollTop = (pagecont.value.scrollHeight - pagecont.value.clientHeight) / 100 * percentage;
          lastPercentage.value = pagecont.value.scrollTop;
         
        }
      }
      
      const handleMouseLeave = (e) => {

        //canvas.upperCanvasEl.dispatchEvent(evt);
        
        if (isDragging.value) {     
          var evt = new MouseEvent("mouseup", () => {
            bubbles =  true,
            cancelable = false,
            view =  window
          });
          draggable.dispatchEvent(evt);
        }
        
      }
    
</script>

<template>
 <div @mouseup="handleMouseUp" @mousemove="handleMouseMove($event)" >
  <div>
    <div ref="boundary"
         class="boundary-box" 
         @mousedown="handleMouseDown($event)" 
       
    >
    <div ref="draggable"
           class="drag-handle"
           :class="{'grabbing': isDragging},{'hint': lastPercentage < '70'}"></div>
    </div>
    </div>
    <div>
    <div ref="pagecont" class="page-container" >
      <component v-for="(component, index) in pageComponents" :is="component" ref="pages" :isDragging="isDragging" :activePage="activePage" :pageName="'page' + index"><div v-if="isDragging"><h2>Title</h2></div>
      </component>
    </div>
  </div>

</div>
</template>

<style scoped>
.boundary-box{
  position: fixed;
  top: 25vh;
  left: 5px;
  width: 120px;
  height: 50vh;
  pointer-events: none; 

}

.drag-handle{
  width:40px;
  height:40px;
  border-radius: 50%;
  background-color:#ffffff;
  top: v-bind('dragItemTop');
  position: absolute;
  cursor: -webkit-grab; 
  cursor: grab;
  pointer-events: auto;

}

.drag-handle.hint::after{
  content:"\2190  Drag Me";
  position: absolute;
  top: calc(50% - 13px);
  left: 110%;
  width:100px;
  text-align:left;
  pointer-events: none;
  transition: all 3s ease-out;
}


.grabbing{
  cursor: -webkit-grabbing; 
  cursor: grabbing;
}

.page-container{
  height:100vh;
  width:100vw;
  overflow:hidden;
  }


</style>
