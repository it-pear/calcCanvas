export function drawRectangle(ctx, shape) {
  ctx.fillStyle = shape.color
  ctx.fillRect(shape.x, shape.y, 100, 100)
}

export function drawCircle(ctx, shape) {
  ctx.fillStyle = shape.color
  ctx.beginPath()
  ctx.arc(shape.x, shape.y, 50, 0, 2 * Math.PI)
  ctx.fill()
}