<template>
  <header class="fc-layout-header">
    <div class="fc-layout-header-left">
      <div class="fc-update">
        <NButton @click="triggerFileInput" class="fc-update-btn">导入模型</NButton>
        <input type="file" ref="fileInput" class="fc-update-input" accept=".glb,.gltf" @change="handleFileChange">
      </div>
      <NButton @click="exportScene">导出</NButton>
    </div>
  </header>
    <slot></slot>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';

const sceneManage = ref<any>(null)
const fileInput = ref<any>(null)
const inputValue = ref('')

const triggerFileInput = () => {
  fileInput.value.click();
};
const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result; 
      if(base64String) {
        const scene = sceneManage.value.scene
        const model = await importBase64Model(base64String, scene)
        console.log(`model===>`, model.meshes);
      }
    };
    inputValue.value = ''; 
    reader.readAsDataURL(file); 
  }
};

const exportScene = () => {
  console.log('exportScene', sceneManage.value.scene)
  exportGLB(sceneManage.value.scene, 'test.glb');
}

onMounted(() => {
  EventBus.on(EVENT_TYPE.SET_SCENE_MANAGE, (manage: any) => {
    sceneManage.value = manage
    console.log('setSceneManage', manage)
  })
})

</script>

<style lang="scss" scoped>
.fc-layout-header {
  width: 100%;
  height: 30px;
  background-color: #242629;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fc-layout-header-left {
  display: flex;
  .fc-logo {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    margin: 0 10px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.fc-update {
  width: 100px;
  height: 30px;
  .fc-update-btn {
    width: 100%;
    height: 100%;
  }
  overflow: hidden;
}
.fc-update-input {
  opacity: 0;
}

.fc-layout-header-conter {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

</style>