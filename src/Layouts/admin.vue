<template>
  <el-container class="common-layout">
    <el-aside :width="$store.state.asideWidth">
      <Menus />
    </el-aside>
    <el-container>
      <el-header>
        <!-- 使用 Tailwind CSS 实现进度条 -->
        <div class="fixed top-0 left-0 w-full h-1 bg-sky-500/75 z-[9999] animate-progress" v-show="isLoading()"></div>
        <Header></Header>
      </el-header>
      <el-main >
        <router-view></router-view>
      </el-main>
      <el-footer class="h-10 flex justify-center items-center bg-gray-200 hover:cursor-pointer">
        © 2025 姜小鱼. 版权所有.
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from "@/Layouts/components/Header.vue";
import Menus from "@/Layouts/components/Menus.vue";
import { isLoading } from "@/utils/progress"; // 引入工具函数
</script>

<style lang="scss" scoped>

</style>