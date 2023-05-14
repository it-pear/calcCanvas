
export default async function useInitShape(shape, coordinates, size) {
  if (!!shape === false) {
    return false
  }

  const newRectangle = {
    type: shape,
    x: coordinates.x,
    y: coordinates.y,
    color: 'black',
    width: size.width,
    height: size.height,
  }

  return newRectangle
}