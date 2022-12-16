<script setup lang="ts">
import { ref,nextTick, onMounted } from 'vue'
import Home from './views/Home.vue'
import Ouioui from './views/Ouioui.vue'
import Rcadia from './views/Rcadia.vue'
import Attendance from './views/Attendance.vue'
import VrUnity from './views/VrUnity.vue'
import VrUnreal from './views/VrUnreal.vue'
import FinalProject from './views/FinalProject.vue'
import HallamChat from './views/HallamChat.vue'
import TestSlider from './views/TestSlider.vue'

//,HallamChat
  const pageComponents = [Home,Rcadia,Attendance,VrUnity,VrUnreal,Ouioui,FinalProject,TestSlider];

  const pages = ref([]);
  const titles = ref([]);
  const lock = (num, lower = 0, upper) => {
    return num < lower ? lower : num > upper ? upper : num;
  }; 
  
  const isDragging = ref(true);
  const menuHover = ref(false);
  const dragItemTop = ref('0px')
  const boundary = ref('');
  const draggable = ref('');
  const pagecont = ref('');
  const pageTrigger = ref([]);
  const activePage = ref('page0');
  const lastPercentage = ref(0);

  const lockToBoundary = (x:any, y:any)  => {
      const boundaryPos = boundary.value.getBoundingClientRect();
      const maxHeight = boundaryPos.height - draggable.value.clientHeight;

      return {
        x :  0,
        y :  lock(y - boundaryPos.y, 0, maxHeight), 
      };
  }

  const handleMouseUp = () => {
    if (isDragging.value) {
      let jumpToPage = 0;
      isDragging.value = false;
      let triggers = [];

      for(const page in pages.value){
        if(page == 0){
          triggers.push({
            start: -100,
            end: pages.value[( +page + 1)].page.offsetTop - pages.value[( +page + 1)].page.clientHeight /3,
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

        if (triggers[trigger].start < pagecont.value.scrollTop && triggers[trigger].end > pagecont.value.scrollTop){
          activePage.value = "page" + trigger;
          jumpToPage = pages.value[trigger].page.offsetTop;
          pagecont.value.scrollTop = jumpToPage;
          break;
        }
      }

    }
  }

  const findPositionInsideBound = (e) => {
    const x = e.clientX - (draggable.value.clientWidth/2);
    const y = e.clientY - (draggable.value.clientHeight/2); 
    
    return lockToBoundary(x, y);
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

      dragItemTop.value = position.y + 'px';

      const percentage =  ( position.y / (boundary.value.clientHeight - draggable.value.clientHeight)) * 100;
      pagecont.value.scrollTop = (pagecont.value.scrollHeight - pagecont.value.clientHeight) / 100 * percentage;
      lastPercentage.value = pagecont.value.scrollTop;
      
    }
  }
  
  const handleMouseLeave = () => {
    
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
  <div @mouseup="handleMouseUp" @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave()" >
    <div>
      <div ref="boundary"
      class="boundary-box" 
      @mousedown="handleMouseDown($event)"
      >
        <div ref="draggable"
        class="drag-handle"
        :class="{'grabbing': isDragging},{'hint': lastPercentage < '70'}"
        >
          <span class="menu-icon"></span>
        </div>
      </div>
    </div>
    <div>
      <div ref="pagecont" class="page-container" >
        <component v-for="(component, index) in pageComponents" :is="component" ref="pages" :isDragging="isDragging" :activePage="activePage" :pageName="'page' + index"><div v-if="isDragging"><h2>Portfolio</h2></div>
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
  z-index:1000;
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
  display: flex;  
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-1);
  transition: all 0.5s ease-out;
  /*transform: scale(0.9);*/
  }

.drag-handle:hover{
    /*transform: scale(1);*/
    width:50px;
  height:50px;
}

/*
.drag-handle svg{
  pointer-events: none;
  color: black;
}*/

.drag-handle.hint:hover::after{
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

.menu-icon::after{
  font-family: "FontAwesome";
  font-weight: 900; 
  content: "\f0c9";
  color: #000000;
  font-size: 1.4em;
  vertical-align: middle;
  pointer-events: none;
}

.drag-handle:hover .menu-icon::after{
  content: "\f07d";
  pointer-events: none;
}

.grabbing .menu-icon::after{
  content: "\f07d";
  pointer-events: none;
}
.menu-icon{
   pointer-events: none;
}

</style>
