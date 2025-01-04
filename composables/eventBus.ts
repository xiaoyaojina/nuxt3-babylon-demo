import mitt from'mitt'

export const EventBus = mitt()

export const EVENT_TYPE = {
  SET_CUR_SELECT_MESH: 'SET_CUR_SELECT_MESH',
  SET_SCENE_MANAGE: 'SET_SCENE_MANAGE'
}

let curSelectMesh = ref(null) 
let sceneManage = ref(null)


export const getCurSelectMesh = () => {
  return curSelectMesh.value
}

export const setCurSelectMesh = (mesh: any) => {
  curSelectMesh.value = mesh
  EventBus.emit(EVENT_TYPE.SET_CUR_SELECT_MESH, mesh)
}

export const getSceneManage = () => {
  return sceneManage.value
}

export const setSceneManage = (manager: any) => {
  sceneManage.value = manager
  EventBus.emit(EVENT_TYPE.SET_SCENE_MANAGE, sceneManage.value)
}
