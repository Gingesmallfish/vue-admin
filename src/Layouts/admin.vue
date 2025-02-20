<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <FHeader @showProfile="showProfile" />
        </el-header>
        <el-main class="custom-scrollbar">
          <Profile v-if="isProfileVisible" />
          <slot v-else>
            main
          </slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FHeader from "@/Layouts/components/Header.vue";
import Profile from "@/Layouts/components/Profile.vue";

const isProfileVisible = ref(false);

const showProfile = () => {
  isProfileVisible.value = true;
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
    }
  }
}



</style>
