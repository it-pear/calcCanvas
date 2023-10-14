<template>
  <div class="get-paint">
    <div style="z-index: 3" class="info">{{repository}}</div>
    <canvas id="backgroundGridCanvas" ref="backgroundGridCanvas"></canvas>
    <canvas ref="backgroundCanvas"></canvas>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
  import { fabric } from 'fabric'

  import { ref, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { createRectangle, createCircle, createArc } from 'src/composable/shapes.js'
  import { updateRectangle, updateCircle, updateArc } from 'src/composable/shapesModified.js'

  const store = useStore()
  const canvas = ref(null)
  const repository = computed(() => store.state.canvas)
  const canvasRender = ref(null)

  let isResizing = false;  // Флаг, указывающий на то, растягивается ли объект
  let activeEdge = null;

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

    const { offsetX, offsetY } = options.e

    const x = Math.round(offsetX / gridSize) * gridSize
    const y = Math.round(offsetY / gridSize) * gridSize

    const distance = Math.sqrt(Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2))

    if (distance <= DotSize) {
      if (repository.value.activeAction === 'pouring' && repository.value.pouringColor !== null) {
        const { offsetX, offsetY } = options.e

        const x = Math.round(offsetX / gridSize) * gridSize
        const y = Math.round(offsetY / gridSize) * gridSize

        const targetObject = canvasRender.value.getObjects().find(obj => obj.containsPoint(new fabric.Point(x, y)))

        if (targetObject) {
          targetObject.set({ fill: repository.value.pouringColor })
          // Обновляем объект
          targetObject.dirty = true

          // Сбрасываем активный объект
          canvasRender.value.discardActiveObject().requestRenderAll()

          // Сохраняем обновленный объект в хранилище
          const updatedShape = targetObject.toJSON(['id', 'hasBorders', 'hasControls'])
          store.commit('canvas/updateShape', updatedShape)

          handleMouseUp()
        }
      } else {
        startPoints.value.x = x;
        startPoints.value.y = y;

        switch (repository.value.activeAction) {
          case 'circleline':
            activeShape.value = createArc(x, y)
            break
          case 'rectangle':
            activeShape.value = createRectangle(x, y)
            break
          case 'circle':
            activeShape.value = createCircle(x, y)
            break
          case 'pencil':
            if (isDrawing.value && activeLine.value) {
              if (Math.abs(x - linePoints.value[0].x) < 50 && Math.abs(y - linePoints.value[0].y) < 50) {
                // Завершить рисунок, если мы вернулись к исходной точке
                isDrawing.value = false
                activeShape.value = new fabric.Polygon(linePoints.value, { fill: 'transparent', stroke: 'blue' })

                canvasRender.value.add(activeShape.value)
                canvasRender.value.remove(activeLine.value)  // удаляем активную линию
                linePoints.value = []
                activeLine.value = null

              } else {
                linePoints.value.push({ x: x, y: y })
                activeLine.value.set({ x2: x, y2: y })
                activeLine.value = new fabric.Line([x, y, x, y], { stroke: 'blue', selectable: false }) // создаем новую линию
                canvasRender.value.add(activeLine.value) // добавляем новую линию на холст
              }
            } else {
              isDrawing.value = true
              linePoints.value.push({ x: x, y: y })
              activeLine.value = new fabric.Line([x, y, x, y], { stroke: 'blue', selectable: false })
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
    }
  }


  // функция перемещения мыши при создании объекта
  const handleMouseMove = (options) => {
    const { offsetX, offsetY } = options.e

    const x = Math.round(offsetX / gridSize) * gridSize
    const y = Math.round(offsetY / gridSize) * gridSize

    const distance = Math.sqrt(Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2))

    if (distance <= DotSize) {
      if (repository.value.activeAction === 'pencil' && isDrawing.value && activeLine.value) {
        activeLine.value.set({ x2: x, y2: y })
        canvasRender.value.renderAll()
      } else {
        if (!activeShape.value) return

        switch (repository.value.activeAction) {
          case 'circleline':
            updateArc(activeShape.value, startPoints.value.x, startPoints.value.y, x, y)
            break
          case 'rectangle':
            updateRectangle(activeShape.value, startPoints.value.x, startPoints.value.y, x, y)
            break
          case 'circle':
            updateCircle(activeShape.value, startPoints.value.x, startPoints.value.y, x, y)
            break
          default:
            console.error(`Unknown shape type: ${repository.value.activeAction}`)
            return
        }
      }

      canvasRender.value.renderAll()
    }
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
          uniScaleTransform: false,
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

  const handleResizeMouseDown = (event) => {
    const activeObject = canvasRender.value.getActiveObject();
    if (!activeObject) return;

    const { offsetX, offsetY } = event.e;
    const boundingRect = activeObject.getBoundingRect();

    // Проверяем, наведен ли курсор на края объекта
    if (offsetX >= boundingRect.left && offsetX <= boundingRect.left + boundingRect.width) {
        if (Math.abs(offsetY - boundingRect.top) < 10) {
            isResizing = true;
            activeEdge = 'top';
        } else if (Math.abs(offsetY - (boundingRect.top + boundingRect.height)) < 10) {
            isResizing = true;
            activeEdge = 'bottom';
        }
    }

    if (offsetY >= boundingRect.top && offsetY <= boundingRect.top + boundingRect.height) {
        if (Math.abs(offsetX - boundingRect.left) < 10) {
            isResizing = true;
            activeEdge = 'left';
        } else if (Math.abs(offsetX - (boundingRect.left + boundingRect.width)) < 10) {
            isResizing = true;
            activeEdge = 'right';
        }
    }

    // Если активен процесс изменения размера, запретить перемещение объекта
    if (isResizing) {
        activeObject.lockMovementX = true;
        activeObject.lockMovementY = true;
    }
}

  const handleResizeMouseMove = (event) => {
    const activeObject = canvasRender.value.getActiveObject();
    if (!activeObject || !isResizing) return;

    const { offsetX, offsetY } = event.e;
    const boundingRect = activeObject.getBoundingRect();
    const originalWidth = boundingRect.width / activeObject.scaleX;
    const originalHeight = boundingRect.height / activeObject.scaleY;

    switch (activeEdge) {
      case 'top':
        const deltaYTop = offsetY - boundingRect.top;
        const newScaleYTop = deltaYTop / originalHeight;
        activeObject.set({
            scaleY: newScaleYTop
        });
        break;
      case 'bottom':
        const deltaYBottom = offsetY - boundingRect.top;
        const newScaleYBottom = deltaYBottom / originalHeight;
        activeObject.set({
            scaleY: newScaleYBottom
        });
        break;
      case 'left':
        const deltaXLeft = offsetX - boundingRect.left;
        const newScaleXLeft = deltaXLeft / originalWidth;
        activeObject.set({
            scaleX: newScaleXLeft
        });
        break;
      case 'right':
        const deltaXRight = offsetX - boundingRect.left;
        const newScaleXRight = deltaXRight / originalWidth;
        activeObject.set({
            scaleX: newScaleXRight
        });
        break;
    }

    activeObject.setCoords();  // Обновляем координаты объекта
    canvasRender.value.renderAll();
  }

  const handleResizeMouseUp = () => {
    const activeObject = canvasRender.value.getActiveObject();
    if (activeObject) {
      // Разрешаем перемещение объекта
      activeObject.lockMovementX = false;
      activeObject.lockMovementY = false;

      // Сохраняем измененный объект в хранилище
      handleObjectModified({ target: activeObject });
    }

    isResizing = false;
    activeEdge = null;
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
  const DotSize = 6

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
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fill();
    }
  }

  // интерактивная сетка
  const backgroundGridCanvas = ref(null)
  const drawGrid = () => {
    const ctx = backgroundGridCanvas.value.getContext('2d')

    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight - 58

    ctx.clearRect(0, 0, canvasWidth, canvasHeight) // Очищаем предыдущую сетку

    for (let x = gridSize; x < canvasWidth; x += gridSize) {
      for (let y = gridSize; y < canvasHeight; y += gridSize) {
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)  // Размер точек сетки
        ctx.fillStyle = 'rgba(0,0,0,0.5)'  // Цвет точек сетки
        ctx.fill()
      }
    }
  }

  // монтирование
  onMounted(() => {
    getNet()

    canvasRender.value = new fabric.Canvas(canvas.value)
    canvasRender.value.setWidth(window.innerWidth)
    canvasRender.value.setHeight(window.innerHeight - 58)

    redrawCanvas()

    // canvasRender.value.on('mouse:down', handleMouseDown)
    // canvasRender.value.on('mouse:move', handleMouseMove)


    canvasRender.value.on('mouse:down', (event) => {
      if (repository.value.activeAction === 'cursor') {
          handleResizeMouseDown(event);
      } else {
          // блокировать перемещение, масштабирование и поворот объектов
        canvasRender.value.forEachObject((obj) => {
          obj.lockMovementX = true;
          obj.lockMovementY = true;
          obj.lockScalingX = true;
          obj.lockScalingY = true;
          obj.lockRotation = true;
          obj.hasControls = false;
          obj.hasBorders = false;
        })
        handleMouseDown(event)
      }
    })

    canvasRender.value.on('mouse:move', (event) => {
    const { offsetX, offsetY } = event.e;

    const x = Math.round(offsetX / gridSize) * gridSize;
    const y = Math.round(offsetY / gridSize) * gridSize;

    const distance = Math.sqrt(Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2));

    if (distance <= DotSize) {
        if (repository.value.activeAction === 'cursor') {
            const activeObject = canvasRender.value.getActiveObject();
            if (isResizing && activeObject) {
                const boundingRect = activeObject.getBoundingRect();

                // Начальные размеры объекта (при его создании)
                const originalWidth = boundingRect.width / activeObject.scaleX;
                const originalHeight = boundingRect.height / activeObject.scaleY;

                switch (activeEdge) {
                  case 'top':
                    const scaleYTop = (originalHeight + (boundingRect.top - offsetY)) / originalHeight;
                    activeObject.set({
                        top: offsetY,
                        scaleY: scaleYTop
                    });
                    break;
                  case 'bottom':
                    const scaleYBottom = (offsetY - boundingRect.top) / originalHeight;
                    activeObject.set({
                        scaleY: scaleYBottom
                    });
                    break;
                  case 'left':
                    const scaleXLeft = (originalWidth + (boundingRect.left - offsetX)) / originalWidth;
                    activeObject.set({
                        left: offsetX,
                        scaleX: scaleXLeft
                    });
                    break;
                  case 'right':
                    const scaleXRight = (offsetX - boundingRect.left) / originalWidth;
                    activeObject.set({
                        scaleX: scaleXRight
                    });
                    break;
                }

                activeObject.setCoords();  // Обновляем координаты объекта
                canvasRender.value.renderAll();
            } else {
                handleResizeMouseMove(event);
            }
        } else {
            handleMouseMove(event);
        }
    }
});

    canvasRender.value.on('mouse:up', (event) => {
        handleMouseUp(event);
        handleResizeMouseUp(event); // Этот обработчик просто сбрасывает флаги, поэтому его безопасно вызывать всегда
    })

    canvasRender.value.on('mouse:over', (event) => {
      const { offsetX, offsetY } = event.e;
      const activeObject = canvasRender.value.getActiveObject();
      if (!activeObject) return;

      const boundingRect = activeObject.getBoundingRect();

      // Проверяем, наведен ли курсор на края объекта, и меняем курсор соответственно
      if (Math.abs(offsetY - boundingRect.top) < 10 || Math.abs(offsetY - (boundingRect.top + boundingRect.height)) < 10) {
        canvasRender.value.defaultCursor = 'ns-resize';
      } else if (Math.abs(offsetX - boundingRect.left) < 10 || Math.abs(offsetX - (boundingRect.left + boundingRect.width)) < 10) {
        canvasRender.value.defaultCursor = 'ew-resize';
      } else {
        canvasRender.value.defaultCursor = 'default';
      }
    })

    canvasRender.value.on('object:modified', handleObjectModified)
    window.addEventListener('keydown', handleKeyDown)

    backgroundGridCanvas.value.width = window.innerWidth
    backgroundGridCanvas.value.height = window.innerHeight - 58

    drawGrid()

  })

</script>
