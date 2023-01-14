<template>
  <div class="mini-dashboard">
    <div class="item">
      <div class="title">Количество фигур:</div>
      <ul>
        <li>Элемент 1</li>
        <li>Элемент 1</li>
        <li>Элемент 1</li>
        <li>Элемент 1</li>
        <li>Элемент 1</li>
        <li>Элемент 1</li>
      </ul>
    </div>
    <div class="item">
      <div class="title">Площади фигур:</div>
      <ul>
        <li>S1=80 м2</li>
        <li>S1=80 м2</li>
        <li>S1=80 м2</li>
        <li>S1=80 м2</li>
        <li>S1=80 м2</li>
        <li>S1=80 м2</li>
      </ul>
    </div>
    <div class="item">
      <div class="title">Объемы фигур:</div>
      <ul>
        <li>V1=80 м3</li>
        <li>V1=80 м3</li>
        <li>V1=80 м3</li>
        <li>V1=80 м3</li>
        <li>V1=80 м3</li>
        <li>V1=80 м3</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'MiniDashboard',
  components: {
    
  },
  setup() {
    
    return {
      
    }
  }
})
</script>