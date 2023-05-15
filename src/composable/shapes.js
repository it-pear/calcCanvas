import { fabric } from 'fabric';

export default {
  rectangle(startPoints) {
    return new fabric.Rect({
      left: startPoints.x,
      top: startPoints.y,
      width: 0,
      height: 0,
      fill: 'red',
    });
  },
  circle(startPoints) {
    return new fabric.Circle({
      left: startPoints.x,
      top: startPoints.y,
      radius: 0,
      fill: 'blue',
    });
  },
  // Добавьте здесь больше фигур по мере необходимости...
}
