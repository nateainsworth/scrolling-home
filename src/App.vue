<script setup lang="ts">
import { ref,nextTick, onMounted } from 'vue'
import Home from './components/Home.vue'
import Ouioui from './components/Ouioui.vue'
import Rcadia from './components/Rcadia.vue'

const pageComponents = {Home,Ouioui,Rcadia};

// usage:
class page {
  constructor(pageval) {
    this.pageval = ref(pageval);
  }
}




  const pages = ref([]);
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
  const activePage = ref('page1');
  const lastPercentage = ref(0);

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
        //const maxWidth = boundaryPos.width - draggable.clientWidth;
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
        
        //pageTrigger.value = [page2.value.offsetTop/1.5, page2.value.offsetTop - page2.value.clientHeight /3,page3.value.offsetTop - page3.value.clientHeight /3];
        pageTrigger.value = [pages.value[1].page.offsetTop/1.5, pages.value[1].page.offsetTop - pages.value[1].page.clientHeight /3,pages.value[2].page.offsetTop - pages.value[2].page.clientHeight /3];

        /*
	this.pages = [this.$refs.page2.offsetTop/1.5,this.$refs.page2.offsetTop - this.$refs.page2.clientHeight /3,this.$refs.page3.offsetTop - this.$refs.page3.clientHeight /3];
        */

        console.log(pageTrigger);
        
        console.log('mouse up triggered');
        //console.log('off set =  ',page1.value.offsetTop);
        if( pageTrigger.value[0] > pagecont.value.scrollTop){
          activePage.value ="page1";
          console.log(pageTrigger.value[0] , '  :  ', pagecont.value.scrollTop)
          nextTick(() => {
            jumpToPage = pages.value[0].page.offsetTop;
            pagecont.value.scrollTop = jumpToPage;
          });
        }else if (pageTrigger.value[1] < pagecont.value.scrollTop && pageTrigger.value[2] > pagecont.value.scrollTop){
           activePage.value = "page2";
          nextTick(() => {
            jumpToPage = pages.value[1].page.offsetTop;
            pagecont.value.scrollTop = jumpToPage;
          });
          console.log(pageTrigger.value[0] , '  :  ', pagecont.value.scrollTop)
        }else if(pageTrigger.value[2] < pagecont.value.scrollTop){
          activePage.value ="page3";
          nextTick(() => {
            jumpToPage = pages.value[2].page.offsetTop;
            pagecont.value.scrollTop = jumpToPage;
          });
          console.log(page1.value , '  =  ', pagecont.value.scrollTop)
        }
        
        console.log(pageTrigger.value[1] , '  =  ', pagecont.value.scrollTop)
        
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
          //console.log(dragItemCoords.value)
          dragItemTop.value = position.y +'px';
          const percentage =  draggable.value.clientHeight / 100 * (position.y);
          //console.log( percentage , '%');
          //console.log(pagecont.scrollTop / 100 * percentage);
          pagecont.value.scrollTop = pagecont.value.scrollHeight / 100 * percentage;//pagecont.scrollTop + position.y;
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
 <div @mouseup="handleMouseUp" >
  <div>
    <div ref="boundary"
         class="boundary-box" 
         @mousedown="handleMouseDown($event)" 
         @mousemove="handleMouseMove($event)"
    >
    <div ref="draggable"
           class="drag-handle"
           :class="{'grabbing': isDragging},{'hint': lastPercentage < '70'}"></div>    <!--  :style="draggablePosition" -->
    </div>
    <div ref="pagecont" class="page-container" >
      <component v-for="component in pageComponents" :is="component" ref="pages" :isDragging="isDragging" :activePage="activePage"></component>

<!--
      <div ref="page1" class='page-box' style="background:green;" :class="{'drag-view': isDragging}" v-if="activePage == 'page1' || isDragging"></div>
      <h3 v-if="isDragging">Placement</h3>
      <div ref="page2" class='page-box' style="background:purple;" :class="{'drag-view': isDragging}" v-if="activePage == 'page2' || isDragging"></div>
      <div ref="page3" class='page-box' style="background:red;" :class="{'drag-view': isDragging}" v-if="activePage == 'page3' || isDragging"></div>-->
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

.fixed-view{
  height: 100%;
}

.page-main{
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
