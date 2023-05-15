
export default async function useInitShape(shape, coordinates) {
  if (!!shape === false) {
    return false
  }

  const newShape = {
    type: shape,
    x: coordinates.x,
    y: coordinates.y,
    color: 'black',
  }

  return newShape
}