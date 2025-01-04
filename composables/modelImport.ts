import { appendSceneAsync, loadAssetContainerAsync, loadSceneAsync, Scene, SceneLoader } from "@babylonjs/core";
import '@babylonjs/loaders';
import { GLTF2Export } from 'babylonjs-serializers';

export const importBase64Model = async (base64: any, scene: Scene) => {
  SceneLoader.ShowLoadingScreen = false; 
  const assetContainer = await loadAssetContainerAsync(base64, scene);
  assetContainer.addAllToScene(); 
  console.log(`加载的assetContainer`, assetContainer);
  
  return assetContainer;
}

export const importModelGLTF = async (rootUrl: string, ) => {
  // const { meshes } = await SceneLoader.ImportMeshAsync('', rootUrl, fileName);
  const { meshes } = await SceneLoader.ImportMeshAsync('', rootUrl);
}

export const exportGLB = (scene: Scene, fileName: string) => {
  GLTF2Export.GLBAsync(scene, fileName).then((glb) => {
    glb.downloadFiles();
  });
}

