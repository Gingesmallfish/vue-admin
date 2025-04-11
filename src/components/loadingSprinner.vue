<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
    <el-loading :fullscreen="true" :text="loadingText" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loadingText = ref('加载中...')
</script>

<style lang="scss" scoped>

</style>