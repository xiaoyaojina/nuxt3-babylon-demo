<template>
  <canvas id="myCanvas" style="width: 100%; height: 100%"></canvas>
</template>

<script lang="ts" setup>
import { SceneManage } from '#imports';
import { Engine, Scene } from '@babylonjs/core';
let engine: Engine;
let scene: Scene;
const sceneManage = ref<SceneManage>();

const pointerDown = (event: any) => {
  if(sceneManage.value) {
    const mesh = sceneManage.value.pointerDown(event)
    if(mesh) {
      setCurSelectMesh(mesh)
    }
  }
}

onMounted(async () => {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  try {
    sceneManage.value = new SceneManage(canvas)
    scene = sceneManage.value.scene
    console.log(`scene=`, scene)
    await nextTick();
    setSceneManage(sceneManage.value)
    
    canvas.addEventListener("pointerdown", pointerDown);
  } catch (error) {
    console.log(`init sceneManage err`, error);
  }
})
</script>

<style lang="scss" scoped>
#myCanvas{
  background-color: #000;
}
#myCanvas:focus {
  outline: none; 
}
</style>
