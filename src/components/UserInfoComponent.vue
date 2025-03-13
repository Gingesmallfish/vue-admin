<template>
    <h2 class="flex justify-center items-center font-bold text-3xl">用户信息</h2>
    <div v-if="userInfo" class="mt-7">
      <el-form label-width="100px" class="space-y-4">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" class="w-full" ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="userInfo.roleName" class="w-full" ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name" class="w-full" ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="userInfo.sex" class="w-full" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.phone" class="w-full" ></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="userInfo.introduction" type="textarea" class="w-full" ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <p class="text-gray-500">加载中...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserInfoApi } from '@/api/user.js';

const userInfo = ref({
  username: '',
  roleName: '',
  name: '',
  sex: '',
  introduction: '',
  phone: ''
});

const fetchUserInfo = async () => {
  try {
    const userId = 1; // 假设用户 ID 为 2，可以根据实际需求动态获取
    const res = await getUserInfoApi(userId);
    userInfo.value = res.data;

    // 映射 role 到 roleName
    const roleMap = {
      '1': '学生',
      '2': '教师',
      '3': '管理员',
    };
    // 映射 role 到 roleName
    userInfo.value.roleName = roleMap[userInfo.value.role] || '未知';
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped lang="scss">
.el-form-item__label {
  @apply text-gray-700 font-medium;
}

.el-input__inner {
  @apply border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300;
}

.el-textarea__inner {
  @apply border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300;
}
</style>
