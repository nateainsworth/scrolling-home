<script setup lang="ts">
import { ref } from 'vue'
import Gallery from '../components/Gallery.vue'

const props = defineProps({
  isDragging: Boolean,
  activePage: String,
  pageName:String,
});

const page = ref('');

defineExpose({
 page
})

const createWith = ['Asp.net', 'Signal R', 'MySQL', 'Bootstrap', 'Chart.js'];

</script>
<template>
  <div ref="page" class='page-box' :class="{'drag-view': props.isDragging}" v-if="props.activePage == props.pageName || props.isDragging">
    <div class='page-main'>
      <div class="title-area">
        <h2>Hallam Chat</h2>
        <p>Chat Application built in Java</p>
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
            <h2>Hallam Chat</h2>
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
      
      <v-container>
        <v-row
            align="center"
            class="pa-2 ma-2"
        >
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <h2>Screen Shots</h2>
            <hr/>
          </v-col>
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <Gallery/>
          </v-col>
        </v-row>
      </v-container>
      
      <v-container>
        <v-row
            align="center"
            class="pa-2 ma-2"
        >
          <v-col
            cols="12"
            style="text-align:left;"
          >
            <h2>Created With</h2>
            <hr/>
          </v-col>
          <v-col v-for="(text, index) in createWith"
            xs="6"
            sm="3"
            lg="2"

            class="pa-2"
            :key="index"
          >
            <div class="card pa-2">
              <p>{{text}}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
          
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
  background: url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80') left;
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
</style>