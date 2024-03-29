export const updateRectangle = (activeShape, startX, startY, clientX, clientY) => {
  activeShape.set({
    width: clientX - startX,
    height: clientY - startY,
  })
}

export const updateCircle = (activeShape, startX, startY, clientX, clientY) => {
  const radius = Math.sqrt(
    Math.pow(startX - clientX, 2) + Math.pow(startY - clientY, 2)
  ) / 2
  activeShape.set({ radius, left: startX, top: startY })
}

export const updateArc = (activeShape, startX, startY, clientX, clientY) => {
  const radius = Math.sqrt(Math.pow(startX - clientX, 2) + Math.pow(startY - clientY, 2));
  const angle = Math.atan2(clientY - startY, clientX - startX) * 180 / Math.PI;
  activeShape.set({ radius: radius, endAngle: angle });
}