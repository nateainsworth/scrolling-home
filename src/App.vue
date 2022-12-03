<script setup lang="ts">
import { ref,nextTick } from 'vue'

  const clamp = (num, lower = 0, upper) => {
    return num < lower ? lower : num > upper ? upper : num;
  }; 
  
  const page1 = ref('');
  const page2 = ref('');
  const page3 = ref('');
  const message =  ref('Hello World');
  const isDragging = ref(false);
  const dragItemTop = ref('5px')
  const dragItemCoords = ref({
        top: 5,
        left:  5,
      });
  const boundary = ref('');
  const draggable = ref('');
  const pagecont = ref('');
  const pageTrigger = ref([]);

isDragging.value = true;
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
     
        let jumpToPage = 0;
        isDragging.value = false;
        
        //console.log(page2.value.offsetTop - page2.value.clientHeight /2 );
        pageTrigger.value = [page2.value.offsetTop/1.5, page2.value.offsetTop - page2.value.clientHeight /3,page3.value.offsetTop - page3.value.clientHeight /3];

        /*
	this.pages = [this.$refs.page2.offsetTop/1.5,this.$refs.page2.offsetTop - this.$refs.page2.clientHeight /3,this.$refs.page3.offsetTop - this.$refs.page3.clientHeight /3];
        */

        console.log(pageTrigger);
        
        console.log('mouse up triggered');
        //console.log('off set =  ',page1.value.offsetTop);
        if( pageTrigger.value[0] > pagecont.value.scrollTop){
          console.log("page 1");
          console.log(pageTrigger.value[0] , '  :  ', pagecont.value.scrollTop)
          nextTick(() => {
            jumpToPage = page1.value.offsetTop;
            pagecont.value.scrollTop = jumpToPage;
          });
        }else if (pageTrigger.value[1] < pagecont.value.scrollTop && pageTrigger.value[2] > pagecont.value.scrollTop){
          console.log("page 2");
          nextTick(() => {
            jumpToPage = page2.value.offsetTop;
            pagecont.value.scrollTop = jumpToPage;
          });
          console.log(pageTrigger.value[0] , '  :  ', pagecont.value.scrollTop)
        }else if(pageTrigger.value[2] < pagecont.value.scrollTop){
          console.log("page 3");
          nextTick(() => {
            jumpToPage = page3.value.offsetTop;
            pagecont.value.scrollTop = jumpToPage;
          });
          console.log(page1.value , '  =  ', pagecont.value.scrollTop)
        }
        
        console.log(pageTrigger.value[1] , '  =  ', pagecont.value.scrollTop)
        

      }
    
      const findPositionInsideBound = (e) => {
        const x = e.clientX - (draggable.value.clientWidth/2);
        const y = e.clientY - (draggable.value.clientHeight/2); 
        
        return clampInsideBoundary(x, y);
      }

      const handleMouseDown = (e) => {
        e.preventDefault();
        if (e.target === draggable.value) {
          isDragging.value = true;  
          /*draggable.addEventListener("mouseup", handleMouseUp(), { passive =  true }); */
        }
      }

      const handleMouseMove = (e) => {
        
        if (isDragging.value) {
          const position = findPositionInsideBound(e);
          
          dragItemCoords.value = {left: position.x, top: position.y };
          console.log(dragItemCoords.value)
          dragItemTop.value = position.y + 'px';
          const percentage =  draggable.value.clientHeight / 100 * (position.y);
          //console.log( percentage , '%');
          //console.log(pagecont.scrollTop / 100 * percentage);
          pagecont.value.scrollTop = pagecont.value.scrollHeight / 100 * percentage;//pagecont.scrollTop + position.y;
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
           :class="{'grabbing': isDragging}"></div>    <!--  :style="draggablePosition" -->
    </div>
    <div ref="pagecont" class="page-container" >
      <div ref="page1" class='page-box' style="background:green;" :class="{'drag-view': isDragging}, {'fixed-view': !isDragging}">
        <div class='page-main' style="background:green;" :class="{'drag-view': isDragging}"><h1>Title</h1></div>
        <div class="page-contents" v-if="!isDragging">
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur augue nulla, posuere sed cursus in, gravida porta felis. Vestibulum nec lacinia mi. Cras sollicitudin dolor a orci tristique, id porttitor ligula tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vel placerat turpis. Vestibulum venenatis rutrum bibendum. Aenean vulputate ex ac ornare placerat. Aliquam feugiat nisl sit amet dui dignissim, nec maximus quam tincidunt. Suspendisse blandit felis at mi interdum sodales. Duis sagittis tortor sollicitudin dapibus fringilla. Phasellus molestie leo turpis, et elementum nisl ultrices elementum. Aliquam in lacus quis purus tincidunt finibus quis vitae ex. Proin lacinia ullamcorper arcu, in finibus leo tristique ac. Maecenas et enim in lorem pretium dapibus vitae et tellus. Vestibulum cursus malesuada quam.
          </h2>
          </div>
      </div>
      <div ref="page2" class='page-box' style="background:purple;" :class="{'drag-view': isDragging}"></div>
      <div ref="page3" class='page-box' style="background:red;" :class="{'drag-view': isDragging}"></div>
      <div class='page-box whitespace'></div>
    </div>
  </div>
</div>
</template>

<style scoped>
.boundary-box{
    position: fixed;
    top: 25vh;
    right: 0px;
    width: 80px;
    height: 50vh;

}

.drag-handle{
  width:60px;
  height:60px;
  border-radius: 50%;
  background-color:#ffffff;
  top: v-bind('dragItemTop');
  position: absolute;
  cursor: -webkit-grab; 
  cursor: grab;
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
  margin-left: 5vw;
  margin-top: 5vw;
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
