<template>
  <header class="text-white flex justify-end items-center p-2">
    <div class="">
      <el-dropdown @command="handleCommand">
        <span>
          <el-avatar :size="40" :src="avatarUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人资料</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { logoutApi } from '@/api/user.js'; // 假设这是你用来获取头像的 API 函数

const avatarUrl = ref(''); // 初始头像
const store = useStore();
const router = useRouter();

const emit = defineEmits(['showProfile']);

// 退出逻辑
const handleCommand = (command) => {
  if (command === 'profile') {
    emit('showProfile'); // 触发 showProfile 事件
  } else if (command === 'logout') {
    handleLogout();
  }
};

const handleLogout = () => {
  logoutApi()
      .then(() => {
        return store.dispatch('logout'); // 清空用户信息
      })
      .then(() => {
        ElMessage.success('退出成功');
        router.push('/login');
      })
      .catch((error) => {
        console.error('退出失败:', error);
        ElMessage.error('退出失败，请稍后重试');
      });
};
</script>

<style scoped lang="scss">
</style>
