<template>
  <div
    v-loading.fullscreen.lock="isLoading"
    :element-loading-text="loadingText"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <!-- 插槽内容 -->
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true, // 控制加载状态
  },
  loadingText: {
    type: String,
    default: '加载中...', // 默认加载文本
  },
});
</script>

<style scoped>
/* 如果需要自定义样式，可以在这里添加 */
</style>