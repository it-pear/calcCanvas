<template>
  <div class="get-paint">
    <div style="z-index: 3" class="info">{{repository}}</div>
    <canvas ref="canvas"></canvas>
  </div> 
</template>

<script setup>
  import { fabric } from 'fabric'
  import { ref, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { createRectangle, createCircle } from 'src/composable/shapes.js'
  import { updateRectangle, updateCircle } from 'src/composable/shapesModified.js'

  const store = useStore()
  const canvas = ref(null)
  const repository = computed(() => store.state.canvas)
  const canvasRender = ref(null)

  const startPoints = ref({ x: 0, y: 0 })
  const activeShape = ref(null)
  

  // переменные для рисования линий многоугольника
  let linePoints = ref([])
  let activeLine = ref(null)
  let isDrawing = ref(false)

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
        activeShape.value = createRectangle(startPoints.value.x, startPoints.value.y)
        break
      case 'rectangle':
        activeShape.value = createRectangle(startPoints.value.x, startPoints.value.y)
        break
      case 'circle':
        activeShape.value = createCircle(startPoints.value.x, startPoints.value.y)
        break
      case 'pencil':
        if (isDrawing.value && activeLine.value) {
          if (Math.abs(clientX - linePoints.value[0].x) < 50 && Math.abs(clientY - linePoints.value[0].y) < 50) {
            // Завершить рисунок, если мы вернулись к исходной точке
            isDrawing.value = false
            activeShape.value = new fabric.Polygon(linePoints.value, { fill: 'transparent', stroke: 'blue' })

            canvasRender.value.add(activeShape.value)
            canvasRender.value.remove(activeLine.value)  // удаляем активную линию
            linePoints.value = []
            activeLine.value = null

          } else {
            linePoints.value.push({ x: clientX, y: clientY })
            activeLine.value.set({ x2: clientX, y2: clientY })
            activeLine.value = new fabric.Line([clientX, clientY, clientX, clientY], { stroke: 'blue', selectable: false }) // создаем новую линию
            canvasRender.value.add(activeLine.value) // добавляем новую линию на холст
          }
        } else {
          isDrawing.value = true
          linePoints.value.push({ x: clientX, y: clientY })
          activeLine.value = new fabric.Line([clientX, clientY, clientX, clientY], { stroke: 'blue', selectable: false })
          canvasRender.value.add(activeLine.value)
        }
        break
      default:
        console.error(`Unknown shape type: ${repository.value.activeAction}`)
        return
    }

    if (activeShape.value) {
      canvasRender.value.add(activeShape.value)
    }
  }

  // функция перемещения мыши при создании объекта
  const handleMouseMove = (options) => {
    if (canvasRender.value.getActiveObject()) {
      return
    }

    const { clientX, clientY } = options.e

    if (repository.value.activeAction === 'pencil' && isDrawing.value && activeLine.value) {
      activeLine.value.set({ x2: clientX, y2: clientY })
      canvasRender.value.renderAll()
    } else {
      if (!activeShape.value) return

      switch (repository.value.activeAction) {
        case 'rectangle':
          updateRectangle(activeShape.value, startPoints.value.x, startPoints.value.y, clientX, clientY)
          break
        case 'circle':
          updateCircle(activeShape.value, startPoints.value.x, startPoints.value.y, clientX, clientY)
          break
        default:
          console.error(`Unknown shape type: ${repository.value.activeAction}`)
          return
      }
    }
    canvasRender.value.renderAll()
  }

  // функция отклика мыши при создании нового объекта
  const handleMouseUp = () => {
    if (activeShape.value && activeShape.value.set) {
      const id = store.getters['canvas/nextId']
      activeShape.value.set('id', id)

      // Обратите внимание на изменение здесь:
      const shapeJSON = activeShape.value.toJSON(['id', 'hasBorders', 'hasControls'])
      
      store.commit('canvas/addShape', shapeJSON)
      activeShape.value = null

      redrawCanvas()
    }
  }


  // функция перерисовки холста 
  const redrawCanvas = () => {
    canvasRender.value.clear() 

    const shapes = store.state.canvas.shapes 

    fabric.util.enlivenObjects(shapes, (objects) => {
      objects.forEach((shape) => {
        shape.set({
          hasBorders: true,
          hasControls: true,
        })
        canvasRender.value.add(shape)
      })
    })
  }


  // манипуляции с объектом
  const handleObjectModified = (options) => {
    const updatedShape = options.target.toJSON(['id'])
    store.commit('canvas/updateShape', updatedShape)
  }


  // удаление объекта
  const deleteObject = () => {
    const activeObject = canvasRender.value.getActiveObject()
    if (activeObject) {
      canvasRender.value.remove(activeObject)
      store.commit('canvas/removeShape', activeObject.id) 
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Delete') {
      deleteObject()
    }
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
    window.addEventListener('keydown', handleKeyDown)

  })
</script>