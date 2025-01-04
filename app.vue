<template>
  <div>
    <NConfigProvider :theme="darkTheme">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NConfigProvider>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
</template>


<script setup>
import { darkTheme, NConfigProvider } from 'naive-ui'

if(import.meta.server) {
  console.log(`server ...`);
}else {
  console.log(`client ...`);
}

</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
p {
  margin: 0;
  padding: 0;
}
svg {
  width: 10px;
  height: 10px;
}

</style>
