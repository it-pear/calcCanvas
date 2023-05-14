<template>
  <div class="get-paint">
    {{activeAction}}
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue'
  import { useStore } from 'vuex'

  // инициализируем store
  const store = useStore()
  const activeAction = computed(() => store.state.canvas)

  // координаты мыши
  const x = ref(0)
  const y = ref(0)
  const handleMouseMove = (event) => {
    x.value = event.clientX
    y.value = event.clientY
  }
  // Вычисляемые свойства для отображения координат
  // const mouseX = computed(() => x.value)
  // const mouseY = computed(() => y.value)

  
  // инициализация основного холста
  const canvas = ref(null)
  const setupCanvas = () => {
    const ctx = canvas.value.getContext('2d')

    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight - 58

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

    drawShapes()
  }

  // функция перерисовки холста
  const drawShapes = () => {
    const ctx = canvas.value.getContext('2d')
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    activeAction.value.shapes.forEach((shape) => {
      ctx.fillStyle = shape.color
      ctx.fillRect(shape.x, shape.y, 50, 50)
    })
  }

  // функция обработки при клике
  const customShape = async () => {    
    await store.dispatch('canvas/initShape', {x: x.value, y: y.value})
    drawShapes()
  }

  onMounted(() => {
    setupCanvas()
    canvas.value.addEventListener('mousemove', handleMouseMove)
    canvas.value.addEventListener('click', customShape)
  })


</script>