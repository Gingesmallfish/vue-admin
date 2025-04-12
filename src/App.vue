<template>
  <div id="app">
    <!-- 加载组件 -->
    <loading-spinner :isLoading="isLoading" :loadingText="loadingText" />
    <!-- 主内容 -->
    <router-view v-if="!isLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from './components/loadingSprinner.vue'; // 引入加载组件

// 控制加载状态
const isLoading = ref(true); // 是否显示加载动画
const loadingText = ref('加载中...'); // 加载文本

// 模拟加载时间
const simulateLoading = () => {
  setTimeout(() => {
    loadingText.value = '加载完成...'; // 更新加载文本
    setTimeout(() => {
      isLoading.value = false; // 停止加载动画
    }, 1000); // 延迟 1 秒后隐藏加载组件
  }, 2000); // 模拟 2 秒加载时间
};

// 组件挂载时启动加载模拟
onMounted(() => {
  simulateLoading();
});
</script>

<style lang="scss">
/* 可根据需要添加全局样式 */
</style>