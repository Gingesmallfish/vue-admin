<template>
    <el-watermark
      :content="content"
      :font-color="fontColor"
      :width="width"
      :height="height"
      class="watermark-container"
    >
      <slot></slot>
    </el-watermark>
  </template>
  
  <script setup>
  defineProps({
    content: {
      type: String,
      default: '© 2025 姜小鱼.版权所有.',
    },

    fontColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)',
    },
    width: {
      type: Number,
      default:  200,
    },
    height: {
      type: Number,
      default: 100,
    },
  });
  </script>
  
  <style scoped>
  /* 使用 Tailwind CSS 类来实现样式 */
  .watermark-container {
    @apply relative w-full h-full;
  }
  </style>