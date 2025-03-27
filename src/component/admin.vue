<template>
  <div class="common-layout">
    <!-- 使用单个 el-container 包裹整个页面 -->
    <el-container class="min-h-screen">
      <!-- 侧边栏 -->
      <el-aside :width="$store.state.asideWidth" class="transition-all duration-300 bg-white border-r shadow-xm">
        <Sidebar :is-collapse="$store.state.asideWidth === '64px'" />
      </el-aside>

      <!-- 主内容区域 -->
      <el-container class="flex flex-col w-full">
        <!-- 头部 -->
        <el-header class="bg-white border-b shadow-sm justify-between items-center flex px-3 ">
          <FHeader @showProfile="showProfile" />
        </el-header>

        <!-- 主体内容 -->
        <el-main class="bg-gray-100 p-4">
          <!-- 根据 isProfileVisible 决定显示 Profile 组件还是路由匹配的组件 -->
          <Profile v-if="isProfileVisible" @close="hideProfile"  />
          <router-view v-else />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// 引入 FHeader 组件
import FHeader from "../Layouts/Header.vue";
// 引入 Profile 组件
import Profile from "../Layouts/Profile.vue";
// 引入 Sidebar 组件
import Sidebar from "../Layouts/Sidebar.vue";

const route = useRoute();

// 定义响应式变量 isProfileVisible，用于控制是否显示个人资料页面
const isProfileVisible = ref(false);

// 监听路由变化，当路由发生变化时自动隐藏Profile组件
watch(() => route.path, () => {
  isProfileVisible.value = false;
});

// 显示个人资料页面的方法
const showProfile = () => {
  isProfileVisible.value = true;
};

// 隐藏个人资料页面的方法
const hideProfile = () => {
  isProfileVisible.value = false;
};
</script>

<style scoped lang="scss">
// 如果需要局部样式，可以在这里添加
</style>