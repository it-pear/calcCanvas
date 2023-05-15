<template>
  <div class="get-paint">
    <div style="z-index: 3;" class="info">{{repository}}</div>
    <canvas ref="canvas"></canvas>
  </div> 
</template>

<script setup>
import { fabric } from 'fabric'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import shapes from 'src/composable/shapes.js';

const store = useStore()
const canvas = ref(null)
const repository = computed(() => store.state.canvas)
const canvasRender = ref(null)

// фигурки 


const startPoints = ref({ x: 0, y: 0 })
const activeShape = ref(null)



// функция клика по мышки в удержанном состоянии
const handleMouseDown = (options) => {
  if (canvasRender.value.getActiveObject()) {
    return
  }

  const { clientX, clientY } = options.e
  startPoints.value.x = clientX
  startPoints.value.y = clientY
  
  switch (repository.value.activeAction) {
    case 'rectangle':
      activeShape.value = new fabric.Rect({
        left: startPoints.value.x,
        top: startPoints.value.y,
        width: 0,
        height: 0,
        fill: 'red',
      })
      break
    case 'circle':
      activeShape.value = new fabric.Circle({
        left: startPoints.value.x,
        top: startPoints.value.y,
        radius: 0,
        fill: 'blue',
      })
      break
    default:
      console.error(`Unknown shape type: ${repository.value.activeAction}`)
      return
  }

  canvasRender.value.add(activeShape.value)
}

// функция перемещения маши при создании объекта
const handleMouseMove = (options) => {
  if (canvasRender.value.getActiveObject()) {
    return
  }

  if (!activeShape.value) return
  const { clientX, clientY } = options.e

  switch (repository.value.activeAction) {
    case 'rectangle':
      activeShape.value.set({
        width: clientX - startPoints.value.x,
        height: clientY - startPoints.value.y,
      })
      break
    case 'circle':
      const radius = Math.sqrt(
        Math.pow(startPoints.value.x - clientX, 2) + Math.pow(startPoints.value.y - clientY, 2)
      ) / 2
      activeShape.value.set({ radius, left: startPoints.value.x, top: startPoints.value.y })
      break
    default:
      console.error(`Unknown shape type: ${repository.value.activeAction}`)
      return
  }
  canvasRender.value.renderAll()
}

// функция отклика мыши при создании нового объекта
const handleMouseUp = () => {
  if (activeShape.value) {
    const shapeJSON = activeShape.value.toJSON()
    store.commit('canvas/addShape', shapeJSON)
    activeShape.value = null
  }
}

// манипуляции с объектом
const handleObjectModified = (options) => {
  const modifiedShape = options.target
  store.commit('canvas/updateShape', { id: modifiedShape.id, properties: modifiedShape.toJSON() })
}

// монтирование
onMounted(() => {
  canvasRender.value = new fabric.Canvas(canvas.value)
  canvasRender.value.setWidth(window.innerWidth)
  canvasRender.value.setHeight(window.innerHeight - 58)
  
  canvasRender.value.on('mouse:down', handleMouseDown)
  canvasRender.value.on('mouse:move', handleMouseMove)
  canvasRender.value.on('mouse:up', handleMouseUp)

  canvasRender.value.on('object:modified', handleObjectModified)

  // Включить обратно возможность выбора и изменения объектов
  canvasRender.value.forEachObject((obj) => {
    obj.set({ selectable: true })
  })
})
</script>