import useInitShape from 'src/composable/useInitShape'

export default {
  async initShape({ commit, state }, [coordinates, size]) {

    if (!!state.activeAction && state.activeAction === 'rectangle') {
      const shape = await useInitShape(state.activeAction, coordinates, size)
      
      return shape
    } 

  }
}
