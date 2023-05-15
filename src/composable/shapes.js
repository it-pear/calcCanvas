import { fabric } from 'fabric';

export const createRectangle = (startX, startY, fillColor = 'red') => {
  return new fabric.Rect({
    left: startX,
    top: startY,
    width: 0,
    height: 0,
    fill: fillColor,
  })
}

export const createCircle = (startX, startY, fillColor = 'blue') => {
  return new fabric.Circle({
    left: startX,
    top: startY,
    radius: 0,
    fill: fillColor,
  })
}

