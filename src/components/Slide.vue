<script setup>
  const props = defineProps({
    imageURL: String,
  });

  console.log(props.imageURL)

</script>
<template>
  <div class="items"></div>
</template>
<style>
  .items{
    width:calc(100vw + 8px);
    height:100vh;
    background: v-bind('props.imageURL');
    background-size: cover;
  }
</style>