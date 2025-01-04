<template>
  <div class="fc-home">
    <SceneEditor />
  </div>
</template>

<script lang="ts" setup>
import SceneEditor from '~/customComponents/sceneEditor/index.vue'


</script>

<style lang="scss" scoped>
.fc-home {
  width: 100%;
  height: calc(100vh - 30px);
  position: relative;
  background-color: #ccc;
}
</style>
