<template>
  <q-page class="flex flex-center">
    <PaintCanvas />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import PaintCanvas from 'components/PaintCanvas'

export default defineComponent({
  name: 'IndexPage',
  components: {
    PaintCanvas
  }
})
</script>
