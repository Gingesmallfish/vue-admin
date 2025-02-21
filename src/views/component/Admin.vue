<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏，引入 Menus 组件 -->
      <el-aside width="200px">
        <Menus />
      </el-aside>
      <el-container>
        <!-- 头部，引入 FHeader 组件并监听 showProfile 事件 -->
        <el-header>
          <FHeader @showProfile="showProfile"/>
        </el-header>
        <!-- 主体内容区域 -->
        <el-main class="custom-scrollbar">
          <!-- 根据 isProfileVisible 决定显示 Profile 组件还是路由匹配的组件 -->
          <Profile v-if="isProfileVisible" @close="hideProfile"/>
          <router-view v-else/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from 'vue';
// 引入 FHeader 组件
import FHeader from "@/Layouts/components/Header.vue";
// 引入 Profile 组件
import Profile from "@/Layouts/components/Profile.vue";
// 引入 Menus 组件
import Menus from "@/Layouts/components/Menus.vue";

// 定义响应式变量 isProfileVisible，用于控制是否显示个人资料页面
const isProfileVisible = ref(false);

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
.common-layout {
  @apply h-screen;

  .el-container {
    @apply h-full;

    .el-aside {
      @apply bg-gray-800 text-white;
    }

    .el-header {
      @apply bg-indigo-500 text-white;
    }

    .el-main {
      @apply p-4;
      /* 添加自定义滚动条样式 */
      @apply overflow-y-auto;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        @apply bg-gray-400 rounded;
      }

      &::-webkit-scrollbar-track {
        @apply bg-gray-200 rounded;
      }
    }
  }
}
</style>