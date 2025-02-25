<template>
  <div class="flex flex-col items-center space-y-4 p-6">
    <el-avatar :size="180" :src="avatar" />
    <div class="flex space-x-4 gap-6">
      <el-button type="primary" @click="dialogUploadVisible = true">上传头像</el-button>
      <el-button type="success" @click="dialogEditVisible = true">修改头像</el-button>
    </div>

    <!-- 上传头像的弹出框 -->
    <UploadAvatarDialog
        v-model="dialogUploadVisible"
        title="上传头像"
        @uploaded="handleUpload"
    />

    <!-- 修改头像的弹出框 -->
    <UploadAvatarDialog
        v-model="dialogEditVisible"
        title="修改头像"
        :currentAvatar="avatar"
        @uploaded="handleEdit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UploadAvatarDialog from "@/components/UploadAvatarDialog.vue";

const avatar = ref('https://example.com/avatar.jpg'); // 替换为实际的头像URL
const dialogUploadVisible = ref(false);
const dialogEditVisible = ref(false);

const handleUpload = (file) => {
  // 处理上传逻辑
  console.log('Uploaded file:', file);
  avatar.value = URL.createObjectURL(file);
};

const handleEdit = (file) => {
  // 处理修改逻辑
  console.log('Edited file:', file);
  avatar.value = URL.createObjectURL(file);
};
</script>

<style scoped lang="scss">
.el-upload {
  display: inline-block;
}
</style>
