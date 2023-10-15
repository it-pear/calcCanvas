import { ref } from 'vue'

export function drawPoint(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
}

//  сетки для вида
export function getNet(backgroundCanvas, gridSize, DotSize) {
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

}

export function drawGrid(backgroundGridCanvas, gridSize, DotSize) {
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


