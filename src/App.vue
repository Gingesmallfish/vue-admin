<template>
  <div id="app" v-loading.fullscreen.lock="isLoading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.7)">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isLoading = ref(true);
const loadingText = ref('加载中...');

// 模拟加载时间
const simulateLoading = () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000); // 3秒后加载完成
};

onMounted(() => {
  simulateLoading();
});

onUnmounted(() => {
  isLoading.value = false;
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
