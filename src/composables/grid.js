export function getNet(canvas) {
  const ctx = canvas.getContext('2d');

  // ваш код для рисования сетки
}

export function drawGrid(canvas) {
  const ctx = canvas.getContext('2d');

  // ваш код для интерактивной сетки
}

export function drawPoint(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
}
