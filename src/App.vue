<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
  @import '/public/fonts/lato';
  body {
  font-family: 'Lato', sans-serif !important;
} 
</style>
