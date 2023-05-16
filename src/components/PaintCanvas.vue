<template>
  <div class="get-paint">
    <div style="z-index: 3" class="info">{{repository}}</div>
    <canvas ref="backgroundCanvas"></canvas>
    <canvas ref="canvas"></canvas>
  </div> 
</template>

<script setup>
  import { fabric } from 'fabric'

  import { ref, onMounted, computed, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { createRectangle, createCircle, createArc } from 'src/composable/shapes.js'
  import { updateRectangle, updateCircle, updateArc } from 'src/composable/shapesModified.js'

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
    // if (canvasRender.value.getActiveObject()) {
    //   return
    // }
    

    const { clientX, clientY } = options.e
    startPoints.value.x = clientX
    startPoints.value.y = clientY

    switch (repository.value.activeAction) {
      case 'circleline':
        activeShape.value = createArc(startPoints.value.x, startPoints.value.y)
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
    // if (canvasRender.value.getActiveObject()) {
    //   return
    // }

    const { clientX, clientY } = options.e

    if (repository.value.activeAction === 'pencil' && isDrawing.value && activeLine.value) {
      activeLine.value.set({ x2: clientX, y2: clientY })
      canvasRender.value.renderAll()
    } else {
      if (!activeShape.value) return

      switch (repository.value.activeAction) {
        case 'circleline':
          updateArc(activeShape.value, startPoints.value.x, startPoints.value.y, clientX, clientY)
          break
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
      const shapeJSON = activeShape.value.toJSON(['id'])
      
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
          uniScaleTransform: false
        })
        

        shape.setControlsVisibility(true)

        canvasRender.value.add(shape)
      })
    })

    
  }


  // манипуляции с объектом
  const handleObjectModified = (options) => {
    const updatedShape = options.target.toJSON(['id', 'hasBorders', 'hasControls'])
    store.commit('canvas/updateShape', updatedShape)
  }


// метод изменения размера активного объекта
const resizeActiveObject = (direction) => {
  const activeObject = canvasRender.value.getActiveObject()
  if (activeObject) {
    const scaleX = activeObject.scaleX
    const scaleY = activeObject.scaleY
    activeObject.set({
      scaleX: direction === 'increase' ? scaleX * 1.1 : scaleX * 0.9,
      scaleY: direction === 'increase' ? scaleY * 1.1 : scaleY * 0.9
    })
    canvasRender.value.renderAll()
  }
}

// метод вращения активного объекта
const rotateActiveObject = (direction) => {
  const activeObject = canvasRender.value.getActiveObject()
  if (activeObject) {
    const rotation = activeObject.angle || 0
    activeObject.set({
      angle: direction === 'clockwise' ? rotation + 10 : rotation - 10
    })
    canvasRender.value.renderAll()
  }
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
    } else if (event.key === 'ArrowUp') {
    resizeActiveObject('increase')
  } else if (event.key === 'ArrowDown') {
    resizeActiveObject('decrease')
  } else if (event.key === 'ArrowLeft') {
    rotateActiveObject('counterclockwise')
  } else if (event.key === 'ArrowRight') {
    rotateActiveObject('clockwise')
  }


  }

  // СЕТКА
  const backgroundCanvas = ref(null)
  const gridSize = 10
  const DotSize = 2

  function getNet() {
    const ctx = backgroundCanvas.value.getContext('2d');

    // Рисование сетки точек на холсте сетки (backgroundCanvas)
    backgroundCanvas.value.width = window.innerWidth;
    backgroundCanvas.value.height = window.innerHeight - 58;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight - 58;

    for (let x = gridSize; x < canvasWidth; x += gridSize) {
      for (let y = gridSize; y < canvasHeight; y += gridSize) {
        drawPoint(ctx, x, y);
      }
    }

    function drawPoint(ctx, x, y) {
      ctx.beginPath();
      ctx.arc(x, y, DotSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
    }
  }


  // отслежнивание
  watchEffect(() => {
    // if (canvasRender.value) {
      
      
      // Разрешить изменение размера и вращение активного объекта
    
      // if (repository.value.activeAction === 'pointer') {
      //   canvasRender.value.forEachObject((object) => {
      //     object.set({
      //       lockMovementX: false,
      //       lockMovementY: false,
      //       selectable: true,
      //       scaleX: true,
      //       scaleY: true,
      //       lockRotation: false,
      //     }) 
      //   })
      // } else {
      //   canvasRender.value.forEachObject((object) => {
      //     object.set({ 
      //       lockMovementX: true, 
      //       lockMovementY: true, 
      //       selectable: false,
      //     })
      //   }) 
      // }

    //   canvasRender.value.renderAll() 
    // }
    
  })

  // монтирование
  onMounted(() => {
    getNet()

    canvasRender.value = new fabric.Canvas(canvas.value)
    canvasRender.value.setWidth(window.innerWidth)
    canvasRender.value.setHeight(window.innerHeight - 58)
    
    // canvasRender.value.on('mouse:down', handleMouseDown)
    // canvasRender.value.on('mouse:move', handleMouseMove)


    canvasRender.value.on('mouse:move', (event) => {
      const { offsetX, offsetY } = event.e

      const x = Math.round(offsetX / gridSize) * gridSize
      const y = Math.round(offsetY / gridSize) * gridSize

      const distance = Math.sqrt(Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2))

      if (distance <= DotSize) {
        if (repository.value.activeAction === 'cursor') {
          // вызовите функции для изменения размера и поворота фигур здесь
        } else {
          handleMouseMove(event)
        }
      }
    })

    canvasRender.value.on('mouse:down', (event) => {
      const { offsetX, offsetY } = event.e

      const x = Math.round(offsetX / gridSize) * gridSize
      const y = Math.round(offsetY / gridSize) * gridSize

      const distance = Math.sqrt(Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2))

      if (distance <= DotSize) {
        if (repository.value.activeAction === 'cursor') {
          // вызовите функции для изменения размера и поворота фигур здесь
        } else {
          handleMouseDown(event)
        }
      }
    })


    canvasRender.value.on('mouse:up', handleMouseUp)

    canvasRender.value.on('object:modified', handleObjectModified)
    window.addEventListener('keydown', handleKeyDown)

  })
</script>