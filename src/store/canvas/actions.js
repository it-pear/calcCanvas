import useInitShape from 'src/composable/useInitShape'

export default {
  async initShape({ commit, state }, coordinates) {
    const shape = await useInitShape(state.activeAction, coordinates)
    if (shape) commit('addShape', shape)
  }
}
