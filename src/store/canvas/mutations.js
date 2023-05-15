export default {

  // определение текущей функции
  currentFunction(state, val) {
    state.activeAction = val
  },

  // Добавление новой фигуры в массив
  addShape(state, shape) {
    shape.id = state.nextId
    state.shapes.push(shape) 
    state.nextId++
  },

  incrementId(state) {
    state.nextId++
  },

  updateShape(state, updatedShape) {
    console.log(updatedShape)
    const shapeIndex = state.shapes.findIndex(shape => shape.id === updatedShape.id)
    if (shapeIndex !== -1) {
      state.shapes[shapeIndex] = updatedShape
    } else {
      console.error(`Shape with id ${updatedShape.id} not found in state.shapes`)
    }
  },

  removeShape(state, shapeId) {
    const shapeIndex = state.shapes.findIndex(shape => shape.id === shapeId);
    if (shapeIndex !== -1) {
      state.shapes.splice(shapeIndex, 1);
    }
  },

}
