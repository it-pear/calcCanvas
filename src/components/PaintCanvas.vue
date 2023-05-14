<template>
  <div class="get-paint">
    {{repository}}
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue'
  import { useStore } from 'vuex'

  // инициализируем store
  const store = useStore()
  const repository = computed(() => store.state.canvas)


  // координаты мыши в разных состояниях
  const currentCursor = ref({x: null,y: null})
  const startCoordinates = ref({x: null,y: null})
  const releaseCoordinates = ref({x: null,y: null})
  const differenceCoordinates = ref({width: null,height: null})

  const keyIsPressed = ref(false)
  const realTimeFigure = ref(null)
  
  // функция реалтайм d
  const handleMouseMove = (event) => {
    currentCursor.value.x = event.clientX
    currentCursor.value.y = event.clientY

    differenceCoordinates.value.width = currentCursor.value.x - startCoordinates.value.x
    differenceCoordinates.value.height = currentCursor.value.y - startCoordinates.value.y

    if (keyIsPressed.value && !!repository.value.activeAction) {
      customShape()
    }
  }

  // функция при нажатии мыши
  const handleMousePress = (event) => {
    startCoordinates.value.x = currentCursor.value.x
    startCoordinates.value.y = currentCursor.value.y

    if (event.repeat) {
      return
    }

    if (!keyIsPressed.value) {
      keyIsPressed.value = true
    }
  }

  // функция при отжатии мыши
  const handleMouseRelease = () => {
    keyIsPressed.value = false
    if (!!realTimeFigure.value) store.commit('canvas/addShape', realTimeFigure.value)
    realTimeFigure.value = null
    // releaseCoordinates.value.x = currentCursor.value.x
    // releaseCoordinates.value.y = currentCursor.value.y
  }

  

  // функция перерисовки холста
  const drawShapes = () => {
    const ctx = canvas.value.getContext('2d')
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    repository.value.shapes.forEach((shape) => {
      ctx.fillStyle = shape.color
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
    })
  }

  // функция перерисовки одной реалтайм фигуры
  const drawShape = (figure) => {
    const ctx = canvas.value.getContext('2d')
    // ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    realTimeFigure.value = figure
    
    ctx.fillStyle = figure.color
    ctx.fillRect(figure.x, figure.y, figure.width, figure.height)
  }




  // функция обработки фигуры
  const customShape = async () => {    
    const resp = await store.dispatch('canvas/initShape', [startCoordinates.value, differenceCoordinates.value])
    drawShape(resp)
    
    // drawShapes()
  }




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

  // монтирование функций
  onMounted(() => {
    setupCanvas()
    canvas.value.addEventListener('mousemove', handleMouseMove)
    canvas.value.addEventListener('mousedown', handleMousePress)
    canvas.value.addEventListener('mouseup', handleMouseRelease)
    // canvas.value.addEventListener('click', customShape)
  })


</script>