export default {

  // определение текущей функции
  currentFunction(state, val) {
    state.activeAction = val
  },

  // Добавление новой фигуры в массив
  addShape(state, shape) {
    console.log(shape)
    state.shapes.push(shape) 
  },

  
}
