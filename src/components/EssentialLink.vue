<template>
  <q-btn color="primary"
    v-for="item in btns"
    :key="item"
  >
  <div v-html="item.component"></div>
    <q-menu
      anchor="top right"
      self="top left"
    >
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>anchor="top right"</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>self="top left"</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { ref, defineComponent } from 'vue'
import comp from 'components/comp'

export default defineComponent({
  name: 'EssentialLink',
  components: {
    comp
  },
  setup() {
    const btns = ref([
      {
        title: '',
        icon: 'cursor',
      },
      {
        title: '',
        icon: 'line'
      },
      {
        title: '',
        icon: 'circleline'
      },
      {
        title: '',
        icon: 'pencil'
      },
      {
        title: '',
        icon: 'rectangle'
      },
      {
        title: '',
        icon: 'circle'
      },
      {
        title: '',
        icon: 'pointer'
      },
      {
        title: '',
        icon: 'back'
      },
      {
        title: '',
        icon: 'pouring'
      },
      {
        title: '',
        icon: 'settings'
      },
      {
        title: '',
        icon: 'close'
      },
    ])
    return {
      btns
    }
  }
})
</script>
